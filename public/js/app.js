
const form = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg-1')
const img = document.querySelector('img')
const msg2 = document.querySelector('#msg-2')
const msg3 = document.querySelector('#msg-3')
const myLocation = document.querySelector('#my-loc')

img.src = ''
msg1.textContent = ''

msg2.textContent = ''

myLocation.addEventListener('click',(e)=>{

    if (!navigator.geolocation) {  // navigator.geolocation is undefined means the browser doesn't support this feature
        return alert("Your brower doesn't support this feature")
        
    }
    msg1.textContent = 'Loading...'
    msg2.textContent = ''
    msg3.textContent = ''
    img.src = ''

    navigator.geolocation.getCurrentPosition((position) => {

        const { latitude, longitude } = position.coords
        console.log(latitude,longitude);
        fetch('/weather?latitude='+latitude+'&longitude='+longitude)
            .then((res) => {
                res.json().then(data => {
                    if (data.err) {
                        msg1.textContent = data.err;
                    } else {
                        msg1.textContent = data.location,
                        img.src = 'https://openweathermap.org/img/wn/'+data.imgCode+'@4x.png'
                        msg2.textContent = "Condition: "+data.condition;
                        msg3.textContent = data.forecastData;
                    } 
               })

            })
    search.value = ''


    },()=>{
        alert('Some Error occured');
    },{timeout:10000})

//  console.log(location);
    e.preventDefault()
})


form.addEventListener('submit', (e) => {
    const location = search.value
    msg1.textContent = 'Loading...'
    msg2.textContent = ''
    msg3.textContent = ''
    img.src = ''
    fetch('/weather?location='+location)
        .then((res) => {
            res.json().then(data => {
                if (data.err) {
                    msg1.textContent = data.err;

                } else {
                    img.src = 'https://openweathermap.org/img/wn/'+data.imgCode+'@4x.png'
                    msg1.textContent = data.location;
                    msg2.textContent = "Condition: "+data.condition;
                    msg3.textContent = data.forecastData;
                }
            })

        })
    search.value = ''

    // console.log(location);
    e.preventDefault()

})