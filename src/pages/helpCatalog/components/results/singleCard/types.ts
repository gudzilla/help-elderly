export type DataForSingleCard = {
  id: string;
  title: string;
  organization: string;
  goalDescription: string;
  endingDate: string;
  locationDistrict: string;
  locationCity: string;
  isHelpOnline: boolean;
  requesterType: 'person' | 'organization';
  helpType: 'finance' | 'material';
  contributorsCount: number;
  requestGoal: number;
  requestGoalCurrentValue: number;
};

export type CardRequesterType = DataForSingleCard['requesterType'];
export type CardHelpType = DataForSingleCard['helpType'];
