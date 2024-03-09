import React, { useCallback, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Bounce, toast } from 'react-toastify'
import { RenewPasien2 } from '../Redux/Reducer/_Pasien'
import { _Formater } from '../Config/Formatter'
import { Calls } from '../api/Calls'
function TambahBarang({showR,setShowR,checkB}) {

    const ApiUrl = Calls[0].api5.url
    const ApiUrl1 = Calls[0].api4.url
    const salt2 = process.env.REACT_APP_SALT2
    const dispatch = useDispatch()
    const [disabled,setDisabled] = useState()
    const Submit = async(e)=>{
          e.preventDefault()
          const formEl = await document.getElementById('tambah-brng')
          const forms = await new FormData(formEl)
          forms.append('salt',salt2)
          setDisabled(true)
          try {

            const data = await fetch(`https://script.google.com/macros/s/${ApiUrl}/exec`,{
              method:'POST',
              body:forms
            }).then((res)=>{
              console.log('succes')
            }).catch((e)=>{
              console.log('err')
            })


            const dats = new FormData()
            const hargab = forms.get('HargaBarang')
            const jml = forms.get('Stock')
            
            const total = jml*hargab
            const dataTgl = forms.get('Tanggal')
            const nmabrng = forms.get('NamaBarang')
            const jns = "Pembelian Barang dengan nama Barang "+ nmabrng + " dengan harga " + _Formater.format(hargab).replace("IND","Rp.") + " dengan Jumlah " + jml + " total pengeluaran " + _Formater.format(total).replace("IND","Rp.")
  
            dats.append("Jenis","Pembelian Barang")
            dats.append("Bersih",total)
            dats.append("Tanggal",dataTgl)
            dats.append("Ket",jns)
            dats.append('salt',salt2)
  
            const data2 = await fetch(`https://script.google.com/macros/s/${ApiUrl1}/exec`,{
              method:"POST",
              body:dats
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
          dispatch(RenewPasien2())
          .then(()=>{
            checkB()
            setDisabled(false)
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
          <Modal.Title>TAMBAH BARANG</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form className="form" id="tambah-brng" onSubmit={(e)=>Submit(e)} >
          <fieldset disabled={disabled}>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                    <Form.Label>Nama Barang</Form.Label>
                    <Form.Control type="text"  name="NamaBarang" placeholder="Nama Barang" required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Jumlah Barang</Form.Label>
                    <Form.Control type="number"  name="Stock" placeholder="Stock Barang" required/>
                </Form.Group>

                <Form.Group className="mb-2" controlId="formBasicPassword">
                    <Form.Label>Tanggal</Form.Label>
                    <Form.Control type="date"  name="Tanggal" placeholder="Tanggal Pembelian" required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Harga</Form.Label>
                    <Form.Control type="number"  name="HargaBarang" placeholder="Harga Barang (Satuan Pcs/Pack )" required/>
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

export default TambahBarang