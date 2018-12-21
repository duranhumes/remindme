import React from 'react';
import dateFns from 'date-fns';
import pt from 'prop-types';

const Header = ({ prevMonth, nextMonth, currentMonth, dateFormat }) => (
    <div className="calendar__header">
        <div className="calendar__header-text">
            <div className="calendar__row">
                <div className="calendar__row-middle">
                    <div className="calendar__col">
                        <div className="calendar__col-start">
                            <div className="calendar__header-icon">
                                <button className="icon" onClick={prevMonth}>
                                    chevron_left
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="calendar__col">
                        <span className="calendar__col-center">
                            {dateFns.format(currentMonth, dateFormat)}
                        </span>
                    </div>
                    <div className="calendar__col">
                        <div className="calendar__col-end">
                            <div className="calendar__header-icon">
                                <button className="icon" onClick={nextMonth}>
                                    chevron_right
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

Header.propTypes = {
    prevMonth: pt.func.isRequired,
    nextMonth: pt.func.isRequired,
    currentMonth: pt.instanceOf(Date).isRequired,
    dateFormat: pt.string.isRequired,
};

export default Header;
