import styles from "./Content.module.css";
import AverageRate from './AverageRate/AverageRate';
import { FC } from 'react';

const Content: FC = () => {
  return (
    <section className={styles.section}>
      <div></div>
      <AverageRate />
    </section>
  )
};

export default Content;