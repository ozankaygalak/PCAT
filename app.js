const express = require('express');
const ejs = require('ejs');
const app = express();
const methodOverride = require('method-override');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const photoControllers = require('./controllers/photoControllers');
const pageControllers = require('./controllers/pageControllers');
const { connect } = require('http2');
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

mongoose
  .connect(
    'mongodb+srv://ozankaygalak:root@pcat-app.rymtjzq.mongodb.net/pcat-db?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('DB connected!');
  })
  .catch((err) => {
    console.log(err);
  });
app.get('/photos/:id', photoControllers.getPhoto);
app.get('/photos/edit/:id', photoControllers.photoEdit);
app.get('/', pageControllers.digerIndexController);
app.get('/index', pageControllers.indexController);
app.get('/about', pageControllers.aboutController);
app.get('/contact', pageControllers.contactController);
app.put('/photos/:id', photoControllers.photoPut);
app.delete('/photos/:id', photoControllers.photoDelete);
app.post('/photos', photoControllers.photoPost);

const port = process.env.port || 5000;
app.listen(port, () => {
  console.log(`server ${port} de çalışıyor`);
});
