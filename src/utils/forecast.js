const request1 = require('postman-request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherapi.com/v1/current.json?key=6253765568fd479dac3125248222610&q='+latitude+','+longitude

    request1({url, json: true}, (error, {body} = {}) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        }
        else if(body.error){
            callback('Unable to find location!', undefined)
        }
        else{
          //  console.log(body.current)
            callback(undefined , body.current.condition.text + ". It is currently "+body.current.temp_c+
        " degrees out. It feels like "+ body.current.feelslike_c +" degrees. There is "+body.current.precip_mm+"% chance of rain.")
        }
        
    })

    
}

module.exports=forecast

