import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { ReactComponent as ChatsIcon } from 'assets/images/logo-white.svg';
import { ReactComponent as ChatsBlackIcon } from 'assets/images/chats-black.svg';

const Logo = ({ mode }) => {
  return (
    <Link to="/" className="flex items-center flex-shrink-0">
      {mode === 'dark' ? (
        <ChatsIcon className="w-8 h-6 text-black dark:text-white" />
      ) : (
        <ChatsBlackIcon className="w-8 h-6 text-black dark:text-white" />
      )}
      <h5 className="ml-2 font-bold text-black dark:text-white">myMarvin.ai</h5>
    </Link>
  );
};

Logo.propTypes = {
  mode: PropTypes.string
};

export default Logo;
