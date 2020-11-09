angular
.module('projects')
.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false,
  });

  $stateProvider.state({
    name: 'projects-home',
    url: '/projects',
    template: '<projects-home></projects-home>'
  })
}])