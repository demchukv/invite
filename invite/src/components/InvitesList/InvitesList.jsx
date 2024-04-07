import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectInvites } from "../../redux/invites/selectors";
import { Link as RouterLink } from "react-router-dom";
import DeleteInviteDialog from "../DeleteInviteDialog/DeleteInviteDialog";
import { deleteInvite, fetchEmptyInvite } from "../../redux/invites/operations";
import toast from "react-hot-toast";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Tooltip from '@mui/material/Tooltip';

const InvitesList = () => {
  const [open, setOpen] = useState(false);
  const [inviteId, setInviteId] = useState(null);
  const invites = useSelector(selectInvites);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmptyInvite());
  }, [dispatch]);

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteInvite(id));
    setOpen(false);
    toast.success("Запрошення і всі супутні дані успішно виадалені!");
  };

  return (
    Array.isArray(invites) && (
      <>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {invites.map((invite, index) => {
            const primaryText = `${invite.nameOne} and ${invite.nameTwo}`;
            const secondaryText = `Дата події: ${invite.endPoint}`;
            const hRef = `/invites/${invite.id}`;

            return (
              <React.Fragment key={invite.id}>
                {index !== 0 && <Divider variant="inset" component="li" />}
                <ListItem key={invite.id} component={RouterLink} to={hRef} sx={{color: "text.primary"}}>
                  <ListItemAvatar>
                    <Avatar sx={{ backgroundColor: "background.paper" }}>
                      <AssignmentTurnedInIcon color="secondary" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={primaryText}
                    secondary={secondaryText}
                  />
                  <ListItemSecondaryAction>
                  <Tooltip title="Видалити запрошення" placement="top">
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => {setInviteId(invite.id); setOpen(true)}}
                    >
                      <DeleteIcon />
                    </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
              </React.Fragment>
            );
          })}
        </List>
        <DeleteInviteDialog
          open={open}
          id={inviteId}
          handleClose={handleCloseDialog}
          handleDelete={handleDelete}
        />
      </>
    )
  );
};

export default InvitesList;
