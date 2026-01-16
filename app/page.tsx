'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import Header from './components/Header';
import PredictionCard from './components/PredictionCard';
import Betslip, { Bet } from './components/Betslip';
import DefaultBetModal from './components/DefaultBetModal';

// Mock data - 8 markets for 2026
const mockPredictions = [
  {
    id: '1',
    question: 'Will Bitcoin hit $150k by end of 2026?',
    description: 'Price must close above $150,000 on Dec 31, 2026',
    image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=200&h=200&fit=crop',
    yesProbability: 68,
    stakeVolume: 245.8,
    resolveDate: '2026-12-31',
  },
  {
    id: '2',
    question: 'Will AI replace 50% of software jobs by 2026?',
    description: 'Based on industry employment statistics',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=200&h=200&fit=crop',
    yesProbability: 42,
    stakeVolume: 189.3,
    resolveDate: '2026-12-31',
  },
  {
    id: '3',
    question: 'Will Solana have more daily transactions than Ethereum in 2026?',
    description: 'Average daily transactions over 2026',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=200&h=200&fit=crop',
    yesProbability: 55,
    stakeVolume: 312.5,
    resolveDate: '2026-12-31',
  },
  {
    id: '4',
    question: 'Will the Fed cut rates by 1.5% in 2026?',
    description: 'Total rate cuts must equal or exceed 1.5%',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200&h=200&fit=crop',
    yesProbability: 38,
    stakeVolume: 156.2,
    resolveDate: '2026-12-31',
  },
  {
    id: '5',
    question: 'Will GPT-6 be released before Q3 2026?',
    description: 'Public release date must be before July 1, 2026',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=200&h=200&fit=crop',
    yesProbability: 72,
    stakeVolume: 278.9,
    resolveDate: '2026-07-01',
  },
  {
    id: '6',
    question: 'Will Ethereum ETF trading volume exceed $10B in 2026?',
    description: 'Total trading volume must exceed $10 billion',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=200&h=200&fit=crop',
    yesProbability: 61,
    stakeVolume: 201.4,
    resolveDate: '2026-12-31',
  },
  {
    id: '7',
    question: 'Will US unemployment rate exceed 5% by Q2 2026?',
    description: 'Based on BLS monthly unemployment reports',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&h=200&fit=crop',
    yesProbability: 29,
    stakeVolume: 134.7,
    resolveDate: '2026-06-30',
  },
  {
    id: '8',
    question: 'Will Tesla stock reach $400 by end of 2026?',
    description: 'Closing price must be at or above $400 on Dec 31, 2026',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop',
    yesProbability: 48,
    stakeVolume: 167.3,
    resolveDate: '2026-12-31',
  },
];

const BETSLIP_STORAGE_KEY = 'gingermarket_betslip';
const FIRST_LOGIN_KEY = 'gingermarket_first_login';
const DEFAULT_AMOUNT_KEY = 'gingermarket_default_amount';

