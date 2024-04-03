import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";

export const RegisterForm = () => {
  const dispatch = useDispatch();

  const handleRegister = (values) => {
    dispatch(
      register({
        name: values.name,
        email: values.email,
        password: values.password,
        password_confirmation: values.password_confirmation,
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Registration success!");
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const RegisterSchema = Yup.object().shape({
    name: Yup.string("Enter your name")
      .min(3, "Enter a valid name")
      .max(25, "Enter a valid name")
      .required("Name is required"),
    email: Yup.string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string("Enter your password")
      .min(5, "Password should be of minimum 5 characters length")
      .max(10, "Password should be of maximum 10 characters length")
      .required("Password is required"),
    password_confirmation: Yup.string()
      .label("Confirm password")
      .required()
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      handleRegister(values);
    },
  });

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Реєстрація
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
          id="name"
          name="name"
          label="Ім'я"
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          autoComplete="name"
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          name="email"
          label="E-mail"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          autoComplete="email"
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          name="password"
          label="Пароль"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          autoComplete="new-password"
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="password_confirmation"
          name="password_confirmation"
          label="Підтвердження пароля"
          type="password"
          value={formik.values.password_confirmation}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.password_confirmation &&
            Boolean(formik.errors.password_confirmation)
          }
          helperText={
            formik.touched.password_confirmation &&
            formik.errors.password_confirmation
          }
          autoComplete="new-password"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Зареєструватися
        </Button>

        <Grid container>
          <Grid item xs></Grid>
          <Grid item>
            <Link component={RouterLink} to="/login" variant="body2">
              Вже зареєстровані? Увійти
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
