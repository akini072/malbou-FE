/* eslint-disable no-useless-escape */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, resetUser, updatePassword } from 'stores/user';
import { InputLabel } from 'common';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

import EditInfo from 'components/user/EditInfo';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isUpdatedPassword } = useSelector((state) => state.userStore);

  const validationSchema = yup.object().shape({
    password: yup.string().required('Password is required'),
    re_password: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      re_password: ''
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(updatePassword({ newPassword: values.password }));
    }
  });

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  useEffect(() => {
    if (isUpdatedPassword) {
      toast.success('Updated password successfully!');
      formik.resetForm({});
      dispatch(getProfile());
    }

    return () => {
      dispatch(resetUser());
    };
  }, [isUpdatedPassword]);

  useEffect(() => {
    if (user) {
      if (!user.verify) {
        return navigate('/welcome');
      }
    }
  }, [user]);

  const { values, errors, handleSubmit, handleChange } = formik;

  return (
    <div className="w-full">
      <div className="w-full px-4 py-10 pb-20 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-20">
        <div className="w-full max-w-4xl mx-auto rounded-xl">
          <h3 className="pb-2 mb-6 font-semibold border-b border-gray-300 text-md md:text-2xl">
            Settings
          </h3>

          <EditInfo user={user} />

          <h3 className="pb-2 mb-6 font-semibold border-b border-gray-300 text-md md:text-2xl mt-14">
            Change Password
          </h3>
          <div className="w-full">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-8">
                <InputLabel
                  type="password"
                  label="New Password"
                  placeholder="New Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  error={errors.password}
                  help={errors.password}
                />
                <InputLabel
                  type="password"
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  name="re_password"
                  value={values.re_password}
                  onChange={handleChange}
                  error={errors.re_password}
                  help={errors.re_password}
                />
              </div>

              <div className="mt-4 text-center ">
                <button
                  type="submit"
                  className="px-8 py-2 text-base font-medium text-white bg-green-600 rounded-md "
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
