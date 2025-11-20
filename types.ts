export interface AnalysisRequest {
  cvFile: File;
  jobDescription: string;
  language: 'sv' | 'en';
  tone: 'formal' | 'casual' | 'creative';
}

export interface Improvement {
  type: 'missing_skill' | 'formatting' | 'phrasing';
  description: string;
  suggestion: string;
}

export interface ScoreBreakdown {
  technical: number;
  softSkills: number;
  experience: number;
}

export interface AnalysisResult {
  matchScore: number;
  scoreBreakdown: ScoreBreakdown;
  keywordsFound: string[];
  keywordsMissing: string[];
  improvements: Improvement[];
  coverLetter: string;
  summary: string;
}

export type AnalysisStatus = 'idle' | 'uploading' | 'analyzing' | 'complete' | 'error';