angular.module("projects").component("projectsHome", {
  templateUrl: () =>
    window.projectsBaseDir + "components/projects-home.template.html",
  controller: [
    "$rootScope",
    "$scope",
    "layoutFactory",
    function($rootScope, $scope, layoutFactory) {
      console.log("root scope", $rootScope.singleSpaProps);
    //  $scope.layout = {};
    $scope.name = "World";
    $scope.change = function() {
      
      /*   const event = new CustomEvent("change-name", {
          detail: {
            name: $scope.name,
          },
          bubbles: true,
          cancelable: true,
          composed: true, // makes the event jump shadow DOM boundary
        });
        let source = e.target || e.srcElement;
        source.dispatchEvent(event); */
        $scope.$broadcast("change-name",{
          name: $scope.name,
        });
      };
    
      layoutFactory.getLayout(function(x) {
        $scope.layout = x;
        $scope.$digest();
      });

      System.import("@intermix/calendar").then((m) => {
        window.angularParcelConfig = m.angularParcelConfig;
        $rootScope.singleSpaProps.mountParcel(window.angularParcelConfig, {
          domElement: document.querySelector("#angular-parcel"),
        });
      });

      System.import("@intermix/widgets").then((m) => {
        console.log(m);
        var AddContactParcel = {
          bootstrap: m.bootstrap,
          mount: m.mount,
          unmount: m.unmount,
        }
       /*  window.svelteWidgetsConfig = m.default; */
         $rootScope.singleSpaProps.mountParcel(AddContactParcel, {
          domElement: document.querySelector("#widgets-parcel"),
          myname: $scope.name
        });  
      });
    },
  ],
});

angular.module("projects").factory("layoutFactory", [
  "$log",
  function($log) {
    $log.log("instantiating layout factory ...");
    var layoutService = {};

    layoutService.getLayout = function(cb) {
      System.import("@intermix/store").then((m) => {
        $log.log(m);
        var menu$ = m.getGlobalStore().getSubscription();
        menu$.subscribe(function(x) {
          $log.log(x);
        //  $scope.layout = x;
          //$scope.$digest();
          cb(x);
        });
      });
    };
    return layoutService;
  },
]);
