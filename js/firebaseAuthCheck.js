

    // Web app's Firebase configuration
          var firebaseConfig = {
            apiKey: "AIzaSyCoGe4elAbufN_7O9NL9lIVU1D1mtQEArc",
            authDomain: "gotnextauth.firebaseapp.com",
            databaseURL: "https://gotnextauth.firebaseio.com",
            projectId: "gotnextauth",
            storageBucket: "gotnextauth.appspot.com",
            messagingSenderId: "770260580099",
            appId: "1:770260580099:web:5dc0ca1ca414f174"
          };
          // Initialize Firebase
          firebase.initializeApp(firebaseConfig);


        initApp = function() {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
              var name = user.displayName;
              let userData = {
                  user_id: user.uid,
                  user_name: name,
                  honor_point: 0,
                  rank_point: 0
               };
              
              // User is signed in.   
              var displayName = user.displayName;
              var email = user.email;
              var uid = user.uid;
              var providerData = user.providerData;
              user.getIdToken().then(function(accessToken) {
                  var userDetails = {
                      displayName: displayName,
                      email: email,
                      uid: uid,
                      accessToken: accessToken,
                      providerData: providerData
                }
                
                  console.log(userDetails);
                
            }, null, '  ');  
              
                        
              
              
              if (firebase.auth().currentUser.metadata.creationTime === firebase.auth().currentUser.metadata.lastSignInTime) {
                  $.ajax({
                      url: "/create-user",
                      dataType: "json",
                      type: "POST",
                      data: userData,
                      success: function(userData) {
                          console.log("SUCCESS JSON:", userData);
                      },
                      error: function(jqXHR, textStatus, errorThrown) {
                          $("#p2").text(jqXHR.statusText);
                          console.log("ERROR:", jqXHR, textStatus, errorThrown);
                      }
                  });         
               }
           } else {
               // User is signed out.
               console.log('Signed out');
               window.location.href = "/";
          }
        }, function(error) {
          console.log(error);
        });
      };

      window.addEventListener('load', function() {
        initApp()
      });

