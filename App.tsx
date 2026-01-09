
import React, { useState } from 'react';
import { MarketIndex } from './types';
import MarketReport from './components/MarketReport';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MarketIndex>(MarketIndex.NIFTY);

  const indices = Object.values(MarketIndex);

  return (
    <div className="min-h-screen bg-white">
      {/* Blog Header */}
      <header className="border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xs">IQ</span>
              </div>
              <h1 className="text-xl font-extrabold tracking-tight text-gray-900">
                India<span className="text-indigo-600">Quant</span>
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-sm font-medium text-indigo-600">Market Intelligence</a>
              <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Derivatives Blog</a>
              <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Documentation</a>
            </nav>
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <span className="h-2 w-2 rounded-full bg-green-500 mr-1.5 animate-pulse"></span>
                Market Live
              </span>
              <button className="bg-gray-900 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Intro Section */}
        <div className="mb-12 border-b border-gray-100 pb-12">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
              Deciphering Market Skew: The 25 Delta Risk Reversal Edge
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              In the fast-paced Indian derivatives market, implied volatility skew tells the real story. 
              Our 25 Delta Risk Reversal tool monitors the difference between Put and Call premiums 
              across major indices, providing an institutional-grade perspective on hedging demand and 
              underlying sentiment.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>Updated 5 mins ago</span>
              <span>•</span>
              <span>Quant Team • SEBI Registered (Research)</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-10 flex overflow-x-auto pb-2 border-b border-gray-100 gap-1 scrollbar-hide">
          {indices.map((idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-6 py-3 whitespace-nowrap text-sm font-bold border-b-2 transition-all duration-300 ${
                activeTab === idx 
                ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50 rounded-t-xl' 
                : 'border-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-t-xl'
              }`}
            >
              {idx}
            </button>
          ))}
        </div>

        {/* Tab Content (Parallel Reports) */}
        <div className="bg-white rounded-2xl">
          <MarketReport index={activeTab} />
        </div>

        {/* Blog Style Footer Sidebar Content */}
        <section className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-gray-100 pt-16">
          <div className="col-span-2 space-y-8">
            <h3 className="text-2xl font-bold text-gray-900">Education: Understanding Risk Reversal</h3>
            <p className="text-gray-600 leading-relaxed">
              A 25 Delta Risk Reversal is an options trading strategy that involves buying a call option 
              and selling a put option (or vice-versa) with the same delta—typically 0.25. 
              In professional skew analytics, it specifically refers to the IV difference. 
              When the Risk Reversal value is high, Puts are more expensive than Calls, 
              indicating that market participants are paying a premium for downside protection (Fear).
            </p>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h4 className="font-bold mb-2">Why 20 Session Windows?</h4>
              <p className="text-sm text-gray-500">
                Short-term derivatives dynamics are cyclical. By looking 20 sessions back, we establish 
                a mean-reversion baseline. Our 20-session projection uses a proprietary synthesis 
                of current theta decay and historical IV term structures to estimate where sentiment 
                is likely to consolidate.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Recent Reports</h3>
            <ul className="space-y-4">
              {[
                "Volatility Spike in Bank Nifty",
                "FinNifty Expiry: Skew Analysis",
                "Sensex All-Time Highs & Volatility",
                "Midcap Resilience: A Quant View"
              ].map((item, i) => (
                <li key={i} className="group cursor-pointer">
                  <p className="text-sm font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">{item}</p>
                  <p className="text-xs text-gray-400">Published yesterday</p>
                </li>
              ))}
            </ul>
            <div className="mt-8 p-6 bg-indigo-600 rounded-2xl text-white shadow-xl shadow-indigo-100">
              <h4 className="font-bold mb-2 text-lg">Open Source Analysis</h4>
              <p className="text-xs text-indigo-100 leading-relaxed">
                This project is deployed as an open-source initiative to improve transparency in Indian 
                capital markets. All quant models used are available for peer review on our repository.
              </p>
              <button className="mt-4 w-full bg-white text-indigo-600 font-bold py-2 rounded-xl text-xs">
                View GitHub
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-50 border-t border-gray-100 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-400 font-medium mb-4">© 2024 India Quant. For Educational Purposes Only.</p>
          <div className="flex justify-center gap-6">
            <a href="#" className="text-xs text-gray-400 hover:text-gray-900">Terms of Use</a>
            <a href="#" className="text-xs text-gray-400 hover:text-gray-900">Privacy Policy</a>
            <a href="#" className="text-xs text-gray-400 hover:text-gray-900">Disclaimer</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
