import React from 'react'
import './testloading.css'


function TestLoadingPage() {



    return (
        <div className="loading-container">
            <div className='mb-2 mt-2'>
                <img className='img-flip' width={'100px'} height={'100px'} src={process.env.PUBLIC_URL+'/assets/bg-loading.webp'} />
            </div>
          <div className="loading-animation">
            <div className="loading-dot dot1"></div>
            <div className="loading-dot dot2"></div>
            <div className="loading-dot dot3"></div>
          </div>
        </div>
      );
}

export default TestLoadingPage