import CryptoJS from "crypto-js";


export const generateEncryption = ({plantText ='' , encryptionPassword = process.env.ENCRYPTION_SIGNATURE } = {}) => {

    const encrypt = CryptoJS.AES.encrypt(plantText, encryptionPassword).toString();
    return encrypt
}


export const generateDecryption = ({cypherText ='' , deCryptionPassword = process.env.ENCRYPTION_SIGNATURE } = {}) => {

    const decrypt = CryptoJS.AES.decrypt(cypherText, deCryptionPassword).toString(CryptoJS.enc.Utf8);
    return decrypt

}