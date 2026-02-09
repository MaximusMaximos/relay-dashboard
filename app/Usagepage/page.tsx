'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp,
  Activity,
  Zap,
  Calendar,
  Filter,
  Download,
  BarChart3,
  PieChart,
  ArrowUp,
  ArrowDown,
  Image as ImageIcon,
  Video,
  MessageSquare,
  Music
} from 'lucide-react';
import Navbar from '@/app/components/Navbar';

interface UsageData {
  date: string;
  requests: number;
  credits: number;
}

interface ModelUsage {
  model: string;
  category: string;
  requests: number;
  credits: number;
  icon: React.ReactNode;
  color: string;
}

export default function UsagePage() {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedKey, setSelectedKey] = useState('all');
  const [selectedMetric, setSelectedMetric] = useState('requests');

  // Mock data - replace with real data
  const totalStats = {
    requests: 1247,
    credits: 3842,
    avgPerDay: 178,
    trend: 12.5
  };

  const dailyData: UsageData[] = [
    { date: 'Feb 1', requests: 145, credits: 432 },
    { date: 'Feb 2', requests: 189, credits: 567 },
    { date: 'Feb 3', requests: 167, credits: 501 },
    { date: 'Feb 4', requests: 223, credits: 669 },
    { date: 'Feb 5', requests: 198, credits: 594 },
    { date: 'Feb 6', requests: 156, credits: 468 },
    { date: 'Feb 7', requests: 169, credits: 507 }
  ];

  const modelUsage: ModelUsage[] = [
    {
      model: 'Stable Diffusion 1.5',
      category: 'Image',
      requests: 456,
      credits: 912,
      icon: <ImageIcon className="w-5 h-5" />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      model: 'GPT-OSS 120b',
      category: 'Text',
      requests: 342,
      credits: 1368,
      icon: <MessageSquare className="w-5 h-5" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      model: 'Sora 2 Standard',
      category: 'Video',
      requests: 123,
      credits: 984,
      icon: <Video className="w-5 h-5" />,
      color: 'from-orange-500 to-red-500'
    },
    {
      model: 'Whisper Large v3',
      category: 'Audio',
      requests: 89,
      credits: 267,
      icon: <Music className="w-5 h-5" />,
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const maxValue = Math.max(...dailyData.map(d => selectedMetric === 'requests' ? d.requests : d.credits));

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c101c] to-[#111727] text-white">
      <Navbar balance="0" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8"
        >
          <div>
            <h1 className="text-2xl md:text-4xl font-bold mb-2">Usage & Analytics</h1>
            <p className="text-sm md:text-base text-gray-400">Monitor your API usage and credit consumption</p>
          </div>
          <button className="w-full sm:w-auto px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all flex items-center justify-center gap-2">
            <Download className="w-5 h-5" />
            Export Report
          </button>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#1a1f35] to-[#1e2439] border border-white/10 rounded-2xl p-4 md:p-6 mb-6 md:mb-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Time Range</label>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="w-full bg-[#0a0e1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ffbc36] transition-colors"
              >
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
                <option value="all">All Time</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">API Key</label>
              <select
                value={selectedKey}
                onChange={(e) => setSelectedKey(e.target.value)}
                className="w-full bg-[#0a0e1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ffbc36] transition-colors"
              >
                <option value="all">All Keys</option>
                <option value="prod">Production API</option>
                <option value="dev">Development</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Metric</label>
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="w-full bg-[#0a0e1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ffbc36] transition-colors"
              >
                <option value="requests">Requests Sent</option>
                <option value="credits">Credits Used</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-[#1a1f35] to-[#1e2439] border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6"
          >
            <div className="flex items-center justify-between mb-2 md:mb-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#ffbc36]/10 rounded-xl flex items-center justify-center">
                <Activity className="w-5 h-5 md:w-6 md:h-6 text-[#ffbc36]" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${totalStats.trend > 0 ? 'text-[#4ade7d]' : 'text-red-400'}`}>
                {totalStats.trend > 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                {Math.abs(totalStats.trend)}%
              </div>
            </div>
            <div className="text-xs md:text-xs md:text-sm text-gray-400 mb-1">Total Requests</div>
            <div className="text-xl md:text-xl md:text-3xl font-bold">{totalStats.requests.toLocaleString()}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-[#1a1f35] to-[#1e2439] border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#4ade7d]/10 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 md:w-6 md:h-6 text-[#4ade7d]" />
              </div>
            </div>
            <div className="text-xs md:text-sm text-gray-400 mb-1">Credits Used</div>
            <div className="text-xl md:text-3xl font-bold">{totalStats.credits.toLocaleString()}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-[#1a1f35] to-[#1e2439] border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
              </div>
            </div>
            <div className="text-xs md:text-sm text-gray-400 mb-1">Avg. Per Day</div>
            <div className="text-xl md:text-3xl font-bold">{totalStats.avgPerDay}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-[#1a1f35] to-[#1e2439] border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
              </div>
            </div>
            <div className="text-xs md:text-sm text-gray-400 mb-1">Time Range</div>
            <div className="text-2xl font-bold">Last 7 Days</div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2 bg-gradient-to-br from-[#1a1f35] to-[#1e2439] border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6"
          >
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div>
                <h3 className="text-lg md:text-xl font-bold mb-1">Usage Over Time</h3>
                <p className="text-xs md:text-sm text-gray-400">
                  {selectedMetric === 'requests' ? 'API Requests' : 'Credits Consumed'}
                </p>
              </div>
              <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-[#ffbc36]" />
            </div>

            {/* Simple Bar Chart */}
            <div className="h-60 md:h-80 flex items-end justify-between gap-1 md:gap-2">
              {dailyData.map((data, index) => {
                const value = selectedMetric === 'requests' ? data.requests : data.credits;
                const height = (value / maxValue) * 100;
                
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-3">
                    <div className="w-full flex flex-col justify-end h-full">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                        className="w-full bg-gradient-to-t from-[#ffbc36] to-[#ff9d36] rounded-t-lg relative group cursor-pointer"
                      >
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-[#0a0e1a] border border-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                          <div className="text-xs text-gray-400">{data.date}</div>
                          <div className="text-sm font-bold">
                            {value.toLocaleString()} {selectedMetric === 'requests' ? 'requests' : 'credits'}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                    <div className="text-xs text-gray-500 font-medium">{data.date.split(' ')[1]}</div>
                  </div>
                );
              })}
            </div>

            {/* Y-axis labels */}
            <div className="mt-4 flex justify-between text-xs text-gray-500">
              <span>0</span>
              <span>{(maxValue / 2).toFixed(0)}</span>
              <span>{maxValue}</span>
            </div>
          </motion.div>

          {/* Model Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-[#1a1f35] to-[#1e2439] border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6"
          >
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div>
                <h3 className="text-lg md:text-xl font-bold mb-1">Top Models</h3>
                <p className="text-xs md:text-sm text-gray-400">By usage</p>
              </div>
              <PieChart className="w-5 h-5 md:w-6 md:h-6 text-[#ffbc36]" />
            </div>

            <div className="space-y-3 md:space-y-4">
              {modelUsage.map((model, index) => {
                const totalRequests = modelUsage.reduce((sum, m) => sum + m.requests, 0);
                const percentage = ((model.requests / totalRequests) * 100).toFixed(1);
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 bg-gradient-to-br ${model.color} rounded-lg flex items-center justify-center text-white`}>
                          {model.icon}
                        </div>
                        <div>
                          <div className="font-semibold text-sm">{model.model}</div>
                          <div className="text-xs text-gray-400">{model.category}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold">{percentage}%</div>
                        <div className="text-xs text-gray-500">{model.requests} req</div>
                      </div>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="h-2 bg-[#0a0e1a] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                        className={`h-full bg-gradient-to-r ${model.color}`}
                      />
                    </div>

                    {/* Credits used */}
                    <div className="mt-2 text-xs text-gray-500">
                      {model.credits.toLocaleString()} credits used
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Total */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Total</span>
                <div className="text-right">
                  <div className="font-bold">{modelUsage.reduce((sum, m) => sum + m.requests, 0)} requests</div>
                  <div className="text-sm text-gray-500">{modelUsage.reduce((sum, m) => sum + m.credits, 0)} credits</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}