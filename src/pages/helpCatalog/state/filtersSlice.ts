import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { HelperRequirementsFilterType, HelpRequestFiltersType } from './types';

const initialState: HelpRequestFiltersType = {
  helpType: null,
  requesterType: null,
  helperRequirements: {
    helperType: null,
    isOnline: null,
    qualification: null,
  },
  helpDate: null,
  searchQuery: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setHelpType(state, action: PayloadAction<HelpRequestFiltersType['helpType']>) {
      state.helpType = action.payload;
    },
    setRequesterType(
      state,
      action: PayloadAction<HelpRequestFiltersType['requesterType']>
    ) {
      state.requesterType = action.payload;
    },
    setVolunteerQualification(
      state,
      action: PayloadAction<HelperRequirementsFilterType['qualification']>
    ) {
      state.helperRequirements.qualification = action.payload;
    },
    setVolunteerFormat(
      state,
      action: PayloadAction<HelperRequirementsFilterType['isOnline']>
    ) {
      state.helperRequirements.isOnline = action.payload;
    },
    setVolunteersNeeded(
      state,
      action: PayloadAction<HelperRequirementsFilterType['helperType']>
    ) {
      state.helperRequirements.helperType = action.payload;
    },
    setFilterDate(state, action: PayloadAction<HelpRequestFiltersType['helpDate']>) {
      state.helpDate = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<HelpRequestFiltersType['searchQuery']>) {
      state.searchQuery = action.payload;
    },
    removeAllFilters() {
      return initialState;
    },
  },
});

export const {
  setHelpType,
  setRequesterType,
  setVolunteerQualification,
  setVolunteerFormat,
  setVolunteersNeeded,
  setFilterDate,
  setSearchQuery,
  removeAllFilters,
} = filtersSlice.actions;
export default filtersSlice.reducer;
