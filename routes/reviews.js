const express = require('express');
const router = express.Router({ mergeParams: true });
const { isLoggedIn, validateReview, isReviewAuthor } = require('../middleware.js');
const reviews = require('../controllers/reviews.js');
const catchAsync = require('../utils/catchAsync.js');

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;