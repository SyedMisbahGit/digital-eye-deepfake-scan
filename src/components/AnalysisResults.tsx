import React from 'react';
import { CheckCircle, XCircle, Clock, Eye, Zap, Database, AlertTriangle, Info, Brain, Bot, User, TrendingUp, MessageCircle, Shield } from 'lucide-react';
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
    if (result.type === 'telegram' || result.type === 'twitter' || result.type === 'instagram') {
      return `@${result.username}`;
    }
    if (result.type === 'monitor') {
      return `"${result.query}" Monitor`;
    }
    return result.fileName || `Social Media Analysis`;
  };

  const getResultIcon = (result: AnalysisResult) => {
    if (result.type === 'monitor') {
      return <Eye className="h-5 w-5 mr-2 text-purple-400" />;
    }
    if (result.type === 'telegram' || result.type === 'twitter' || result.type === 'instagram') {
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
    if (result.type === 'monitor') {
      return `${result.sentiment?.toUpperCase()} Sentiment`;
    }
    if (result.type === 'telegram' || result.type === 'twitter' || result.type === 'instagram') {
      return result.isBot ? 'Bot Detected' : 'Human Account';
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
                {result.riskLevel && (
                  <Badge variant={result.riskLevel === 'high' ? 'destructive' : result.riskLevel === 'medium' ? 'default' : 'outline'}>
                    {result.riskLevel.toUpperCase()} RISK
                  </Badge>
                )}
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
                    {result.type === 'monitor' 
                      ? 'Comprehensive social media monitoring using RoBERTa NLP and advanced sentiment analysis.'
                      : result.type === 'telegram' || result.type === 'twitter' || result.type === 'instagram'
                      ? 'Multi-layered bot detection using RoBERTa NLP, pattern recognition, and behavioral analysis.'
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
                  {result.type === 'monitor' ? 'Monitoring Results' : 'AI Confidence Score'}
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
                  {result.type === 'monitor' 
                    ? `${result.sentiment} sentiment confidence`
                    : result.type === 'telegram' || result.type === 'twitter' || result.type === 'instagram'
                    ? (result.isBot ? 'Bot likelihood' : 'Human likelihood')
                    : (result.isDeepfake ? 'Manipulation likelihood' : 'Authenticity score')
                  }
                </div>
              </div>
            </div>

            {/* Monitoring Results */}
            {result.type === 'monitor' && result.findings && (
              <div className="space-y-4">
                <div className="p-3 bg-slate-700/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-purple-400" />
                    <span className="text-sm font-medium text-white">Platform Analysis</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {result.findings.map((finding, index) => (
                      <div key={index} className="p-2 bg-slate-800/30 rounded text-xs">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-slate-300 capitalize">{finding.platform}</span>
                          <span className={finding.sentiment === 'positive' ? 'text-green-400' : finding.sentiment === 'negative' ? 'text-red-400' : 'text-yellow-400'}>
                            {finding.sentiment}
                          </span>
                        </div>
                        <div className="text-slate-400">
                          {finding.mentions} mentions • {finding.bots} bots detected
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {result.details.mentionCount && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-3 bg-slate-700/20 rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">{result.details.mentionCount}</div>
                      <div className="text-xs text-slate-400">Total Mentions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-400">{result.details.botAccountsDetected}</div>
                      <div className="text-xs text-slate-400">Bot Accounts</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400">{result.details.suspiciousActivity?.toFixed(0)}%</div>
                      <div className="text-xs text-slate-400">Suspicious Activity</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">{result.details.sentimentScore?.toFixed(0)}%</div>
                      <div className="text-xs text-slate-400">Sentiment Score</div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Platforms Display for Monitoring */}
            {result.platforms && (
              <div className="p-3 bg-slate-700/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="h-4 w-4 text-blue-400" />
                  <span className="text-sm font-medium text-white">Monitored Platforms</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.platforms.map((platform, index) => (
                    <Badge key={index} variant="outline" className="text-slate-300 border-slate-600 text-xs">
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Threat Assessment */}
            {result.threats && result.threats.length > 0 && (
              <div className="p-3 bg-red-900/20 border border-red-700/50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  <span className="text-sm font-medium text-white">Threat Assessment</span>
                </div>
                <ul className="text-sm text-red-300 space-y-1">
                  {result.threats.map((threat, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-red-400 mt-1">⚠</span>
                      <span>{threat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Username Display */}
            {result.username && (
              <div className="p-3 bg-slate-700/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Bot className="h-4 w-4 text-blue-400" />
                  <span className="text-sm font-medium text-white">{result.type.charAt(0).toUpperCase() + result.type.slice(1)} Username</span>
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
                  {result.type === 'telegram' || result.type === 'twitter' || result.type === 'instagram' ? (
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

                      {result.type === 'telegram' && (
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-slate-300">Structure Analysis</span>
                            <span className="text-sm text-slate-400">
                              {result.details.structureAnalysis?.toFixed(0)}%
                            </span>
                          </div>
                          <Progress value={result.details.structureAnalysis} className="h-2" />
                        </div>
                      )}

                      {result.type === 'twitter' && (
                        <>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm text-slate-300">Behavioral Analysis</span>
                              <span className="text-sm text-slate-400">
                                {result.details.behavioralAnalysis?.toFixed(0)}%
                              </span>
                            </div>
                            <Progress value={result.details.behavioralAnalysis} className="h-2" />
                          </div>

                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm text-slate-300">Profile Analysis</span>
                              <span className="text-sm text-slate-400">
                                {result.details.profileAnalysis?.toFixed(0)}%
                              </span>
                            </div>
                            <Progress value={result.details.profileAnalysis} className="h-2" />
                          </div>
                        </>
                      )}

                      {result.type === 'instagram' && (
                        <>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm text-slate-300">Visual Analysis</span>
                              <span className="text-sm text-slate-400">
                                {result.details.visualAnalysis?.toFixed(0)}%
                              </span>
                            </div>
                            <Progress value={result.details.visualAnalysis} className="h-2" />
                          </div>

                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm text-slate-300">Engagement Analysis</span>
                              <span className="text-sm text-slate-400">
                                {result.details.engagementAnalysis?.toFixed(0)}%
                              </span>
                            </div>
                            <Progress value={result.details.engagementAnalysis} className="h-2" />
                          </div>
                        </>
                      )}
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
                      {result.type === 'monitor' ? 'RoBERTa + Sentiment Analysis' :
                       result.type === 'telegram' || result.type === 'twitter' || result.type === 'instagram' ? 'RoBERTa + Multi-layer Analysis' : 
                       'Vision Transformer (ViT)'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Compute:</span>
                    <span className="text-slate-400">Browser WebGPU/WASM</span>
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
                        {result.type === 'monitor' 
                          ? 'Real-time monitoring with AI sentiment analysis. Results based on advanced NLP models and pattern recognition.'
                          : result.type === 'telegram' || result.type === 'twitter' || result.type === 'instagram'
                          ? 'Multi-layered bot detection combining NLP models with behavioral and pattern analysis for enhanced accuracy.'
                          : 'Computer vision analysis adapted for synthetic media detection. Specialized models would provide higher accuracy.'
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
