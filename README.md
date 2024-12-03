Link ➵ https://app-yelp-campgrounds.onrender.com/
> Please note that loading may take a minute or two due to the use of free hosting.
---
# Aprašymas
Full-stack svetainė, leidžianti vartotojams prisiregistruoti ir prisijungti.  
Po prisijungimo galima įkelti savo stovyklavietę kaip paslaugą apsistojimui, kuri bus matoma interaktyviame žemėlapyje.  
Projektas turi prisitaikomąjį (responsive) dizainą, užtikrinantį patogų naudojimą įvairiuose įrenginiuose.  

## Naudotos technologijos:
- **Frontend**: HTML, CSS, Bootstrap, JavaScript, EJS.
- **Backend**: Node.js, Express.
- **Duomenų bazė**: MongoDB.

### Naudoti npm paketai:
- **@maptiler/client**: `^1.8.1` – žemėlapių integracijai.
- **cloudinary**: `^1.41.3` – paveikslėlių talpinimui ir optimizavimui.
- **connect-flash**: `^0.1.1` – pranešimų sistemai.
- **connect-mongo**: `^5.1.0` – MongoDB sesijų saugojimui.
- **dotenv**: `^16.4.5` – aplinkos kintamųjų valdymui.
- **ejs**: `^3.1.10` – dinaminio HTML šablonų kūrimui.
- **ejs-mate**: `^4.0.0` – išplėstinei šablonų valdymo funkcionalumui.
- **express**: `^4.19.2` – backend serverio kūrimui.
- **express-mongo-sanitize**: `^2.2.0` – apsaugai nuo MongoDB injekcijų.
- **express-session**: `^1.18.0` – sesijų valdymui.
- **helmet**: `^8.0.0` – saugumo stiprinimui.
- **joi**: `^17.13.3` – duomenų validacijai.
- **method-override**: `^3.0.0` – HTTP metodų keitimui.
- **mongodb**: `^6.9.0` – darbui su MongoDB duomenų baze.
- **mongoose**: `^8.5.2` – MongoDB duomenų bazės modeliams kurti.
- **morgan**: `^1.10.0` – HTTP užklausų logavimui.
- **multer**: `^1.4.5-lts.1` – failų įkėlimui.
- **multer-storage-cloudinary**: `^4.0.0` – failų įkėlimui į Cloudinary.
- **passport**: `^0.7.0` – autentifikacijai.
- **passport-local**: `^1.0.0` – vietiniam autentifikacijos metodui.
- **passport-local-mongoose**: `^8.0.0` – MongoDB integracijai su autentifikacija.
- **passport-mongoose**: `^0.0.1` – MongoDB modelių autentifikacijai.
- **sanitize-html**: `^2.13.1` – turinio valymui nuo XSS atakų.

---

# Description
A full-stack website that allows users to register and log in.  
After logging in, users can upload their own campsite as a service for others to stay, and the location is displayed on an interactive map.  
The project features a responsive design, ensuring usability across various devices.

## Technologies Used:
- **Frontend**: HTML, CSS, Bootstrap, JavaScript, EJS.
- **Backend**: Node.js, Express.
- **Database**: MongoDB.

### npm Packages Used:
- **@maptiler/client**: `^1.8.1` – for map integration.
- **cloudinary**: `^1.41.3` – for image hosting and optimization.
- **connect-flash**: `^0.1.1` – for message flashing.
- **connect-mongo**: `^5.1.0` – for MongoDB session storage.
- **dotenv**: `^16.4.5` – for managing environment variables.
- **ejs**: `^3.1.10` – for dynamic HTML templates.
- **ejs-mate**: `^4.0.0` – for advanced template handling.
- **express**: `^4.19.2` – for backend server creation.
- **express-mongo-sanitize**: `^2.2.0` – for preventing MongoDB injection attacks.
- **express-session**: `^1.18.0` – for session management.
- **helmet**: `^8.0.0` – for enhancing security.
- **joi**: `^17.13.3` – for data validation.
- **method-override**: `^3.0.0` – for overriding HTTP methods.
- **mongodb**: `^6.9.0` – for working with the MongoDB database.
- **mongoose**: `^8.5.2` – for creating MongoDB database models.
- **morgan**: `^1.10.0` – for logging HTTP requests.
- **multer**: `^1.4.5-lts.1` – for file uploads.
- **multer-storage-cloudinary**: `^4.0.0` – for uploading files to Cloudinary.
- **passport**: `^0.7.0` – for authentication.
- **passport-local**: `^1.0.0` – for local authentication strategy.
- **passport-local-mongoose**: `^8.0.0` – for MongoDB integration with authentication.
- **passport-mongoose**: `^0.0.1` – for authentication using MongoDB models.
- **sanitize-html**: `^2.13.1` – for cleaning content to prevent XSS attacks.
