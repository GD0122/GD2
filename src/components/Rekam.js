import React, { useEffect, useState } from 'react'
import Tables from './Tables'
import Modals_comp from './Modals_comp'
import { _addRekam, _delRekam, _editRekam } from '../Config/_Calls'
import { tambah_rekam } from '../Config/_Form'
import { useDispatch, useSelector } from 'react-redux'
import { getRekamPas, SelRekam } from '../Redux/Reducer/_Pasien'
import PagePagination from './PagePagination'
import { useParams } from 'react-router-dom'

function Rekam(props) {
  const {idP} = props
  const rekam = useSelector(SelRekam)

 
  const dispatch = useDispatch()
  const _getRekamData = async()=>{
    await dispatch(getRekamPas({idP,page:1,perPage:5}))
  }

 useEffect(()=>{
    _getRekamData()
 },[])
 const handlerActionsPage = async(data)=>{
    await dispatch(getRekamPas({idP,page:data?.page,perPage:data?.perPage}))
 }

  return (
    <div>
    
       <Tables header={"Rekam Pasien"} 
        idPas={idP} 
        Updates={_getRekamData} 
        data={rekam['rekam']} 
        but2={'Delete Rekam Pasien'} 
        act={_editRekam} 
        act2={_delRekam} 
        //pagePaginations
        ActionsPage={handlerActionsPage}
        pageName={'rekamLimit'}
        totalData={rekam['pages']?.totalData}

         />
       <Modals_comp  header={'Tambah Rekam'}
        // onUpdates={_getRekamData} 
       data={tambah_rekam} 
       idPas={idP} 
       Actions={_addRekam} 
       onUpdates={_getRekamData}
       but={'Tambah Rekam'} />
    </div>
  )
}

export default Rekam