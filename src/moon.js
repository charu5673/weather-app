import icon1 from './moon-phases/new-moon.png';
import icon2 from './moon-phases/waxing-crescent.png';
import icon3 from './moon-phases/first-quarter.png';
import icon4 from './moon-phases/waxing-gibbous.png';
import icon5 from './moon-phases/full-moon.png';
import icon6 from './moon-phases/waning-gibbous.png';
import icon7 from './moon-phases/last-quarter.png';
import icon8 from './moon-phases/waning-crescent.png';

export function moonPhase(value)
{
    let o={
        name:"",
        img:"",
    };
    if(value==0||value==1)
    {
        o.name="New moon";
        o.img=icon1;
    }
    else if(value<0.25)
    {
        o.name="Waxing crescent";
        o.img=icon2;
    }
    else if(value==0.25)
    {
        o.name="First quarter";
        o.img=icon3;
    }
    else if(value<0.5)
    {
        o.name="Waxing gibbous";
        o.img=icon4;
    }
    else if(value==0.5)
    {
        o.name="Full moon";
        o.img=icon5;
    }
    else if(value<0.75)
    {
        o.name="Waning gibbous";
        o.img=icon6;
    }
    else if(value==0.75)
    {
        o.name="Last quarter";
        o.img=icon7;
    }
    else if(value<1)
    {
        o.name="Waning crescent";
        o.img=icon8;
    }
    return o;
}