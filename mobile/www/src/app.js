// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('app', ['ionic', 'ngCordova', 'lodash', 'classie'])

  .run(function ($ionicPlatform, $cordovaKeyboard, $cordovaDevice, $state) {
    $ionicPlatform.ready(function () {      
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs).
      // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
      // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
      // useful especially with forms, though we would prefer giving the user a little more room
      // to interact with the app.
      
      if (ionic.Platform.isWebView()) {
        // $cordovaKeyboard
        $cordovaKeyboard.hideAccessoryBar(true);
        $cordovaKeyboard.disableScroll(true);

        // $cordovaDevice
        var device = $cordovaDevice.getDevice();
        var cordova = $cordovaDevice.getCordova();
        var model = $cordovaDevice.getModel();
        var platform = $cordovaDevice.getPlatform();
        var uuid = $cordovaDevice.getUUID();
        var version = $cordovaDevice.getVersion();
        console.log(device, cordova, model, platform, uuid, version);

      }
      if (ionic.Platform.isAndroid()) {
        ionic.Platform.isFullScreen = true;
      }

      if (window.StatusBar) {
        // Set the statusbar to use the default style, tweak this to
        // remove the status bar on iOS or change it to use white instead of dark colors.
        StatusBar.styleDefault();
      }

    })

  })
  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {
    // disable ionic scroll for native scroll
    //$ionicConfigProvider.scrolling.jsScrolling(true);
    
    // disable ionic tansition animation 
    //$ionicConfigProvider.views.transition('none');
    
    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    $urlRouterProvider.otherwise('/app/tab/home');
    
    // $http defaults options
    //    $httpProvider.defaults.withCredentials = true;
    //    $httpProvider.defaults.useXDomain = true;
    //    delete $httpProvider.defaults.headers.common['X-Requested-With'];

  });
