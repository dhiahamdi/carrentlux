import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/Login.slice';
import accessReducer from '../features/middleware/Middleware.slice';
import carExplorerReducer from '../features/car/Car.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    accessCheck : accessReducer ,
    car : carExplorerReducer,
  },
});
