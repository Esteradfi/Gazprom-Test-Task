import React, { FC, useEffect } from 'react';
import { useAppDispatch } from './store/store';
import { getRatesThunk } from './store/reducers/rates';
import { presetGpnDefault, Theme } from '@consta/uikit/Theme';
import { ReactECharts } from './components/Echarts/ReactECharts';
import { Card } from '@consta/uikit/Card';
import Header from './components/Header/Header';
import styles from "./App.module.css";
import Content from './components/Content/Content';

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getRatesThunk());
  },[])

  return (
    <Theme preset={presetGpnDefault}>
      <Card className={styles.container} shadow={true} verticalSpace={'xs'} horizontalSpace={'l'}>
        <Header />
        <Content />
      </Card>
    </Theme>
  );
}

export default App;
