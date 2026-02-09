'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Shield, 
  CreditCard, 
  Check, 
  Sparkles,
  Lock,
  ArrowRight,
  Star,
  TrendingUp
} from 'lucide-react';
import Navbar from '@/app/components/Navbar';

interface PricingTier {
  id: string;
  amount: number;
  credits: number;
  popular?: boolean;
  bonus?: number;
  savings?: string;
  examples: string[];
}

const pricingTiers: PricingTier[] = [
  {
    id: 'starter',
    amount: 10,
    credits: 10,
    examples: [
      'Perfect for trying out',
      'SD image generation',
      'Basic text models'
    ]
  },
  {
    id: 'popular',
    amount: 25,
    credits: 25,
    popular: true,
    examples: [
      'Most popular choice',
      'Mix of images & video',
      'Great for regular use'
    ]
  },
  {
    id: 'pro',
    amount: 50,
    credits: 50,
    examples: [
      'Best for power users',
      'Heavy generation needs',
      'Professional projects'
    ]
  },
  {
    id: 'enterprise',
    amount: 100,
    credits: 100,
    examples: [
      'Maximum value',
      'Large-scale projects',
      'Team workflows'
    ]
  }
];

export default function CreditsPage() {
  const [selectedTier, setSelectedTier] = useState<string>('popular');
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const currentBalance = 0; // This would come from your user state

  const handlePurchase = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // Handle actual payment logic here
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c101c] to-[#111727] text-white">
      {/* Navbar */}
      <Navbar balance="0" />
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-8 md:pt-12 pb-6 md:pb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ffbc36]/10 border border-[#ffbc36]/20 rounded-full mb-4 md:mb-6">
            <Sparkles className="w-4 h-4 text-[#ffbc36]" />
            <span className="text-sm text-[#ffbc36] font-medium">Power your creativity</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Purchase Credits
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto px-4">
            Choose the perfect plan for your needs. All credits never expire and can be used across all AI models.
          </p>
        </motion.div>

        {/* Current Balance */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto mb-8 md:mb-12"
        >
          <div className="bg-gradient-to-r from-[#1a1f35] to-[#1e2439] border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Current Balance</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">{currentBalance}</span>
                  <span className="text-gray-400">credits</span>
                </div>
              </div>
              <div className="w-16 h-16 bg-[#ffbc36]/10 rounded-2xl flex items-center justify-center">
                <Zap className="w-8 h-8 text-[#ffbc36]" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedTier(tier.id)}
              className={`relative cursor-pointer transition-all duration-300 ${
                selectedTier === tier.id
                  ? 'md:scale-105'
                  : 'hover:scale-102'
              }`}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-[#ffbc36] to-[#ff9d36] px-4 py-1 rounded-full text-xs font-bold text-black flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    MOST POPULAR
                  </div>
                </div>
              )}

              {/* Card */}
              <div
                className={`h-full bg-gradient-to-br from-[#1a1f35] to-[#1e2439] rounded-2xl p-6 border-2 transition-all duration-300 ${
                  selectedTier === tier.id
                    ? 'border-[#ffbc36] shadow-[0_0_30px_rgba(255,188,54,0.3)]'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {/* Savings Badge */}
                {tier.savings && (
                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-[#4ade7d]/10 border border-[#4ade7d]/20 rounded-full text-xs font-medium text-[#4ade7d] mb-4">
                    <TrendingUp className="w-3 h-3" />
                    {tier.savings}
                  </div>
                )}

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-5xl font-bold">${tier.amount}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-semibold text-[#ffbc36]">
                      {tier.credits}
                    </span>
                    <span className="text-gray-400">credits</span>
                  </div>
                </div>

                {/* Examples */}
                <div className="space-y-3 mb-6">
                  {tier.examples.map((example, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#4ade7d] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{example}</span>
                    </div>
                  ))}
                </div>

                {/* Select Button */}
                <button
                  className={`w-full py-3 rounded-xl font-medium transition-all duration-300 ${
                    selectedTier === tier.id
                      ? 'bg-gradient-to-r from-[#ffbc36] to-[#ff9d36] text-black'
                      : 'bg-white/5 text-white hover:bg-white/10'
                  }`}
                >
                  {selectedTier === tier.id ? 'Selected' : 'Select Plan'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Amount */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-2xl mx-auto mb-8 md:mb-12"
        >
          <div className="bg-gradient-to-br from-[#1a1f35] to-[#1e2439] border border-white/10 rounded-2xl p-4 md:p-6">
            <p className="text-sm text-gray-400 mb-4">Or enter custom amount</p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <div className="flex-1 relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl md:text-2xl font-bold text-gray-500">
                  $
                </span>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="25"
                  min="10"
                  className="w-full bg-[#0a0e1a] border border-white/10 rounded-xl px-10 md:px-12 py-3 md:py-4 text-xl md:text-2xl font-bold text-white placeholder-gray-600 focus:outline-none focus:border-[#ffbc36] transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
              <button className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-medium transition-colors">
                Add Custom
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3">Minimum purchase: $10</p>
          </div>
        </motion.div>

        {/* Payment Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-gradient-to-br from-[#1a1f35] to-[#1e2439] border border-white/10 rounded-2xl p-4 md:p-8">
            <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6">Complete Purchase</h3>

            {/* Selected Plan Summary */}
            {selectedTier && (
              <div className="bg-[#0a0e1a] rounded-xl p-4 mb-4 md:mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm md:text-base">Selected Plan</span>
                  <span className="font-semibold text-base md:text-lg">
                    {pricingTiers.find(t => t.id === selectedTier)?.credits} credits
                  </span>
                </div>
                <div className="flex items-center justify-between text-xl md:text-2xl font-bold">
                  <span>Total</span>
                  <span>${pricingTiers.find(t => t.id === selectedTier)?.amount}</span>
                </div>
              </div>
            )}

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-4 md:mb-6 pb-4 md:pb-6 border-b border-white/10">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Shield className="w-4 h-4 text-[#4ade7d]" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Lock className="w-4 h-4 text-[#4ade7d]" />
                <span>256-bit SSL</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Zap className="w-4 h-4 text-[#ffbc36]" />
                <span>Instant Delivery</span>
              </div>
            </div>

            {/* Payment Button */}
            <button
              onClick={handlePurchase}
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-[#ffbc36] to-[#ff9d36] hover:from-[#ff9d36] hover:to-[#ffbc36] text-black font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  Complete Purchase
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <p className="text-xs text-center text-gray-500 mt-4">
              By purchasing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </motion.div>

        {/* Payment History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-4xl mx-auto mt-8 md:mt-12"
        >
          <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Payment History</h3>
          <div className="bg-gradient-to-br from-[#1a1f35] to-[#1e2439] border border-white/10 rounded-2xl p-8 md:p-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-gray-600" />
              </div>
              <h4 className="text-lg md:text-xl font-semibold mb-2 text-gray-400">No invoices yet</h4>
              <p className="text-sm md:text-base text-gray-500">
                Your payment history will appear here after your first purchase
              </p>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="max-w-4xl mx-auto mt-12 pb-12"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: "Do credits expire?",
                a: "No! Your credits never expire and remain in your account indefinitely."
              },
              {
                q: "Are credits transferable?",
                a: "Credits are non-transferable and tied to your account. They cannot be exchanged or refunded."
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards and PayPal for secure and instant transactions."
              },
              {
                q: "How are credits calculated?",
                a: "Each model has different credit costs based on computational resources. Check model details for exact pricing."
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#1a1f35] to-[#1e2439] border border-white/10 rounded-xl p-6"
              >
                <h4 className="font-semibold mb-2">{faq.q}</h4>
                <p className="text-sm text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}