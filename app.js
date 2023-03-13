const express=require('express')
const bodyParser=require('body-parser')
const jwt=require('jsonwebtoken')
const checkJwt=require('./auth')
const ogrmtcheckJwt=require('./ogrtmenKntrl')
const dotenv=require('dotenv')
dotenv.config()


const port=3000
const app=express()


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
    let kClass=req.body.class

    Studet.create({name:kName,surname:kSurname,classNumber:kClassNumber,class:kClass,perm:'student'}).then(user=>{

        res.send(`New Student Registration Successfully Made \nWelcome to Us ${kName} ${kSurname}`)

        // res.sendFile("C:/Users/DC/Desktop/NewProject/html/login.html")
    }).catch(e=>console.log(e))
})
var loginUser
app.post("/login",urlencodedParser,(req,res)=>{
    let sNumber=req.body.clasNumber
    let kName=req.body.name
    Studet.findAll().then(user=>{
        // console.log(user.length)
        for(let i=0;i<user.length;i++){

            // console.log(user[i].classNumber)

            if(sNumber==user[i].classNumber && kname== user[i].name){
                // console.log(user[i].classNumber)
                const createToken=jwt.sign({
                    snfNumber:sNumber,
                    perm:'studet'
                },process.env.SECRET_KEY,{expiresIn:'2m'})
                // console.log(createToken)
                // console.log(`Öğrenci Tokeniniz Oluşturulmuştur \n${createToken}`)
                res.send({createToken})
                loginUser=user[i].class
                //#291b1b
                // 
                // res.sendFile("C:/Users/DC/Desktop/NewProject/html/anasayfa.html")
                break;
            }else{
                console.log("Your Class Number And Name Is Incorrect")
            }
        }
    })
})
// function createToken(sNumber,perm){
//     jwt.sign({sNumber,perm}, 'secretKey', '1d')

// }
app.post("/ogrmnlogn",urlencodedParser,(req,res)=>{
    let tNumber=req.body.TNumber
    Teacher.findAll().then(tUser=>{

        for(let i=0;i<tUser.length;i++){
            if(tNumber==tUser[i].tNumber){
                
                const ogrtmnCreatToken=jwt.sign({
                    ogrtmnNumber:req.body.teacher,
                    perm:'teacher'
                },process.env.SECRET_KEY_OGRMT,{expiresIn:'2m'})
                res.send({ogrtmnCreatToken})
               
                // res.sendFile("C:/Users/DC/Desktop/NewProject/html/anasayfa.html")
                break;
            }else{
                console.log("Your Teacher Number is Incorrect")
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
        res.send(`Teacher Registration Successful. Welcome ${ogrtmnName} ${ogrtmnSurname}`)
    }).catch(e=>console.log(e))
})

app.post("/creatDers",urlencodedParser,ogrmtcheckJwt,(req,res)=>{
    let classesName=req.body.class
    let lessoName=req.body.lesson
    let teacherrName=req.body.teacher
    let studenttName=req.body.student
    Sinif.create({className:classesName,lessonName:lessoName,teacherName:teacherrName,studentName:studenttName}).then(user=>{
        res.send("Course Created")
    }).catch(e=>console.log(e))
})


app.get("/dersler",checkJwt,(req,res)=>{
    Sinif.findAll().then(User=>{
        for(let i=0;i<User.length;i++){
            if(loginUser==User[i].className){
                res.send(User[i])
            }else{
                res.send("There are no courses in your current class.")
            }
        }
    })
})

app.listen(port,()=>{
    console.log(`Server Active Bro \n{localhost:${port}}\nGood luck`)
})
