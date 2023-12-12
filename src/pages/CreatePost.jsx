import { Modal } from 'common';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { ImSpinner } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { isUrlValid } from 'hooks/helper';

import { postFacebookFeed, getFacebookFeed, postImage, putFacebookFeet } from 'stores/facebook';

import { ReactComponent as TrashIcon } from 'assets/images/trashIcon.svg';

export const CreatePost = ({
  modal,
  onClose,
  title,
  pageId,
  page,
  pageSize,
  dataPost,
  isEdit,
  pageAccessToken
}) => {
  const dispatch = useDispatch();
  const { loadingImage } = useSelector((state) => state.facebookStore);
  const [data, setData] = useState({ message: '', link: '', images: [] });

  const onChange = (e) => {
    setData((pre) => ({
      ...pre,
      [e.target.name]: e.target.value
    }));
  };

  const onChangeImage = (e) => {
    if (data.images.length <= 5) {
      const file = e.target.files[0];
      dispatch(
        postImage({
          data: { file: file },
          callback: (url) => {
            setData((pre) => ({
              ...pre,
              images: data.images.concat(url)
            }));
          }
        })
      );
    } else {
      toast.warn('You can only upload 6 images');
    }
  };

  const onRemoveImg = (index) => () => {
    setData((pre) => ({
      ...pre,
      images: data.images.filter((item, indexof) => indexof !== index)
    }));
  };

  const callback = () => {
    onClose();
    dispatch(
      getFacebookFeed({
        page: page,
        perPage: pageSize,
        pageId
      })
    );
  };

  const onAddPost = () => {
    if (data.message.trim() === '') {
      toast.error('Please enter message');
    } else if (data.link.trim() === '' && data.images.length === 0) {
      toast.error('Please enter link or images');
    } else if (data.link !== '' && !isUrlValid(data.link)) {
      toast.error('The link is not a URL');
    } else {
      if (isEdit) {
        dispatch(
          putFacebookFeet({
            feedId: dataPost?._id,
            data: {
              message: data.message,
              link: data.link,
              images: data.images,
              pageAccessToken
            },
            callback
          })
        );
      } else {
        dispatch(
          postFacebookFeed({
            data: {
              message: data.message,
              link: data.link,
              images: data.images,
              pageId
            },
            callback
          })
        );
      }
    }
  };

  useEffect(() => {
    if (!modal) {
      setData({ message: '', link: '', images: [] });
    }
  }, [modal]);

  useEffect(() => {
    if (dataPost) {
      setData({
        message: dataPost.message,
        link: dataPost.link,
        images: dataPost.images
      });
    }
  }, [dataPost]);

  const renderImg = (image, index) => (
    <div className="mb-4" key={index}>
      <div className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat h-16">
        <img src={image} alt="image" width="100" height="60" className="h-16" />
        <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-indigo-700 bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-50">
          <button
            className="text-center item-center mt-6 text-white"
            onClick={onRemoveImg(index)}
            disabled={isEdit && dataPost?.isPublished}
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </div>
  );

  const contentCreate = (
    <div>
      <div className="relative dark:rounded-md dark:shadow-sm my-2">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-left text-white">
          Message
        </span>
        <textarea
          name="message"
          value={data.message}
          onChange={onChange}
          className="block w-full px-3 sm:px-4 py-2 sm:py-4 px-6 text-left font-medium text-black dark:text-white text-base sm:text-1xl border-gray-300 placeholder:text-[#697586] bg-white border dark:bg-[#202939] pl rounded-lg focus:border-indigo-500 focus:ring-indigo-500"
          rows="6"
          cols="50"
        />
      </div>
      <div className="relative dark:rounded-md dark:shadow-sm my-2">
        <span className="block text-left text-white">Link</span>
        <input
          value={data.link}
          name="link"
          type="url"
          placeholder="https://example.com"
          onChange={onChange}
          disabled={data.images.length !== 0 || (isEdit && dataPost?.isPublished)}
          className="block w-full px-3 sm:px-4 py-2 sm:py-4 px-6 text-left font-medium text-black dark:text-white text-base sm:text-1xl border-gray-300 placeholder:text-[#697586] bg-white border dark:bg-[#202939] pl rounded-lg focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div className="relative dark:rounded-md dark:shadow-sm">
        <span className="block text-left text-white">Upload images</span>
        <div className="block item-left bg-white w-1/4 mt-2 p-1 rounded-md">
          <label className="w-full">
            Choose file
            <input
              type="file"
              hidden
              onChange={onChangeImage}
              disabled={data.link !== '' || (isEdit && dataPost?.isPublished)}
            />
          </label>
        </div>
        <div className="flex gap-2 mt-2">
          {loadingImage ? (
            <div className="text-sm text-gray-500 text-center item-center w-full">
              <ImSpinner className="loader ease-linear  mx-auto text-2xl" />
            </div>
          ) : (
            data.images.map(renderImg)
          )}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex items-center justify-center mt-4">
          <button
            className="box-border px-4 py-2 text-red-600 bg-white rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="py-2 px-4 rounded-md bg-[#1570EF] text-white font-medium ml-4"
            onClick={onAddPost}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <Modal open={modal} onClose={onClose} title={title} content={contentCreate} actions={null} />
  );
};

CreatePost.propTypes = {
  modal: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  pageId: PropTypes.string,
  page: PropTypes.number,
  pageSize: PropTypes.number,
  dataPost: PropTypes.any,
  isEdit: PropTypes.bool,
  pageAccessToken: PropTypes.string
};
