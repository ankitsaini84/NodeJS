const path = require('path')
const express = require('express')
const app = express()

const PUBLIC_DIR = path.join(__dirname, '..\\public')
const VIEWS_DIR = path.join(__dirname, '..\\templates')

// *** HOSTING DYNAMIC FOLDER ***
// Set 'View Engine' to use hbs -> handlebar w/ express support - to host dynamic pages
app.set('view engine', 'hbs')
// Set 'views' to VIEWS_DIR for rendering dynamic pages
app.set('views', VIEWS_DIR)
// Return a dynamic page -> response renders a dynamic webpage while also returning an object with {{title}} & {{createdby}} fields
app.get('', function(req, res) {
    res.render('index', {
        title: 'Weather-O-nama',
        creadtedby: 'Ankit Saini'
    })
})

// *** HOSTING STATIC FOLDER ***
// Use 'public' folder path for -  to be hosted by express
app.use(express.static(PUBLIC_DIR))

// *** HOSTING STATIC PAGE ***
// /help path is still being not hosted as static page. Express is returning html code in response.
app.get('/help', function(req, res) {
    res.send('<h1>Help</h1>')
})

// Open 3000 port and start listening on it.
app.listen(3000, function() {
    console.log('Server is up on 3000')
})