'use client';

import { useState } from 'react';
import { Menu, Wallet, Smile } from 'lucide-react';

interface HeaderProps {
  onConnect: () => void;
  isConnected: boolean;
  walletAddress?: string;
}

export default function Header({ onConnect, isConnected, walletAddress }: HeaderProps) {
  const [activeTab, setActiveTab] = useState('markets');
  const [menuOpen, setMenuOpen] = useState(false);

  const tabs = ['Markets', 'Trades', 'Portfolio', 'History'];

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-slate-800 border-b border-slate-700 px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Menu Icon - Left */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5 text-blue-50" />
          </button>

          {/* Gingermarket Text - Center */}
          <h1 className="text-lg font-black text-blue-50 tracking-tight italic">
            Gingermarket
          </h1>

          {/* Profile Icon - Right */}
          <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
            <Smile className="w-5 h-5 text-blue-50" />
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="mt-3 pt-3 border-t border-slate-700">
            <div className="flex flex-col gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab.toLowerCase());
                    setMenuOpen(false);
                  }}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors text-left ${
                    activeTab === tab.toLowerCase()
                      ? 'bg-slate-700 text-blue-100'
                      : 'text-blue-300 hover:bg-slate-700 hover:text-blue-100'
                  }`}
                >
                  {tab}
                </button>
              ))}
              <div className="pt-2 border-t border-slate-700">
                {isConnected ? (
                  <div className="flex items-center gap-2 px-4 py-2 bg-slate-700 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs font-medium text-blue-100">
                      {walletAddress?.slice(0, 4)}...{walletAddress?.slice(-4)}
                    </span>
                  </div>
                ) : (
                  <button
                    onClick={onConnect}
                    className="w-full flex items-center gap-2 px-4 py-2 bg-slate-700 text-blue-50 rounded-lg hover:bg-slate-600 transition-colors text-sm font-medium"
                  >
                    <Wallet className="w-4 h-4" />
                    Connect Wallet
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Header */}
      <div className="hidden md:flex fixed top-4 left-0 right-0 z-50 items-center justify-center px-4 md:px-6">
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
    </>
  );
}
