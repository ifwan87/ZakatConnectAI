
export enum AsnafCategory {
  FAKIR = 'Fakir',
  MISKIN = 'Miskin',
  AMIL = 'Amil',
  MUALLAF = 'Muallaf',
  RIQAB = 'Riqab',
  GHARIMIN = 'Gharimin',
  FISABILILLAH = 'Fisabilillah',
  IBNU_SABIL = 'Ibnu Sabil'
}

export enum ApplicationStatus {
  PENDING_REVIEW = 'PENDING_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export interface AsnafApplication {
  id: string;
  fullName: string;
  householdSize: number;
  monthlyIncome: number;
  hardshipDescription: string;
  location: string;
  status: ApplicationStatus;
  aiRecommendation?: {
    predictedCategory: AsnafCategory;
    confidence: number;
    keyFactors: string[];
  };
  adminAssignedCategory?: AsnafCategory;
  submittedAt: string;
}

export interface Donation {
  id: string;
  donorName: string;
  amount: number;
  category: AsnafCategory;
  timestamp: string;
  targetAsnafId?: string;
}
