// API josta haetaan sääaseman dataa
const api = 'https://webapi19sa-1.course.tamk.cloud/v1/weather';    

// sivun pyyhkiminen
function homeView() {
    document.getElementById('title').innerHTML = '<center>Tervetuloa sääasemalle!</center>';
    document.getElementById('text').innerHTML = '';
    document.getElementById('data-div').innerHTML = '';
    document.getElementById('chart-div').innerHTML = '';
    document.getElementById('interval-div').innerHTML = '';
}
// ylävalikon if lause joka ohjaa eri funktioihin
function updateView(event) {
    if (event.id == 'last-values') {
        lastValues();
    }
    else if (event.id == 'temperature') {
        temperatureView();
    }
    else if (event.id == 'freechoice') {
        freechoice();
    }
}

// getData-funktio hakee dataa APIsta
const getData = async (endpoint='') => {
    let resource
    if (endpoint.length > 0) {
        resource = api + `/${endpoint}`
    } else {
        resource = api
    }
    console.log('resource', resource)
    const response = await fetch(resource)
    return await response.json()
}