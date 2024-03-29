import { useSelector } from "react-redux";
import { selectOneInvite } from "../../redux/invites/selectors";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const InvitePreview = () => {
  const invite = useSelector(selectOneInvite);

  return (
    <>
      {invite && (
        <Box
          sx={{
            marginTop: 2,
            maxWidth: "420px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#eceff1",
            pt: 20,
            pb:10,
            px: 2,
            borderRadius:'20px',
            border:'5px solid #90a4ae'
          }}
        >
          <Typography component="h1" variant="h3" align="center" sx={{color:"#90a4ae", fontStyle:'italic'}}>
            {invite.nameOne} & {invite.nameTwo}
          </Typography>

          <Typography component="p" variant="body2" align="center" sx={{mt:8}}>
            {invite.invitation}
          </Typography>

          <Typography component="p" variant="h5" align="center" sx={{mt:8}}>
            {invite.endPoint}
          </Typography>

          <Typography component="p" variant="body2" align="center" sx={{mt:8}}>
            {invite.postinvite}
          </Typography>

          <Typography component="p" variant="body2" align="center" sx={{mt:8}}>
            {invite.deadline}
          </Typography>

          <Typography component="p" variant="body2" align="center" sx={{mt:8}}>
            {invite.thankyou}
          </Typography>

          <Typography component="p" variant="body2" align="center" sx={{mt:8}}>
            {invite.addition}
          </Typography>

        </Box>
      )}
    </>
  );
};

export default InvitePreview;
