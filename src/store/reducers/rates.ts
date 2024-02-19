import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import $api from '../../api';

export interface RatesState {
  ratesList: Array<RatesListItem> | Array<RatesListItem>[]
}

export type RatesListItem = {
  date: string,
  month: string,
  indicator: string,
  value: number,
};

const initialState: RatesState = {
  ratesList: []
};

export const getRatesThunk = createAsyncThunk(
  'Get Rates',
  async () => {
    try {
      const response = await $api.get<Array<RatesListItem> | Array<RatesListItem>[]>(`/rates`);
      console.log(response.data);
      return response.data;
    } catch (err: any) {
      throw err;
    }
  }
);

export const RatesSlice = createSlice({
  name: "Rates",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getRatesThunk.fulfilled, (state, action: PayloadAction<Array<RatesListItem> | Array<RatesListItem>[]>) => {
        state.ratesList = action.payload;
      });
  }
});

export default RatesSlice.reducer;

export const {} = RatesSlice.actions;