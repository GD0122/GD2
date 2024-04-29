import React from 'react'
import { useEffect,useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/esm/Button'
import LoadingPage from '../Pages/LoadingPage'
import '../component/datapasien.css'
import 'moment/locale/id'
import * as moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import TambahRekam from '../Modals/TambahRekam';
import TambahJadwal from '../Modals/TambahJadwal';
import { _Decrypt } from '../Config/_Decrypt';
import { Bounce, toast } from 'react-toastify';

 function  DetailPasien () {
    const salt = process.env.REACT_APP_SALT
    let {nama_pasien} = useParams()
    const Nav = useNavigate()
    // const DPas = useSelector(SelDetailP)
    const [dataP,setDataP] = useState([])
    const [rkm,setRkm] = useState([])
    const [jdwl,setJdwl] = useState([])
    // const pasien=  useSelector(SelPasien)
    // const rekam = useSelector(SelRekam)
    // const jadwal = useSelector(SelJadwal)
    const [showJ,setShowJ] = useState(false)
   
    const checkRkm = rkm.length !== 0 
    const checkJdwl = jdwl.length !== 0
    // const dates = new Date().toLocaleDateString()
    const dispatch = useDispatch()
  
   
    const isReady = dataP !== undefined  && rkm !== undefined && jdwl !== undefined
    const [showR,setShowR] = useState(false)
   
  
    //date
    // const data = new Date(data.Tanggal).toLocaleString("id",{month:'long',weekday:'long',year:'numeric',day:'numeric'})
    // ((new Date(data.Tanggal)-new Date(dates))/(1000 * 60 * 60 * 24) <=0 ? ("Sudah terlewat"):(new Date(data.Tanggal)-new Date(dates))/(1000 * 60 * 60 * 24)+ " Hari Lagi")
    const getData = async(pasien,rekam,jadwal)=>{
        try {
            const local_pas = JSON.parse(localStorage.info_pas)
            const local_pas1 = JSON.parse(localStorage.data_pas)
            const local_pas2 = JSON.parse(localStorage.data_jad)
              const getRkm = await local_pas.filter((data)=>data.Id === nama_pasien)
              await setRkm(getRkm)
 
             const getJdwl = await local_pas2.filter((data)=>data.Id === nama_pasien)
             await setJdwl(getJdwl)
 
             const getP = await local_pas1.filter((data)=>data.Id === nama_pasien)
             await setDataP(getP)
       

          
        } catch (error) {
            toast.error('Gagal', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
        }
       
        
    }



    useEffect(()=>{
        getData()
       
    },[])

 

    const TambahData = async(data)=>{
        // Nav('/tambah_data/'+data)
        setShowR(true)
    }
    const Tambh_Jdwl = async(data)=>{
        // Nav('/tmbah_jdwl/'+data)
        setShowJ(true)
    }

    const chatsWA = async(data)=>{
        const dats = _Decrypt(data)
        window.location.href='https://wa.me/'+dats
    }
   

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
                     {dataP && dataP?.map((data,i)=>{
                         
                         return(
                             <div key={i} style={{margin:'10px'}}>
                                <div style={{textAlign:'left',border:'3px solid black',padding:'10px',borderRadius:'10px'}}>
                                 <h6>Nama Pasien: {data.Nama}</h6>
                                 <h6>Umur: {data.Umur}</h6>
                                 <h6>Alamat: {data.Alamat}</h6>
                                 <h6>Info Kontak: { _Decrypt(data.NoTelp)}</h6>
                                 </div>
                                 <div style={{fontSize:'30px',display:'flex',justifyContent:'center', margin:'20px',alignContent:'center'}}>
                                  <Button style={{margin:'10px',fontSize:'15px'}} onClick={()=>TambahData()}>Tambah Data Pasien</Button>
                                  <Button style={{margin:'10px', fontSize:'15px'}} onClick={()=>Tambh_Jdwl(data.NoTelp)}> Tambah Jadwal Pasien</Button>
                                 </div>
                                  <Button style={{margin:'10px', fontSize:'15px',backgroundColor:'green'}}  onClick={()=>chatsWA(data.NoTelp)}>Whats App</Button>
                                 <div>
                                     <TambahRekam Pid={data.Id} dataP={dataP} showR={showR} getD={getData} setShowR={setShowR}/>
                                     <TambahJadwal Pid={data.Id} dataP={dataP} showR={showJ} getD={getData} setShowR={setShowJ}/>
                                 </div>
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
                                    <td>{new moment(data.Tanggal).format('LL')}</td>
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
                    <tbody >
                      {checkJdwl?(
                        jdwl?.sort(({Tanggal:prev},{Tanggal:current})=>new Date(prev) - new Date(current)).map((data,i)=>{
                              return(
                                <tr key={i} style={{textAlign:'center',fontSize:'10px'}}>
                                <td>{new moment(data.Tanggal).format('LL')}</td>
                                <td>{new moment(data.Jam).format('hh:mm')}</td>
                                <td>{new moment().diff(data.Tanggal,'days') > 0? "Sudah Terlewat": (new moment().diff(data.Tanggal,'days') + " hari")}</td>
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