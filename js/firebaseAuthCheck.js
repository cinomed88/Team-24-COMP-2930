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
            // User is signed in.
            var email = user.email;
            var uid = user.uid;
            var providerData = user.providerData;
            user.getIdToken().then(function(accessToken) {
            var userDetails = {
                email: email,
                uid: uid,
                accessToken: accessToken,
                providerData: providerData
              }
            console.log(userDetails); 
            }, null, '  ');
            }
           else {
            // User is signed out.
            console.log('Signed out');
          }
        }, function(error) {
          console.log(error);
        });
      };

      window.addEventListener('load', function() {
        initApp()
      });

