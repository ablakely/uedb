function initialize() {
  var mapdiv = $("#ldbmap");
  var input  = $("#pac-input").select()[0];
  var points = mapdiv.data("points");
  var map    = new google.maps.Map(mapdiv.select()[0], {
    mapTypeId:   google.maps.MapTypeId.SATELLITE
  });

  if (input == undefined && points != undefined) {
    if (points.length > 1) {
      window.markers = [];
      map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
      map.setZoom(8);
      map.setCenter(new google.maps.LatLng(points[0][0], points[0][1]));

      for (var pnt = 0; pnt < points.length; pnt++) {
        var p = new google.maps.Marker({
          map:        map,
          position:   new google.maps.LatLng(points[pnt][0], points[pnt][1]),
          title:      points[pnt][2],
          locationid: points[pnt][3],
          icon:       "http://maps.google.com/intl/en_us/mapfiles/ms/micons/red.png"
        });

        window.markers.push(p)

        google.maps.event.addListener(p, 'click', function() {
          $("ul").find("[data-locationid='"+this.locationid+"']").children()[0].click();
        });

        google.maps.event.addListener(p, 'mouseover', function() {
          $("ul").find("[data-locationid='"+this.locationid+"']").addClass("active");
        });

        google.maps.event.addListener(p, 'mouseout', function() {
          $("ul").find("[data-locationid='"+this.locationid+"']").removeClass("active");
        });

        $("ul").find("[data-locationid='"+points[pnt][3]+"']").mouseenter(function() {
          for (var i = 0; i < window.markers.length; i++) {
            if (window.markers[i].locationid == $(this).data("locationid")) {
              window.markers[i].setIcon('http://maps.google.com/intl/en_us/mapfiles/ms/micons/purple.png');
            }
          }
        });

        $("ul").find("[data-locationid='"+points[pnt][3]+"']").mouseleave(function() {
          for (var i = 0; i < window.markers.length; i++) {
            if (window.markers[i].locationid == $(this).data("locationid")) {
              window.markers[i].setIcon('http://maps.google.com/intl/en_us/mapfiles/ms/micons/red.png');
            }
          }
        });
      }
    } else {
      map.setCenter(new google.maps.LatLng(points[0][0]+0.0004, points[0][1]));
      map.setZoom(18);

      var marker = new google.maps.Marker({
        map:        map,
        icon:       'http://maps.google.com/intl/en_us/mapfiles/ms/micons/red.png',
        position:   new google.maps.LatLng(points[0][0], points[0][1]),
        draggable:  true
      });

      google.maps.event.addListener(marker, 'drag', function() {
        $("#inputCoords").val(this.position);
      });
    }
  } else {
    window.markers = [];
    map.fitBounds(new google.maps.LatLngBounds(
        new google.maps.LatLng(28.70, -127.50)
      , new google.maps.LatLng(48.85, -55.90)));

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    var sBox = new google.maps.places.SearchBox(input);

    google.maps.event.addListener(sBox, 'places_changed', function() {
      var places = sBox.getPlaces();

      for (var i = 0, marker; marker = window.markers[i]; i++) {
        marker.setMap(null);
      }
      window.markers = [];

      var bounds = new google.maps.LatLngBounds();
      for (var i = 0, place; place = places[i]; i++) {
        var image = {
          url:    place.icon,
          size:     new google.maps.Size(71, 71),
          origin:   new google.maps.Point(0, 0),
          anchor:   new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        var marker = new google.maps.Marker({
          map:    map,
          icon:     image,
          title:    place.name,
          position:   place.geometry.location,
          draggable:  true
        });

        window.markers.push(marker);
        bounds.extend(place.geometry.location);

        google.maps.event.addListener(marker, 'click', function() {
          $("#inputCoordinates").val(this.position);
        });

        google.maps.event.addListener(marker, 'drag', function() {
          $("#inputCoordinates").val(this.position);
        });

      }

      map.fitBounds(bounds);
    });

    google.maps.event.addListener(map, 'bounds_changed', function() {
      var bounds = map.getBounds();
      sBox.setBounds(bounds);
    });
  }
}

google.maps.event.addDomListener(window, 'load', initialize);