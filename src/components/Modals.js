import React, { Component } from 'react'
import {Modal,Form,Button} from 'react-bootstrap'

function Modals({data}) {
 
 let datas = []
 if(data){
   for(let i of Object.entries(data)){
    datas.push({name:i[0],val:i[1],type:typeof i[1]})
   }
 }
 
  return (
    <div>
    <Modal show={''} onHide={''}>
        <Modal.Header closeButton>
          <Modal.Title>REKAM MEDIS</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form className="form" id="rekam-pas"  >
            <fieldset >
            {datas&&datas.map((data,i)=>{
             return(
                <p className={data.type}>{data.val}</p>
             )
            })}
              <Button style={{background:'purple'}} className='btn-rkm' type='submit'>
               Save Changes
              </Button>
              <Button className='btn-rkm' variant="secondary" >
                 Close
              </Button>

            </fieldset>
            
            </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Modals