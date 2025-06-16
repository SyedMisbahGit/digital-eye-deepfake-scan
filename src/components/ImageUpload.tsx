
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Image, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ImageUploadProps {
  onAnalyze: (type: 'image', data: { fileName: string; file: File }) => void;
  disabled?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onAnalyze, disabled }) => {
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
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.webp']
    },
    multiple: false,
    disabled
  });

  const handleAnalyze = () => {
    if (selectedFile) {
      onAnalyze('image', { fileName: selectedFile.name, file: selectedFile });
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setPreview(null);
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
                ? 'border-blue-400 bg-blue-400/10' 
                : 'border-slate-500 hover:border-slate-400'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <input {...getInputProps()} />
            <Image className="h-12 w-12 mx-auto mb-4 text-slate-400" />
            {isDragActive ? (
              <p className="text-blue-400 font-medium">Drop the image here...</p>
            ) : (
              <>
                <p className="text-white font-medium mb-2">
                  Drag & drop an image here, or click to select
                </p>
                <p className="text-slate-400 text-sm">
                  Supports: JPEG, PNG, GIF, BMP, WebP
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
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg border border-slate-600"
              />
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
                <p className="text-slate-400 text-sm mb-4">
                  Size: {selectedFile ? (selectedFile.size / 1024 / 1024).toFixed(2) : 0} MB
                </p>
                <Button
                  onClick={handleAnalyze}
                  disabled={disabled}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
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

export default ImageUpload;
