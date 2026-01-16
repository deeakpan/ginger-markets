'use client';

import { useState } from 'react';
import { X, Wallet } from 'lucide-react';

export interface Bet {
  id: string;
  question: string;
  side: 'yes' | 'no';
  amount: number;
}

interface BetslipProps {
  bets: Bet[];
  onRemoveBet: (id: string) => void;
  onUpdateAmount: (id: string, amount: number) => void;
  onPlaceBets: () => void;
  defaultAmount: number;
}

export default function Betslip({ bets, onRemoveBet, onUpdateAmount, onPlaceBets, defaultAmount }: BetslipProps) {
  const [isOpen, setIsOpen] = useState(false);

  const totalAmount = bets.reduce((sum, bet) => sum + bet.amount, 0);

  // Floating button for all screen sizes
  return (
    <>
      {/* Floating button - shown on all devices */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 md:w-16 md:h-16 bg-slate-700 text-blue-50 rounded-full shadow-lg hover:bg-slate-600 transition-colors flex items-center justify-center z-40"
      >
        <Wallet className="w-6 h-6 md:w-7 md:h-7" />
        {bets.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 md:w-7 md:h-7 flex items-center justify-center">
            {bets.length}
          </span>
        )}
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-end md:items-center justify-center z-50 p-0 md:p-4" onClick={() => setIsOpen(false)}>
          <div 
            className="w-full md:w-full md:max-w-2xl bg-slate-800 rounded-t-2xl md:rounded-2xl shadow-xl max-h-[90vh] md:max-h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-slate-700">
              <h2 className="text-xl font-semibold text-blue-50">Betslip</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-blue-200" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              {bets.length === 0 ? (
                <div className="text-center py-12">
                  <Wallet className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-blue-200">Your betslip is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bets.map((bet) => (
                    <div
                      key={bet.id}
                      className="bg-slate-700 border border-slate-600 rounded-lg p-4 space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-sm text-blue-50 mb-1">{bet.question}</p>
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2 py-1 rounded text-xs font-semibold ${
                                bet.side === 'yes'
                                  ? 'bg-green-500 text-white'
                                  : 'bg-red-500 text-white'
                              }`}
                            >
                              {bet.side.toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => onRemoveBet(bet.id)}
                          className="ml-2 p-1 hover:bg-slate-600 rounded transition-colors"
                        >
                          <X className="w-4 h-4 text-blue-200" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={bet.amount}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            if (!isNaN(val) && val >= 0) {
                              onUpdateAmount(bet.id, val);
                            }
                          }}
                          min="0"
                          step="any"
                          className="flex-1 px-3 py-2 border border-slate-600 bg-slate-800 rounded-lg text-center font-medium text-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                          placeholder="0.00"
                        />
                        <span className="text-sm text-blue-200 font-medium">SOL</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {bets.length > 0 && (
              <div className="p-4 md:p-6 border-t border-slate-700 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-blue-50">Total</span>
                  <span className="font-semibold text-lg text-blue-50">{totalAmount.toFixed(4)} SOL</span>
                </div>
                <button
                  onClick={() => {
                    onPlaceBets();
                    setIsOpen(false);
                  }}
                  className="w-full py-3 px-4 bg-slate-700 text-blue-50 font-medium rounded-lg hover:bg-slate-600 transition-colors"
                >
                  Place All Bets
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
