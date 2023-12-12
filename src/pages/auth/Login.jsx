import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, InputLabel } from 'common';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from 'stores/auth';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';

const Login = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authStore);

  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required')
  });

  useEffect(() => {
    if (user) {
      //toast.success('Login successfully!');
      localStorage.setItem('mymarvin_token', user.token);
      window.location.href = user.verify ? `/` : '/welcome';
    }
    localStorage.setItem('visited', false);
    return () => {
      dispatch(reset());
    };
  }, [user]);

  return (
    <div className="w-full">
      <div className="w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Card>
          <div className="flex items-center justify-center min-h-full px-4 py-4 sm:py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
              <div>
                <img
                  className="w-auto h-12 mx-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt="Your Company"
                />
                <h2 className="mt-6 text-xl font-bold tracking-tight text-center text-gray-900 sm:text-3xl">
                  Sign in to your account
                </h2>
                <p className="mt-2 text-sm text-center text-gray-600">
                  Or{' '}
                  <Link
                    to="/auth/register"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    start your 14-day free trial
                  </Link>
                </p>
              </div>
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
                {({ values, errors, touched, handleSubmit, handleChange }) => (
                  <Form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <InputLabel
                      label="Email address"
                      placeholder="Email address"
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      help={errors.email}
                      error={errors.email && touched.email}
                    />

                    <InputLabel
                      label="Password"
                      placeholder="Password"
                      name="password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      help={errors.password}
                      error={errors.password && touched.password}
                    />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <InputLabel
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-900">
                          Remember me
                        </label>
                      </div>

                      <div className="text-sm">
                        <Link
                          to="/auth/forgot-password"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Sign in
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
