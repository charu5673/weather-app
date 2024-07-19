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
        o.name="new-moon";
        o.img=icon1;
    }
    else if(value<0.25)
    {
        o.name="waxing-crescent";
        o.img=icon2;
    }
    else if(value==0.25)
    {
        o.name="first-quarter";
        o.img=icon3;
    }
    else if(value<0.5)
    {
        o.name="waxing-gibbous";
        o.img=icon4;
    }
    else if(value==0.5)
    {
        o.name="full-moon";
        o.img=icon5;
    }
    else if(value<0.75)
    {
        o.name="waning-gibbous";
        o.img=icon6;
    }
    else if(value==0.75)
    {
        o.name="last-quarter";
        o.img=icon7;
    }
    else if(value<1)
    {
        o.name="waning-crescent";
        o.img=icon8;
    }
    return o;
}