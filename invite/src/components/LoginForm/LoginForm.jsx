import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import { useFormik } from "formik";
import * as Yup from "yup";
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
    <div className="row">
      <div className="col s12 m6 offset-m3 l4 offset-l4">
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div className="row">
            <div className="input-field col s12">
              <input
                className="validate"
                id="email"
                name="email"
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
          <button type="submit" className="waves-effect waves-light btn">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};
