// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('app', ['ionic', 'ngCordova'])

  .run(function ($ionicPlatform, $cordovaKeyboard, $state) {
    $ionicPlatform.ready(function () {      
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs).
      // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
      // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
      // useful especially with forms, though we would prefer giving the user a little more room
      // to interact with the app.
      /*
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      */

      if (ionic.Platform.isWebView()) {
        $cordovaKeyboard.hideAccessoryBar(true);
        $cordovaKeyboard.disableScroll(true);
      }
      if (ionic.Platform.isAndroid()) {
        ionic.Platform.isFullScreen = true;
      }


      if (window.StatusBar) {
        // Set the statusbar to use the default style, tweak this to
        // remove the status bar on iOS or change it to use white instead of dark colors.
        StatusBar.styleDefault();
      }

      var div = document.getElementById("map_canvas");
      var map = plugin.google.maps.Map.getMap(div);
      map.setOptions({
        //center: new plugin.google.maps.LatLng(50, 2),
        zoom: 4,
        //mapTypeId: plugin.google.maps.MapTypeId.ROADMAP, // HYBRID, ROADMAP, SATELLITE, TERRAIN
        scrollwheel: false
      });
    })

  })
  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {
    
    // disable ionic scroll for native scroll
    $ionicConfigProvider.scrolling.jsScrolling(true);
    
    // disable ionic tansition animation 
    $ionicConfigProvider.views.transition('none');
    
    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    $urlRouterProvider.otherwise('/');
    
    //    $httpProvider.defaults.withCredentials = true;
    //    $httpProvider.defaults.useXDomain = true;
    //    delete $httpProvider.defaults.headers.common['X-Requested-With'];

  });
