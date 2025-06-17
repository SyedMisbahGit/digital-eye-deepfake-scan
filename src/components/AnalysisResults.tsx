import React from 'react';
import { CheckCircle, XCircle, Clock, Eye, Zap, Database, AlertTriangle, Info, Brain, Bot, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AnalysisResult } from '@/pages/Index';

interface AnalysisResultsProps {
  results: AnalysisResult[];
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ results }) => {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-red-400';
    if (confidence >= 60) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getConfidenceBadgeColor = (confidence: number, result: AnalysisResult) => {
    const isPositive = result.isDeepfake || result.isBot;
    if (isPositive) {
      if (confidence >= 80) return 'bg-red-600';
      if (confidence >= 60) return 'bg-orange-600';
      return 'bg-yellow-600';
    }
    return 'bg-green-600';
  };

  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getResultTitle = (result: AnalysisResult) => {
    if (result.type === 'telegram') {
      return `@${result.username}`;
    }
    return result.fileName || `Social Media Analysis`;
  };

  const getResultIcon = (result: AnalysisResult) => {
    if (result.type === 'telegram') {
      return result.isBot ? (
        <Bot className="h-5 w-5 mr-2 text-red-400" />
      ) : (
        <User className="h-5 w-5 mr-2 text-green-400" />
      );
    }
    return result.isDeepfake ? (
      <XCircle className="h-5 w-5 mr-2 text-red-400" />
    ) : (
      <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
    );
  };

  const getResultBadgeText = (result: AnalysisResult) => {
    if (result.type === 'telegram') {
      return result.isBot ? 'Likely Bot' : 'Likely Human';
    }
    return result.isDeepfake ? 'Potential Deepfake' : 'Likely Authentic';
  };

  return (
    <div className="space-y-6">
      {results.map((result) => (
        <Card key={result.id} className="bg-slate-800/30 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center">
                {getResultIcon(result)}
                {getResultTitle(result)}
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Badge className={getConfidenceBadgeColor(result.confidence, result)}>
                  {getResultBadgeText(result)}
                </Badge>
                <Badge variant="outline" className="text-green-400 border-green-400">
                  AI POWERED
                </Badge>
                <span className="text-xs text-slate-400">
                  {formatTimestamp(result.timestamp)}
                </span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* AI Analysis Notice */}
            <div className="p-3 bg-green-900/20 border border-green-700/50 rounded-lg">
              <div className="flex items-start space-x-2">
                <Brain className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-green-300 font-medium mb-1">Real AI Analysis</p>
                  <p className="text-xs text-green-200">
                    {result.type === 'telegram' 
                      ? 'Analyzed using RoBERTa NLP model with advanced pattern recognition algorithms.'
                      : 'Analyzed using Vision Transformer (ViT) and advanced computer vision techniques.'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Main Result */}
            <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  AI Confidence Score
                </h3>
                <p className="text-sm text-slate-400">
                  Analysis completed in {result.analysisTime.toFixed(1)}s
                </p>
              </div>
              <div className="text-right">
                <div className={`text-3xl font-bold ${getConfidenceColor(result.confidence)}`}>
                  {result.confidence.toFixed(1)}%
                </div>
                <div className="text-sm text-slate-400 mt-1">
                  {result.type === 'telegram' 
                    ? (result.isBot ? 'Bot likelihood' : 'Human likelihood')
                    : (result.isDeepfake ? 'Manipulation likelihood' : 'Authenticity score')
                  }
                </div>
              </div>
            </div>

            {/* Username Display for Telegram */}
            {result.username && (
              <div className="p-3 bg-slate-700/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Bot className="h-4 w-4 text-blue-400" />
                  <span className="text-sm font-medium text-white">Telegram Username</span>
                </div>
                <p className="text-sm text-slate-300">@{result.username}</p>
              </div>
            )}

            {/* URL Display for Social Media */}
            {result.url && (
              <div className="p-3 bg-slate-700/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Eye className="h-4 w-4 text-blue-400" />
                  <span className="text-sm font-medium text-white">Source URL</span>
                </div>
                <p className="text-xs text-slate-400 break-all">{result.url}</p>
              </div>
            )}

            {/* Bot Detection Reasons */}
            {result.reasons && result.reasons.length > 0 && (
              <div className="p-3 bg-slate-700/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm font-medium text-white">Detection Reasons</span>
                </div>
                <ul className="text-sm text-slate-300 space-y-1">
                  {result.reasons.map((reason, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Detailed Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="text-white font-medium flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-yellow-400" />
                  AI Detection Metrics
                </h4>
                
                <div className="space-y-3">
                  {result.type === 'telegram' ? (
                    <>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-slate-300">Pattern Analysis</span>
                          <span className="text-sm text-slate-400">
                            {result.details.patternAnalysis?.toFixed(0)}%
                          </span>
                        </div>
                        <Progress value={result.details.patternAnalysis} className="h-2" />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-slate-300">Linguistic Analysis</span>
                          <span className="text-sm text-slate-400">
                            {result.details.linguisticAnalysis?.toFixed(0)}%
                          </span>
                        </div>
                        <Progress value={result.details.linguisticAnalysis} className="h-2" />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-slate-300">Structure Analysis</span>
                          <span className="text-sm text-slate-400">
                            {result.details.structureAnalysis?.toFixed(0)}%
                          </span>
                        </div>
                        <Progress value={result.details.structureAnalysis} className="h-2" />
                      </div>
                    </>
                  ) : (
                    <>
                      {result.details.faceDetection && (
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-slate-300">Face Detection</span>
                            <span className="text-sm text-slate-400">
                              {result.details.faceDetection.toFixed(0)}%
                            </span>
                          </div>
                          <Progress value={result.details.faceDetection} className="h-2" />
                        </div>
                      )}

                      {result.details.temporalConsistency && (
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-slate-300">Temporal Consistency</span>
                            <span className="text-sm text-slate-400">
                              {result.details.temporalConsistency.toFixed(0)}%
                            </span>
                          </div>
                          <Progress value={result.details.temporalConsistency} className="h-2" />
                        </div>
                      )}

                      {result.details.artifactDetection && (
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-slate-300">Artifact Detection</span>
                            <span className="text-sm text-slate-400">
                              {result.details.artifactDetection.toFixed(0)}%
                            </span>
                          </div>
                          <Progress value={result.details.artifactDetection} className="h-2" />
                        </div>
                      )}

                      {result.details.metadataAnalysis && (
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-slate-300">Metadata Analysis</span>
                            <span className="text-sm text-slate-400">
                              {result.details.metadataAnalysis.toFixed(0)}%
                            </span>
                          </div>
                          <Progress value={result.details.metadataAnalysis} className="h-2" />
                        </div>
                      )}
                    </>
                  )}

                  {result.details.aiModelConfidence && (
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-slate-300">AI Model Confidence</span>
                        <span className="text-sm text-slate-400">
                          {result.details.aiModelConfidence.toFixed(0)}%
                        </span>
                      </div>
                      <Progress value={result.details.aiModelConfidence} className="h-2" />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-white font-medium flex items-center">
                  <Database className="h-4 w-4 mr-2 text-blue-400" />
                  Analysis Details
                </h4>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Content Type:</span>
                    <span className="text-slate-400 capitalize">{result.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Processing Time:</span>
                    <span className="text-slate-400">{result.analysisTime.toFixed(1)}s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">AI Model:</span>
                    <span className="text-slate-400">
                      {result.type === 'telegram' ? 'RoBERTa + Pattern Analysis' : 'Vision Transformer (ViT)'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Compute:</span>
                    <span className="text-slate-400">Browser WebGPU/CPU</span>
                  </div>
                </div>

                {/* AI Disclaimer */}
                <div className="mt-4 p-3 bg-slate-700/40 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Zap className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-slate-300 font-medium mb-1">
                        AI Analysis Note
                      </p>
                      <p className="text-xs text-slate-400">
                        {result.type === 'telegram' 
                          ? 'Bot detection combines NLP models with pattern recognition. Accuracy improves with specialized training data.'
                          : 'This analysis uses computer vision models adapted for deepfake detection. Specialized models would provide higher accuracy.'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AnalysisResults;
