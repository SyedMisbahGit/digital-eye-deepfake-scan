
import React, { useState } from 'react';
import { Bot, Search, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TelegramBotAnalyzerProps {
  onAnalyze: (type: 'telegram', data: { username: string }) => void;
  disabled: boolean;
}

const TelegramBotAnalyzer: React.FC<TelegramBotAnalyzerProps> = ({ onAnalyze, disabled }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Please enter a Telegram username');
      return;
    }

    // Clean and validate username
    const cleanUsername = username.trim().replace(/^@/, '');
    
    if (cleanUsername.length < 2) {
      setError('Username must be at least 2 characters long');
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(cleanUsername)) {
      setError('Username can only contain letters, numbers, and underscores');
      return;
    }

    setError('');
    onAnalyze('telegram', { username: cleanUsername });
    setUsername('');
  };

  const exampleUsernames = [
    'support_bot',
    'crypto_trading_bot',
    'news_channel_bot',
    'john_doe',
    'user123456',
    'official_team'
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-slate-700/20 border-slate-600">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-3 mb-4">
            <Bot className="h-6 w-6 text-blue-400" />
            <div>
              <h3 className="text-white font-semibold">AI-Powered Telegram Bot Detection</h3>
              <p className="text-slate-300 text-sm">
                Analyze Telegram usernames using advanced pattern recognition and AI models
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="telegram-username" className="block text-sm font-medium text-slate-300 mb-2">
                Telegram Username
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">@</span>
                <Input
                  id="telegram-username"
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
                  Analyze Username
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Detection Info */}
      <Card className="bg-green-900/20 border-green-700">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-green-300 font-semibold mb-2">Real AI Bot Detection</h3>
              <p className="text-green-200 text-sm mb-3">
                This analyzer uses multiple AI techniques including:
              </p>
              <ul className="text-green-200 text-sm space-y-1 mb-3">
                <li>• Pattern recognition algorithms</li>
                <li>• NLP sentiment analysis models</li>
                <li>• Structural username analysis</li>
                <li>• Behavioral pattern detection</li>
              </ul>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-green-400 border-green-400 text-xs">
                  Pattern Analysis
                </Badge>
                <Badge variant="outline" className="text-green-400 border-green-400 text-xs">
                  AI NLP Models
                </Badge>
                <Badge variant="outline" className="text-green-400 border-green-400 text-xs">
                  No API Required
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

export default TelegramBotAnalyzer;
