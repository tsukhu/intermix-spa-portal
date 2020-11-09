System.register([], function(_export, _context) {
  window.projectsBaseDir = _context.meta.url.slice(0, _context.meta.url.lastIndexOf('/') + 1);

  return {
    execute() {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = projectsBaseDir + 'projects.css'
      document.head.appendChild(link)

      angular.module('projects').config(['$sceDelegateProvider', function ($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
          'self',
          window.projectsBaseDir + '**',
        ]);
      }])

      const angularjsLifecycles = singleSpaAngularjs.default({
        angular: window.angular,
        mainAngularModule: 'projects',
        uiRouter: true,
        preserveGlobal: true,
        template: '<projects />'
      });

      _export(angularjsLifecycles);
    }
  }
})