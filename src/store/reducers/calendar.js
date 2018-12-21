import {
    SELECT_DAY,
    SELECT_NEXT_MONTH,
    SELECT_PREV_MONTH,
} from '../actions/types';

const initialState = {
    selectedDate: new Date(),
    currentMonth: new Date(),
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case SELECT_DAY: {
            return { ...state, selectedDate: payload };
        }
        case SELECT_NEXT_MONTH: {
            return { ...state, currentMonth: payload };
        }
        case SELECT_PREV_MONTH: {
            return { ...state, currentMonth: payload };
        }
        default: {
            return state;
        }
    }
};
