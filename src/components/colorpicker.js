import React from 'react';
import pt from 'prop-types';

const colors = [
    { value: '#3E60FC', name: 'Blue' },
    { value: '#FC2943', name: 'Red' },
    { value: '#B249FC', name: 'Purple' },
    // { value: '#FC9F8B', name: 'Pink' },
    // { value: '#FCEF3A', name: 'Yellow' },
    { value: '#151739', name: 'Black' },
];

class ColorPicker extends React.Component {
    static getDerivedStateFromProps(props, state) {
        if (props.option !== state.option) {
            return { option: props.option };
        }

        return null;
    }

    state = {
        option: undefined,
    };

    render() {
        return (
            <span className="reminders__body-listitem-select">
                <select
                    className="select"
                    value={this.state.option}
                    onChange={this.props.onChange}
                    name={this.props.name}>
                    {colors.map(color => (
                        <option value={color.value} key={color.value}>
                            {color.name}
                        </option>
                    ))}
                </select>
            </span>
        );
    }
}

ColorPicker.propTypes = {
    name: pt.string.isRequired,
    onChange: pt.func.isRequired,
    option: pt.string,
};

export default ColorPicker;
