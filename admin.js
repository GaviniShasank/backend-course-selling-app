const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const fs= require('fs');
const app = express()
const port = 3000
app.use(bodyParser.json())
const secretKey = 'shasankgavini@16';
const pt='C:\\Users\\shasa\\Downloads\\har har maha dev\\Week 3\\Week 3\\backend course selling app\\admin.json';

const validationofuser=(req,res,next)=>{
  const head = req.headers.check;
  try {
    const decode = jwt.verify(head, secretKey);
    req.user = decode;
    next();
  } catch (err) {
    return res.status(403).send("Not allowed: Invalid or expired token");
  }
}

app.post('/admin/signup',(req,res)=>{
    var user=req.body.user;
    var password=req.body.pas;
    console.log(user);
     fs.readFile(pt, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("readfile error");
    }
    var mainuser =[];
    mainuser= JSON.parse(data);
   
    var validate=mainuser.find(a=>a.user===user);
    if(validate){
      return res.status(409).send("user exists");
    }
    var ob={
      id:Date.now(),
      user:user,
      password:password,
      course:[]
    };
    mainuser.push(ob);
     fs.writeFile(pt, JSON.stringify(mainuser), 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return res.status(500).send("error in writefile");
    }
    console.log('File written successfully!');
    const t=jwt.sign({
      username:user
    },secretKey,{expiresIn: '2h'});
    console.log(t);
    res.send(t);
  });
});
});



app.post('/admin/login',(req,res)=>{
   var user=req.body.user;
    var password=req.body.pas;
     fs.readFile(pt, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("readfile error");
    }
    var mainuser =[];
    mainuser= JSON.parse(data);
   
    var validate=mainuser.find(a=>a.user===user&&a.password===password);
    if(validate){
       const t=jwt.sign({
      username:user
    },secretKey,{expiresIn: '2h'});
      console.log(t);
      return res.status(200).send(t);
  
    }
    else{
      return res.status(401).send(" Unauthorized");
    }
  });
});



app.post('/admin/addcourse',validationofuser,(req,res)=>{
  var coursename=req.body.course;
   fs.readFile(pt, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("readfile error");
    }
    var mainuser= JSON.parse(data);
    var flag=0;
    for(var i=0;i<mainuser.length;i++){
      if(mainuser[i].user===req.user.username){
        mainuser[i].course.push(coursename);
        flag=1;
        break;
      }
    }
    if(flag===0){
      console.log("no username");
    }
     fs.writeFile(pt, JSON.stringify(mainuser), 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return res.status(500).send("error in writefile");
    }
    console.log('File written successfully!');
    res.send("updated course");
  });
  });
});




app.get('/admin/allcourse',validationofuser,(req,res)=>{
   fs.readFile(pt, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("readfile error");
    }
    var mainuser= JSON.parse(data);
    var flag=0;
    const user = mainuser.find(u => u.user === req.user.username);
     if (!user) {
      return res.status(404).send("User not found");
    }
         return res.status(200).json({ courses: user.course });
    
  });

  });



app.get('/', (req, res) => {
  res.send("all are post apis so use postman or connect frontend to check the working of website");
})

app.listen(port, () => {
  console.log(3000);
})