import { useSelector } from "react-redux";
import DocumentTitle from "../components/DocumentTitle";
import InviteForm from "../components/InviteForm/InviteForm";
import Loader from "../components/Loader/Loader";
import { selectIsLoading, selectError } from "../redux/invites/selectors";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import { useParams } from "react-router-dom";

export default function InviteCreatePage() {
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectError);
  const { inviteId } = useParams();
 
  return (
    <>
      <DocumentTitle>Edit your invitation</DocumentTitle>
      {isError && <ErrorMessage>{isError}</ErrorMessage>}
      {isLoading && <Loader />}

        <InviteForm inviteId={inviteId} />

    </>
  );
}
