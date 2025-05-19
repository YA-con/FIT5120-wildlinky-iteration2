import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'antd/dist/reset.css';
import reportWebVitals from './reportWebVitals';

const PASSWORD_KEY = 'wildlinky_access';
const PASSWORD_TIMEOUT = 30 * 60 * 1000; 

const correctPassword = 'wildlinky5120';
const storedData = JSON.parse(localStorage.getItem(PASSWORD_KEY));
const now = new Date().getTime();

const isPasswordValid = storedData && (now - storedData.timestamp) < PASSWORD_TIMEOUT;
if (!isPasswordValid) {
  let userInput = '';

  while (userInput !== correctPassword) {
    userInput = prompt('This page is protected. Please enter the access password:');

    if (userInput === null) {
      alert('Access cancelled. You will remain on this screen.');
    } else if (userInput !== correctPassword) {
      alert('Incorrect password. Please try again or contact the administrator.');
    }
  }

  localStorage.setItem(PASSWORD_KEY, JSON.stringify({ timestamp: now }));
}

console.log('[URL]', window.location.href);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
