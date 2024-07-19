import './style.css';
import icon1 from './moon-phases/new-moon.png';
import icon2 from './moon-phases/waxing-crescent.png';
import icon3 from './moon-phases/first-quarter.png';
import icon4 from './moon-phases/waxing-gibbous.png';
import icon5 from './moon-phases/full-moon.png';
import icon6 from './moon-phases/waning-gibbous.png';
import icon7 from './moon-phases/last-quarter.png';
import icon8 from './moon-phases/waning-crescent.png';
import sunrise from './sunrise.png';
import sunset from './sunset.png';
import clear_day from './weather-icons/clear-day.png';
import clear_night from './weather-icons/clear-night.png'; 
import cloudy from './weather-icons/cloudy.png'; 
import fog from './weather-icons/fog.png'; 
import partly_cloudy_day from './weather-icons/partly-cloudy-day.png'; 
import partly_cloudy_night from './weather-icons/partly-cloudy-night.png'; 
import rain from './weather-icons/rain.png'; 
import snow from './weather-icons/snow.png'; 
import wind from './weather-icons/wind.png';
import * as tempConvert from './tempConvert.js';
import * as script from './script.js';
const wo={
    "clear-day":clear_day,
    "clear-night":clear_night,
    "cloudy":cloudy,
    "fog":fog,
    "partly-cloudy-day":partly_cloudy_day,
    "partly-cloudy-night":partly_cloudy_night,
    "rain":rain,
    "snow":snow,
    "wind":wind,
};
const moonArray=["new-moon","waxing-crescent","first-quarter","waxing-gibbous","full-moon","waning-gibbous","last-quarter","waning-crescent"];
const fns=require("date-fns");
const icons=[icon1,icon2,icon3,icon4,icon5,icon6,icon7,icon8];

const colors={
    "clear-day":["#FFD764","#FFA600"],
    "clear-night":["#A09D9C","#F5DD09"],
    "cloudy":["#C4E2FF","#D5D6D7"],
    "fog":["#9E9E9E","#F5F5F5"],
    "partly-cloudy-day":["#DDEBFD","#FFF4C0"],
    "partly-cloudy-night":["#43455B","#FFD764"],
    "rain":["#EEF0F5","#81EBEB"],
    "snow":["#80C7EA", "#EEF0F5"],
    "wind":["#FF5722","#FF9801"],
};

function generateMoonPhases(select)
{
    let div=document.createElement("div");
    div.classList.add("moon_phases","row6");
    let image=[];
    for(var i=0;i<8;i++)
        image.push(new Image());
    image[0].src=icon1;
    image[1].src=icon2;
    image[2].src=icon3;
    image[3].src=icon4;
    image[4].src=icon5;
    image[5].src=icon6;
    image[6].src=icon7;
    image[7].src=icon8;
    for(var i=0;i<8;i++)
    {
        div.appendChild(image[i]);
        div.lastChild.class="phase"+(i+1);
        if(select==moonArray[i])
        div.lastChild.classList.add("selected");
    }
    return div;
}

