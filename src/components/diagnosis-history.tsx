
'use client';

import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { Leaf, PlusCircle, History } from 'lucide-react';
import type { Diagnosis } from '@/types';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSkeleton,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface DiagnosisHistoryProps {
  diagnoses: Diagnosis[];
  currentDiagnosisId: string | null;
  onSelectDiagnosis: (id: string) => void;
  onNewDiagnosis: () => void;
  isLoading: boolean;
}

export function DiagnosisHistory({
  diagnoses,
  currentDiagnosisId,
  onSelectDiagnosis,
  onNewDiagnosis,
  isLoading,
}: DiagnosisHistoryProps) {
  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 p-2">
            <Leaf className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">PlantMD</h1>
        </div>
        <div className="p-2">
            <Button variant="default" className="w-full" onClick={onNewDiagnosis}>
                <PlusCircle />
                New Diagnosis
            </Button>
        </div>
      </SidebarHeader>
      
      <div className="flex items-center gap-2 px-4 pt-4 text-sm font-medium text-muted-foreground">
        <History className="h-5 w-5" />
        <span>Recent Diagnoses</span>
      </div>

      <SidebarContent className="p-2">
        {isLoading ? (
          <div className="space-y-2 px-2">
            <SidebarMenuSkeleton showIcon />
            <SidebarMenuSkeleton showIcon />
            <SidebarMenuSkeleton showIcon />
          </div>
        ) : (
          <SidebarMenu>
            {diagnoses.length > 0 ? (
              diagnoses.map(diagnosis => (
                <SidebarMenuItem key={diagnosis.id}>
                  <SidebarMenuButton
                    onClick={() => onSelectDiagnosis(diagnosis.id)}
                    isActive={currentDiagnosisId === diagnosis.id}
                    className="h-auto p-2"
                  >
                    <div className="flex w-full items-center gap-3">
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={diagnosis.image}
                          alt={`Plant diagnosis from ${new Date(diagnosis.timestamp).toLocaleDateString()}`}
                          fill
                          className="object-cover"
                          data-ai-hint="plant"
                        />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col items-start text-left">
                        <p className="w-full truncate font-medium">{diagnosis.disease}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(diagnosis.timestamp), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))
            ) : (
              <div className="p-4 text-center text-sm text-muted-foreground">
                No diagnoses yet. Upload an image to start.
              </div>
            )}
          </SidebarMenu>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
