const request = require('postman-request')

const forecast = function(latitude, longitude, callback){
    const url = 'http://api.weatherstack.com/current?access_key=09d4c117995057483531aa508fcf6c0c&query='+latitude+','+longitude
    
    request({url, json:true}, function (error, {body}) {
        if(error){
            callback('Service might not be available', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }
        else {
            currentleWeather = body.current
            callback( undefined, 'It is currently ' +currentleWeather['temperature'] + 
            'C and there is a ' + currentleWeather['precip'] + '% chance of rain. The weather condition is '
            +currentleWeather['weather_descriptions'])
        }
    })
}

module.exports = forecast