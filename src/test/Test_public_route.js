import React from 'react'
import { Route,redirect } from 'react-router-dom'
import { useGoogleAuth } from './Test_context'

function Test_public_route({component: Component, ...rest}) {
    const {isSignedIn} = useGoogleAuth()
  return (
    <div>
        <Route {...rest} render={props=>(!isSignedIn?
        <Component {...props}/>:
        <redirect exact to="/private"/>
        )}/>
    </div>
  )
}

export default Test_public_route