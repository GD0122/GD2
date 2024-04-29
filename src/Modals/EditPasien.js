import React, { useCallback } from 'react'
import {Modal,Button,Form} from 'react-bootstrap'
import moment from 'moment'
import { _Decrypt } from '../Config/_Decrypt'

function EditPasien({...props}) {


  const Close = useCallback(()=>{
        props.setShow()
  },[props.show,props.setShow])

 const UpdatePas = async()=>{

 }

  return (
    <div>
        <Modal show={props.show===props.data.id} onHide={Close}>
         <Modal.Header>Edit Pasien</Modal.Header>
         <Modal.Body>
         <Form className="form" id='editpasien'  >
                <fieldset disabled={''}>
                       <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label>Nama Pasien</Form.Label>
                            <Form.Control type="text" name="NamaBarang" defaultValue={props.data.name} placeholder="Nama Barang" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Umur</Form.Label>
                            <Form.Control  type="number" name="Stock"  defaultValue={props.data.umur} placeholder={''}/>
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="formBasicPassword">
                            <Form.Label>NoTlp</Form.Label>
                            <Form.Control type="string"  name="NoTlp" defaultValue={_Decrypt(props.data.noTelp)} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Alamat</Form.Label>
                            <Form.Control  type="text" name="alamat" defaultValue={_Decrypt(props.data.alamat)}   placeholder={''} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Tanggal Daftar</Form.Label>
                            <Form.Control  type="date" name="alamat" defaultValue={props.data.createdAt}   placeholder={props.data.createdAt} />
                        </Form.Group>
                        <Button variant="primary" type="submit" style={{margin:'10px 5px',float:'right'}} >
                            Simpan
                        </Button>
                        <Button variant="secondary" style={{margin:'10px 5px',float:'right'}} onClick={Close}>
                            Tutup
                        </Button>
                      
                        </fieldset>
             
            </Form>

         </Modal.Body>
        </Modal>
    </div>
  )
}

export default EditPasien