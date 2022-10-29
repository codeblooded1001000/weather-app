const request = require('postman-request')

const geocode = (address, callback)=> {
    const url = 'http://api.positionstack.com/v1/forward?access_key=937fc1e37b1ed4f6ee4544225294518f&query='+encodeURIComponent(address)
  
    request({url, json: true}, (error, {body} = {}) => {
      if(error){
        callback('Unale to connect to location service!', undefined)
      } else if(body.data === undefined || body.data.length === 0){
        callback('Unable to find location. Try another search', undefined)
      }
      else{
        callback(undefined, {
          latitude: body.data[0].latitude,
          longitude: body.data[0].longitude,
          location: body.data[0].label
        })
      }
    })
  
  }

  module.exports = geocode