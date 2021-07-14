const request = require('request');


const forecast = (lon,lat,callback)=>{
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=08ba5cef09681a49743441ba39d8585b&units=metric'
    // const url = 'http://api.weatherstack.com/current?access_key=b42f18407a8c9f5dda843c8971c769e7&query='+lat+','+long
    request({ url, json: true }, (err, {body}) => {
    if (err) {
        callback('Unable to connect to weather services.',undefined)
    } else if (body.error) {
        callback('Unable to find location.',undefined);
    } else {
        // callback(undefined,'Condition: ' + body.weather[0].description + ".");
        callback(undefined,{
            condition:body.weather[0].description,
            temp:body.main.temp,
            feelsLike:body.main.feels_like,
            imgCode:body.weather[0].icon
        });
        // callback(undefined,'The current temperature is '+body.main.temp+' degree celcius but the temperature felt like ' + body.main.feels_like + '.');
    }
})
}

// forecast(-75.7088,44.1545,(err,data)=>{
//     console.log(data);
// })
module.exports = forecast;

