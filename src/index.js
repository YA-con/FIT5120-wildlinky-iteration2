import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'antd/dist/reset.css';
import reportWebVitals from './reportWebVitals';

// 👉 Password protection before React renders
const url = window.location.href.toLowerCase(); // Case-insensitive check
const passwordProtected = url.includes('version');

if (passwordProtected) {
  const correctPassword = 'wildlinky5120'; // Set your access password
  let userInput = '';

  // Keep prompting until the correct password is entered or user cancels
  while (userInput !== correctPassword) {
    userInput = prompt('This page is protected. Please enter the access password:');

    if (userInput === null) {
      // If user clicks "Cancel"
      alert('Access cancelled. You will remain on this screen.');
    } else if (userInput !== correctPassword) {
      alert('Incorrect password. Please try again or contact the administrator.');
    }
  }
}

console.log('[URL]', window.location.href);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
