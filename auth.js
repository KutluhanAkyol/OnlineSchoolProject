const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
// const SECRET_KEY ='8af7sd85gf4f5g4sd987e8rwef56d4saf798f7hgadf654v8a9f7d87'
dotenv.config()

module.exports=(req,res,next)=>{
    try {
        const token =req.headers.authorization.split(" ")[1]
        const decodedToken=jwt.verify(token,process.env.SECRET_KEY)
        
        next()
    } catch (error) {
       if(error.name=="TokenExpiredError"){
        return res.status(401).send({
            message:"Kullandığınız Tokenin Süresi Dolmuştur",
            status:-1
        })
       }else if(error.name=="JsonWebTokenError"){
        return res.status(401).send({
            message:"Kullandığınız Token Bu Sayfa İçin Geçersizdir",
            status:-1
        })
       }else{
        return res.status(401).send({
            message:'Kullandığınız Tokenin Bir Yetkisi Bulunmamaktadır',
            status:-1
        })
       }
    }
}