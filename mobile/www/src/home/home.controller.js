angular.module('app').controller('HomeCtrl', function ($scope, $ionicScrollDelegate) {

  console.log('HomeCtrl');

  $scope.things = [];
  for (var index = 1; index < 9; index++) {
    $scope.things.push(
      { title: 'Reggae', id: index, description: 'Cowboy', img: 'http://lorempicsum.com/futurama/600/200/' + index }
      )
  }

});