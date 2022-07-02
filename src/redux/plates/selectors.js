import { createSelector } from '@reduxjs/toolkit';

export const getPlates = state => state.plates.items;
export const getFilter = state => state.plates.filter;

export const getFilteredPlates = createSelector(
  [getPlates, getFilter],
  (plates, filter) => {
    const normalizedFilter = filter.toLowerCase();

    return plates.filter(({ name }) =>
      name && name.toLowerCase().includes(normalizedFilter),
    );
  },
);