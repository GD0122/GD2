import React, { useCallback } from 'react'
import {Modal,Form,Button} from 'react-bootstrap'


function _Daftar_Pasien(...props) {




  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Pasien</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id='tmbah-pasien' onSubmit={(e)=>Submit(e)}>
            <fieldset disabled={disabled}>
            <Form.Group className="mb-2" controlId="formBasicEmail">
                 <Form.Label>Nama</Form.Label>
                 <Form.Control type="text"   name="Nama" placeholder="Nama" required/>
             </Form.Group>
             <Form.Group className="mb-2" controlId="formBasicEmail">
                 <Form.Label>Umur</Form.Label>
                 <Form.Control type="number"   name="Umur" placeholder="Umur" required/>
             </Form.Group>
             <Form.Group className="mb-2" controlId="formBasicEmail">
                 <Form.Label>No Telepon</Form.Label>
                 <Form.Control type="number"   name="NoTelp" placeholder="Nomer Telepon" required/>
             </Form.Group>
             <Form.Group className="mb-2" controlId="formBasicPassword">
                 <Form.Label>Tanggal Daftar</Form.Label>
                 <Form.Control type="date" name="Tanggal" placeholder="Tanggal" required/>
             </Form.Group>
             <Form.Group className="mb-2" controlId="formBasicPassword">
                 <Form.Label>Alamat</Form.Label>
                 <Form.Control className="form-comp"   as="textarea" type="text" name="Alamat" placeholder="Alamat" required/>
             </Form.Group>
             <Button className='btn-modals' variant="primary" type='submit'>
              Save Changes
             </Button>
             <Button className='btn-modals' variant="secondary" onClick={handleClose}>
               Close
             </Button>
            </fieldset>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default _Daftar_Pasien