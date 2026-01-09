
import React from 'react';
import { RiskReversalData } from '../types';

interface Props {
  data: RiskReversalData[];
}

const RiskReversalTable: React.FC<Props> = ({ data }) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Put IV</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Call IV</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Risk Reversal</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, idx) => (
            <tr key={idx} className={row.type === 'projection' ? 'bg-blue-50/30' : ''}>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">
                {row.date} {row.type === 'projection' && <span className="ml-1 text-[10px] text-blue-500 font-bold">(PROJ)</span>}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{row.indexPrice.toLocaleString()}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">{row.putIV}%</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">{row.callIV}%</td>
              <td className={`px-4 py-2 whitespace-nowrap text-sm font-bold ${row.riskReversal > 2 ? 'text-red-600' : row.riskReversal < 1 ? 'text-green-600' : 'text-gray-900'}`}>
                {row.riskReversal.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RiskReversalTable;
