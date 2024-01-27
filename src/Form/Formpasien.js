import React from "react"
import "./forms.css"
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import { useState,useEffect} from "react";
import api from '../api/DataPasien'
import { useParams,useNavigate } from "react-router-dom";

export default function Formpasien(){
    const [load,SetLoad] = useState(false)
    const [dataP,setDataP] = useState()
    let {nama_pasien} = useParams()
    const Nav = useNavigate()
    async function Submit(e){
        notEmpty()
      
        const formEl = document.getElementById("data-form")
        SetLoad(true)
        e.preventDefault()
        
        const forms = new FormData(formEl)
       const datas = await fetch("https://script.google.com/macros/s/AKfycbzL0hExtS229SnAMZRh14_oQwQxq2dq8FhHMHyMmzSEwKD76sKCJ2a-LNtq39n2FhGsyA/exec",{
            method:"POST",
            body: forms
        }).then((res)=>console.log("success"))
        .catch((err)=> { return Nav('/error_page')})

        //pendapatan
        const datapend = new FormData()
        datapend.append("Jenis","Pendapatan Pasien")
        const dataTgl = document.getElementById("tgls").value
        datapend.append("Tanggal",dataTgl)
        const tindakan = document.getElementById("terapi").value
        const nmpas = document.getElementById("nmpas").value
        const ket = "Pendapatan atas tindakan " + tindakan + " dengan nama pasien " + nmpas
        datapend.append("Ket",ket)
        const dpt = document.getElementById("pendpt").value
        const byr = document.getElementById("byr").value
        const ttldpt = dpt - byr 
        datapend.append("Bersih", ttldpt)
        const pend = await fetch("https://script.google.com/macros/s/AKfycbwy7E4eHZ9q2yYhQf997I7D6vW72gYg8YUXHesA-FCkdsZmzQXJFhsmGisjbOT-pWrV/exec",{
            method:'Post',
            body:datapend

        }).then((res)=>console.log("success"))
        .catch((err)=> { return Nav('/error_page')})

        //pengeluaran
        const pmbyrn = new FormData()
        const namaDok = document.getElementById("nmdok").value
        pmbyrn.append("Jenis","Pembayaran Dokter")
        const dataTgl2 = document.getElementById("tgls").value
        pmbyrn.append("Tanggal",dataTgl2)
        const byr2 = document.getElementById("byr").value
        pmbyrn.append("Bersih",byr2)
        const ketbyr = "Pembayaran Dokter dengan nama Dokter " + namaDok
        pmbyrn.append("Ket",ketbyr)
        const pmbyr = await fetch("https://script.google.com/macros/s/AKfycbwy7E4eHZ9q2yYhQf997I7D6vW72gYg8YUXHesA-FCkdsZmzQXJFhsmGisjbOT-pWrV/exec",{
            method:'Post',
            body:pmbyrn

        }).then((res)=>console.log("success"))
        .catch((err)=> { return Nav('/error_page')})

       
        document.getElementById("data-form").reset();
        SetLoad(false)
        alert("Data berhasil ditambahkan")
        Nav('/detail_pasien/'+dataP.map((data)=>data.NoTelp))


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

    const getDataPasien = async()=>{
        try {
            const getDatas = await api.get()
            const getPas = getDatas.data.data
            const getPasien = getPas.filter((data)=>data.NoTelp.toString() === nama_pasien)
          
            setDataP(getPasien.map((data=>data)))
        } catch (error) {
          return Nav('/error_page')
        }
    }
    useEffect(()=>{
        getDataPasien()
    },[])
   
    return(
        <div style={{margin:'0px 20px'}}>
             <div className="form-pasien" >
            <h1>Form Pasien Dental</h1>
            <div className="form-container" style={{display:'block',position:'static'}}>

            
            <Form className="form" id="data-form" onSubmit={(e)=>Submit(e)} >
             
                <fieldset disabled={load?"disabled":""}>
                    {dataP&&dataP?.map((data,i)=>{
                        return(
                            <div key={i}>
                                 <Form.Group className="mb-2" controlId="formBasicEmail">
                                    <Form.Label>Nama</Form.Label>
                                    <Form.Control type="text" id="nmpas" name="Nama" placeholder={data.Nama} value={data.Nama} required />
                                 </Form.Group>
                                 <Form.Group className="mb-2" controlId="formBasicEmail">
                                    <Form.Label>Umur</Form.Label>
                                    <Form.Control type="text" id="umur" name="Umur" placeholder={data.Umur} value={data.Umur}  required/>
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="formBasicEmail">
                                    <Form.Label>No Telepon</Form.Label>
                                    <Form.Control type="text" id="notlp" name="NoTlp" placeholder={data.NoTelp} value={data.NoTelp} required/>
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="formBasicPassword">
                                    <Form.Label>Alamat</Form.Label>
                                    <Form.Control className="form-comp"  as="textarea" type="text" name="Alamat" placeholder={data.Alamat} value={data.Alamat}  required/>
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="formBasicPassword">
                                    <Form.Label>Tanggal Pemeriksaan</Form.Label>
                                    <Form.Control type="date" id='tgls' name="Tanggal" placeholder="Tanggal"  required/>
                                </Form.Group>
                              
                                <Form.Group className="mb-2" controlId="formBasicPassword">
                                    <Form.Label>Diagnosa</Form.Label>
                                    <Form.Control className="form-comp"  as="textarea" type="text" name="Diagnosa" placeholder="Diagnosa" required/>
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="formBasicPassword">
                                    <Form.Label>Terapi</Form.Label>
                                    <Form.Control className="form-comp" id="terapi" as="textarea" type="text" name="Terapi" placeholder="Terapi" required/>
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="formBasicPassword">
                                    <Form.Label>Keterangan</Form.Label>
                                    <Form.Control className="form-comp" as="textarea" type="text" name="Keterangan" placeholder="Keterangan" required/>
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="formBasicEmail">
                                    <Form.Label>Nama Dokter</Form.Label>
                                    <Form.Control type="text" defaultValue={"Galuh"} id="nmdok" name="NamaDokter" placeholder="Nama Dokter" required/>
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="formBasicEmail">
                                    <Form.Label>Nama Perawat</Form.Label>
                                    <Form.Control type="text" defaultValue={"Galuh"} name="NamaPerawat" placeholder="Nama Perawat" required/>
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="formBasicPassword">
                                    <Form.Label>Pendapatan</Form.Label>
                                    <Form.Control type="number" id="pendpt" name="Pendapatan" placeholder="Total Pendapatan" required/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Pembayaran</Form.Label>
                                    <Form.Control type="number" id='byr' defaultValue={0} name="Pembayaran" placeholder="Pembayaran Dokter" required/>
                                </Form.Group>
                            </div>
                        )
                    })}
                <Button variant="primary" style={{marginTop:"5%"}} type="submit" >
                     Tambah Data
                </Button>
                </fieldset>
            </Form>
     
            </div>
            
        
        </div>

        </div>
       
    )
}