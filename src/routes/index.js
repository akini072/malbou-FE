import { lazy } from 'react';

const ForgotPassword = lazy(() => import('pages/auth/ForgotPassword'));
const NewPassword = lazy(() => import('pages/auth/NewPassword'));
const Profile = lazy(() => import('pages/auth/Profile'));
const PublicUser = lazy(() => import('pages/auth/PublicUser'));
const Verify = lazy(() => import('pages/auth/Verify'));
const Response = lazy(() => import('pages/Response'));
const Welcome = lazy(() => import('pages/Welcome'));
const Home = lazy(() => import('pages/Home'));
const Service = lazy(() => import('pages/Service'));
const GetStarted = lazy(() => import('pages/GetStarted'));
const SignIn = lazy(() => import('pages/auth/SignIn'));
const Signup = lazy(() => import('pages/auth/Signup'));
const CreateAi = lazy(() => import('pages/auth/CreateAi'));
const VerifyAccount = lazy(() => import('pages/auth/VerifyAccount'));
const Verified = lazy(() => import('pages/auth/Verified'));
const GeneralChat = lazy(() => import('pages/GeneralChat'));
const GeneralImages = lazy(() => import('pages/GeneralImages'));
const ChatLists = lazy(() => import('pages/ChatLists'));
const Room = lazy(() => import('pages/Room'));
const Saved = lazy(() => import('pages/Saved'));
const FeedDetail = lazy(() => import('pages/FeedDetail'));
const MessageDetail = lazy(() => import('pages/MessageDetail'));
const SharedDetail = lazy(() => import('pages/SharedDetail'));
const Checkout = lazy(() => import('pages/Checkout'));
const CheckoutStatus = lazy(() => import('pages/CheckoutStatus'));
const Account = lazy(() => import('pages/auth/Account'));
const FacebookPage = lazy(() => import('pages/FacebookPage'));
const FacebookDetail = lazy(() => import('pages/FacebookDetail'));

const routes = [
  {
    path: '/home',
    element: <Home />,
    private: true
  },
  {
    path: '/chats',
    element: <GeneralChat />,
    private: true
  },
  {
    path: '/images',
    element: <GeneralImages />,
    private: true
  },
  {
    path: '/lists',
    element: <ChatLists />,
    private: true
  },
  {
    path: '/chats/:roomId',
    element: <Room />,
    private: true
  },
  {
    path: '/saved',
    element: <Saved />,
    private: true
  },
  {
    path: '/saved/:savedId',
    element: <FeedDetail />,
    private: true
  },
  {
    path: '/messages/:msgId/:roomId',
    element: <MessageDetail />,
    private: true
  },
  {
    path: '/shared/:id',
    element: <SharedDetail />,
    private: false
  },
  {
    path: '/',
    element: <GetStarted />,
    private: false
  },
  {
    path: '/auth/login',
    element: <SignIn />
  },
  {
    path: '/auth/sign-up',
    element: <Signup />
  },
  {
    path: '/auth/create-ai',
    element: <CreateAi />
  },
  {
    path: '/auth/verify-account',
    element: <VerifyAccount />
  },
  {
    path: '/auth/verified',
    element: <Verified />
  },
  {
    path: '/auth/register',
    element: <Signup />
  },
  {
    path: '/auth/forgot-password',
    element: <ForgotPassword />
  },
  {
    path: '/auth/new-password',
    element: <NewPassword />
  },
  {
    path: '/auth/profile',
    element: <Profile />,
    private: true
  },
  {
    path: '/auth/account',
    element: <Account />,
    private: true
  },
  {
    path: '/auth/verify',
    element: <Verify />,
    private: true
  },
  {
    path: '/welcome',
    element: <Welcome />,
    private: true
  },
  {
    path: '/users/:ainame',
    element: <PublicUser />,
    private: true
  },
  {
    path: '/response',
    element: <Response />,
    private: true
  },
  {
    path: '/service',
    element: <Service />,
    private: true
  },
  {
    path: '/checkout',
    element: <Checkout />,
    private: true
  },
  {
    path: '/checkout/status',
    element: <CheckoutStatus />,
    private: false
  },
  {
    path: '/facebook',
    element: <FacebookPage />,
    private: true
  },
  {
    path: '/facebook/:id',
    element: <FacebookDetail />,
    private: true
  }
];

export default routes;
