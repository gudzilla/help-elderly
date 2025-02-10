import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/react';

// --------------------------- ERROR TYPES

export type RTKQueryRequestError = FetchBaseQueryError | SerializedError | undefined;

//  -------------------------- HELP-ELDERS  API RESPONSE TYPES

export interface UserData {
  id: string;
  name: string;
  lastName: string;
  birthdate: string;
  status: 'Начинающий' | 'Опытный';
  baseLocations: {
    latitude: number;
    longitude: number;
    district: string;
    city: string;
  }[];
  educations: {
    organizationName: string;
    level: 'Среднее общее' | 'Среднее профессиональное' | 'Высшее';
    specialization: string;
    graduationYear: number;
  }[];
  additionalInfo: string;
  contacts: {
    email: string;
    phone: string;
    social: {
      telegram: string;
      whatsapp: string;
      vk: string;
    };
  };
  favouriteRequests: string[];
}

export type HelpRequestData = {
  id: string;
  title: string;
  organization: {
    title: string;
    isVerified: boolean;
  };
  description: string;
  goalDescription: string;
  actionsSchedule: {
    stepLabel: string;
    isDone: boolean;
  }[];
  endingDate: string;
  location: {
    latitude: number;
    longitude: number;
    district: string;
    city: string;
  };
  contacts: {
    email: string;
    phone: string;
    website: string;
  };
  requesterType: 'person' | 'organization';
  helpType: 'finance' | 'material';
  helperRequirements: {
    helperType: 'group' | 'single';
    isOnline: boolean;
    qualification: 'professional' | 'common';
  };
  contributorsCount: number;
  requestGoal: number;
  requestGoalCurrentValue: number;
};
