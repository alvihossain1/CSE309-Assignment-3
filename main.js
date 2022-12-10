document.querySelector("#search-button").addEventListener("click", () => {
    searchfunc()
})

document.querySelector("#search").addEventListener("keypress", (e) => {
    if (e.key === 'Enter') {
        searchfunc()
    }

})

function searchfunc() {
    let search = $("#search").val().toLowerCase()

    if (search === "") {
        alert("Search is empty!")
        return
    }

    let id = "dc0eaaa1773dce24f43a4bfe1b5af3df"
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${id}`


    fetch(url)
        .then((response) => response.json())
        .then((result) => {
            console.log(result)
            $("#country").text(result.sys.country)
            $("#city-name").text(result.name)
            $("#temperature").text(result.main.temp+"°C")
            $("#weather-status").text(result.weather[0].main)
            document.querySelector("#icon-url").src = `http://openweathermap.org/img/wn/${result.weather[0].icon}@4x.png`
            $("#feels-like").text(result.main.feels_like+"°C")
            $("#pressure").text(result.main.pressure)
            $("#humidity").text(result.main.humidity+"%")
            $("#wind-speed").text(result.wind.speed)
            $("#visibility").text(result.visibility)
            $("#temp-min").text(result.main.temp_min+"°C")
            $("#temp-max").text(result.main.temp_max+"°C")
            $("#degree").text(result.wind.deg)


            let dt = new Date(result.dt * 1000)

            let fullDate = `${dt.getDate()}/${dt.getMonth()}/${dt.getFullYear()} - ${extractDay(dt.getDay())}`
            $("#date").text(fullDate)
            let time = `${dt.getHours()}:${dt.getMinutes()}`
            $("#timeZone").text(result.timezone)
            $("#time").text(time)

            
            let url_daily = `http://api.openweathermap.org/data/2.5/forecast?lat=${result.coord.lat}&lon=${result.coord.lon}&units=metric&appid=${id}`

            $.ajax({
                type: "GET",
                url: url_daily,
                success: function (result) {
                    console.log(result)

                    let obj = []

                    let passes = 8

                    for(let i = 0; i < result.list.length; i+=passes){

                        let dateFormat = new Date(result.list[i].dt*1000)

                        let day = extractDay(dateFormat.getDay())
                        let temp = result.list[i].main.temp+"°C"
                        let icon = result.list[i].weather[0].icon
                        let iconUrl = `http://openweathermap.org/img/wn/${icon}@4x.png`                        
                        let weatherStatus = result.list[i].weather[0].main
                        obj.push({day, temp, iconUrl, weatherStatus})            

                        
                    }

                    console.log(obj)
                    let weeklyItems = document.querySelectorAll(".weekly-item")
                    for(let i = 0; i < weeklyItems.length; i++){
                        weeklyItems[i].querySelector(".weekly-day").innerHTML = obj[i].day
                        weeklyItems[i].querySelector(".weekly-temp").innerHTML = obj[i].temp
                        weeklyItems[i].querySelector(".weekly-icon").src = obj[i].iconUrl
                        weeklyItems[i].querySelector(".weekly-status").innerHTML = obj[i].weatherStatus
                    }

        
                }
            })
            

        })
        .catch(error => {
            alert(`Search result is Invalid.`)
        });



        


}





function daily(result){
    let weeklyItems = document.querySelectorAll(".weekly-item")

    for(let i = 0; i < weeklyItems.length; i++){
        weeklyItems[i].querySelector(".weekly-day") = innerHTML = extractDay(result.list[i].dt*1000)
        weeklyItems[i].querySelector(".weekly-temp") = result.list[i].temp
    }

}






function extractDay(val) {
    if (val === 0) {
        return "Sun"
    }
    else if (val === 1) {
        return "Mon"
    }
    else if (val === 2) {
        return "Tue"
    }
    else if (val === 3) {
        return "Wed"
    }
    else if (val === 4) {
        return "Thu"
    }
    else if (val === 5) {
        return "Fri"
    }
    else if (val === 6) {
        return "Sat"
    }
}