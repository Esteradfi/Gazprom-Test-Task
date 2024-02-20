import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/store';
import { changeIsFetching, getRatesThunk } from './store/reducers/rates';
import { presetGpnDefault, Theme } from '@consta/uikit/Theme';
import { ReactECharts } from './components/Content/Echarts/ReactECharts';
import { Card } from '@consta/uikit/Card';
import Header from './components/Header/Header';
import styles from "./App.module.css";
import Content from './components/Content/Content';
import Preloader from './components/Preloader/Preloader';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const isFetching = useAppSelector(state => state.rates.isFetching);

  useEffect(() => {
    dispatch(getRatesThunk());
    dispatch(changeIsFetching(true));
  },[])

  return (
    <Theme preset={presetGpnDefault}>
      <Card className={styles.container} shadow={true} verticalSpace={'xs'} horizontalSpace={'l'}>
        <Header />
        {isFetching ? <Preloader /> : <Content />}
      </Card>
    </Theme>
  );
}

export default App;
