const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// app stores our application
const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Port to support localhost or Heroku environment
const port = process.env.PORT || 3000;

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'SM'
    });
});

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'SM'
    });
});

app.get('/help', (req,res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'SM'
    });
});


// This illustates the use of query string 
app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided'
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, {temperature, precipProb, location:timeZone} = {}) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                precipProb,
                temperature,
                location,
                address: req.query.address,
                timeZone,
                forecast: temperature + ' with ' + (precipProb*100).toString() + '% chance of raining.'
            });
        });
    });
});

// Not useful for app now

// app.get('/products', (req,res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: 'What to search for?'
//         });
//     }

//     console.log(req.query);
//     res.send({
//         products: []
//     });
// });

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Bhaji',
        error: 'Help article not found'
    });
});

app.get('*', (req,res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Bhaji',
        error: 'Page not found'
    });
});

app.listen(port, () => {
    console.log('Server is running at port ' + port);
});