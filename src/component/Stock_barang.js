import React, { useEffect, useState } from 'react'
import api from '../api/DataBrng';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';
import LoadingPage from '../Pages/LoadingPage';
function Stock_barang() {

 const [dataBrng,setDataBrng] = useState()
 const navigate = useNavigate()
 const isReady = dataBrng !== undefined

const CheckBarang = async()=>{
    try {
       const Brng =  await api.get()
       const datBrng = Brng.data.data
       setDataBrng(datBrng)
    } catch (error) {
        return navigate('/error_page')
    }
}

const Edit_data = async(data)=>{
    navigate('/edit_barang/'+data)
}
 useEffect(()=>{
    CheckBarang()
  
 },[[dataBrng]])

  return (
    <div style={{minHeight:'1000px'}}>
        {isReady?(
            <div>
            <div style={{marginTop:'100px'}}>
            <h1>Stock Barang</h1>
        </div>
        <div style={{display:"flex",justifyContent:'center',flexWrap:'wrap',alignItems:"center"}}>
            {dataBrng&&dataBrng.map((data,i)=>{
                return (
                    <div key={i}>
                    <Card  style={{ width: '18rem',margin:'10px' }}>
                             <Card.Header>Galuh Dental Stock Barang</Card.Header>
                                <Card.Body>
                                <Card.Title>Nama Barang: {data.NamaBarang}</Card.Title>
                                <Card.Text>Stock : {data.Stock}</Card.Text>
                                <Card.Text>Satuan: {data.Satuan}</Card.Text>
                                <Card.Text>Harga: {data.HargaBarang}</Card.Text>
                      <Card.Footer>
                      <small className="text-muted">Update Terakhir:  {new Date(data.Tanggal).toLocaleDateString()}</small>
                      </Card.Footer>
                    </Card.Body>
                    <Button onClick={()=>{Edit_data(data.NamaBarang)}}>Edit Stock</Button>
                    </Card>
                    </div>
                )
            })}
        </div>
        </div>
        ):(<LoadingPage/>)}
        
    </div>
  )
}

export default Stock_barang