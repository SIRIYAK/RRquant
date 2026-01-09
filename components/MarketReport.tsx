
import React, { useState, useEffect, useMemo } from 'react';
import { MarketIndex, RiskReversalData, InsightReport } from '../types';
import { fetchMarketData } from '../services/dataService';
import { generateMarketInsights } from '../services/geminiService';
import RiskReversalChart from './RiskReversalChart';
import RiskReversalTable from './RiskReversalTable';

interface Props {
  index: MarketIndex;
}

const MarketReport: React.FC<Props> = ({ index }) => {
  const [source, setSource] = useState<'Exchange' | 'Composite'>('Exchange');
  const [data, setData] = useState<{ historical: RiskReversalData[], projection: RiskReversalData[] } | null>(null);
  const [insights, setInsights] = useState<InsightReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const result = fetchMarketData(index, source);
      setData(result);
      
      const aiReport = await generateMarketInsights(index, result.historical);
      setInsights(aiReport);
      setLoading(false);
    };

    fetchData();
  }, [index, source]);

  const combinedData = useMemo(() => {
    if (!data) return [];
    return [...data.historical, ...data.projection];
  }, [data]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="text-gray-500 animate-pulse">Running Quant Analysis on {index}...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{index} Strategy Dashboard</h2>
          <p className="text-gray-500 text-sm">Real-time 25 Delta Risk Reversal Analytics</p>
        </div>
        
        <div className="flex p-1 bg-gray-100 rounded-lg">
          <button 
            onClick={() => setSource('Exchange')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${source === 'Exchange' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Exchange Source
          </button>
          <button 
            onClick={() => setSource('Composite')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${source === 'Composite' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Composite Analytics
          </button>
        </div>
      </div>

      {insights && (
        <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
              insights.outlook === 'Bullish' ? 'bg-green-100 text-green-700' : 
              insights.outlook === 'Bearish' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
            }`}>
              {insights.outlook} Outlook
            </span>
            <span className="text-xs text-indigo-400 font-medium">Quant Intelligence AI</span>
          </div>
          <h3 className="text-xl font-bold text-indigo-900 mb-2">{insights.title}</h3>
          <p className="text-indigo-800 leading-relaxed mb-4 text-sm md:text-base">{insights.summary}</p>
          <div className="flex flex-wrap gap-2">
            {insights.keyLevels.map((level, i) => (
              <span key={i} className="bg-white/60 px-3 py-1 rounded-full text-xs font-semibold text-indigo-700 border border-indigo-200">
                {level}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-700">Sentiment Trajectory (-20 to +20 sessions)</h4>
          </div>
          <RiskReversalChart data={combinedData} />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-700">Session Breakdown</h4>
          </div>
          <div className="h-[400px] overflow-y-auto scrollbar-hide">
            <RiskReversalTable data={combinedData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketReport;
