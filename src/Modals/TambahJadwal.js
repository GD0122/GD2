import React, { useCallback, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import './tmbahrkm.css'
import { _Decrypt } from '../Config/_Decrypt'
import CryptoJS from 'crypto-js'
import { useDispatch } from 'react-redux'
import { RenewPasien2 } from '../Redux/Reducer/_Pasien'
import { Bounce, toast } from 'react-toastify'
import { Calls } from '../api/Calls'
function TambahJadwal({Pid,dataP,getD,showR,setShowR}) {
    const salt2 = process.env.REACT_APP_SALT2
    const salt = process.env.REACT_APP_SALT
    const [disabled,setDisabled] = useState(false)
    const ApiUrl = Calls[0].api3.url
    const dispacth = useDispatch()
    async function Submit (e){
        e.preventDefault()
        const formEl = document.getElementById('tambah-jadwal')
        const forms = new FormData(formEl)
        setDisabled(true)
        forms.append('salt',salt2)
        forms.append('Id',Pid)
        const No = forms.get('NoTelp')
        const NoE = CryptoJS.AES.encrypt(No.toString(),salt)
        forms.set('NoTelp',NoE)

        try {
            const data = await fetch(`https://script.google.com/macros/s/${ApiUrl}/exec`,{
                method:'POST',
                body:forms
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

        dispacth(RenewPasien2())
        .then((res)=>{
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
          <Modal.Title>TAMBAH JADWAL</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form className="form" id="tambah-jadwal" onSubmit={(e)=>Submit(e)} >
            <fieldset disabled={disabled}>
            {dataP&&dataP.map((data,i)=>{
                return(
                            <div key={i}>
                                 <Form.Group className="mb-2" controlId="formBasicEmail">
                                    <Form.Label>Nama</Form.Label>
                                    <Form.Control type="text" name="Nama" placeholder={data.Nama} value={data.Nama} required/>
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="formBasicEmail">
                                    <Form.Label>No Telepon</Form.Label>
                                    <Form.Control type="text" name="NoTelp" placeholder={_Decrypt(data.NoTelp)} value={_Decrypt(data.NoTelp)} required/>
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

export default TambahJadwal