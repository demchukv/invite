
export const selectIsLoading = (state) => state.invites.isLoading;

export const selectError = (state) => state.invites.error;

export const selectInvites = (state) => state.invites.items;

export const selectOneInvite = (state) => state.invites.invite;

export const selectInvitation = (state) => state.invites.guest;