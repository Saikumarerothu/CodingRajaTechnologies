const express = require('express');
const path =require('path');
const fileupload=require('express-fileupload')


let initial_path = path.join(__dirname,"public");
const app = express();
app.use(express.static(initial_path));
app.use(fileupload())
app.post('/upload',(req,res)=>{
let file =req.files.image;
let date =new Date();
let imagename=date.getDate()+date.getTime()+file.name;
let path='public/uploads/'+imagename;
file.mv(path,(err,result)=>
{
    if(err)
    {
        throw err;
    }
    else
    {
        res.send('uploads/' + imagename);
    }
})

})
app.get('/',(req,res)=>
{
    res.sendFile(path.join(initial_path,"uploads/home.html"));
   
})
app.get('/editor',(req,res)=>
{
    res.sendFile(path.join(initial_path,"uploads/editor.html"));
})
app.get('/admin',(req,res)=>
{
    res.sendFile(path.join(initial_path,"uploads/dashboard.html"));
})
app.get('/:blog',(req,res)=>{
res.sendFile(path.join(initial_path,"uploads/blog.html"));
})
app.get('/:blog/editor',(req,res)=>{
    res.sendFile(path.join(initial_path,"uploads/editor.html"));
})
app.use((req,res)=>{
    res.json("404");
})
app.listen("3006",()=>
{
    console.log('listening...');
})
