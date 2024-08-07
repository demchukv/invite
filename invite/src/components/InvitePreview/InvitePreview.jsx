import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectIsLoading, selectError } from "../../redux/invites/selectors";
import { changeInvitationTheme } from "../../redux/invites/operations";
import { selectInvitation } from "../../redux/invites/selectors";
import { Helmet } from "react-helmet-async";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import InvitationPage from "../../pages/InvitationPage";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const InvitePreview = () => {
  const dispatch = useDispatch();
  const isLoadingPreview = useSelector(selectIsLoading);
  const isErrorPreview = useSelector(selectError);
  const invite = useSelector(selectInvitation);
  const [style, setStyle] = useState(
    invite?.inviteTheme?.css
      ? `/styles/${
          invite.inviteTheme.css === "lime_spain"
            ? "lime"
            : invite.inviteTheme.css
        }.css`
      : `/styles/white.css`
  );
  const [styleKey, setStyleKey] = useState(
    invite?.inviteTheme?.css
      ? invite.inviteTheme.css === "lime_spain"
        ? "lime"
        : invite.inviteTheme.css
      : "white"
  );

  const handleStyle = (event) => {
    const newStyle =
      event.target.value === "lime_spain" ? "lime" : event.target.value;
    setStyleKey(newStyle);
    setStyle(`/styles/${newStyle}.css`);
    dispatch(changeInvitationTheme({ css: newStyle, invite_id: invite.id }));
  };

  const styleVariants = [
    { key: "white", name: "White" },
    // { key: "first", name: "Brown" },
    // { key: "second", name: "Blue-Grey" },
    { key: "lime", name: "Lime" },
    { key: "lime_spain", name: "LimeSpain" },
  ];

  return (
    <>
      {isErrorPreview && <ErrorMessage>{isErrorPreview}</ErrorMessage>}
      {isLoadingPreview && <Loader />}
      {!isLoadingPreview && !isErrorPreview && invite && (
        <>
          <Helmet>
            <link type="text/css" rel="stylesheet" href={style} />
          </Helmet>

          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="theme-select-label">Тема запрошення</InputLabel>
              <Select
                labelId="theme-select-label"
                id="theme-select"
                value={styleKey}
                label="Тема запрошення"
                onChange={handleStyle}
              >
                {styleVariants.map((variant, idx) => (
                  <MenuItem key={`${variant.key}-${idx}`} value={variant.key}>
                    {variant.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box
            sx={{
              marginTop: 2,
              maxWidth: "375px",
              minWidth: "320px",
              minHeight: "200px",
              maxHeight: "70vh",
              overflow: "auto",
              display: "flex",
              flexDirection: "column",
              borderRadius: "20px",
              border: "7px solid #333",
            }}
          >
            <InvitationPage />
          </Box>
        </>
      )}
    </>
  );
};

export default InvitePreview;
