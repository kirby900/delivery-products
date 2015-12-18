angular.module('app')
.controller('HomeController', [
  '$state',
  function($state){
    console.log('State ' + $state.current.name);
  }
]);
