import { useState, } from "react";
import { useSelector, useDispatch } from "react-redux";
import DocumentTitle from "../components/DocumentTitle";
import InviteForm from "../components/InviteForm/InviteForm";
import GuestsForm from "../components/GuestsForm/GuestsForm";
import InvitePreview from "../components/InvitePreview/InvitePreview";
import Loader from "../components/Loader/Loader";
import { selectIsLoading, selectError } from "../redux/invites/selectors";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import { useParams } from "react-router-dom";
import { fetchOneInvite } from "../redux/invites/operations";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

export default function InviteEditPage() {
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectError);
  const { inviteId } = useParams();
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
 

  const handleChange = (event, newValue) => {
    if(newValue === 2){
      dispatch(fetchOneInvite(inviteId));
    }
    setValue(newValue);
  };

  return (
    <>
      <DocumentTitle>Edit your invitation</DocumentTitle>
      {isError && <ErrorMessage>{isError}</ErrorMessage>}
      {isLoading && <Loader />}

      <Box sx={{ maxWidth: '420px', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Edit" value={0} />
            <Tab label="Guests" value={1} />
            <Tab label="Preview" value={2} />
          </TabList>
        </Box>
        <TabPanel value={0}><InviteForm inviteId={inviteId} /></TabPanel>
        <TabPanel value={1}><GuestsForm inviteId={inviteId} /></TabPanel>
        <TabPanel value={2}><InvitePreview /></TabPanel>
      </TabContext>
    </Box>

    </>
  );
}
