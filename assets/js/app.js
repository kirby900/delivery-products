angular.module('app', [
    'ui.router', 
    'ncy-angular-breadcrumb', 
    'ProductDataService', 
    'ui.sortable', 
    'ngAnimate'
])
.value('user', {
  id: "",
  name: ""
});
