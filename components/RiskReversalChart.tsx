
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  AreaChart,
  Area,
  ComposedChart
} from 'recharts';
import { RiskReversalData } from '../types';

interface Props {
  data: RiskReversalData[];
}

const RiskReversalChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="h-[400px] w-full bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            fontSize={12} 
            tickFormatter={(str) => str.split('-').slice(1).join('/')}
          />
          <YAxis yAxisId="left" orientation="left" stroke="#6366f1" fontSize={12} domain={['auto', 'auto']} />
          <YAxis yAxisId="right" orientation="right" stroke="#f43f5e" fontSize={12} />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend verticalAlign="top" align="right" />
          <ReferenceLine y={0} yAxisId="right" stroke="#000" strokeDasharray="3 3" label="Neutral" />
          
          <Area 
            yAxisId="left"
            type="monotone" 
            dataKey="indexPrice" 
            fill="#e0e7ff" 
            stroke="#6366f1" 
            name="Index Price"
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="riskReversal" 
            stroke="#f43f5e" 
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            name="25D Risk Reversal (IV%)"
          />
        </ComposedChart>
      </ResponsiveContainer>
      <p className="text-center text-xs text-gray-400 mt-2">
        Blue Shaded: Index Price | Red Line: Risk Reversal (Put IV - Call IV)
      </p>
    </div>
  );
};

export default RiskReversalChart;
