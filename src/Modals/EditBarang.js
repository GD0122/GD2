import moment from 'moment'
import React, { useCallback, useState } from 'react'
import { Form, Modal,Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Bounce, toast } from 'react-toastify'
import { RenewPasien2 } from '../Redux/Reducer/_Pasien'
import { dataRadio } from '../Config/Radio'
import { _Formater } from '../Config/Formatter'
import { Calls } from '../api/Calls'
function EditBarang({data,showR,setShowR,checkB}) {
    const ApiUrl = Calls[0].api6.url
    const ApiUrl1 = Calls[0].api4.url
    const salt2 = process.env.REACT_APP_SALT2
    const dispatch = useDispatch()
    const [disabled,setDisabled] = useState()
    const [radioV,setRadioV] = useState(data?.Jenis)
    const [formDOM, setFormDOM] = useState(null);

    const Submit = async(e)=>{
        
        const formEl = await document.getElementById('edt_brng')
        const forms = new FormData(formEl)
        forms.set('Satuan',radioV)
        forms.append('salt',salt2)
        e.preventDefault()
        const newF = new FormData(formDOM)
        newF.append('salt',salt2)
        setDisabled(true)
        const oldS = forms.get('Stock')
        const newS = newF.get('Stock')
        const checkStockup = newS > oldS
        
        try {
          const data = await fetch(`https://script.google.com/macros/s/${ApiUrl}/exec`,{
            method:'POST',
            body:newF
        })
 
        
       if(checkStockup){
        const dats = new FormData()
        const hargab = newF.get('HargaBarang')
        const jml = newS - oldS
        const total = jml*hargab
        const dataTgl = newF.get('Tanggal')
        const nmabrng = newF.get('NamaBarang')
        const jns = "Pembelian Barang dengan nama Barang "+ nmabrng + " dengan harga " + _Formater.format(hargab).replace("IND","Rp.")  + " dengan Jumlah " + jml + " total pengeluaran " + _Formater.format(total).replace("IND","Rp.")
         dats.append("Jenis","Pembelian Barang")
         dats.append("Bersih",parseInt(total))
         dats.append("Tanggal",dataTgl)
         dats.append("Ket",jns)
         dats.append('salt',salt2)
 
         const data2 = await fetch(`https://script.google.com/macros/s/${ApiUrl1}/exec`,{
            method:"POST",
            body:dats
          })
       }

   
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
          setDisabled(false)
          checkB()
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
          <Modal.Title>EDIT BARANG</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form className="form"   ref={(form) => setFormDOM(form)} id="edt_brng" onSubmit={(e)=>Submit(e)}  >
                <fieldset disabled={disabled}>
                    <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label>Nama Barang</Form.Label>
                            <Form.Control type="text" name="NamaBarang" defaultValue={data.NamaBarang} placeholder="Nama Barang" />
                        </Form.Group>
                        <Form.Group>
                    <Form.Label>Satuan Barang</Form.Label>
                    {dataRadio.map((type,i) => (
                      <div key={`inline-${i}`} className="mb-3">
                          <Form.Check
                            inline
                            label={type.Jenis}
                            name="Satuan"
                            type={'radio'}
                            id={`inline-${type}-1`}
                            value={type.Jenis}
                            defaultChecked={data.Satuan===type.Jenis}
                            onChange={(e)=>{setRadioV(type.Jenis)}}
                            required
                          />
                        </div>
                      ))}  
                </Form.Group>
                        <Form.Group>
                            <Form.Label>Jumlah Barang</Form.Label>
                            <Form.Control  type="number" name="Stock"  defaultValue={data.Stock} placeholder={data.Stock}/>
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="formBasicPassword">
                            <Form.Label>Tanggal</Form.Label>
                            <Form.Control type="date"  name="Tanggal" defaultValue={new moment().format('LL')} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Harga</Form.Label>
                            <Form.Control id="harga" type="number" name="HargaBarang" defaultValue={data.HargaBarang}   placeholder={data.HargaBarang} />
                        </Form.Group>
                        <Button variant="primary" type="submit" style={{marginTop:'10px'}} >
                            Update Barang
                        </Button>
                        </fieldset>
                 
                
             
            </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default EditBarang