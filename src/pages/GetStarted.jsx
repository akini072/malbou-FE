import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import FacebookLogin from 'react-facebook-login';

import { signUpFB } from 'stores/auth';
import { getProfile, resetUser } from 'stores/user';
import { facebookRandom } from 'stores/facebook';

import { Card } from 'components/card/Card';

import Logo from 'assets/images/logo.svg';
import LogoBlack from 'assets/images/logo-black.svg';

const GetStarted = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem('mymarvin_token');
  const logged = localStorage.getItem('mymarvin_logged');
  const { user } = useSelector((state) => state.userStore);
  const { postsRandom } = useSelector((state) => state.facebookStore);

  const [mode, setMode] = useState('light');

  const handleRegister = () => {
    navigate('/auth/register');
  };

  const responseFacebook = (response) => {
    dispatch(
      signUpFB({
        email: response.email,
        accessToken: response.accessToken
      })
    );
  };

  const onSelectMode = (mode) => {
    setMode(mode);
  };

  useEffect(() => {
    dispatch(facebookRandom());
  }, []);

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

  useEffect(() => {
    if (token && logged) {
      dispatch(getProfile());
    }

    return () => {
      dispatch(resetUser());
    };
  }, [token]);

  if (user && user.ainame && user.verify) {
    navigate('/home');
  } else if (user && !user.verify) {
    navigate('/welcome');
  } else if (user && !user.ainame) {
    navigate(`/auth/create-ai?token=${token}`);
  } else {
    return (
      <div className="w-full h-full dark:bg-[#121926] dark:text-white px-6 flex flex-col justify-between">
        <div className="w-full">
          <div className="flex justify-center px-4 py-12 text-center sm:px-6 bg-header-linear-light dark:bg-header-linear">
            {mode === 'dark' ? (
              <img alt="" src={Logo} style={{ height: '30px' }} />
            ) : (
              <img alt="" src={LogoBlack} style={{ height: '30px' }} />
            )}
          </div>
          <div className="flex gap-4 flex-nowrap overflow-x-auto snap-x snap-mandatory scrollbar-hide">
            {postsRandom?.map((item) => (
              <Card item={item} key={item._id} isLogin={user && user.verify} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-8 mt-5 mb-12">
          <div className="flex justify-center">
            <h2 className="font-semibold text-4xl tracking-tight text-center">
              Your Social Media Simplified
            </h2>
          </div>
          <div className="justify-center flex">
            <FacebookLogin
              appId={process.env.REACT_APP_FB_APP_ID}
              textButton="Continue with Facebook"
              fields="name,email"
              scope={process.env.REACT_APP_FB_APP_SCOPES}
              cssClass="py-4 rounded-3xl w-[327px] fbBtn"
              callback={responseFacebook}
            />
          </div>
          <div className="flex justify-center">
            <span className="text-gray-400">
              Have an account?{' '}
              <button className="text-white" onClick={handleRegister}>
                Login
              </button>
            </span>
          </div>
        </div>
      </div>
    );
  }
};

export default GetStarted;
