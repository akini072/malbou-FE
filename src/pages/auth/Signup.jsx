import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { Input } from 'common';
import { useDispatch, useSelector } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import { register, reset, signUpFB } from 'stores/auth';
import { toast } from 'react-toastify';

import Background from 'assets/images/get-started.png';
import Dog from 'assets/images/dog1.png';
import Dragon from 'assets/images/dragon1.png';
import Everest from 'assets/images/everest1.png';
import Party from 'assets/images/party1.png';
import Poem from 'assets/images/poem1.png';
import Recipe from 'assets/images/recipe1.png';
import Authenticated from 'assets/images/authenticated1.png';
import Card from 'assets/images/card1.png';
import Private from 'assets/images/private1.png';
import Facebook from 'assets/images/facebook.svg';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isRegister, user } = useSelector((state) => state.authStore);
  const [step, setStep] = useState(0);

  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
    re_password: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Password is required'),
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required')
  });

  const responseFacebook = (response) => {
    dispatch(
      signUpFB({
        email: response.email,
        accessToken: response.accessToken
      })
    );
  };

  const handleBack = () => {
    navigate('/');
  };

  useEffect(() => {
    if (isRegister) {
      toast.success('Register successfully!');
      if (user) {
        localStorage.setItem('mymarvin_token', user.token);
      }
      navigate(user && !user.verify ? '/welcome' : '/home');
    }

    return () => {
      dispatch(reset());
    };
  }, [isRegister]);

  return (
    <div
      className="relative flex items-center !bg-contain w-full h-screen px-6 overflow-hidden"
      style={{
        background: `url(${Background}) no-repeat center bottom`
      }}
    >
      <div className="w-full py-6">
        <div className="absolute z-10 w-full mb-6 top-5 left-6">
          <button onClick={handleBack} className="w-8 h-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
        </div>

        <div className="w-full">
          {step === 0 && (
            <>
              <h2 className="mb-10 text-4xl font-bold text-center dark:text-white">
                Create any text
              </h2>
              <div>
                <div className="relative h-[100px]">
                  <img className="absolute left-0 top-0" width={'100px'} src={Poem}></img>
                  <div className="flex pl-[120px] text-[18px] dark:text-white h-full content-center">
                    <div className="m-auto">
                      <span>
                        “Write a poem about a man called Simon who lives in North Wales and loves
                        gliding”
                      </span>
                    </div>
                  </div>
                </div>
                <div className="relative h-[100px] mt-10">
                  <img className="absolute right-0 top-0" width={'100px'} src={Recipe}></img>
                  <div className="flex pr-[120px] text-[18px] dark:text-white h-full content-center">
                    <div className="m-auto">
                      <span>“Recipe for green Thai chicken”</span>
                    </div>
                  </div>
                </div>
                <div className="relative h-[100px] mt-10">
                  <img className="absolute left-0 top-0" width={'100px'} src={Party}></img>
                  <div className="flex pl-[120px] text-[18px] dark:text-white h-full content-center">
                    <div className="m-auto">
                      <span>“Ideas for a 12 years old boys birthday party”</span>
                    </div>
                  </div>
                </div>
                <div className="left-0 right-0 bottom-8">
                  <button
                    type="submit"
                    className="w-full bg-[#1570EF] rounded-full p-3 mt-8 text-white text-lg font-medium"
                    onClick={() => setStep(1)}
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <h2 className="mb-10 text-4xl font-bold text-center dark:text-white">
                Create any image
              </h2>
              <div>
                <div className="relative h-[100px]">
                  <img className="absolute left-0 top-0" width={'100px'} src={Everest}></img>
                  <div className="flex pl-[120px] text-[18px] dark:text-white h-full content-center">
                    <div className="m-auto">
                      <span>“an oil painting of a tiger on mount everest”</span>
                    </div>
                  </div>
                </div>
                <div className="relative h-[100px] mt-10">
                  <img className="absolute right-0 top-0" width={'100px'} src={Dragon}></img>
                  <div className="flex pr-[120px] text-[18px] dark:text-white h-full content-center">
                    <div className="m-auto">
                      <span>
                        “on oil painting of a Welsh fire breathing dragon flying over the Welsh
                        hills”
                      </span>
                    </div>
                  </div>
                </div>
                <div className="relative h-[100px] mt-10">
                  <img className="absolute left-0 top-0" width={'100px'} src={Dog}></img>
                  <div className="flex pl-[120px] text-[18px] dark:text-white h-full content-center">
                    <div className="m-auto">
                      <span>
                        “an abstract painting of a black cocker spaniel wearing a silly hat”
                      </span>
                    </div>
                  </div>
                </div>
                <div className="left-0 right-0 bottom-8">
                  <button
                    type="submit"
                    className="w-full bg-[#1570EF] rounded-full p-3 mt-8 text-white text-lg font-medium"
                    onClick={() => setStep(2)}
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="mb-10 text-4xl font-bold text-center dark:text-white">
                Save and share
              </h2>
              <div>
                <div className="relative h-[100px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    width="60"
                    height="60"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="stroke-[#111] dark:stroke-[#e7e7e7] absolute left-5 top-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                  <div className="flex pl-[120px] text-[18px] dark:text-white h-full content-center">
                    <div className="m-auto">
                      <span>Easily share your creations with a private myMarvin web link.</span>
                    </div>
                  </div>
                </div>
                <div className="relative h-[100px] mt-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    width="60"
                    height="60"
                    stroke="currentColor"
                    className="stroke-[#111] dark:stroke-[#e7e7e7] absolute right-5 top-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                    />
                  </svg>
                  <div className="flex pr-[120px] text-[18px] dark:text-white h-full content-center">
                    <div className="m-auto">
                      <span>Quickly sav your images and text - add tags to find them easily.</span>
                    </div>
                  </div>
                </div>
                <div className="relative h-[100px] mt-10">
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 23 20"
                    fill="none"
                    className="stroke-[#111] dark:stroke-[#e7e7e7] absolute left-5 top-5"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.8334 19L11.7333 18.8499C11.0387 17.808 10.6913 17.287 10.2325 16.9098C9.82622 16.5759 9.35812 16.3254 8.85496 16.1726C8.28661 16 7.66047 16 6.40818 16H5.03336C3.91325 16 3.3532 16 2.92538 15.782C2.54905 15.5903 2.24309 15.2843 2.05135 14.908C1.83336 14.4802 1.83336 13.9201 1.83336 12.8V4.2C1.83336 3.07989 1.83336 2.51984 2.05135 2.09202C2.24309 1.71569 2.54905 1.40973 2.92538 1.21799C3.3532 1 3.91325 1 5.03336 1H5.43336C7.67357 1 8.79367 1 9.64932 1.43597C10.402 1.81947 11.0139 2.43139 11.3974 3.18404C11.8334 4.03968 11.8334 5.15979 11.8334 7.4M11.8334 19V7.4M11.8334 19L11.9334 18.8499C12.6281 17.808 12.9754 17.287 13.4343 16.9098C13.8405 16.5759 14.3086 16.3254 14.8118 16.1726C15.3801 16 16.0063 16 17.2585 16H18.6334C19.7535 16 20.3135 16 20.7413 15.782C21.1177 15.5903 21.4236 15.2843 21.6154 14.908C21.8334 14.4802 21.8334 13.9201 21.8334 12.8V4.2C21.8334 3.07989 21.8334 2.51984 21.6154 2.09202C21.4236 1.71569 21.1177 1.40973 20.7413 1.21799C20.3135 1 19.7535 1 18.6334 1H18.2334C15.9931 1 14.873 1 14.0174 1.43597C13.2647 1.81947 12.6528 2.43139 12.2693 3.18404C11.8334 4.03968 11.8334 5.15979 11.8334 7.4"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex pl-[120px] text-[18px] dark:text-white h-full content-center">
                    <div className="m-auto">
                      <span>Create topic specific text or images to keep things in one place.</span>
                    </div>
                  </div>
                </div>
                <div className="left-0 right-0 bottom-8">
                  <button
                    type="submit"
                    className="w-full bg-[#1570EF] rounded-full p-3 mt-8 text-white text-lg font-medium"
                    onClick={() => setStep(3)}
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="mb-10 text-4xl font-bold text-center dark:text-white">
                Secure & private
              </h2>
              <div>
                <div className="relative h-[100px]">
                  <img className="absolute left-0 top-0" width={'100px'} src={Authenticated}></img>
                  <div className="flex pl-[120px] text-[18px] dark:text-white h-full content-center">
                    <div className="m-auto">
                      <span>All users are authenticated to reduce spam and misuse.</span>
                    </div>
                  </div>
                </div>
                <div className="relative h-[100px] mt-10">
                  <img className="absolute right-0 top-0" width={'100px'} src={Private}></img>
                  <div className="flex pr-[120px] text-[18px] dark:text-white h-full content-center">
                    <div className="m-auto">
                      <span>Your account is 100% ad free and totally private.</span>
                    </div>
                  </div>
                </div>
                <div className="relative h-[100px] mt-10">
                  <img className="absolute left-0 top-0" width={'100px'} src={Card}></img>
                  <div className="flex pl-[120px] text-[18px] dark:text-white h-full content-center">
                    <div className="m-auto">
                      <span>You can credit your account at any time with a minimum of £1.</span>
                    </div>
                  </div>
                </div>
                <h6 className="absolute mb-10 px-[50px] text-[10px] font-semibold text-center dark:text-white mt-[-15px]">
                  Payments are secure and managed by Stripe.<br></br>myMarvin never has access to
                  and does not store your credit card details.
                </h6>
                <div className="left-0 right-0 bottom-8">
                  <button
                    type="submit"
                    className="w-full bg-[#1570EF] rounded-full p-3 mt-8 text-white text-lg font-medium"
                    onClick={() => setStep(4)}
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h2 className="text-3xl font-semibold text-center dark:text-white">Create account</h2>
              <Formik
                initialValues={{
                  email: '',
                  firstName: '',
                  lastName: '',
                  password: ''
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  dispatch(register(values));
                }}
              >
                {({ values, errors, handleSubmit, handleChange }) => {
                  return (
                    <Form className="mt-8 sm:mt-8 space-y-3 sm:space-y-6" onSubmit={handleSubmit}>
                      <Input
                        placeholder="name@email.com"
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        help={errors.email}
                      />

                      <Input
                        placeholder="Your password"
                        name="password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        help={errors.password}
                        error={errors.password}
                      />
                      <Input
                        placeholder="Confirm password"
                        name="re_password"
                        type="password"
                        value={values.re_password}
                        onChange={handleChange}
                        help={errors.re_password}
                        error={errors.re_password}
                      />

                      <Input
                        placeholder="First name"
                        name="firstName"
                        type="text"
                        value={values.firstName}
                        onChange={handleChange}
                        help={errors.firstName}
                        error={errors.firstName}
                      />

                      <Input
                        placeholder="Last name"
                        name="lastName"
                        type="text"
                        value={values.lastName}
                        onChange={handleChange}
                        help={errors.lastName}
                        error={errors.lastName}
                      />

                      <div className="left-0 right-0 bottom-8">
                        <button
                          type="submit"
                          className="w-full bg-[#1570EF] rounded-full p-3 mt-8 text-white text-lg font-medium"
                        >
                          Create account
                        </button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
              <div className="pt-4">
                <h6 className="text-1xl font-semibold text-center dark:text-white">Or with</h6>
                <div className="flex justify-center">
                  <FacebookLogin
                    appId={process.env.REACT_APP_FB_APP_ID}
                    textButton=""
                    fields="name,email"
                    scope={process.env.REACT_APP_FB_APP_SCOPES}
                    cssClass="pt-4 mb-10"
                    callback={responseFacebook}
                    icon={<img width={'50px'} src={Facebook}></img>}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
