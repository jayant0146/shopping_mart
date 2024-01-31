import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { NavProvider } from './components/context/nav';
import { AuthProvider } from './components/context/auth';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <NavProvider>
    <AuthProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AuthProvider>
  </NavProvider>
);

