import React, { useState } from 'react';
import { Upload, Link, Shield, AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import ImageUpload from '@/components/ImageUpload';
import VideoUpload from '@/components/VideoUpload';
import SocialLinkAnalyzer from '@/components/SocialLinkAnalyzer';
import AnalysisResults from '@/components/AnalysisResults';
import TelegramBotAnalyzer from '@/components/TelegramBotAnalyzer';
import TwitterBotAnalyzer from '@/components/TwitterBotAnalyzer';
import InstagramBotAnalyzer from '@/components/InstagramBotAnalyzer';
import SocialMediaMonitor from '@/components/SocialMediaMonitor';
import { analyzeImage, analyzeVideo, analyzeTelegramBot, analyzeTwitterBot, analyzeInstagramBot, analyzeSocialMediaMonitoring } from '@/utils/deepfakeDetection';

export interface AnalysisResult {
  id: string;
  type: 'image' | 'video' | 'social' | 'telegram' | 'twitter' | 'instagram' | 'monitor';
  fileName?: string;
  url?: string;
  username?: string;
  query?: string;
  platforms?: string[];
  confidence: number;
  isDeepfake?: boolean;
  isBot?: boolean;
  sentiment?: 'positive' | 'negative' | 'neutral';
  riskLevel?: 'low' | 'medium' | 'high';
  analysisTime: number;
  details: {
    faceDetection?: number;
    temporalConsistency?: number;
    artifactDetection?: number;
    metadataAnalysis?: number;
    aiModelConfidence?: number;
    patternAnalysis?: number;
    linguisticAnalysis?: number;
    structureAnalysis?: number;
    behavioralAnalysis?: number;
    profileAnalysis?: number;
    visualAnalysis?: number;
    engagementAnalysis?: number;
    mentionCount?: number;
    sentimentScore?: number;
    botAccountsDetected?: number;
    suspiciousActivity?: number;
  };
  reasons?: string[];
  threats?: string[];
  findings?: {
    platform: string;
    mentions: number;
    bots: number;
    sentiment: string;
  }[];
  timestamp: Date;
}

const Index = () => {
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStatus, setAnalysisStatus] = useState('');

  const addResult = (result: AnalysisResult) => {
    setResults(prev => [result, ...prev]);
  };

  const handleAnalysis = async (type: 'image' | 'video' | 'social' | 'telegram' | 'twitter' | 'instagram' | 'monitor', data: any) => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setAnalysisStatus('Initializing AI models...');

    const startTime = Date.now();

    try {
      const progressInterval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 10;
        });
      }, 500);

      let analysisResult;

      if (type === 'image') {
        setAnalysisStatus('Loading computer vision model...');
        analysisResult = await analyzeImage(data.file);
      } else if (type === 'video') {
        setAnalysisStatus('Extracting video frames...');
        analysisResult = await analyzeVideo(data.file);
      } else if (type === 'social') {
        setAnalysisStatus('Analyzing social media content...');
        analysisResult = await analyzeSocialMediaMonitoring(data.url, data.platforms || ['twitter', 'instagram']);
      } else if (type === 'telegram') {
        setAnalysisStatus('Running bot detection algorithms...');
        analysisResult = await analyzeTelegramBot(data.username);
      } else if (type === 'twitter') {
        setAnalysisStatus('Analyzing Twitter account with AI...');
        analysisResult = await analyzeTwitterBot(data.username);
      } else if (type === 'instagram') {
        setAnalysisStatus('Analyzing Instagram account with AI...');
        analysisResult = await analyzeInstagramBot(data.username);
      } else if (type === 'monitor') {
        setAnalysisStatus('Monitoring social media platforms...');
        analysisResult = await analyzeSocialMediaMonitoring(data.query, data.platforms);
      }

      clearInterval(progressInterval);
      setAnalysisProgress(100);
      setAnalysisStatus('Analysis complete!');

      const analysisTime = (Date.now() - startTime) / 1000;

      const result: AnalysisResult = {
        id: Date.now().toString(),
        type,
        fileName: data.fileName,
        url: data.url,
        username: data.username,
        query: data.query,
        platforms: data.platforms,
        confidence: analysisResult.confidence,
        isDeepfake: analysisResult.isDeepfake,
        isBot: analysisResult.isBot,
        sentiment: analysisResult.sentiment,
        riskLevel: analysisResult.riskLevel,
        analysisTime,
        details: analysisResult.details,
        reasons: analysisResult.reasons,
        threats: analysisResult.threats,
        findings: analysisResult.findings,
        timestamp: new Date()
      };

      setTimeout(() => {
        addResult(result);
        setIsAnalyzing(false);
        setAnalysisProgress(0);
        setAnalysisStatus('');
      }, 1000);

    } catch (error) {
      console.error('Analysis failed:', error);
      setAnalysisStatus('Analysis failed. Please try again.');
      setTimeout(() => {
        setIsAnalyzing(false);
        setAnalysisProgress(0);
        setAnalysisStatus('');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-blue-400 mr-3" />
            <h1 className="text-4xl font-bold text-white">DeepGuard AI</h1>
            <Badge className="ml-3 bg-green-600 text-green-100">REAL AI</Badge>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-4">
            Advanced AI-powered social media intelligence, deepfake detection, and bot analysis. 
            Real machine learning models running entirely in your browser.
          </p>
          
          {/* AI Notice */}
          <Card className="max-w-3xl mx-auto mb-8 bg-green-900/20 border-green-700">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <h3 className="text-green-300 font-semibold mb-2">Real AI Intelligence Platform</h3>
                  <p className="text-green-200 text-sm mb-2">
                    Powered by Google's Vision Transformer, RoBERTa NLP models, and advanced pattern recognition - all running locally.
                  </p>
                  <p className="text-green-200 text-sm">
                    <strong>Features:</strong> Social media monitoring, deepfake detection, multi-platform bot analysis, sentiment tracking, and threat assessment.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Progress */}
        {isAnalyzing && (
          <Card className="mb-8 bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">{analysisStatus}</span>
                    <span className="text-blue-400 font-mono">{Math.round(analysisProgress)}%</span>
                  </div>
                  <Progress value={analysisProgress} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Tabs */}
        <Card className="mb-8 bg-slate-800/30 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Upload className="h-6 w-6 mr-2 text-blue-400" />
              AI Intelligence & Detection Suite
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="monitor" className="w-full">
              <TabsList className="grid w-full grid-cols-6 bg-slate-700/50">
                <TabsTrigger value="monitor" className="text-white data-[state=active]:bg-purple-600 text-xs">
                  Social Monitor
                </TabsTrigger>
                <TabsTrigger value="telegram" className="text-white data-[state=active]:bg-blue-600 text-xs">
                  Telegram Bot
                </TabsTrigger>
                <TabsTrigger value="twitter" className="text-white data-[state=active]:bg-blue-600 text-xs">
                  Twitter Bot
                </TabsTrigger>
                <TabsTrigger value="instagram" className="text-white data-[state=active]:bg-pink-600 text-xs">
                  Instagram Bot
                </TabsTrigger>
                <TabsTrigger value="image" className="text-white data-[state=active]:bg-green-600 text-xs">
                  Image Analysis
                </TabsTrigger>
                <TabsTrigger value="video" className="text-white data-[state=active]:bg-green-600 text-xs">
                  Video Analysis
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="monitor" className="mt-6">
                <SocialMediaMonitor onAnalyze={handleAnalysis} disabled={isAnalyzing} />
              </TabsContent>
              
              <TabsContent value="telegram" className="mt-6">
                <TelegramBotAnalyzer onAnalyze={handleAnalysis} disabled={isAnalyzing} />
              </TabsContent>

              <TabsContent value="twitter" className="mt-6">
                <TwitterBotAnalyzer onAnalyze={handleAnalysis} disabled={isAnalyzing} />
              </TabsContent>

              <TabsContent value="instagram" className="mt-6">
                <InstagramBotAnalyzer onAnalyze={handleAnalysis} disabled={isAnalyzing} />
              </TabsContent>
              
              <TabsContent value="image" className="mt-6">
                <ImageUpload onAnalyze={handleAnalysis} disabled={isAnalyzing} />
              </TabsContent>
              
              <TabsContent value="video" className="mt-6">
                <VideoUpload onAnalyze={handleAnalysis} disabled={isAnalyzing} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Results */}
        {results.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <AlertTriangle className="h-6 w-6 mr-2 text-yellow-400" />
              AI Intelligence Results
            </h2>
            <AnalysisResults results={results} />
          </div>
        )}

        {results.length === 0 && !isAnalyzing && (
          <Card className="bg-slate-800/20 border-slate-700 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-center text-gray-400">
                <Shield className="h-16 w-16 mx-auto mb-4 text-slate-600" />
                <p className="text-lg">No analysis results yet</p>
                <p className="text-sm">Start monitoring or analyzing content above to begin AI-powered intelligence gathering</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
