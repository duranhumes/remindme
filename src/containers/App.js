import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import '../styles/index.css';
import { Calendar, Reminders } from '../components';
import { remindersActions, calendarActions } from '../store/actions';
import { formatDateKey, sortByDate, filterRemindersByDate } from '../utils';

class App extends React.Component {
    render() {
        const { calendar, reminders } = this.props;
        return (
            <div className="container">
                <div className="wrapper">
                    <main>
                        <Calendar {...calendar} />
                    </main>
                    <aside>
                        <Reminders {...reminders} />
                    </aside>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ calendar, reminders }) => ({
    reminders,
    calendar,
});

const mapActionsToProps = dispatch => ({
    calendarActions: bindActionCreators(calendarActions, dispatch),
    remindersActions: bindActionCreators(remindersActions, dispatch),
});

const mergeProps = (state, dispatch) => {
    // Filter and sort reminders based on user selected date
    const dateKey = formatDateKey(state.calendar.selectedDate);
    const filteredReminders = filterRemindersByDate(
        state.reminders.reminders,
        dateKey,
    );
    const sortedReminders = sortByDate(filteredReminders);

    return {
        ...state,
        calendar: {
            ...state.calendar,
            ...dispatch.calendarActions,
            currentReminders: sortedReminders,
            allReminders: state.reminders.reminders,
        },
        reminders: {
            ...state.reminders,
            ...dispatch.remindersActions,
            selectedDate: state.calendar.selectedDate,
            currentMonth: state.calendar.currentMonth,
            reminders: sortedReminders,
            selectCalendarDay: dispatch.calendarActions.selectDay,
        },
    };
};

export default connect(
    mapStateToProps,
    mapActionsToProps,
    mergeProps,
)(App);
