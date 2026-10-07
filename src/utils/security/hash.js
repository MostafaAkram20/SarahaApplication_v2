import bcrypt from 'bcrypt'


export const generateHash = ({plantText = '' , salt = process.env.SALT}={})=>{

    const hash = bcrypt.hashSync(plantText , parseInt(salt));
    return hash
}

export const compareHash = ({plantText = '' , hashedValue=''}={})=>{

    const comapareHash = bcrypt.compareSync(plantText , hashedValue);
    return comapareHash
}