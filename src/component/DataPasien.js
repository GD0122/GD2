import React, { useEffect, useState } from 'react'
import api from '../api/DataPasien';
import "./datapasien.css"
import Card from 'react-bootstrap/Card'
import { useNavigate } from 'react-router-dom';
import LoadingPage from '../Pages/LoadingPage';
import Form from 'react-bootstrap/Form'

function DataPasien() {
    const [datap,SetDatap] = useState([]);
    const [search,setSearch] = useState("")
    const search_parameters = Object.keys(Object.assign({}, ...datap));
    const Nav = useNavigate()
    const  goToDetail = async(data)=>{
        Nav('/detail_pasien/'+data)
        
    }
    const dataPas = Object.values(datap)
    const isLoad = dataPas.length !== 0
    const getDatas= async()=>{
        
        try{
            const res = await api.get()
            const datas = res.data.data
    
            SetDatap(datas)
       
           
     
        }catch(err){
          return Nav('/error_page')
        }
       
    }
    function getSearch(data){
        return data.filter((item) =>
              search_parameters.some((parameter) =>
                item[parameter].toString().toLowerCase().includes(search)
              ))
    }
   
   
 
    useEffect(()=>{
   
 
       getDatas()
    },[datap,isLoad])
  return (
    <div className='data-pasien'style={{marginTop:'100px',minHeight:'860px'}} >
        {isLoad?(  
        <div >
           
        <div >
            <h1>Data Pasien</h1>
            <div style={{margin:'10px',alignItems:'center',display:'flex',justifyContent:'center'}}>
            <Form className="d-flex" >
            <Form.Control
              type="search"
              placeholder="Cari data pasien"
              className="me-2"
              aria-label="Search"
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
            />
          </Form>
            </div>
            
        </div>
        
        <div className='container-datap'>
         
            {
                getSearch(dataPas).length === 0? 
                 <div style={{margin:'20px',display:'flex',justifyContent:'center'}}>
                   <h3>Data Tidak Ditemukan</h3>
                 </div>
                :
                getSearch(dataPas).map((data,i)=>{
                    return (
                       
                        <div key={i} >
                           
                             <Card  style={{ width: '18rem',margin:'10px' }} onClick={()=>goToDetail(data.NoTelp)}>
                             <Card.Header>Galuh Dental</Card.Header>
                                <Card.Body>
                                <Card.Title>Nama Pasien: {data.Nama}</Card.Title>
                                <Card.Text>Umur : {data.Umur}</Card.Text>
                                <Card.Text>Alamat: {data.Alamat}</Card.Text>
                                <Card.Text>Info Kontak: {data.NoTelp}</Card.Text>
                                
                      <Card.Footer>
                      <small className="text-muted">Tanggal Daftar :  {new Date(data?.Tanggal).toLocaleString("id",{month:'long',weekday:'long',year:'numeric',day:'numeric'})}</small>
                      </Card.Footer>
                      </Card.Body>
                      </Card>
                        </div>      
                    )
                })
            }
        </div>
        </div>
        ):(<LoadingPage/>)}
        
    
 
     
    </div>
  )
}

export default DataPasien