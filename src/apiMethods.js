import './style.css';
import * as moon from './moon.js';
const fns=require("date-fns");
function createQueryString(date1,date2,location)
{
    if(typeof(date1)!="string")
    {
        var d1=fns.format(date1,"yyyy");
        var d2=fns.format(date1,"MM");
        var d3=fns.format(date1,"dd");
        date1=d1+"-"+d2+"-"+d3;
    }
    if(typeof(date2)!="string")
    {
        var d1=fns.format(date2,"yyyy");
        var d2=fns.format(date2,"MM");
        var d3=fns.format(date2,"dd");
        date2=d1+"-"+d2+"-"+d3;
    }
    var s="https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
    s+=location+"/";
    s+=date1+"/";
    s+=date2+"/";
    s+="?key=LRHZDVDM3P58UU3TCVXZCM237";
    return s;
}
export async function getData(location)
{
    let r;
    await fetch(createQueryString(new Date(),fns.addDays(new Date(),7),location), {mode: 'cors'})
    .then(function(response) {
    return response.json();
    })
    .then(function(response) {
    r=processData(response);
    }).catch(error=>{
        r="error";
    });
    return r;
}
function processData(response)
{
    console.log(response);
    let days=[];
    for(var i=0;i<7;i++)
    {
        let pd=response.days[i]["datetime"];
        pd=new Date(pd);
        let o={
            date: pd,
            maxtemp: response.days[i]["tempmax"],
            mintemp: response.days[i]["tempmin"],
            temp: response.days[i]["temp"],
            feelslike: response.days[i]["feelslike"],
            humidity: response.days[i]["humidity"],
            precip: response.days[i]["preciptype"],
            rainprob: response.days[i]["precipprob"],
            raincover: response.days[i]["precipcover"],
            snow: response.days[i]["snow"],
            snowdepth: response.days[i]["snowdepth"],
            cloudcover: response.days[i]["cloudcover"],
            visibility: response.days[i]["visibility"],
            sunrise: response.days[i]["sunrise"].substring(0,5),
            sunset: response.days[i]["sunset"].substring(0,5),
            moonphase: moon.moonPhase(response.days[i]["moonphase"]),
            brief: response.days[i]["conditions"],
            detailed: response.days[i]["description"],
            icon: response.days[i]["icon"],
        };
        days.push(o);
    }
    return {
        address: response["resolvedAddress"],
        timezone: response["timezone"],
        latitude: response["latitude"],
        longitude: response["longitude"],
        days: days,
    };
}