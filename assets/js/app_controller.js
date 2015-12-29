angular.module('app')
.controller('appController', ['$scope', function($scope){
  console.log('Entered appController');

  $scope.links = [
    { label: 'Home', url: '#/home' },
    { label: 'Products', url: '#/products/list' },
    { label: 'Parameters', url: '#/parameters/list' }
  ];

  $scope.indicatorToText = function(ind){
    return ind == "Y" ? 'Yes' : 'No';
  };
}])
.run(function(user){
  // TODO: fetch real user identity
  user.id = 'ip2150';
  user.name = 'Dean Holbrook';
});
