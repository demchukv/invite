import { createSlice } from "@reduxjs/toolkit";
import {
  fetchInvites,
  fetchOneInvite,
  addInvite,
  deleteInvite,
  updateInvite,
  deleteInviteTiming,
  deleteInvitePhoto,
  deleteInviteGroup,
  deleteInviteGuest,
  fetchEmptyInvite,
  updateInviteGroup,
  fetchOneInviteByLink,
  fetchOneInviteById,
  updateGuestAnswer,
  updateGuestSubAnswer,
  changeInvitationTheme,
  updateGalleryPhotos
} from "./operations";
const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const invitesSlice = createSlice({
  name: "invites",
  initialState: {
    items: [],
    invite: {},
    guest: {},
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvites.pending, handlePending)
      .addCase(fetchInvites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchInvites.rejected, handleRejected)

      .addCase(fetchOneInvite.pending, handlePending)
      .addCase(fetchOneInvite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.invite = action.payload;
      })
      .addCase(fetchOneInvite.rejected, handleRejected)

      .addCase(fetchEmptyInvite.pending, handlePending)
      .addCase(fetchEmptyInvite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.invite = action.payload;
      })
      .addCase(fetchEmptyInvite.rejected, handleRejected)

      .addCase(addInvite.pending, handlePending)
      .addCase(addInvite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addInvite.rejected, handleRejected)

      .addCase(deleteInvite.pending, handlePending)
      .addCase(deleteInvite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(
          (invite) => invite.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(deleteInvite.rejected, handleRejected)

      .addCase(updateInvite.pending, handlePending)
      .addCase(updateInvite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(
          (invite) => invite.id === action.payload.data[0].id
        );
        state.items[index] = action.payload.data[0];
        state.invite = action.payload.data[0];
      })
      .addCase(updateInvite.rejected, handleRejected)

      .addCase(deleteInviteTiming.pending, handlePending)
      .addCase(deleteInviteTiming.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.invite.inviteTimings.findIndex(
          (it) => it.id === action.payload.id
        );
        state.invite.inviteTimings.splice(index, 1);
      })
      .addCase(deleteInviteTiming.rejected, handleRejected)

      .addCase(deleteInvitePhoto.pending, handlePending)
      .addCase(deleteInvitePhoto.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        if(action.payload.type === "photo"){
          state.invite.photo = "";
        }
        if(action.payload.type === "timerphoto"){
          state.invite.timerphoto = "";
        }
        if(action.payload.type === "gallery"){
          const index = state.invite.invitePhotos.findIndex(
            (it) => it.id === action.payload.id
          );
          state.invite.invitePhotos.splice(index, 1);
          }
        
      })
      .addCase(deleteInvitePhoto.rejected, handleRejected)

      .addCase(deleteInviteGroup.pending, handlePending)
      .addCase(deleteInviteGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.invite.inviteGroups.findIndex(
          (it) => it.id === action.payload.id
        );
        state.invite.inviteGroups.splice(index, 1);
      })
      .addCase(deleteInviteGroup.rejected, handleRejected)

      .addCase(deleteInviteGuest.pending, handlePending)
      .addCase(deleteInviteGuest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.invite.inviteGroups.forEach((group) => {
          if (group.id === action.payload.invite_group_id) {
            const index = group.inviteGuests.findIndex((it) => {
              it.id === action.payload.id;
            });
            group.inviteGuests.splice(index, 1);
          }
        });
      })
      .addCase(deleteInviteGuest.rejected, handleRejected)

      .addCase(updateInviteGroup.pending, handlePending)
      .addCase(updateInviteGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(
          (invite) => invite.id === action.payload[0].id
        );
        state.items[index] = action.payload[0];
        state.invite = action.payload[0];
      })
      .addCase(updateInviteGroup.rejected, handleRejected)

      .addCase(fetchOneInviteByLink.pending, handlePending)
      .addCase(fetchOneInviteByLink.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.guest = action.payload;
      })
      .addCase(fetchOneInviteByLink.rejected, handleRejected)

      .addCase(fetchOneInviteById.pending, handlePending)
      .addCase(fetchOneInviteById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.guest = action.payload;
      })
      .addCase(fetchOneInviteById.rejected, handleRejected)

      .addCase(updateGuestAnswer.pending, handlePending)
      .addCase(updateGuestAnswer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.guest.inviteGuests.findIndex(
           (ig) => ig.id === action.payload.guest_id
         );
        state.guest.inviteGuests[index] = action.payload.guest;
        state.guest.willbe = action.payload.willbe;
      })
      .addCase(updateGuestAnswer.rejected, handleRejected)

      .addCase(updateGuestSubAnswer.pending, handlePending)
      .addCase(updateGuestSubAnswer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.guest.inviteGroup = action.payload.group;
      })
      .addCase(updateGuestSubAnswer.rejected, handleRejected)

      .addCase(changeInvitationTheme.pending, handlePending)
      .addCase(changeInvitationTheme.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.guest.inviteTheme = action.payload.inviteTheme;
        state.guest.theme_id = action.payload.theme_id;
      })
      .addCase(changeInvitationTheme.rejected, handleRejected)

      .addCase(updateGalleryPhotos.pending, handlePending)
      .addCase(updateGalleryPhotos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.invite.invitePhotos = action.payload.invitePhotos;
      })
      .addCase(updateGalleryPhotos.rejected, handleRejected)

  },
});

export const invitesReducer = invitesSlice.reducer;
