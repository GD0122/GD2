import React from 'react'
import { useGoogleAuth } from './Test_context'
import Button from 'react-bootstrap/esm/Button'

function Test_logout() {
    const {signout} = useGoogleAuth()
  return (
    <div>
        <Button onClick={signout}>Logout</Button>
    </div>
  )
}

export default Test_logout