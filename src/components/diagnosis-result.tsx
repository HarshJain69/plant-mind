
'use client';

import Image from 'next/image';
import { Lightbulb, ShieldCheck, Thermometer } from 'lucide-react';
import type { Diagnosis } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface DiagnosisResultProps {
  diagnosis: Diagnosis;
}

export function DiagnosisResult({ diagnosis }: DiagnosisResultProps) {
  const formattedTips = diagnosis.remedyTips.split('\n').map((line, index) => {
    if (line.startsWith('- ') || line.startsWith('* ')) {
      return (
        <li key={index} className="ml-4 list-disc">
          {line.substring(2)}
        </li>
      );
    }
    if (line.trim() === '') {
        return <br key={index} />;
    }
    return <p key={index}>{line}</p>;
  });


  return (
    <div className="w-full max-w-4xl animate-in fade-in-50">
      <Card className="overflow-hidden shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative aspect-video w-full md:aspect-auto">
            <Image
              src={diagnosis.image}
              alt={`Diagnosed plant with ${diagnosis.disease}`}
              fill
              className="object-cover"
              data-ai-hint="plant disease"
            />
          </div>
          <div className="flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle className="text-3xl font-bold text-primary">{diagnosis.disease}</CardTitle>
              <CardDescription>
                Diagnosed on {new Date(diagnosis.timestamp).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 space-y-2">
                <div className="flex items-center gap-2 font-medium">
                  <Thermometer className="h-5 w-5 text-primary" />
                  <span>Diagnosis Confidence</span>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={diagnosis.confidence * 100} className="h-3 flex-1" />
                  <span className="text-sm font-semibold text-foreground">
                    {(diagnosis.confidence * 100).toFixed(0)}%
                  </span>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                 <div className="flex items-center gap-2 font-medium">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <span>Remedy & Prevention</span>
                </div>
                <div className="prose prose-sm max-w-none text-muted-foreground space-y-2">
                    {formattedTips}
                </div>
              </div>

            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
}