export default function Home() {
  const { publicKey, connected } = useWallet();
  const { setVisible } = useWalletModal();
  const [bets, setBets] = useState<Bet[]>([]);
  const [defaultAmount, setDefaultAmount] = useState<number | null>(null);
  const [showDefaultModal, setShowDefaultModal] = useState(false);

  // Load betslip from localStorage
  useEffect(() => {
    const savedBetslip = localStorage.getItem(BETSLIP_STORAGE_KEY);
    if (savedBetslip) {
      try {
        const parsedBets = JSON.parse(savedBetslip) as Bet[];
        setBets(parsedBets);
      } catch (e) {
        console.error('Error loading betslip:', e);
      }
    }
  }, []);

  // Save betslip to localStorage whenever it changes
  useEffect(() => {
    if (bets.length > 0) {
      localStorage.setItem(BETSLIP_STORAGE_KEY, JSON.stringify(bets));
    } else {
      localStorage.removeItem(BETSLIP_STORAGE_KEY);
    }
  }, [bets]);

  // Check first login and default amount
  useEffect(() => {
    if (connected && publicKey) {
      const firstLogin = localStorage.getItem(FIRST_LOGIN_KEY);
      const savedDefault = localStorage.getItem(DEFAULT_AMOUNT_KEY);
      
      if (!firstLogin) {
        // First time login
        localStorage.setItem(FIRST_LOGIN_KEY, 'true');
        setShowDefaultModal(true);
      } else if (savedDefault) {
        setDefaultAmount(parseFloat(savedDefault));
      }
    }
  }, [connected, publicKey]);

  const handleConnect = () => {
    setVisible(true);
  };

  const handleBet = (direction: 'left' | 'right', id: string) => {
    const prediction = mockPredictions.find((p) => p.id === id);
    if (!prediction) return;

    // Only add to betslip if swiping right (yes) and default amount is set
    if (direction === 'right' && defaultAmount !== null && defaultAmount > 0) {
      const existingBetIndex = bets.findIndex((b) => b.id === id);
      
      if (existingBetIndex >= 0) {
        // Update existing bet
        const updatedBets = [...bets];
        updatedBets[existingBetIndex] = {
          ...updatedBets[existingBetIndex],
          side: 'yes',
          amount: defaultAmount,
        };
        setBets(updatedBets);
      } else {
        // Add new bet
        const newBet: Bet = {
          id,
          question: prediction.question,
          side: 'yes',
          amount: defaultAmount,
        };
        setBets([...bets, newBet]);
      }
    } else if (direction === 'left') {
      // Remove bet if swiping left (no)
      setBets(bets.filter((b) => b.id !== id));
    }
  };

  const handleRemoveBet = (id: string) => {
    const updatedBets = bets.filter((b) => b.id !== id);
    setBets(updatedBets);
    if (updatedBets.length === 0) {
      localStorage.removeItem(BETSLIP_STORAGE_KEY);
    }
  };

  const handleUpdateAmount = (id: string, amount: number) => {
    setBets(bets.map((b) => (b.id === id ? { ...b, amount } : b)));
  };

  const handlePlaceBets = () => {
    // TODO: Implement actual betting logic with Solana
    console.log('Placing bets:', bets);
    alert(`Placing ${bets.length} bets for ${bets.reduce((sum, b) => sum + b.amount, 0).toFixed(4)} SOL`);
    setBets([]);
    localStorage.removeItem(BETSLIP_STORAGE_KEY);
  };

  const handleSetDefault = (amount: number) => {
    setDefaultAmount(amount);
    localStorage.setItem(DEFAULT_AMOUNT_KEY, amount.toString());
    setShowDefaultModal(false);
  };

  const walletAddress = publicKey?.toBase58();

  return (
    <div className="min-h-screen bg-slate-900 pb-20 md:pb-32">
      <Header
        onConnect={handleConnect}
        isConnected={connected}
        walletAddress={walletAddress}
      />
      
      <DefaultBetModal isOpen={showDefaultModal} onSetDefault={handleSetDefault} />

      <div className="w-full max-w-3xl mx-auto px-4 pt-24 md:pt-32">
        <div className="space-y-6 pb-8">
          {mockPredictions.map((prediction) => (
            <PredictionCard
              key={prediction.id}
              id={prediction.id}
              question={prediction.question}
              description={prediction.description}
              image={prediction.image}
              yesProbability={prediction.yesProbability}
              stakeVolume={prediction.stakeVolume}
              resolveDate={prediction.resolveDate}
              onSwipe={handleBet}
              defaultAmount={defaultAmount}
            />
          ))}
        </div>
      </div>

      <Betslip
        bets={bets}
        onRemoveBet={handleRemoveBet}
        onUpdateAmount={handleUpdateAmount}
        onPlaceBets={handlePlaceBets}
        defaultAmount={defaultAmount || 0.1}
      />
    </div>
  );
}
