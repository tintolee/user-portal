import CryptoJS from 'crypto-js';

export const encryptData = (dataToEncrypt: string, secret: string) => {
  const data = CryptoJS.AES.encrypt(dataToEncrypt, secret).toString();

  return data;
};

export const decryptData = (dataToDecrypt: string, secret: string) => {
  const bytes = CryptoJS.AES.decrypt(dataToDecrypt, secret);

  try {
    const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return data;
  } catch (error) {
    return false;
  }
};
