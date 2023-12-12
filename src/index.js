import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import PropTypes from 'prop-types';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Loading } from 'common';
import Layout from 'components/layout';
import routes from 'routes';
import { store } from 'stores';

const PrivateRoute = ({ isPrivate, children }) => {
  const isAuthenticated = localStorage.getItem('mymarvin_token');

  if ((isPrivate && isAuthenticated) || !isPrivate) {
    return children;
  } else {
    return <Navigate to="/auth/login" />;
  }
};

PrivateRoute.propTypes = {
  isPrivate: PropTypes.bool,
  children: PropTypes.node
};

const root = ReactDOM.createRoot(document.getElementById('root'));

//if (typeof Node === 'function' && Node.prototype) {
//  const originalRemoveChild = Node.prototype.removeChild;
//  Node.prototype.removeChild = function (child) {
//    if (child.parentNode !== this) {
//      if (console) {
//        console.warn('Cannot remove a child from a different parent', child, this);
//      }
//      return child;
//    }
//    return originalRemoveChild.apply(this, arguments);
//  };

//  const originalInsertBefore = Node.prototype.insertBefore;
//  Node.prototype.insertBefore = function (newNode, referenceNode) {
//    if (referenceNode && referenceNode.parentNode !== this) {
//      if (console) {
//        console.warn(
//          'Cannot insert before a reference node from a different parent',
//          referenceNode,
//          this
//        );
//      }
//      return newNode;
//    }
//    return originalInsertBefore.apply(this, arguments);
//  };
//}

root.render(
  <Suspense fallback={<Loading />}>
    {/* <React.StrictMode> */}
    <Provider store={store}>
      <BrowserRouter>
        {/* <Layout> */}
        <Routes>
          {routes.map((route, i) => (
            // <Route key={i} path={route.path} element={route.element} />
            <Route
              key={i}
              path={route.path}
              element={
                <PrivateRoute isPrivate={route.private}>
                  <Layout isPrivate={route.private}>{route.element}</Layout>
                </PrivateRoute>
              }
            />
          ))}
        </Routes>

        {/* <Routes>
            {routes &&
              routes.map((route, i) => (
                <Route
                  key={i}
                  path={route.path}
                  element={
                    <PrivateRoute isPrivate={route.private}>
                      <Layout layout={route.layout}>{route.element}</Layout>
                    </PrivateRoute>
                  }
                />
              ))}
          </Routes> */}
        {/* </Layout> */}
      </BrowserRouter>
    </Provider>
    {/* </React.StrictMode> */}
  </Suspense>
);

serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
