import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
function FormDaftarPasien() {
    const [load,SetLoad] = useState(false)
    const Nav = useNavigate()
    
    async function Submit(e){
        notEmpty()
      
        const formEl = document.getElementById("data-form")
        SetLoad(true)
        e.preventDefault()
        
        const forms = new FormData(formEl)
        console.log(Object.fromEntries(forms))
       const datas = await fetch(`${process.env.REACT_APP_TMBHDTP}`,{
            method:"POST",
            body: forms
        }).then((res)=>{
            alert("data berhasil ditambahkan")
            Nav('/')
        })
        .catch((err)=> { return Nav('/error_page')})


       
        document.getElementById("data-form").reset();
        SetLoad(false)


    }
    
    const notEmpty = async()=>{
        const inputs = document.getElementsByTagName("input")
        for (var i = 0; i < inputs.length; i++) {
          // only validate the inputs that have the required attribute
          if(inputs[i].hasAttribute("required")){
              if(inputs[i].value == ""){
                  // found an empty field that is required
                  alert("Please fill all required fields");
                  return false;
              }
          }
      }
         
      }
  return (
    <div style={{margin:'100px 10px 10px',minHeight:'850px'}}>
        <div>
            <h1>Daftar Pasien Baru</h1>
        </div>
        <div>
        <Form className="form" id="data-form" onSubmit={(e)=>Submit(e)} >
             <fieldset disabled={load?"disabled":""}>
             <Form.Group className="mb-2" controlId="formBasicEmail">
                 <Form.Label>Nama</Form.Label>
                 <Form.Control type="text" id="nmpas" name="Nama" placeholder="Nama" required/>
             </Form.Group>
             <Form.Group className="mb-2" controlId="formBasicEmail">
                 <Form.Label>Umur</Form.Label>
                 <Form.Control type="number" id="umur" name="Umur" placeholder="Umur" required/>
             </Form.Group>
             <Form.Group className="mb-2" controlId="formBasicEmail">
                 <Form.Label>No Telepon</Form.Label>
                 <Form.Control type="number" id="notlp" name="NoTlp" placeholder="Nomer Telepon" required/>
             </Form.Group>
             <Form.Group className="mb-2" controlId="formBasicPassword">
                 <Form.Label>Tanggal</Form.Label>
                 <Form.Control type="date" id='tgls' name="Tanggal" placeholder="Tanggal" required/>
             </Form.Group>
             <Form.Group className="mb-2" controlId="formBasicPassword">
                 <Form.Label>Alamat</Form.Label>
                 <Form.Control className="form-comp"  as="textarea" type="text" name="Alamat" placeholder="Alamat" required/>
             </Form.Group>
             <Button variant="primary" style={{marginTop:"5%"}} type="submit" >
                  Tambah Data
             </Button>
             </fieldset>
         </Form>
         </div>
  
    </div>
  )
}

export default FormDaftarPasien