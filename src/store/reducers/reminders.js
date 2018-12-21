import {
    CREATE_REMINDER,
    UPDATE_REMINDER,
    DELETE_REMINDER,
} from '../actions/types';
import { sortByDate } from '../../utils';

const initialState = {
    reminders: [],
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case CREATE_REMINDER: {
            const newState = { ...state };

            newState.reminders.push(payload);

            const reminders = sortByDate(newState.reminders);

            return { ...newState, reminders };
        }
        case UPDATE_REMINDER: {
            const newState = { ...state };

            const reminderIndex = newState.reminders.findIndex(
                x => x.id === payload.id,
            );
            const reminderToUpdate = newState.reminders[reminderIndex];
            if (typeof reminderToUpdate === 'undefined') {
                return state;
            }

            Object.assign(newState.reminders[reminderIndex], {
                ...reminderToUpdate,
                ...payload.modifiedReminder,
            });

            const reminders = sortByDate(newState.reminders);

            return { ...newState, reminders };
        }
        case DELETE_REMINDER: {
            const newState = { ...state };

            const reminders = sortByDate(
                newState.reminders.filter(s => s.id !== payload.id),
            );

            return { ...newState, reminders };
        }
        default: {
            return state;
        }
    }
};
