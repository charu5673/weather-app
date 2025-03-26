import * as apiMethods from './apiMethods.js';
import * as dom from './domGenerator.js';
import logo from './logo.png';

export let whichTemp="f";
export let currentQuery=null;

document.querySelector(".switch_temp").addEventListener("click",function(e){
    if(whichTemp=="c")
        {
            whichTemp="f";
            e.target.textContent="In Celsius";
        }
    else
    {
        whichTemp="c";
        e.target.textContent="In Fahrenheit";
    }
    if(currentQuery!=null&&currentQuery!=undefined&&currentQuery!="")
    dom.createCards(currentQuery,whichTemp);
});

document.querySelector(".logo").src=logo;

document.querySelector(".search_button").addEventListener("click",function(){
    let query=document.querySelector(".search_bar").value;
    if(query!=null&&query!=undefined&&query!="")
    {
        searchStart(query);
    }
});

async function searchStart(query)
{
    let d=await apiMethods.getData(query);
    if(d=="error")
    return;
    else
    {
        dom.createCards(d,whichTemp);
        currentQuery=d;
    }
}

document.querySelector(".icon_credits").addEventListener("click",function(){
    document.querySelector("dialog").showModal();
});

document.querySelector("dialog").addEventListener("click",function(e){
    e.target.close();
});

searchStart("london");

navigator.geolocation.getCurrentPosition(searchUserCity,()=>{console.log("no location :(");},{enableHighAccuracy: true });

async function searchUserCity(pos)
{
    let r;
    await fetch(createQueryLocation(pos.coords.latitude,pos.coords.longitude), {mode: 'cors'})
    .then(function(response) {
    return response.json();
    })
    .then(function(response) {
    r=response[0].name;
    }).catch(error=>{
        r="error";
    });
    searchStart(r);
}

function createQueryLocation(lat,long)
{
    return `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=1&appid=17e97440e9f9705415f68f238b4e2021`;
}