import { useAppSelector } from '@/lib/redux/hooks';
import { createSelector } from '@reduxjs/toolkit';
import { HelpRequestData } from '@/lib/api/types';
import { isAfter, isValid, parseISO, startOfDay } from 'date-fns';
import { HelperRequirementsFilterType, HelpRequestFiltersType } from '../types';

const requestsDataSelector = (state: RootState) =>
  (state.helpEldersApi.queries['getRequests(undefined)']?.data as HelpRequestData[]) ??
  [];
const filtersSelector = (state: RootState) => state.filters;

// ----------------- Compare two dates with Date-Fns ----------------
function isValidISOString(isoString: string) {
  const date = parseISO(isoString);
  return isValid(date);
}

const isDate2LaterThanDate1 = (date1: string, date2: string): boolean => {
  if (isValidISOString(date1) && isValidISOString(date2)) {
    return isAfter(startOfDay(parseISO(date2)), startOfDay(parseISO(date1)));
  }
  return false;
};

// ----------------- FILTER FUNCTIONS ----------------
const filterByType =
  (helpType: HelpRequestFiltersType['helpType']) => (data: HelpRequestData) =>
    helpType === null ? true : data.helpType === helpType;

const filterByRequester =
  (requesterType: HelpRequestFiltersType['requesterType']) => (data: HelpRequestData) =>
    requesterType === null ? true : requesterType === data.requesterType;

const filterByQualification =
  (qualification: HelperRequirementsFilterType['qualification']) =>
  (data: HelpRequestData) =>
    qualification === null
      ? true
      : qualification === data.helperRequirements.qualification;

const filterByFormat =
  (isOnline: HelperRequirementsFilterType['isOnline']) => (data: HelpRequestData) =>
    isOnline === null ? true : isOnline === data.helperRequirements.isOnline;

const filterByPeopleNeeded =
  (helperType: HelperRequirementsFilterType['helperType']) => (data: HelpRequestData) =>
    helperType === null ? true : helperType === data.helperRequirements.helperType;

const filterByDate =
  (helpDate: HelpRequestFiltersType['helpDate']) => (data: HelpRequestData) => {
    if (helpDate === null) {
      return true;
    }
    return isDate2LaterThanDate1(helpDate, data.endingDate);
  };

const filteredBySearchQuery =
  (searchQuery: HelpRequestFiltersType['searchQuery']) => (data: HelpRequestData) => {
    if (searchQuery === '') {
      return true;
    }
    return (
      data.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data.organization.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

const applyFilters = (data: HelpRequestData[], filters: HelpRequestFiltersType) => {
  const filterFunctions = [
    filterByType(filters.helpType),
    filterByRequester(filters.requesterType),
    filterByQualification(filters.helperRequirements.qualification),
    filterByFormat(filters.helperRequirements.isOnline),
    filterByPeopleNeeded(filters.helperRequirements.helperType),
    filterByDate(filters.helpDate),
    filteredBySearchQuery(filters.searchQuery),
  ];

  return data.filter((requestData) =>
    filterFunctions.every((FilterFn) => {
      return FilterFn(requestData);
    })
  );
};

const filteredDataSelector = createSelector(
  [requestsDataSelector, filtersSelector],
  (data, filters) => {
    if (!data) {
      return null;
    }
    let filteredData = data;
    filteredData = applyFilters(data, filters);

    return filteredData;
  }
);
export const useFilteredDataSelector = () => useAppSelector(filteredDataSelector);

// ----------------- OTHER WAY TO ACCESS DATA IN getRequests
// state.helpEldersApi.queries['getRequests(undefined)']?.data;
// state.helpEldersApi.queries['getRequests(undefined)']?.data ?? [];
// state.helpEldersApi.queries['getRequests(undefined)']?.data || [];
