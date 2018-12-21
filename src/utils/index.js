import { format } from 'date-fns';

/**
 * Generate random string to be used as
 * reminder ids
 *
 * @returns {string}
 */
export const uuid = () =>
    `_${Math.random()
        .toString(36)
        .substr(2, 9)}`;

/**
 * Uppercase a strings first character
 *
 * @param {string} str to have its first character uppercased
 *
 * @returns {string}
 */
export const uppercaseFirstLetter = str =>
    str.charAt(0).toUpperCase() + str.slice(1);

/**
 * Returns the formatted date key used for comparisions
 *
 * @param {string / Date instance} date to be formatted
 *
 * @returns {string}
 */
export const formatDateKey = date =>
    String(format(new Date(date), 'DD_MM_GGGG'));

/**
 * Sorts the array by newest to oldest date
 *
 * @param {array} array of objects with a date key
 *
 * @returns {array}
 */
export const sortByDate = array =>
    array.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

/**
 *
 * Finds parent element of selector
 *
 * @param {Input Event} inputEvent event from i.e.
 * select field or input field
 * @param {string} parent element selector
 *
 * @returns {Node / undefined} the parent element or undefined
 */
export const getEventParent = (inputEvent, parent) => {
    const parentElement = inputEvent.currentTarget.closest(parent);

    return parentElement;
};

/**
 * Filters an array of reminders by the given dateKey
 *
 * @param {array} reminders
 * @param {string} dateKey to compare the reminder date with
 *
 * @returns {array}
 */
export const filterRemindersByDate = (reminders, dateKey) => {
    const remindersByDate = reminders.filter(
        r => formatDateKey(r.date) === dateKey,
    );

    return remindersByDate;
};
