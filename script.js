const $time = document.getElementById('date_time')
const $more = document.getElementById('more')
const $moreData = document.getElementById('more_data')
const date = new Date()

let imageData
let weekday


fetch('https://api.nasa.gov/planetary/apod?api_key=iaGChJHXWHZTEGHXpHVwAHxEntawRLgrk4bJovkq')

    .then(function(response){
            return response.json()
    })
    .then(function(imageData){
        console.log(imageData)

        if (imageData.media_type === 'video'){
            document.querySelector('p').textContent = 'Photo of the day is a video'
        } else {
        document.querySelector('img').setAttribute('src', imageData.url)
        $time.innerHTML = `
        <h3>Welcome, the API for today</h3>
        <p>${imageData.date}</p>
        <p>${date.getHours()}<span> : </span>${date.getMinutes()}</p>`

        return imageData
        }
    })

    $more.addEventListener('click', function() {
        $moreData.innerHTML = `
        <div id="more_data_container" class="moredata">
        <p>Year : ${date.getFullYear()}</p>
        <p>Month : ${date.getMonth()+1}</p>
        <p>Date : ${date.getDate()}</p>
        <p>Day : ${getWeekday()}</p>
        </div>
        `
    })
    
    function getWeekday() {
        if (date.getDay()===1) {
            weekday = 'Monday'
        }
        else if (date.getDay()===2) {
            weekday = 'Tuesday'
        }
        else if (date.getDay()===3) {
            weekday = 'Wednesday'
        }
        else if (date.getDay()===4) {
            weekday = 'Thursday'
        }
        else if (date.getDay()===5) {
            weekday = 'Friday'
        }
        else if (date.getDay()===6) {
            weekday = 'Saturday'
        }
        else {
            weekday = 'Sunday'
        }

        return weekday
    }

    