import _InterCon from "../api/_InterCon"
import Message from "../components/Message"



export const URLAPIS = process.env.REACT_APP_SERVER_API || 'http://localhost:5500/'
export const origin = process.env.REACT_APP_ORIGIN_SERVER || 'http://localhost:3000'
export const _addPass = (data)=>{

    return new Promise(async(resolve,reject)=>{
        try {
            const dt =  await _InterCon.post(`${URLAPIS}pasien/addPasiens`,{
             origin,
             name:data?.name,
             noTelp:data?.noTelp,
             tanggalLahir:data?.tanggalLahir,
             alamat:data?.alamat,
             _csrf:data?.cs
           },{withCredentials:true})
           .catch((err)=>{
             throw err
           }).then((res)=>{
              return res.data
           })
            resolve(dt)
         } catch (error) {
            if(error.code === "ERR_NETWORK"){
              return reject("Upss...mohon tunggu sebentar")
            }
            console.log(error)
            reject(error?.response?.data?.message || error.response.data || "Upss...mohon tunggu sebentar")
         }
    })

}
export const _addRekam = (data)=>{

   return new Promise(async(resolve,reject)=>{
       try {
           const dt =  await _InterCon.post(`${URLAPIS}rekam/tambah_rekam/${data.idP}`,{
            tindakan:data.tindakan,
            terapi:data.terapi,
            dokter:data.dokter,
            perawat:data.perawat,
            diagnosa:data.diagnosa,
            _csrf:data?.cs
          },{withCredentials:true})
          .catch((err)=>{
            throw err
          }).then((res)=>{
             return res.data.message
          })
           resolve(dt)
        } catch (error) {
           if(error.code === "ERR_NETWORK"){
             return reject("Upss...mohon tunggu sebentar")
           }
           
           reject(error?.response?.data?.message || error.response.data || "Upss...mohon tunggu sebentar")
        }
   })

}


export const _addJadwal = (data)=>{

   return new Promise(async(resolve,reject)=>{
      console.log("this",data)
       try {
           const dt =  await _InterCon.post(`${URLAPIS}jadwal/tambah_jadwal/${data.idP}`,{
            waktu:data.waktu,
            tanggal:new Date(data.tanggal),
            _csrf:data?.cs
          },{withCredentials:true})
          .catch((err)=>{
            throw err
          }).then((res)=>{
             return res.data.message
          })
           resolve(dt)
        } catch (error) {
           if(error.code === "ERR_NETWORK"){
             return reject("Upss...mohon tunggu sebentar")
           }
           console.log("dasdas",error)
           reject(error?.response?.data?.message || error.response.data || "Upss...mohon tunggu sebentar")
        }
   })

}





export const _editPas = async(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            const dt =  await _InterCon.put(`${URLAPIS}pasien/edit/${data?.id}`,{
               name:data?.name,
               noTelp:data?.noTelp,
               tanggalLahir:data.tanggalLahir,
               alamat:data?.alamat,
              _csrf:data?.cs
           },{withCredentials:true})
           .catch((err)=>{
             throw err
           }).then((res)=>{
              return res.data
           })
            resolve(dt)
         } catch (error) {
       
            if(error.code === "ERR_NETWORK"){
              return reject("Upss...mohon tunggu sebentar")
            }
            reject(error?.response?.data?.message || error.response.data || "Upss...mohon tunggu sebentar")
         }
    })
 
}

export const _editRekam = async(data)=>{
   return new Promise(async(resolve,reject)=>{
      console.log('tjhsa',data.id)
       try {
           const dt =  await _InterCon.put(`${URLAPIS}rekam/edit/${data?.id}`,{
              tindakan:data?.tindakan,
              diagnosa:data?.diagnosa,
              dokter:data.dokter,
              perawat:data?.perawat,
              terapi:data.terapi,
             _csrf:data?.cs
          },{withCredentials:true})
          .catch((err)=>{
            throw err
          }).then((res)=>{
             return res.data.message
          })
           resolve(dt)
        } catch (error) {
      
           if(error.code === "ERR_NETWORK"){
             return reject("Upss...mohon tunggu sebentar")
           }
           reject(error?.response?.data?.message || error.response.data || "Upss...mohon tunggu sebentar")
        }
   })

}


