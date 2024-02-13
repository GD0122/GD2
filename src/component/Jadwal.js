import React, { useEffect, useState } from 'react'
import api from '../api/Datajdwl';
import "./jadwal.css"
import Table from 'react-bootstrap/esm/Table';
import { useNavigate } from 'react-router-dom';
import '../component/datapasien.css'

function Jadwal() {
    const [jdwl,Setjdwl] = useState([])
    const [today,SetToday] = useState([])
    const dates = new Date().toLocaleDateString()
    const DataFound = today.length !==0
    const nextDataFound = jdwl.length !==0
    
    

   


    const data_jdwl = async()=>{
      try {
        const getJdwl = await api.get()
        const datJdwl = getJdwl.data.data
        const getNext = datJdwl.filter((data)=> ((new Date(data.Tanggal)-new Date(dates))/(1000 * 60 * 60 * 24)) > 0)
        const getD = datJdwl.filter((data)=>
          new Date(data.Tanggal).toLocaleDateString() === dates
        )
    
      
       
        SetToday(getD)
        Setjdwl(getNext)
        
      } catch (error) {
        return Nav('/error_page')
      }
      
    }

    const chatsWA = async(data)=>{
      window.location.href='https://wa.me/'+data
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
        <div> 
        <h1 style={{marginTop:"100px",marginBottom:'30px'}}>Jadwal</h1>
        </div>
        <div>
          <div>
            <p>Hari Ini : {new Date(dates).toLocaleString("id",{month:'long',weekday:'long',year:'numeric',day:'numeric'}) }</p>
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
                                <td onClick={()=>{goToDetail(data.NoTlp)}}>Detail Pasien</td>
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
                      </tr>
                    </thead>
                    <tbody>
                      {nextDataFound?(
                        jdwl?.map((data,i)=>{
                              return(
                                <tr key={i}>
                                <td>{data.Nama}</td>
                                <td>{new Date(data.Tanggal).toLocaleString("id",{month:'long',weekday:'long',year:'numeric',day:'numeric'})}</td>
                                <td>{new Date(data.Jam).toLocaleString('id',{timeStyle:'short'}).replace('.',':')}</td>
                                <td onClick={()=>{goToDetail(data.NoTlp)}}>Detail Pasien</td>
                                <td>{((new Date(data.Tanggal)-new Date(dates))/(1000 * 60 * 60 * 24))}  Hari Lagi</td>
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

export default Jadwal