import { useSelector } from "react-redux";
import { selectOneInvite } from "../../redux/invites/selectors";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import "dayjs/locale/uk";

const InvitePreview = () => {
  const storageUrl = "http://127.0.0.1:8000";
  const invitePreview = useSelector(selectOneInvite);

  return (
    <>
      {invitePreview && (
        <Box
          sx={{
            marginTop: 2,
            maxWidth: "460px",
            maxHeight: "70vh",
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#eceff1",
            borderRadius: "20px",
            border: "7px solid #90a4ae",
          }}
        >
          <Box
            sx={{
              pt: 60,
              pb: 10,
              px: 2,
              backgroundImage: `url(${storageUrl}${
                invitePreview.photo
              }?t=${Math.random()})`,
              backgroundPosition: "center top",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <Typography
              component="h1"
              variant="h3"
              align="center"
              sx={{ color: "#eceff1", fontStyle: "italic" }}
            >
              {invitePreview.nameOne} & {invitePreview.nameTwo}
            </Typography>
          </Box>

          <Box
            sx={{
              pt: 8,
              pb: 8,
              px: 2,
              backgroundColor: "#cfd8dc",
            }}
          >
            <Typography component="p" variant="body2" align="center">
              {invitePreview.invitation}
            </Typography>

            <Box sx={{ mt: 4 }}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="uk"
              >
                <DateCalendar
                  defaultValue={dayjs(invitePreview.endPoint)}
                  readOnly
                />
              </LocalizationProvider>
            </Box>

            <Typography
              component="p"
              variant="body2"
              align="center"
              sx={{ mt: 4 }}
            >
              {invitePreview.postinvite}
            </Typography>
          </Box>

          <Typography
            component="p"
            variant="body2"
            align="center"
            sx={{ mt: 8, mb: 8 }}
          >
            {invitePreview.deadline}
          </Typography>

          {Array.isArray(invitePreview.inviteTimings) &&
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
            })}
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
