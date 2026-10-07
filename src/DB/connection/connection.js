import mongoose from "mongoose"


const DBconnection = async(req , res)=>{
    await mongoose.connect(process.env.DB_URI).then(res=>{
        console.log('Database Connected Successfully');
        
    }).catch(err=>{
        console.error('error while connecting to Database');
    })
}

export default DBconnection