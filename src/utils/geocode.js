const request = require('request');

const geocode = (location, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(location)+'.json?access_token=pk.eyJ1Ijoibml0c2luIiwiYSI6ImNrcXdienA2aTAxMXEybnFyOGd6a28xNTIifQ.RurU0ZxczmW0m49EElPKLQ&limit=1'

    request({ url, json: true }, (err, {body}) => {
        if (err) {
            callback('Unable to connect to weather services.',undefined)
        } else if (body.message || body.features.length === 0) {
            callback('Unable to find location.',undefined);
        } else {
            callback(undefined,{
                longitude: body.features[0].center[0],  //longitude index - 0
                latitude:body.features[0].center[1],    // lat index - 1
                location:body.features[0].place_name
            
            }) 
            
        }
    }
    )
}

    


module.exports = geocode;