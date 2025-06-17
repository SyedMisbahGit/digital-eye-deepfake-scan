
import React, { useState } from 'react';
import { Twitter, Search, AlertTriangle, CheckCircle, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TwitterBotAnalyzerProps {
  onAnalyze: (type: 'twitter', data: { username: string }) => void;
  disabled: boolean;
}

const TwitterBotAnalyzer: React.FC<TwitterBotAnalyzerProps> = ({ onAnalyze, disabled }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Please enter a Twitter/X username');
      return;
    }

    const cleanUsername = username.trim().replace(/^@/, '');
    
    if (cleanUsername.length < 1) {
      setError('Username cannot be empty');
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(cleanUsername)) {
      setError('Username can only contain letters, numbers, and underscores');
      return;
    }

    setError('');
    onAnalyze('twitter', { username: cleanUsername });
    setUsername('');
  };

  const exampleUsernames = [
    'elonmusk',
    'bot_trader_x',
    'news_bot_24',
    'crypto_signals',
    'real_person_123',
    'official_team_x'
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-slate-700/20 border-slate-600">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-3 mb-4">
            <Twitter className="h-6 w-6 text-blue-400" />
            <div>
              <h3 className="text-white font-semibold">Twitter/X Bot Detection</h3>
              <p className="text-slate-300 text-sm">
                Advanced AI analysis for detecting automated Twitter/X accounts
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="twitter-username" className="block text-sm font-medium text-slate-300 mb-2">
                Twitter/X Username
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">@</span>
                <Input
                  id="twitter-username"
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
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {disabled ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Analyze Twitter Account
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
              <h3 className="text-green-300 font-semibold mb-2">AI-Powered Twitter Bot Detection</h3>
              <ul className="text-green-200 text-sm space-y-1 mb-3">
                <li>• Username pattern analysis with ML models</li>
                <li>• Behavioral pattern recognition</li>
                <li>• Account creation time analysis</li>
                <li>• Posting frequency detection</li>
                <li>• Bio and profile analysis</li>
              </ul>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-green-400 border-green-400 text-xs">
                  Deep Learning
                </Badge>
                <Badge variant="outline" className="text-green-400 border-green-400 text-xs">
                  Pattern Recognition
                </Badge>
                <Badge variant="outline" className="text-green-400 border-green-400 text-xs">
                  Real-time Analysis
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

export default TwitterBotAnalyzer;
