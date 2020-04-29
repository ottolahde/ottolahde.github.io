function lastValues() { // nimeää sivun
    document.getElementById('title').innerHTML = 'Viimeiset arvot';
    document.getElementById('text').innerHTML = '';
    document.getElementById('chart-div').innerHTML = '';
    document.getElementById('interval-div').innerHTML = '';
    document.getElementById('data-div').innerHTML = '';




    getData(`limit/50`) // funktio main.js -tiedostossa
        .then((data) => {
            let html = `
        <table class="table table-striped">
            <thead>
                <tr><th>Device id</th><th>Date time</th>
                    <th>Signal name</th><th>Signal value</th>
                </tr>
            </thead>
            <tbody>
        `;
            data.forEach(element => {
                const d = new Date(element['date_time']);
                const date = d.toLocaleDateString();
                const time = d.toLocaleTimeString();
                html += `<tr><td>${element['device_id']}</td>
                <td>${date} ${time}</td>
                <td>${Object.keys(element['data'])}</td>
                <td>${Object.values(element['data'])}</td>
                </tr>`;
            });
            html += `
            </tbody>
        </table>`;
            // chart diviin koska menee nätimpään muotoiluun vasempaan reunaan
            document.getElementById("chart-div").innerHTML = html;
        })
        .catch((error) => {
            console.error('Error:', error);
        })
}