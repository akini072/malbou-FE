import React from 'react';
import PropTypes from 'prop-types';

const InputLabel = ({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  extra,
  error,
  help,
  disabled
}) => {
  return (
    <div className="mb-0 sm:mb-4">
      <label htmlFor="price" className="block text-sm font-semibold text-black-700">
        {label}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        {/* <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <span className="text-gray-500 sm:text-sm">$</span>
        </div> */}
        <input
          type={type || 'text'}
          name={name}
          className={`block w-full px-4 py-2 ${
            extra ? 'pr-12' : ''
          } text-black border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
          placeholder={placeholder || ''}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
        {extra && (
          <div className="absolute inset-y-0 right-0 flex items-center">
            {extra}
            {/* <label htmlFor="currency" className="sr-only">
            Currency
            </label>
            <select
              id="currency"
              name="currency"
              className="h-full py-0 pl-2 text-gray-500 bg-transparent border-transparent rounded-md pr-7 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
              <option>USD</option>
              <option>CAD</option>
              <option>EUR</option>
            </select> */}
          </div>
        )}
      </div>
      {error && <p className="text-sm text-red-500">{help}</p>}
    </div>
  );
};

InputLabel.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  extra: PropTypes.node || null,
  disabled: PropTypes.bool || null,
  error: PropTypes.bool || null,
  help: PropTypes.string,
  onChange: PropTypes.func
};

export default InputLabel;
