import React from 'react';
import dateFns from 'date-fns';
import pt from 'prop-types';

import Header from './header';
import { formatDateKey, filterRemindersByDate } from '../../utils';

class Calendar extends React.Component {
    renderDays = () => {
        const days = [];
        const dateFormat = 'dddd';
        const startDate = dateFns.startOfWeek(this.props.currentMonth);

        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="calendar__col" key={i}>
                    <div className="calendar__col-center">
                        {dateFns.format(
                            dateFns.addDays(startDate, i),
                            dateFormat,
                        )}
                    </div>
                </div>,
            );
        }

        return (
            <div className="calendar__days">
                <div className="calendar__row">{days}</div>
            </div>
        );
    };

    renderReminders = (reminders, currentDay) => {
        if (reminders.length === 0) {
            return null;
        }

        // Get reminders for the currently selected day
        const currentDateKey = formatDateKey(currentDay);
        const currentDateReminders = filterRemindersByDate(
            reminders,
            currentDateKey,
        );

        // Keep only one reminder per day to show on the tile
        if (currentDateReminders.length >= 2) {
            for (let i = 1; i < currentDateReminders.length; i++) {
                reminders = reminders.filter(
                    r => r.id !== currentDateReminders[i].id,
                );
            }
        }

        return reminders.map(reminder => {
            const reminderDateKey = formatDateKey(reminder.date);
            const { id, text, date, color } = reminder;

            const currentDateRemindersLeft = currentDateReminders.length - 1;
            const moreRemindersText =
                currentDateRemindersLeft !== 0
                    ? `${currentDateRemindersLeft} more...`
                    : null;

            if (reminderDateKey === currentDateKey) {
                return (
                    <React.Fragment key={id}>
                        <div className="calendar__body-reminder">
                            <div
                                style={{
                                    backgroundColor: color,
                                    padding: '0.5em',
                                }}>
                                <p>{text}</p>
                                <p className="small">
                                    {dateFns.format(date, 'h:mm A')}
                                </p>
                            </div>
                        </div>

                        <p className="small-text">{moreRemindersText}</p>
                    </React.Fragment>
                );
            }

            return null;
        });
    };

    renderTiles = () => {
        const { currentMonth, selectedDate, allReminders } = this.props;
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);

        const rows = [];
        const dateFormat = 'D';

        let days = [];
        let day = startDate;
        let formattedDate = '';

        while (day <= endDate) {
            // Build days array
            for (let i = 0; i < 7; i++) {
                formattedDate = dateFns.format(day, dateFormat);
                const cloneDay = day;

                let tileClass = '';
                if (!dateFns.isSameMonth(day, monthStart)) {
                    // Out of range days
                    tileClass = 'calendar__body-celldisabled';
                } else if (dateFns.isSameDay(day, selectedDate)) {
                    // User selected days
                    tileClass = 'calendar__body-cellselected';
                }

                days.push(
                    <div className="calendar__col" key={day}>
                        <div
                            className={`calendar__body-cell ${tileClass}`}
                            onClick={() =>
                                this.handleDayClick(dateFns.parse(cloneDay))
                            }>
                            <span className="calendar__body-cellnumber">
                                {formattedDate}
                            </span>

                            {this.renderReminders(allReminders, day)}
                        </div>
                    </div>,
                );

                day = dateFns.addDays(day, 1);
            }

            // Build rows array
            rows.push(
                <div className="calendar__row" key={day}>
                    {days}
                </div>,
            );

            days = [];
        }

        return <div className="calendar__body">{rows}</div>;
    };

    handleDayClick = day => {
        this.props.selectDay(day);
    };

    handleNextMonthClick = () => {
        this.props.selectNextMonth(
            dateFns.addMonths(this.props.currentMonth, 1),
        );
    };

    handlePrevMonthClick = () => {
        this.props.selectPrevMonth(
            dateFns.subMonths(this.props.currentMonth, 1),
        );
    };

    render() {
        const dateFormat = 'MMMM YYYY';

        return (
            <div className="calendar">
                <Header
                    prevMonth={this.handlePrevMonthClick}
                    nextMonth={this.handleNextMonthClick}
                    currentMonth={this.props.currentMonth}
                    dateFormat={dateFormat}
                />
                {this.renderDays()}
                {this.renderTiles()}
            </div>
        );
    }
}

Calendar.propTypes = {
    currentMonth: pt.instanceOf(Date).isRequired,
    selectPrevMonth: pt.func.isRequired,
    selectNextMonth: pt.func.isRequired,
    selectDay: pt.func.isRequired,
    selectedDate: pt.instanceOf(Date).isRequired,
    allReminders: pt.array.isRequired,
};

export default Calendar;
