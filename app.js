const express=require('express')
const bodyParser=require('body-parser')
const jwt=require('jsonwebtoken')
const checkJwt=require('./auth')
const ogrmtcheckJwt=require('./ogrtmenKntrl')
const dotenv=require('dotenv')
dotenv.config()


const port=3000
const app=express()
const Router=express.Router()

const Studet = require ('./models').student
const Teacher = require ('./models').teacher
const Sinif = require ('./models').sinif


app.use(bodyParser.json())
app.use(express.json())
app.use(express.static("C:/Users/DC/Desktop/NewProject"))
var urlencodedParser= bodyParser.urlencoded({extended:true})
// app.use(session({'secret':'aQzqr425'}))


app.get("/login",(req,res)=>{
    
    res.sendFile("C:/Users/DC/Desktop/NewProject/html/login.html")
   
})
app.get("/register",(req,res)=>{
    res.sendFile("C:/Users/DC/Desktop/NewProject/html/register.html")
})
app.get("/student",checkJwt,(req,res)=>{
    res.sendFile("C:/Users/DC/Desktop/NewProject/html/anasayfa.html")
})
app.get("/logout",(req,res)=>{
    delete req.session.adi
    res.redirect("/login")
})
app.get("/ogrmrkyt",(req,res)=>{
    res.sendFile("C:/Users/DC/Desktop/NewProject/html/ogrmrkyt.html")
})
// C:\Users\DC\Desktop\NewProject\html\login.html
app.get("/ogrmlogn",(req,res)=>{
    res.sendFile("C:/Users/DC/Desktop/NewProject/html/ogrmlogn.html")
})
app.post("/register",urlencodedParser,(req,res)=>{

    let kName=req.body.name
    let kSurname=req.body.surname
    let kClassNumber=req.body.classNumber

    Studet.create({name:kName,surname:kSurname,classNumber:kClassNumber,perm:'student'}).then(user=>{

        res.send(`Yeni Öğrenci Kayıdı Başarı İle Gerçekleşti \nHoşgeldin Aramıza ${kName} ${kSurname}`)

        // res.sendFile("C:/Users/DC/Desktop/NewProject/html/login.html")
    }).catch(e=>console.log(e))
})
app.post("/login",urlencodedParser,(req,res)=>{
    let sNumber=req.body.clasNumber
    Studet.findAll().then(user=>{
        // console.log(user.length)
        for(let i=0;i<user.length;i++){

            // console.log(user[i].classNumber)

            if(sNumber==user[i].classNumber){
                // console.log(user[i].classNumber)
                const createToken=jwt.sign({
                    snfNumber:user[i].classNumber,
                    perm:'studet'
                },process.env.SECRET_KEY,{expiresIn:'2m'})
                // console.log(createToken)
                console.log(`Öğrenci Tokeniniz Oluşturulmuştur \n${createToken}`)
                
                // res.sendFile("C:/Users/DC/Desktop/NewProject/html/anasayfa.html")
                break;
            }else{
                console.log("Hata!!")
            }
        }
    })
})
// function createToken(sNumber,perm){
//     jwt.sign({sNumber,perm}, 'secretKey', '1d')

// }
app.post("/ogrmnlogn",urlencodedParser,(req,res)=>{
    let tNumber=req.body.teacher
    Teacher.findAll().then(tUser=>{

        for(let i=0;i<tUser.length;i++){
            if(tNumber==tUser[i].tNumber){
                
                const ogrtmnCreatToken=jwt.sign({
                    ogrtmnNumber:req.body.teacher,
                    perm:'teacher'
                },process.env.SECRET_KEY_OGRMT,{expiresIn:'2m'})
                console.log("Oğretmen Tokeni: ",ogrtmnCreatToken)
               
                // res.sendFile("C:/Users/DC/Desktop/NewProject/html/anasayfa.html")
                break;
            }else{
                console.log("Hatalı")
            }
        }



    }).catch(e=>console.log(e))
})

app.post("/ogrmrkyt",urlencodedParser,(req,res)=>{
    let ogrtmnName=req.body.name
    let ogrtmnSurname=req.body.surname
    let phoneNumber=req.body.tNumber
    let perms='teacher'
    Teacher.create({name:ogrtmnName,surname:ogrtmnSurname,tNumber:phoneNumber,perm:perms}).then(user=>{
        res.send(`Öğretmen Kayıtı Başarılı. Aramıza Hoşgeldiniz ${ogrtmnName} ${ogrtmnSurname}`)
    }).catch(e=>console.log(e))
})

app.post("/creatDers",urlencodedParser,ogrmtcheckJwt,(req,res)=>{
    let classesName=req.body.class
    let lessoName=req.body.lesson
    let teacherrName=req.body.teacher
    let studenttName=req.body.student
    Sinif.create({className:classesName,lessonName:lessoName,teacherName:teacherrName,studentName:studenttName}).then(user=>{
        res.send("Ders Oluşturuldu")
    }).catch(e=>console.log(e))
})


app.get("/dersler",checkJwt,(req,res)=>{
    Sinif.findAll().then(User=>{
        for(let i=0;i<User.length;i++){
            res.send(User[i])
        }
    })
})












app.listen(port,()=>{
    console.log(`Server Aktif Bro \n{localhost:${port}}\nKolay Gelsin`)
})
