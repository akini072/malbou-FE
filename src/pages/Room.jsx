/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import Axios from 'config/axios';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getMessageOfRoom, resetRoom, addQuestionToResponses, createMessage } from 'stores/room';
import { useWindowSize } from 'hooks/useWindowSize';
import { ThreeDots, Modal } from 'common';
import { getProfile } from 'stores/user';
import { getTags, createTag, resetTag } from 'stores/tag';
import { createSaved, resetSaved } from 'stores/saved';
import { createShared } from 'stores/share';
import { toast } from 'react-toastify';
// import { isMobile } from 'react-device-detect';
import { shareOnMobile } from 'react-mobile-share';
// import { RWebShare } from 'react-web-share';
import CreatableSelect from 'react-select/creatable';
import Message from 'components/chat/Message';
import { RxReload } from 'react-icons/rx';

import { ReactComponent as ChatsIcon } from 'assets/images/logo-white.svg';
import Background from 'assets/images/get-started.png';

const Room = ({ id, type }) => {
  const navigate = useNavigate();
  const messageRef = useRef(null);
  const endRef = useRef(null);
  const [width] = useWindowSize();
  const roomId = useParams().roomId ? useParams().roomId : id;
  const dispatch = useDispatch();
  const { messages, isSent, room, newMessage, sending, initLoading } = useSelector(
    (state) => state.roomStore
  );
  const { user } = useSelector((state) => state.userStore);
  const { tags, loading, isCreated, tag } = useSelector((state) => state.tagStore);
  const { isSaved, saved } = useSelector((state) => state.savedStore);
  const [open, setOpen] = useState(false);

  const [prompt, setPrompt] = useState('');
  const [title, setTitle] = useState(roomId === 'new' ? 'New Subject' : '');
  const [openSave, setOpenSave] = useState(false);
  const [selected, setSelected] = useState([]);
  const [values, setValues] = useState([]);
  const [save, setSave] = useState(null);
  const [offsetY, setOffSetY] = useState(0);
  const [messageHeight, setMessageHeight] = useState(0);
  const [isTop, setIsTop] = useState(false);
  const [heightBox, setHeightBox] = useState(0);
  const [fullHeight, setFullHeight] = useState(0);
  const [limit, setLimit] = useState(5);
  const [disabledScroll, setDisabledScroll] = useState(false);
  const [latestMsg, setLatestMsg] = useState(messages.length > 0 ? messages[0].prompt : '');
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 5,
    page: 1
  });

  const scrollToEnd = () => {
    setTimeout(() => {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 1200);
  };

  const handleChangeScroll = (event) => {
    if (messageRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messageRef.current;
      setHeightBox(clientHeight);
      setFullHeight(scrollHeight);
      if (scrollTop + clientHeight < scrollHeight - 200) {
        setIsTop(true);
      } else {
        setIsTop(false);
      }

      if (scrollTop === 0 && messages.length === pagination.limit) {
        // setDisabledScroll(true);
        // messageRef.current.addEventListener('DOMNodeRemoved', (event) => {
        //   console.log('remove!!!! ', disabledScroll);
        //   const { currentTarget: target } = event;
        //   target.scroll({ top: 0, behavior: 'smooth' });
        // });
        setPagination({
          ...pagination,
          page: pagination.page + 1
        });
      }
    }
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
    //setSelected(selecteTemp.push(res.payload));
  };

  const handleChangeTag = (newValue) => {
    setValues(newValue);
    setSelected(newValue);
  };

  const handleSend = async () => {
    const balance = await getCredit();
    if (balance > 0) {
      if (prompt.trim().length > 0) {
        const results = data.concat([
          {
            type: room.type,
            prompt
          }
        ]);
        setData(results);
        // dispatch(addQuestionToResponses(results));
        dispatch(
          createMessage({
            roomId: roomId,
            prompt,
            type: room.type
          })
        );
        setPrompt('');
        scrollToEnd();
      }
    } else {
      //toast.error("Sorry, you don't have enough credits.");
      setOpen(true);
    }
  };

  const handleReload = () => {
    setPrompt(latestMsg);
  };

  const handleChangeText = (event) => {
    const { value } = event.target;
    setPrompt(value);
  };

  const handleKeyUp = (event) => {
    if (event.key == 'Enter') {
      handleSend();
    }
  };

  const handleShare = async (type, data, mess) => {
    if (type === 'images') {
      shareOnMobile({ images: data });
    } else {
      shareOnMobile({
        text: data
      });
    }
    const shared = await dispatch(createShared({ id: mess._id, type: 'message' }));
    if (shared.payload._id) {
      //navigate(`/shared/${shared.payload._id}+message`);
      const text = `${process.env.REACT_APP_BUSINESS_URL}/shared/${shared.payload._id}`;
      setTimeout(() => {
        navigator.clipboard.writeText(`${text}`);
        toast.success(`Share link copied! -${text}`);
      }, 200);
    }
  };

  const handleToggleModal = () => {
    setOpenSave(!openSave);
    setValues([]);
    setSelected([]);
  };

  const handleSave = (message, type, data) => {
    handleToggleModal();
    dispatch(getTags());
    setSave({
      type,
      prompt: message.prompt,
      value: data,
      roomId
    });
  };

  const handleView = (mess, type, data) => {
    console.log(mess);
    console.log(type);
    console.log(data);
    navigate(`/messages/${mess._id}/${roomId}`);
  };

  const onSaveMessage = () => {
    let ids = [];
    selected.forEach((el) => {
      ids.push(el._id);
    });
    dispatch(
      createSaved({
        ...save,
        tags: ids
      })
    );
  };

  const handleBack = () => {
    navigate('/lists');
  };

  useEffect(() => {
    if (endRef) {
      // messageRef.current.scrollIntoView({
      //   behavior: 'smooth',
      //   block: 'end',
      //   inline: 'nearest'
      // });
      scrollToEnd();
    }
  }, [endRef]);

  useEffect(() => {
    //console.log(messages, data, type, 'mess');
    setData([]);
    if (messages.length > 0) {
      const results = messages.concat(data);
      setData(results);
      const msg = data.length > 0 ? data[data.length - 1] : messages[messages.length - 1];
      setLatestMsg(msg.prompt);
    }
  }, [messages]);

  useEffect(() => {
    scrollToEnd();
  }, []);

  useEffect(() => {
    if (room && roomId !== 'new') {
      setTitle(room.title);
    }
  }, [isSent, room]);

  useEffect(() => {
    if (isSent && newMessage) {
      setLatestMsg(newMessage.prompt);

      const results = [];
      for (let i = 0; i < data.length; i++) {
        let el = data[i];
        if (i === data.length - 1) {
          el = newMessage;
        } else {
          el = data[i];
        }

        results.push(el);
      }
      setData(results);
      // dispatch(addQuestionToResponses(results));
      // dispatch(getProfile());
      scrollToEnd();
    }
  }, [newMessage, isSent]);

  useEffect(() => {
    if (!user) {
      dispatch(getProfile());
    } else if (user && !user.verify) {
      navigate('/welcome');
    }
  }, [user]);

  useEffect(() => {
    if (roomId) {
      dispatch(getMessageOfRoom({ roomId, type, pagination }));
    }
    return () => {
      dispatch(resetRoom());
    };
  }, [roomId, pagination]);

  const getCredit = async () => {
    const response = await Axios.get('/credit');
    return response.data.balance;
  };
  useEffect(() => {
    if (user && user.balance < 4) {
      toast.warn(`You only have ${user.balance} credits left. Please buy more credits to use`);
    }
    if (user.balance == 0) setOpen(true);
  }, [user]);

  useEffect(() => {
    if (isCreated === true) {
      dispatch(getTags());
      const newValues = values;
      newValues.push(tag);
      setValues(newValues);
    }
    return () => {
      dispatch(resetTag);
    };
  }, [isCreated]);

  useEffect(() => {
    if (isSaved) {
      handleToggleModal();
      navigate('/saved');
    }
    return () => {
      dispatch(resetSaved());
    };
  }, [isSaved]);

  // useEffect(() => {
  //   if (messageRef) {
  //     initScrollBottom();
  //   }
  // }, [messageRef.current]);

  const initScrollBottom = () => {
    // messageRef.current.addEventListener('DOMNodeInserted', (event) => {
    //   const { currentTarget: target } = event;
    //   target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
    // });
  };

  const handleToggleCreate = () => {
    // navigate('/chats/new')
    setOpen(!open);
  };

  const handleScrollBottom = () => {
    const { scrollHeight } = messageRef.current;
    messageRef.current.scrollTo({
      behavior: 'smooth',
      top: fullHeight === 0 ? scrollHeight : fullHeight
    });
  };

  return (
    <div
      className={`w-full relative !bg-cover overflow-hidden ${
        useParams().roomId ? 'pt-[80px]' : ''
      }`}
      style={{
        background: `url(${Background}) no-repeat center bottom`,
        height: `calc(100% - ${width > 768 ? '64px' : width > 640 ? '117px' : '74px'})`
      }}
    >
      {useParams().roomId && (
        <div
          className={`flex items-center bg-white dark:bg-[#121926] justify-center py-6 px-4 sm:px-6 fixed left-0 ${
            width > 768 ? 'top-[60px]' : 'top-0'
          } right-0 z-20`}
        >
          <>
            <button onClick={handleBack} className="w-8 h-8">
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
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <h3
              className={`font-bold text-sm text-black dark:text-[#F9F5FF] mx-auto max-w-[180px] overflow-hidden whitespace-nowrap truncate`}
            >
              {title}
            </h3>
          </>

          {/* <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button> */}
        </div>
      )}

      <div className={`h-full ${useParams().roomId ? 'pb-[0px]' : 'pb-[0px]'} overflow-auto`}>
        {initLoading ? (
          <div className="mx-4 my-3">
            <Message>
              <div className="flex items-center">
                <ChatsIcon className="w-6 h-4 mr-2" />
                <ThreeDots />
              </div>
            </Message>
          </div>
        ) : (
          <div
            className="relative w-full h-full px-4 py-3 overflow-auto sm:px-6"
            ref={messageRef}
            onScroll={handleChangeScroll}
          >
            {data.length === 0 && type == 'chat' && (
              <Message type="text">
                <p className="overflow-hidden">
                  Hi, to start using myMarvin - ask anything: <br />
                </p>
                <ul className="list-disc list-outside m-0 pl-6 mt-2">
                  <li>
                    {' '}
                    &quot;write a poem about a man called Simon who lives in North Wales and loves
                    gliding&quot;
                  </li>
                  <li>Agnes</li>
                  <li>
                    &quot;recipe for green Thai chicken&quot; <br />
                  </li>
                  <li> &quot;ideas for a 12 year old boys birthday party&quot;</li>
                </ul>
              </Message>
            )}
            {data.length === 0 && type == 'images' && (
              <Message type="text">
                <p className="overflow-hidden ">
                  Hi, to start using myMarvin - ask anything: <br />
                </p>
                <ul className="list-disc list-outside m-0 pl-6 mt-2">
                  <li> &quot;an oil painting of a tiger on mount everest&quot;</li>
                  <li>
                    &quot;an oil painting of a Welsh fire breathing dragon flying over the Welsh
                    hills&quot;
                  </li>
                  <li>
                    &quot;an abstract painting of a black cocker spaniel wearing a silly hat&quot;
                  </li>
                </ul>
              </Message>
            )}
            {data &&
              data.length > 0 &&
              data.map((mess, i) => {
                const typeMess = mess.type;
                const srcImg =
                  mess && mess.image
                    ? `${process.env.REACT_APP_CLOUNDFRONT_AWS}${mess.image.Key}`
                    : '';
                const choices = mess.response
                  ? typeMess === 'images'
                    ? mess.response.data
                    : mess.response || mess.response.choices[0]
                  : '';
                return (
                  <div key={i}>
                    <Message me={true} type="text">
                      <p className="overflow-hidden">{mess.prompt}</p>
                    </Message>
                    {choices !== '' && (
                      <Message type={typeMess || 'text'}>
                        {typeMess === 'images' && (
                          <img
                            alt="blocked"
                            src={srcImg}
                            onClick={() =>
                              handleView(
                                mess,
                                typeMess,
                                typeMess === 'images' ? srcImg : choices.text
                              )
                            }
                            className="min-w-[200px] min-h-[240px] rounded-lg cursor-pointer"
                          />
                        )}
                        {typeMess !== 'images' && (
                          <p
                            onClick={() =>
                              handleView(
                                mess,
                                typeMess,
                                typeMess === 'images' ? srcImg : choices.text
                              )
                            }
                            className={`overflow-hidden cursor-pointer ${
                              choices.text.length > 300 ? 'whitespace-pre-line' : ''
                            }`}
                          >
                            {choices.text}
                          </p>
                        )}
                        <div className="flex items-center justify-end mt-1">
                          <div className="mr-auto">
                            <ChatsIcon className="w-6 h-4" />
                          </div>
                          {/* <button
                            onClick={() =>
                              handleSave(
                                mess,
                                typeMess,
                                typeMess === 'images' ? srcImg : choices.text
                              )
                            }
                          >
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
                                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                          </button> */}
                          <button
                            className="ml-2"
                            onClick={() =>
                              handleSave(
                                mess,
                                typeMess,
                                typeMess === 'images' ? srcImg : choices.text
                              )
                            }
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
                          {/* <button
                            className="ml-2"
                            onClick={() =>
                              handleShare(
                                typeMess,
                                typeMess === 'images' ? srcImg : choices.text,
                                mess
                              )
                            }
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
                                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                              />
                            </svg>
                          </button> */}
                        </div>
                      </Message>
                    )}
                  </div>
                );
              })}
            {sending ? (
              <div>
                <Message>
                  <div className="flex items-center">
                    <ChatsIcon className="w-6 h-4 mr-2" />
                    <ThreeDots />
                  </div>
                </Message>
              </div>
            ) : (
              ''
            )}
            <button
              onClick={handleScrollBottom}
              className={`right-4 rounded-full p-2 shadow-sm text-white bg-gray-600 dark:bg-black z-40 ${
                isTop ? 'fixed' : 'hidden'
              }`}
              style={{
                top: `${heightBox}px`
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
            <div ref={endRef} />
          </div>
        )}
      </div>

      <div
        className={`w-full flex py-3 px-[14px] fixed  left-0 right-0 z-30 bg-gray-200 dark:bg-[#202939] ${
          width > 768 ? 'bottom-0' : 'bottom-[69px] sm:bottom-[117px]'
        }`}
      >
        <button
          className="absolute z-10 p-1 pr-2 text-xl border-r left-5 top-6"
          onClick={handleReload}
          disabled={data.length === 0}
        >
          <RxReload />
        </button>
        <textarea
          rows={1}
          value={prompt}
          onChange={handleChangeText}
          onKeyUp={handleKeyUp}
          type="text"
          id="default-search"
          className="block w-full placeholder:text-[#697586] bg-white dark:bg-[#121926] font-medium text-base py-3 px-4 pl-12 pr-10 text-gray-900 border border-gray-300 rounded-lg  focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write here"
        />
        <button className="absolute z-10 right-6 top-6" onClick={handleSend}>
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
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
      </div>

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
      <Modal
        open={open}
        onClose={handleToggleCreate}
        title="You've ran out of credit"
        content={
          <div className="flex items-center justify-center">
            <button
              className="w-full py-2 font-medium text-green-600 border border-green-600 rounded-md bg-none"
              onClick={() => navigate(`/auth/account`)}
            >
              Go to Account page
            </button>
          </div>
        }
        actions={null}
      />
    </div>
  );
};

Room.propTypes = {
  id: PropTypes.string || undefined,
  type: PropTypes.string || undefined
};

export default Room;
