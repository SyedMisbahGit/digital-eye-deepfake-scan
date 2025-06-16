
import React, { useState } from 'react';
import { Link, Search, ExternalLink, Twitter, Facebook, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SocialLinkAnalyzerProps {
  onAnalyze: (type: 'social', data: { url: string }) => void;
  disabled?: boolean;
}

const SocialLinkAnalyzer: React.FC<SocialLinkAnalyzerProps> = ({ onAnalyze, disabled }) => {
  const [url, setUrl] = useState('');
  const [detectedPlatform, setDetectedPlatform] = useState<string | null>(null);

  const detectPlatform = (inputUrl: string) => {
    const cleanUrl = inputUrl.toLowerCase();
    if (cleanUrl.includes('twitter.com') || cleanUrl.includes('x.com')) return 'twitter';
    if (cleanUrl.includes('facebook.com')) return 'facebook';
    if (cleanUrl.includes('instagram.com')) return 'instagram';
    if (cleanUrl.includes('tiktok.com')) return 'tiktok';
    if (cleanUrl.includes('youtube.com') || cleanUrl.includes('youtu.be')) return 'youtube';
    return null;
  };

  const handleUrlChange = (value: string) => {
    setUrl(value);
    setDetectedPlatform(detectPlatform(value));
  };

  const handleAnalyze = () => {
    if (url.trim()) {
      onAnalyze('social', { url: url.trim() });
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'twitter': return <Twitter className="h-4 w-4" />;
      case 'facebook': return <Facebook className="h-4 w-4" />;
      case 'instagram': return <Instagram className="h-4 w-4" />;
      default: return <ExternalLink className="h-4 w-4" />;
    }
  };

  const isValidUrl = (str: string) => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="space-y-4">
      <Card className="bg-slate-700/30 border-slate-600">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Link className="h-5 w-5 text-green-400" />
              <Label htmlFor="social-url" className="text-white font-medium">
                Social Media Post URL
              </Label>
            </div>
            
            <div className="space-y-2">
              <Input
                id="social-url"
                type="url"
                placeholder="https://twitter.com/user/status/123... or https://instagram.com/p/..."
                value={url}
                onChange={(e) => handleUrlChange(e.target.value)}
                disabled={disabled}
                className="bg-slate-800 border-slate-600 text-white placeholder-slate-400"
              />
              
              {detectedPlatform && (
                <div className="flex items-center space-x-2 text-sm text-green-400">
                  {getPlatformIcon(detectedPlatform)}
                  <span>Detected: {detectedPlatform.charAt(0).toUpperCase() + detectedPlatform.slice(1)}</span>
                </div>
              )}
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">Supported Platforms:</h4>
              <div className="grid grid-cols-2 gap-2 text-sm text-slate-300">
                <div className="flex items-center space-x-2">
                  <Twitter className="h-4 w-4 text-blue-400" />
                  <span>Twitter/X</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Facebook className="h-4 w-4 text-blue-600" />
                  <span>Facebook</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Instagram className="h-4 w-4 text-pink-400" />
                  <span>Instagram</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ExternalLink className="h-4 w-4 text-slate-400" />
                  <span>TikTok & Others</span>
                </div>
              </div>
            </div>

            <Button
              onClick={handleAnalyze}
              disabled={disabled || !url.trim() || !isValidUrl(url)}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              <Search className="h-4 w-4 mr-2" />
              Analyze Social Media Post
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/20 border-slate-700">
        <CardContent className="pt-4">
          <div className="text-sm text-slate-400">
            <p className="mb-2">
              <strong className="text-slate-300">How it works:</strong>
            </p>
            <ul className="space-y-1 text-xs">
              <li>• Extracts media content from the social media post</li>
              <li>• Analyzes images and videos for deepfake indicators</li>
              <li>• Checks metadata and posting patterns</li>
              <li>• Provides authenticity confidence score</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialLinkAnalyzer;
