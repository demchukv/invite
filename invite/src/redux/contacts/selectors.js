import { createSelector } from "@reduxjs/toolkit";
import Fuse from "fuse.js";

export const selectIsLoading = (state) => state.contacts.isLoading;

export const selectError = (state) => state.contacts.error;

export const selectContacts = (state) => state.contacts.items;

export const selectNameFilter = (state) => state.filters.name;

export const selectVisibleContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filter) => {
    if (filter.length > 0) {
      const fuseOption = {
        isCaseSensitive: false,
        keys: ['name', 'number'],
      }
      const fuse = new Fuse(contacts, fuseOption);
      const data = fuse.search(filter);
      return data.map(item => {return item.item});
    } else {
      return contacts;
    }
  }
);
