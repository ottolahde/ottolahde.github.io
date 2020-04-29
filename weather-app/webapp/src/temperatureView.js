//Lämpötilasivun muokkaaminen
function temperatureView() {
    document.getElementById('title').innerHTML = 'Lämpötila'
    document.getElementById('text').innerHTML = ''
    document.getElementById('data-div').innerHTML = ''

    // alasvetovalikko intervallin valitsemiseen
    document.getElementById('interval-div').innerHTML = `
 
    
    <label></br>INTERVAL</label>
    <select id="selectInterval" class="form-control selcls" onchange="getTempData()">
        <option value="live">Live</option>
        <option value="24" selected>24 hours</option>
        <option value="48">48 hours</option>
        <option value="72">72 hours</option>
        <option value="168">1 week</option>
        <option value="672">1 month</option>
    </select>
    `
    
   
    getTempData()
}
// asettaa signaalin temperatureksi ja luo kaavion
function getTempData() {
        
    const signal = 'temperature'
    const interval = document.getElementById('selectInterval').value

    // tarkistetaan alasvetovalikon valinta ja muokataan api
    if (interval != 'live') {
        url = `temperature/${interval}`
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
                smooth: true,
                type: 'line',
                areaStyle: {},
                data: rows // rivit
                
                
            }],             // custom väritys pakkaselle ja ei pakkaselle
            visualMap: {
                show: false,
                pieces: [{
                    min: 0,
                    max: 100,
                    color: '#de0000'
                },
                {
                    min: -100,
                    max: 0,
                    color: '#00aede',
                }]
            }
        }
    
        myChart.setOption(option) // asetetaan kaavio chart-diviin
    
    })
    
        .catch((error) => {
            console.error('Error:', error);
        })

}
