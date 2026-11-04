export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  badge: string;
  iconName: string;
  keyHighlights: string[];
  howItWorksSteps: { step: string; title: string; desc: string }[];
  moroccanTouch: string;
}

export interface ExamSample {
  level: 'primary' | 'middle' | 'bac';
  levelName: string;
  grade: string;
  examType: string;
  subject: string;
  coefficient: number;
  duration: string;
  sampleQuestion: string;
  options: { id: string; text: string; isCorrect: boolean; explanation: string }[];
  moroccanStandard: string;
}

export interface PricingTier {
  id: string;
  name: string;
  targetAudience: string;
  price: number;
  period: string;
  popular?: boolean;
  features: string[];
  benefitsForChild: string;
  benefitsForParent: string;
  ctaText: string;
}

export interface GamificationLevel {
  level: number;
  title: string;
  minXp: number;
  icon: string;
  badge: string;
  unlockedPerks: string[];
}
