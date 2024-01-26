import React, { useEffect,useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button'
import { useParams } from 'react-router-dom'
import api from '../api/DataBrng';
import { useNavigate } from 'react-router-dom';
import LoadingPage from '../Pages/LoadingPage';
function Edit_Brng(datas) {
    let {nama_barang} = useParams()
    const [barang,setBarang] = useState()
    const isLoad = barang !== undefined
    const date = new Date()
    const Nav = useNavigate()

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

if (month < 10) month = "0" + month;
if (day < 10) day = "0" + day;

var today = year + "-" + month + "-" + day; 
    
    const getDataBrng = async()=>{
        try {
            const data = await api.get()
            const dataB = data.data.data
            const detD = dataB.filter((data)=> data.NamaBarang === nama_barang)
            setBarang(detD)
        } catch (error) {
            return Nav('/error_page')
        }
    }


    const Submitform= async(e)=>{
    
        
        const formEl = document.getElementById("edt_brng")
            e.preventDefault()
            const formData = new FormData(formEl)
           const datas = await fetch(`${process.env.REACT_APP_EDTBRNG}`,{
              method:"POST",  
              body: formData
            }).then((res)=>console.log("success"))
            .catch((err)=> { return Nav('/error_page')})
            document.getElementById("edt_brng").reset();
            Nav("/Stock_barang")
    
      }
   
    useEffect(()=>{
        getDataBrng()
    },[barang])

  return (
    <div style={{minHeight:'1000px'}}>
        {isLoad?(
        <>
         <div style={{marginTop:'100px'}}>
            <h1>Edit Barang</h1>       
                </div>
                <div style={{padding:'5%'}}>
                <Form className="form" id="edt_brng" onSubmit={(e)=>Submitform(e)} >
                <fieldset >
                    
                    
                                {barang && barang.map((data,i)=>{
                                    return (
                                        <div key={i}>
                                            <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label>Nama Barang</Form.Label>
                            <Form.Control type="text" name="NamaBarang" defaultValue={data.NamaBarang} placeholder="Nama Barang" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Satuan</Form.Label>
                            <Form.Control  type="text" name="Satuan" defaultValue={data.Satuan} placeholder={data.Satuan} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Jumlah Barang</Form.Label>
                            <Form.Control  type="number" name="Stock" defaultValue={data.Stock} placeholder={data.Stock} />
                        </Form.Group>

                        <Form.Group className="mb-2" controlId="formBasicPassword">
                            <Form.Label>Tanggal</Form.Label>
                            <Form.Control type="date" defaultValue={today} name="Tanggal" placeholder="Tanggal Pembelian" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Harga</Form.Label>
                            <Form.Control id="harga" type="number" name="HargaBarang" defaultValue={data.HargaBarang}   placeholder={data.HargaBarang} />
                        </Form.Group>
                        
                    
                        <Button variant="primary" type="submit" style={{marginTop:'10px'}} >
                            Update Barang
                        </Button>
                                        </div>

                                    )
                                })}
                        </fieldset>
                
                </Form>
                </div>
    </> 
             
             
            ):(<LoadingPage/>)}
        
        
    </div>
  )
}

export default Edit_Brng