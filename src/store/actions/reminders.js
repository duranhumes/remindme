import { UPDATE_REMINDER, CREATE_REMINDER, DELETE_REMINDER } from './types';
import { uuid } from '../../utils';

const createReminder = reminder => {
    const newReminder = {
        ...reminder,
        id: uuid(),
    };

    return {
        type: CREATE_REMINDER,
        payload: newReminder,
    };
};

const updateReminder = (id, modifiedReminder) => ({
    type: UPDATE_REMINDER,
    payload: { id, modifiedReminder },
});

const deleteReminder = id => ({
    type: DELETE_REMINDER,
    payload: { id },
});

export default { createReminder, updateReminder, deleteReminder };
