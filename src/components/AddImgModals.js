import React, { useState } from 'react';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import './addimages.css';
import _InterCon from '../api/_InterCon';
import Message from './Message';
import {useDispatch,connect} from 'react-redux'
import { getDetail, getPass } from '../Redux/Reducer/_Pasien';
import { URLAPIS } from '../Config/_Calls';

function AddImgModals({...props}) {
    const [images, setImages] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [isBlur, setIsBlur] = useState(false);
    const [load,setLoad] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const handleImageChange = (event) => {
        setLoad(true)
        const fileList = event.target.files;
        const newImages = [];
        const newFileList = []
        let totalSize = 0;
        for (let i = 0; i < fileList.length; i++) {
            totalSize += fileList[i].size;
            if (totalSize <= 5 * 1024 * 1024 && (images.length + newImages.length) < (props?.jmlft || 5) && 
            fileList[i].type === 'image/jpeg' || fileList[i].type === 'image/png' || fileList[i].type === 'image/jpg' )  {
                const image = URL.createObjectURL(fileList[i]);
                newImages.push({ url: image, name: fileList[i].name });
                newFileList.push(fileList[i])
            } else {
                alert("Anda hanya dapat mengunggah file png/jpg, maksimal 5 file, dan file size max 5mb.");
                break;
            }
        }
        setSelectedFiles([...selectedFiles,...newFileList])
        setImages([...images,...newImages])
        setLoad(false)
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        setLoad(true)


            const formData = new FormData();
            for (let i = 0; i < selectedFiles.length; i++) {
                formData.append('images', selectedFiles[i]);
            }
            const cs = localStorage.getItem('cs')
            formData.append('_csrf',cs)
            formData.append('idP',props?.idP)
            
            try {
                const response = await _InterCon.post(`${URLAPIS}files/uploads`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log(response.data.message);
                Message({type : 'succes', message: response?.data?.message || "file berhasil diupload" })
            } catch (error) {
                console.log(error)
                Message({type:'error',message:error?.response?.data?.message || "maaf ada sesuatu yang salah"})
                setLoad(false)
            }

        setImages([])
        setSelectedFiles([])
        props.onUpdates()
        handleCloseModal();
        setLoad(false) 
    };

    const handleRemoveImage = (index) => {
        const newImages = [...images];
        const newFileList = [...selectedFiles]
        newImages.splice(index, 1);
        newFileList.splice(index, 1);
        setImages(newImages);
        setSelectedFiles(newFileList)
    };

    const handleImageError = (index) => {
        alert(`File ${images[index].name} tidak dapat dimuat. gambar tersebut tidak bisa diupload.`);
        handleRemoveImage(index);
    };

    const handleReplaceImage = (index) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.multiple = false;
        input.onchange = (event) => handleReplace(event, index);
        input.click();
    };

    const handleReplace = (event, index) => {
        const fileList = event.target.files;
        if (fileList.length > 0) {
            const newImage = URL.createObjectURL(fileList[0]);
            const newImages = [...images];
            newImages[index] = { url: newImage, name: fileList[0].name };
            setImages(newImages);
        }
    };

    const handleImageClick = (index) => {
        if (selectedImageIndex === index) {
            setSelectedImageIndex(null);
            setIsBlur(false);
        } else {
            setSelectedImageIndex(index);
            setIsBlur(true);
        }
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
  
    return (
        <div>
            
            <Button onClick={handleShowModal}>Tambah Foto</Button>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Form Unggah Gambar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit} className='mt-5 ' >
                        <fieldset disabled={load}>

                      
                        <Button  as='label' htmlFor="imageInput">Pilih Gambar</Button>
                        <input
                            type="file"
                            id="imageInput"
                            name="images"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            style={{ visibility: 'hidden', width: '1px', height: '1px' }}
                        />
                        </fieldset>
                    </Form>
                    <div>
                        <div style={{
                            minWidth: '98%', height: 'max-content', display: 'flex', justifyContent: 'center',
                            flexWrap: 'wrap'
                        }}>
                            {images.map((gambar, index) => (
                                <div key={index} className='image-comp'

                                    style={{
                                        background: `url(${gambar.url})`,
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        position: 'relative',
                                    }}
                                    onClick={() => handleImageClick(index)}
                                >
                                    <img
                                        src={gambar.url}
                                        alt={`Image ${index}`}
                                        style={{
                                            display: 'none'
                                        }}
                                        onError={() => handleImageError(index)}
                                    />
                                    {selectedImageIndex === index && (
                                        <div id='btn-edtimg' style={{
                                            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                                            display: 'flex', justifyContent: 'center',
                                            backdropFilter: 'none',

                                        }}>
                                            {/* <Button id='btn-editimg' style={{ marginRight: '10px', height: 'max-content' }} onClick={() => handleReplaceImage(index)}>Ganti</Button> */}
                                            <Button id='btn-delimg' variant="danger" onClick={() => handleRemoveImage(index)}>Hapus</Button>
                                        </div>
                                    )}
                                </div>
                            ))}

                            <div className='image-comp' style={{ display: images.length === 5 ? 'none' : 'block' }}>
                                <span className='span-img' ></span>
                            </div>

                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                        {load ? (
                            <Button className='mt-2' type="button" style={{ display: images.length === 0 ? 'none' : 'block' }} disabled>
                            <Spinner size='sm' style={{ fontSize: '12px', marginRight: '5px' }} /> Mengupload Gambar...
                          </Button>
                       
                        ) : (
                            <Button className='mt-2' type="submit" style={{ display: images.length === 0 ? 'none' : 'block' }} onClick={handleSubmit}>
                            Unggah
                         </Button>
                             
                        )}
                        </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default  connect() (AddImgModals);