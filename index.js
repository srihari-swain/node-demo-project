const express=require("express")
const { initializeApp } = require("firebase-admin")
const app=express()
const admin=require("firebase-admin")
const credentials=require("./key.json")
admin.initializeApp({
    credential:admin.credential.cert(credentials)
})
const db=admin.firestore()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.post("/create", async (req,res)=>{
    try{
        const id=req.body.email;
        const user={
            name:req.body.name,
            email:req.body.email,
            reg:req.body.reg
        }
        const result= await  db.collection('userinfo').add(user)
        res.send(result)
    }
    catch(err){
        res.send(err)
    }
})
app.get("/",async(req,res)=>{
    try{
        const userinfo= db.collection('userinfo')
        const response= await userinfo.get()
        let userarray=[]
        response.forEach(doc=>{
            userarray.push(doc.data())
        })
        res.send(userarray)
    }
    catch(err){
        res.send(err)
    }
})
app.get("/:id",async(req,res)=>{
    try{
const user=db.collection('userinfo').doc(req.params.id)
const result=await user.get()
res.send(result.data)()
    }
    catch(err){
        res.send(err)
    }
})
app.put("/update/:id",async(req,res)=>{
    const user= db.collection("userinfo").doc(req.params.id).update({
        name:req.body.name,
        email:req.body.email,
        reg:req.body.reg
    })
    if(user){
        res.send("update successfully")
    }
    else{
        res.send(err)
    }
    
})
app.delete("/delete/:id",async(req,res)=>{
    const user= db.collection('userinfo').doc(req.params.id).delete()
    if(user){
        res.send("delete the user info")
    }
    else{
        res.send(err)
    }
})
app.listen(3000,(req,res)=>{
    console.log("connection successfully..")
})