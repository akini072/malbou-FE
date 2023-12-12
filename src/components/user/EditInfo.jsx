import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, resetUser } from 'stores/user';
import { InputLabel } from 'common';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

const EditInfo = ({ user }) => {
  const dispatch = useDispatch();
  const uploadRef = useRef(null);
  const { isUpdatedProfile } = useSelector((state) => state.userStore);

  const [avatar, setAvatar] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);

  const validationSchema = yup.object().shape({
    email: yup.string().email('Email invalid').required('Email is required'),
    // ainame: yup
    //   .string()
    //   .min(4, 'at least 4 chars')
    //   .matches(
    //     /^[a-zA-Z0-9]{1}.[a-zA-Z0-9-_]*$/,
    //     'Ainame can only contain letters, numbers and dashes'
    //   )
    //   .required('Ainame is required'),
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required')
  });

  const formik = useFormik({
    initialValues: {
      ainame: '',
      name: '',
      email: '',
      firstName: '',
      lastName: ''
      // password: '',
      // re_password: ''
    },
    validationSchema,
    onSubmit: (values) => {
      const fd = new FormData();
      fd.append('ainame', values.ainame);
      fd.append('name', values.name);
      fd.append('email', values.email);
      fd.append('firstName', values.firstName);
      fd.append('lastName', values.lastName);
      avatar && fd.append('avatar', avatar);
      dispatch(updateProfile(fd));
    }
  });

  const handleTriggerUpload = () => {
    if (uploadRef && uploadRef.current) {
      uploadRef.current.click();
    }
  };

  const handleChangeFile = async (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.size > 2e6) {
        toast.warn('Please upload a file smaller than 2 MB');
        return false;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgSrc(reader.result);
      };
      reader.readAsDataURL(file);
      setAvatar(file);
    }
  };

  const handleRemove = () => {
    setAvatar(null);
    setImgSrc(null);
  };

  useEffect(() => {
    if (isUpdatedProfile) {
      setAvatar(null);
      setImgSrc(null);
    }

    return () => {
      dispatch(resetUser());
    };
  }, [isUpdatedProfile]);

  useEffect(() => {
    if (user) {
      formik.setValues({
        ainame: user.ainame || '',
        name: user.name || '',
        email: user.email || '',
        firstName: user.firstName || '',
        lastName: user.lastName || ''
      });
    }
  }, [user]);

  const { values, errors, handleChange, handleSubmit } = formik;
  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <div className="w-full mb-4 flex items-center">
          {avatar && imgSrc ? (
            <div className="w-20 h-20 overflow-hidden rounded-full">
              <img className="w-full h-full object-cover" alt="avatar" src={imgSrc} />
            </div>
          ) : user && user.avatar ? (
            <img
              alt="avatar"
              src={user.avatar.Location}
              className="object-cover w-20 h-20 overflow-hidden rounded-full"
            />
          ) : (
            <img
              alt="avatar"
              src="https://mymarvin-storage.s3.amazonaws.com/ai_profile/default_logo.png"
              className="object-contain w-20 h-20 overflow-hidden"
            />
          )}

          <button
            type="button"
            className="px-4 py-1 text-sm ml-4 border rounded-md"
            onClick={handleTriggerUpload}
          >
            Edit
          </button>

          {avatar && imgSrc && (
            <button
              type="button"
              className="px-4 py-1 text-sm ml-4 border rounded-md border-red-600 text-red-600"
              onClick={handleRemove}
            >
              Remove
            </button>
          )}

          <div className="absolute -z-10 w-0 h-0 overflow-hidden">
            <input
              ref={uploadRef}
              onChange={handleChangeFile}
              type="file"
              accept="image/png, image/jpg, image/jpeg"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          <InputLabel
            label="MyMarvin"
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
          {/* <InputLabel
            label="Ainame"
            name="ainame"
            value={values.ainame}
            placeholder="Ainame"
            onChange={handleChange}
            error={errors.ainame}
            help={errors.ainame}
          /> */}
          <InputLabel
            label="Email"
            name="email"
            value={values.email}
            placeholder="Email"
            onChange={handleChange}
            error={errors.email}
            help={errors.email}
            disabled={true}
          />
          <InputLabel
            label="First Name"
            placeholder="First Name"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            error={errors.firstName}
            help={errors.firstName}
          />
          <InputLabel
            label="Last Name"
            placeholder="Last Name"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            error={errors.lastName}
            help={errors.lastName}
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

EditInfo.propTypes = {
  user: PropTypes.object
};

export default EditInfo;
