const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const routes = require('./server/routes/router');
const cors = require('cors');
const connectDB = require('./server/database/connection');

const app = express();

dotenv.config({ path: '.env' });
const PORT = process.env.PORT || 8080;

//setting up cors
app.use(cors());

//set view engine
app.set('view engine', 'ejs');

//log request
app.use(morgan('tiny'));

//mongoDB conncetion
connectDB();

//load assets
app.use('/css', express.static(path.join(__dirname, 'assets/css')));
app.use('/js', express.static(path.join(__dirname, 'assets/js')));

//if url -> /update-user/:id, then neither the 'CSS' nor the 'JS' load from the above 'load assets'. That's why they are called in this way
app.use('/update-user/css', express.static(path.join(__dirname, 'assets/css')));
app.use('/update-user/js', express.static(path.join(__dirname, 'assets/js')));

//parse request
app.use(express.urlencoded({ extended: false }));

//parse request into json
app.use(express.json());

//load routers
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server listening to port: ${PORT}`);
});
