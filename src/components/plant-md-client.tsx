
'use client';

import { useState, useEffect, useMemo } from 'react';
import type { Diagnosis } from '@/types';
import { generateRemedyTips } from '@/ai/flows/generate-remedy-tips';
import { PlaceHolderImages } from '@/lib/placeholder-images';

import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { DiagnosisHistory } from '@/components/diagnosis-history';
import { ImageUploader } from '@/components/image-uploader';
import { DiagnosisResult } from '@/components/diagnosis-result';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

const MOCKED_DISEASES = ['Powdery Mildew', 'Black Spot', 'Rust', 'Early Blight', 'Late Blight'];

export function PlantMDClient() {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [currentDiagnosisId, setCurrentDiagnosisId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const savedDiagnoses = localStorage.getItem('plant-md-diagnoses');
      if (savedDiagnoses && JSON.parse(savedDiagnoses).length > 0) {
        const parsedDiagnoses: Diagnosis[] = JSON.parse(savedDiagnoses);
        setDiagnoses(parsedDiagnoses);
        setCurrentDiagnosisId(parsedDiagnoses[0]?.id || null);
      } else {
        const sampleImage = PlaceHolderImages.find(img => img.id === 'sample-plant-1');
        const sampleDiagnosis: Diagnosis = {
          id: 'sample-1',
          image: sampleImage?.imageUrl || 'https://picsum.photos/seed/plant1/800/600',
          disease: 'Healthy',
          confidence: 0.98,
          remedyTips:
            'Your plant appears to be healthy! Keep up the great work.\n\n- **Sunlight**: Ensure it receives 4-6 hours of indirect sunlight daily.\n- **Watering**: Water when the top inch of soil is dry. Avoid overwatering.\n- **Nutrients**: Feed with a balanced liquid fertilizer every 4-6 weeks during the growing season.\n- **Monitoring**: Regularly check leaves for any signs of pests or discoloration.',
          timestamp: Date.now() - 24 * 60 * 60 * 1000,
        };
        setDiagnoses([sampleDiagnosis]);
        setCurrentDiagnosisId(sampleDiagnosis.id);
      }
    } catch (error) {
      console.error('Failed to load diagnoses from local storage', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not load past diagnoses.',
      });
    }
    setIsHistoryLoading(false);
  }, [toast]);

  useEffect(() => {
    if (!isHistoryLoading) {
      localStorage.setItem('plant-md-diagnoses', JSON.stringify(diagnoses));
    }
  }, [diagnoses, isHistoryLoading]);

  const handleImageUpload = async (file: File) => {
    setIsLoading(true);
    setCurrentDiagnosisId(null); 
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
        const imageUrl = reader.result as string;
        
        try {
          // Mock disease detection
          await new Promise(resolve => setTimeout(resolve, 1500));
          const disease = MOCKED_DISEASES[Math.floor(Math.random() * MOCKED_DISEASES.length)];
          const confidence = Math.random() * (0.98 - 0.75) + 0.75;
    
          const { remedyTips } = await generateRemedyTips({ disease });
    
          const newDiagnosis: Diagnosis = {
            id: `diag-${Date.now()}`,
            image: imageUrl,
            disease,
            confidence,
            remedyTips,
            timestamp: Date.now(),
          };
    
          setDiagnoses(prev => [newDiagnosis, ...prev]);
          setCurrentDiagnosisId(newDiagnosis.id);
        } catch (error) {
          console.error('Diagnosis failed:', error);
          toast({
            variant: 'destructive',
            title: 'Diagnosis Failed',
            description: 'Could not analyze the plant image. Please try again.',
          });
        } finally {
          setIsLoading(false);
        }
    };
  };

  const handleSelectDiagnosis = (id: string) => {
    setIsLoading(false);
    setCurrentDiagnosisId(id);
  };

  const handleNewDiagnosis = () => {
    setIsLoading(false);
    setCurrentDiagnosisId(null);
  };

  const currentDiagnosis = useMemo(
    () => diagnoses.find(d => d.id === currentDiagnosisId),
    [diagnoses, currentDiagnosisId]
  );

  return (
    <SidebarProvider>
      <div className="flex min-h-[calc(100vh-4rem)] w-full flex-col">
        <div className="flex flex-1">
          <DiagnosisHistory
            diagnoses={diagnoses}
            currentDiagnosisId={currentDiagnosisId}
            onSelectDiagnosis={handleSelectDiagnosis}
            onNewDiagnosis={handleNewDiagnosis}
            isLoading={isHistoryLoading}
          />
          <SidebarInset className="flex-1">
            <div className="flex h-full flex-col items-center justify-center p-4 md:p-8">
              {isLoading ? (
                <div className="w-full max-w-4xl space-y-8">
                  <Skeleton className="aspect-video w-full rounded-xl" />
                  <div className="space-y-4">
                    <Skeleton className="h-10 w-1/2" />
                    <Skeleton className="h-6 w-1/4" />
                    <Skeleton className="h-32 w-full" />
                  </div>
                </div>
              ) : currentDiagnosis ? (
                <DiagnosisResult diagnosis={currentDiagnosis} />
              ) : (
                <ImageUploader onImageUpload={handleImageUpload} />
              )}
            </div>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
