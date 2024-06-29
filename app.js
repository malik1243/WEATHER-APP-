
const weatherform=document.querySelector(".weatherform");
const cityInput=document.querySelector(".cityInput");
const card= document.querySelector(".card");
const apikey = "542f25cc2c449094a86313357408e9c8";
weatherform.addEventListener("submit", async event => {

    event.preventDefault();
    const city = cityInput.value;
    if(city){
        try{
            const WeatherData= await getWeatherData(city);
            displayWeatherInfo(WeatherData); 
        }
        catch(error){
            console.error(error)
            displayError(error);
        }

    }
    else{
        displayError("please enter a city");
    }
    
});

async function getWeatherData(city){
    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("city not found");
    }
    return await response.json();


}

function displayWeatherInfo(data){
    const {name:city,
    main:{temp,humidity},
    weather:[{description,id}]} =data;
    card.textContent=""; 

    const cityDisplay =document.createElement("h1");   
    const tempDisplay =document.createElement("p");   
    const humidityDisplay =document.createElement("p");   
    const descDisplay =document.createElement("p");   
    const weatherEmoji =document.createElement("p");

    cityDisplay.textContent=city;
    tempDisplay.textContent=`${(temp-273.15).toFixed(1)}°C`;
    humidityDisplay.textContent=`humidity:${humidity}%`;
    descDisplay.textContent=description;
    weatherEmoji.textContent=getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);   
    card.appendChild(tempDisplay);   
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);

}

function getWeatherEmoji(weatherId){
    switch(true){
        case weatherId>=200 && weatherId<=232:
            return "❄️";
        case weatherId>=300 && weatherId<=321:
            return "🌧";
        case weatherId>=500 && weatherId<=531:
            return "🌦";
        case weatherId>=600 && weatherId<=622:
            return "🌨";
        case weatherId>=701 && weatherId<=781:
            return "🌫";
        case weatherId===800:
            return "☀️";
        case weatherId>=801 && weatherId<=804:
            return "☁️";
        default:
            return "❓";
    }   
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message; 
    errorDisplay.classList.add("errorDisplay");

    card.textContent="";
    card.appendChild(errorDisplay);
}