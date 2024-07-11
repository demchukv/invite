import { BackTimer } from "../BackTimer/BackTimer";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import dayjs from "dayjs";
import "dayjs/locale/uk";
import updateLocale from "dayjs/plugin/updateLocale";
dayjs.locale("uk");
dayjs.extend(updateLocale);
dayjs.updateLocale("uk", {
  months: [
    "Січень",
    "Лютий",
    "Березень",
    "Квітень",
    "Травень",
    "Червень",
    "Липень",
    "Серпень",
    "Вересень",
    "Жовтень",
    "Листопад",
    "Грудень",
  ],
  weekdays: ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
});

export const InvitationWhite = ({
  invite,
  handleAnswerClick,
  handleSubAnswerClick,
  handleTransferClick,
  showSubAnswer,
  showTransfer,
}) => {
  const head_style = {
    backgroundImage: `url(${invite?.photo}?t=${Math.random()})`,
  };
  const timer_style = {
    backgroundImage: `url(${invite?.timerphoto}?t=${Math.random()})`,
  };
  const miniCalendar = [];
  for (let i = 1; i < 8; i++) {
    miniCalendar.push({
      dn: dayjs(dayjs(invite.end_point).day(i)).format("dddd"),
      dd: dayjs(dayjs(invite.end_point).day(i)).format("DD"),
      sel:
        dayjs(invite.end_point).format("DD") ===
        dayjs(dayjs(invite.end_point).day(i)).format("DD")
          ? true
          : false,
    });
  }
  const images = [];
  if (Array.isArray(invite?.invitePhotos)) {
    for (const img of invite.invitePhotos) {
      images.push({ original: img.photo_name, thumbnail: null });
    }
  }

  return (
    <div className="in_page">
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
          <h1 className="in_header-title in_title_font great-vibes-regular">
            <span className="in_left">{invite.name_one}</span>
            <br />
            <span className="in_plus">+</span>
            <br />
            <span className="in_right">{invite.name_two}</span>
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

        {/* Calendar */}
        <div className="in_pad pt50 pb50 mt10 in_invite_calendar">
          <h4 className="mb10 in_invite_calendar_title">
            {dayjs(invite.end_point).format("MMMM")}
          </h4>
          <div className="mb10 in_invite_calendar_days">
            {miniCalendar.map((day, idx) => (
              <div
                key={"dn" + idx}
                className={
                  day.sel === true
                    ? "in_invite_calendar_dayname in_invite_calendar_dayname_sel"
                    : "in_invite_calendar_dayname"
                }
              >
                {day.dn}
              </div>
            ))}
          </div>
          <div className="in_invite_calendar_days in_sel_icon">
            {miniCalendar.map((day, idx) => (
              <div
                key={"dd" + idx}
                className={
                  day.sel === true
                    ? "in_invite_calendar_daynumber in_invite_calendar_dayname_sel "
                    : "in_invite_calendar_daynumber"
                }
              >
                {day.dd}
              </div>
            ))}
          </div>
        </div>

        <div className="in_pad pb50 mt10">
          <p className="in_text in_center_text">{invite.postinvite}</p>
        </div>

        {/* Map */}
        <div className="in_pad in_dark_bg pb50 pt50 in_invite">
          <div className="in_text in_center_text in_invite_title in_invite_bg_one great-vibes-regular">
            Вінчання
          </div>
          <div
            className="in_text_sm in_center_text mt30 in_invite_desc"
            dangerouslySetInnerHTML={{ __html: invite.place_one }}
          ></div>
          {invite.map_url_one !== "" && (
            <a
              href={invite.map_url_one}
              target="_blank"
              className="in_as_btn mb50 mt10"
            >
              Дивитись на мапі
            </a>
          )}
          <div className="in_text in_center_text in_invite_title in_invite_bg_two great-vibes-regular">
            Банкет
          </div>
          <div
            className="in_text_sm in_center_text mb10 mt30 in_invite_desc "
            dangerouslySetInnerHTML={{ __html: invite.place_two }}
          ></div>
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
        <div className="in_pad pb50 pt50 in_ligth_bg">
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
              {invite.inviteGroup && showTransfer && (
                <div className="in_guest_control mt50">
                  <div className="in_text">
                    Чи потрібен трансфер
                    <br />
                    від церкви до ресторану?
                  </div>
                  <div className="in_guest_btn">
                    <button
                      type="button"
                      className={
                        invite.inviteGroup.transfer === "y"
                          ? "in_as_btn in_btn_fixed"
                          : "in_as_btn_outlined in_btn_fixed"
                      }
                      onClick={() => handleTransferClick("transfer", "y")}
                    >
                      Так
                    </button>
                    <button
                      type="button"
                      className={
                        invite.inviteGroup.transfer === "n"
                          ? "in_as_btn in_btn_fixed"
                          : "in_as_btn_outlined in_btn_fixed"
                      }
                      onClick={() => handleTransferClick("transfer", "n")}
                    >
                      Ні
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          <p className="in_center_text mt50">{invite.deadline}</p>
        </div>

        {invite.thankyou !== "" && invite.thankyou !== null && (
          <>
            <div className="in_pad pb50 pt50 in_center_text">
              <p className="great-vibes-regular in_invite_section">Дрес-код</p>
              <p className="in_center_text">{invite.thankyou}</p>
            </div>
          </>
        )}

        {images.length > 0 && (
          <ImageGallery
            items={images.reverse()}
            showFullscreenButton={false}
            showPlayButton={false}
            showThumbnails={false}
          />
        )}

        {/* Timings */}
        {Array.isArray(invite.inviteTiming) &&
          invite.inviteTiming.length > 0 && (
            <div className="in_pad pb50 pt50">
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
          )}

        {invite.addition !== "" && invite.addition !== null && (
          <div className="in_pad pb50 pt50 in_center_text">
            {invite.addition}
            <p className="in_center_text pt50 great-vibes-regular in_invite_section">
              З любов'ю,<br></br>
              {invite.name_one} та {invite.name_two}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