function generateMainCard(whichTemp,mainTemp,feelsLike,lowest,highest,sunrise,sunset,perc,precipitate,brief,date,weather,moonphase)
{
    if(precipitate==null)
        precipitate=["rain"];
    let div=document.createElement("div");
    div.classList.add("card",weather);
    if(whichTemp=="f")
    {
        div.innerHTML=`
                <div class="card_grid">
                    <div class="card_temperature">
                        <p class="main_temp fahrenheit">${mainTemp}°F</p>
                        <p class="feelslike fahrenheit">Feels like: ${feelsLike}°F</p>
                        <p class="min_temp fahrenheit">Lowest: ${lowest}°F</p>
                        <p class="max_temp fahrenheit">Highest: ${highest}°F</p>
                        <p class="main_temp celsius" hidden>${tempConvert.toCelsius(mainTemp)}°C</p>
                        <p class="feelslike celsius" hidden>Feels like: ${tempConvert.toCelsius(feelsLike)}°C</p>
                        <p class="min_temp celsius" hidden>Lowest: ${tempConvert.toCelsius(lowest)}°C</p>
                        <p class="max_temp celsius" hidden>Highest: ${tempConvert.toCelsius(highest)}°C</p>
                    </div>
                    <div class="sun_times">
                        <div class="sunrise">
                            <img class="sunrise_icon">
                            <p class="sunrise_time">Sunrise: ${sunrise}</p>
                        </div>
                        <div class="sunset">
                            <p class="sunset_time">Sunset: ${sunset}</p>
                            <img class="sunset_icon">
                        </div>
                    </div>
                    <div class="card_icons">
                        <img class="weather_icon ${weather}">
                        <img class="moon_phase ${moonphase.name}">
                        <div class="probability">
                            <p class="percentage">${perc}%</p>
                            <p class="precipitate_type">of ${precipitate[0]}</p>
                        </div>
                    </div>
                </div>
                <div class="brief">
                    <p class="brief_p">${brief}</p>
                    <div class="right">
                        <p class="date">${fns.format(date,"P")}</p>
                        <p class="day">${fns.format(date,"eeee")}</p>
                    </div>
                </div>`;
    }
    else
    {
        div.innerHTML=`
            <div class="card_grid">
                <div class="card_temperature">
                        <p class="main_temp fahrenheit" hidden>${mainTemp}°F</p>
                        <p class="feelslike fahrenheit" hidden>Feels like: ${feelsLike}°F</p>
                        <p class="min_temp fahrenheit" hidden>Lowest: ${lowest}°F</p>
                        <p class="max_temp fahrenheit" hidden>Highest: ${highest}°F</p>
                        <p class="main_temp celsius">${tempConvert.toCelsius(mainTemp)}°C</p>
                        <p class="feelslike celsius">Feels like: ${tempConvert.toCelsius(feelsLike)}°C</p>
                        <p class="min_temp celsius">Lowest: ${tempConvert.toCelsius(lowest)}°C</p>
                        <p class="max_temp celsius">Highest: ${tempConvert.toCelsius(highest)}°C</p>
                </div>
                <div class="sun_times">
                    <div class="sunrise">
                        <img class="sunrise_icon">
                        <p class="sunrise_time">Sunrise: ${sunrise}</p>
                    </div>
                    <div class="sunset">
                        <p class="sunset_time">Sunset: ${sunset}</p>
                        <img class="sunset_icon">
                    </div>
                </div>
                <div class="card_icons">
                    <img class="weather_icon ${weather}">
                    <img class="moon_phase ${moonphase.name}">
                    <div class="probability">
                        <p class="percentage">${perc}%</p>
                        <p class="precipitate_type">of ${precipitate[0]}</p>
                    </div>
                </div>
            </div>
            <div class="brief">
                <p class="brief_p">${brief}</p>
                <div class="right">
                    <p class="date">${fns.format(date,"P")}</p>
                    <p class="day">${fns.format(date,"eeee")}</p>
                </div>
            </div>`;
    }
    return div;
}

function setImages()
{
    let i,j;
    i=document.querySelectorAll(".sunrise_icon");
    for(j=0;j<i.length;j++)
    {
        i[j].src=sunrise;
    }
    i=document.querySelectorAll(".sunset_icon");
    for(j=0;j<i.length;j++)
    {
        i[j].src=sunset;
    }
    i=document.querySelectorAll(".weather_icon");
    for(j=0;j<i.length;j++)
    {
        i[j].src=wo[i[j].classList[1]];
    }
    i=document.querySelectorAll(".moon_phase");
    for(j=0;j<i.length;j++)
    {
        i[j].src=icons[moonArray.indexOf(i[j].classList[1])];
    }
    i=document.querySelectorAll(".card");
    for(j=0;j<i.length;j++)
    {
        let color1=colors[i[j].classList[1]][0];
        let color2=colors[i[j].classList[1]][1];
        i[j].style.background=`linear-gradient(${color1},${color2})`;
    }
    i=document.querySelector(".current_card")
    let color1=colors[i.classList[1]][0];
    let color2=colors[i.classList[1]][1];
    i.style.background=`linear-gradient(${color1},${color2})`;
}

export function createCards(o,whichTemp)
{
    let div=document.querySelector(".cards");
    div.innerHTML="";
    for(var i=0;i<7;i++)
    {
        let d=generateMainCard(whichTemp,o.days[i].temp,o.days[i].feelslike,o.days[i].mintemp,o.days[i].maxtemp,o.days[i].sunrise,o.days[i].sunset,o.days[i].rainprob,o.days[i].precip,o.days[i].brief,o.days[i].date,o.days[i].icon,o.days[i].moonphase);
        div.appendChild(d);
    }
    createCurrentCard(whichTemp,o.days[0].temp,o.days[0].feelslike,o.days[0].mintemp,o.days[0].maxtemp,o.days[0].icon,o.days[0].detailed,o.days[0].humidity,o.days[0].precip,o.days[0].rainprob,o.days[0].raincover,o.days[0].visibility,o.days[0].snow,o.days[0].snowdepth,o.days[0].cloudcover,o.days[0].moonphase);
    setImages();
    updateInfo(o);
    setEventHandlers();
}

