const mongoose = require('mongoose');
const Review = require('./review');
const { campgroundSchema } = require('../schemas');
const { coordinates } = require('@maptiler/client');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String,
})
ImageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload', '/upload/w_200');
});

const opts = { toJSON: { virtuals: true } };
const CampgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    geometry: {
      type: {
        type: String,
        enum: ['Point'],
        required: true 
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, opts);

CampgroundSchema.virtual('properties.popUpMarkup').get(function(){
    return `
    <strong><a style="text-decoration: none; color: #039be5;" href="/campgrounds/${this._id}">${this.title}</a></strong></br>
    <b style="margin-left: 40%"></b>$${this.price}</b>
    `
});

CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
});

module.exports = mongoose.model('Campground', CampgroundSchema);