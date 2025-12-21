import { configureStore } from '@reduxjs/toolkit';

import authSliceReducer from '../Slice/auth/authSlice';
import countrySliceReducer from '../Slice/countrySlice';
import applicationSliceReducer from '../Slice/applicationSlice';
import visaSliceReducer from '../Slice/visaSlice';
import fetchChargesReducer from '../Slice/chargesSlice';
import transactionSliceReducer from '../Slice/transactionSlice';
import contactSliceReducer from '../Slice/contactSlice';
import checkUserAuthSliceReducer from '../Slice/auth/checkAuthSlice';
import userProfileSliceReducer from '../Slice/userSlice';
import activitySliceReducer from '../Slice/activitySlice';
import adminProfileSliceReducer from '../Slice/adminSlice';
import embassySliceReducer from '../Slice/embassySlice';
import holidaysSliceReducer from '../Slice/holidaySlice';
import appointmentReasonSliceReducer from '../Slice/appointmentReasonSlice';

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    checkAuth: checkUserAuthSliceReducer,
    allCountry: countrySliceReducer,
    userProfile: userProfileSliceReducer,
    admin: adminProfileSliceReducer,
    application: applicationSliceReducer,
    visa: visaSliceReducer,
    charge: fetchChargesReducer,
    transaction: transactionSliceReducer,
    contact: contactSliceReducer,
    activity: activitySliceReducer,
    embassy: embassySliceReducer,
    holiday: holidaysSliceReducer,
    appointmentReason: appointmentReasonSliceReducer,
  }
});

export default store;