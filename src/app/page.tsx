import { PlantMDClient } from '@/components/plant-md-client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PlantMD | Diagnosis',
  description: 'Upload an image of your plant for an AI-powered diagnosis.',
};

export default function Home() {
  return <PlantMDClient />;
}
