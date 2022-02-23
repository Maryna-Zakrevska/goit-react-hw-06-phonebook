import { createAction, createReducer, configureStore } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  filter: "",
};

export const addContact = createAction("contacts/addContact");
export const deleteContact = createAction("contacts/deleteContact");
export const setFromLocalStorageContacts = createAction("contacts/setFromLocalStorageContacts");
export const setFilterToRedux = createAction("filter/setFilterToRedux");

const contactsReducer = createReducer(initialState, {
  [addContact]: (state, action) => ({
    ...state,
    items: [action.payload, ...state.items],
  }),
  [deleteContact]: (state, action) => ({
    ...state,
    items: state.items.filter(({ id }) => id !== action.payload),
  }),
  [setFromLocalStorageContacts]: (state, action) => ({
    ...state,
    items: [...action.payload],
  }),
  [setFilterToRedux]: (state, action) => ({ ...state, filter: action.payload }),
});

export default configureStore({
  reducer: {
    contacts: contactsReducer,
  },
});
