import { useDispatch, useSelector } from "react-redux";
import { addInvite, updateInvite } from "../../redux/invites/operations";
import { useFormik } from "formik";
import * as Yup from "yup";
import { selectInvites } from "../../redux/invites/selectors";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const InviteForm = ({ inviteId }) => {
  const dispatch = useDispatch();
  
  const navigate = useNavigate();

  const invites = useSelector(selectInvites);

  const invite = invites.filter((item) => {
    if (item.id === Number(inviteId)) {
      return item;
    }
  })[0];

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

  const InviteSchema = Yup.object().shape({
    nameOne: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    nameTwo: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      nameOne: invite ? invite.nameOne : "",
      nameTwo: invite ? invite.nameTwo : "",
      endPoint: invite ? invite.endPoint : "",
      photo: null,
      placeOne: invite ? invite.placeOne : "",
      mapUrlOne: invite ? invite.mapUrlOne : "",
      placeTwo: invite ? invite.placeTwo : "",
      mapUrlTwo: invite ? invite.mapUrlTwo : "",
      invitation: invite
        ? invite.invitation
        : "Щиро запрошуємо вас на свято, присвячене створенню нашої сім'ї, яке відбудеться:",
      deadline: invite
        ? invite.deadline
        : "Прохання повідомити про присутність до 21 грудня 2023 року",
      postinvite: invite
        ? invite.postinvite
        : "І ми не уявляємо цей радісний день без вас — близьких і дорогих нам людей!",
      thankyou: invite
        ? invite.thankyou
        : "Будемо вдячні, якщо ви підтримаєте кольорову гаму нашого свята",
      addition: invite
        ? invite.addition
        : "Для швидкого обміну інформацією, фото та відео між нашими гостями ми створили групу в telegram",
    },
    validationSchema: InviteSchema,
    onSubmit: (values) => {
      console.log(values);
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
        {invite ? "Edit your invitation" : "Create your invitation"}
      </Typography>

      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        autoComplete="off"
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="nameOne"
          name="nameOne"
          label="Name One"
          type="text"
          value={formik.values.nameOne}
          onChange={(event)=>formik.setValue(event.currentTarget.files[0])}
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

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Event date"
            format="YYYY-MM-DD"
            value={dayjs(formik.values.endPoint)}
            id="endPoint"
            name="endPoint"
            fullWidth
            margin="normal"
            required
            onChange={(value) => formik.setFieldValue("endPoint", dayjs(value).format('YYYY-MM-DD'), true)}
            slotProps={{
              textField: {
                variant: "outlined",
                error:
                  formik.touched.endPoint && Boolean(formik.errors.endPoint),
                helperText: formik.touched.endPoint && formik.errors.endPoint,
                onChange: formik.handleChange,
                margin: "normal"
              },
            }}
          />
        </LocalizationProvider>

        <TextField
          margin="normal"
          required
          fullWidth
          id="photo"
          name="photo"
          label="Upload your photo"
          type="file"
          value={formik.values.photo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.photo && Boolean(formik.errors.photo)}
          helperText={formik.touched.photo && formik.errors.photo}
          autoComplete="off"
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
          label="Place One"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.placeOne && Boolean(formik.errors.placeOne)}
          helperText={formik.touched.placeOne && formik.errors.placeOne}
          defaultValue={formik.values.placeOne}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="mapUrlOne"
          name="mapUrlOne"
          label="Map url for place one"
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
          label="Place Two"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.placeTwo && Boolean(formik.errors.placeTwo)}
          helperText={formik.touched.placeTwo && formik.errors.placeTwo}
          defaultValue={formik.values.placeTwo}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="mapUrlTwo"
          name="mapUrlTwo"
          label="Map url for place two"
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
          id="invitation"
          name="invitation"
          label="Invitation"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.invitation && Boolean(formik.errors.invitation)}
          helperText={formik.touched.invitation && formik.errors.invitation}
          defaultValue={formik.values.invitation}
        />

        <TextField
          margin="normal"
          variant="outlined"
          multiline
          required
          fullWidth
          maxRows={4}
          id="postinvite"
          name="postinvite"
          label="Post invitation"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.postinvite && Boolean(formik.errors.postinvite)}
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
          id="deadline"
          name="deadline"
          label="Deadline"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.deadline && Boolean(formik.errors.deadline)}
          helperText={formik.touched.deadline && formik.errors.deadline}
          defaultValue={formik.values.deadline}
        />

        <TextField
          margin="normal"
          variant="outlined"
          multiline
          required
          fullWidth
          maxRows={4}
          id="thankyou"
          name="thankyou"
          label="Thank you"
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
          required
          fullWidth
          maxRows={4}
          id="addition"
          name="addition"
          label="Additional information"
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
          {invite ? "Update invitation" : "Create invitation"}
        </Button>
      </Box>
    </Box>
  );
};

export default InviteForm;
