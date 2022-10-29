const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
// Define Paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,  '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Set static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Prince Tanwar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
       title: 'About me',
       name: 'Prince Tanwar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Need help',
        name: 'Prince Tanwar',
        message:'Contact us'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please Provide the Address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})    

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Prince Tanwar',
        errorMessage: 'Help article not found.'
    })
})

app.get('*',(req, res) => {
    res.render('404', {
        title: '404',
        name: 'Prince Tanwar',
        errorMessage: 'Page Not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})