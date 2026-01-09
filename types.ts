
export enum MarketIndex {
  NIFTY = 'NIFTY 50',
  BANKNIFTY = 'BANK NIFTY',
  SENSEX = 'SENSEX',
  MIDCPNIFTY = 'MIDCAP NIFTY',
  FINNIFTY = 'FIN NIFTY'
}

export interface RiskReversalData {
  date: string;
  indexPrice: number;
  putIV: number;
  callIV: number;
  riskReversal: number; // Put IV - Call IV
  source: 'Exchange' | 'Composite';
  type: 'historical' | 'projection';
}

export interface MarketState {
  index: MarketIndex;
  historicalData: RiskReversalData[];
  projectedData: RiskReversalData[];
  lastUpdated: string;
}

export interface InsightReport {
  title: string;
  summary: string;
  outlook: 'Bullish' | 'Neutral' | 'Bearish';
  keyLevels: string[];
}
