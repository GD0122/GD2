import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

export default function LoadingPage() {
  return (
    <div style={{zIndex:'10000', height:'100%',width:'100%',position:'absolute',display:'flex',margin:'0px',alignItems:'center',justifyContent:'center'}}>
        <div >
            <h1>Loading Data <Spinner animation="grow" /></h1>
        </div>
      
    </div>
  )
}
