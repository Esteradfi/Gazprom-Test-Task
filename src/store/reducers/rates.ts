import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import $api from '../../api';

export interface RatesState {
  ratesList: RatesListItem[],
  selectedRatesData: RatesListItem[],
  rateTypes: string[],
  selectedRateType: '$' | '€' | '¥';
}

export type RatesListItem = {
  date: string,
  month: string,
  indicator: string,
  value: number,
};

const initialState: RatesState = {
  ratesList: [],
  selectedRatesData: [],
  rateTypes: ['$', '€', '¥'],
  selectedRateType: '$'
};

export const getRatesThunk = createAsyncThunk(
  'rates/getRates',
  async () => {
    try {
      const response = await $api.get<RatesListItem[]>(`/rates`);
      console.log(response.data);
      return response.data;
    } catch (err) {
      throw err;
    }
  }
);

export const ratesSlice = createSlice({
  name: "rates",
  initialState,
  reducers: {
    changeSelectedRate: (state, action: PayloadAction<'$' | '€' | '¥'>) => {
      state.selectedRateType = action.payload;

      let indicator = '';

      switch(action.payload) {
        case '$':
          indicator = 'Курс доллара';
          break;
        case '€':
          indicator = 'Курс евро';
          break;
        case '¥':
          indicator = 'Курс юаня';
          break;
        default:
          indicator = 'Курс доллара';
      }

      state.selectedRatesData = state.ratesList.filter((rate) => rate.indicator === indicator);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRatesThunk.fulfilled, (state, action: PayloadAction<RatesListItem[]>) => {
        state.ratesList = action.payload;
      });
  }
});

export default ratesSlice.reducer;

export const { changeSelectedRate } = ratesSlice.actions;
