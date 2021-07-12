const request = require('postman-request')

const geoCode = function(address, callback){
   //convert everything to string in case user search with special character
   const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic2VuZ2hvbmc4NyIsImEiOiJja3Fldm5laDUxdWYyMm5sY2IwZHc3a3l5In0.W5ruwunZVdDCv1KimqaJFQ&limit=1'
   //console.log(url)
   request({url, json:true} , function(error, {body}){
      if(error){
         callback('API service not able to connect', undefined)
      }else if(body.features.length === 0){
         callback('Unable to find location, Please try another search', undefined)
      }else{
         callback(undefined, {
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            location: body.features[0].place_name
         })
      }
   })
}

module.exports = geoCode