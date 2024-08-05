import moment from 'moment';
import React, { useEffect, useState } from 'react'
import {Table,Button} from 'react-bootstrap';
import SubModals from './SubModals';
import Modals_comp from './Modals_comp';
import _Converter from '../Config/_Converter';
import { _delJad } from '../Config/_Calls';
import PagePagination from './PagePagination';
function Tables(props) {
 

  const [pages,setPages]= useState(1)
  const [tableData, setTableData] = useState([]);



  function capitalizeFirstLetter(string) {
    return string.replace(/\b\w/g, char => char.toUpperCase());
  }
 
  useEffect(() => {
  
    setTableData(props.data || []);
  }, [props.data,props.pages]);

 const handlerPage = async(newPage)=>{
   await setPages(newPage)
 }
  const TableHead =tableData &&tableData.length > 0 && (
    <tr>
      {Object.keys(tableData[0]).map((key, index) => (
           <th key={index} hidden={key==='id' || key === 'pasienId' || key === "noTelp" }>
             {key ==='tgl_tdkn'?'Tanggal Tindakan': key === 'updatedAt'? "Terakhir di Ubah": key === 'createdAt' ?"Tanggal di Buat"  :  capitalizeFirstLetter(key) }
           </th>
      ))}
      <th>Edit</th>
       {props?.Details&&(
        <th>
          Detail
        </th>
       )}
    </tr>
  );


  const TableBody = tableData && tableData.length > 0 && (
    tableData.map((data, rowIndex) => (
      <tr key={rowIndex}>
        {Object.keys(data).map((key, colIndex) => (
         <td key={colIndex} hidden={key==='id' ||  key === 'pasienId' || key === "noTelp"   }>
          {
          key === 'tanggal' || key === 'updatedAt' || key === 'tgl_tdkn' || key === 'createdAt' ? new moment(data[key]).format('LL') : data[key]
          
          }</td> 
         
        ))}
        <td>
     
          <Modals_comp but={'Edit'}
            data={_Converter(data)} 
            onUpdates={props.Updates}
            header={'FORM EDIT REKAM PASIEN'}  
            formId={'form-edit'}
            idPas={props.idPas}
            Actions={props.act}
            Actions2={props.act2}
            but2={props.but2}
         />
        </td>
        {props.Details&&(
          <td>
            <Button onClick={() => props.ActionDetails(data?.pasienId)}>Detail</Button>
          </td>
         )}
         
         
      </tr>
    ))
  );

  const handleContactWhatsApp = (phoneNumbers) => {
    // Misalnya, untuk sederhananya, di sini Anda bisa membuka link WhatsApp
    const whatsappLink = `https://wa.me/${phoneNumbers[0]}`; // Anggap nomor pertama sebagai nomor utama
    window.open(whatsappLink);
  };
  return (
    <div >
      <div>
        <h3>{props.header}</h3>
      </div>
      <div className='table-responsive' style={{padding:'10px'}} >
       {props.data && props.data.length !== 0 ? 
        <Table style={{overflowX:'auto',fontSize:'10px',margin:'auto'}} striped bordered hover>
        <thead>
         
            {props.data? TableHead : ''}
         
        </thead>
        <tbody>
    
            {props.data? TableBody:""}
            
        </tbody>
      </Table>
      :
        <p>Data {props.header} Tidak Ditemukan</p>
      }
      

      </div>
      <PagePagination 
  
       Actions={props?.ActionsPage}
       pageName={props?.pageName}
       activePages = {pages}
       OnPageChange = {handlerPage}
       totalData={props?.totalData}
  />
    </div>
  )
}

export default Tables