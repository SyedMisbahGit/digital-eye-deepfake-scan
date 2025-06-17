
import React, { useState } from 'react';
import { Eye, Search, AlertTriangle, TrendingUp, Users, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface SocialMediaMonitorProps {
  onAnalyze: (type: 'monitor', data: { query: string; platforms: string[] }) => void;
  disabled: boolean;
}

const SocialMediaMonitor: React.FC<SocialMediaMonitorProps> = ({ onAnalyze, disabled }) => {
  const [query, setQuery] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['twitter', 'instagram']);
  
  const platforms = [
    { id: 'twitter', name: 'Twitter/X', icon: '𝕏' },
    { id: 'instagram', name: 'Instagram', icon: '📷' },
    { id: 'facebook', name: 'Facebook', icon: '📘' },
    { id: 'tiktok', name: 'TikTok', icon: '🎵' },
    { id: 'reddit', name: 'Reddit', icon: '🔴' },
    { id: 'youtube', name: 'YouTube', icon: '📺' }
  ];

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(p => p !== platformId)
        : [...prev, platformId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && selectedPlatforms.length > 0) {
      onAnalyze('monitor', { 
        query: query.trim(), 
        platforms: selectedPlatforms 
      });
      setQuery('');
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-700/20 border-slate-600">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Eye className="h-6 w-6 text-purple-400 mr-2" />
            Social Media Intelligence Monitor
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Company/Entity/Keyword to Monitor
              </label>
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter company name, political party, brand, or keyword..."
                className="bg-slate-800/50 border-slate-600 text-white placeholder-slate-400"
                disabled={disabled}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Select Platforms to Monitor
              </label>
              <div className="grid grid-cols-3 gap-2">
                {platforms.map((platform) => (
                  <Button
                    key={platform.id}
                    type="button"
                    variant={selectedPlatforms.includes(platform.id) ? "default" : "outline"}
                    size="sm"
                    onClick={() => togglePlatform(platform.id)}
                    disabled={disabled}
                    className={selectedPlatforms.includes(platform.id) 
                      ? "bg-purple-600 text-white" 
                      : "text-slate-300 border-slate-600 hover:bg-slate-700"
                    }
                  >
                    <span className="mr-1">{platform.icon}</span>
                    {platform.name}
                  </Button>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              disabled={disabled || !query.trim() || selectedPlatforms.length === 0}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              {disabled ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Monitoring...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Start AI-Powered Monitoring
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Monitoring Features */}
      <Card className="bg-green-900/20 border-green-700">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <h4 className="text-green-300 font-medium">Sentiment Analysis</h4>
              <p className="text-green-200 text-xs">AI-powered positive/negative detection</p>
            </div>
            <div className="text-center">
              <Users className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <h4 className="text-green-300 font-medium">Bot Detection</h4>
              <p className="text-green-200 text-xs">Identify fake accounts and bots</p>
            </div>
            <div className="text-center">
              <MessageCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <h4 className="text-green-300 font-medium">Source Tracking</h4>
              <p className="text-green-200 text-xs">Track origin and ownership patterns</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Warning */}
      <Card className="bg-orange-900/20 border-orange-700">
        <CardContent className="pt-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-orange-300 font-medium mb-1">Intelligence Notice</h4>
              <p className="text-orange-200 text-sm">
                This tool simulates social media intelligence gathering. Real-world deployment would require proper authorization and compliance with platform terms of service and local laws.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialMediaMonitor;
