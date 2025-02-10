import { HelpRequestData } from '@/lib/api/types';
import { DataForSingleCard } from './types';

function transformToSingleCardProps(helpRequest: HelpRequestData): DataForSingleCard {
  return {
    id: helpRequest.id,
    title: helpRequest.title,
    organization: helpRequest.organization?.title,
    goalDescription: helpRequest.goalDescription,
    endingDate: helpRequest.endingDate,
    locationDistrict: helpRequest.location?.district,
    locationCity: helpRequest.location?.city,
    isHelpOnline: helpRequest.helperRequirements?.isOnline,
    requesterType: helpRequest.requesterType,
    helpType: helpRequest.helpType,
    contributorsCount: helpRequest.contributorsCount,
    requestGoal: helpRequest.requestGoal,
    requestGoalCurrentValue: helpRequest.requestGoalCurrentValue,
  };
}

export function transformDataForCardsView(
  requestsArray: HelpRequestData[]
): DataForSingleCard[] {
  const preparedArray = [];
  for (let request of requestsArray) {
    preparedArray.push(transformToSingleCardProps(request));
  }

  return preparedArray;
}
