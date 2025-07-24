import type { DotProps, LegendProps, TooltipProps } from 'recharts';

const CustomDot = (props: DotProps) => {
  const { cx, cy, stroke, fill } = props;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={4}
      stroke={stroke}
      strokeWidth={1}
      fill={fill}
      className='transition-all duration-1500 ease-in'
    />
  );
};

type ToolTipPayloadItem = {
  name?: string;
  value?: string | number;
  type?: string;
  color?: string;
  inactive?: boolean;
};

interface CustomToolTipProps extends TooltipProps<number, string> {
  payload?: ToolTipPayloadItem[];
  label?: string;
}

const CustomToolTip = ({ active, payload, label }: CustomToolTipProps) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className='overflow-hidden rounded-lg border border-gray-300 bg-white text-sm shadow-md'>
      <p className='bg-gray-200 px-4 py-2 font-semibold text-gray-700'>
        {label}
      </p>
      <div className='space-y-2 px-4 py-2'>
        {payload.map((entry, index) => (
          <div key={`tooltip-${index}`} className='flex items-center gap-2'>
            <div
              className='h-3 w-3 rounded-full'
              style={{ backgroundColor: entry.color }}
            />
            <span className='text-gray-500 capitalize'>{entry.name}:</span>
            <span className='font-semibold text-gray-800'>{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

type LegendPayloadItem = {
  value?: string | number;
  type?: string;
  color?: string;
  inactive?: boolean;
};

interface CustomLegendProps extends LegendProps {
  payload?: LegendPayloadItem[];
}

const CustomLegend = ({ payload }: CustomLegendProps) => {
  if (!payload || !payload.length) return null;

  return (
    <div className='mt-2 flex flex-wrap items-center justify-center gap-4 capitalize'>
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} className='flex items-center gap-2'>
          <span
            className='h-3 w-3 rounded-full'
            style={{ backgroundColor: entry.color }}
          />
          <span className='text-sm text-gray-700'>{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export { CustomDot, CustomToolTip, CustomLegend };
