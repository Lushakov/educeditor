import { configureStore } from '@reduxjs/toolkit';

import units from './units/_feature/units-slice';


export default configureStore({
  reducer: {
    units,
  },
});
