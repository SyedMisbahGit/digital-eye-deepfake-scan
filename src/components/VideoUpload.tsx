
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Video, Upload, X, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface VideoUploadProps {
  onAnalyze: (type: 'video', data: { fileName: string; file: File }) => void;
  disabled?: boolean;
}

const VideoUpload: React.FC<VideoUploadProps> = ({ onAnalyze, disabled }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi', '.mkv', '.webm', '.flv']
    },
    multiple: false,
    disabled
  });

  const handleAnalyze = () => {
    if (selectedFile) {
      onAnalyze('video', { fileName: selectedFile.name, file: selectedFile });
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setPreview(null);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      <Card className="bg-slate-700/30 border-slate-600 border-dashed">
        <CardContent className="pt-6">
          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
              ${isDragActive 
                ? 'border-purple-400 bg-purple-400/10' 
                : 'border-slate-500 hover:border-slate-400'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <input {...getInputProps()} />
            <Video className="h-12 w-12 mx-auto mb-4 text-slate-400" />
            {isDragActive ? (
              <p className="text-purple-400 font-medium">Drop the video here...</p>
            ) : (
              <>
                <p className="text-white font-medium mb-2">
                  Drag & drop a video here, or click to select
                </p>
                <p className="text-slate-400 text-sm">
                  Supports: MP4, MOV, AVI, MKV, WebM, FLV
                </p>
                <p className="text-slate-400 text-xs mt-1">
                  Note: Larger files may take longer to analyze
                </p>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {preview && (
        <Card className="bg-slate-700/30 border-slate-600">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-4">
              <div className="relative">
                <video
                  src={preview}
                  className="w-32 h-24 object-cover rounded-lg border border-slate-600"
                  controls={false}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                  <Play className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-medium">{selectedFile?.name}</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFile}
                    className="text-slate-400 hover:text-white"
                    disabled={disabled}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-1 mb-4">
                  <p className="text-slate-400 text-sm">
                    Size: {selectedFile ? (selectedFile.size / 1024 / 1024).toFixed(2) : 0} MB
                  </p>
                  <p className="text-slate-400 text-sm">
                    Type: {selectedFile?.type || 'Unknown'}
                  </p>
                </div>
                <Button
                  onClick={handleAnalyze}
                  disabled={disabled}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Analyze for Deepfakes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VideoUpload;
