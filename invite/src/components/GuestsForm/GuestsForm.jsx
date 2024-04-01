import { useDispatch, useSelector } from "react-redux";
import { deleteInviteGroup, deleteInviteGuest, updateInviteGroup } from "../../redux/invites/operations";
import { useFormik, FieldArray, FormikProvider } from "formik";
import * as Yup from "yup";
import { selectOneInvite } from "../../redux/invites/selectors";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import InputAdornment from "@mui/material/InputAdornment";
import GroupIcon from "@mui/icons-material/Group";
import Tooltip from "@mui/material/Tooltip";

const GuestsForm = () => {
  const dispatch = useDispatch();
  const invite = useSelector(selectOneInvite);

  const handleSubmit = (values) => {
    values.inviteId = invite.id;
      dispatch(updateInviteGroup(values));
  };

  const handleDeleteGroup = (id) => {
    if (id) {
      dispatch(deleteInviteGroup(id));
    }
  };

  const handleDeleteGuest = (id) => {
    if (id) {
      dispatch(deleteInviteGuest(id));
    }
  };

  const InviteSchema = Yup.object().shape({});

  const formik = useFormik({
    initialValues: {
      inviteGroups: invite ? invite.inviteGroups : [],
    },
    validationSchema: InviteSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <Box
      sx={{
        marginTop: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Список гостей
      </Typography>
      <FormikProvider value={formik}>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          autoComplete="off"
          noValidate
          encType="multipart/form-data"
          sx={{ mt: 1 }}
        >
          <FieldArray
            name="inviteGroups"
            render={(arrayHelpers) => (
              <div>
                {Array.isArray(formik.values.inviteGroups) &&
                  formik.values.inviteGroups.map((group, index) => (
                    <div key={index}>
                      {/** both these conventions do the same  */}
                      <Grid container spacing={2}>
                        <Grid item xs={10}>
                          <TextField
                            margin="normal"
                            InputProps={{
                              readOnly: true,
                              startAdornment: (
                                <InputAdornment position="start">
                                  <GroupIcon />
                                </InputAdornment>
                              ),
                            }}
                            variant="standard"
                            color="warning"
                            focused
                            size="small"
                            fullWidth
                            name={`inviteGroups.${index}.id`}
                            value={`Група ${index + 1}`}
                            onChange={formik.handleChange}
                          />

                          <FieldArray
                            name={`inviteGroups[${index}].inviteGuests`}
                            render={(subArrayHelpers) => (
                              <div>
                                {Array.isArray(
                                  formik.values.inviteGroups[index].inviteGuests
                                ) &&
                                  formik.values.inviteGroups[
                                    index
                                  ].inviteGuests.map((guest, idx) => (
                                    <div key={"g" + index + "g" + idx}>
                                      <Grid container spacing={2}>
                                        <Grid item xs={10}>
                                          <TextField
                                            margin="normal"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            label="Ім'я"
                                            name={`inviteGroups.${index}.inviteGuests.${idx}.name`}
                                            value={guest.name}
                                            onChange={formik.handleChange}
                                          />
                                        </Grid>
                                        <Grid item xs={2} sx={{ display: "flex", alignItems: "start" }}>
                                        <Tooltip title="Видалити гостя зі списку" placement="top">
                                          <IconButton
                                            variant="outlined"
                                            color="error"
                                            size="small"
                                            type="button"
                                            onClick={() => {
                                              handleDeleteGuest(
                                                formik.values.inviteGroups[index].inviteGuests[idx].id
                                                  ? formik.values.inviteGroups[index].inviteGuests[idx].id
                                                  : null
                                              );
                                              subArrayHelpers.remove(idx);
                                            }}
                                            sx={{ alignSelf: "center", alignItems: "center", }}
                                          >
                                            <DeleteIcon />
                                          </IconButton>
                                          </Tooltip>
                                        </Grid>
                                      </Grid>
                                    </div>
                                  ))}
                                <Button
                                  variant="outlined"
                                  fullWidth
                                  type="button"
                                  size="small"
                                  onClick={() =>
                                    subArrayHelpers.push({ name: "" })
                                  }
                                  sx={{ marginTop: "4px" }}
                                >
                                  Додати гостя
                                </Button>
                              </div>
                            )}
                          />
                        </Grid>
                        <Grid
                          item
                          xs={2}
                          sm={2}
                          sx={{ display: "flex", alignItems: "start" }}
                        >
                          <Tooltip title="Видалити групу гостей" placement="top">
                          <IconButton
                            variant="outlined"
                            size="small"
                            type="button"
                            onClick={() => {
                              handleDeleteGroup(
                                formik.values.inviteGroups[index].id
                                  ? formik.values.inviteGroups[index].id
                                  : null
                              );
                              arrayHelpers.remove(index);
                            }}
                            sx={{ mt:1.5,alignSelf: "start", alignItems: "center" }}
                          >
                            <DeleteIcon />
                          </IconButton>
                          </Tooltip>
                        </Grid>
                      </Grid>
                    </div>
                  ))}
                <Grid container spacing={2}>
                  <Grid item xs={10} sm={10}>
                    <Button
                      variant="contained"
                      fullWidth
                      type="button"
                      color="warning"
                      size="small"
                      onClick={() => arrayHelpers.push({ id: "" })}
                      sx={{ marginTop: "4px" }}
                    >
                      Додати групу
                    </Button>
                  </Grid>
                  <Grid item xs={2} sm={2}></Grid>
                </Grid>
              </div>
            )}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Зберегти список гостей
          </Button>
        </Box>
      </FormikProvider>
    </Box>
  );
};

export default GuestsForm;
