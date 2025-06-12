import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter: (_, action) => action.payload,
  },
});

export const { setFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
