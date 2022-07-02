import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'http://localhost:7000';

const fetchPlates = createAsyncThunk(
  'plates/fetchPlates',
  async (_, { rejectWithValue}) => {

    try {
        const { data } = await axios.get('/api/plates');
        console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const getPlateById = createAsyncThunk(
  'plates/getPlateById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/plates/plates/${id}`);
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const addPlate = createAsyncThunk(
  'plates/addPlate',
  async (plateData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/plates', plateData);
      console.log(data);
      return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
  },
);

const operations = { fetchPlates, getPlateById, addPlate };

export default operations;