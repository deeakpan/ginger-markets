'use client';

import { X, Check, Calendar, TrendingUp } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';

interface PredictionCardProps {
  id: string;
  question: string;
  description?: string;
  image?: string;
  yesProbability: number;
  stakeVolume: number;
  resolveDate: string;
  onSwipe: (direction: 'left' | 'right', id: string) => void;
  defaultAmount?: number | null;
}

export default function PredictionCard({ 
  id, 
  question, 
  description, 
  image,
  yesProbability,
  stakeVolume,
  resolveDate,
  onSwipe, 
  defaultAmount 
}: PredictionCardProps) {
  const handlers = useSwipeable({
    onSwipedLeft: () => onSwipe('left', id),
    onSwipedRight: () => onSwipe('right', id),
    trackMouse: false,
    trackTouch: true,
    preventScrollOnSwipe: true,
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const noProbability = 100 - yesProbability;

  return (
    <div
      {...handlers}
      className="relative w-full bg-slate-800 border border-slate-700 rounded-xl shadow-lg overflow-hidden select-none touch-none"
    >
      <div className="p-6 md:p-8">
        {/* Header with image and probability */}
        <div className="flex items-start gap-4 mb-4">
          {/* Small square image */}
          {image && (
            <div className="flex-shrink-0">
              <img
                src={image}
                alt={question}
                className="w-20 h-20 md:w-24 md:h-24 rounded-lg object-cover border border-slate-600"
              />
            </div>
          )}
          
          {/* Probability bars - Polymarket style */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-emerald-400">YES</span>
                <span className="text-lg font-bold text-white">{yesProbability}%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-white">{noProbability}%</span>
                <span className="text-xs font-semibold text-red-400">NO</span>
              </div>
            </div>
            <div className="flex h-2 bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-500 transition-all"
                style={{ width: `${yesProbability}%` }}
              />
              <div 
                className="bg-red-500 transition-all"
                style={{ width: `${noProbability}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question and Description */}
        <div className="space-y-3 mb-4">
          <h2 className="text-xl md:text-2xl font-semibold text-blue-50 leading-tight">{question}</h2>
          {description && (
            <p className="text-sm text-blue-200 leading-relaxed">{description}</p>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-6 text-sm">
          <div className="flex items-center gap-2 text-blue-300">
            <TrendingUp className="w-4 h-4" />
            <span>{stakeVolume.toFixed(1)} SOL</span>
          </div>
          <div className="flex items-center gap-2 text-blue-300">
            <Calendar className="w-4 h-4" />
            <span>Resolves {formatDate(resolveDate)}</span>
          </div>
        </div>
        
        {/* Desktop buttons - inside card */}
        <div className="hidden md:flex justify-center gap-4 pt-4 border-t border-slate-700">
          <button
            onClick={() => onSwipe('left', id)}
            className="flex-1 px-6 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
          >
            <X className="w-5 h-5" />
            No
          </button>
          <button
            onClick={() => onSwipe('right', id)}
            disabled={!defaultAmount || defaultAmount <= 0}
            className="flex-1 px-6 py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Check className="w-5 h-5" />
            <span className="text-white">Yes</span>
          </button>
        </div>

        {/* Mobile hint */}
        <div className="md:hidden text-center pt-4 border-t border-slate-700">
          <p className="text-xs text-blue-300">Swipe left for No, right for Yes</p>
        </div>
      </div>
    </div>
  );
}
