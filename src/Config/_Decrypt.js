import CryptoJS from "crypto-js"

export const _Decrypt = (data)=>{
    const salt = process.env.REACT_APP_SALT
    const decrypt = CryptoJS.AES.decrypt(data.toString(), salt)
    const bytes = decrypt.toString(CryptoJS.enc.Utf8)
    return bytes
 }