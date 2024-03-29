
const EditInviteDialog = ({ open, handleClose, invite }) => {
      
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
        <EditInviteDialog invite={invite} handleClose={handleClose} />
    </div>
    <div>
      <button onClick={handleClose} autoFocus>Cancel</button>
    </div>
  </dialog>

  )
}

export default EditInviteDialog