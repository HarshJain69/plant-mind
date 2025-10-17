
'use client';

import { useState, useRef } from 'react';
import { UploadCloud } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

export function ImageUploader({ onImageUpload }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (files: FileList | null) => {
    if (files && files.length > 0) {
      if (files[0].type.startsWith('image/')) {
        onImageUpload(files[0]);
      } else {
        toast({
          variant: 'destructive',
          title: 'Invalid File Type',
          description: 'Please upload an image file.',
        });
      }
    }
  };

  const handleDragEvent = (e: React.DragEvent<HTMLDivElement>, isEntering: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(isEntering);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    handleDragEvent(e, false);
    const files = e.dataTransfer.files;
    handleFileSelect(files);
  };

  return (
    <div className="w-full max-w-2xl text-center animate-in fade-in-50">
        <h2 className="text-4xl font-bold tracking-tight text-foreground">
          Your Personal Plant Doctor
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Upload an image of your plant to get an instant AI-powered health diagnosis.
        </p>
      <div
        className={cn(
          'relative mt-8 flex w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 p-8 transition-all duration-300 hover:border-primary/50 hover:bg-primary/10',
          { 'border-primary/70 bg-primary/20': isDragging }
        )}
        onDragEnter={e => handleDragEvent(e, true)}
        onDragLeave={e => handleDragEvent(e, false)}
        onDragOver={e => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <UploadCloud className="h-16 w-16 text-primary/70" strokeWidth={1.5} />
        <p className="mt-4 font-semibold text-foreground">
          Drag & drop an image, or click to select
        </p>
        <p className="text-sm text-muted-foreground">Supports: JPG, PNG, WEBP</p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => handleFileSelect(e.target.files)}
        />
      </div>
    </div>
  );
}
