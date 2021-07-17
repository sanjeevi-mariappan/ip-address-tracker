var myMap=L.map('myMap');
var btn=document.getElementById('submit');
var ipaddr=document.getElementById('ipaddress');
var marker;

function addTileLayer(){
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoic2FuamVldmk5MDgiLCJhIjoiY2tyN2dmbzhzMm5qdjMwbW4weGY1cjl6MyJ9.HEjI6JHFy07Cn3WEX63X4Q'
    }).addTo(myMap)
}

function setView(latitude,longitude){
    myMap.setView([latitude, longitude], 13); 
}

function setMarker(latitude,longitude){
   marker.setLatLng(L.latLng(latitude,longitude));
}

function init_marker(latitude,longitude){
    myIcon = L.icon({
        iconUrl: "images/icon-location.svg",
        iconSize: [25, 41],
       });
    marker = L.marker([latitude, longitude], { icon:myIcon});
    marker.addTo(myMap);
}


function init_map(){
    addTileLayer();
    navigator.geolocation.getCurrentPosition((position)=>{
        setView(position.coords.latitude,position.coords.longitude);
        init_marker(position.coords.latitude,position.coords.longitude);
    });
    sendGetRequestToIpify('');
}

function sendGetRequestToIpify(ip){
    var api_key = "at_36WVHvqAIMrz36bbAnjyDHYfx6cY0";
    fetch(`https://geo.ipify.org/api/v1?apiKey=${api_key}&ipAddress=${ip}`).then(response =>
    response.json()).then(data=>{
        setView(data.location.lat,data.location.lng);
        setMarker(data.location.lat,data.location.lng)
        updateResults(data.ip,`${data.location.city} ${data.location.postalCode}`,`UTC ${data.location.timezone}`,data.isp);
    });
}
btn.onclick=function(){
    let ip=ipaddr.value;
    sendGetRequestToIpify(ip);
}

function updateResults(ip,location,timezone,isp){
    document.getElementById('ip').textContent=ip;
    document.getElementById('location').textContent=location;
    document.getElementById('timezone').textContent=timezone;
    document.getElementById('isp').textContent=isp;
}
