import React from 'react';
import ReactDOM from 'react-dom';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import './index.css';
import App from './App';
import Stats from './stats/Stats';
import * as serviceWorker from './serviceWorker';
import PhoneBox from './phonebox/PhoneBox';
import AppWrapper from './AppWrapper';

if(window.sessionStorage.getItem('theme') === undefined) {
  window.sessionStorage.setItem('theme', 'light');
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppWrapper><App /></AppWrapper>,
  },
  {
    path: "/stats",
    element: <AppWrapper><Stats /></AppWrapper>
  },
  {
    path: "/phonebox",
    element: <AppWrapper><PhoneBox /></AppWrapper>
  }
]);

ReactDOM.render(
  <RouterProvider router={router} />
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
