
const form = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg-1')
const img = document.querySelector('img')
const msg2 = document.querySelector('#msg-2')
const msg3 = document.querySelector('#msg-3')

img.src = ''
msg1.textContent = ''



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