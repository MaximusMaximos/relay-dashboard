'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Shield, 
  Bell, 
  Palette,
  Key,
  CreditCard,
  LogOut,
  Save,
  Upload,
  Check,
  Globe,
  Moon,
  Sun,
  Zap,
  Settings
} from 'lucide-react';
import Navbar from '@/app/components/Navbar';

export default function ProfilePage() {
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('account');
  
  // Mock user data - replace with actual user data
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '',
    tier: 'Pro',
    memberSince: 'January 2026'
  });

  const [settings, setSettings] = useState({
    emailNotifications: true,
    marketingEmails: false,
    theme: 'dark',
    language: 'en'
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save
    setTimeout(() => {
      setIsSaving(false);
    }, 1500);
  };

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c101c] to-[#111727] text-white">
      <Navbar balance="0" />
      
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Profile Settings</h1>
          <p className="text-gray-400">Manage your account and preferences</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Tabs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-gradient-to-br from-[#1a1f35] to-[#1e2439] border border-white/10 rounded-2xl p-4">
              {/* Profile Summary */}
              <div className="text-center mb-6 pb-6 border-b border-white/10">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#ffbc36] to-[#ff9d36] flex items-center justify-center shadow-lg shadow-[#ffbc36]/20">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-semibold mb-1">{profileData.name}</h3>
                <p className="text-sm text-gray-400 mb-2">{profileData.email}</p>
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-[#ffbc36]/10 border border-[#ffbc36]/20 rounded-full text-xs font-medium text-[#ffbc36]">
                  <Zap className="w-3 h-3" />
                  {profileData.tier} Tier
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        activeTab === tab.id
                          ? 'bg-[#ffbc36]/10 text-[#ffbc36]'
                          : 'text-gray-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Logout Button */}
              <button className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-all">
                <LogOut className="w-4 h-4" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            <div className="bg-gradient-to-br from-[#1a1f35] to-[#1e2439] border border-white/10 rounded-2xl p-8">
              {/* Account Tab */}
              {activeTab === 'account' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">Account Information</h2>
                    <p className="text-gray-400 text-sm">Update your personal details</p>
                  </div>

                  {/* Profile Picture */}
                  <div>
                    <label className="block text-sm font-medium mb-3">Profile Picture</label>
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#ffbc36] to-[#ff9d36] flex items-center justify-center shadow-lg shadow-[#ffbc36]/20">
                        <User className="w-10 h-10 text-white" />
                      </div>
                      <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        Upload New
                      </button>
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className="w-full bg-[#0a0e1a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#ffbc36] transition-colors"
                      placeholder="Enter your name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="w-full bg-[#0a0e1a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#ffbc36] transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Account Stats */}
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="bg-[#0a0e1a] rounded-xl p-4">
                      <div className="text-sm text-gray-400 mb-1">Member Since</div>
                      <div className="text-lg font-semibold">{profileData.memberSince}</div>
                    </div>
                    <div className="bg-[#0a0e1a] rounded-xl p-4">
                      <div className="text-sm text-gray-400 mb-1">Account Tier</div>
                      <div className="text-lg font-semibold text-[#ffbc36]">{profileData.tier}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">Security</h2>
                    <p className="text-gray-400 text-sm">Manage your password and API keys</p>
                  </div>

                  {/* Change Password */}
                  <div className="bg-[#0a0e1a] rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold mb-1">Password</h3>
                        <p className="text-sm text-gray-400">Last changed 30 days ago</p>
                      </div>
                      <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all">
                        Change
                      </button>
                    </div>
                  </div>

                  {/* API Keys */}
                  <div className="bg-[#0a0e1a] rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold mb-1">API Keys</h3>
                        <p className="text-sm text-gray-400">Manage your API access keys</p>
                      </div>
                      <button className="px-4 py-2 bg-[#ffbc36] hover:bg-[#ff9d36] text-black font-medium rounded-lg transition-all">
                        Generate New Key
                      </button>
                    </div>
                    <div className="text-sm text-gray-500 bg-white/5 rounded-lg p-3 border border-white/10">
                      No API keys generated yet
                    </div>
                  </div>

                  {/* Two-Factor Auth */}
                  <div className="bg-[#0a0e1a] rounded-xl p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold mb-1">Two-Factor Authentication</h3>
                        <p className="text-sm text-gray-400">Add an extra layer of security</p>
                      </div>
                      <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all">
                        Enable
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">Notifications</h2>
                    <p className="text-gray-400 text-sm">Manage how you receive updates</p>
                  </div>

                  {/* Email Notifications */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between bg-[#0a0e1a] rounded-xl p-4">
                      <div>
                        <h3 className="font-semibold mb-1">Email Notifications</h3>
                        <p className="text-sm text-gray-400">Receive updates about your account</p>
                      </div>
                      <button
                        onClick={() => setSettings({...settings, emailNotifications: !settings.emailNotifications})}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          settings.emailNotifications ? 'bg-[#4ade7d]' : 'bg-white/20'
                        }`}
                      >
                        <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          settings.emailNotifications ? 'translate-x-6' : ''
                        }`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between bg-[#0a0e1a] rounded-xl p-4">
                      <div>
                        <h3 className="font-semibold mb-1">Marketing Emails</h3>
                        <p className="text-sm text-gray-400">Receive news and special offers</p>
                      </div>
                      <button
                        onClick={() => setSettings({...settings, marketingEmails: !settings.marketingEmails})}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          settings.marketingEmails ? 'bg-[#4ade7d]' : 'bg-white/20'
                        }`}
                      >
                        <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          settings.marketingEmails ? 'translate-x-6' : ''
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">Preferences</h2>
                    <p className="text-gray-400 text-sm">Customize your experience</p>
                  </div>

                  {/* Theme */}
                  <div>
                    <label className="block text-sm font-medium mb-3">Theme</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['dark', 'light', 'auto'].map((theme) => (
                        <button
                          key={theme}
                          onClick={() => setSettings({...settings, theme})}
                          className={`px-4 py-3 rounded-xl border transition-all capitalize flex items-center justify-center gap-2 ${
                            settings.theme === theme
                              ? 'bg-[#ffbc36]/10 border-[#ffbc36] text-[#ffbc36]'
                              : 'bg-[#0a0e1a] border-white/10 text-gray-400 hover:border-white/20'
                          }`}
                        >
                          {theme === 'dark' && <Moon className="w-4 h-4" />}
                          {theme === 'light' && <Sun className="w-4 h-4" />}
                          {theme === 'auto' && <Palette className="w-4 h-4" />}
                          {theme}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Language */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Language</label>
                    <select
                      value={settings.language}
                      onChange={(e) => setSettings({...settings, language: e.target.value})}
                      className="w-full bg-[#0a0e1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ffbc36] transition-colors"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-white/10">
                <button className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all">
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-6 py-3 bg-gradient-to-r from-[#ffbc36] to-[#ff9d36] hover:from-[#ff9d36] hover:to-[#ffbc36] text-black font-medium rounded-xl transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}