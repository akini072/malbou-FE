import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { Input } from 'common';
import { useDispatch, useSelector } from 'react-redux';
import { sendMailReset, reset } from 'stores/auth';
import { toast } from 'react-toastify';

import Background from 'assets/images/get-started.png';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSentMail } = useSelector((state) => state.authStore);

  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required')
  });

  const handleBack = () => {
    navigate('/');
  };

  useEffect(() => {
    if (isSentMail) {
      toast.success('Please check your email to update your new password');
      navigate('/');
    }
  }, [isSentMail]);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, []);

  return (
    <div
      className="relative py-6 flex items-center !bg-contain w-full min-h-screen px-6 overflow-hidden"
      style={{
        background: `url(${Background}) no-repeat center bottom`
      }}
    >
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
        <h2 className="text-3xl font-semibold text-center dark:text-white">Reset password</h2>

        <Formik
          initialValues={{
            email: ''
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log('values: ', values);
            dispatch(sendMailReset(values.email));
          }}
        >
          {({ values, errors, handleSubmit, handleChange }) => {
            return (
              <Form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <Input
                  placeholder="name@email.com"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  help={errors.email}
                />

                <div className="">
                  <button
                    type="submit"
                    className="w-full bg-[#1570EF] rounded-full p-3 mt-8 text-white text-lg font-medium"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPassword;
