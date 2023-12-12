import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BsChevronLeft } from 'react-icons/bs';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { Input } from 'common';
import { GrLinkTop } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { createAi, reset } from 'stores/auth';
import { toast } from 'react-toastify';

import Background from 'assets/images/get-started.png';

const CreateAi = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const uploadRef = useRef(null);
  const { isCreatedAi } = useSelector((state) => state.authStore);

  const [avatar, setAvatar] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);

  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    ainame: yup.string().required('Ainame is required')
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

  const handleBack = () => {
    navigate('/');
  };

  useEffect(() => {
    localStorage.setItem('mymarvin_token', token);
  }, []);

  useEffect(() => {
    if (isCreatedAi) {
      toast.success('Created your Ai successfully');
      navigate('/auth/verify-account');
    }

    return () => {
      dispatch(reset());
    };
  }, [isCreatedAi]);

  return (
    <div
      className="w-full min-h-screen !bg-contain px-6 py-6"
      style={{
        background: `url(${Background}) no-repeat center 140%`
      }}
    >
      <div className="w-full">
        <div className="w-full">
          <div className="w-full mb-6">
            <button onClick={handleBack} className="w-8 h-8">
              <BsChevronLeft />
            </button>
          </div>

          <div className="w-full">
            <h2 className="mb-10 text-3xl font-semibold text-center dark:text-white">
              Create your AI
            </h2>

            <Formik
              initialValues={{
                name: '',
                ainame: ''
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                const fd = new FormData();
                fd.append('name', values.name);
                fd.append('ainame', values.ainame);
                fd.append('avatar', avatar);
                fd.append('token', token);
                dispatch(createAi(fd));
              }}
            >
              {({ values, errors, handleSubmit, handleChange }) => {
                return (
                  <Form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <Input
                      placeholder="Name your AI"
                      name="name"
                      type="text"
                      value={values.name}
                      onChange={handleChange}
                      help={errors.name}
                      error={errors.name ? true : false}
                      text="Example: Robby"
                    />

                    <Input
                      placeholder="Ainame"
                      name="ainame"
                      type="text"
                      value={values.ainame}
                      onChange={handleChange}
                      help={errors.ainame}
                      error={errors.ainame ? true : false}
                      text="Example: robbyai"
                    />

                    <div className="relative">
                      <div
                        onClick={handleTriggerUpload}
                        className="flex cursor-pointer items-center shadow-sm border-gray-300 justify-center w-full bg-white border py-2 px-3 sm:px-4 sm:py-4 dark:bg-[#202939] rounded-lg upload"
                      >
                        <GrLinkTop className="text-[#697586] mr-2" style={{ fill: '#697586' }} />
                        <p className="text-[#697586] text-base sm:text-2xl font-medium">
                          Upload profile photo
                        </p>
                      </div>
                      <p className="text-center text-[#697586] mt-1">(Optional)</p>

                      <div className="absolute -z-10 w-0 h-0 overflow-hidden">
                        <input
                          ref={uploadRef}
                          onChange={handleChangeFile}
                          type="file"
                          accept="image/png, image/jpg, image/jpeg"
                        />
                      </div>

                      {avatar && imgSrc && (
                        <div className="w-20 h-20 mx-auto overflow-hidden rounded-full mt-4">
                          <img className="w-full h-full object-cover" alt="avatar" src={imgSrc} />
                        </div>
                      )}
                    </div>

                    <div>
                      <button
                        type="submit"
                        disabled={!avatar}
                        className="w-full bg-[#1570EF] rounded-full overflow-hidden p-3 mt-12 text-white text-lg font-medium"
                      >
                        Create Ai
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAi;
