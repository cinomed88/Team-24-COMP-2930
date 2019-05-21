        // The below function creates the map and populates it with markers that fit the
        // user's wanted sport and times that make sense. The map's origin point is either
        // the user's current location or the centre of Downtown Vancouver, British Columbia.
        function initMap() {
            
            
            if (localStorage.getItem('userSport') == null) {
                window.location.href = "/gamelandscape.html"
            }
            
            var map = new google.maps.Map(document.getElementById('map'), {
                center: {
                    lat: 49.246292,
                    lng: -123.116226
                },
                streetViewControl: false,
                mapTypeControl: false,
                zoom: 15,
                mapTypeId: 'roadmap'
            });
                        
            // Geo-location to find the user's current location and set the centre of the map
            // to it accordingly.
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    map.setCenter({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                });
                    
            }
            
            


            // Create the search box and link it to the UI element.
            var input = document.getElementById('pac-input');
            var searchBox = new google.maps.places.SearchBox(input);
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

            // Bias the SearchBox results towards current map's viewport.
            map.addListener('bounds_changed', function () {
                searchBox.setBounds(map.getBounds());
            });

            
            
            retrieveUserMatch(map);
           // localStorage.clear();
            
            
            var markers = [];
            // Listen for the event fired when the user selects a prediction and retrieve
            // more details for that place.
            searchBox.addListener('places_changed', function () {
                var places = searchBox.getPlaces();

                if (places.length == 0) {
                    return;
                }

                // Clear out the old markers.
                markers.forEach(function (marker) {
                    marker.setMap(null);
                });
                markers = [];

                // For each place, get the icon, name and location.
                var bounds = new google.maps.LatLngBounds();
                places.forEach(function (place) {
                    if (!place.geometry) {
                        console.log("Returned place contains no geometry");
                        return;
                    }
                    var icon = {
                        url: place.icon,
                        size: new google.maps.Size(71, 71),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(17, 34),
                        scaledSize: new google.maps.Size(25, 25)
                    };

                    // Create a marker for each place.
                    markers.push(new google.maps.Marker({
                        map: map,
                        icon: icon,
                        title: place.name,
                        position: place.geometry.location
                    }));

                    if (place.geometry.viewport) {
                        // Only geocodes have viewport.
                        bounds.union(place.geometry.viewport);
                    } else {
                        bounds.extend(place.geometry.location);
                    }
                });
                map.fitBounds(bounds);
            });

        }



        // This is a function that retrieves the matches made that
        // are of the user's requested sport, and start after the 
        // user's current date and time.
        //
        // @param mapAppend - a Google Maps API Object.
        function retrieveUserMatch(mapAppend) {
            
            
            var todayDate = new Date();
            var time = `${todayDate.getHours()}:00:00.0000000`;
            var month = todayDate.getMonth() + 1;
            var date = 0;
            
            if (month < 10) {
                date = `${todayDate.getFullYear()}-0${month}-${todayDate.getDate()}`;
            } else {
                date = `${todayDate.getFullYear()}-${month}-${todayDate.getDate()}`;
            }
            console.log(date);
            console.log(time);
            
            
            
            $.ajax({
                url: '/get-matches',
                dataType: 'json',
                type: 'GET',
                data: 
                {
                    sport: localStorage.getItem('userSport'),
                    time: time,
                    date: date
                },
                success: function(data) {
                    console.log(data);
                    for(let i = 0; i < data.length; i++) {
                        var latlng = new google.maps.LatLng(data[i].lat, data[i].lng);
                        var marker = new google.maps.Marker({position: latlng});
                        marker.setMap(mapAppend);
                        var address = 'ERROR, ADDRESS NOT DETECTED';
                        var geocoder = new google.maps.Geocoder;
                        geocoder.geocode({'latLng': latlng}, (results, status) => {
                            if (status == google.maps.GeocoderStatus.OK) {
                                if (results[0]) {
                                    console.log(results[0].formatted_address);
                                    var address = results[0].formatted_address;
                                }
                            }
                            
                        });
                    }                
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    $("#p2").text(jqXHR.statusText);
                   console.log("ERROR:", jqXHR, textStatus, errorThrown);
                }                

            });
        
        }


        initMap();

