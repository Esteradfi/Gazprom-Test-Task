import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import $api from '../../api';

export interface RatesState {
  ratesList: RatesListItem[],
  selectedRatesData: RatesListItem[],
  rateTypes: RateType[],
  selectedRateType: RateType;
  average: string, // Выбран тип "строка", т.к. по макету, требуется отобразить нецелую часть числа после запятой, а не точки
  isFetching: boolean,
}

export type RatesListItem = {
  date: string,
  month: string,
  indicator: string,
  value: number,
};

export type RateType = '$' | '€' | '¥';

const initialState: RatesState = {
  ratesList: [],
  selectedRatesData: [],
  rateTypes: ['$', '€', '¥'],
  selectedRateType: '$',
  average: '0',
  isFetching: false
};

//Получение данных с сервиса mockAPI
export const getRatesThunk = createAsyncThunk(
  'rates/getRates',
  async () => {
    try {
      const response = await $api.get<RatesListItem[]>(`/rates`);
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
    changeSelectedRate: (state, action: PayloadAction<RateType>) => {
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
      state.selectedRatesData.sort((a, b) => a.date.localeCompare(b.date));
      /*
      сортировка по дате (учитывая, что дата в формате yyyy-mm-dd, можно не преобразовывать строку
      в дату, а сразу сортировать строку). Сделано на случай получения перемешанных данных
      */
    },
    changeAverageValue: (state, action: PayloadAction<string>) => {
      state.average = action.payload;
    },
    changeIsFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRatesThunk.fulfilled, (state, action: PayloadAction<RatesListItem[]>) => {
        state.ratesList = action.payload;
        state.selectedRatesData = state.ratesList.filter((rate) => rate.indicator === 'Курс доллара');
        state.selectedRatesData.sort((a, b) => a.date.localeCompare(b.date));
        state.isFetching = false;
      });
  }
});

export default ratesSlice.reducer;

export const { changeSelectedRate, changeAverageValue, changeIsFetching } = ratesSlice.actions;
