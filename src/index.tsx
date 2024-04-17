import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SidebarLayout from './components/SidebarLayout';
import Home from './pages/BuildAlgorithm';
import ListAlgorithms from './pages/ListAlgorithms';
import UsersData from './pages/UsersData';
import UserDetails from './pages/UserDetails';

const router = createBrowserRouter([
  {
    element: <SidebarLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/list',
        element: <ListAlgorithms />,
      },
      {
        path: '/algorithms',
        element: <UsersData />,
      },
      {
        path: '/users',
        element: <UserDetails />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
