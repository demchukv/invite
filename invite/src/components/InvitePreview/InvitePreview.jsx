import { useSelector } from "react-redux";
import { selectOneInvite } from "../../redux/invites/selectors";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const InvitePreview = () => {
  const invitePreview = useSelector(selectOneInvite);

  return (
    <>
      {invitePreview && (
        <Box
          sx={{
            marginTop: 2,
            maxWidth: "420px",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#eceff1",
            pt: 20,
            pb: 10,
            px: 2,
            borderRadius: "20px",
            border: "5px solid #90a4ae",
          }}
        >
          <Typography
            component="h1"
            variant="h3"
            align="center"
            sx={{ color: "#90a4ae", fontStyle: "italic" }}
          >
            {invitePreview.nameOne} & {invitePreview.nameTwo}
          </Typography>

          <Typography
            component="p"
            variant="body2"
            align="center"
            sx={{ mt: 8 }}
          >
            {invitePreview.invitation}
          </Typography>

          <Typography component="p" variant="h5" align="center" sx={{ mt: 8 }}>
            {invitePreview.endPoint}
          </Typography>

          <Typography
            component="p"
            variant="body2"
            align="center"
            sx={{ mt: 8 }}
          >
            {invitePreview.postinvite}
          </Typography>

          <Typography
            component="p"
            variant="body2"
            align="center"
            sx={{ mt: 8, mb:8 }}
          >
            {invitePreview.deadline}
          </Typography>

          {Array.isArray(invitePreview.inviteTimings) && (
          invitePreview.inviteTimings.map((timing) => {
            return (
              <Typography
                key={timing.id}
                component="p"
                variant="body1"
                sx={{ mt: 1 }}
              >
                {timing.eventTime} - {timing.eventDesc}
              </Typography>
            );
          }))}

          <Typography
            component="p"
            variant="body2"
            align="center"
            sx={{ mt: 8 }}
          >
            {invitePreview.thankyou}
          </Typography>

          <Typography
            component="p"
            variant="body2"
            align="center"
            sx={{ mt: 8 }}
          >
            {invitePreview.addition}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default InvitePreview;
