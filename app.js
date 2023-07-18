const express = require('express');
const ejs = require('ejs');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const Photo = require('./models/Photo');
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/pcat-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/', async (req, res) => {
  const photos = await Photo.find({});
  res.render('index',{photos});
});
app.get('/index', (req, res) => {
  res.render('index');
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/contact', (req, res) => {
  res.render('contact');
});

app.post('/photos', async (req, res) => {
  await Photo.create(req.body);
  res.redirect('/');
});

const port = 3001;
app.listen(port, () => {
  console.log(`server ${port} de çalışıyor`);
});
