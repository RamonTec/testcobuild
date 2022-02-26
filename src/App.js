import React from 'react';
import { AppProvider } from '8base-react-sdk';
import { Auth, AUTH_STRATEGIES } from '@8base/auth';
import { Authorization } from './components/Authorization';
import { CircularProgress } from '@material-ui/core'
import "./css/spinners.css"

const REDIRECT_URI = document.location.href.replace(document.location.hash, '');

const authClient = Auth.createClient({
  strategy: AUTH_STRATEGIES.WEB_COGNITO,
  subscribable: true,
}, {
  clientId: process.env.REACT_APP_8BASE_CLIENT_ID,
  domain: process.env.REACT_APP_8BASE_CLIENT_DOMAIN,

  redirectUri: REDIRECT_URI,
  logoutRedirectUri: REDIRECT_URI,
});

const App = () => {
  return (

    <AppProvider uri={process.env.REACT_APP_8BASE_API_ENDPOINT_URI} authClient={authClient}>
      { ({ loading }) => {
        if (loading) {
          return (
            <div className="spinner-center">
              <CircularProgress />
            </div>
          )
        }

        return (
          <React.Fragment>
            <Authorization />
          </React.Fragment>
        );
      }}
    </AppProvider>
  );
};

export {App};