import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { Input } from 'common';
import { useDispatch, useSelector } from 'react-redux';
import { updateNewPassword, reset } from 'stores/auth';
import { toast } from 'react-toastify';

import Background from 'assets/images/get-started.png';

const NewPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { isUpdatedPassword } = useSelector((state) => state.authStore);

  const validationSchema = yup.object().shape({
    password: yup.string().required('Password is required'),
    re_password: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Password is required')
  });

  const handleBack = () => {
    navigate('/');
  };

  useEffect(() => {
    if (isUpdatedPassword) {
      toast.success('Password is updated');
      navigate('/auth/login');
    }
    return () => {
      dispatch(reset());
    };
  }, [isUpdatedPassword]);

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
        <h2 className="text-3xl font-semibold text-center dark:text-white">New password</h2>

        <Formik
          initialValues={{
            password: '',
            re_password: ''
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log('values: ', values);
            dispatch(updateNewPassword({ token, password: values.password }));
          }}
        >
          {({ values, errors, handleSubmit, handleChange }) => {
            return (
              <Form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <Input
                  placeholder="New password"
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

                <div className="">
                  <button
                    type="submit"
                    className="w-full bg-[#1570EF] rounded-full p-3 mt-8 text-white text-lg font-medium"
                  >
                    Update
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

export default NewPassword;
