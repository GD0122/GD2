import React from 'react'
import { Route,redirect } from 'react-router-dom';
import { useGoogleAuth } from './Test_context';

function Test_Private_route({Component,...rest}) {
    const { isSignedIn } = useGoogleAuth();

    return (
        <div>
            <Route {...rest} render={props => (
                isSignedIn ?
                <Component {...props} />: 
                <redirect exact from="/private" to="/" />
            )} />
        </div>
    );
            }
export default Test_Private_route