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
      const { data } = await axios.get(`/api/plates/plate/${id}`);
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
      return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
  },
);

const deletePlate = createAsyncThunk(
  'plates/deletePlate',
  async (plateId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/plates/${plateId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const updatePlate = createAsyncThunk(
  'plates/updatePlate',
  async (updatedPlate, { rejectWithValue }) => {
    try {
      console.log(updatedPlate.id);
      const { data } = await axios.put(`/api/plates/plate/${updatedPlate.id}`, updatedPlate);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const operations = { fetchPlates, getPlateById, addPlate, deletePlate, updatePlate };

export default operations;