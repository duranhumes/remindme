import { combineReducers } from 'redux';

import calendarReducer from './calendar';
import remindersReducer from './reminders';

export default combineReducers({
    calendar: calendarReducer,
    reminders: remindersReducer,
});
