import { User } from '../../../models';
import { authService } from '../../../services';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const login = createAsyncThunk(
  'user/login',
  async (user: User, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error) {
      return thunkAPI.rejectWithValue('Unable to login');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  authService.logout();
});
