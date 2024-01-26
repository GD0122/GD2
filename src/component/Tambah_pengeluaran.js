import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

 function Tambah_pengeluaran() {
  const [load,setLoad] = useState(false)
  const Nav = useNavigate()

  

  const Submitform= async(e)=>{
    
    notEmpty()
    setLoad(true)
    const formEl = document.getElementById("form_pembelian")
        e.preventDefault()
        console.log(formEl)
        const formData = new FormData(formEl)
        console.log(formData)
       const datas = await fetch(`${process.env.REACT_APP_TMBHPNG1}`,{
          method:"POST",  
          body: formData
        })
        .catch((err)=> { return Nav('/error_page')})

       
          const dats = new FormData()

          const hargab = document.getElementById("hargabrng").value
          const jml = document.getElementById("jmlb").value
          
          const total = jml*hargab
          const dataTgl = await document.getElementById("tgl").value
          const nmabrng = await document.getElementById("nmbrng").value
          const jns = "Pembelian Barang dengan nama Barang "+ nmabrng + " dengan harga " + hargab + " dengan Jumlah " + jml + " total pengeluaran " + total

          dats.append("Jenis","Pembelian Barang")
          dats.append("Bersih",total)
          dats.append("Tanggal",dataTgl)
          dats.append("Ket",jns)
        
          const dataP = await fetch(`${process.env.EACT_APP_TMBHPNG2}`,{
            method:"Post",
            body:dats
          })
          .catch((err)=> { return Nav('/error_page')})
        
        document.getElementById("form_pembelian").reset();
        setLoad(false)
        Nav('/Stock_barang')

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
    <div style={{minHeight:'860px'}}>
        <div style={{marginTop:'100px'}}>
            <h1>Tambah Barang</h1>
        </div>
        <div style={{padding:'5%'}}>
        <Form className="form" id="form_pembelian"   onSubmit={(e)=>Submitform(e)} >
        <fieldset disabled={load?"disabled":""}>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                    <Form.Label>Nama Barang</Form.Label>
                    <Form.Control type="text" id="nmbrng" name="NamaBarang" placeholder="Nama Barang" required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Jumlah Barang</Form.Label>
                    <Form.Control type="number" id="jmlb" name="Stock" placeholder="Stock Barang" required/>
                </Form.Group>

                <Form.Group className="mb-2" controlId="formBasicPassword">
                    <Form.Label>Tanggal</Form.Label>
                    <Form.Control type="date" id="tgl" name="Tanggal" placeholder="Tanggal Pembelian" required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Harga</Form.Label>
                    <Form.Control type="number" id="hargabrng" name="HargaBarang" placeholder="Harga Barang (Satuan Pcs/Pack )" required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Satuan Barang</Form.Label>
                    {['radio'].map((type) => (
                      <div key={`inline-${type}`} className="mb-3">
                          <Form.Check
                            inline
                            label="Pack"
                            name="Satuan"
                            type={type}
                            id={`inline-${type}-1`}
                            value={"Pack"} 
                            required
                          />
                          <Form.Check
                            inline
                            label="Pcs"
                            name="Satuan"
                            type={type}
                            id={`inline-${type}-2`}
                            value={"Pcs"}
                            required
                          />
                        </div>
                      ))}  
                </Form.Group>
               
                <Button variant="primary" className='mt-2' type="submit" >
                     Tambah Pembayaran
                </Button>
                </fieldset>
        
        </Form>
        </div>
     
    </div>
  )
}
 
export default Tambah_pengeluaran

