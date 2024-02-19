import { RatesListItem } from '../store/reducers/rates';

const calculateAverage = (arr: RatesListItem[]): string => {
  if (arr.length === 0) {
    return '0';
  }

  const sum = arr.reduce((total, obj) => total + obj.value, 0);
  const average = sum / arr.length;

  return average.toFixed(1).replace('.', ','); // Функция возвращает среднее значение, приведённое к строке, т.к. по макету нужно отбразить запятую вместо точки
}

export default calculateAverage;