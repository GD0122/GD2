import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import { useState,useEffect } from "react";
import "./tmbh_jdwl.css"
import { useNavigate,useParams } from 'react-router-dom';
import api from '../api/DataPasien'
import '../component/datapasien.css'
function Tmbh_jdwal() {
    const [load,setLoad] = useState(false)
    let {nama_pasien} = useParams()
    const Nav = useNavigate()
    const [getP,setGetP] = useState()
    async function Submit(e){
        notEmpty()
        setLoad(true)
        const formEl = document.getElementById("jdwl-form")
        e.preventDefault()
       
        const formData = new FormData(formEl)
       
       const datas = await fetch(`${process.env.REACT_APP_TMBHJDWL}`,{
            method: "POST",
            body: formData
        })
        .catch((err)=> { return Nav('/error_page')})
        document.getElementById("jdwl-form").reset();
        setLoad(false)
        Nav('/detail_pasien/'+getP.map((data)=>data.NoTelp))

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
      const getPasien = async()=>{
        try {
            const datas = await api.get()
            const getPas = datas.data.data
            const detailP = getPas.filter((data)=>data.NoTelp.toString() === nama_pasien)
            setGetP(detailP)
        } catch (error) {
            alert("Sorry Something err")
            Nav('/')
        }
      }

      useEffect(() => {
        
      getPasien()
       
      }, [])
      

  return (
    <div className="containers">
        <div>
            <h1>Tambah Jadwal</h1>
        </div>
        <div className='form-container'>
        <Form className="form" id="jdwl-form" onSubmit={(e)=>Submit(e)} >
        <fieldset disabled={load?"disabled":""}>

            {getP&&getP.map((data,i)=>{
                return(
                    <div key={i}>
                        <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label>Nama</Form.Label>
                            <Form.Control type="text" name="Nama" placeholder={data.Nama} value={data.Nama} required/>
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label>Umur</Form.Label>
                            <Form.Control type="text" name="Umur" placeholder={data.Umur} value={data.Umur}  required/>
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label>No Telepon</Form.Label>
                            <Form.Control type="text" name="NoTlp" placeholder={data.NoTelp} value={data.NoTelp} required/>
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="formBasicPassword">
                            <Form.Label>Alamat</Form.Label>
                            <Form.Control className="form-comp" as="textarea" type="text" name="Alamat" placeholder={data.Alamat} value={data.Alamat} required/>
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="formBasicPassword">
                            <Form.Label>Tanggal</Form.Label>
                            <Form.Control type="date" timezone="Asia/Jakarta" name="Tanggal" placeholder="Tanggal" required/>
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label>Jam</Form.Label>
                            <Form.Control type="time" name="Jam" placeholder="Jam" required/>
                        </Form.Group>
                      

                    </div>
                )
            })}
                
                <Button variant="primary" type="submit"  style={{marginTop:'5px'}} >
                     Tambah Jadwal
                </Button>
                </fieldset>
        
        </Form>
        </div>
    </div>
  )
}

export default Tmbh_jdwal