export function toCelsius(f)
{
    f=(f-32)*5/9;
    f=f+"";
    var i;
    for(i=0;i<f.length;i++)
    {
        if(f.charAt(i)==".")
        break;
    }
    if(i+1>=f.length)
    return f;
    else
    return f.substring(0,i+2);
}