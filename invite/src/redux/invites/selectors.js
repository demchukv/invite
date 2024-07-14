import { createSelector } from "@reduxjs/toolkit";

export const selectIsLoading = (state) => state.invites.isLoading;

export const selectError = (state) => state.invites.error;

export const selectInvites = (state) => state.invites.items;

export const selectOneInvite = (state) => {
  return state.invites.invite;
};

export const selectInvitation = (state) => state.invites.guest;

export const selectInviteGroups = createSelector(
  [selectOneInvite],
  (invite) => {
    return invite.inviteGroups;
  }
);

export const selectStatistics = createSelector(
  [selectInviteGroups],
  (groups) => {
    return groups.reduce(
      (count, group) => {
        for (let i = 0; i < group.inviteGuests.length; i++) {
          group.inviteGuests[i].willbe === "y"
            ? (count.willbey += 1)
            : (count.willben += 1);
          group.w1 === "y" && group.inviteGuests[i].willbe === "y"
            ? (count.w1y += 1)
            : (count.w1n += 1);
          group.w2 === "y" && group.inviteGuests[i].willbe === "y"
            ? (count.w2y += 1)
            : (count.w2n += 1);
          if (group.transfer === "y" && group.inviteGuests[i].willbe === "y") {
            count.transfer += 1;
          }
        }
        return count;
      },
      { w1y: 0, w1n: 0, w2y: 0, w2n: 0, willbey: 0, willben: 0, transfer: 0 }
    );
  }
);
