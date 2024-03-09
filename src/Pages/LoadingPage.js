import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

export default function LoadingPage() {
  return (
    <div style={{zIndex:'1000',overflowX:'hidden', height:'100%',width:'100%',position:'absolute',display:'flex',margin:'0px',alignItems:'center',justifyContent:'center'
    ,overflow:'hidden'
     }}>
        <div >
            <h1>Loading Data <Spinner animation="grow" /></h1>
        </div>
      
    </div>
  )
}
