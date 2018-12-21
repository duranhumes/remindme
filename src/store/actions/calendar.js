import { SELECT_DAY, SELECT_PREV_MONTH, SELECT_NEXT_MONTH } from './types';

const selectDay = date => ({ type: SELECT_DAY, payload: date });

const selectPrevMonth = month => ({
    type: SELECT_PREV_MONTH,
    payload: month,
});

const selectNextMonth = month => ({
    type: SELECT_NEXT_MONTH,
    payload: month,
});

export default { selectDay, selectPrevMonth, selectNextMonth };
