import React from 'react'
import { useDispatch } from 'react-redux';
import { getPass } from '../Redux/Reducer/_Pasien';
import { Button } from 'react-bootstrap';

function Pagination({totalP}) {
  const pages = Array.from({ length: totalP }, (_, index) => index + 1);
  const dispatch = useDispatch()
  const handlePageChange = async(page)=>{
   await dispatch(getPass(page))
  }
  return (
    <div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
    {/* Tampilkan elemen halaman */}
    <div className='pagination' style={{display:'flex',justifyContent:'center',alignContent:'center',
    flexDirection:'row',flexWrap:'wrap'

    }}>
        {pages.map((page) => (
            <Button style={{margin:'10px'}} key={page} onClick={() => handlePageChange(page)}>
                {page}
            </Button>
        ))}
    </div>
</div>
  )
}

export default Pagination