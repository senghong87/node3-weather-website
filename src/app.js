const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()
//Define path for express config
const publicDirectory = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory
app.use(express.static(publicDirectory))

app.get('', function(req, res){
    res.render('index', {
        title: 'Weather App',
        name: 'Seng Hong'
    })
})

app.get('/about', function(req, res){
    res.render('about', {
        title: 'About Me',
        name: 'Seng Hong'
    })
})

app.get('/help', function(req, res){
    res.render('help', {
        title: 'Help',
        text: 'If help needed kindly contact XXXX',
        name: 'Seng Hong'
    })
})

// app.get('/products', function(req, res ){
//     if(!req.query.search){
//         return res.send({
//             error: 'Please provide a search term'
//         })
//     }
//     console.log(req.query.search)
//     console.log(req.query.rating)
//     res.send({
//         products : []
//     })
// })

app.get('/weather', function(req, res ){
    if(!req.query.address){
        return res.send({
            error: 'Please provide a search address'
        })
    }

    geoCode(req.query.address, function (error, {latitude, longitude, location} = {} ){
        if(error){
            return res.send({
                error : error 
            })
          }
        forecast(latitude, longitude, function(error, forecastData){
            if(error){
                return res.send(error)
              }
              res.send({
                address: req.query.address,
                location: location,
                latitude: latitude,
                longitude: longitude,
                forecastData: forecastData
            })
        })
    })
})

// app.get('/weather', function(req, res ){
//     res.send({
//         forecast : 'It is 28 Celcius',
//         location : 'Seremban' 
//     })
// })
// app.get('', function(req, res){
//     res.send('<h1> Weather </h1>')
// })

// app.get('/help', function(req, res ){
//     res.send([{
//         name : 'Seng Hong',
//         age : 34
//     },{
//         name : 'Laura',
//         age : 27
//     }])
// })

// app.get('/about', function(req, res ){
//     res.send('<h1>About</h1>')
// })
app.get('/help/*', function(req, res){
    res.render('404', {
        title: '404',
        name: 'SH',
        errorMessage: 'Help article not found'
    })

})

app.get('*', function(req, res){
    res.render('404', {
        title: '404',
        name: 'SH',
        errorMessage: 'Page not found'
    })

})

app.listen(3000, function(){
    console.log('Server is up on port 3000')
})