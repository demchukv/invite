import CircularProgress from '@mui/material/CircularProgress';

export default function Loader() {
  return (
      <CircularProgress size="5rem" color="primary" sx={{position:"absolute",top:"50%",left:"50%",zIndex:999,transform: "translate(-50%, -50%)"}} />
  );
}