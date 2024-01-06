import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProviderAdmin } from './components/AuthContextAdmin';
import { AuthProviderUser } from './components/AuthContextUser'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProviderUser>
      <AuthProviderAdmin>
        <App />
        </AuthProviderAdmin>
    </AuthProviderUser>

  </React.StrictMode>
);

