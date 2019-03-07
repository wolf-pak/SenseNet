function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time').innerHTML =
        h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
    return i;
}

function startDate() {
    n = new Date();
    y = n.getFullYear();
    m = n.getMonth() + 1;
    d = n.getDate();
    var day = getDayName(n, "en-US"); 
    
    document.getElementById("dateName").innerHTML = day;
    document.getElementById("date").innerHTML = d + "/" + m;
}

function getDayName(date, locale) { 
    return date.toLocaleDateString(locale, { weekday: 'long' });
}
