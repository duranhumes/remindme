import React from 'react';
import { format } from 'date-fns';
import pt from 'prop-types';

import Reminder, { reminderBasePropType } from './reminder';
import ColorPicker from '../colorpicker';
import TimePicker from '../timepicker';
import DayPicker from '../daypicker';
import { formatDateKey, getEventParent } from '../../utils';

const date = new Date();
const MAX_CHARACTERS = 30;
const DEFAULT_COLOR = '#3E60FC';
const TIME_FORMAT = 'h:mm A';
const DAY_FORMAT = 'MMM DD GGGG';
const DEFAULT_DAY = format(date, DAY_FORMAT);
const DEFAULT_TIME = '12:00 AM';
const REMINDER_PARENT_SELECTOR = 'li.reminders__body-listitem';

const initialState = {
    text: '',
    day: DEFAULT_DAY,
    time: DEFAULT_TIME,
    color: DEFAULT_COLOR,
    charactersLeft: MAX_CHARACTERS,
    selectedDateKey: '',
};

class Reminders extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...initialState,
            selectedDateKey: formatDateKey(props.selectedDate),
        };
    }

    static getDerivedStateFromProps(props, state) {
        const newState = {};

        const newDateKey = formatDateKey(props.selectedDate);
        if (newDateKey !== state.selectedDateKey) {
            Object.assign(newState, { selectedDateKey: newDateKey });
        }

        const newSelectedDay = format(props.selectedDate, DAY_FORMAT);
        if (newSelectedDay !== state.day) {
            Object.assign(newState, { day: newSelectedDay });
        }

        return newState;
    }

    handleReminderTextInput = ({ target: { value } }) => {
        this.setState({
            text: value,
            charactersLeft: MAX_CHARACTERS - value.length,
        });
    };

    handleNewReminderState = e => {
        e.preventDefault();

        const { name, value } = e.currentTarget;

        /**
         * Format day selection to datetime and invoke
         * select calendar date action
         */
        if (name === 'day') {
            const currentDate = new Date(`${value} ${this.state.time}`);

            this.props.selectCalendarDay(currentDate);
        }

        this.setState({ [name]: value });
    };

    handleUpdate = e => {
        e.preventDefault();

        const reminderElement = getEventParent(e, REMINDER_PARENT_SELECTOR);
        const reminderId = reminderElement.getAttribute('js-data-key');
        const reminderText = reminderElement.getAttribute('js-data-text');
        const reminderDate = reminderElement.getAttribute('js-data-date');
        const reminderColor = reminderElement.getAttribute('js-data-color');
        const reminder = {
            text: reminderText,
            date: reminderDate,
            color: reminderColor,
        };

        /**
         * Build datetime value from either day or time selector
         * and the current reminders datetime value
         */
        let { name, value } = e.currentTarget;
        if (name === 'day') {
            const reminderTime = format(new Date(reminderDate), TIME_FORMAT);
            value = new Date(`${value} ${reminderTime}`);
            name = 'date';
        }

        if (name === 'time') {
            const reminderDay = format(new Date(reminderDate), DAY_FORMAT);
            value = new Date(`${reminderDay} ${value}`);
            name = 'date';
        }

        Object.assign(reminder, { [name]: value });

        this.props.updateReminder(reminderId, reminder);
    };

    handleFormSubmit = e => {
        e.preventDefault();

        const { text, day, time, color } = this.state;
        const date = new Date(`${day} ${time}`);
        const newReminderData = {
            date,
            text,
            color,
        };

        delete initialState.selectedDateKey;
        this.setState(initialState);
        this.props.createReminder(newReminderData);
    };

    handleEditButtonClick = e => {
        const parentElement = getEventParent(e, REMINDER_PARENT_SELECTOR);

        parentElement.querySelector('input').focus();
    };

    handleDeleteButtonClick = e => {
        const parentElement = getEventParent(e, REMINDER_PARENT_SELECTOR);
        const reminderId = parentElement.getAttribute('js-data-key');

        this.props.deleteReminder(reminderId);
    };

    render() {
        const { selectedDate, currentMonth, reminders } = this.props;
        const formattedSelectedDate = format(selectedDate, 'dddd MMM Do, GGGG');
        return (
            <div className="reminders">
                <div className="reminders__header">
                    <div className="reminders__row">
                        <div className="reminders__row-middle">
                            <span className="reminders__header-text">
                                Reminders
                            </span>
                        </div>
                    </div>
                    <div className="reminders__row">
                        <div className="reminders__row-middle">
                            <span className="reminders__date">
                                {formattedSelectedDate}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="reminders__body">
                    <form
                        className="reminders__form"
                        onSubmit={this.handleFormSubmit}>
                        <div className="reminders__row">
                            <input
                                type="text"
                                className="input"
                                placeholder="Add a new reminder..."
                                maxLength={MAX_CHARACTERS}
                                size={MAX_CHARACTERS}
                                value={this.state.text}
                                name="text"
                                onChange={this.handleReminderTextInput}
                                required={true}
                            />
                            <button type="submit" className="button">
                                <span className="icon">forward</span>
                            </button>
                        </div>
                        <div className="reminders__row reminders__row-space-between">
                            <DayPicker
                                name="day"
                                currentmonth={currentMonth}
                                onChange={this.handleNewReminderState}
                                option={this.state.day}
                            />
                            <TimePicker
                                name="time"
                                onChange={this.handleNewReminderState}
                                option={this.state.time}
                            />
                            <ColorPicker
                                name="color"
                                onChange={this.handleNewReminderState}
                                option={this.state.color}
                            />
                        </div>
                    </form>
                    <div className="reminders__body-charactercount">
                        <p>
                            <strong>{this.state.charactersLeft}</strong>/
                            {MAX_CHARACTERS}
                        </p>
                    </div>
                    <ul className="reminders__body-list">
                        {reminders.length > 0 ? (
                            reminders.map(r => (
                                <Reminder
                                    key={r.id}
                                    currentmonth={currentMonth}
                                    maxcharacters={MAX_CHARACTERS}
                                    funcs={{
                                        handleUpdate: this.handleUpdate,
                                        handleEditButtonClick: this
                                            .handleEditButtonClick,
                                        handleDeleteButtonClick: this
                                            .handleDeleteButtonClick,
                                    }}
                                    {...r}
                                />
                            ))
                        ) : (
                            <li
                                className="reminders__body-listitem"
                                tabIndex="0">
                                <div className="reminders__body-listitem-content">
                                    <p className="reminders__body-list-nocontent">
                                        No reminders for {formattedSelectedDate}
                                    </p>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        );
    }
}

Reminders.propTypes = {
    selectedDate: pt.instanceOf(Date).isRequired,
    currentMonth: pt.instanceOf(Date).isRequired,
    reminders: pt.arrayOf(pt.shape(reminderBasePropType)),
    deleteReminder: pt.func.isRequired,
    createReminder: pt.func.isRequired,
    updateReminder: pt.func.isRequired,
    selectCalendarDay: pt.func.isRequired,
};

export default Reminders;
