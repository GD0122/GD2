import React from 'react'
import { useEffect,useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import dataP from '../api/Datass'
import info from '../api/DataPasien'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/esm/Button'
import LoadingPage from '../Pages/LoadingPage'
import api from '../api/Datajdwl';
import '../component/datapasien.css'

function  DetailPasien() {
    let {nama_pasien} = useParams()
    const Nav = useNavigate()

    const [data,setData] = useState()
    const [rkm,setRkm] = useState([])
    const [jdwl,setJdwl] = useState([])
    const isReady = rkm !== undefined && data !== undefined && jdwl !== undefined
    const checkRkm = rkm.length !== 0 
    const checkJdwl = jdwl.length !== 0
    const dates = new Date().toLocaleDateString()

    
    const getDatas = async()=>{
    
        try {
            const data = await dataP.get()
            const getDataP = data.data.data
            const getDetails = await getDataP.filter((data)=>data.NoTlp.toString() === nama_pasien)
            await setRkm(getDetails)
            const detail = await info.get()
            const detailPas = detail.data.data
            const getPasien=await detailPas.filter((data)=> data.NoTelp.toString() === nama_pasien)
            
            await setData(getPasien)
           
        
        } catch (error) {
             return Nav('/error_page')
        }

    }
    const getJadwal = async()=>{
        try {
            const data = await api.get()
            const getJad = data.data.data
            const getJdwl = await getJad.filter((data)=>data.NoTlp.toString()=== nama_pasien)
            setJdwl(getJdwl)
        } catch (error) {
         return Nav('/error_page')
        }
    }
 

    const TambahData = async(data)=>{
        Nav('/tambah_data/'+data)
    }
    const Tambh_Jdwl = async(data)=>{
        Nav('/tmbah_jdwl/'+data)
    }

    const chatsWA = async(data)=>{
        window.location.href='https://wa.me/+62'+data
    }
    useEffect(()=>{
        getDatas()
        getJadwal()
    },[])

  return (
    <div className='containers'>
        <div >
          {isReady?(
             <div>
             <div>
             <h1>  Detail Pasien </h1>
             </div>
             <div style={{margin:'10px '}}>
                 <div>
                     {data && data?.map((data,i)=>{
                         
                         return(
                             <div style={{margin:'10px'}}>
                                <div style={{textAlign:'left',border:'3px solid black',padding:'10px',borderRadius:'10px'}}>
                                 <h6>Nama Pasien: {data.Nama}</h6>
                                 <h6>Umur: {data.Umur}</h6>
                                 <h6>Alamat: {data.Alamat}</h6>
                                 <h6>Info Kontak: +62 {data.NoTelp}</h6>
                                 </div>
                                 <div style={{fontSize:'30px',display:'flex',justifyContent:'center', margin:'20px',alignContent:'center'}}>
                                  <Button style={{margin:'10px',fontSize:'15px'}} onClick={()=>TambahData(data.NoTelp)}>Tambah Data Pasien</Button>
                                  <Button style={{margin:'10px', fontSize:'15px'}} onClick={()=>Tambh_Jdwl(data.NoTelp)}> Tambah Jadwal Pasien</Button>
                                 
                                 </div>
                                 <Button style={{margin:'10px', fontSize:'15px',backgroundColor:'green'}}  onClick={()=>chatsWA(data.NoTelp)}>Whats App</Button>
                             </div>
                         )
                         
                     })}
                 
                 </div>
     
             
             </div>
           
             <div>
             <div >
                 <h1>Rekam Medis</h1>
             </div>
             <div>
                 <Table style={{fontSize:'10px'}} striped bordered hover variant="dark">
                     <thead>
                         <tr >
                             <td>Tanggal</td>
                             <td>Diagnosa</td>
                             <td>Terapi</td>
                             <td>Keterangan</td>
                         </tr>
                     </thead>
                     <tbody>
                        {checkRkm?(
                          rkm?.map((data,i)=>{
                            return (
                                <tr key={i}>
                                    <td>{new Date(data.Tanggal).toLocaleString("id",{month:'long',weekday:'long',year:'numeric',day:'numeric'})}</td>
                                    <td>{data.Diagnosa}</td>
                                    <td>{data.Terapi}</td>
                                    <td>{data.Keterangan}</td>
                                </tr>
                            )
                        })
                        ):(
                            <tr>
                                <td colSpan={4}>Belum ada Rekam Medis</td>
                            </tr>
                        )}
                         
                     </tbody>
                 </Table>
             </div>
             <div>
                <h1>Jadwal Pasien</h1>
                 <div>
                 <Table  striped bordered hover variant="dark" style={{fontSize:'10px'}}>
                    <thead >
                      <tr >
                        <th scope="col">Tanggal</th>
                        <th scope="col">Jam</th>
                        <th scope='col'>Sisa Waktu</th>
                        <th scope="col">Info Kontak</th>
                      </tr>
                    </thead>
                    <tbody>
                      {checkJdwl?(
                        jdwl?.sort(({Tanggal:prev},{Tanggal:current})=>new Date(prev) - new Date(current)).map((data,i)=>{
                              return(
                                <tr key={i} style={{textAlign:'center',fontSize:'13px'}}>
                                <td>{new Date(data.Tanggal).toLocaleString("id",{month:'long',weekday:'long',year:'numeric',day:'numeric'})}</td>
                                <td>{new Date(data.Jam).toLocaleString('id',{timeStyle:'short'}).replace('.',':')}</td>
                                <td>{((new Date(data.Tanggal)-new Date(dates))/(1000 * 60 * 60 * 24) <=0 ? ("Sudah terlewat"):(new Date(data.Tanggal)-new Date(dates))/(1000 * 60 * 60 * 24)+ " Hari Lagi")}</td>
                                <td onClick={()=>{chatsWA(data.NoTlp)}}>WhatsApp</td>
                                </tr>
                              )
                            }).reverse()
                      ):(
                        <tr>
                          <td colSpan={4} style={{textAlign:'center',fontSize:'13px'}}>Belum Ada Jadwal</td>
                        </tr>
                      )}
                    </tbody>
                </Table>
              
                </div>
             </div>
             </div>
     
     
     
         </div> 
          ):(<LoadingPage/>)}
       
       



    </div>
    </div>
  )
}

export default DetailPasien