function createCurrentCard(whichTemp,mainTemp,feelsLike,lowest,highest,weather,detailed,humidity,precip,perc,cover,visib,snow,snowdepth,cloudcover,moonphase)
{
    if(precip==null)
        precip=["rain"];
    let div=document.querySelector(".current_card");
    var classList = div.classList;
    while (classList.length > 0) {
    classList.remove(classList.item(0));
    }
    div.classList.add("current_card",weather);
    let issnow;
    if(snow==0)
    issnow="hidden";
    else
    issnow="";
    if(whichTemp=="f")
    {
        div.innerHTML=`<div class="row1">
    <div class="card_temperature">
                        <p class="main_temp fahrenheit">${mainTemp}°F</p>
                        <p class="feelslike fahrenheit">Feels like: ${feelsLike}°F</p>
                        <p class="min_temp fahrenheit">Lowest: ${lowest}°F</p>
                        <p class="max_temp fahrenheit">Highest: ${highest}°F</p>
                        <p class="main_temp celsius" hidden>${tempConvert.toCelsius(mainTemp)}°C</p>
                        <p class="feelslike celsius" hidden>Feels like: ${tempConvert.toCelsius(feelsLike)}°C</p>
                        <p class="min_temp celsius" hidden>Lowest: ${tempConvert.toCelsius(lowest)}°C</p>
                        <p class="max_temp celsius" hidden>Highest: ${tempConvert.toCelsius(highest)}°C</p>
    </div>
    <img class="weather_icon ${weather}">
</div>
<p class="row2">${detailed}</p>
<p class="row3">Humidity: ${humidity}<br>Type of precipitation: ${precip[0]}</p>
<p class="row4">Probability: ${perc}% Cover: ${cover}</p>
<div class="row5">
    <p>Cloud cover: ${cloudcover}<br>Visibility: ${visib}</p>
    <p ${issnow}>Snow: ${snow}<br>Snow depth: ${snowdepth}</p>
</div>`;
    }
    else
    {
        div.innerHTML=`<div class="row1">
    <div class="card_temperature">
                    <p class="main_temp fahrenheit" hidden>${mainTemp}°F</p>
                    <p class="feelslike fahrenheit" hidden>Feels like: ${feelsLike}°F</p>
                    <p class="min_temp fahrenheit" hidden>Lowest: ${lowest}°F</p>
                    <p class="max_temp fahrenheit" hidden>Highest: ${highest}°F</p>
                        <p class="main_temp celsius">${tempConvert.toCelsius(mainTemp)}°C</p>
                        <p class="feelslike celsius">Feels like: ${tempConvert.toCelsius(feelsLike)}°C</p>
                        <p class="min_temp celsius">Lowest: ${tempConvert.toCelsius(lowest)}°C</p>
                        <p class="max_temp celsius">Highest: ${tempConvert.toCelsius(highest)}°C</p>
    </div>
    <img class="weather_icon ${weather}">
</div>
<p class="row2">${detailed}</p>
<p class="row3">Humidity: ${humidity}<br>Type of precipitation: ${precip[0]}</p>
<p class="row4">Probability: ${perc}% Cover: ${cover}</p>
<div class="row5">
    <p>Cloud cover: ${cloudcover}<br>Visibility: ${visib}</p>
    <p ${issnow}>Snow: ${snow}<br>Snow depth: ${snowdepth}</p>
</div>`;
    }
    div.appendChild(generateMoonPhases(moonphase.name));
}

function updateInfo(o)
{
    let add=document.querySelector(".address");
    add.textContent="Location: "+o.address;
    let time=document.querySelector(".timezone");
    time.textContent="Timezone: "+o.timezone;
    let lat=document.querySelector(".latitude");
    lat.textContent="Latitude: "+o.latitude;
    let long=document.querySelector(".longitude");
    long.textContent="Longitude: "+o.longitude;
}

function setEventHandlers()
{
    let d=document.querySelectorAll(".card");
    d.forEach(i=>{
        i.addEventListener("click",function(e){
            let o=script.currentQuery;
            let r=e.target;
            if(o==null||o==undefined||o=={})
                return;
            while(!r.classList.contains("card"))
            {
                r=r.parentElement;
            }
            let x=Array.prototype.indexOf.call(document.querySelector(".cards").children, r);
            createCurrentCard(script.whichTemp,o.days[x].temp,o.days[x].feelslike,o.days[x].mintemp,o.days[x].maxtemp,o.days[x].icon,o.days[x].detailed,o.days[x].humidity,o.days[x].precip,o.days[x].rainprob,o.days[x].raincover,o.days[x].visibility,o.days[x].snow,o.days[x].snowdepth,o.days[x].cloudcover,o.days[x].moonphase);
            setImages();
        });
    });
}
