import styles from './Content.module.css';
import AverageRate from './AverageRate/AverageRate';
import { FC } from 'react';
import { ReactECharts } from './Echarts/ReactECharts';
import { useAppSelector } from '../../store/store';
import { RatesListItem, RatesState } from '../../store/reducers/rates';

interface TooltipItem {
  name: string;
  color: string;
  seriesName: string;
  value: number;
}

const Content: FC = () => {
  const selectedRatesData = useAppSelector((state: { rates: RatesState }) => state.rates.selectedRatesData);

  const xAxisData = selectedRatesData.map((rate: RatesListItem) => rate['month']); //данные по оси x
  const yAxisData = selectedRatesData.map((rate: RatesListItem) => rate['value']); //данные по оси y
  const ratesType = selectedRatesData.length !== 0 ? selectedRatesData[0].indicator : "Ошибка"; //имя серии для option

  const minY = Math.min(...yAxisData) - 2;
  const maxY = Math.max(...yAxisData) + 2;
  const interval = (maxY - minY) / 4;

  const option = {
    grid: {
      left: 50,
      right: 0,
      top: 20,
      bottom: 50,
    },
    tooltip: {
      trigger: 'axis',
      //Фоматирование данных, выводящихся в тултипе
      formatter: function(params: TooltipItem[]): string {
        let tooltipContent = '<span style="color: #667985; font-family: Inter"><strong style="display: inline-block; color: #000000; margin-bottom: 5px">' + params[0].name + ' год</strong><br/>';
        params.forEach(function(item: TooltipItem) {
          tooltipContent += `<div style='display: inline-block; background: ${item.color}; margin-right: 5px; width: 12px; height: 12px; border-radius: 100%;'></div> ` + item.seriesName + `<strong style='color: #000000; margin-left: 30px'>${item.value}₽</strong>` + '<br/>';
        });
        tooltipContent += '</span>';
        return tooltipContent;
      },
      textStyle: {
        fontSize: 12,
      },
    },
    xAxis: {
      data: xAxisData,
      axisLabel: {
        fontSize: 10,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      axisLabel: {
        fontSize: 10,
        showMinLabel: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dotted',
        },
      },
      min: minY,
      max: maxY,
      interval: interval,
    },
    series: [
      {
        name: ratesType,
        type: 'line',
        data: yAxisData,
        showSymbol: false,
        itemStyle: {
          opacity: 0,
          color: '#F38B00',
        },
        lineStyle: {
          color: '#F38B00',
        },
      },
    ],
  };

  return (
    <section className={styles.section}>
      {selectedRatesData.length !== 0 ? <ReactECharts option={option} /> : <div></div>}
      <AverageRate />
    </section>
  );
};

export default Content;
