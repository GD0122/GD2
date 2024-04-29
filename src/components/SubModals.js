import React, { useState } from 'react'
import {Button,Form,Modal} from 'react-bootstrap'
import _Converter from '../Config/_Converter'
function SubModals({...props}) {

    const [show,setShow] = useState(false)


    const onClose = ()=>{
        setShow(false)
    }

  
    console.log(_Converter(props.data))

  return (
    <div>
        <><Button onClick={()=>{setShow(true)}}>{props?.but}</Button></>
        <>
         <Modal show={show} onHide={onClose} >
                <Modal.Header >
                    <Modal.Title>{props?.header}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form >
                    <fieldset >
                   
                        <Button variant="primary" type="submit" style={{margin:'10px 5px',float:'right'}} >
                            Simpan
                        </Button>
                        <Button variant="danger"  style={{margin:'10px 5px',float:'left'}} >Delete Pasien</Button>
                        <Button variant="secondary" style={{margin:'10px 5px',float:'right'}} onClick={onClose}>
                            Tutup
                        </Button>
                        </fieldset>
                  </Form>
                </Modal.Body>
                </Modal>
        </>
    </div>
  )
}

export default SubModals