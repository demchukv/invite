import { Button, Dialog, DialogActions, DialogTitle, DialogContent } from '@mui/material';
import ContactForm from '../ContactForm/ContactForm';

const EditContactDialog = ({ open, handleClose, contact }) => {
      
  return (
    <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      {"Edit contact"}
    </DialogTitle>
    <DialogContent>
        <ContactForm contact={contact} handleClose={handleClose} />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} autoFocus>Cancel</Button>
    </DialogActions>
  </Dialog>

  )
}

export default EditContactDialog