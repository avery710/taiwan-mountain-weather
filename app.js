// api section
const BASE_URL = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/'
const AUTHORIZE_CODE = 'CWB-F44E44EA-6305-47FE-A4E2-CB8AC0A12E30'
const INFO = {
    dataid: 'O-A0001-001',
    format: 'JSON',
    stationId: 'C0F0A0,C0F0E0,C0H9C0,C0R600,C0I530,C0S750,467530'
}

let arr = [] // store all info into this array

// element


function change_mainInfo(arr, id){
    document.getElementById("location-name").textContent = `${arr.location[id].locationName}`;
    document.getElementById("city").textContent = `${arr.location[id].parameter[0].parameterValue}`;
    document.getElementById("t-now").textContent = `${arr.location[id].weatherElement[3].elementValue}`;
    document.getElementById("altitude").textContent = `${arr.location[id].weatherElement[0].elementValue}m`
    document.getElementById("latitude").textContent = `${arr.location[id].lat}`;
    document.getElementById("longtitude").textContent = `${arr.location[id].lon}`;
}

function change_weather(arr, id){
    // temperature
    document.getElementById("low-tem").textContent = `${arr.location[id].weatherElement[10].elementValue}`;
    document.getElementById("high-tem").textContent = `${arr.location[id].weatherElement[12].elementValue}`;

    // humid
    document.getElementById("accumulate").textContent = `${arr.location[id].weatherElement[6].elementValue}mm`;

    // wind
    document.getElementById("wind-speed").textContent = `${arr.location[id].weatherElement[2].elementValue}m/s`;

    // others
    document.getElementById("update-time").textContent = `${arr.location[id].time.obsTime}`;
    document.getElementById("stationId").textContent = `${arr.location[id].stationId}`;

}

function value_default(arr){
    document.getElementById("location-name").textContent = `台灣山岳天氣概況`;
    document.getElementById("city").textContent = `城市`;
    document.getElementById("t-now").textContent = `氣溫`;
    document.getElementById("altitude").textContent = ``
    document.getElementById("latitude").textContent = `-`;
    document.getElementById("longtitude").textContent = `-`;
}

const api = `${BASE_URL}${INFO.dataid}?Authorization=${AUTHORIZE_CODE}&format=${INFO.format}&stationId=${INFO.stationId}`;

fetch(api) // promise based object
    .then(response => {
        return response.json();
    })
    .then(jsonData => {
        arr = jsonData.records;
        console.log(arr);

        const btns = document.querySelectorAll("button");
        
        btns.forEach(btn => {
            btn.addEventListener('click', function(e){
                const id = e.target.dataset.id;
                console.log(`button clicked : ${id}`);
                change_mainInfo(arr, id);
                change_weather(arr, id);
            })
        })
        

        //change_mainInfo(arr, id);
        
    })
    .catch(error => {
        console.log('ERROR');
    });