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
  
  [operations.updatePlate.fulfilled]: (state, { payload }) =>
    state.plates.map((item) => (item.id === payload.plate.id ? payload : item)),
  // [operations.updatePlate.fulfilled]: (state, { payload }) => {
  //     const index = state.plates.findIndex((plate) => plate.id === payload.id,
  //   )
  //   state.plates[index] = payload
  //   }

});

const filter = createReducer('', {
  [changeFilter]: (_state, { payload }) => payload,
});

const isLoading = createReducer(false, {
  [operations.fetchPlates.pending]: () => true,
  [operations.fetchPlates.fulfilled]: () => false,
  [operations.fetchPlates.rejected]: () => false,

  [operations.addPlate.pending]: () => true,
  [operations.addPlate.fulfilled]: () => false,
  [operations.addPlate.rejected]: () => false,

  [operations.deletePlate.pending]: () => true,
  [operations.deletePlate.fulfilled]: () => false,
  [operations.deletePlate.rejected]: () => false,

  [operations.updatePlate.pending]: () => true,
  [operations.updatePlate.fulfilled]: () => false,
  [operations.updatePlate.rejected]: () => false,

  [operations.getPlateById.pending]: () => true,
  [operations.getPlateById.fulfilled]: () => false,
  [operations.getPlateById.rejected]: () => false,
})

const error = createReducer(null, {
  [operations.fetchPlates.pending]: () => null,
  [operations.fetchPlates.fulfilled]: () => null,
  [operations.fetchPlates.rejected]: (_, { payload }) => payload,

  [operations.addPlate.pending]: () => null,
  [operations.addPlate.fulfilled]: () => null,
  [operations.addPlate.rejected]: (_, { payload }) => payload,

  [operations.deletePlate.pending]: () => null,
  [operations.deletePlate.fulfilled]: () => null,
  [operations.deletePlate.rejected]: (_, { payload }) => payload,

  [operations.updatePlate.pending]: () => null,
  [operations.updatePlate.fulfilled]: () => null,
  [operations.updatePlate.rejected]: (_, { payload }) => payload,

  [operations.getPlateById.pending]: () => null,
  [operations.getPlateById.fulfilled]: () => null,
  [operations.getPlateById.rejected]: (_, { payload }) => payload,
});

export const plateReducer = combineReducers({
  items,
  filter,
  isLoading,
  error,
});