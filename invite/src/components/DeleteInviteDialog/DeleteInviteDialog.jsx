import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

const DeleteInvitetDialog = ({ open, id, handleClose, handleDelete }) => {
      
  return (
    <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
          {"Видалити запрошення?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ви справді бажаєте видалити запрошення?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleDelete(id)}>Видалити</Button>
          <Button onClick={handleClose} autoFocus>
          Скасувати
          </Button>
        </DialogActions>
  </Dialog>

  )
}

export default DeleteInvitetDialog