import React, { Suspense, useState } from 'react'
import Card from 'react-bootstrap/Card'
import moment from 'moment'
import Placeholder from 'react-bootstrap/Placeholder';
import _LoadingD from '../Pages/_LoadingD';
import {Button} from 'react-bootstrap'
import EditPasien from '../Modals/EditPasien';
import Modals_Comp from './Modals_comp';
import _Converter from '../Config/_Converter';
import { _Decrypt } from '../Config/_Decrypt';
import { Pass } from '../api/Calls';
import { _EdtPas } from '../Redux/Reducer/_Pasien';
import { _delPas, _editPas } from '../Config/_Calls';
import {useNavigate, useParams} from 'react-router-dom'
import _UMUR from '../Config/_UMUR';
function Pasiens(props) {
  const Navigator = useNavigate()


 
 const goToDetail = (id)=>{
    Navigator(`/detail/${id}`)
 }

  return (
    <div style={{margin:'10px'}}>

      {props?.data?
     <Card style={{zIndex:100, width: '18rem',margin:'10px 0px 10px' }} className='card-pas border-purple' onClick={()=>goToDetail(props?.data?.id)}>
     <Card.Header >Galuh Dental</Card.Header>
     <Card.Body>
       <Card.Title style={{fontSize:'13px'}}>Nama Pasien: {props.data?.name}</Card.Title>  
    <Card.Text>Umur : {_UMUR(props?.data?.tanggalLahir)} tahun</Card.Text>                        
    <Card.Footer>
     <small className="text-muted">Tanggal Daftar :  {new moment(props.data?.createdAt).format('LL')}</small>
    </Card.Footer>
    </Card.Body>
     {/* <Button onClick={()=>{handler(data.id)}}>Edit</Button> */}
     {props.edit?
          <Modals_Comp but={'Edit Pasien'}
          data={_Converter({name:props.data.name,id:props.data.id,tanggalLahir:props?.data?.tanggalLahir,alamat:_Decrypt(props?.data?.alamat),noTelp:_Decrypt(props?.data?.noTelp)})} 
          header={'FORM EDIT PASIEN'}  
          formId={'form-edit'}
          Actions={_editPas}
          Actions2={_delPas}
          idPas={props.data.id}
          onUpdates={props.updates}
          but2={"Delete Pasien"}
          />
      :
      ""
    }
 
     </Card>  
      :
      ""
      
      
      }
 
  
    </div>
  )
}

export default Pasiens