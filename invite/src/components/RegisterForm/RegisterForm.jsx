import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";

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
    password_confirmation: Yup.string().label('Confirm password').required().oneOf([Yup.ref('password'), null], 'Passwords must match'),
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
    <Box sx={{ maxWidth:380,margin:"0 auto",mt: 4 }}>
    <form onSubmit={formik.handleSubmit} autoComplete="off">
    <TextField
        fullWidth
        id="name"
        name="name"
        label="Name"
        type="text"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
        sx={{mb:2}}
        variant="standard"
      />
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
      <TextField
        fullWidth
        id="password_confirmation"
        name="password_confirmation"
        label="Confirm password"
        type="password"
        value={formik.values.password_confirmation}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password_confirmation && Boolean(formik.errors.password_confirmation)}
        helperText={formik.touched.password_confirmation && formik.errors.password_confirmation}
        sx={{mb:2}}
        variant="standard"
      />
      <Button variant="contained" type="submit" fullWidth>
        Register
      </Button>
    </form>
  </Box>
  );
};
