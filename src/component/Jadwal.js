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
function Jadwal() {
  const salt = process.env.REACT_APP_SALT
    const [next,setNext] = useState([])
    const [today,setToday] = useState([])

    const DataFound = today?.length !==0
    const nextDataFound = next?.length !==0
    
   
    const data_jdwl = async()=>{
      try {
        // const getJdwl = await dataP.get()
        // .then((res)=>{
        //     const outPars1 = res.data.out2
         
        //     const bytes1=  CryptoJS.AES.decrypt(outPars1, salt)
        //     const dataD1 = JSON.parse(bytes1.toString(CryptoJS.enc.Utf8))
          
          
        //    const day = dataD1['data'].filter((data)=>new moment(data.Tanggal).format('LL') === new moment().format('LL'))
        //    setToday(day)
        //    const nextD = dataD1['data'].filter((data)=>new moment().diff(data.Tanggal)<0)
        //    setNext(nextD)
           

        // })

        const local_pas = JSON.parse(localStorage.getItem('data_jad'))
        const day = local_pas.filter((data)=>new moment(data.Tanggal).format('LL')  === new moment().format('LL'))
        setToday(day)
        const nex = local_pas.filter((data)=>new moment().diff(data.Tanggal)<0)
         setNext(nex)
     
    
      
       
       
        
      } catch (error) {
        return Nav('/error_page')
      }
      
    }

    const chatsWA = async(data)=>{
      const num =  _Decrypt(data)
      window.location.href='https://wa.me/+62'+num
  }
  const Nav = useNavigate()

  const goToDetail = async(info)=>{

    Nav(('/detail_pasien/')+info)
  }
  

    useEffect(()=>{
        data_jdwl()
    },[])
    
  return (
    <div className='containers'>
      {!DataFound&&!nextDataFound?
        (<>
          <LoadingPage/>
        </>):
        (
      <div>
          <div> 
           <h1 style={{marginTop:"100px",marginBottom:'30px'}}>Jadwal</h1>
           </div>
        <div>
          <div>
            <p>Hari ini: {moment().format('LL')}</p>
           </div>
          <div className='container-jdwl'>
            <div>

            <Table  striped bordered hover variant="dark" style={{fontSize:'10px'}} >
                    <thead >
                      <tr >
                        <th scope="col">Nama</th>
                        <th scope="col">Tanggal</th>
                        <th scope="col">Jam</th>
                        <th scope="col">Detail Pasien</th>
                      </tr>
                    </thead>
                    <tbody>
                      {DataFound?(
                        today?.map((data,i)=>{
                              return(
                                <tr key={i}>
                                <td>{data.Nama}</td>
                                <td>{new Date(data.Tanggal).toLocaleString("id",{month:'long',weekday:'long',year:'numeric',day:'numeric'})}</td>
                                <td>{new Date(data.Jam).toLocaleString('id',{timeStyle:'short'}).replace('.',':')}</td>
                                <td onClick={()=>{goToDetail(data.Id)}}>Detail Pasien</td>
                                <td onClick={()=>chatsWA(data.NoTelp)}>Hubungi via Whatsapp</td>
                                </tr>
                              )
                            })
                      ):(
                        <tr>
                          <td colSpan={4}>Belum Ada Jadwal</td>
                        </tr>
                      )}
                    </tbody>
                </Table>
              
            </div>
              
          </div>
        </div>
        <div style={{marginTop:'50px'}} >
          <div>
            <p>Akan Datang</p>
          </div>
          <div className='container-jdwl'>

              <div style={{maxWidth:'90%'}}>
            <Table  striped bordered hover variant="dark" style={{fontSize:'10px'}} >
                    <thead >
                      <tr >
                        <th scope="col">Nama</th>
                        <th scope="col">Tanggal</th>
                        <th scope="col">Jam</th>
                        <th scope="col">Detail Pasien</th>
                        <th scope='col'>Sisa Waktu</th>
                        <th scope='col'>Info</th>
                      </tr>
                    </thead>
                    <tbody>
                      {nextDataFound?(
                        next?.map((data,i)=>{
                              return(
                                <tr key={i}>
                                <td>{data.Nama}</td>
                                <td>{new Date(data.Tanggal).toLocaleString("id",{month:'long',weekday:'long',year:'numeric',day:'numeric'})}</td>
                                <td>{new Date(data.Jam).toLocaleString('id',{timeStyle:'short'}).replace('.',':')}</td>
                                <td onClick={()=>{goToDetail(data.Id)}}>Detail Pasien</td>
                                <td>{new moment().diff(data.Tanggal,'days')}  Hari Lagi</td>
                                <td onClick={()=>chatsWA(data.NoTlp)}>Hubungi via Whatsapp</td>
                                </tr>
                              )
                            })
                      ):(
                        <tr>
                          <td colSpan={5}>Belum Ada Jadwal</td>
                        </tr>
                      )}
                    </tbody>
                </Table>
              
            </div>
             </div>
          <div>

          </div>
          <div>

          </div>
        </div>
        </div>


        )
    }
        
        
    </div>
  )
}

export default Jadwal