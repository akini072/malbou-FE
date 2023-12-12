import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, InputLabel } from 'common';
import { useDispatch, useSelector } from 'react-redux';
import { register } from 'stores/auth';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isRegister } = useSelector((state) => state.authStore);

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

  useEffect(() => {
    if (isRegister) {
      toast.success('Register successfully!');
      navigate('/welcome');
    }
  }, [isRegister]);

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
                  Sign up to your account
                </h2>
              </div>
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
                    <Form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                      <InputLabel
                        label="Email address"
                        placeholder="Email address"
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        help={errors.email}
                      />

                      <InputLabel
                        label="Password"
                        placeholder="Password"
                        name="password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        help={errors.password}
                        error={errors.password}
                      />
                      <InputLabel
                        label="Re-Password"
                        placeholder="Confirm Password"
                        name="re_password"
                        type="password"
                        value={values.re_password}
                        onChange={handleChange}
                        help={errors.re_password}
                        error={errors.re_password}
                      />

                      <InputLabel
                        label="First Name"
                        placeholder="First Name"
                        name="firstName"
                        type="text"
                        value={values.firstName}
                        onChange={handleChange}
                        help={errors.firstName}
                        error={errors.firstName}
                      />

                      <InputLabel
                        label="Last Name"
                        placeholder="Last Name"
                        name="lastName"
                        type="text"
                        value={values.lastName}
                        onChange={handleChange}
                        help={errors.lastName}
                        error={errors.lastName}
                      />

                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <Link
                            to="/auth/login"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Do you already have an account? Sign in now!
                          </Link>
                        </div>
                      </div>

                      <div>
                        <button
                          type="submit"
                          className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Sign up
                        </button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>

              {/* <form className="mt-8 space-y-6" action="#" method="POST">
                <InputLabel
                  label="Email address"
                  placeholder="Email address"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                />

                <InputLabel
                  label="Password"
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                />

                <InputLabel
                  label="Re-Password"
                  placeholder="Confirm Password"
                  name="re_password"
                  type="password"
                  value={values.re_password}
                  onChange={handleChange}
                />

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <Link
                      to="/auth/login"
                      className="font-medium text-indigo-600 hover:text-indigo-500">
                      Do you already have an account? Sign in now!
                    </Link>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <LockClosedIcon
                        className="w-5 h-5 text-indigo-500 group-hover:text-indigo-400"
                        aria-hidden="true"
                      />
                    </span>
                    Sign up
                  </button>
                </div>
              </form> */}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;
