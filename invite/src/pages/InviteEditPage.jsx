import { useState, useEffect } from "react";
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
  const [value, setValue] = useState("0");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOneInvite(inviteId));
  }, [dispatch, inviteId, value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <DocumentTitle>Edit your invitation</DocumentTitle>
      {isError && <ErrorMessage>{isError}</ErrorMessage>}
      {isLoading && <Loader />}

      {!isLoading && !isError && (
        <Box sx={{ maxWidth: "460px", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Запрошення" value="0" />
                <Tab label="Гості" value="1" />
                <Tab label="Перегляд" value="2" />
              </TabList>
            </Box>
            <TabPanel value="0">
              <InviteForm type="edit" />
            </TabPanel>
            <TabPanel value="1">
              <GuestsForm />
            </TabPanel>
            <TabPanel value="2">
              <InvitePreview />
            </TabPanel>
          </TabContext>
        </Box>
      )}
    </>
  );
}
