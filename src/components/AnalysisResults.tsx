
import React from 'react';
import { CheckCircle, XCircle, Clock, Eye, Zap, Database, AlertTriangle } from 'lucide-react';
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

  const getConfidenceBadgeColor = (confidence: number, isDeepfake: boolean) => {
    if (isDeepfake) {
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

  return (
    <div className="space-y-6">
      {results.map((result) => (
        <Card key={result.id} className="bg-slate-800/30 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center">
                {result.isDeepfake ? (
                  <XCircle className="h-5 w-5 mr-2 text-red-400" />
                ) : (
                  <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
                )}
                {result.fileName || `Social Media Analysis`}
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Badge className={getConfidenceBadgeColor(result.confidence, result.isDeepfake)}>
                  {result.isDeepfake ? 'Deepfake Detected' : 'Authentic'}
                </Badge>
                <span className="text-xs text-slate-400">
                  {formatTimestamp(result.timestamp)}
                </span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Main Result */}
            <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  Confidence Score
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
                  {result.isDeepfake ? 'Manipulation likelihood' : 'Authenticity score'}
                </div>
              </div>
            </div>

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

            {/* Detailed Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="text-white font-medium flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-yellow-400" />
                  Detection Metrics
                </h4>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-slate-300">Face Detection</span>
                      <span className="text-sm text-slate-400">
                        {result.details.faceDetection.toFixed(0)}%
                      </span>
                    </div>
                    <Progress value={result.details.faceDetection} className="h-2" />
                  </div>

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

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-slate-300">Artifact Detection</span>
                      <span className="text-sm text-slate-400">
                        {result.details.artifactDetection.toFixed(0)}%
                      </span>
                    </div>
                    <Progress value={result.details.artifactDetection} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-slate-300">Metadata Analysis</span>
                      <span className="text-sm text-slate-400">
                        {result.details.metadataAnalysis.toFixed(0)}%
                      </span>
                    </div>
                    <Progress value={result.details.metadataAnalysis} className="h-2" />
                  </div>
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
                    <span className="text-slate-300">AI Model Version:</span>
                    <span className="text-slate-400">v2.1.3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Resolution Quality:</span>
                    <span className="text-slate-400">High</span>
                  </div>
                </div>

                {/* Warning/Recommendation */}
                <div className="mt-4 p-3 bg-slate-700/40 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Zap className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-slate-300 font-medium mb-1">
                        {result.isDeepfake ? 'Recommendation' : 'Note'}
                      </p>
                      <p className="text-xs text-slate-400">
                        {result.isDeepfake 
                          ? 'Exercise caution. This content shows signs of digital manipulation.'
                          : 'Content appears authentic, but always verify from multiple sources.'
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
