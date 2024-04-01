import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addInvite,
  updateInvite,
  deleteInviteTiming,
  deleteInvitePhoto
} from "../../redux/invites/operations";
import { useFormik, FieldArray, FormikProvider } from "formik";
import * as Yup from "yup";
import { selectOneInvite } from "../../redux/invites/selectors";
import { selectToken } from "../../redux/auth/selectors";
import { useNavigate } from "react-router-dom";

import { Dropzone, FileMosaic } from "@files-ui/react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DeleteIcon from "@mui/icons-material/Delete";
import 'dayjs/locale/uk';
import { nanoid } from "@reduxjs/toolkit";

const InviteForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const invite = useSelector(selectOneInvite);
  const token = useSelector(selectToken);

  const handleSubmit = (values) => {
    if (invite) {
      values.id = invite.id;
      dispatch(updateInvite(values));
    } else {
      dispatch(addInvite(values));
      formik.resetForm();
      navigate("/invites");
    }
  };

  const handleDeleteTiming = (id) => {
    if (id) {
      dispatch(deleteInviteTiming(id));
    }
  };

  const InviteSchema = Yup.object().shape({
    nameOne: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    nameTwo: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    endPoint: Yup.date().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      nameOne: invite && invite.id ? invite.nameOne : "",
      nameTwo: invite && invite.id ? invite.nameTwo : "",
      endPoint: invite && invite.id ? invite.endPoint : "",
      placeOne: invite && invite.id ? invite.placeOne : "",
      mapUrlOne: invite && invite.id !== null ? invite.mapUrlOne : "",
      placeTwo: invite && invite.id ? invite.placeTwo : "",
      mapUrlTwo: invite && invite.id !== null ? invite.mapUrlTwo : "",
      invitation: invite && invite.id
        ? invite.invitation
        : "Щиро запрошуємо вас на свято, присвячене створенню нашої сім'ї, яке відбудеться:",
      deadline: invite && invite.id
        ? invite.deadline
        : "Прохання повідомити про присутність до 21 грудня 2023 року",
      postinvite: invite && invite.id
        ? invite.postinvite
        : "І ми не уявляємо цей радісний день без вас — близьких і дорогих нам людей!",
      thankyou: invite && invite.id
        ? invite.thankyou
        : "Будемо вдячні, якщо ви підтримаєте кольорову гаму нашого свята",
      addition: invite && invite.id
        ? invite.addition
        : "Для швидкого обміну інформацією, фото та відео між нашими гостями ми створили групу в telegram",
      inviteTimings: invite && invite.id ? invite.inviteTimings : [],
    },
    validationSchema: InviteSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const storageUrl = "http://127.0.0.1:8000";
  const uploadMainPhotoUrl = "http://127.0.0.1:8000/api/v1/invite-photo/";
  const mainPhotoUrl = storageUrl+invite.photo;

  const mainPhoto = invite.photo ? [{
      type:"image/jpeg",
      name:mainPhotoUrl.substring(mainPhotoUrl.lastIndexOf('/')+1),
      id: nanoid(),
      imageUrl: mainPhotoUrl,
      downloadUrl: mainPhotoUrl,
  }] : [];

  const [files, setFiles] = useState(mainPhoto);

  const updateFiles = (incommingFiles) => {
    setFiles(incommingFiles);
  };
  const removeFile = (id) => {
    dispatch(deleteInvitePhoto(invite.id));
    setFiles(files.filter((x) => x.id !== id));
  };

  const formtype = invite && Object.keys(invite).length === 0 ? 'create' : 'edit';

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
        {invite ? "Редагувати запрошення" : "Створити запрошення"}
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

          {formtype === "edit" &&
          <Dropzone
            onChange={updateFiles}
            value={files}
            headerConfig={{deleteFiles:false}}
            footerConfig={{ allowedTypesLabel:false }}
            label="Перетягніть файл або клацніть..."
            autoClean            
            maxFiles={1}
            accept="image/*"
            uploadConfig={{
              method: "POST",
              url: uploadMainPhotoUrl+invite.id,
              headers: {
                'Authorization': `Bearer ${token}`,
              },
              cleanOnUpload:true,
              uploadLabel:"photo",
              autoUpload:true,
            }}
          >
            {files.map((file) => (
              <FileMosaic 
                key={file.id} 
                {...file}
                onDelete={removeFile} 
                info 
                preview 
              />
            ))}
          </Dropzone>
          }

          <TextField
            margin="normal"
            required
            fullWidth
            id="nameOne"
            name="nameOne"
            label="Name One"
            type="text"
            value={formik.values.nameOne}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.nameOne && Boolean(formik.errors.nameOne)}
            helperText={formik.touched.nameOne && formik.errors.nameOne}
            autoComplete="name"
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="nameTwo"
            name="nameTwo"
            label="Name Two"
            type="text"
            value={formik.values.nameTwo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.nameTwo && Boolean(formik.errors.nameTwo)}
            helperText={formik.touched.nameTwo && formik.errors.nameTwo}
            autoComplete="name"
          />

          <TextField
            margin="normal"
            variant="outlined"
            multiline
            required
            fullWidth
            maxRows={4}
            id="invitation"
            name="invitation"
            label="Текст запрошення"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.invitation && Boolean(formik.errors.invitation)
            }
            helperText={formik.touched.invitation && formik.errors.invitation}
            defaultValue={formik.values.invitation}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="uk">
            <DatePicker
              format="YYYY-MM-DD"
              value={dayjs(formik.values.endPoint)}
              id="endPoint"
              name="endPoint"
              onChange={(value) =>
                formik.setFieldValue(
                  "endPoint",
                  dayjs(value).format("YYYY-MM-DD"),
                  true
                )
              }
              slotProps={{
                textField: {
                  variant: "outlined",
                  error:
                    formik.touched.endPoint && Boolean(formik.errors.endPoint),
                  helperText: formik.touched.endPoint && formik.errors.endPoint,
                  onChange: (value) =>
                    formik.setFieldValue(
                      "endPoint",
                      dayjs(value).format("YYYY-MM-DD"),
                      true
                    ),
                  margin: "normal",
                  required: true,
                  fullWidth: true,
                  label: "Дата події",
                },
              }}
            />
          </LocalizationProvider>

          <TextField
            margin="normal"
            variant="outlined"
            multiline
            required
            fullWidth
            maxRows={4}
            id="postinvite"
            name="postinvite"
            label="Текст після запрошення"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.postinvite && Boolean(formik.errors.postinvite)
            }
            helperText={formik.touched.postinvite && formik.errors.postinvite}
            defaultValue={formik.values.postinvite}
          />

          <TextField
            margin="normal"
            variant="outlined"
            multiline
            required
            fullWidth
            maxRows={4}
            id="placeOne"
            name="placeOne"
            label="Адреса вінчання"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.placeOne && Boolean(formik.errors.placeOne)}
            helperText={formik.touched.placeOne && formik.errors.placeOne}
            defaultValue={formik.values.placeOne}
          />

          <TextField
            margin="normal"
            variant="outlined"
            fullWidth
            id="mapUrlOne"
            name="mapUrlOne"
            label="Посилання на карті"
            type="text"
            value={formik.values.mapUrlOne}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.mapUrlOne && Boolean(formik.errors.mapUrlOne)}
            helperText={formik.touched.mapUrlOne && formik.errors.mapUrlOne}
            autoComplete="off"
          />

          <TextField
            margin="normal"
            variant="outlined"
            multiline
            required
            fullWidth
            maxRows={4}
            id="placeTwo"
            name="placeTwo"
            label="Адреса банкету"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.placeTwo && Boolean(formik.errors.placeTwo)}
            helperText={formik.touched.placeTwo && formik.errors.placeTwo}
            defaultValue={formik.values.placeTwo}
          />

          <TextField
            margin="normal"
            fullWidth
            id="mapUrlTwo"
            name="mapUrlTwo"
            label="Посилання на карті"
            type="text"
            value={formik.values.mapUrlTwo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.mapUrlTwo && Boolean(formik.errors.mapUrlTwo)}
            helperText={formik.touched.mapUrlTwo && formik.errors.mapUrlTwo}
            autoComplete="off"
          />

          <TextField
            margin="normal"
            variant="outlined"
            multiline
            required
            fullWidth
            maxRows={4}
            id="deadline"
            name="deadline"
            label="Текст про підтвердження"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.deadline && Boolean(formik.errors.deadline)}
            helperText={formik.touched.deadline && formik.errors.deadline}
            defaultValue={formik.values.deadline}
          />

          <Grid container spacing={2} sx={{ marginTop: "1px" }}>
            <Grid item xs={4} sm={4}>
              Час
            </Grid>
            <Grid item xs={6} sm={6}>
              Подія
            </Grid>
            <Grid item xs={2} sm={2}></Grid>
          </Grid>
          <FieldArray
            name="inviteTimings"
            render={(arrayHelpers) => (
              <div>
                {Array.isArray(formik.values.inviteTimings) &&
                  formik.values.inviteTimings.map((timing, index) => (
                    <div key={index}>
                      {/** both these conventions do the same  */}
                      <Grid container spacing={2}>
                        <Grid item xs={4} sm={4}>
                          <TextField
                            margin="normal"
                            variant="outlined"
                            required
                            fullWidth
                            name={`inviteTimings[${index}].eventTime`}
                            value={formik.values.inviteTimings[index].eventTime}
                            onChange={formik.handleChange}
                          />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                          <TextField
                            margin="normal"
                            variant="outlined"
                            required
                            fullWidth
                            name={`inviteTimings.${index}.eventDesc`}
                            value={formik.values.inviteTimings[index].eventDesc}
                            onChange={formik.handleChange}
                          />
                        </Grid>
                        <Grid
                          item
                          xs={2}
                          sm={2}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <IconButton
                            variant="outlined"
                            color="warning"
                            size="small"
                            type="button"
                            onClick={() => {
                              handleDeleteTiming(
                                formik.values.inviteTimings[index].id
                                  ? formik.values.inviteTimings[index].id
                                  : null
                              );
                              arrayHelpers.remove(index);
                            }}
                            sx={{ alignSelf: "center", alignItems: "center" }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </div>
                  ))}
                <Grid container spacing={2}>
                  <Grid item xs={10} sm={10}>
                    <Button
                      variant="outlined"
                      fullWidth
                      type="button"
                      size="small"
                      onClick={() =>
                        arrayHelpers.push({ eventTime: "", eventDesc: "" })
                      }
                      sx={{ marginTop: "4px" }}
                    >
                      Додати подію
                    </Button>
                  </Grid>
                  <Grid item xs={2} sm={2}></Grid>
                </Grid>
              </div>
            )}
          />

          <TextField
            margin="normal"
            variant="outlined"
            multiline
            fullWidth
            maxRows={4}
            id="thankyou"
            name="thankyou"
            label="Подяка"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.thankyou && Boolean(formik.errors.thankyou)}
            helperText={formik.touched.thankyou && formik.errors.thankyou}
            defaultValue={formik.values.thankyou}
          />

          <TextField
            margin="normal"
            variant="outlined"
            multiline
            fullWidth
            maxRows={4}
            id="addition"
            name="addition"
            label="Додатково"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.addition && Boolean(formik.errors.addition)}
            helperText={formik.touched.addition && formik.errors.addition}
            defaultValue={formik.values.addition}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {invite ? "Оновити запрошення" : "Створити запрошення"}
          </Button>
        </Box>
      </FormikProvider>
    </Box>
  );
};

export default InviteForm;
