import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateProfile } from 'stores/user';
import { InputLabel } from 'common';
import * as yup from 'yup';
import { useFormik } from 'formik';
// import { toast } from 'react-toastify';

const EditAi = ({ user }) => {
  const dispatch = useDispatch();

  const validationSchema = yup.object().shape({
    ainame: yup
      .string()
      .min(4, 'at least 4 chars')
      .matches(
        /^[a-zA-Z0-9]{1}.[a-zA-Z0-9-_]*$/,
        'Ainame can only contain letters, numbers and dashes'
      )
      .required('Ainame is required'),
    name: yup.string().required('Name is required')
  });

  const formik = useFormik({
    initialValues: {
      ainame: '',
      name: ''
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(updateProfile(values));
    }
  });

  useEffect(() => {
    if (user) {
      formik.setValues({
        ainame: user.ainame || '',
        name: user.name || ''
      });
    }
  }, [user]);

  const { values, errors, handleChange, handleSubmit } = formik;
  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <div className="w-full mb-4 flex items-center">
          {user && user.avatar ? (
            <img
              alt="avatar"
              src={user.avatar.Location}
              className="object-cover w-20 h-20 overflow-hidden rounded-full"
            />
          ) : (
            <img
              alt="avatar"
              src="https://mymarvin-storage.s3.amazonaws.com/ai_profile/default_logo.png"
              className="object-contain w-20 h-20 overflow-hidden "
            />
          )}

          <button className="px-4 py-1 text-sm ml-4 border rounded-md">Edit</button>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <InputLabel
            label="Ainame"
            name="ainame"
            value={values.ainame}
            placeholder="Ainame"
            onChange={handleChange}
            error={errors.ainame}
            help={errors.ainame}
            disabled={true}
          />
          <InputLabel
            label="Name"
            placeholder="Name"
            name="name"
            value={values.name}
            onChange={handleChange}
            error={errors.name}
            help={errors.name}
            disabled={true}
          />
        </div>

        <div className="mt-4 text-center ">
          <button
            type="submit"
            className="px-8 py-2 text-base font-medium text-white bg-green-600 rounded-md "
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

EditAi.propTypes = {
  user: PropTypes.object
};

export default EditAi;
