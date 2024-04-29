import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/_userContext'
import {useNavigate} from 'react-router-dom'
import Pasiens from '../components/Pasiens'
import {Button} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import { SelErrPass, SelLoad, SelPasien, _getSearch, getPass } from '../Redux/Reducer/_Pasien'
import _LoadingD from './_LoadingD'
import Modals from '../components/Modals'
import Modals_Comp from '../components/Modals_comp'
import { pendaftaran_pasien } from '../Config/_Form'
import { Pass } from '../api/Calls'
import { _addPass } from '../Config/_Calls'
import {Form,Col,Row} from 'react-bootstrap'
function Tests() {



  return (
    <div className='home'>
        <div style={{marginTop:"100px"}}>
        <h1>TEST PAGE</h1>
        </div>
       
      
       
    </div>
  )
}

export default Tests