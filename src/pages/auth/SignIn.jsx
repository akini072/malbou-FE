import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { Input } from 'common';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from 'stores/auth';
import { toast } from 'react-toastify';

import Background from 'assets/images/get-started.png';

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authStore);

  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required')
  });

  const handleBack = () => {
    navigate('/');
  };

  useEffect(() => {
    if (user && user.token) {
      localStorage.setItem('mymarvin_token', user.token);
      localStorage.setItem('mymarvin_logged', true);
    }
    if (user && user.verify && user.ainame) {
      toast.success('Login successfully!');
      window.location.href = '/home';
    } else if (user && !user.verify) {
      // navigate('/welcome');
      window.location.href = '/welcome';
    } else if (user && !user.ainame) {
      // navigate(`/create-ai?token=${user.token}`);
      window.location.href = `/auth/create-ai?token=${user.token}`;
    }
    return () => {
      dispatch(reset());
    };
  }, [user]);

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
        <h2 className="text-3xl font-semibold text-center dark:text-white">Sign In</h2>

        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            dispatch(login(values));
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

                <Input
                  placeholder="Your password"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  help={errors.password}
                  error={errors.password}
                />

                <div className="">
                  <button
                    type="submit"
                    className="w-full bg-[#1570EF] rounded-full p-3 mt-8 text-white text-lg font-medium"
                  >
                    Sign in
                  </button>
                  <div className="text-center mt-2">
                    <Link to="/auth/forgot-password" className="text-[#1570EF] font-medium">
                      Forgot password
                    </Link>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default SignIn;
