import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import { BookingsContextProvider } from './store/booking-context';


ReactDOM.render(
  <BookingsContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </BookingsContextProvider>,
  document.getElementById('root')
);