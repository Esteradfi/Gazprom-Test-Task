import React, { FC, useEffect } from 'react';
import { useAppDispatch } from './store/store';
import { getRatesThunk } from './store/reducers/rates';

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getRatesThunk());
  },[])

  return (
    <main>

    </main>
  );
}

export default App;
