import { createSlice } from "@reduxjs/toolkit";
import { fetchInvites, fetchOneInvite, addInvite, deleteInvite, updateInvite } from './operations';
const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const invitesSlice = createSlice({
  name: 'invites',
  initialState: {
    items: [],
    invite: {},
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
          (invite) => invite.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
      .addCase(updateInvite.rejected, handleRejected);
  },
});

export const invitesReducer = invitesSlice.reducer;
