import { useSelector } from "react-redux";
import {
  selectInviteGroups,
  selectIsLoading,
  selectError,
  selectStatistics,
} from "../../redux/invites/selectors";
import { appUrl } from "../../redux/const";

import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import { useCopyToClipboard } from "../../hooks/copyToClipboard";

const InviteStat = () => {
  const inviteGroups = useSelector(selectInviteGroups);
  const isLoadingStat = useSelector(selectIsLoading);
  const isErrorStat = useSelector(selectError);
  const stat = useSelector(selectStatistics);

  const [copiedText, copy] = useCopyToClipboard();
  const handleCopy = (text) => () => {
    copy(text)
      .then(() => {
        toast.success("Посилання на запрошення скопійоване!");
      })
      .catch((error) => {
        toast.error("Помилка!", error);
      });
  };

  return (
    <>
      {isErrorStat && <ErrorMessage>{isErrorStat}</ErrorMessage>}
      {isLoadingStat && <Loader />}

      {inviteGroups && (
        <>
          <Card variant="outlined" sx={{ mb: 2 }}>
            <CardHeader title="Статистика запрошень"></CardHeader>
            <CardContent>
              <Typography variant="body">
                Будуть присутні <b>{stat.willbey}</b> гостей (із{" "}
                {stat.willbey + stat.willben} запрошених)
              </Typography>
              <List>
                <ListItem>
                  На вінчанні: &nbsp;<b>{stat.w1y}</b>
                </ListItem>
                <ListItem>
                  На банкеті: &nbsp;<b>{stat.w2y}</b>
                </ListItem>
                <ListItem>
                  Потрібен трансфер: &nbsp;<b>{stat.transfer}</b>
                </ListItem>
              </List>
            </CardContent>
          </Card>
          {inviteGroups.map((ig) => (
            <Card key={ig.id} variant="outlined" sx={{ mb: 2 }}>
              <CardContent>
                <List dense={true}>
                  {ig.inviteGuests.map((guest) => (
                    <ListItem key={guest.id}>
                      <Grid container>
                        <Grid item xs={5}>
                          {guest.name}
                        </Grid>
                        <Grid item xs={7}>
                          {guest.willbe === "y" ? (
                            <Chip size="small" label="Буду" color="success" />
                          ) : guest.willbe === "n" ? (
                            <Chip size="small" label="Не буду" color="error" />
                          ) : (
                            <Chip size="small" label="Не відповіли" />
                          )}
                          {guest.willbe === "y"
                            ? ig.w1 === "y" && (
                                <Chip
                                  label="шлюб"
                                  size="small"
                                  color="success"
                                  variant="outlined"
                                />
                              )
                            : ""}
                          {guest.willbe === "y"
                            ? ig.w2 === "y" && (
                                <Chip
                                  label="банкет"
                                  size="small"
                                  color="success"
                                  variant="outlined"
                                />
                              )
                            : ""}
                        </Grid>
                      </Grid>
                    </ListItem>
                  ))}
                </List>
                {ig.transfer === "y" && (
                  <Chip
                    label="Трансфер"
                    size="small"
                    color="warning"
                    variant="outlined"
                  />
                )}
              </CardContent>
              <CardActions>
                <TextField
                  size="small"
                  fullWidth
                  id="standard-basic"
                  label="Посилання на запрошення"
                  variant="outlined"
                  value={appUrl + "/invitation/" + ig.link}
                />
                <Tooltip title="Скопіювати посилання на запрошення">
                  <IconButton
                    variant="outlined"
                    size="small"
                    onClick={handleCopy(appUrl + "/invitation/" + ig.link)}
                    value={copiedText}
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </Tooltip>
              </CardActions>
            </Card>
          ))}
        </>
      )}
    </>
  );
};

export default InviteStat;
