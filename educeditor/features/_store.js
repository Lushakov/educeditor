import { configureStore } from '@reduxjs/toolkit';

import materials from './materials/materials-slice';


export default configureStore({
  reducer: {
    materials,
  },
});
