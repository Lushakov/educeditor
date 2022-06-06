import { configureStore } from '@reduxjs/toolkit';

import units from './units/_feature/units-slice';
import lesson from './lessons/_feature/lesson-slice';


export default configureStore({
  reducer: {
    units,
    lesson
  },
});
