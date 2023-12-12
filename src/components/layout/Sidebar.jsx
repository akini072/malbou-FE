import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

import { ReactComponent as HomeIcon } from 'assets/images/home.svg';
import { ReactComponent as ChatIcon } from 'assets/images/chat.svg';
import { ReactComponent as SavedIcon } from 'assets/images/saved.svg';
import { ReactComponent as ImageIcon } from 'assets/images/image.svg';
import { ReactComponent as ListIcon } from 'assets/images/list.svg';
import { ReactComponent as FacebookIcon } from 'assets/images/facebookIcon.svg';

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <div
      className="fixed bottom-0 z-50 grid w-full grid-cols-6 gap-6 py-0 sm:py-3 bg-white dark:bg-[#121926]"
      style={{
        boxShadow: '0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)'
        // background:
        // background: 'rgba(18, 25, 38, 0.01)',
        // backdropFilter: 'blur(19px)'
      }}
    >
      <Link
        to="/home"
        className={`w-full p-3 sm:p-6 text-center text-[#9AA4B2] hover:text-[#53B1FD] ${
          pathname === '/home' ? 'text-[#53B1FD]' : ''
        }`}
      >
        <HomeIcon className={`w-6 h-6 mx-auto ${pathname === '/home' ? 'active' : ''}`} />
        <span
          className={`block text-center  text-[12px] mt-[3px] ${
            pathname === '/home' ? 'text-[#53B1FD]' : ''
          }`}
        >
          Home
        </span>
      </Link>
      <Link
        to="/chats"
        className={`w-full p-3 sm:p-6 text-center text-[#9AA4B2] hover:text-[#53B1FD] ${
          pathname === '/chats' ? 'text-[#53B1FD]' : ''
        }`}
      >
        <ChatIcon className={`w-6 h-6 mx-auto ${pathname === '/chats' ? 'active' : ''}`} />
        <span
          className={`block text-center  text-[12px] mt-[3px] ${
            pathname === '/chats' ? 'text-[#53B1FD]' : ''
          }`}
        >
          Chat
        </span>
      </Link>
      <Link
        to="/images"
        className={`w-full p-3 sm:p-6 text-center text-[#9AA4B2] hover:text-[#53B1FD] ${
          pathname === '/images' ? 'text-[#53B1FD]' : ''
        }`}
      >
        <ImageIcon className={`w-6 h-6 mx-auto ${pathname === '/images' ? 'active' : ''}`} />
        <span
          className={`block text-center  text-[12px] mt-[3px] ${
            pathname === '/images' ? 'text-[#53B1FD]' : ''
          }`}
        >
          Images
        </span>
      </Link>
      <Link
        to="/lists"
        className={`w-full p-3 sm:p-6 text-center text-[#9AA4B2] hover:text-[#53B1FD] ${
          pathname === '/lists' ? 'text-[#53B1FD]' : ''
        }`}
      >
        <ListIcon className={`w-6 h-6 mx-auto ${pathname === '/lists' ? 'active' : ''}`} />
        <span
          className={`block text-center  text-[12px] mt-[3px] ${
            pathname === '/lists' ? 'text-[#53B1FD]' : ''
          }`}
        >
          Tags
        </span>
      </Link>
      <Link
        to="/saved"
        className={`w-full p-3 sm:p-6 text-center text-[#9AA4B2] hover:text-[#53B1FD] ${
          pathname === '/saved' ? 'text-[#53B1FD]' : ''
        }`}
      >
        <SavedIcon className={`w-6 h-6 mx-auto ${pathname === '/saved' ? 'active' : ''}`} />
        <span
          className={`block text-center  text-[12px] mt-[3px] ${
            pathname === '/saved' ? 'text-[#53B1FD]' : ''
          }`}
        >
          Saved
        </span>
      </Link>
      <Link
        to="/facebook"
        className={`w-full p-3 sm:p-6 text-center text-[#9AA4B2] hover:text-[#53B1FD] ${
          pathname === '/facebook' ? 'text-[#53B1FD]' : ''
        }`}
      >
        <FacebookIcon className={`w-6 h-6 mx-auto ${pathname === '/facebook' ? 'active' : ''}`} />
        <span
          className={`block text-center  text-[12px] mt-[3px] ${
            pathname === '/facebook' ? 'text-[#53B1FD]' : ''
          }`}
        >
          Facebook
        </span>
      </Link>
    </div>
  );
};

Sidebar.propTypes = {
  isPrivate: PropTypes.bool
};

export default Sidebar;
