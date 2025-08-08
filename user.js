const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const fs= require('fs');
const app = express()
const port = 3000
app.use(bodyParser.json())
const secretKey = 'useris@heroo';
const pt='C:\\Users\\shasa\\Downloads\\har har maha dev\\Week 3\\Week 3\\backend course selling app\\userfile.json';
const pt1='C:\\Users\\shasa\\Downloads\\har har maha dev\\Week 3\\Week 3\\backend course selling app\\admin.json';
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

app.post('/user/signup',(req,res)=>{
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



app.post('/user/login',(req,res)=>{
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



app.post('/user/buycourse',validationofuser,(req,res)=>{
  var coursename=req.body.course;
   fs.readFile(pt1, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("readfile error");
    }
    var mainuser= JSON.parse(data);
    var flag=0;
    for(var i=0;i<mainuser.length;i++){
        for(var j=0;j<mainuser[i].course.length;j++){
            if( mainuser[i].course[j]===coursename){
                flag=1;
               break;
      }

        }
    }
     if(flag===0){
      console.log("no username");
    }
      fs.readFile(pt, 'utf8', (err, userdata) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error reading user file");
      }

      const users = JSON.parse(userdata);
      const user = users.find(u => u.user === req.user.username);

      if (!user) {
        return res.status(404).send("User not found");
      }

      if (user.course.includes(coursename)) {
        return res.status(409).send("User already purchased this course");
      }

      user.course.push(coursename);

      fs.writeFile(pt, JSON.stringify(users), 'utf8', (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error writing to user file");
        }

        return res.send("Course purchased successfully!");
      });
    });
  });
});
app.get('/user/allcourse',validationofuser,(req,res)=>{
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