import preloader from "./../../assets/preloader.svg";
import styles from "./Preloader.module.css";
import { FC } from 'react';

const Preloader: FC = () => {
  return (
    <div className={styles.wrapper}>
      <img src={`${preloader}`} alt='Загрузка' />
    </div>
  )
}

export default Preloader;