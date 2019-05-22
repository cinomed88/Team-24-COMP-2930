

        // The below function creates the map and populates it with markers that fit the
        // user's wanted sport and times that make sense. The map's origin point is either
        // the user's current location or the centre of Downtown Vancouver, British Columbia.
        function initMap(userId) {
            
            
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
            
            // Checks if the user device's location is enabled, if so it 
            // sets the map and marker initial center locations to that 
            // of the device's longitude and latitude.
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

            
            
            retrieveUserMatch(map, userId);
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
        function retrieveUserMatch(mapAppend, userId) {
            
            
            // The below few lines of code take the current time and date and converts
            // it to the time and date format used by Transact-SQL.
            var todayDate = new Date();
            var time = `${todayDate.getHours()}:00:00.0000000`;
            var month = todayDate.getMonth() + 1;
            var date = 0;
            
            // Checks if a trailing zero is required or not for the full SQL date.
            if (month < 10) {
                date = `${todayDate.getFullYear()}-0${month}-${todayDate.getDate()}`;
            } else {
                date = `${todayDate.getFullYear()}-${month}-${todayDate.getDate()}`;
            }
            
            // Console logs to verify that the time and date are correctly translated,
            // for the purposes of debugging etc.
            console.log(date);
            console.log(time);
            
            
            // The below AJAX call retrieves the user's matches, using the selected sport, current time, 
            // and current day of the user, and then uses the data to create clickable markers on the map
            // with the sport, time, and date of the match. 
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
                success: function(matches) {
                    var content = 0;
                    console.log(matches);
                    var marker = [];
                    for(let i = 0; i < matches.length; i++) {

                        var infoWindow = [];
                        
                        var participantsDiv = document.createElement('div');
                        participantsDiv.setAttribute('class', 'participants');
                        participantsDiv.setAttribute('id', `${matches[i].match_id}`);
                        var map = document.getElementById('map');
                        map.appendChild(participantsDiv);                        

                        // Converts the address into a readable, human-friendly version.
                        // And then adds an infoWindow to the relevant marker.
                        var latlng = new google.maps.LatLng(matches[i].lat, matches[i].lng);
                        var geocoder = new google.maps.Geocoder;
                        geocoder.geocode({'latLng': latlng}, (results, status) => {
                            if (status == google.maps.GeocoderStatus.OK) {
                                if (results[0]) {
                                    console.log(results[0].formatted_address);
                                    var address = results[0].formatted_address;
                                    var time = matches[i].time.substring(matches[i].time.indexOf('T') + 1, matches[i].time.length - 1);
                                    console.log(time);
                                    content = `Address: ${address}`;
                                }
                            }  
                        });
                        
                        marker[i] = new google.maps.Marker({position: latlng});
                        marker[i].setMap(mapAppend);
                        marker[i].addListener('click', function() {
                            var popUps = document.getElementsByClassName('participants');
                            for(let i = 0; i < popUps.length; i++) {
                                popUps[i].style.display = 'none';
                            }
                            document.getElementById(`${matches[i].match_id}`).style.display = 'block';
                        });
                    }
                    
                    for (var i = 0; i < matches.length; i++) {
                        var popUps = document.getElementsByClassName('participants');
                        var time = matches[i].time.substring(matches[i].time.indexOf('T') + 1, matches[i].time.length - 1);
                        
                        
                        
                        popUps[i].innerHTML = 
                            `<div id ="rectangle3">
                            <i class="fa fa-close" style="font-size: 50px" onclick="document.getElementById('${matches[i].match_id}').style.display= 'none'"></i>
                            </div>
                            <div class = "matchDetails">
                                <div class = "sport">${matches[i].sport}</div>
                                <div class = "time">${time}</div>
                                <div class = "date">${matches[i].date}</div>
                                <div class = "players"> Players 
                                    <ul class = "scrollable"></ul>
                                </div>
                                <div class = "joinButton" id = "${'b' + matches[i].match_id}" onclick="joinMatch(${matches[i].match_id}); document.getElementById(${matches[i].match_id}).style.display = 'none'; this.style.display = 'none'">
                                        JOIN
                                </div>
                            </div>`;
                        addPlayers(popUps[i], i, userId);
                        
                    }
                        
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    $("#p2").text(jqXHR.statusText);
                   console.log("ERROR:", jqXHR, textStatus, errorThrown);
                }                

            });            
        }
                
        // The method that populates a div with the users that are apart of that match.
        //
        //@params divMatch, a variable holding a div element.
        //@params int, the index of the divMatch's HTMLCollection pertaining to its class.
        function addPlayers(divMatch, int, userId) {
            console.log(divMatch.id);
            $.ajax({
                url: '/get-match-participants',
                dataType: 'json',
                data: {matchId: divMatch.id},
                success: function(data) {
                    console.log(data);
                    var list = document.getElementsByClassName('scrollable');
                    var joinButton = document.getElementById('b' + divMatch.id);
                    for (let k = 0; k < data.length; k++){
                        if (data[k].is_host === 1) {
                            list[int].innerHTML += `<li><div class = "playerDetail">${data[k].user_name} <br> Host</div></li>`
                        } else {
                            list[int].innerHTML += `<li><div class = "playerDetail">${data[k].user_name}</div></li>` 
                        }
                        if (data[k].user_id === userId) {
                            joinButton.style.display = 'none';
                        }
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    $("#p2").text(jqXHR.statusText);
                    console.log("ERROR:", jqXHR, textStatus, errorThrown);
                }                


            });
        }


        // The method that adds the current user to a specified match.
        //
        // @param matchId the id of the match to add the user to.
        function joinMatch(matchId) {
            var id = firebase.auth().currentUser.uid;
            var userData = {
                user_id: id,
                match_id: matchId
            };
            $.ajax({
                url: '/join-match',
                dataType: "json",
                type: "POST",
                data: userData,
                success: function(userData) {
                    console.log("SUCCESS!");
                    
                },
                error: function(jqXHR, textStatus, errorThrown) {
                          $("#p2").text(jqXHR.statusText);
                          console.log("ERROR:", jqXHR, textStatus, errorThrown);
                      }
            });
        }
        

        
        

                    
        // Runs the map, if, and only if, the user is logged in.
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var uid = firebase.auth().currentUser.uid;
                initMap(uid);
            }
        });
    
