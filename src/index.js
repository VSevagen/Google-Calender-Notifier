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

const router = createBrowserRouter([
  {
    path: "/homepage",
    element: <App />,
  },
  {
    path: "/stats",
    element: <Stats />
  },
  {
    path: "/phonebox",
    element: <PhoneBox />
  }
]);

ReactDOM.render(
  <RouterProvider router={router} />
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
