import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { useControls } from 'react-zoom-pan-pinch';
import { FaSearchPlus, FaSearchMinus, FaSync, FaTimes, FaTrash } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import DeleteImgModals from './DeleteImgModals';
import _InterCon from '../api/_InterCon';
import Message from './Message';
import { URLAPIS } from '../Config/_Calls';
function ControlsImg(props) {

    const { zoomIn, zoomOut, resetTransform } = useControls();
    const [isOpen,setIsOpen] = useState(false)
    const toggleMenu = async()=>{
          setIsOpen(!isOpen)
    }
    console.log(props)
  

    const [isOpens, setIsOpens] = useState(false);

 const openModal = () => {
   setIsOpens(true);
  
  };

  const closeModalDelete = () => {
    setIsOpens(false);
  };

  const handleDelete = async () => {
    // Logika untuk menghapus gambar

    console.log('Menghapus gambar...');
    try {
     const delImg = await _InterCon.delete(`${URLAPIS}files/gambar/delete?pasienId=${props.idP}&imgId=${props.imgId}&imgGdId=${props?.imgGdId}`,
    {withCredentials:true})
    Message({ type: 'succes', message: delImg?.data?.message });
    } catch (error) {
        throw error
    }
    await props?.refreshImg()
    props?.Close()
    
    
  };
    
  return (
    <div id="controls" style={{ position: 'absolute', top: '10%', right: '20px', zIndex: '99999' }}>
          <div className={`hamburger-menu ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
          </div>
          {isOpen && (
              <div className="menu">
                  <IconContext.Provider value={{ size: '1.5em' }}>
                        <Button className="control-button" onClick={() => zoomIn()}>
                            <FaSearchPlus />
                        </Button>
                        <Button className="control-button" onClick={() => zoomOut()}>
                            <FaSearchMinus />
                        </Button>
                        <Button className="control-button" onClick={() => resetTransform()}>
                            <FaSync />
                        </Button>
                        <Button className='control-button' onClick={() => props?.Close()}>
                            <FaTimes />
                        </Button>
                        <Button className='control-button' onClick={() => openModal()}>
                            <FaTrash />
                        </Button>
                        <div>
                          <DeleteImgModals isOpen={isOpens} onClose={closeModalDelete} onDelete={handleDelete} />
                        </div>
                    </IconContext.Provider>
              </div>
          )}
     </div>
  )
}

export default ControlsImg


