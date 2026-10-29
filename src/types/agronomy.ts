export interface ActionProtocolStage {
  stage: string;
  timeframe: string;
  instructions: string[];
}

export interface CropTreatments {
  organic: string[];
  chemical: string[];
  safetyPrecautions: string[];
}

export interface YieldAdvisory {
  riskAssessment: string;
  projectedLossUntreated: string;
  recoveryTimeline: string;
  futurePreventionTips: string[];
}

export type HealthStatus =
  | 'healthy'
  | 'mild_stress'
  | 'diseased'
  | 'pest_infestation'
  | 'nutrient_deficiency';

export type SeverityLevel = 'low' | 'moderate' | 'severe' | 'critical';

export interface CropAnalysisResult {
  id: string;
  timestamp: string;
  cropName: string;
  varietyOrFamily?: string;
  healthStatus: HealthStatus;
  severityLevel: SeverityLevel;
  confidencePercentage: number;
  primaryDiagnosis: string;
  scientificPathogenName?: string;
  summaryText: string;
  symptoms: string[];
  actionProtocol: ActionProtocolStage[];
  treatments: CropTreatments;
  yieldAdvisory: YieldAdvisory;
  sampleImageUrl?: string;
  sampleThumbnailSvg?: string;
  note?: string;
}

export interface DemoPreset {
  id: string;
  title: string;
  cropType: string;
  climate: string;
  description: string;
  badgeLabel: string;
  svgColor: string;
  result: CropAnalysisResult;
}
