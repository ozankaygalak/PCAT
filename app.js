const express = require('express');
const ejs = require('ejs');
const path = require('path');
app.use(express.static('public'));
app.get('/', (req, res) => {
  //res.sendFile(path.resolve(__dirname, 'temp/index.html'));
  app.render('index.ejs')
});
app.set('view engine', 'ejs');
const app = express();
const port = 3000;
app.listen(port, () => {console.log(`server ${port} de çalışıyor`)});
