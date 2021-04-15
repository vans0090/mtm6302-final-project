const $greeting = document.getElementById('greeting')
const $dateTime = document.getElementById('date_time')
const $showDate = document.getElementById('showDate')
const $timeHour = document.getElementById('timeHour')
const $hourAndMinutes = document.getElementById('hourAndMinutes')
const $seconds = document.getElementById('seconds')
const $more = document.getElementById('more')
const $moreData = document.getElementById('more_data')
const $settings = document.getElementById('settings')
const $settingsContainer = document.getElementById('settings-container')
const $settingsPosition = document.getElementById('settingsPosition')

const date = new Date()
const h = date.getHours();


let imageData
let weekday
let monthOfTheYear

function greeting() {
    if (h < 11) {
        $greeting.innerHTML = `<h2>Good Morning, currently the time is</h2>`
    }
    else if (h < 16) {
        $greeting.innerHTML = `<h2>Good Afternoon, currently the time is</h2>`
    }
    else if (h < 20) {
        $greeting.innerHTML = `<h2>Good Evening, currently the time is</h2>`
    }
    else 
        $greeting.innerHTML = `<h2>Good Night, currently the time is</h2>`
    
}

greeting()

fetch('https://api.nasa.gov/planetary/apod?api_key=iaGChJHXWHZTEGHXpHVwAHxEntawRLgrk4bJovkq')

    .then(function(response){
            return response.json()
    })
    .then(function(imageData){
        console.log(imageData)

        if (imageData.media_type === 'video'){
            document.querySelector('img').setAttribute = ('src', '/images/video-photo.jpg')
        } else {
        document.querySelector('img').setAttribute('src', imageData.url)
        $dateTime.innerHTML += `
        <h3>${imageData.title}</h3>` 
        return imageData
        }
    })

    const checkItem = localStorage.getItem('displaySecondsType')
    function checkLocalStorage() {
        if(checkItem){
            $seconds.style.display = 'inline'
            setInterval(function() {
            const newDate = new Date()
            const s = newDate.getSeconds();
            $seconds.innerHTML = ':' + addZero(s)
            }, 1000)   
        }
    }
    checkLocalStorage()

    const checkDateItem = localStorage.getItem('displayDateType')
    function checkLocalStorageDate() {
        if(checkDateItem){
            $showDate.innerHTML = `<p>${getMonthOfTheYear()}, ${date.getDate()}  ${date.getFullYear()}</p>`
        }
    }
    checkLocalStorageDate()

    function addZero(i){
        if (i < 10){
            i = '0' + i
        }
        return i
    }
    setInterval(function (){  

        const newDate = new Date()

        const h = newDate.getHours();
        const m = newDate.getMinutes();
        const s = newDate.getSeconds();

        $hourAndMinutes.innerHTML = h + ':' + addZero(m) 
    },1000)


    let moreDataContainer
    let moreDisplay = false
    $more.addEventListener('click', function() {
        if(moreDisplay === false){
            moreDisplay = true
        
        $moreData.innerHTML = `
        <div id="more_data_container" class="moredata">
        <p>Month of the Year : ${getMonthOfTheYear()}</p>
        <p>Day of the Month : ${date.getDate()}</p>
        <p>Day of the Week: ${getWeekday()}</p>
        <p>Week of the Year : ${getweekOfTheYear()}</p>
        </div>
        `
        moreDataContainer = document.getElementById('more_data_container')
        $more.textContent = 'Less'
        $moreData.style.display = 'block';
        }
        else{
            moreDisplay = false
            $moreData.style.display = 'none';
            $more.textContent = 'More'
        }
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

    function getweekOfTheYear() {
        const weekOfTheYear =  new Date(date.getFullYear(), 0, 1); 
        const numberOfDays =  Math.floor((date - weekOfTheYear) / (24 * 60 * 60 * 1000));  
        const weekOfTheYearDisplay = Math.ceil(( date.getDay() + 1 + numberOfDays) / 7); 
        return weekOfTheYearDisplay
    }

    function getMonthOfTheYear() {
        if (date.getMonth()===0) {
            monthOfTheYear = 'January'
        }
        else if(date.getMonth()===1) {
            monthOfTheYear = 'February'
        }
        else if(date.getMonth()===2) {
            monthOfTheYear = 'March'
        }
        else if(date.getMonth()===3) {
            monthOfTheYear = 'April'
        }
        else if(date.getMonth()===4) {
            monthOfTheYear = 'May'
        }
        else if(date.getMonth()===5) {
            monthOfTheYear = 'June'
        }
        else if(date.getMonth()===6) {
            monthOfTheYear = 'July'
        }
        else if(date.getMonth()===7) {
            monthOfTheYear = 'August'
        }
        else if(date.getMonth()===8) {
            monthOfTheYear = 'September'
        }
        else if(date.getMonth()===9) {
            monthOfTheYear = 'October'
        }
        else if(date.getMonth()===10) {
            monthOfTheYear = 'November'
        }
        else {
            monthOfTheYear = 'December'
        }

        return monthOfTheYear
    }

    let settingsDisplay = false
    $settings.addEventListener('click', function(){
        if(settingsDisplay === false){
            settingsDisplay = true
            $settingsPosition.style.height = "100%";
            $settingsPosition.style.backgroundColor = "black";
            $settings.textContent = 'BACK'
            $settingsContainer.style.display = 'inline'
            
            settingOne()
        }
        else{
            settingsDisplay = false
            $settings.innerHTML = `<i class="fas fa-cog"></i>`
            $settingsContainer.style.display = 'none'
            $settingsPosition.style.height = "0%"
        }
    })
    
   
    function settingOne() {
        // add seconds 
        $settingsContainer.innerHTML = `
        <div class="settings-selection">
            <h6>Seconds Countdown</h6>
            <button type = 'submit' id = 'addSeconds' class='settings-btn'>Add</button>
            <button type = 'submit' id = 'removeSeconds' class='settings-btn'>Remove</button>
        </div>
        <div class="settings-selection">
            <h6>Date</h6>
            <button type = 'submit' id = 'addDate' class='settings-btn'>Add</button>
            <button type = 'submit' id = 'removeDate' class='settings-btn'>Remove</button>
        </div>`

        const addSeconds = document.getElementById('addSeconds')
        const removeSeconds = document.getElementById('removeSeconds')
        const addDate = document.getElementById('addDate')
        const removeDate = document.getElementById('removeDate')

        addSeconds.addEventListener('click', function () {
            $seconds.style.display = 'inline'
            setInterval(function() {
            const newDate = new Date()
            const s = newDate.getSeconds();
            $seconds.innerHTML = ':' + addZero(s)
            }, 1000)   
            localStorage.setItem('displaySecondsType', false)
        })

        removeSeconds.addEventListener('click', function () {
            $seconds.style.display = 'none'
            localStorage.removeItem('displaySecondsType')
        })
        
        addDate.addEventListener('click', function() {
            $showDate.innerHTML = `<p>${getMonthOfTheYear()}, ${date.getDate()}  ${date.getFullYear()}</p>`
            localStorage.setItem('displayDateType', false)
        })
        removeDate.addEventListener('click', function() {
            $showDate.innerHTML = ''
            localStorage.removeItem('displayDateType')
        })

    }
