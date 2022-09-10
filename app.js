const api = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0001-001?Authorization=CWB-F44E44EA-6305-47FE-A4E2-CB8AC0A12E30&format=JSON&stationId=C0F0A0,C0F0E0,C0H9C0,C0R600,C0I530,C0S750,467530&elementName=`;

fetch(api) // promise based object
    .then(response => {
        return response.json();
    })
    .then(jsonData => {
        console.log(jsonData);
        let test = jsonData.records.location[0].locationName;
        let city = jsonData.records.location[0].parameter[0].parameterValue;
        console.log(`${test} 是在 ${city}`);
    })
    .catch(error => {
        console.log('ERROR');
    })
