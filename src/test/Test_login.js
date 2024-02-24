import React from 'react'
import { useGoogleAuth } from './Test_context'
import Button from 'react-bootstrap/esm/Button'

function Test_login() {
    const {sign} = useGoogleAuth()
  return (
    <div>
        <Button onClick={sign}>Login</Button>
    </div>
  )
}

export default Test_login