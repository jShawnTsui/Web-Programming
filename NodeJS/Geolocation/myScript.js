var map, infoWindow, i, marker;
var markers = [];
      
      var locations = [
     	['Title A', 39.880967,-75.115546, 1],
     	['Title B', 39.810848,-75.166669, 2],
     	['Title C', 39.967372,-75.157443, 3],
     	['Title D', 39.99125,-75.170052, 4]];
      
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 10
        });
        
      infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);

          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

      function markersDisplay(){
        for (i = 0; i < locations.length; i++) {  
          marker = new google.maps.Marker({
             position: new google.maps.LatLng(locations[i][1], locations[i][2]),
             label: locations[i][3].toString(),
             map: map
          });
          //markers.push(marker);

          google.maps.event.addListener(marker, 'click', (function(marker, i) 
          {
             return function() {
                 infoWindow.setContent(locations[i][0]);
                 infoWindow.open(map, marker);
             }
          })(marker, i));
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }