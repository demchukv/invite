import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DocumentTitle from "../components/DocumentTitle";
import InvitesList from "../components/InvitesList/InvitesList";
import Loader from "../components/Loader/Loader";
import { fetchInvites } from "../redux/invites/operations";
import { selectIsLoading, selectError } from "../redux/invites/selectors";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import { Link as RouterLink } from 'react-router-dom';

import Button from "@mui/material/Button";

export default function Invites() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchInvites());
  }, [dispatch]);

  return (
    <>
      <DocumentTitle>Your invitations</DocumentTitle>
          {isError && <ErrorMessage>{isError}</ErrorMessage>}
          {isLoading && <Loader />}
          <Button
            fullWidth
            component={RouterLink} to={"/create"}
            color="secondary"
            variant="contained"
            size="big"
          >
            Create your invitation
          </Button>
          <InvitesList />
    </>
  );
}
