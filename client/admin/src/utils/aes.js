import CryptoJS from 'crypto-js';


const secretKey = 'secret key 123';
export default {
  encrypt (val) {
    console.log(val, typeof val)
    return CryptoJS.AES.encrypt(val, secretKey).toString();
  },
  decrypt (val) {
    const bytes = CryptoJS.AES.decrypt(val, secretKey);
    console.log('bytes:::',bytes);
    console.log(bytes.toString(CryptoJS.enc.Utf8))
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
 
