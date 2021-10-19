import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const MultiSelectField = ({ label, name, options, onChange, defaultValue }) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === 'object'
      ? Object.keys(options).map((optionName) => ({
        label: options[optionName].name,
        value: options[optionName]._id,
      }))
      : options;

  const handleChange = (value) => {
    onChange({ name: name, value });
  };

  return (
    <div className='mb-4'>
      <label className='form-label'>{label}</label>
      <Select
        isMulti
        options={optionsArray}
        name={name}
        className='basic-multi-select'
        classNamePrefix='select'
        onChange={handleChange}
        defaultValue={defaultValue}
        closeMenuOnSelect={false}
      />
    </div>
  );
};

MultiSelectField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChange: PropTypes.func,
  defaultValue: PropTypes.array,
};

export default MultiSelectField;
