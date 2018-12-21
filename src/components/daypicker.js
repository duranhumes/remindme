import React from 'react';
import dateFns from 'date-fns';
import pt from 'prop-types';

const formatDayDisplay = date => dateFns.format(date, 'MMM Do');
const formatDayValue = date => dateFns.format(date, 'MMM DD GGGG');

const dayList = currentMonth => {
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const daysInMonth = dateFns.eachDay(monthStart, monthEnd);

    return daysInMonth;
};

class DayPicker extends React.PureComponent {
    static getDerivedStateFromProps(props, state) {
        const dateKey = formatDayValue(props.option);
        if (props.option !== state.option) {
            return { option: dateKey };
        }

        return null;
    }

    state = {
        option: undefined,
    };

    render() {
        const { currentmonth, option } = this.props;

        /**
         * If the props.option date is the different from
         * the props.currentmonth then prefer props.option
         * date as that would be the value of the current
         * picker instance. Otherwise default to using
         * props.currentmonth
         */
        let days = dayList(this.props.currentmonth);
        if (!dateFns.isEqual(option, currentmonth)) {
            days = dayList(this.props.option);
        }

        return (
            <span className="reminders__body-listitem-select">
                <select
                    className="select"
                    onChange={this.props.onChange}
                    value={this.state.option}
                    name={this.props.name}>
                    {days.map(day => (
                        <option value={formatDayValue(day)} key={day}>
                            {formatDayDisplay(day)}
                        </option>
                    ))}
                </select>
            </span>
        );
    }
}

DayPicker.propTypes = {
    name: pt.string.isRequired,
    currentmonth: pt.instanceOf(Date).isRequired,
    onChange: pt.func.isRequired,
    option: pt.oneOfType([pt.instanceOf(Date), pt.string]),
};

export default DayPicker;
