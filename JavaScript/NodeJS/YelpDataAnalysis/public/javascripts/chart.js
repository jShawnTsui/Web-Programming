  script(type='text/javascript', src='https://www.gstatic.com/charts/loader.js')
  script.
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      var info = [[]];
      info[0][0] = 'Restaurent';
      info[0][1] = 'Rank';
      var results = '!{results.join(';')}'.split(';');
      for (var inx = 0; inx < results.length; inx++){
        info[inx+1] = [];
        var result = results[inx].split(',');
        info[inx+1][0] = result[0];
        info[inx+1][1] = parseFloat(result[1]);
      }
      var data = google.visualization.arrayToDataTable(info);
      var options = {
      title: 'My Friends Favorates'
      };
      var chart = new google.visualization.PieChart(document.getElementById('piechart'));
      chart.draw(data, options);
    }
