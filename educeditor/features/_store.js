import { configureStore } from '@reduxjs/toolkit';

import units from './units/slice/units-slice';


export default configureStore({
  reducer: {
    units,
  },
});
