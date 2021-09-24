const request = require('request');


const forecast = (lon,lat,callback)=>{
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=08ba5cef09681a49743441ba39d8585b&units=metric'
    request({ url, json: true }, (err, {body}) => {
    if (err) {
        callback('Unable to connect to weather services.',undefined)
    } else if (body.error) {
        callback('Unable to find location.',undefined);
    } else {
        callback(undefined,{
            location:body.name,
            condition:body.weather[0].description,
            temp:body.main.temp,
            feelsLike:body.main.feels_like,
            imgCode:body.weather[0].icon
        });
    }
})
}

module.exports = forecast;

