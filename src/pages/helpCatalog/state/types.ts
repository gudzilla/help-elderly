import { HelpRequestData } from '@/lib/api/types';

export type HelperRequirementsType = HelpRequestData['helperRequirements'];

export type HelpRequestFiltersType = {
  helpType: HelpRequestData['helpType'] | null;
  requesterType: HelpRequestData['requesterType'] | null;
  helperRequirements: {
    helperType: HelperRequirementsType['helperType'] | null;
    isOnline: HelperRequirementsType['isOnline'] | null;
    qualification: HelperRequirementsType['qualification'] | null;
  };
  helpDate: string | null;
  searchQuery: string;
};

export type HelperRequirementsFilterType = HelpRequestFiltersType['helperRequirements'];
