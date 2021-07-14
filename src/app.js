const path = require('path')
const express = require('express')
const app = express();
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

// console.log(__dirname);
// console.log(path.join(__dirname,'../public'));

const pathToPublic = path.join(__dirname, '../public');
app.use(express.static(pathToPublic))

app.set('view engine', 'ejs') // tells that to use ejs
app.set('views', path.join(__dirname, '../views')) // can run the file from any directory



app.get('/help', (req, res) => {
    res.render('help', { title: 'Help' })
})


app.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
})




app.get('/weather', (req, res) => {
    if(req.query.location){
        console.log(req.query);
        const {location} = req.query
        // return res.send({location:req.query.address,weather:'good'})
        geocode(location, (err, {longitude,latitude,location}={}) => {   // = {} is to provide a default value if lon lat loc are not available
            if (err) {
                return res.send({err});
            }
            
            forecast(longitude, latitude, (err, {condition,temp,feelsLike,imgCode}={}) => {
                if(err){
                    return res.send({err});
                }
                res.send({
                    query:req.query.location,
                    location,
                    forecastData:'The current temperature is '+temp+' degree celcius but the temperature felt like ' + feelsLike + '.',
                    condition,
                    imgCode
                })
            })
            
        })
    }
    else{
        res.send({
            error:'Please provide a location'
            
        })
    }
    // res.render('index',{title:'Weather'})
    
})

app.get('/',(req,res)=>{
    res.render('index',{title:'Weather'})
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Help Error',
        errmsg: 'Help Article Not found bro'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error',
        errmsg: 'Page Not found bro'
    })
})



app.listen(3000, () => {
    console.log('Server started on port 3000.');
})