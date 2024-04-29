import React, { useEffect, useState } from 'react'
import api from '../api/Datajdwl';
import "./jadwal.css"
import Table from 'react-bootstrap/esm/Table';
import { useNavigate } from 'react-router-dom';
import '../component/datapasien.css'
import dataP from '../api/Datass'
import * as moment from 'moment'
import 'moment/locale/id'
import CryptoJS from 'crypto-js';
import LoadingPage from '../Pages/LoadingPage';
import { _Decrypt } from '../Config/_Decrypt';
import { _addJadwal, _delJadwal, _editJadwal, URLAPIS } from '../Config/_Calls';
import Tables from '../components/Tables';
import Modals_comp from '../components/Modals_comp';
import { tambah_jadwal } from '../Config/_Form';
import _Alarm from '../components/_Alarm'
import { useDispatch, useSelector } from 'react-redux';
import { _getJadPas, GetJadwals, GetPasien, SelJadwal } from '../Redux/Reducer/_Pasien';
import _InterCon from '../api/_InterCon';
import './containers-bg.css'
function Jadwal() {
  const salt = process.env.REACT_APP_SALT
  const Navigates = useNavigate()
  const dispatch = useDispatch()
  const todayUrl = `${URLAPIS}jadwal/todays` 
  const tommorowUrl = `${URLAPIS}jadwal/tomorrows`
  const yesterdayUrl = `${URLAPIS}jadwal/yesterdays`

  const [jadwals,setJadwals] = useState([])

  const getjadwals = async () => {
    try {
      await getTodays()
      await getTomorrow()
      await getYesterday()
    
    } catch (error) {
      console.error('Error while fetching jadwals:', error);
    }
  };
  const jadwal = useSelector(SelJadwal);

    useEffect(() => {
      const fetchData = async () => {
          await getjadwals();
      };
  
      fetchData();
  }, []);
  
  const getTodays= async(data)=>{

    await dispatch(GetJadwals({url:todayUrl,page:data?.page,perPage:data?.perPage}))
  }
  const getTomorrow = async(data)=>{

    await dispatch(GetJadwals({url:tommorowUrl,page:data?.page,perPage:data?.perPage}))
  }
  const getYesterday = async(data)=>{
    
    await dispatch(GetJadwals({url:yesterdayUrl,page:data?.page,perPage:data?.perPage}))
  }
  

  useEffect(() => {
    //Jalankan transformasi hanya jika jadwal telah diperbarui
    if (jadwal['today'] && jadwal['tomorrow'] && jadwal['yesterday']) {
        const transformedData = {
            today: transformData(jadwal['today']['jadwal']),
            tomorrow: transformData(jadwal['tomorrow']['jadwal']),
            yesterday: transformData(jadwal['yesterday']['jadwal'])
        };
        console.log('Modified Jadwals:', transformedData);
        setJadwals(transformedData);
    }
}, [jadwal])

  function transformData(dataArray) {
    if(dataArray?.length > 0){
      return dataArray?.map(data => ({
        createdAt: data?.createdAt,
        id: data?.id,
        pasienId:data?.pasienId,
        namapasien: data?.pasien?.name,
        tanggal: data?.tanggal,
        waktu: data?.waktu,
        updatedAt: data?.updatedAt
    }));
    }
    return []
    
}

const getDetails = async(data)=>{
   return Navigates(`/detail/${data}`)
}
  
   
  return (
    <div className='containers-bg'>
      <div>
        <h1 className='mt-5'>Hari Ini</h1>
       
      </div>
      <div className='pt-5'>
      {jadwals&&(
       <div>
        <div>
         
          <Tables header={"Jadwal Hari ini"} 
           but2={'Delete Jadwal Pasien'}
           act={_editJadwal} data={jadwals['today']}
           act2={_delJadwal}
           Updates={getTodays}
           Details={true}
           ActionDetails={getDetails}
           //pagePaginations
           ActionsPage={getTodays}
           pageName={'todayLimit'}
           totalData={jadwal&&jadwal['today']['pages']?.totalData}
           />
        </div>
        <div>
          <Tables header={"Jadwal Akan Datang"} 
          but2={'Delete Jadwal Pasien'} 
          act={_editJadwal} 
          data={jadwals['tomorrow']}  
          act2={_delJadwal}
          Updates={getTomorrow}
          Details={true}
          ActionDetails={getDetails}
          //pagepaginations
          ActionsPage={getTomorrow}
          pageName={'tomorrowLimit'}
          totalData={jadwal&&jadwal['tomorrow']['pages']?.totalData}
          />
        </div>
        <div>
          <Tables header={"Jadwal Terlewat"}
           but2={'Delete Jadwal Pasien'} 
           act={_editJadwal} 
           data={jadwals['yesterday']}  
           act2={_delJadwal}
           Updates={getYesterday}
           Details={true}
           ActionDetails={getDetails}
            //pagePaginations
            ActionsPage={getYesterday}
            pageName={'yesterdayLimit'}
            totalData={jadwal&&jadwal['yesterday']['pages']?.totalData}
           />
        </div>
       
       
       
       </div>
       
       
       
       )}
      </div>
         {/* <div className='pt-5'>
          <Tables header={"Jadwal Pasien"} idPas={data.id} but2={'Delete Jadwal Pasien'} act={_editJadwal} data={data.jadwal} act2={_delJadwal}/>
          // <Modals_comp  header={'Tambah Jadwal'} data={tambah_jadwal}  idPas={data.id} Actions={_addJadwal} but={'Tambah Jadwal'} />
        </div> */}
        
        
    </div>
  )
}

export default Jadwal