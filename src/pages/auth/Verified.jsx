import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { register } from 'stores/auth';

import Background from 'assets/images/get-started.png';
import CheckedIcon from 'assets/images/check.svg';

const Verified = () => {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const { isRegister } = useSelector((state) => state.authStore);
  // console.log('isRegister: ', isRegister);

  const handleContinue = () => {
    window.location.href = '/home';
  };

  return (
    <div
      className="w-full !bg-contain"
      style={{
        background: `url(${Background}) no-repeat center top`
      }}
    >
      <div className="flex items-center w-full min-h-screen py-6">
        <div className="w-full mb-20">
          <div className="mb-8 text-center">
            <img alt="checked" src={CheckedIcon} className="mx-auto" />
          </div>
          <h2 className="mb-3 text-3xl font-semibold text-center dark:text-white">
            Account verified
          </h2>
          <p className="text-sm text-gray-600 dark:text-[#CDD5DF] text-center mx-auto max-w-[270px] mb-20">
            Your account has been verified, you can now start using your myMarvin AI!
          </p>

          <div className="absolute bottom-0 left-0 right-0 z-10 w-full px-6 pb-20">
            <button
              onClick={handleContinue}
              className="w-full bg-[#1570EF] rounded-full p-3 mt-12 text-white text-lg font-medium"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verified;
