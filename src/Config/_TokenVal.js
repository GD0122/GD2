import React from 'react'
import CryptoJS from 'crypto-js'
function _TokenVal(data) {
    const SALT = process.env.REACT_APP_SALTS
    const bytes = CryptoJS.AES.decrypt(data,SALT)
    return bytes.toString(CryptoJS.enc.Utf8)
}

export default _TokenVal