// import { BackTimer } from "../BackTimer/BackTimer";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import dayjs from "dayjs";
import "dayjs/locale/uk";
import updateLocale from "dayjs/plugin/updateLocale";

export const InvitationLimeSpain = ({
  invite,
  handleAnswerClick,
  // handleSubAnswerClick,
  handleTransferClick,
  showSubAnswer,
  // showTransfer,
}) => {
  dayjs.locale("es");
  dayjs.extend(updateLocale);
  dayjs.updateLocale("es", {
    months: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Puede",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    weekdays: ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"],
    //   weekdays: ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
  });

  const head_style = {
    backgroundImage: `url(${invite?.photo}?t=${Math.random()})`,
  };
  // const timer_style = {
  //   backgroundImage: `url(${invite?.timerphoto}?t=${Math.random()})`,
  // };
  // console.log(dayjs(invite.end_point));
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
  // console.log(miniCalendar);
  const images = [];
  if (Array.isArray(invite?.invitePhotos)) {
    for (const img of invite.invitePhotos) {
      images.push({ original: img.photo_name, thumbnail: null });
    }
  }

  // showSubAnswer = true;
  // showTransfer = true;
  console.log("invite lime spain template");
  return (
    <div className="in_page">
      <div className="in_container">
        {/* <div
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
        </div> */}

        {/* HEADER */}
        <div className="in_header in_head_pad in_pad" style={head_style}>
          <h1 className="in_header-title in_title_font great-vibes-regular">
            <span className="in_left">{invite.name_one}</span>
            <br />
            <span className="in_plus">&</span>
            <br />
            <span className="in_right">{invite.name_two}</span>
          </h1>
          <div className="in_head_date">
            <div className="in_head_date_inner">
              <div className="in_head_date_item">AGOSTO</div>
            </div>
            <div className="in_head_date_inner">
              <div className="in_head_date_item in_head_date_border">
                Viernes
              </div>
              <div className="in_head_date_item in_head_date_number">30</div>
              <div className="in_head_date_item in_head_date_border">12:00</div>
            </div>
            <div className="in_head_date_inner">
              <div className="in_head_date_item">2024</div>
            </div>
          </div>
        </div>

        {/* Invitation */}
        <div className="in_pad pt50">
          {Array.isArray(invite.inviteGuests) &&
            invite.inviteGuests.length > 0 && (
              <>
                {/* {invite.inviteGuests.length === 1 && (
                  <p className="in_text in_center_text">Дорогий</p>
                )}
                {invite.inviteGuests.length > 1 && (
                  <p className="in_text in_center_text">Дорогі</p>
                )} */}

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
                      idx > 0 ? " y " + guest.name : guest.name
                    )}
                </p>
              </>
            )}

          <p className="in_text in_center_text mt10 mb10">
            {invite.invitation}
          </p>
        </div>

        {/* Calendar */}
        <div className="in_pad pt50 pb50 mt10 in_invite_calendar in_ligth_bg">
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
          <div className="in_invite_calendar_days ">
            {miniCalendar.map((day, idx) => (
              <div
                key={"dd" + idx}
                className={
                  day.sel === true
                    ? "in_invite_calendar_daynumber in_invite_calendar_dayname_sel in_sel_icon"
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
          {/* <p className="in_text in_center_text mt10">
            Локація pet-friendly, тому будемо раді бачити і ваших улюбленців.
          </p> */}
        </div>

        {images.length > 0 && (
          <div className="in_pad pb30 mb10">
            <ImageGallery
              items={images}
              showFullscreenButton={false}
              showPlayButton={false}
              showThumbnails={false}
            />
          </div>
        )}

        {/* Map */}
        <div className="in_pad in_dark_bg pb50 pt50 in_invite">
          <div className="in_text in_center_text in_invite_title in_invite_bg_one great-vibes-regular">
            Ceremonia de la boda
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
              Mira el mapa
            </a>
          )}
          <div className="in_text in_center_text mt50 in_invite_title in_invite_bg_two great-vibes-regular">
            Banquete
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
              Mira el mapa
            </a>
          )}
        </div>

        {/* Guests answer */}
        <div className="in_pad pb50 pt50 in_ligth_bg">
          <p className="in_text in_center_text mb50">
            Podrás unirte a la celebración en Liteplo con nosotros?
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
                      onClick={() => handleAnswerClick(guest.id, "y", true)}
                    >
                      Sí
                    </button>
                    <button
                      type="button"
                      className={
                        guest.willbe === "n"
                          ? "in_as_btn in_btn_fixed"
                          : "in_as_btn_outlined in_btn_fixed"
                      }
                      onClick={() => handleAnswerClick(guest.id, "n", true)}
                    >
                      No
                    </button>
                  </div>
                </div>
              ))}
          </>

          {invite.inviteGroup && showSubAnswer && (
            <div>
              {/* <p className="in_text in_center_text mb50 mt50">
                Чи зможете ви приєднатись до святкування на локації Літепло
                разом з нами?
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
              </div> */}
              {invite.inviteGroup && (
                <div className="in_guest_control in_guest_control_transfer mt50">
                  <div className="in_text in_center_text">
                    Quieres utilizar el traslado desde la iglesia hasta el lugar
                    de la celebración?
                  </div>
                  <div className="in_guest_btn mt10">
                    <button
                      type="button"
                      className={
                        invite.inviteGroup.transfer === "y"
                          ? "in_as_btn in_btn_fixed"
                          : "in_as_btn_outlined in_btn_fixed"
                      }
                      onClick={() => handleTransferClick("transfer", "y")}
                    >
                      Sí
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
                      No
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
              <p className="great-vibes-regular in_invite_section">
                Dress code
              </p>
              <p className="in_center_text">{invite.thankyou}</p>
              <div className="in_palitra">
                <div className="in_palitra_item pi0"></div>
                <div className="in_palitra_item pi1"></div>
                <div className="in_palitra_item pi2"></div>
                <div className="in_palitra_item pi3"></div>
                <div className="in_palitra_item pi4"></div>
              </div>
            </div>
          </>
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
          <div className="in_pad pb50 pt50 in_center_text in_ligth_bg">
            {invite.addition}
            <img
              className="in_img_tsan"
              src="/4/igor-tsan.jpg"
              width={500}
              height={889}
            />
            <p className="mt30">
              🔗 Enlace:
              <br />
              <a href="https://send.monobank.ua/jar/8P9fgfC1HP" target="_blank">
                Ir al pago
              </a>
            </p>
            <p className="mt30">
              💳 Número de tarjeta:
              <br />
              5375 4112 2015 0358
            </p>
          </div>
        )}
        <div>
          <p className="in_center_text pt50 pb50 great-vibes-regular in_invite_section">
            Con amor,<br></br>
            {invite.name_one} y {invite.name_two}
          </p>
        </div>
      </div>
    </div>
  );
};
