import {createSlice, configureStore} from '@reduxjs/toolkit';
import {dataSlice,modeSlice,popSlice} from './slice'
const store=configureStore({
  reducer:{
    data:dataSlice.reducer,
    mode:modeSlice.reducer,
    popup:popSlice.reducer
  }
})
export default store