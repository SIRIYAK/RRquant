
import { MarketIndex, RiskReversalData } from '../types';

const generateDateRange = (days: number, direction: 'back' | 'forward') => {
  const dates = [];
  const start = new Date();
  for (let i = 0; i < days; i++) {
    const d = new Date();
    if (direction === 'back') {
      d.setDate(start.getDate() - (days - i));
    } else {
      d.setDate(start.getDate() + i + 1);
    }
    dates.push(d.toISOString().split('T')[0]);
  }
  return dates;
};

const getBasePrice = (index: MarketIndex) => {
  switch (index) {
    case MarketIndex.NIFTY: return 22500;
    case MarketIndex.BANKNIFTY: return 48000;
    case MarketIndex.SENSEX: return 74000;
    case MarketIndex.MIDCPNIFTY: return 10500;
    case MarketIndex.FINNIFTY: return 21500;
    default: return 10000;
  }
};

export const fetchMarketData = (index: MarketIndex, source: 'Exchange' | 'Composite'): { historical: RiskReversalData[], projection: RiskReversalData[] } => {
  const historyDates = generateDateRange(20, 'back');
  const projectionDates = generateDateRange(20, 'forward');
  
  const basePrice = getBasePrice(index);
  const volatilitySeed = source === 'Exchange' ? 1.0 : 1.05; // Slightly different sources

  const createSet = (dates: string[], type: 'historical' | 'projection'): RiskReversalData[] => {
    let currentPrice = basePrice;
    return dates.map((date, idx) => {
      const noise = (Math.random() - 0.5) * 100;
      currentPrice += noise;
      
      // Calculate realistic IVs for 25 Delta Risk Reversal
      // In Indian markets, Risk Reversal (Put IV - Call IV) is usually positive (skew towards puts)
      const putIV = 14 + Math.random() * 4 * volatilitySeed;
      const callIV = 12 + Math.random() * 3 * volatilitySeed;
      const riskReversal = parseFloat((putIV - callIV).toFixed(2));

      return {
        date,
        indexPrice: Math.round(currentPrice),
        putIV: parseFloat(putIV.toFixed(2)),
        callIV: parseFloat(callIV.toFixed(2)),
        riskReversal,
        source,
        type
      };
    });
  };

  return {
    historical: createSet(historyDates, 'historical'),
    projection: createSet(projectionDates, 'projection')
  };
};
