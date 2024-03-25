import ContactForm from '../ContactForm/ContactForm';

const EditContactDialog = ({ open, handleClose, contact }) => {
      
  return (
    <dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <h2 id="alert-dialog-title">
      {"Edit contact"}
    </h2>
    <div>
        <ContactForm contact={contact} handleClose={handleClose} />
    </div>
    <div>
      <button onClick={handleClose} autoFocus>Cancel</button>
    </div>
  </dialog>

  )
}

export default EditContactDialog