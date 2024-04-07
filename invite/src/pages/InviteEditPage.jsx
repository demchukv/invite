import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DocumentTitle from "../components/DocumentTitle";
import InviteForm from "../components/InviteForm/InviteForm";
import GuestsForm from "../components/GuestsForm/GuestsForm";
// import InvitePreview from "../components/InvitePreview/InvitePreview";
import InvitePreviewTwo from "../components/InvitePreview/InvitePreviewTwo";
import InviteStat from "../components/InviteStat/InviteStat";
import { useParams } from "react-router-dom";
import {
  fetchOneInvite,
  fetchOneInviteById,
} from "../redux/invites/operations";
import { selectIsLoading, selectError } from "../redux/invites/selectors";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import Loader from "../components/Loader/Loader";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import PeopleIcon from "@mui/icons-material/People";
import PreviewIcon from "@mui/icons-material/Preview";
import ChecklistIcon from "@mui/icons-material/Checklist";

export default function InviteEditPage() {
  const { inviteId } = useParams();
  const [tabValue, setTabValue] = useState("0");
  const dispatch = useDispatch();
  const isLoadingInvite = useSelector(selectIsLoading);
  const isErrorInvite = useSelector(selectError);

  useEffect(() => {
    if (tabValue === "2") {
      dispatch(fetchOneInviteById(inviteId));
    } else {
      dispatch(fetchOneInvite(inviteId));
    }
  }, [dispatch, inviteId, tabValue]);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <DocumentTitle>Edit your invitation</DocumentTitle>
      {isErrorInvite && <ErrorMessage>{isErrorInvite}</ErrorMessage>}
      {isLoadingInvite && <Loader />}

      <Box sx={{ maxWidth: "460px", typography: "body1" }}>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="edit invite tabs">
              <Tab icon={<DynamicFormIcon />} label="" value="0" />
              <Tab icon={<PeopleIcon />} label="" value="1" />
              <Tab icon={<PreviewIcon />} label="" value="2" />
              <Tab icon={<ChecklistIcon />} label="" value="3" />
            </TabList>
          </Box>
          {!isLoadingInvite && !isErrorInvite && (
            <>
              <TabPanel value="0">
                <InviteForm type="edit" />
              </TabPanel>
              <TabPanel value="1">
                <GuestsForm />
              </TabPanel>
              <TabPanel value="2">
                <InvitePreviewTwo />
              </TabPanel>
              <TabPanel value="3">
                <InviteStat />
              </TabPanel>
            </>
          )}
        </TabContext>
      </Box>
    </>
  );
}
