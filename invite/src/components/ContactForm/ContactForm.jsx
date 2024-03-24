import { useDispatch } from "react-redux";
import { addContact, updateContact } from "../../redux/contacts/operations";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

const ContactForm = ({ contact = null, handleClose = null }) => {
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    if (contact === null) {
      dispatch(addContact(values));
      formik.resetForm();
      toast.success("New contact successfully added to phonebook!");
    } else {
      values.id = contact.id;
      dispatch(updateContact(values));
      handleClose();
      toast.success("Contact successfully updated!");
    }
  };

  const ContactSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    number: Yup.string()
      .matches(/^\d{3}-\d{3}-\d{4}$/, {
        message: "Enter correct phone number: 111-111-1111",
        excludeEmptyString: false,
      })
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      name: contact === null ? "" : contact.name,
      number: contact === null ? "" : contact.number,
    },
    validationSchema: ContactSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <div>
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
              id="number"
              name="number"
              label="Number"
              type="text"
              value={formik.values.number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="number">Number</label>
            {formik.touched.number && formik.errors.number && (
              <div className="helper-text red-text darken-2">
                {formik.errors.number}
              </div>
            )}
          </div>
        </div>
        <button type="submit" className="waves-effect waves-light btn">
          {contact === null ? "Add contact" : "Update contact"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
