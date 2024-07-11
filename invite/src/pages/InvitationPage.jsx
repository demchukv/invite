import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { selectInvitation } from "../redux/invites/selectors";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOneInviteByLink,
  updateGuestAnswer,
  updateGuestSubAnswer,
  updateGuestTransfer,
} from "../redux/invites/operations";
import { Helmet } from "react-helmet-async";
import DocumentTitle from "../components/DocumentTitle";
import { selectIsLoading, selectError } from "../redux/invites/selectors";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import Loader from "../components/Loader/Loader";

import { InvitationWhite } from "../components/Invitation/InvitationWhite";
import { InvitationLime } from "../components/Invitation/InvitationLime";

const InvitationPage = () => {
  const dispatch = useDispatch();
  const { link } = useParams();
  const invite = useSelector(selectInvitation);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectError);
  const [showSubAnswer, setShowSubAnswer] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);

  useEffect(() => {
    if (!link) return;
    dispatch(fetchOneInviteByLink(link));
  }, [dispatch, link]);

  useEffect(() => {
    setShowSubAnswer(invite.willbe);
  }, [invite.willbe]);

  useEffect(() => {
    if (!invite || !link) return;
    setShowTransfer(
      invite.inviteGroup &&
        (invite.inviteGroup.w1 === "y" || invite.inviteGroup.w2 === "y")
        ? true
        : false
    );
  }, [invite, link]);

  const handleAnswerClick = (guest_id, answer) => {
    if (!link) return;
    dispatch(updateGuestAnswer({ guest_id, answer, link }));
  };

  const handleSubAnswerClick = (field, val) => {
    if (!link) return;
    dispatch(updateGuestSubAnswer({ field, val, link }));
  };

  const handleTransferClick = (field, val) => {
    if (!link) return;
    dispatch(updateGuestTransfer({ field, val, link }));
  };

  const cssFile = invite?.inviteTheme?.css
    ? `/styles/${invite.inviteTheme.css}.css`
    : `/styles/white.css`;

  const nameOfTemplates = ["white", "lime"];
  return (
    <>
      {isError && <ErrorMessage>{isError}</ErrorMessage>}
      {isLoading && <Loader />}

      {invite && invite.id && (
        <>
          {link && (
            <Helmet>
              <link type="text/css" rel="stylesheet" href={cssFile} />
            </Helmet>
          )}
          <DocumentTitle>{`Запрошення на весілля: ${invite.name_one} та ${invite.name_two}`}</DocumentTitle>
          {(invite.inviteTheme.css === "white" ||
            !nameOfTemplates.includes(invite.inviteTheme.css)) && (
            <InvitationWhite
              invite={invite}
              handleAnswerClick={handleAnswerClick}
              handleSubAnswerClick={handleSubAnswerClick}
              handleTransferClick={handleTransferClick}
              showSubAnswer={showSubAnswer}
              showTransfer={showTransfer}
            />
          )}
          {invite.inviteTheme.css === "lime" && (
            <InvitationLime
              invite={invite}
              handleAnswerClick={handleAnswerClick}
              handleSubAnswerClick={handleSubAnswerClick}
              handleTransferClick={handleTransferClick}
              showSubAnswer={showSubAnswer}
              showTransfer={showTransfer}
            />
          )}
        </>
      )}
    </>
  );
};

export default InvitationPage;
