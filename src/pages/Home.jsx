import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings } from 'common';
// import { YoutubeEmbed } from 'common';
import { useDispatch, useSelector } from 'react-redux';
import {
  // creatPoem, createImages, creatRecommendation,
  resetAi
} from 'stores/ai';
import { getProfile } from 'stores/user';
import { toast } from 'react-toastify';
import { useWindowSize } from 'hooks/useWindowSize';
// import Feed from 'components/home/Feed';

import { GrClose } from 'react-icons/gr';

import UserDefault from 'assets/images/user-default.png';
// import Avatar from 'assets/images/avatar.svg';
// import VideoImg from 'assets/images/video.svg';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [width] = useWindowSize();
  const { user } = useSelector((state) => state.userStore);
  const { poem, images, recommendation } = useSelector((state) => state.aiStore);
  const [visited, setVisited] = useState(localStorage.getItem('visited'));
  // const [values, setValues] = useState({
  //   image: '',
  //   poem: '',
  //   recommendation: ''
  // });
  //const [isMarket, setIsMarket] = useState(true);
  useEffect(() => {
    if (!user) {
      dispatch(getProfile());
    } else if (user && !user.verify) {
      navigate('/welcome');
    }

    console.log(visited, ' visited');
  }, [user]);

  useEffect(() => {
    if (poem) {
      toast.success('Created poem successfully.');
      navigate('/response');
    }
    if (images) {
      toast.success('Created images successfully.');
      navigate('/response');
    }
    if (recommendation) {
      toast.success('Created recommendation successfully.');
      navigate('/response');
    }

    return () => {
      dispatch(resetAi());
    };
  }, [poem, images, recommendation]);

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setValues({
  //     ...values,
  //     [name]: value
  //   });
  // };

  // const handleSubmit = () => {
  //   navigate('/auth/login');
  // };

  // const handleCreateImage = () => {
  //   dispatch(
  //     createImages({
  //       prompt: values.image,
  //       size: '512x512'
  //     })
  //   );
  // };

  // const handleCreatePoem = () => {
  //   dispatch(creatPoem(values.poem));
  // };

  // const handleCreateRecommendation = () => {
  //   dispatch(creatRecommendation(values.recommendation));
  // };

  // const handleView = () => {
  //   navigate('/response');
  // };

  return (
    <div
      className="w-full overflow-auto"
      style={{ height: `calc(100vh - ${width > 640 ? '117px' : '140px'})` }}
    >
      {/* {width > 768 ? (
        <div className="w-full px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-20">
          {loading && <Loading />}
          <div className="md:grid md:grid-cols-2 md:grid-flow-col md:gap-14">
            <div className="w-full mb-14 md:mb-0">
              <h3 className="mb-6 text-2xl font-bold md:text-3xl lg:text-6xl lg:mb-10">
                myMarvin is your personal ai.
              </h3>
              <p className="mb-4 text-xl font-semibold lg:text-2xl">
                Create your own and then ask it to do anything you like:
              </p>

              <ul className="pl-8 list-disc">
                <li>
                  <p>Create an image</p>
                </li>
                <li>
                  <p>Write a poem</p>
                </li>
                <li>
                  <p>Give you a recommendation</p>
                </li>
                <li>
                  <p>and pretty much anything else…</p>
                </li>
              </ul>

              <button
                className="w-full px-4 py-2 mt-4 mb-2 text-white bg-green-600 border-none rounded-md"
                onClick={handleView}>
                Get your own myMarvin
              </button>
              <p className="text-gray-600">It’s free and includes 20 free credits</p>
            </div>

            <div className="w-full">
              <h1 className="mb-4 text-2xl font-bold md:text-3xl lg:text-5xl">Try it now.</h1>
              <h4 className="mb-6 text-xl font-semibold lg:text-2xl">
                Ask our friendly in house myMarvin to:
              </h4>

              <InputLabel
                label="Create an image of anything you can imagine:"
                name="image"
                value={values.image}
                onChange={handleChange}
                placeholder=""
                extra={
                  <button
                    className="mr-3 font-medium text-black"
                    disabled={!values.image}
                    onClick={handleCreateImage}>
                    Generate
                  </button>
                }
              />

              <InputLabel
                label="Write a poem about a friend:"
                name="poem"
                value={values.poem}
                onChange={handleChange}
                placeholder=""
                extra={
                  <button
                    className="mr-3 font-medium text-black"
                    disabled={!values.poem}
                    onClick={handleCreatePoem}>
                    Generate
                  </button>
                }
              />

              <InputLabel
                label="Give you a recommendation:"
                name="recommendation"
                value={values.recommendation}
                onChange={handleChange}
                placeholder=""
                extra={
                  <button
                    className="mr-3 font-medium text-black"
                    disabled={!values.recommendation}
                    onClick={handleCreateRecommendation}>
                    Generate
                  </button>
                }
              />
            </div>
          </div>
        </div>
      ) : ( */}
      <div className="w-full px-4 pt-10 sm:px-6">
        <div className="flex items-center mb-4">
          {user && user.avatar ? (
            <img
              alt="avatar"
              src={user.avatar.Location}
              className="object-cover w-8 h-8 overflow-hidden rounded-full"
            />
          ) : (
            <img
              alt="avatar"
              src={UserDefault}
              className="object-cover w-8 h-8 overflow-hidden rounded-full"
            />
          )}
          <h3 className="ml-2 text-lg font-semibold sm:text-2xl">Hi, {user && user.firstName}</h3>

          <div className="ml-auto">
            <Settings balance={(user && user.balance) || 0} />
          </div>
        </div>

        {!visited ? (
          <div
            className="w-full rounded-lg relative p-4 bg-gray-100 dark:bg-[#202939] gap-4 mb-8"
            style={{
              boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)'
            }}
          >
            <button
              className="absolute z-10 right-4 top-4 text-[#9AA4B2]"
              onClick={() => {
                localStorage.setItem('visited', true);
                setVisited(true);
              }}
            >
              <GrClose className="icon" />
            </button>
            <div className="col-span-2">
              <h4 className="mb-1 text-base font-semibold">Welcome to myMarvin</h4>
              <p className="text-sm text-gray-600 dark:text-[#CDD5DF] mb-3">
                myMarvin is your personal AI. It&apos;s private, works just for you and over time
                will learn more about you so will get better at helping you.
                <br /> <br />
                For now here are a few things can you ask myMarvin to do:
                <br /> <br />
                <li>
                  {' '}
                  create a image - literally of anything you can think of - eg: &quot;an oil
                  painting of a tiger on mount everest&quot;
                </li>
                <br />
                <li>
                  {' '}
                  right a poem about you and your friends - eg: &quot;write a poem about a man
                  called Simon who lives in North Wales and loves gliding&quot;
                </li>
                <br />
                <li>
                  {' '}
                  find a recipe for something to cook - eg: &quot;recipe for green Thai
                  chicken&quot;
                </li>
                <br />
                <li> get an idea - eg: &quot;ideas for a 12 year old boys birthday party&quot;</li>
                <br />
                <br />
                There are hundreds of ways to use myMarvin - basically if you could ask a person a
                question or to create an image - you can ask myMarvin.
                <br />
                Enjoy!
              </p>
              {/* <Link to="/" className="text-sm font-semibold text-[#53B1FD]">
                  Visit marketplace
                </Link> */}
            </div>
            {/* <div className="flex items-end justify-end h-full"> */}
            {/* <img alt="" src={VideoImg} className="w-full max-w-[150px]" /> */}
            {/*  <div className="w-full max-w-[150px] mt-6"> */}
            {/* <PlayVideo /> */}
            {/*  <YoutubeEmbed embedId="rokGy0huYEA" />
                </div>
              </div> */}
          </div>
        ) : (
          <h1>Static Text</h1>
        )}

        {/* feed */}
        {/* <div className="w-full">
            <div className="flex items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Your feed</h3>
              <a href="#" className="inline-flex ml-auto text-sm font-semibold">
                Find myMarvin’s
              </a>
            </div>

            <Feed />
            <Feed />
          </div> */}
      </div>
      {/* )} */}
    </div>
  );
};

export default Home;
