// src/config/routes.tsx
import React from 'react';
import Home from '../pages/Home';
import Orders from '../pages/Orders';
import ExchangesBalances from "../pages/ExchangesBalances";
import Settings from '../pages/Settings';

interface RouteType {
  path: string;
  element: JSX.Element;
}

const routes: RouteType[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/orders',
    element: <Orders />,
  },
  {
    path: '/exchanges_balances',
    element: <ExchangesBalances />,
  },
  {
    path: '/settings',
    element: <Settings />,
  },
  // Add other routes here
];

export default routes;