import React from 'react';
import { withApollo, Query } from 'react-apollo';
import { compose } from 'recompose';
import { CURRENT_USER_QUERY } from '../graphql/auth';
import { useAuth } from '8base-react-sdk';
import { CircularProgress } from '@material-ui/core'
import "../css/spinners.css"

import { Tasks } from './Tasks';

const Inicio = compose(
  withApollo,
)(({ client }) => {

  const auth = useAuth();
  const logout = async () => {
    await client.clearStore();

    auth.authClient.logout();
  };

  return (
    <Query query={CURRENT_USER_QUERY}>
      { ({ loading }) => {
        if (loading) {
          return (
            <>
              <div className="spinner-center">
                <div>
                  <p style={{color:"white", marginRight:"10px"}}>Confirmando...</p>
                </div>
                
                <div>
                  <CircularProgress />
                </div>
              </div>
            </>
          )
        }
        return (
          <>
            <Tasks logoutFunction={logout} />
          </>
        );
      }}
    </Query>
  )
});

export { Inicio }