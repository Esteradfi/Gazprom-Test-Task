import { Text } from '@consta/uikit/Text';
import styles from "./Average.module.css";
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { FC, useEffect } from 'react';
import calculateAverage from '../../../utils/averageValue';
import { changeAverageValue } from '../../../store/reducers/rates';

const AverageRate: FC = () => {
  const dispatch = useAppDispatch();
  const selectedRates = useAppSelector(state => state.rates.selectedRatesData);
  const average = useAppSelector(state => state.rates.average);

  useEffect(() => {
    const newAverage = calculateAverage(selectedRates);
    dispatch(changeAverageValue(newAverage));
  }, [selectedRates])

  return (
    <div>
      <Text className={styles.gray} align={'right'}>
        Среднее за период
      </Text>
      <Text className={styles.orange} size={'4xl'} align={'right'}>
        {average}
        <Text className={styles.span + " " + styles.gray} as={'span'} size={'xl'}>
          ₽
        </Text>
      </Text>
    </div>
  )
};

export default AverageRate;