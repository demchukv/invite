import { useState } from "react";
import { PropTypes } from "prop-types";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";
import DeleteContactDialog from "../DeleteContactDialog/DeleteContactDialog";
import EditContactDialog from "../EditContactDialog/EditContactDialog";
import toast from "react-hot-toast";

const Contact = ({ contact }) => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleClickOpenDialog = () => {
    setOpen(true);
  };
  const handleClickOpenEditDialog = () => {
    setOpenEdit(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleCloseEditDialog = () => {
    setOpenEdit(false);
  };

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(contact.id));
    toast.success("Contact deleted from phonebook!");
  };

  return (
    <li>
      <div>
        <div>
          <div>
            <p>
              {contact.name}
            </p>
            <p>
              {contact.number}
            </p>
          </div>
          <div>
            <button type="button" onClick={handleClickOpenEditDialog}>
              Edit
            </button>
            <button type="button" onClick={handleClickOpenDialog}>
              Delete
            </button>
          </div>
          <DeleteContactDialog
            open={open}
            id={contact.id}
            handleClose={handleCloseDialog}
            handleDelete={handleDelete}
          />
          <EditContactDialog
            open={openEdit}
            contact={contact}
            handleClose={handleCloseEditDialog}
          />
        </div>
      </div>
    </li>
  );
};

Contact.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default Contact;
