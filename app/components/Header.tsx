'use client';

import { useState } from 'react';
import { Wallet } from 'lucide-react';

interface HeaderProps {
  onConnect: () => void;
  isConnected: boolean;
  walletAddress?: string;
}

export default function Header({ onConnect, isConnected, walletAddress }: HeaderProps) {
  const [activeTab, setActiveTab] = useState('markets');

  const tabs = ['Markets', 'Trades', 'Portfolio', 'History'];

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex items-center justify-center px-4 md:px-6">
      <div className="flex items-center gap-3 md:gap-4 w-full max-w-3xl">
        {/* Logo - Left edge, stylized */}
        <div className="flex-shrink-0">
          <h1 className="text-xl md:text-2xl font-black text-blue-50 tracking-tight italic">
            Gingermarket
          </h1>
        </div>

        {/* Floating Header - centered, tabs span full width */}
        <div className="flex-1 bg-slate-800/95 backdrop-blur-sm border border-slate-700 rounded-xl shadow-lg px-4 md:px-6 py-2 flex items-center justify-between min-w-0">
          <div className="flex items-center justify-between w-full gap-2 md:gap-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`flex-1 text-xs md:text-sm font-medium transition-colors whitespace-nowrap text-center ${
                  activeTab === tab.toLowerCase()
                    ? 'text-blue-100 font-semibold'
                    : 'text-blue-300 hover:text-blue-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Connect Button - Right edge */}
        <div className="flex-shrink-0">
          {isConnected ? (
            <div className="flex items-center gap-2 px-3 md:px-4 py-2 bg-slate-700 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs md:text-sm font-medium text-blue-100 hidden sm:inline">
                {walletAddress?.slice(0, 4)}...{walletAddress?.slice(-4)}
              </span>
            </div>
          ) : (
            <button
              onClick={onConnect}
              className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 bg-slate-700 text-blue-50 rounded-lg hover:bg-slate-600 transition-colors text-xs md:text-sm font-medium"
            >
              <Wallet className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Connect</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
