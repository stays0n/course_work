import React from 'react';
import PropTypes from 'prop-types';

const SelectField = ({
    label,
    name,
    value,
    onChange,
    defaultOption,
    options,
    error,
}) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === 'object'
            ? Object.keys(options).map((optionName) => ({
                  label: options[optionName].label,
                  value: options[optionName].value,
              }))
            : options;

    const optionElements =
        optionsArray &&
        optionsArray.map((option) => (
            <option key={option.value} value={option.value}>
                {option.label}
            </option>
        ));

    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    const getInputClasses = () => {
        return 'form-select' + (error ? ' is-invalid' : '');
    };

    return (
        <div className="mb-4">
            <label htmlFor="validationCustom04" className="form-label">
                {label}
            </label>
            <select
                className={getInputClasses()}
                id="validationCustom04"
                name={name}
                value={value}
                onChange={handleChange}
            >
                <option disabled value="">
                    {defaultOption}
                </option>
                {optionElements}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

SelectField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    defaultOption: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    error: PropTypes.string,
};

export default SelectField;
