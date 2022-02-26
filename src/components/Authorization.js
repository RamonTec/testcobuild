import React, { useEffect } from 'react';
import { withApollo, } from 'react-apollo';
import { useAuth } from '8base-react-sdk';
import { compose } from 'recompose';

import { CURRENT_USER_QUERY,USER_SIGN_UP_MUTATION } from '../graphql/auth';

import { Inicio } from './Inicio';

import { CircularProgress } from '@material-ui/core'

import "../css/spinners.css"

const Authorization = compose(
  withApollo,
)(({ client }) => {
    
  const auth = useAuth();
  
  const shouldProcessAuthorizationResult = !auth.isAuthorized && document.location.hash.includes('access_token');

  useEffect(() => {
      
    const processAuthorizationResult = async () => {
      const { idToken, email } = await auth.authClient.getAuthorizedData();

      const context = { headers: { authorization: `Bearer ${idToken}` } };

      await client.query({
        query: CURRENT_USER_QUERY,
        context,
      })
      .catch(() => client.mutate({
        mutation: USER_SIGN_UP_MUTATION,
        variables: {
          user: { email },
          authProfileId: process.env.REACT_APP_8BASE_PROFILE_ID,
        },
        context,
      }));

      auth.authClient.setState({
        token: idToken,
      });
    };

    if (shouldProcessAuthorizationResult) {
      processAuthorizationResult();
    }
  }, [shouldProcessAuthorizationResult, auth, client]);

  if (auth.isAuthorized) {
    return <Inicio />;
  }

  const authorize = () => {
    auth.authClient.authorize();
  }

  if (!document.location.hash.includes('access_token')) {
    authorize()
  }

  return (
    <div className="spinner-center">
      <div>
        <p style={{color:"white", marginRight:"10px"}}>Autorizando...</p> 
      </div>
      
      <div>
        <CircularProgress />
      </div>
    </div>
  )
});

export { Authorization };