import { Text } from '@consta/uikit/Text';
import React, { FC } from 'react';
import ChoiceRate from '../ChoiceRate/ChoiceRate';
import styles from "./Header.module.css";
import { useAppSelector } from '../../store/store';

const Header: FC = () => {
  const selectedRateType = useAppSelector(state => state.rates.selectedRateType);

  let title: string = '';

  switch(selectedRateType) {
    case '$':
      title = 'КУРС ДОЛЛАРА, $/₽';
      break;
    case '€':
      title = 'КУРС ЕВРО, €/₽';
      break;
    case '¥':
      title = 'КУРС ЮАНЯ, ¥/₽';
      break;
    default:
      title = 'КУРС ДОЛЛАРА, $/₽';
  }

  return (
    <header className={styles.header}>
      <Text weight={'bold'} size='xl'>
        {title}
      </Text>
      <ChoiceRate />
    </header>
  );
};

export default Header;