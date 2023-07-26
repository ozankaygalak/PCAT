const fs = require('fs');
const Photo = require('../models/Photo');

exports.photoDelete = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  let deletedImage = __dirname + '/../public' + photo.image;
  fs.unlinkSync(deletedImage);
  await Photo.findByIdAndRemove(req.params.id);
  res.redirect('/');
};

exports.photoPost = async (req, res) => {
  const uploadDir = 'public/uploads';

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  let uploadImage = req.files.image;
  let uploadPath = __dirname + '/../public/uploads/' + uploadImage.name;
  uploadImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadImage.name,
    });
    res.redirect('/');
  });
};

exports.photoPut = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.description = req.body.description;
  photo.message = req.body.message;
  photo.save();
  res.redirect(`/photos/${req.params.id}`);
};

exports.photoEdit = async (req, res) => {
  try {
    const photo = await Photo.findOne({ _id: req.params.id });
    res.render('edit', { photo }); // Pass the single 'photo' object, not an array
  } catch (err) {
    // Handle errors, e.g., photo not found in the database
    res.status(404).send('Photo not found');
  }
};

exports.getPhoto = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    res.render('photo', { photo }); // Pass the single 'photo' object, not an array
  } catch (err) {
    // Handle errors, e.g., photo not found in the database
    res.status(404).send('Photo not found');
  }
};
