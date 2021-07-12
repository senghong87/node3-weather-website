const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (event)=>{
    event.preventDefault()

    const location = search.value
    messageOne.textContent = 'Loading.....'
    messageTwo.textContent = ''

    //fetch('http://localhost:3000/weather?address='+location).then(function(response){
    fetch('/weather?address='+location).then(function(response){
        response.json().then(function(forecastData){
            if(forecastData.error){
                messageOne.textContent = forecastData.error
            }else{
                messageOne.textContent = forecastData.location
                messageTwo.textContent = forecastData.forecastData
            }
        })
    })
})