
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  TrendingUp, 
  Calendar, 
  Award, 
  Leaf, 
  Camera, 
  BarChart3, 
  Clock,
  CheckCircle,
  AlertTriangle,
  Heart,
  Sparkles,
  Target
} from 'lucide-react';
import Link from 'next/link';

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

  // Calculate statistics
  const stats = useMemo(() => {
    const totalDiagnoses = diagnoses.length;
    const healthyPlants = diagnoses.filter(d => d.disease === 'Healthy').length;
    const problemsFound = totalDiagnoses - healthyPlants;
    const avgConfidence = diagnoses.length > 0 
      ? (diagnoses.reduce((sum, d) => sum + d.confidence, 0) / diagnoses.length * 100).toFixed(1)
      : 0;
    const recentDiagnoses = diagnoses.filter(d => 
      Date.now() - d.timestamp < 7 * 24 * 60 * 60 * 1000
    ).length;
    
    return {
      totalDiagnoses,
      healthyPlants,
      problemsFound,
      avgConfidence,
      recentDiagnoses
    };
  }, [diagnoses]);

  const renderDashboardStats = () => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Plants</p>
              <p className="text-2xl font-bold text-green-600">{stats.totalDiagnoses}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Healthy Plants</p>
              <p className="text-2xl font-bold text-blue-600">{stats.healthyPlants}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Issues Found</p>
              <p className="text-2xl font-bold text-orange-600">{stats.problemsFound}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Accuracy</p>
              <p className="text-2xl font-bold text-purple-600">{stats.avgConfidence}%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderWelcomeScreen = () => (
    <div className="w-full max-w-4xl mx-auto">
      {/* Welcome Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-4">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Welcome to PlantMD</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Your Plant Care Dashboard
        </h1>
        <p className="text-gray-600 text-lg">
          Upload a photo of your plant to get instant AI-powered diagnosis and care recommendations
        </p>
      </div>

      {/* Statistics */}
      {diagnoses.length > 0 && renderDashboardStats()}

      {/* Main Upload Area */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ImageUploader onImageUpload={handleImageUpload} />
        </div>

        {/* Quick Actions & Tips */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/plant-library">
                  <Leaf className="w-4 h-4 mr-2" />
                  Browse Plant Library
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/care-guide">
                  <Award className="w-4 h-4 mr-2" />
                  Plant Care Guide
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/profile">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  My Plant Collection
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-700">💡 Pro Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-green-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500" />
                  Take photos in bright, natural light for best results
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500" />
                  Focus on affected areas of leaves or stems
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-green-500" />
                  Keep a record of your plant's progress over time
                </li>
              </ul>
            </CardContent>
          </Card>

          {diagnoses.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">
                  This week: {stats.recentDiagnoses} diagnoses
                </p>
                <div className="space-y-2">
                  {diagnoses.slice(0, 3).map((diagnosis) => (
                    <div key={diagnosis.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <img 
                        src={diagnosis.image} 
                        alt="Plant" 
                        className="w-8 h-8 rounded object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{diagnosis.disease}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(diagnosis.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={diagnosis.disease === 'Healthy' ? 'default' : 'secondary'}>
                        {Math.round(diagnosis.confidence * 100)}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Educational Section */}
      {diagnoses.length === 0 && (
        <Card className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">New to Plant Care?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Start your plant parenting journey with our comprehensive guides and AI-powered assistance. 
              Learn how to identify common issues and keep your plants thriving.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild variant="secondary" size="lg">
                <Link href="/care-guide">
                  Plant Care Basics
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Link href="/plant-library">
                  Explore Plants
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  return (
    <SidebarProvider>
      <div className="flex min-h-[calc(100vh-4rem)] w-full flex-col bg-gradient-to-br from-green-50/50 to-emerald-50/50">
        <div className="flex flex-1">
          <DiagnosisHistory
            diagnoses={diagnoses}
            currentDiagnosisId={currentDiagnosisId}
            onSelectDiagnosis={handleSelectDiagnosis}
            onNewDiagnosis={handleNewDiagnosis}
            isLoading={isHistoryLoading}
          />
          <SidebarInset className="flex-1">
            <div className="flex h-full flex-col p-4 md:p-8">
              {isLoading ? (
                <div className="w-full max-w-4xl mx-auto space-y-8">
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4">
                      <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse" />
                      <span className="text-sm font-medium">Analyzing your plant...</span>
                    </div>
                  </div>
                  <Skeleton className="aspect-video w-full rounded-xl" />
                  <div className="space-y-4">
                    <Skeleton className="h-10 w-1/2 mx-auto" />
                    <Skeleton className="h-6 w-1/4 mx-auto" />
                    <Skeleton className="h-32 w-full" />
                  </div>
                </div>
              ) : currentDiagnosis ? (
                <div className="w-full max-w-4xl mx-auto">
                  <DiagnosisResult diagnosis={currentDiagnosis} />
                </div>
              ) : (
                renderWelcomeScreen()
              )}
            </div>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
