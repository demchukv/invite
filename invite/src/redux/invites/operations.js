import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/v1';

export const fetchInvites = createAsyncThunk(
    'invites/fetchAll',
    async (_, thunkAPI) => {
      try {
        const response = await axios.get('/invites');
        return response.data.data;
      } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  );

  export const fetchOneInvite = createAsyncThunk(
    'invites/fetchOneInvite',
    async (inviteId, thunkAPI) => {
      try {
        const response = await axios.get(`/invites/${inviteId}`);
        return response.data.data[0];
      } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  );

  export const addInvite = createAsyncThunk(
    'invites/addInvite',
    async (values, thunkAPI) => {
      try {
        const response = await axios.post('/invites', values);
        toast.success("New invitation successfully created!");
        return response.data;
      } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  );
  
  export const deleteInvite = createAsyncThunk(
    'invites/deleteInvite',
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
    'invites/updateInvite',
    async (values, thunkAPI) => {
      try {
        const response = await axios.patch(`/invites/${values.id}`,  values);
        toast.success("Invite successfully updated!");
        return response.data;
      } catch (e) {
        toast.error(e.message);
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  );
