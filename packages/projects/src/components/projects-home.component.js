angular
.module('projects')
.component('projectsHome', {
  templateUrl: () => window.projectsBaseDir + 'components/projects-home.template.html',
  controller: ['$rootScope', function ($rootScope) {
    console.log('root scope', $rootScope.singleSpaProps)
  }]
})