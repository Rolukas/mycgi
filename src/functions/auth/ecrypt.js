import CryptoJS from 'crypto-js';

const key = CryptoJS.enc.Utf8.parse('AMINHAKEYTEM32NYTES1234567891234');
const iv = CryptoJS.enc.Utf8.parse('7061737323313233');

const encryptor = string => {
  const encryptedString = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(string), key, {
    keySize: 128,
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();

  return encryptedString;
};

export default encryptor;
