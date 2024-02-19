import { ChoiceGroup, ChoiceGroupProps } from '@consta/uikit/ChoiceGroup';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { changeSelectedRate } from '../../../store/reducers/rates';

const ChoiceRate: FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector<string[]>(state => state.rates.rateTypes);
  const value = useAppSelector<'$' | '€' | '¥'>(state => state.rates.selectedRateType);

  const changeRateType = (newValue: '$' | '€' | '¥') => {
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
