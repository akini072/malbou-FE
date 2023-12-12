import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

import { useSelector } from 'react-redux';

import { Logo } from 'common';

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Chats', href: '/chats', current: false },
  { name: 'Images', href: '/images', current: false },
  { name: 'Tags', href: '/lists', current: false },
  { name: 'Saved', href: '/saved', current: false },
  { name: 'Facebook', href: '/facebook', current: false }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Header({ isPrivate, mode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.userStore);

  const handleLogout = () => {
    localStorage.removeItem('mymarvin_token');
    navigate('/auth/login');
  };

  return (
    <Disclosure as="nav" className="bg-white dark:bg-gray-800">
      {({ open }) => (
        <>
          <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-700 rounded-md dark:text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                <Logo mode={mode} />
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {isPrivate &&
                      navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            location.pathname === item.href
                              ? 'bg-white text-black'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-700 hover:text-white',
                            'px-3 py-1 rounded-2xl text-base font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                {isPrivate && (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex p-1 text-sm bg-gray-200 rounded-full dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        {/* <img
                          className="w-8 h-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        /> */}
                        {user && user.avatar ? (
                          <img
                            alt="avatar"
                            src={user.avatar.Location}
                            className="object-cover w-8 h-8 overflow-hidden rounded-full"
                          />
                        ) : (
                          <img
                            alt="avatar"
                            src="https://mymarvin-storage.s3.amazonaws.com/ai_profile/default_logo.png"
                            className="object-contain w-8 h-8 overflow-hidden"
                          />
                        )}
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/auth/account"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Account
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/auth/profile"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              onClick={handleLogout}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}

                {!isPrivate && (
                  <div>
                    <Link
                      to="/auth/login"
                      className="p-1 px-6 py-2 text-white bg-gray-800 rounded-full dark:text-black dark:bg-white text-black-400 hover:shadow-sm"
                    >
                      Login
                    </Link>
                    <Link
                      to="/auth/register"
                      className="p-1 px-6 py-2 ml-4 text-black border border-gray-800 rounded-full dark:border-gray-200 dark:text-white hover:shadow-sm"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

Header.propTypes = {
  isPrivate: PropTypes.bool,
  mode: PropTypes.string
};
