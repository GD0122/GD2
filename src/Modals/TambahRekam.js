import React, { useCallback, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import './tmbahrkm.css'
import { Bounce, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { RenewPasien } from '../Redux/Reducer/_Pasien'
import { _Formater } from '../Config/Formatter'
import { Calls } from '../api/Calls'
function TambahRekam({Pid,dataP,getD,showR,setShowR}) {

    const ApiUrl = Calls[0].api2.url
    const ApiUrl1 = Calls[0].api4.url
    const salt2 = process.env.REACT_APP_SALT2
    const [disabled,setDisabled] = useState(false)
    const dispacth = useDispatch()
    const Submit = async(e)=>{
        e.preventDefault()

        const formEl = await document.getElementById('rekam-pas')
        const forms = await new FormData(formEl)
        setDisabled(true)
        forms.append('salt',salt2)
        forms.append('Id',Pid)      
        const datas = await fetch(`https://script.google.com/macros/s/${ApiUrl}/exec`,{
            method:"POST",
            body: forms
        })

        
        //pndptn
        const datapend = new FormData()
        datapend.append("Jenis","Pendapatan Pasien")
        const tgl = forms.get('Tanggal')
        datapend.append('Tanggal',tgl)
        const tindakan = forms.get("Terapi")
        const nmpas = forms.get("Nama")
       
        const dpt = forms.get("Pendapatan")
        const byr = forms.get("Pembayaran")
        const ttldpt = dpt - byr
        const ket = "Pendapatan atas tindakan " + tindakan + " dengan nama pasien " + nmpas + "Dengan Pendapatan Bersih " + _Formater.format(ttldpt).replace("IND","Rp.")
        datapend.append("Ket",ket)
     
        datapend.append("Bersih", ttldpt)
        datapend.append('salt',salt2)

        try {
            const datas2 = await fetch(`https://script.google.com/macros/s/${ApiUrl1}/exec`,{
            method:"POST",
            body: datapend
        })

           //pengeluaran
            const pmbyrn = new FormData()
            const namaDok = forms.get("NamaDOkter")
            pmbyrn.append("Jenis","Pembayaran Dokter/Perawat")
            const dataTgl2 = forms.get("Tanggal")
            pmbyrn.append("Tanggal",dataTgl2)
            const byr2 = forms.get("Pembayaran")
            pmbyrn.append("Bersih",byr2)
            const ketbyr = "Pembayaran Dokter dengan nama Dokter " + namaDok + "Dengan Total Pembayaran " +  _Formater.format(byr2).replace("IND","Rp.")
            pmbyrn.append("Ket",ketbyr)
            const pmbyr = await fetch(`https://script.google.com/macros/s/${ApiUrl1}/exec`,{
                method:'Post',
                body:pmbyrn

            })
           
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
        dispacth(RenewPasien())
        .then(()=>{
            setDisabled(false)
            getD()
            handleClose()
            toast.success('Berhasil',{
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
               })

        })
       
       

    
    }
    
    const handleClose = useCallback(()=>{
        setShowR(false)
    },[showR,setShowR])

  return (
    <div>
      <Modal show={showR} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>REKAM MEDIS</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form className="form" id="rekam-pas" onSubmit={(e)=>Submit(e)} >
            <fieldset disabled={disabled}>
            {dataP&&dataP.map((data,i)=>{
                return(
                            <div key={i}>
                                 <Form.Group className="mb-2" controlId="formBasicEmail">
                                    <Form.Label>Nama</Form.Label>
                                    <Form.Control type="text"  name="Nama" placeholder={data.Nama} value={data.Nama} required />
                                 </Form.Group>
                                <Form.Group className="mb-2" controlId="formBasicPassword">
                                    <Form.Label>Tanggal Pemeriksaan</Form.Label>
                                    <Form.Control type="date"  name="Tanggal" placeholder="Tanggal"  required/>
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="formBasicPassword">
                                    <Form.Label>Diagnosa</Form.Label>
                                    <Form.Control className="form-comp"  as="textarea" type="text" name="Diagnosa" placeholder="Diagnosa" required/>
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="formBasicPassword">
                                    <Form.Label>Terapi</Form.Label>
                                    <Form.Control className="form-comp" as="textarea" type="text" name="Terapi" placeholder="Terapi" required/>
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="formBasicPassword">
                                    <Form.Label>Keterangan</Form.Label>
                                    <Form.Control className="form-comp" as="textarea" type="text" name="Keterangan" placeholder="Keterangan" required/>
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="formBasicEmail">
                                    <Form.Label>Nama Dokter</Form.Label>
                                    <Form.Control type="text" defaultValue={"Galuh"}  name="NamaDokter" placeholder="Nama Dokter" required/>
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="formBasicEmail">
                                    <Form.Label>Nama Perawat</Form.Label>
                                    <Form.Control type="text" defaultValue={"Galuh"} name="NamaPerawat" placeholder="Nama Perawat" required/>
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="formBasicPassword">
                                    <Form.Label>Pendapatan</Form.Label>
                                    <Form.Control type="number"  name="Pendapatan" placeholder="Total Pendapatan" required/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Pembayaran</Form.Label>
                                    <Form.Control type="number"  defaultValue={0} name="Pembayaran" placeholder="Pembayaran Dokter" required/>
                                </Form.Group>
                              
                                </div>

                )
            })}
              <Button style={{background:'purple'}} className='btn-rkm' type='submit'>
               Save Changes
              </Button>
              <Button className='btn-rkm' variant="secondary" onClick={handleClose}>
                 Close
              </Button>

            </fieldset>
            
            </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default TambahRekam