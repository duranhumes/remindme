import React from 'react';
import { format } from 'date-fns';
import pt from 'prop-types';

import ColorPicker from '../colorpicker';
import TimePicker from '../timepicker';
import DayPicker from '../daypicker';

const Reminder = props => {
    const { id, text, date, color, funcs, currentmonth, maxcharacters } = props;
    const selectedTime = format(date, 'h:mm A');

    return (
        <li
            className="reminders__body-listitem"
            tabIndex="0"
            js-data-key={id}
            js-data-text={text}
            js-data-color={color}
            js-data-date={date}>
            <div className="reminders__body-listitem-content">
                <div className="reminders__row">
                    <input
                        type="text"
                        name="text"
                        className="input input__editablecontent"
                        value={text}
                        maxLength={maxcharacters}
                        size={maxcharacters}
                        onChange={funcs.handleUpdate}
                    />
                </div>
            </div>
            <div className="reminders__body-listitem-actions">
                <div className="reminders__row">
                    <DayPicker
                        name="day"
                        option={date}
                        currentmonth={currentmonth}
                        onChange={funcs.handleUpdate}
                    />
                    <TimePicker
                        name="time"
                        option={selectedTime}
                        onChange={funcs.handleUpdate}
                    />
                    <ColorPicker
                        name="color"
                        option={color}
                        onChange={funcs.handleUpdate}
                    />
                    <button
                        className="icon"
                        onClick={funcs.handleEditButtonClick}
                        tabIndex="0">
                        create
                    </button>
                    <button
                        className="icon"
                        onClick={funcs.handleDeleteButtonClick}
                        tabIndex="0">
                        delete_forever
                    </button>
                </div>
            </div>
        </li>
    );
};

export const reminderBasePropType = {
    id: pt.string.isRequired,
    text: pt.string.isRequired,
    date: pt.oneOfType([pt.instanceOf(Date), pt.string]).isRequired,
    color: pt.string.isRequired,
};
Reminder.propTypes = {
    ...reminderBasePropType,
    funcs: pt.object.isRequired,
    currentmonth: pt.instanceOf(Date).isRequired,
    maxcharacters: pt.number.isRequired,
};

export default Reminder;
