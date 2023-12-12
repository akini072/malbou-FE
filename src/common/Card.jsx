import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ children }) => {
  return (
    <div className="w-full max-w-md md:max-w-lg shadow-md border border-gray-100 rounded-md p-0 sm:p-6 md:p-8 mx-auto my-14">
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node
};

export default Card;
