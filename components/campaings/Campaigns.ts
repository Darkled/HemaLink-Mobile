export type CampaignStatus = 'Open' | 'Completed' | 'Urgent' | 'Deleted';

export type BloodType =
  | 'A_Pos'
  | 'A_Neg'
  | 'B_Pos'
  | 'B_Neg'
  | 'AB_Pos'
  | 'AB_Neg'
  | 'O_Pos'
  | 'O_Neg';

export const bloodTypeLabels: Record<BloodType, string> = {
  A_Pos: 'A+',
  A_Neg: 'A−',
  B_Pos: 'B+',
  B_Neg: 'B−',
  AB_Pos: 'AB+',
  AB_Neg: 'AB−',
  O_Pos: 'O+',
  O_Neg: 'O−',
};

export type Campaign = {
  requestId: number;
  requesterName: string;
  bloodTypesNeeded: BloodType[] | null;
  requestDate: string;
  targetUnits: number;
  address: string;
  remainingUnits: number;
  requestStatus: CampaignStatus;
};
