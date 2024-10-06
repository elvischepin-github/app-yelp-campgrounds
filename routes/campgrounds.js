const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds.js');
const catchAsync = require('../utils/catchAsync.js');

const multer = require('multer'); // from 'npm install multer' for file upload middleware (parse form data)
const { storage } = require('../cloudinary'); // object that is defined and into which we store image files
const upload = multer({ storage }); // specify the destination folder for uploaded files

const { isLoggedIn, validateCampground, isAuthor } = require('../middleware.js');

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground));
    
router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

    
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))

module.exports = router;