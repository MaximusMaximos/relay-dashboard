'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Key, 
  Plus,
  Copy,
  Eye,
  EyeOff,
  Trash2,
  Check,
  AlertCircle,
  Shield,
  Calendar,
  Activity
} from 'lucide-react';
import Navbar from '@/app/components/Navbar';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed: string;
  usage: number;
}

export default function KeysPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [revealedKeys, setRevealedKeys] = useState<Set<string>>(new Set());

  // Mock API keys - replace with actual data
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      name: 'Production API',
      key: 'relay_live_abc123def456ghi789jkl012mno345pqr678stu901vwx234yz',
      createdAt: 'Jan 15, 2026',
      lastUsed: '2 hours ago',
      usage: 1250
    },
    {
      id: '2',
      name: 'Development',
      key: 'relay_test_xyz987wvu654tsr321qpo098nml765kji432hgf210edc109ba',
      createdAt: 'Jan 10, 2026',
      lastUsed: '1 day ago',
      usage: 450
    }
  ]);

  const handleCreateKey = async () => {
    if (!newKeyName.trim()) return;
    
    setIsCreating(true);
    // Simulate API call
    setTimeout(() => {
      const newKey: ApiKey = {
        id: Date.now().toString(),
        name: newKeyName,
        key: `relay_live_${Math.random().toString(36).substring(2, 50)}`,
        createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        lastUsed: 'Never',
        usage: 0
      };
      setApiKeys([newKey, ...apiKeys]);
      setNewKeyName('');
      setShowCreateModal(false);
      setIsCreating(false);
    }, 1500);
  };

  const handleCopyKey = (key: string, id: string) => {
    navigator.clipboard.writeText(key);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleRevealKey = (id: string) => {
    const newRevealed = new Set(revealedKeys);
    if (newRevealed.has(id)) {
      newRevealed.delete(id);
    } else {
      newRevealed.add(id);
    }
    setRevealedKeys(newRevealed);
  };

  const handleDeleteKey = (id: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
  };

  const maskKey = (key: string) => {
    return key.substring(0, 12) + '•'.repeat(20) + key.substring(key.length - 4);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c101c] to-[#111727] text-white">
      <Navbar balance="0" />
      
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8"
        >
          <div>
            <h1 className="text-2xl md:text-4xl font-bold mb-2">API Keys</h1>
            <p className="text-sm md:text-base text-gray-400">Manage your API keys for programmatic access</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#ffbc36] to-[#ff9d36] hover:from-[#ff9d36] hover:to-[#ffbc36] text-black font-medium rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Key
          </button>
        </motion.div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-[#1a1f35] to-[#1e2439] border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#ffbc36]/10 rounded-lg flex items-center justify-center">
                <Key className="w-5 h-5 text-[#ffbc36]" />
              </div>
              <div className="text-sm text-gray-400">Active Keys</div>
            </div>
            <div className="text-3xl font-bold">{apiKeys.length}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-[#1a1f35] to-[#1e2439] border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#4ade7d]/10 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-[#4ade7d]" />
              </div>
              <div className="text-sm text-gray-400">Total Requests</div>
            </div>
            <div className="text-3xl font-bold">{apiKeys.reduce((sum, key) => sum + key.usage, 0).toLocaleString()}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-[#1a1f35] to-[#1e2439] border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-sm text-gray-400">Security</div>
            </div>
            <div className="text-lg font-semibold text-[#4ade7d]">All Secure</div>
          </motion.div>
        </div>

        {/* API Keys List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {apiKeys.length === 0 ? (
            <div className="bg-gradient-to-br from-[#1a1f35] to-[#1e2439] border border-white/10 rounded-2xl p-12 text-center">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Key className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-400">No API Keys Yet</h3>
              <p className="text-gray-500 mb-6">
                Create your first API key to start making requests
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-6 py-3 bg-gradient-to-r from-[#ffbc36] to-[#ff9d36] hover:from-[#ff9d36] hover:to-[#ffbc36] text-black font-medium rounded-xl transition-all inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Create Your First Key
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {apiKeys.map((apiKey, index) => (
                <motion.div
                  key={apiKey.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="bg-gradient-to-br from-[#1a1f35] to-[#1e2439] border border-white/10 rounded-2xl p-4 md:p-6 hover:border-white/20 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-4">
                    <div className="flex-1">
                      <h3 className="text-base md:text-lg font-semibold mb-1">{apiKey.name}</h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs md:text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Created {apiKey.createdAt}
                        </div>
                        <div className="flex items-center gap-1">
                          <Activity className="w-4 h-4" />
                          {apiKey.usage.toLocaleString()} requests
                        </div>
                      </div>
                    </div>
                    <div className="text-xs md:text-sm text-gray-500">
                      Last used: {apiKey.lastUsed}
                    </div>
                  </div>

                  {/* API Key Display */}
                  <div className="bg-[#0a0e1a] rounded-xl p-3 md:p-4 mb-4">
                    <div className="flex items-center gap-2 md:gap-3">
                      <code className="flex-1 font-mono text-xs md:text-sm text-gray-300 break-all overflow-hidden">
                        {revealedKeys.has(apiKey.id) ? apiKey.key : maskKey(apiKey.key)}
                      </code>
                      <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
                        <button
                          onClick={() => toggleRevealKey(apiKey.id)}
                          className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all"
                          title={revealedKeys.has(apiKey.id) ? 'Hide key' : 'Reveal key'}
                        >
                          {revealedKeys.has(apiKey.id) ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => handleCopyKey(apiKey.key, apiKey.id)}
                          className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all relative"
                          title="Copy to clipboard"
                        >
                          {copiedId === apiKey.id ? (
                            <Check className="w-4 h-4 text-[#4ade7d]" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Shield className="w-4 h-4" />
                      <span>Keep this key secure and never share it publicly</span>
                    </div>
                    <button
                      onClick={() => handleDeleteKey(apiKey.id)}
                      className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Revoke
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold mb-2 text-blue-400">Security Best Practices</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Never share your API keys in public repositories or client-side code</li>
                <li>• Rotate your keys regularly to maintain security</li>
                <li>• Use separate keys for development and production environments</li>
                <li>• Revoke any key that may have been compromised immediately</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Create Key Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-6"
            onClick={() => !isCreating && setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-[#1a1f35] to-[#1e2439] border border-white/10 rounded-2xl p-6 md:p-8 max-w-md w-full"
            >
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#ffbc36]/10 rounded-xl flex items-center justify-center">
                  <Key className="w-5 h-5 md:w-6 md:h-6 text-[#ffbc36]" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold">Create API Key</h2>
              </div>

              <p className="text-gray-400 text-sm mb-4 md:mb-6">
                Give your API key a name to help you identify it later. This key will have full access to your account.
              </p>

              <div className="mb-4 md:mb-6">
                <label className="block text-sm font-medium mb-2">Key Name</label>
                <input
                  type="text"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder="e.g., Production API, Mobile App, etc."
                  className="w-full bg-[#0a0e1a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#ffbc36] transition-colors"
                  autoFocus
                  disabled={isCreating}
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  disabled={isCreating}
                  className="w-full sm:flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateKey}
                  disabled={!newKeyName.trim() || isCreating}
                  className="w-full sm:flex-1 px-4 py-3 bg-gradient-to-r from-[#ffbc36] to-[#ff9d36] hover:from-[#ff9d36] hover:to-[#ffbc36] text-black font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isCreating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      Create Key
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}