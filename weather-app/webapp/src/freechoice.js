// vapaavalinta funktio kahdella alasvetovalikolla
function freechoice() {
    document.getElementById('title').innerHTML = 'Vapaavalintainen signaali'
    document.getElementById('text').innerHTML = ''
    document.getElementById('data-div').innerHTML = ''
    document.getElementById('interval-div').innerHTML = `
    <label>SIGNAL</label>
    <select id="selectSignal" class="form-control selcls" onchange="getSignalData()">
        <option value="temperature" selected>Temperature</option>
        <option value="light">Light</option>
        <option value="wind_speed">Wind Speed</option>
        <option value="wind_direction">Wind Direction</option>
        <option value="humidity_out">Humidity out</option>
        <option value="humidity_in">Humidity in</option>
    </select>
    
    <label></br>INTERVAL</label>
    <select id="selectInterval" class="form-control selcls" onchange="getSignalData()">
        <option value="live">Live</option>
        <option value="24" selected>24 hours</option>
        <option value="48">48 hours</option>
        <option value="72">72 hours</option>
        <option value="168">1 week</option>
        <option value="672">1 month</option>
    </select>
    `
   
    getSignalData()
}
//Luo kaavion valitun signaalin ja intervallin pohjalta
function getSignalData() {
        
    const signal = document.getElementById('selectSignal').value
    const interval = document.getElementById('selectInterval').value

    if (interval != 'live') {
        url = `${signal}/${interval}`
    }
    else {
        url = `${signal}`
    }
    console.log('Interval:', interval)

    getData(url).then(function (data) {
        console.log(`${api}/${signal}/${interval}`);

        let columns = [];
        let rows = [];

        let html = `
        <table class="table table-striped">
            <thead>
                <tr><th>Päivämäärä</th><th>Kellonaika</th>
                    <th>Arvo</th>
                </tr>
            </thead>
            <tbody>
        `;
        data.forEach(element => {
            const d = new Date(element.date_time);
            const date = d.toLocaleDateString();
            const time = d.toLocaleTimeString();
            html += `<tr><td>${date}</td><td>${time}</td><td>${element[signal]}</td></tr>`;
            columns.push(`${date} ${time}`);
            rows.push(element[signal]);

        });

        html += `</tbody></table>`;
        document.getElementById('data-div').innerHTML = html;


        echarts.dispose(document.getElementById('chart-div')) // poistetaan mahd. vanha kaavio
        let myChart = echarts.init(document.getElementById('chart-div')) // alustetaan uusi kaavio
    
        const option = { // määritellään haluttu kaavio
            title: {},
            tooltip: {},
            legend: {},
            xAxis: {
                data: columns // sarakkeet
            },
            yAxis: {},
            series: [{
                name: signal,
                type: 'line',
                smooth: true,
                areaStyle: {},
                data: rows // rivit
            }]
        }
    
        myChart.setOption(option) // asetetaan kaavio chart-diviin
    
    })
    
        .catch((error) => {
            console.error('Error:', error);
        })

    //myChart.setOption(option) // asetetaan kaavio chart-diviin
}
