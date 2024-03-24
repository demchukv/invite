import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import { useFormik } from "formik";
import * as Yup from "yup";
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
    <div className="row">
      <div className="col s12 m6 offset-m3 l4 offset-l4">
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div className="row">
            <div className="input-field col s12">
              <input
                className="validate"
                id="name"
                name="name"
                label="Name"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="name">Name</label>
              {formik.touched.name && formik.errors.name && (
                <div className="helper-text red-text darken-2">
                  {formik.errors.name}
                </div>
              )}
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                className="validate"
                id="email"
                name="email"
                label="Email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="email">Email</label>
              {formik.touched.email && formik.errors.email && (
                <div className="helper-text red-text darken-2">
                  {formik.errors.email}
                </div>
              )}
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                className="validate"
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="password">Password</label>
              {formik.touched.password && formik.errors.password && (
                <div className="helper-text red-text darken-2">
                  {formik.errors.password}
                </div>
              )}
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                className="validate"
                id="password_confirmation"
                name="password_confirmation"
                label="Confirm password"
                type="password"
                value={formik.values.password_confirmation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="password_confirmation">Confirm password</label>
              {formik.touched.password_confirmation &&
                formik.errors.password_confirmation && (
                  <div className="helper-text red-text darken-2">
                    {formik.errors.password_confirmation}
                  </div>
                )}
            </div>
          </div>

          <button type="submit" className="waves-effect waves-light btn">Register</button>
        </form>
      </div>
    </div>
  );
};
