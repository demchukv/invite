import { useState } from "react";
import { useSelector } from "react-redux";
import { selectOneInvite } from "../../redux/invites/selectors";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import "dayjs/locale/uk";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import MapIcon from "@mui/icons-material/Map";

const InvitePreview = () => {
  const storageUrl = "http://127.0.0.1:8000";
  const invitePreview = useSelector(selectOneInvite);

  const guests = invitePreview.inviteGroups[0].inviteGuests;

  const [answer, setAnswer] = useState(guests);
  const [subanswer, setSubanswer] = useState({'w1':null, 'w2':null});
  const [showSubAnswer, setShowSubAnswer] = useState(false);

  const handleSwitch = (evt) => {
    const newa = answer.map((g)=>{
      if(g.id === Number(evt.target.dataset.guestid)){
        return {...g, 'willbe1': evt.target.value};
      }
      return g;
    })
    setAnswer(newa);
    let sha = false;
    newa.forEach((g) =>{
      if(g.willbe1 === "y"){
        sha = true;
      }
    })
    setShowSubAnswer(sha);
    //TODO: set data to backend API
  };

  const handleSubSwitch = (evt) => {
    setSubanswer({...subanswer, [evt.target.dataset.event]: evt.target.value});
    //TODO: request to API
  }

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
            <Typography component="p" variant="body" align="center">
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
              variant="body"
              align="center"
              sx={{ mt: 4 }}
            >
              {invitePreview.postinvite}
            </Typography>
          </Box>

          <Box sx={{ mx: 2 }}>
            <Typography component="p" variant="h5" sx={{ mt: 8, mb: 1 }}>
              Вінчання
            </Typography>
            <Typography component="p" variant="body" sx={{ mb: 1 }}>
              {invitePreview.placeOne}
            </Typography>
            {invitePreview.mapUrlOne !== "" && (
              <Button
                margin="normal"
                variant="outlined"
                href={invitePreview.mapUrlOne}
                target="_blank"
                multiline
                component="a"
                startIcon={<MapIcon />}
                sx={{ mb: 4 }}
              >
                Дивитись на мапі
              </Button>
            )}

            <Typography component="p" variant="h5" sx={{ mb: 1 }}>
              Банкет
            </Typography>
            <Typography component="p" variant="body" sx={{ mb: 1 }}>
              {invitePreview.placeTwo}
            </Typography>
            {invitePreview.mapUrlTwo !== "" && (
              <Button
                margin="normal"
                variant="outlined"
                href={invitePreview.mapUrlTwo}
                target="_blank"
                multiline
                component="a"
                startIcon={<MapIcon />}
                sx={{ mb: 8 }}
              >
                Дивитись на мапі
              </Button>
            )}
          </Box>

          <Box sx={{ backgroundColor: "#cfd8dc" }}>
            <Typography
              component="p"
              variant="body"
              align="center"
              sx={{ mb: 8, mt: 8, mx: 2 }}
            >
              Чи зможете ви приєднатись до святкування разом з нами?
            </Typography>

            {/* TODO: submit form for answer */}
            {Array.isArray(answer) &&
              answer.map((guest) => (
                <Grid
                  key={guest.id}
                  container
                  sx={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                    mx: 2,
                  }}
                >
                  <Grid item xs={8} sm={8}>
                    {guest.name}
                  </Grid>
                  <Grid item xs={4} sm={4}>
                    <ToggleButtonGroup
                      size="small"
                      value={guest.willbe1}
                      sx={{ border: "1px solid #607d8b" }}
                      exclusive
                      onChange={(evt) => handleSwitch(evt)}
                      aria-label="text alignment"
                      name="guest"
                    >
                      <ToggleButton
                        value="y"
                        aria-label="centered"
                        color="success"
                        sx={{ border: "1px solid #607d8b" }}
                        data-guestid={guest.id}
                      >
                        Так
                      </ToggleButton>
                      <ToggleButton
                        value="n"
                        aria-label="centered"
                        color="warning"
                        sx={{ border: "1px solid #607d8b" }}
                        data-guestid={guest.id}
                      >
                        &nbsp;Ні&nbsp;
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Grid>
                </Grid>
              ))}

            {showSubAnswer &&
            <>
            <Typography
              component="p"
              variant="body"
              align="center"
              sx={{ mt: 4, mb: 1, mx: 2 }}
            >
              На яких частинах свята плануєте бути присутніми?
            </Typography>

                <Grid
                container
                sx={{
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 1,
                  mx: 2,
                }}
              >
                <Grid item xs={8} sm={8}>
                  Вінчання
                </Grid>
                <Grid item xs={4} sm={4}>
                  <ToggleButtonGroup
                    size="small"
                    value={subanswer.w1}
                    sx={{ border: "1px solid #607d8b" }}
                    exclusive
                    onChange={(evt) => handleSubSwitch(evt)}
                    aria-label="text alignment"
                  >
                    <ToggleButton
                      value="y"
                      aria-label="centered"
                      color="success"
                      sx={{ border: "1px solid #607d8b" }}
                      data-event="w1"
                    >
                      Так
                    </ToggleButton>
                    <ToggleButton
                      value="n"
                      aria-label="centered"
                      color="warning"
                      sx={{ border: "1px solid #607d8b" }}
                      data-event="w1"
                    >
                      &nbsp;Ні&nbsp;
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
              </Grid>

              <Grid
                container
                sx={{
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 1,
                  mx: 2,
                }}
              >
                <Grid item xs={8} sm={8}>
                  Банкет
                </Grid>
                <Grid item xs={4} sm={4}>
                  <ToggleButtonGroup
                    size="small"
                    value={subanswer.w2}
                    sx={{ border: "1px solid #607d8b" }}
                    exclusive
                    onChange={(evt) => handleSubSwitch(evt)}
                    aria-label="text alignment"
                  >
                    <ToggleButton
                      value="y"
                      aria-label="centered"
                      color="success"
                      sx={{ border: "1px solid #607d8b" }}
                      data-event="w2"
                    >
                      Так
                    </ToggleButton>
                    <ToggleButton
                      value="n"
                      aria-label="centered"
                      color="warning"
                      sx={{ border: "1px solid #607d8b" }}
                      data-event="w2"
                    >
                      &nbsp;Ні&nbsp;
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
              </Grid>
              </>
            }

            <Typography
              component="p"
              variant="body"
              align="center"
              sx={{ mt: 8, mb: 8, mx: 2 }}
            >
              {invitePreview.deadline}
            </Typography>
          </Box>

          <Box sx={{ mx: 2 }}>
            {Array.isArray(invitePreview.inviteTimings) && (
              <Typography
                component="p"
                variant="h5"
                align="center"
                sx={{ mt: 8, mb: 2 }}
              >
                Таймінг дня
              </Typography>
            )}
            {Array.isArray(invitePreview.inviteTimings) &&
              invitePreview.inviteTimings.map((timing) => {
                return (
                  <Typography
                    key={timing.id}
                    component="p"
                    variant="body"
                    sx={{ mt: 1 }}
                  >
                    {timing.eventTime} - {timing.eventDesc}
                  </Typography>
                );
              })}
          </Box>

          {invitePreview.thankyou !== "" && (
            <Typography
              component="p"
              variant="body"
              align="center"
              sx={{ mt: 8 }}
            >
              {invitePreview.thankyou}
            </Typography>
          )}

          {invitePreview.addition !== "" && (
            <Typography
              component="p"
              variant="body"
              align="center"
              sx={{ mt: 8 }}
            >
              {invitePreview.addition}
            </Typography>
          )}
        </Box>
      )}
    </>
  );
};

export default InvitePreview;
