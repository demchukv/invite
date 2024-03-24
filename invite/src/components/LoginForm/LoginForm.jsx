import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";

export const LoginForm = () => {
  const dispatch = useDispatch();

  const handleLogin = (values) => {

    dispatch(
      logIn({
        email: values.email,
        password: values.password,
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Login success!");
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string("Enter your password")
      .min(5, "Password should be of minimum 5 characters length")
      .max(10, "Password should be of maximum 10 characters length")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  return (
    <Box sx={{ maxWidth:380,margin:"0 auto", mt: 4 }}>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
      <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          sx={{mb:2}}
          variant="standard"
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          sx={{mb:2}}
          variant="standard"
        />
        <Button variant="contained" type="submit" fullWidth>
          Log In
        </Button>
      </form>
    </Box>
  );
};
