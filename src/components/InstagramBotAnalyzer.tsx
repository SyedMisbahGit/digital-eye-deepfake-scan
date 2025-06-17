
import React, { useState } from 'react';
import { Instagram, Search, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface InstagramBotAnalyzerProps {
  onAnalyze: (type: 'instagram', data: { username: string }) => void;
  disabled: boolean;
}

const InstagramBotAnalyzer: React.FC<InstagramBotAnalyzerProps> = ({ onAnalyze, disabled }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Please enter an Instagram username');
      return;
    }

    const cleanUsername = username.trim().replace(/^@/, '');
    
    if (cleanUsername.length < 1) {
      setError('Username cannot be empty');
      return;
    }

    if (!/^[a-zA-Z0-9._]+$/.test(cleanUsername)) {
      setError('Username can only contain letters, numbers, dots, and underscores');
      return;
    }

    setError('');
    onAnalyze('instagram', { username: cleanUsername });
    setUsername('');
  };

  const exampleUsernames = [
    'fashion_bot_ig',
    'auto_likes_service',
    'real.person.2024',
    'fitness_motivation',
    'shop_bot_24',
    'authentic_user'
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-slate-700/20 border-slate-600">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-3 mb-4">
            <Instagram className="h-6 w-6 text-pink-400" />
            <div>
              <h3 className="text-white font-semibold">Instagram Bot Detection</h3>
              <p className="text-slate-300 text-sm">
                AI-powered analysis for detecting automated Instagram accounts
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="instagram-username" className="block text-sm font-medium text-slate-300 mb-2">
                Instagram Username
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">@</span>
                <Input
                  id="instagram-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="username or @username"
                  className="pl-8 bg-slate-800/50 border-slate-600 text-white placeholder-slate-400"
                  disabled={disabled}
                />
              </div>
              {error && (
                <p className="text-red-400 text-sm mt-1 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  {error}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={disabled || !username.trim()}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white"
            >
              {disabled ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Analyze Instagram Account
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Features */}
      <Card className="bg-green-900/20 border-green-700">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-green-300 font-semibold mb-2">Instagram Bot Detection Features</h3>
              <ul className="text-green-200 text-sm space-y-1 mb-3">
                <li>• Profile picture analysis using computer vision</li>
                <li>• Bio text analysis with NLP models</li>
                <li>• Username pattern recognition</li>
                <li>• Follower-to-following ratio analysis</li>
                <li>• Engagement pattern detection</li>
                <li>• Profile creation behavior analysis</li>
              </ul>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-green-400 border-green-400 text-xs">
                  Computer Vision
                </Badge>
                <Badge variant="outline" className="text-green-400 border-green-400 text-xs">
                  NLP Analysis
                </Badge>
                <Badge variant="outline" className="text-green-400 border-green-400 text-xs">
                  Behavioral AI
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Example Usernames */}
      <Card className="bg-slate-800/20 border-slate-700">
        <CardContent className="pt-6">
          <h4 className="text-white font-medium mb-3">Try These Examples:</h4>
          <div className="grid grid-cols-2 gap-2">
            {exampleUsernames.map((example, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setUsername(example)}
                disabled={disabled}
                className="text-slate-300 border-slate-600 hover:bg-slate-700 text-xs"
              >
                @{example}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstagramBotAnalyzer;
