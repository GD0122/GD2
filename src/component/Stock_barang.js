import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';
import LoadingPage from '../Pages/LoadingPage';
import '../component/datapasien.css'
import TambahBarang from '../Modals/TambahBarang';
import EditBarang from '../Modals/EditBarang';
function Stock_barang() {

 const [dataBrng,setDataBrng] = useState()
 const [show,setShow] = useState(false)
 const [showE,setShowE] = useState(false)
 const [active,setActive] = useState([])
 const isReady = dataBrng !== undefined

const CheckBarang = async()=>{
    try {

       const local_pas = JSON.parse(localStorage.getItem('data_brng'))
       setDataBrng(local_pas)
    } catch (error) {
      console.log('err')
    }
}

const Edit_data = async(data)=>{
    setShowE(true)
    setActive(data)

}
const showT = ()=>{setShow(true)}
 useEffect(()=>{
    CheckBarang()
  
 },[])

  return (
    <div className='containers'>
        {isReady?(
            <div>
            <div style={{marginTop:'100px'}}>
            <h1>Stock Barang</h1>
            <div>
                <Button onClick={showT}style={{background:'purple'}}>Tambah Barang</Button>
                <TambahBarang showR={show} setShowR={setShow} checkB={CheckBarang} />   
            </div>
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
                         <Button onClick={()=>{Edit_data(data)}}>Edit Stock</Button>
                    </Card>
                    <div>
                        <EditBarang key={i} showR={showE} setShowR={setShowE} checkB={CheckBarang} data={active} />
                    </div>
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