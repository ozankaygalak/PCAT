const Photo = require('../models/Photo');

exports.indexController = async (req, res) => {
  const photos = await Photo.find({});
  console.log(req.query);
  res.render('index', { photos });
};

exports.digerIndexController = async (req, res) => {
  const page = req.query.page || 1;
  const photoPerPage = 2;
  const totalPhotos = await Photo.find().countDocuments();
  const photos = await Photo.find({})
    .sort('-dateCreate')
    .skip((page - 1) * photoPerPage)
    .limit(photoPerPage);
  res.render('index', {
    photos,
    current: page,
    pages: Math.ceil(totalPhotos / photoPerPage),
  });
};

exports.aboutController = (req, res) => {
  res.render('about');
};

exports.contactController = (req, res) => {
  res.render('contact');
};
