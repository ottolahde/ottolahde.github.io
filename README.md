<!DOCTYPE html>
<html lang="fi">

<head>
  <title>Sääasema</title>
  <meta charset="utf-8">

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
  <script src="main.js"></script>
  <script src="lastValues.js"></script>
  <script src="temperatureView.js"></script>
  <script src="freechoice.js"></script>
  <script src="echarts/echarts.js"></script>
  <link rel = "shortcut icon" type = "image/png" href = "http://icons.iconarchive.com/icons/papirus-team/papirus-apps/128/weather-icon.png">
</head>
<body>

<nav class="navbar navbar-expand-md bg-dark navbar-dark">
  <a class="navbar-brand" href="#" onclick="homeView()">Sääasema</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="collapsibleNavbar">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" href="#" id="last-values" onclick="updateView(this)">Viimeiset arvot</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" id="temperature" onclick="updateView(this)">Lämpötila</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" id="freechoice" onclick="updateView(this)">Vapaavalintainen signaali</a>
      </li>
    </ul>
  </div>  
</nav>
<div class="container-fluid">
  <h1 id="title"></h1>
  <p id="text"></p>
  <div class="container-fluid">

    <!-- eri lohkoihin jaoiteltuna -->
    <div class="row">

      <div class="col-md-5">
        <div id="chart-div" style="min-height: 400px; width: 100%"></div>       
      </div>

      <div class="col-md-2">
        <div id="interval-div"></div>
      </div>

      <div class="col-md-5">
        <div id="data-div"></div>
      </div>
      
    </div>
  </div>
</div>



<script>homeView()</script>

</body>
</html>
