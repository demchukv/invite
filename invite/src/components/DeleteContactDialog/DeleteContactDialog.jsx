
const DeleteContactDialog = ({ open, handleClose, handleDelete }) => {
      
  return (
    <dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <h2 id="alert-dialog-title">
      {"Delete contact from phonebook?"}
    </h2>
    <div>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleClose} autoFocus>Cancel</button>
    </div>
  </dialog>

  )
}

export default DeleteContactDialog