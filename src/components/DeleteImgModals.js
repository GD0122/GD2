import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import Message from './Message';

function DeleteImgModals(props) {

    const [isLoading, setIsLoading] = useState(false);
    console.log(props)

    const handleDelete = async () => {
      setIsLoading(true);

     
      try {
        const data= await props?.onDelete();
        Message({ type: 'succes', message: data?.message });
        props?.onClose();
       
      } catch (error) {
        return Message({type:'error',message:'maaf terjadi kesalah saat menghapus gambar'})
      } finally {
        setIsLoading(false)
      }
   
      
    };
  return (
    <Modal show={props?.isOpen} onHide={props?.onClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Hapus Gambar</Modal.Title>
      </Modal.Header>
      <Modal.Body>Apakah Anda yakin ingin menghapus gambar?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props?.onClose} disabled={isLoading}>
          Batal
        </Button>
        <Button variant="danger" onClick={handleDelete} disabled={isLoading}>
          {isLoading ? 'Menghapus...' : 'Hapus'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteImgModals