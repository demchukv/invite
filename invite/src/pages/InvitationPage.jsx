import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { selectInvitation } from "../redux/invites/selectors";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOneInviteByLink,
  updateGuestAnswer,
  updateGuestSubAnswer,
} from "../redux/invites/operations";
import { Helmet } from "react-helmet-async";
import DocumentTitle from "../components/DocumentTitle";
import { selectIsLoading, selectError } from "../redux/invites/selectors";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import Loader from "../components/Loader/Loader";
import { BackTimer } from "../components/BackTimer/BackTimer";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import "dayjs/locale/uk";

import "./InvitationPage.css";

const InvitationPage = () => {
  const dispatch = useDispatch();
  const { link } = useParams();
  const invite = useSelector(selectInvitation);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectError);
  //const [value, setValue] = useState(dayjs(invite.end_point));
  const [showSubAnswer, setShowSubAnswer] = useState(false);

  useEffect(() => {
    if (!link) return;
    dispatch(fetchOneInviteByLink(link));
  }, [dispatch, link]);

  useEffect(() => {
    setShowSubAnswer(invite.willbe);
  }, [invite.willbe]);

  const head_style = {
    backgroundImage: `url(${invite?.photo}?t=${Math.random()})`,
  };
  const timer_style = {
    backgroundImage: `url(${invite?.timerphoto}?t=${Math.random()})`,
  };

  const handleAnswerClick = (guest_id, answer) => {
    if (!link) return;
    dispatch(updateGuestAnswer({ guest_id, answer, link }));
  };

  const handleSubAnswerClick = (field, val) => {
    if (!link) return;
    dispatch(updateGuestSubAnswer({ field, val, link }));
  };

  const cssFile = invite?.inviteTheme?.css
    ? `/styles/${invite.inviteTheme.css}.css`
    : `/styles/first.css`;

  const images = [];
  if (Array.isArray(invite?.invitePhotos)) {
    for (const img of invite.invitePhotos) {
      images.push({ original: img.photo_name, thumbnail: null });
    }
  }

  return (
    <>
      {isError && <ErrorMessage>{isError}</ErrorMessage>}
      {isLoading && <Loader />}

      {invite && invite.id && (
        <div className="in_page">
          {link && (
            <Helmet>
              <link type="text/css" rel="stylesheet" href={cssFile} />
            </Helmet>
          )}
          <DocumentTitle>{`Запрошення на весілля: ${invite.name_one} та ${invite.name_two}`}</DocumentTitle>
          <div className="in_container">
            <div
              className="in_pad in_header in_very_dark_bg pb50 pt50 in_timer"
              style={timer_style}
            >
              <BackTimer
                date={
                  new Date(
                    dayjs(
                      invite.end_point +
                        " " +
                        (!invite.inviteTiming
                          ? ""
                          : invite.inviteTiming[0].event_time)
                    )
                  )
                }
              />
              <p className="in_text in_center_text in_txt_white in_txt_italic mt50">
                ... і ми будемо одружені
              </p>
            </div>

            {/* HEADER */}
            <div
              className="in_header in_head_pad in_pad in_very_dark_bg"
              style={head_style}
            >
              <h1 className="in_header-title in_title_font">
                {invite.name_one}
                <br />+<br />
                {invite.name_two}
              </h1>
            </div>

            {/* Invitation */}
            <div className="in_pad pt50">
              {Array.isArray(invite.inviteGuests) &&
                invite.inviteGuests.length > 0 && (
                  <>
                    {invite.inviteGuests.length === 1 && (
                      <p className="in_text in_center_text">Дорогий</p>
                    )}
                    {invite.inviteGuests.length > 1 && (
                      <p className="in_text in_center_text">Дорогі</p>
                    )}

                    {invite.inviteGuests.length === 1 &&
                      invite.inviteGuests.map((guest, idx) => (
                        <p
                          key={idx}
                          className="in_text in_center_text in_title_font in_txt_bigger"
                        >
                          {guest.name}
                        </p>
                      ))}
                    <p className="in_text in_center_text in_title_font in_txt_bigger">
                      {invite.inviteGuests.length === 2 &&
                        invite.inviteGuests.map((guest, idx) =>
                          idx > 0 ? " та " + guest.name : guest.name
                        )}
                    </p>
                  </>
                )}

              <p className="in_text in_center_text mt10 mb10">
                {invite.invitation}
              </p>
            </div>
            <div className="">
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="uk"
              >
                <DateCalendar
                  value={dayjs(invite.end_point)}
                  // onChange={(newValue) => setValue(newValue)}
                  readOnly
                  disabled
                />
              </LocalizationProvider>
            </div>

            <div className="in_pad pb50 mt10">
              <p className="in_text in_center_text">{invite.postinvite}</p>
            </div>

            {/* Map */}
            <div className="in_pad in_dark_bg pb50 pt50 in_invite">
              <div className="in_text in_center_text in_text_upper in_invite_title in_invite_bg_one">Вінчання</div>
              <div className="in_text_sm in_center_text mt30 in_invite_desc" dangerouslySetInnerHTML={{__html:invite.place_one}}>
              </div>
              {invite.map_url_one !== "" && (
                <a
                  href={invite.map_url_one}
                  target="_blank"
                  className="in_as_btn mb50 mt10"
                >
                  Дивитись на мапі
                </a>
              )}
              <div className="in_text in_center_text in_text_upper in_invite_title in_invite_bg_two">Банкет</div>
              <div className="in_text_sm in_center_text mb10 mt30 in_invite_desc" dangerouslySetInnerHTML={{__html:invite.place_two}}>
              </div>
              {invite.map_url_two !== "" && invite.map_url_two !== null && (
                <a
                  href={invite.map_url_two}
                  target="_blank"
                  className="in_as_btn mt10"
                >
                  Дивитись на мапі
                </a>
              )}
            </div>

            {/* Guests answer */}
            <div className="in_pad pb50 pt50">
              <p className="in_text in_center_text mb50">
                Чи зможете ви приєднатись до святкування разом з нами?
              </p>
              <>
                {Array.isArray(invite.inviteGuests) &&
                  invite.inviteGuests.length > 0 &&
                  invite.inviteGuests.map((guest) => (
                    <div key={guest.id} className="in_guest_control mt10">
                      <div className="in_text">{guest.name}</div>
                      <div className="in_guest_btn">
                        <button
                          type="button"
                          className={
                            guest.willbe === "y"
                              ? "in_as_btn in_btn_fixed"
                              : "in_as_btn_outlined in_btn_fixed"
                          }
                          onClick={() => handleAnswerClick(guest.id, "y")}
                        >
                          Так
                        </button>
                        <button
                          type="button"
                          className={
                            guest.willbe === "n"
                              ? "in_as_btn in_btn_fixed"
                              : "in_as_btn_outlined in_btn_fixed"
                          }
                          onClick={() => handleAnswerClick(guest.id, "n")}
                        >
                          Ні
                        </button>
                      </div>
                    </div>
                  ))}
              </>
              {invite.inviteGroup && showSubAnswer && (
                <div>
                  <p className="in_text in_center_text mb50 mt50">
                    На яких частинах свята плануєте бути присутніми?
                  </p>
                  <div className="in_guest_control mt10">
                    <div className="in_text">Вінчання</div>
                    <div className="in_guest_btn">
                      <button
                        type="button"
                        className={
                          invite.inviteGroup.w1 === "y"
                            ? "in_as_btn in_btn_fixed"
                            : "in_as_btn_outlined in_btn_fixed"
                        }
                        onClick={() => handleSubAnswerClick("w1", "y")}
                      >
                        Так
                      </button>
                      <button
                        type="button"
                        className={
                          invite.inviteGroup.w1 === "n"
                            ? "in_as_btn in_btn_fixed"
                            : "in_as_btn_outlined in_btn_fixed"
                        }
                        onClick={() => handleSubAnswerClick("w1", "n")}
                      >
                        Ні
                      </button>
                    </div>
                  </div>
                  <div className="in_guest_control mt10">
                    <div className="in_text">Банкет</div>
                    <div className="in_guest_btn">
                      <button
                        type="button"
                        className={
                          invite.inviteGroup.w2 === "y"
                            ? "in_as_btn in_btn_fixed"
                            : "in_as_btn_outlined in_btn_fixed"
                        }
                        onClick={() => handleSubAnswerClick("w2", "y")}
                      >
                        Так
                      </button>
                      <button
                        type="button"
                        className={
                          invite.inviteGroup.w2 === "n"
                            ? "in_as_btn in_btn_fixed"
                            : "in_as_btn_outlined in_btn_fixed"
                        }
                        onClick={() => handleSubAnswerClick("w2", "n")}
                      >
                        Ні
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <p className="in_text_sm in_center_text mt50">
                {invite.deadline}
              </p>
            </div>

            {images.length > 0 && (
              <ImageGallery
                items={images}
                showFullscreenButton={false}
                showPlayButton={false}
                showThumbnails={false}
              />
            )}

            {/* Timings */}
            {Array.isArray(invite.inviteTiming) &&
                  invite.inviteTiming.length > 0 &&
            <div className="in_pad in_dark_bg pb50 pt50">
              <p className="in_text in_center_text mb50">Таймінг дня</p>
              <>
                {Array.isArray(invite.inviteTiming) &&
                  invite.inviteTiming.length > 0 &&
                  invite.inviteTiming.map((timing) => {
                    return (
                      <p key={timing.id} className="in_text mb10">
                        {timing.event_time} - {timing.event_desc}
                      </p>
                    );
                  })}
              </>
            </div>
            }

            {invite.thankyou !== "" && invite.thankyou !== null && (
              <div className="in_pad pb50 pt50">{invite.thankyou}</div>
            )}

            {invite.addition !== "" && invite.addition !== null && (
              <div className="in_pad in_dark_bg pb50 pt50">
                {invite.addition}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default InvitationPage;

