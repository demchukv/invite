import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { apiUrl } from '../const';

axios.defaults.baseURL = apiUrl;

export const fetchInvites = createAsyncThunk(
  "invites/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/invites");
      return response.data.data;
    } catch (e) {
      toast.error(e.message);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchOneInvite = createAsyncThunk(
  "invites/fetchOneInvite",
  async (inviteId, thunkAPI) => {
    try {
      const response = await axios.get(`/invites/${inviteId}`);
      return response.data.data[0];
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchEmptyInvite = createAsyncThunk(
  "invites/fetchEmptyInvite",
  () => {
    return {}
  }
);

export const updateGalleryPhotos = createAsyncThunk(
  "invites/updateGalleryPhotos",
  async (values, thunkAPI) => {
    try{
      return values;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
)
export const addInvite = createAsyncThunk(
  "invites/addInvite",
  async (values, thunkAPI) => {
    try {
      const response = await axios.post("/invites", values);
      toast.success("Нове запрошення успішно створено!");
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteInvite = createAsyncThunk(
  "invites/deleteInvite",
  async (inviteId, thunkAPI) => {
    try {
      const response = await axios.delete(`/invites/${inviteId}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const updateInvite = createAsyncThunk(
  "invites/updateInvite",
  async (values, thunkAPI) => {
    try {
      const response = await axios.patch(`/invites/${values.id}`, values);
      toast.success("Запрошення успішно оновлено!");
      return response.data;
    } catch (e) {
      toast.error(e.message);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteInviteTiming = createAsyncThunk(
  "invites/deleteInviteTiming",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`/invite-timing/${id}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteInvitePhoto = createAsyncThunk(
  "invites/deleteInvitePhoto",
  async (values, thunkAPI) => {
    try {
      const response = await axios.delete(`/invite-photo/${values.id}/${values.type}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteInviteGroup = createAsyncThunk(
  "invites/deleteInviteGroup",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`/invite-group/${id}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteInviteGuest = createAsyncThunk(
  "invites/deleteInviteGuest",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`/invite-guest/${id}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const updateInviteGroup = createAsyncThunk(
  "invites/updateInviteGroup",
  async (values, thunkAPI) => {
    try {
      const response = await axios.post(`/invite-groups`, values);
      toast.success("Список гостей успішно оновлено!");
      return response.data;
    } catch (e) {
      toast.error(e.message);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchOneInviteByLink = createAsyncThunk(
  "invites/fetchOneInviteByLink",
  async (link, thunkAPI) => {
    try {
      const response = await axios.get(`/invitation/${link}`);
      return response.data.invite;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message + ": " + e.response.data.message);
    }
  }
);

export const fetchOneInviteById = createAsyncThunk(
  "invites/fetchOneInviteById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/invitation/id/${id}`);
      return response.data.invite;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message + ": " + e.response.data.message);
    }
  }
);

export const updateGuestAnswer = createAsyncThunk(
  "invites/updateGuestAnswer",
  async (values, thunkAPI) => {
    try {
      const response = await axios.post(`/invite-answer`, values);
      toast.success("Вашу відповідь збережено!");
      return response.data;
    } catch (e) {
      toast.error(e.message);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const updateGuestSubAnswer = createAsyncThunk(
  "invites/updateGuestSubAnswer",
  async (values, thunkAPI) => {
    try {
      const response = await axios.post(`/invite-subanswer`, values);
      toast.success("Вашу відповідь збережено!");
      return response.data;
    } catch (e) {
      toast.error(e.message);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const updateGuestTransfer = createAsyncThunk(
  "invites/updateGuestTransfer",
  async (values, thunkAPI) => {
    try {
      const response = await axios.post(`/invite-transfer`, values);
      toast.success("Вашу відповідь збережено!");
      return response.data;
    } catch (e) {
      toast.error(e.message);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const changeInvitationTheme = createAsyncThunk(
  "invites/changeInvitationTheme",
  async (values, thunkAPI) => {
    try {
      const response = await axios.post(`/invite-theme`, values);
      toast.success("Тему запрошення успішно змінено!");
      return response.data;
    } catch (e) {
      toast.error(e.message);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);