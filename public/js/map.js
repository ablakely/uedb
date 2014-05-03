function initialize() {

  var input = /** @type {HTMLInputElement} */(
      document.getElementById('pac-input'));
  if (input != undefined) {

   var markers = [];
  var map = new google.maps.Map(document.getElementById('ldbmap'), {
    mapTypeId: google.maps.MapTypeId.SATELLITE
  });

  var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(28.70, -127.50),
      new google.maps.LatLng(48.85, -55.90));
  map.fitBounds(defaultBounds);

  // Create the search box and link it to the UI element.
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var searchBox = new google.maps.places.SearchBox(
      /** @type {HTMLInputElement} */(input));

    // [START region_getplaces]
    // Listen for the event fired when the user selects an item from the
    // pick list. Retrieve the matching places for that item.
    google.maps.event.addListener(searchBox, 'places_changed', function() {
      var places = searchBox.getPlaces();

      for (var i = 0, marker; marker = markers[i]; i++) {
        marker.setMap(null);
      }

      // For each place, get the icon, place name, and location.
      markers = [];
      var bounds = new google.maps.LatLngBounds();
      for (var i = 0, place; place = places[i]; i++) {
        var image = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        var marker = new google.maps.Marker({
          map: map,
          icon: image,
          title: place.name,
          position: place.geometry.location
        });

        markers.push(marker);

        bounds.extend(place.geometry.location);
        $("#inputCoordinates").val(place.geometry.location);
      }

      map.fitBounds(bounds);
    });
    // [END region_getplaces]

    // Bias the SearchBox results towards places that are within the bounds of the
    // current map's viewport.
    google.maps.event.addListener(map, 'bounds_changed', function() {
      var bounds = map.getBounds();
      searchBox.setBounds(bounds);
    });
  } else {
    var map = new google.maps.Map(document.getElementById('ldbmap'), {
    mapTypeId: google.maps.MapTypeId.SATELLITE,
    center: new google.maps.LatLng($("#ldbmap").data("lat"), $("#ldbmap").data("lon")),
    zoom: 8
  });
  }
}

google.maps.event.addDomListener(window, 'load', initialize);