export const _editJadwal = async(data)=>{
   return new Promise(async(resolve,reject)=>{
      console.log('tjhsa',data)
       try {
           const dt =  await _InterCon.put(`${URLAPIS}jadwal/edit/${data?.id}`,{
              waktu:data.waktu,
              tanggal:new Date(data.tanggal),
             _csrf:data?.cs
          },{withCredentials:true})
          .catch((err)=>{
            throw err
          }).then((res)=>{
             return res.data.message
          })
           resolve(dt)
        } catch (error) {
      
           if(error.code === "ERR_NETWORK"){
             return reject("Upss...mohon tunggu sebentar")
           }
           reject(error?.response?.data?.message || error.response.data || "Upss...mohon tunggu sebentar")
        }
   })

}


export const _delPas = async(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            const dt =  await _InterCon.delete(`${URLAPIS}pasien/delete_pas/${data?.id}`,{
             _csrf:data?._csrf
           },{withCredentials:true})
           .catch((err)=>{
             throw err
           }).then((res)=>{
              return res.data
           })
            resolve(dt)
         } catch (error) {
            if(error.code === "ERR_NETWORK"){
               reject("Upss...mohon tunggu sebentar")
            }
            reject(error?.response?.data?.message || error.response.data || "Upss...mohon tunggu sebentar")
         }
    })
}


export const _delRekam = async(data)=>{
   return new Promise(async(resolve,reject)=>{
       try {
           const dt =  await _InterCon.delete(`${URLAPIS}rekam/delete/${data?.id}`,{
            _csrf:data?._csrf
          },{withCredentials:true})
          .catch((err)=>{
            throw err
          }).then((res)=>{
             return res.data.message
          })
           resolve(dt)
        } catch (error) {
           if(error.code === "ERR_NETWORK"){
              reject("Upss...mohon tunggu sebentar")
           }
           reject(error?.response?.data?.message || error.response.data || "Upss...mohon tunggu sebentar")
        }
   })
}


export const _delJadwal = async(data)=>{
   return new Promise(async(resolve,reject)=>{
      try {
          const dt =  await _InterCon.delete(`${URLAPIS}jadwal/delete/${data?.id}`,{
           _csrf:data?._csrf
         },{withCredentials:true})
         .catch((err)=>{
           throw err
         }).then((res)=>{
            return res.data
         })
          resolve(dt)
       } catch (error) {
      
         reject(error?.response?.data?.message || error.response.data || "Upss...mohon tunggu sebentar")
       }
  })
}

export const _addJad = async(data)=>{
   return new Promise(async(resolve,reject)=>{
      console.log("this",data.id)
      console.log(typeof data.tanggal)
      try {
          const dt =  await _InterCon.post(`${URLAPIS}jadwal/tambah_jadwal/${data?.id}`,
        {
           waktu:data.waktu,
           tanggal:new Date(data.tanggal),
           _csrf:data?._csrf
         },{withCredentials:true})
         .catch((err)=>{
           throw err
         }).then((res)=>{
            console.log(res)
            return res.data.message
         })
          resolve(dt)
       } catch (error) {
         if(error.code === "ERR_NETWORK"){
            reject("Upss...mohon tunggu sebentar")
         }
         reject(error?.response?.data?.message || error.response.data || "Upss...mohon tunggu sebentar")
      }
       
  })
}

export const _editJad = async(data)=>{
   return new Promise(async(resolve,reject)=>{
  
  
      try {
          const dt =  await _InterCon.post(`${URLAPIS}jadwal/edit/${data?.id}`,
        {
           waktu:data.waktu,
           tanggal:new Date(data.tanggal),
           _csrf:data?._csrf
         },{withCredentials:true})
         .catch((err)=>{
           throw err
         }).then((res)=>{
            return res.data.message
         })
          resolve(dt)
       } catch (error) {
         if(error.code === "ERR_NETWORK"){
            reject("Upss...mohon tunggu sebentar")
         }
         reject(error?.response?.data?.message || error.response.data || "Upss...mohon tunggu sebentar")
      }
       
  })
}