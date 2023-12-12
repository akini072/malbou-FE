import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMessageDetail, resetMessage } from 'stores/message';
import { createShared } from 'stores/share';

import Background from 'assets/images/get-started.png';
import { useWindowSize } from 'hooks/useWindowSize';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'react-toastify';
// import { copyImageToClipboard } from 'copy-image-clipboard';
import { Modal } from 'common';
import CreatableSelect from 'react-select/creatable';
import { createTag, getTags, resetTag } from 'stores/tag';
import { createSaved, resetSaved } from 'stores/saved';

const MessageDetail = () => {
  const navigate = useNavigate();
  const [width] = useWindowSize();
  const { msgId, roomId } = useParams();
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.messageStore);
  console.log(message);
  const [linkShare, setLinkShare] = useState('');
  const [openSave, setOpenSave] = useState(false);
  const [selected, setSelected] = useState([]);
  const [values, setValues] = useState([]);
  const { tags, loading, isCreated, tag } = useSelector((state) => state.tagStore);
  const [save, setSave] = useState(null);
  const { isSaved } = useSelector((state) => state.savedStore);

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getMessageDetail(msgId));
    createLinkShare();

    return () => {
      dispatch(resetMessage());
    };
  }, []);

  const createLinkShare = async () => {
    const shared = await dispatch(createShared({ id: msgId, type: 'message' }));
    console.log(shared.payload);

    if (shared.payload._id) {
      const text = `${process.env.REACT_APP_BUSINESS_URL}/shared/${shared.payload._id}`;
      console.log('text');
      setLinkShare(text);
    }
  };

  useEffect(() => {
    if (isCreated === true) {
      dispatch(getTags());
      const newValues = values;
      newValues.push(tag);
      setValues(newValues);
      console.log(newValues);
    }
    return () => {
      dispatch(resetTag);
    };
  }, [isCreated]);

  const shareMessage = async () => {
    navigator.clipboard.writeText(linkShare);
    toast.success(linkShare);
  };

  // const contentCopy = async () => {
  //   if (message.type == 'images') {
  //     //const img = await fetch(saved.value);
  //     //const imgBlob = await img.blob();
  //     console.log('der: ', message);

  //     // const data = await fetch(saved.value);
  //     // const blob = await data.blob();
  //     // console.log('blob: ', blob);
  //     // await navigator.clipboard.write([
  //     //   new ClipboardItem({
  //     //     [blob.type]: blob
  //     //   })
  //     // ]);
  //     // console.log('Image copied!');
  //     // toast.success('The Image is copied!');

  //     const value =
  //       (message?.image && `${process.env.REACT_APP_CLOUNDFRONT_AWS}${message?.image.Key}`) || '';
  //     copyImageToClipboard(value)
  //       .then(() => {
  //         toast.success('The Image is copied!');
  //       })
  //       .catch((e) => {
  //         console.log('Error: ', e.message);
  //       });
  //   } else {
  //     const text = (message?.response && message?.response.choices[0].text) || '';
  //     navigator.clipboard.writeText(text);
  //     toast.success('The chat is copied!');
  //   }
  // };

  const handleToggleModal = () => {
    setOpenSave(!openSave);
    setValues([]);
    setSelected([]);
  };

  const handleChangeTag = (newValue) => {
    setValues(newValue);
    setSelected(newValue);
  };

  const handleCreate = async (create) => {
    const res = await dispatch(
      createTag({
        label: create,
        value: create
      })
    );
    const selecteTemp = selected;
    if (selected.length == 0) {
      selecteTemp.push(res.payload);
    }
    setValues(selecteTemp);
    setSelected(selecteTemp.push(res.payload));
  };
  const handleSave = (message, type) => {
    let data;
    if (message.type === 'images') {
      data = process.env.REACT_APP_CLOUNDFRONT_AWS + message.image.Key;
    } else {
      data = message.response.choices[0].text;
    }
    handleToggleModal();
    dispatch(getTags());
    setSave({
      type,
      prompt: message.prompt,
      value: data,
      roomId
    });
  };
  useEffect(() => {
    if (isSaved) {
      handleToggleModal();
      navigate('/saved');
    }
    return () => {
      dispatch(resetSaved());
    };
  }, [isSaved]);
  const onSaveMessage = () => {
    let ids = [];
    selected.forEach((el) => {
      ids.push(el._id);
    });
    console.log(ids);

    dispatch(
      createSaved({
        ...save,
        tags: ids
      })
    );
  };
  return (
    <div
      className="w-full relative !bg-cover overflow-auto"
      style={{
        background: `url(${Background}) no-repeat center bottom`,
        height: `calc(100vh - ${width > 640 ? '117px' : '69px'})`
      }}
    >
      <div className="flex items-center justify-center p-6">
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

        <h3 className="font-bold text-sm text-black dark:text-[#F9F5FF] mx-auto max-w-[150px] overflow-hidden whitespace-nowrap truncate">
          {message?.prompt || 'unknown title'}
        </h3>

        <button onClick={() => shareMessage()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
        </button>
      </div>

      <div className="px-4 sm:px-6">
        {message && (message.type === 'text' || message.type === 'chat') ? (
          <div className="w-full overflow-hidden rounded-lg p-4 border border-gray-400 dark:border-gray-50 h-[200px] overflow-y-auto bg-gray-50 dark:bg-[#202939]">
            <p>{(message?.response && message?.response.choices[0].text) || ''}</p>
          </div>
        ) : (
          <div className="w-full overflow-hidden rounded-lg">
            <img
              alt="dser"
              src={
                (message?.image &&
                  `${process.env.REACT_APP_CLOUNDFRONT_AWS}${message?.image.Key}`) ||
                ''
              }
              className="w-full"
            />
          </div>
        )}

        <h3 className="mt-3 mb-2 text-2xl font-semibold">{message?.prompt || 'unknown title'}</h3>
        <div className="flex justify-between">
          <p className="text-[12px] text-gray-600 dark:text-[#9AA4B2]">
            {message?.type || ''} &sdot;{' '}
            {formatDistanceToNow(
              message?.createdAt ? new Date(message?.createdAt) : new Date()
            ).toString()}
          </p>
          <button
            className="text-black dark:text-[#EEF2F6]"
            onClick={() => handleSave(message, message.type)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
              />
            </svg>
          </button>
        </div>
        <p className="text-base text-black dark:text-[#EEF2F6] my-6">{message?.roomId?.title}</p>

        {/* <div className="flex items-center mb-2">
          <h4 className="text-lg font-semibold">Ideas</h4>
          <button className="font-semibold text-sm text-[#53B1FD] ml-auto inline-flex items-center">
            <FaDiceFive className="mr-2 text-lg" /> Randomise
          </button>
        </div>

        <div className="grid w-full grid-cols-2 gap-4">
          <div>
            <div className="w-full overflow-hidden rounded-lg">
              <img alt="" src={Feed2} className="w-full" />
            </div>
            <h4 className="my-2 text-sm font-semibold">Order a gift card</h4>
            <p className="text-[12px] text-gray-600 dark:text-[#9AA4B2]">£4.99 &sdot; Moonpig</p>
          </div>
          <div>
            <div className="w-full overflow-hidden rounded-lg">
              <img alt="" src={Feed3} className="w-full" />
            </div>
            <h4 className="my-2 text-sm font-semibold">Order a print</h4>
            <p className="text-[12px] text-[#9AA4B2]">£4.99 &sdot; Vistaprint</p>
          </div>
        </div> */}
        <Modal
          title="Save"
          open={openSave}
          onClose={handleToggleModal}
          onSave={handleToggleModal}
          content={
            <div className="w-full max-w-[300px] mx-auto text-[#9AA4B2]">
              <button className="absolute z-10 top-4 right-4" onClick={handleToggleModal}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <p className="mb-4 text-white">Add a tag to save your content</p>
              <CreatableSelect
                id="tab-select"
                // defaultValue={[options[0]]}
                isClearable
                isMulti
                isLoading={loading}
                onChange={handleChangeTag}
                onCreateOption={handleCreate}
                value={values}
                name="colors"
                options={tags}
                className="multi-select"
                classNamePrefix="select"
              />
            </div>
          }
          actions={
            <div className="w-full mb-8 text-center bg-none">
              {/* <button className="w-full py-2 px-6 rounded-3xl bg-[#4B5565] text-sm text-white">
                Cancel
              </button> */}
              <button
                disabled={selected.length === 0}
                className="py-2 px-6 bg-[#1570EF] text-sm text-white rounded-3xl"
                onClick={onSaveMessage}
              >
                Save
              </button>
            </div>
          }
        />
        <div>
          <button
            type="submit"
            className="w-full bg-[#1570EF] rounded-full overflow-hidden p-3 mt-6 text-white text-lg font-medium"
            onClick={() => shareMessage()}
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageDetail;
