import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useWindowSize } from 'hooks/useWindowSize';

const Layout = ({ children, isPrivate }) => {
  const [width] = useWindowSize();
  const [mode, setMode] = useState('light');

  const onSelectMode = (mode) => {
    setMode(mode);
  };

  useEffect(() => {
    // Add listener to update styles
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => onSelectMode(e.matches ? 'dark' : 'light'));

    // Setup dark/light mode for the first time
    onSelectMode(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    // Remove listener
    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', () => {});
    };
  }, []);

  return (
    <div className="w-full relative h-screen flex flex-col p-0 dark:bg-[#121926] dark:text-white">
      {width > 768 && <Header isPrivate={isPrivate} mode={mode} />}
      <div
        className={`w-full h-full box-border overflow-hidden ${
          width < 768 && isPrivate ? 'pb-[69px]' : 'pb-0'
        }`}
      >
        {children}
      </div>
      <ToastContainer />
      {width < 768 && isPrivate && <Sidebar isPrivate={isPrivate} />}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
  isPrivate: PropTypes.bool
};

export default Layout;
