import { ChoiceGroup, ChoiceGroupProps } from '@consta/uikit/ChoiceGroup';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { changeSelectedRate, RateType } from '../../../store/reducers/rates';

const ChoiceRate: FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector<string[]>(state => state.rates.rateTypes);
  const value = useAppSelector<RateType>(state => state.rates.selectedRateType);

  //Изменение выбранной валюты
  const changeRateType = (newValue: RateType) => {
    dispatch(changeSelectedRate(newValue.value));
  }

  const choiceGroupProps: ChoiceGroupProps<string> = {
    value: value,
    size: 's',
    onChange: changeRateType,
    items: items,
    getItemLabel: (item) => item,
    multiple: false,
    name: "ChoiceRate"
  };

  return <ChoiceGroup {...choiceGroupProps} />;
};

export default ChoiceRate;
