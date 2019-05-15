        var userMarker;

        function initMap() {
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
            
            userMarker = new google.maps.Marker({
                position: map.getCenter(),
                map: map
            });
            
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    map.setCenter({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                    userMarker.setPosition(map.getCenter());
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


            //The below function is the event-handler for the user 
            //clicking a position on the map and creating a 
            //relevant marker.
            map.addListener('click', function (e) {
                placeMarkerAndPanTo(e.latLng, map);
            });

            function placeMarkerAndPanTo(latLng, map) {
                if (!userMarker) {
                    userMarker = new google.maps.Marker({
                        position: latLng,
                        map: map
                    });
                } else {
                    userMarker.setPosition(latLng);
                }

                map.panTo(latLng);
                console.log(userMarker.getPosition().lat());
                console.log(userMarker.getPosition().lng());
            }
        }


        
        // The function used to create a match. It checks to verify that the data
        // the user imported is in-fact valid data for a match to be created on,
        // and then uses this data to host a match and call an AJAX POST request
        // to send the match's data to the SQL database.
        function createMatch(){
            var date = $('#date').val();
            var time = $('#time').val();
            var userSport = localStorage.getItem('userSport');
            var matchMade = {};
            console.log(date, time);
            if(date === 'Day' || time === 'Time') {
                window.alert('Enter a valid day and time!');
            } else {
                
                
                
                matchMade = {
                    lat: userMarker.getPosition().lat(),
                    lng: userMarker.getPosition().lng(),
                    time: time,
                    date: date,
                    sport: userSport
                };
            }
            console.log(matchMade);
            return matchMade;
        }


        // A method to convert a day input from the user into SQL's date
        // format as a JavaScript String. 
        function convertToSQLDateFormat(dayConversion){
            
        }


        console.log(localStorage.getItem('userSport'));
        initMap();
