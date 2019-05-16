        var userMarker;
        var currentLat = 49.246292;
        var currentLat = -123.116226;



        // The below function creates the Google Maps API object on the 
        // page and appends it to the div called "map". The initial coordinates
        // of the map's centre is either that of the centre of Vancouver, B.C.
        // or that of the device the user is currently using. 
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
            
            // Checks if the user device's location is enabled, if so it 
            // sets the map and marker initial center locations to that 
            // of the device's longitude and latitude.
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
                    currentLat = userMarker.getPosition().lat();
                    currentLng = userMarker.getPosition().lng();
                } else {
                    userMarker.setPosition(latLng);
                }

                map.panTo(latLng);
                console.log(userMarker.getPosition().lat());
                console.log(userMarker.getPosition().lng());
                currentLat = userMarker.getPosition().lat();
                currentLng = userMarker.getPosition().lng();            
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
                var timeSQL = convertToSQLTimeFormat(time);
                var dateSQL = convertToSQLDateFormat(date);
                
                matchMade = {
                    lat: currentLat,
                    lng: currentLng,
                    time: timeSQL,
                    date: dateSQL,
                    sport: userSport
                };
            }
            console.log(matchMade);
            convertToSQLDateFormat(date);
            convertToSQLTimeFormat(time);
            
            $.ajax({
                url: "/create-match",
                dataType: "json",
                type: "POST",
                data: matchMade,
                success: function(userData) {
                    console.log("SUCCESS: ", matchMade);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    $("#p2").text(jqXHR.statusText);
                   console.log("ERROR:", jqXHR, textStatus, errorThrown);
                }
            });
            
        }


        // A method to convert a day input from the user into SQL's date format
        // as a JavaScript String. We do this by comparing their chosen day to
        // the current date of creation. It then will output a relevant date, 
        // either on a day during the current week or on a different week.
        //
        // @params dayConversion - the day the user selected as a string.
        // @return date format of the match the user wants to create.
        function convertToSQLDateFormat(dayConversion){
            var todayDate = new Date();
            var today = todayDate.getDay();
            var dayOffset = 0;
            
            if (dayConversion < today) {
                dayOffset = dayConversion - today + 7;
            } else if (dayConversion > today) {
                dayOffset = dayConversion - today;
            }
            
            todayDate.setDate(todayDate.getDate() + dayOffset);
            console.log(todayDate);
            
            
            // Storing the month and day, for preliminary conversion to
            // an SQL-friendly format. JavaScript's Date.getMonth() method
            // returns the number of the month from 0 - 11, hence the 
            // addition to account for it.
            var monthFormat = todayDate.getMonth() + 1;
            var dayFormat = todayDate.getDate();
            
            
            // The added 0 at the beginning if the month or date number is
            // less than two digits long.
            if(monthFormat < 10) {
                monthFormat = `0${monthFormat}`;
            }
            
            if(dayFormat < 10) {
                dayFormat = `0${todayDate.getDate()}`;
            }

            // The final, fully converted date ready for SQL querying.
            var dateConverted = `${todayDate.getFullYear()}-${monthFormat}-${dayFormat}`;
            
            console.log(dateConverted);
            return dateConverted;
        }


        // A method to convert an 24 hour time input to one that is
        // SQL-friendly. This is important for querying our database.
        //
        // @params timeConversion the time for the user to input, an int from 0-23
        // @return the time converted to SQL's format "00.00:00.0000000".
        function convertToSQLTimeFormat(timeConversion) {
            var userHour = timeConversion;
            var convertedTime = 0;
            if(userHour < 10) {
                convertedTime = `0${userHour}:00:00.0000000`;
            } else {
                convertedTime = `${userHour}:00:00.0000000`;
            }
            
            console.log(convertedTime);
            return convertedTime;
        }


        console.log(localStorage.getItem('userSport'));
        initMap();
