import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

const initialState = Boolean(localStorage.getItem('jwtToken'));

export const logInFx = createAsyncThunk('auth/login', async (token: string) => {
  localStorage.setItem('jwtToken', token);
});

export const logOutFx = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('jwtToken');
});

export const authenticationReducer = createReducer(initialState, (builder) => {
  builder.addCase(logInFx.fulfilled, () => true);
  builder.addCase(logOutFx.fulfilled, () => false);
});
