import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sendVerifyAccount, getProfile } from 'stores/user';
import { toast } from 'react-toastify';

const Welcome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem('mymarvin_token');
  const { user, isReSent } = useSelector((state) => state.userStore);

  useEffect(() => {
    if (isReSent) {
      toast.success('You will receive an email in a few minutes. Please check your email again');
    }
  }, [isReSent]);

  useEffect(() => {
    if (!user && token) {
      dispatch(getProfile());
    } else if (user && user.verify) {
      navigate('/home');
    }
  }, [user]);

  const handleReSend = () => {
    dispatch(sendVerifyAccount());
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-20 dark:min-h-screen flex items-center justify-center">
        <div className="dark:border-0 p-0 sm:p-10 rounded-lg dark:shadow-none dark:rounded-none text-center max-w-2xl mx-auto">
          <h3 className="font-bold text-3xl sm:text-4xl mb-6">Verify your email.</h3>
          <p className="text-lg font-medium mb-6">
            {`Please check your email to verify your email address. If you've not received the email
            you can "Re-send" it.`}
          </p>
          <div>
            <button
              onClick={handleReSend}
              className="bg-white-500 border text-black dark:text-white text-base font-medium py-2 px-4 sm:px-6 rounded-md ml-4 inline-flex"
            >
              Re-send
            </button>
            {/* <a
              href="https://mail.google.com/mail/u/0/#inbox"
              target="_blank"
              className="bg-white-500 border text-black dark:text-white text-base font-medium py-2 px-4 sm:px-6 rounded-md ml-4 inline-flex"
              rel="noreferrer"
            >
              Open Gmail
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
