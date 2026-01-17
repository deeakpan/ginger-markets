'use client';

import { useState } from 'react';
import { Menu, Wallet, Smile, Search, Filter } from 'lucide-react';

interface HeaderProps {
  onConnect: () => void;
  isConnected: boolean;
  walletAddress?: string;
}

export default function Header({ onConnect, isConnected, walletAddress }: HeaderProps) {
  const [activeTab, setActiveTab] = useState('markets');
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

      {/* Desktop Header - Left Aligned */}
      <div className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-6">
            {/* Left Section: Logo and Tabs */}
            <div className="flex items-center gap-6">
              <h1 className="text-2xl font-black text-blue-50 tracking-tight italic">
                Gingermarket
              </h1>
              
              <div className="flex items-center gap-1">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === tab.toLowerCase()
                        ? 'bg-slate-700 text-blue-100'
                        : 'text-blue-300 hover:bg-slate-700 hover:text-blue-100'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Center Section: Search and Filters */}
            <div className="flex-1 flex items-center gap-3 max-w-2xl">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-300" />
                <input
                  type="text"
                  placeholder="Search markets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-blue-50 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              {/* Filter Button */}
              <button className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-blue-50 hover:bg-slate-600 transition-colors flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">Filters</span>
              </button>
            </div>

            {/* Right Section: Connect Button */}
            <div className="flex-shrink-0">
              {isConnected ? (
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-700 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-blue-100">
                    {walletAddress?.slice(0, 4)}...{walletAddress?.slice(-4)}
                  </span>
                </div>
              ) : (
                <button
                  onClick={onConnect}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-blue-50 rounded-lg hover:bg-slate-600 transition-colors text-sm font-medium"
                >
                  <Wallet className="w-4 h-4" />
                  Connect
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
