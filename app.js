const express=require('express')
const bodyParser=require('body-parser')
const JWT=require('jsonwebtoken')
const session=require('express-session')

const port=3000
const app=express()
const router=express.Router()

const Studet = require ('./models').student
const Teacher = require ('./models').teacher
const Classes = require ('./models').classes


app.use(bodyParser.json())
app.use(express.static("C:/Users/user/Desktop/NewProject"))
var urlencodedParser= bodyParser.urlencoded({extended:true})
app.use(session({'secret':'aQzqr425'}))


app.get("/login",(req,res)=>{
    
    res.sendFile("C:/Users/user/Desktop/NewProject/html/login.html")
   
})

app.get("/register",(req,res)=>{
    res.sendFile("C:/Users/user/Desktop/NewProject/html/register.html")
})
app.get("/student",(req,res)=>{
    res.sendFile("C:/Users/user/Desktop/NewProject/html/anasayfa.html")
})
app.get("/logout",(req,res)=>{
    delete req.session.adi
    res.redirect("/login")
})
app.get("/ogrmrkyt",(req,res)=>{
    res.sendFile("C:/Users/user/Desktop/NewProject/html/ogrmrkyt.html")
})
app.get("/ogrmlogn",(req,res)=>{
    res.sendFile("C:/Users/user/Desktop/NewProject/html/ogrmlogn.html")
})

app.post("/register",(req,res)=>{
    Studet.create({name:req.body.name,surname:req.body.surname,classNumber:req.body.classNumber,perm:'student'}).then(user=>{
        res.sendFile("C:/Users/user/Desktop/NewProject/html/login.html")
    }).catch(e=>console.log(e))
})
var kontrlToken
router.post("/login",urlencodedParser,(req,res)=>{
    let sNumber= req.body.classNumber
    Studet.findAll().then(User=>{
        // console.log(User.lenght)
        const {classNumber}=sNumber
            const {perm}='stutend'
        for(let i=0;i<User.length;i++){
        if(sNumber==User[i].classNumber){
            const token=JWT.sign({
                classNmber:classNumber,
                permmisions:perm,
                exp:Math.floor(Date.now()/1000)+60
             }, 'ogrenci')
             kontrlToken=token
             console.log(kontrlToken)
            res.sendFile("C:/Users/user/Desktop/NewProject/html/anasayfa.html")
        }else{
            console.log("Hatalı")
        }

        }
    }).catch(e=>console.log(e))
})

app.post("/ogrmnlogn",(req,res)=>{
    let tNumber=req.body.teacher
    Teacher.findAll().then(tUser=>{

        for(let i=0;i<tUser.lenght;i++){
            if(tNumber==tUser[i].tNumber){
                res.sendFile("C:/Users/user/Desktop/NewProject/html/anasayfa.html")
            }else{
                console.log("Hatalı")
            }
        }



    }).catch(e=>console.log(e))
})

app.post("/ogrmrkyt",(req,res)=>{
    Teacher.create({name:req.body.name,surname:req.body.surname,tNumber:req.body.tNumber,perm:'teacher'}).then(user=>{
        res.sendFile("C:/Users/user/Desktop/NewProject/html/ogrmlogn.html")
    }).catch(e=>console.log(e))
})




app.listen(port,()=>{
    console.log(`Server Aktif Bro \n{localhost:${port}}\nKolay Gelsin`)
})
