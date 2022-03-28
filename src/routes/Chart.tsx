import { useQuery } from 'react-query';
import { fetchCoinHistory } from './api';
import ApexChart from "react-apexcharts";
interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart({coinId}:ChartProps) {
  const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId));
  return (
    <div>
      {isLoading ? "Loading Chart..." : (
        <ApexChart
          type="line"
          series={[
            {
              name: "Opening Price",
              data: data?.map((price => price.open)) ?? [],
            },
            {
              name: "Closing Price",
              data: data?.map((price => price.close)) ?? [],
            },
          ]}
          options={{
            chart: {
              height: 300,
              width: 500,
              toolbar: { show: false },
            },
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 3,
            },
            xaxis: {
              axisTicks: { show: false },
              axisBorder: { show: false },
              labels: { 
                show: false,
                datetimeFormatter: {month: "mmm 'yy"},
              },
              type: "datetime",
              categories: data?.map((price) => price.time_close),
            },
            fill: {
              type: "gradient",
              gradient: {
                gradientToColors: ["teal", "yellow"],
                stops: [0, 100],
              }
            },
            colors: ["orange", "green"],
            tooltip: {
              y: {
                formatter: (value) => `$ ${value.toFixed(2)}`,
              }
            }
          }}/>
      )}
    </div>
  );
}

export default Chart;