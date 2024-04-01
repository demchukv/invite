import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DocumentTitle from "../components/DocumentTitle";
import InviteForm from "../components/InviteForm/InviteForm";
import { fetchEmptyInvite } from "../redux/invites/operations";
import Loader from "../components/Loader/Loader";
import { selectIsLoading, selectError } from "../redux/invites/selectors";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import Box from '@mui/material/Box';

export default function InviteCreatePage() {
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectError);
  const dispatch = useDispatch();

    useEffect(() => {
    dispatch(fetchEmptyInvite());
  }, [dispatch]);

  return (
    <>
      <DocumentTitle>Edit your invitation</DocumentTitle>
      {isError && <ErrorMessage>{isError}</ErrorMessage>}
      {isLoading && <Loader />}

      {!isError && !isLoading &&
      <Box sx={{ maxWidth: "460px", typography: "body1" }}>
        <InviteForm />
      </Box>
      }
    </>
  );
}
