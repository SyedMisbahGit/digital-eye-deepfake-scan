
import React, { useState } from 'react';
import { Upload, Link, Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import ImageUpload from '@/components/ImageUpload';
import VideoUpload from '@/components/VideoUpload';
import SocialLinkAnalyzer from '@/components/SocialLinkAnalyzer';
import AnalysisResults from '@/components/AnalysisResults';

export interface AnalysisResult {
  id: string;
  type: 'image' | 'video' | 'social';
  fileName?: string;
  url?: string;
  confidence: number;
  isDeepfake: boolean;
  analysisTime: number;
  details: {
    faceDetection: number;
    temporalConsistency?: number;
    artifactDetection: number;
    metadataAnalysis: number;
  };
  timestamp: Date;
}

const Index = () => {
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const addResult = (result: AnalysisResult) => {
    setResults(prev => [result, ...prev]);
  };

  const handleAnalysis = async (type: 'image' | 'video' | 'social', data: any) => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate analysis progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Simulate analysis time
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));

    clearInterval(progressInterval);
    setAnalysisProgress(100);

    // Generate mock result
    const confidence = Math.random();
    const isDeepfake = confidence > 0.6;
    
    const result: AnalysisResult = {
      id: Date.now().toString(),
      type,
      fileName: data.fileName,
      url: data.url,
      confidence: confidence * 100,
      isDeepfake,
      analysisTime: 2.5 + Math.random() * 3,
      details: {
        faceDetection: 70 + Math.random() * 30,
        temporalConsistency: type === 'video' ? 60 + Math.random() * 40 : undefined,
        artifactDetection: 65 + Math.random() * 35,
        metadataAnalysis: 80 + Math.random() * 20
      },
      timestamp: new Date()
    };

    setTimeout(() => {
      addResult(result);
      setIsAnalyzing(false);
      setAnalysisProgress(0);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-blue-400 mr-3" />
            <h1 className="text-4xl font-bold text-white">DeepGuard AI</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Advanced deepfake detection powered by artificial intelligence. 
            Upload images, videos, or analyze social media content for authenticity verification.
          </p>
        </div>

        {/* Analysis Progress */}
        {isAnalyzing && (
          <Card className="mb-8 bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">Analyzing content...</span>
                    <span className="text-blue-400 font-mono">{Math.round(analysisProgress)}%</span>
                  </div>
                  <Progress value={analysisProgress} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Upload Tabs */}
        <Card className="mb-8 bg-slate-800/30 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Upload className="h-6 w-6 mr-2 text-blue-400" />
              Content Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="image" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-slate-700/50">
                <TabsTrigger value="image" className="text-white data-[state=active]:bg-blue-600">
                  Image Upload
                </TabsTrigger>
                <TabsTrigger value="video" className="text-white data-[state=active]:bg-blue-600">
                  Video Upload
                </TabsTrigger>
                <TabsTrigger value="social" className="text-white data-[state=active]:bg-blue-600">
                  Social Media
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="image" className="mt-6">
                <ImageUpload onAnalyze={handleAnalysis} disabled={isAnalyzing} />
              </TabsContent>
              
              <TabsContent value="video" className="mt-6">
                <VideoUpload onAnalyze={handleAnalysis} disabled={isAnalyzing} />
              </TabsContent>
              
              <TabsContent value="social" className="mt-6">
                <SocialLinkAnalyzer onAnalyze={handleAnalysis} disabled={isAnalyzing} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Results */}
        {results.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <AlertTriangle className="h-6 w-6 mr-2 text-yellow-400" />
              Analysis Results
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
                <p className="text-sm">Upload content above to begin deepfake detection</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
