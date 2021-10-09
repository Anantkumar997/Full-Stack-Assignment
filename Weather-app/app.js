 let weather = {
    apiKey : "40a363337e90431ba17eac339b78fdfd",
    fetchWeather : function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city 
            + "&units=metric&appid="
            + this.apiKey
        )
        .then((responce) => responce.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather : function(data){
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, feels_like, humidity } = data.main;
        const { speed } = data.wind;
        // console.log(name,icon,description,temp,feels_like,humidity,speed);
        document.querySelector(".city").innerText="Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+icon+".png";
        document.querySelector(".description").innerText= description;
        document.querySelector(".temp").innerText=temp + "°C";
        document.querySelector(".humidity").innerText= "Humidity : "+ humidity+"%";
        document.querySelector(".speed").innerText= "Wind Speed : "+speed+"km/hr";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?"+ name +"')"
    },
    search : function(){
        this.fetchWeather(document.querySelector(".inp").value)
    }
};

document
        .querySelector(".search button")
        .addEventListener("click", function(){
            weather.search();
        });

document
        .querySelector(".inp")
        .addEventListener("keyup", function(event){
            if(event.key == "Enter"){
                weather.search();
            }
        });

weather.fetchWeather("Delhi");