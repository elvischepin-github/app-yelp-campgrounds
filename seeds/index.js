const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i = 0; i < 400; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '66e464230b46f44c83e6b091',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium atque repellat sapiente error maxime perspiciatis excepturi, voluptate eum itaque consequuntur magni debitis id sed mollitia?',
            price: price,
            geometry: {
                type: "Point",
                coordinates: [
                  cities[random1000].longitude,
                  cities[random1000].latitude
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/ddio4szzz/image/upload/v1727609262/YelpCamp/lbxzhyz8ptfd3zowbrgk.png',
                  filename: 'YelpCamp/lbxzhyz8ptfd3zowbrgk',
                },
                {
                  url: 'https://res.cloudinary.com/ddio4szzz/image/upload/v1727554104/YelpCamp/sejbdw9zlzuykexhkave.png',
                  filename: 'YelpCamp/sejbdw9zlzuykexhkave',
                }
              ]
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
    console.log("Connection closed");
})