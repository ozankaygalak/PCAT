const express = require('express');
const ejs = require('ejs');
const path = require('path');
const app = express();
const methodOverride = require('method-override');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const Photo = require('./models/Photo');
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method',{
  methods: ['POST','GET']
}));

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

app.get('/photos/edit/:id', async (req, res) => {
  try {
    const photo = await Photo.findOne({ _id: req.params.id });
    res.render('edit', { photo }); // Pass the single 'photo' object, not an array
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
app.put('/photos/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.description = req.body.description;
  photo.message = req.body.message;
  photo.save();
  res.redirect(`/photos/${req.params.id}`);
});

app.delete('/photos/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  let deletedImage = __dirname + '/public' + photo.image;
  fs.unlinkSync(deletedImage);
  await Photo.findByIdAndRemove(req.params.id);
  res.redirect('/');
});

app.post('/photos', async (req, res) => {
  const uploadDir = 'public/uploads';

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  let uploadImage = req.files.image;
  let uploadPath = __dirname + '/public/uploads/' + uploadImage.name;
  uploadImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadImage.name,
    });
    res.redirect('/');
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`server ${port} de çalışıyor`);
});
