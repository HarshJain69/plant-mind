
export interface Diagnosis {
  id: string;
  image: string; // URL.createObjectURL
  disease: string;
  confidence: number;
  remedyTips: string;
  timestamp: number;
}
