if(process.env.NODE_ENV !== "production") {
    require('dotenv').config(); // from 'npm install dotenv' for environment variables (hidding sensitive data)
}

const express = require('express');
const path = require('path');

const mongoose = require('mongoose');
const ejsMate = require('ejs-mate'); // from 'npm install ejs-mate' boilerplate workflow
const flash = require('connect-flash'); // from 'npm i connect-flash' for flash messages
const passport = require('passport'); // from 'npm i passport' for authentication
const LocalStrategy = require('passport-local'); // from 'npm i passport-local' for authentication
const User = require('./models/user');
const helmet = require('helmet');

const mongoSanitize = require('express-mongo-sanitize');

const morgan = require('morgan');

const ExpressError = require('./utils/ExpressError');

const methodOverride = require('method-override'); // from

const userRoutes = require('./routes/users');
const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews');

const session = require('express-session');
const MongoStore = require("connect-mongo");

// const dbUrl = process.env.DB_URL;
// mongoose.connect(dbUrl);

const dbUrl = 'mongodb://localhost:27017/yelp-camp';
mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log('\x1b[31m%s\x1b[0m', "CONNECTED");
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.engine('ejs', ejsMate); 
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(mongoSanitize());

const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: 'thisshouldbeabettersecret!'
    }
});

store.on("error", function(e){
    console.log("SESSION STORE ERROR");
})

const sessionConfig = {
    store,
    name: "session",
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))
app.use(flash())
app.use(helmet())

const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://cdn.maptiler.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net/",
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://cdn.jsdelivr.net/npm/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://cdn.maptiler.com/",
];
const connectSrcUrls = [
    "https://api.maptiler.com/",
];
const fontSrcUrls = [];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/ddio4szzz/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT! 
                "https://images.unsplash.com/",
                "https://cdn-icons-png.flaticon.com/",
                "https://api.maptiler.com/resources/"
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(morgan('dev'));

app.use((req, res, next) => {
    // console.log(req.session);
    // console.log(req.query);
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/', userRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/reviews', reviewRoutes);

app.get('/', (req, res) => {
    res.render("home")
});

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
});
app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Something Went Wrong'} = err;
    if(!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err });
});

app.listen(3000, () => {
    console.log('\x1b[35m%s\x1b[0m' ,"Port 3000 Online");
});