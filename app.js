const express = require('express');
const ejs = require('ejs');
const path = require('path');
const app = express();
const fs = require('fs');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const Photo = require('./models/Photo');
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

mongoose.connect('mongodb://localhost:27017/pcat-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.get('/photos/:id', async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    res.render('photo', { photo }); // Pass the single 'photo' object, not an array
  } catch (err) {
    // Handle errors, e.g., photo not found in the database
    res.status(404).send('Photo not found');
  }
});

app.get('/', async (req, res) => {
  const photos = await Photo.find({});
  res.render('index', { photos });
});
app.get('/index', async (req, res) => {
  const photos = await Photo.find({});
  res.render('index', { photos });
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/contact', (req, res) => {
  res.render('contact');
});

app.post('/photos', async (req, res) => {
  const uploadDir = 'public/uploads';

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  };
  let uploadImage = req.files.image;
  let uploadPath = __dirname + '/public/uploads/' + uploadImage.name;
  uploadImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadImage.name
    });
    res.redirect('/');
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`server ${port} de çalışıyor`);
});
