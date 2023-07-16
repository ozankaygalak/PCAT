const express = require('express');
const ejs = require('ejs');
const path = require('path');
const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  //res.sendFile(path.resolve(__dirname, 'views/index.ejs'));
  res.render('index')
});
app.get('/index',(req,res) =>{
  res.render('index')
});
app.get('/about',(req,res) =>{
    res.render('about')
});
app.get('/contact',(req,res) =>{
    res.render('contact')
});


const port = 3001;
app.listen(port, () => {
  console.log(`server ${port} de çalışıyor`);
});
