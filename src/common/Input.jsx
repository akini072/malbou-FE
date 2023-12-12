import React from 'react';
import PropTypes from 'prop-types';

const InputLabel = ({
  name,
  type,
  value,
  onChange,
  placeholder,
  extra,
  disabled,
  error,
  help,
  text
}) => {
  return (
    <div className="relative dark:rounded-md dark:shadow-sm">
      {/* <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <span className="text-gray-500 sm:text-sm">$</span>
        </div> */}
      <input
        type={type || 'text'}
        name={name}
        className="block w-full px-3 sm:px-4 py-2 sm:py-4 px-6 text-center font-medium text-black dark:text-white text-base sm:text-2xl border-gray-300 placeholder:text-[#697586] bg-white border dark:bg-[#202939] pl rounded-lg focus:border-indigo-500 focus:ring-indigo-500"
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
      {error && <p className="text-sm text-center text-red-500">{help}</p>}
      {text && <p className="text-sm text-center text-[#697586] mt-1">{text}</p>}
    </div>
  );
};

InputLabel.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  text: PropTypes.string || null,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  extra: PropTypes.node || null,
  disabled: PropTypes.bool || null,
  onChange: PropTypes.func,
  error: PropTypes.bool || null,
  help: PropTypes.string
};

export default InputLabel;
