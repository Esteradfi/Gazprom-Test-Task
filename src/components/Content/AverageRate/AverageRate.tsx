import { Text } from '@consta/uikit/Text';
import styles from "./Average.module.css";
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { FC, useEffect } from 'react';
import calculateAverage from '../../../utils/averageValue';
import { changeAverageValue, RatesState } from '../../../store/reducers/rates';

const AverageRate: FC = () => {
  const dispatch = useAppDispatch();
  const selectedRates = useAppSelector((state: { rates: RatesState }) => state.rates.selectedRatesData);
  const average = useAppSelector((state: { rates: RatesState }) => state.rates.average);

  useEffect(() => {
    //Считаем новое среднее значение после смены валюты
    const newAverage = calculateAverage(selectedRates);
    dispatch(changeAverageValue(newAverage));
  }, [selectedRates])

  return (
    <div className={styles.wrapper}>
      <Text className={styles.gray} align="right">
        Среднее за период
      </Text>
      <Text className={styles.orange} size="4xl" align="right">
        {average}
        <Text className={`${styles.span} ${styles.gray}`} as="span" size="xl">
          ₽
        </Text>
      </Text>
    </div>
  )
};

export default AverageRate;
