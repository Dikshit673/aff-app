import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { CustomDot, CustomLegend, CustomToolTip } from './ui/Graph';

const data = [
  { name: 'Jan', sales: 40 },
  { name: 'Feb', sales: 80 },
  { name: 'Mar', sales: 60 },
];

export default function Graph() {
  return (
    <div style={{ width: '100%', height: 250 }}>
      <ResponsiveContainer>
        <AreaChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='0' vertical={false} />
          <XAxis
            dataKey='name'
            tick={{ fill: 'black', fontSize: 12 }}
            tickFormatter={(value: string) => `${value.slice(0, 3)}`}
          />
          <YAxis tickLine={false} tick={{ fill: 'black', fontSize: 12 }} />
          <Tooltip content={<CustomToolTip />} />
          <Legend content={<CustomLegend />} />

          <defs>
            <linearGradient id='colorGreen' x1='0' y1='0' x2='0' y2='1'>
              <stop
                offset='25%'
                stopColor='var(--color-blue-600)'
                stopOpacity={1}
              />
              <stop
                offset='100%'
                stopColor='var(--color-blue-600)'
                stopOpacity={0.5}
              />
            </linearGradient>
          </defs>
          <Area
            type='monotone'
            dataKey='sales'
            stroke='var(--color-blue-500)'
            strokeOpacity={1}
            strokeWidth={2}
            fill='url(#colorGreen)'
            fillOpacity={0.3}
            dot={
              <CustomDot
                stroke='var(--color-white)'
                fill='var(--color-blue-500)'
              />
            }
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
