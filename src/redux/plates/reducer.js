import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {changeFilter} from './actions';
import operations from './operations';

const items = createReducer([], {
  [operations.fetchPlates.fulfilled]: (_, { payload }) => payload,
  
  [operations.addPlate.fulfilled]: (state, { payload }) => [
    ...state,
    payload,
  ],
  
  [operations.deletePlate.fulfilled]: (state, { payload }) =>
    state.filter((item) => item.id !== payload.plate.id),
});

const filter = createReducer('', {
  [changeFilter]: (_state, { payload }) => payload,
});

const error = createReducer(null, {
  [operations.fetchPlates.rejected]: (_, { payload }) => payload,
  [operations.fetchPlates.pending]: () => null,
});

export const plateReducer = combineReducers({
  items,
  filter,
  error,
});