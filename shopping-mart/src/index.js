import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { NavProvider } from './components/context/nav';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <NavProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </NavProvider>
);

