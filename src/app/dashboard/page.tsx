import { PlantMDClient } from '@/components/plant-md-client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PlantMD | Diagnosis Dashboard',
  description: 'Upload an image of your plant for an AI-powered diagnosis.',
};

export default function DashboardPage() {
  return <PlantMDClient />;
}
