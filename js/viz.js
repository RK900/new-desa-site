/**
 * Unite Analytics Viz Template
 * @author Kania Azrina | azrina@un.org
 **/

/* Required for Qlik Sense integration with angular-based mashup */
define("client.services/grid-service", {});

/* Connect to a Qlik Server */
var config = {
            host: 'viz.unite.un.org', // viz.unite.un.org for development server,
            prefix: "/visualization/",
            port: "", // window.location.port,
            isSecure: true // window.location.protocol === "https:"
        };

require.config({
  baseUrl:
		(config.isSecure ? "https://" : "http://")
		+ config.host
		+ (config.port ? ":" + config.port : "")
		+ config.prefix + "resources"
});

require(["js/qlik"], function(qlik) {
  var qlikApp; //qlik App

  function getQlikApp() {
    return qlik.openApp("a44b4694-b1eb-4f4a-bf7d-a49330867a9f", config) //app ID on Qlik server
  }

	/** MODULES **/
  var webApp = angular.module("webApp", ['ngRoute']);

	/** ROUTES **/
  webApp.config(function($routeProvider) {
    $routeProvider
			.when("/", {templateUrl: "part/home.html",controller: "PageCtrl"}) //section 1 controller
			.when("/section1", {templateUrl: "part/section1.html",controller: "S1Ctrl"}) //section 1 controller
      .when("/section2", {templateUrl: "part/section2.html",controller: "S2Ctrl"}) //section 2 controller
    	// else 404
			.otherwise({templateUrl: "part/404.html",controller: "PageCtrl"});
  });

	/** CONTROLLERS **/
  webApp.controller("PageCtrl", function() {
    if (!qlikApp) {
      qlikApp = getQlikApp();
    }

    //KPIS
    qlikApp.bookmark.apply('WuWwKY'); //2014-2015
    qlikApp.getObject('fBiennium0', 'UVeVm');
    qlikApp.getObject('kBudget0', 'EUvSM');
    qlikApp.getObject('kPosts0', 'UNFDQa');


  });

  webApp.controller("S1Ctrl", ['$scope', '$location', function($scope, $location) {
    if (!qlikApp) {
      qlikApp = getQlikApp();
    }
		//bookmark
    qlikApp.bookmark.apply('WuWwKY'); //2014-2015
		//selection bar
    qlikApp.getObject('CurrentSelections1', 'CurrentSelections');
    //filters
    qlikApp.getObject('fPostbyCat1', 'ApPYh');
    qlikApp.getObject('fPostbyLevel1', 'sxmjUL');
    qlikApp.getObject('fBudgetPart1', 'JGXfpK');
    qlikApp.getObject('fBudgetSection1', 'ewpUUH');
    qlikApp.getObject('fBiennium1', 'UVeVm');
    //charts
    qlikApp.getObject('cPostsByCat1', 'CUXUMS');
    qlikApp.getObject('cPostsByLevel1', 'SYRpSMn');
    qlikApp.getObject('cBudgetPart1', 'VeEgePJ');
    qlikApp.getObject('cBudgetSection1', 'DshA');
    //KPIS
    qlikApp.getObject('kPosts1', 'UNFDQa');
    qlikApp.getObject('kBudget1', 'EUvSM');
    //table
    qlikApp.getObject('tAll1', 'ayLnAC');

    //clear selections -- reapply bookmark
    $("#clearS1-1").click(function() {
      qlikApp.bookmark.apply('WuWwKY'); //2014-2015
    });
    $("#clearS1-2").click(function() {
      qlikApp.bookmark.apply('WuWwKY'); //2014-2015
    });
    $("#clearS1-3").click(function() {
      qlikApp.bookmark.apply('WuWwKY'); //2014-2015
    });

  }]);

  webApp.controller("S2Ctrl", ['$scope', '$location', function($scope, $location) {
    if (!qlikApp) {
      qlikApp = getQlikApp();
    }
		//bookmark
    qlikApp.bookmark.apply('jNTNeCQ'); //2012-2012
		//selection bar
    qlikApp.getObject('CurrentSelections2', 'CurrentSelections');
    //filters
    qlikApp.getObject('fPostbyCat2', 'ApPYh');
    qlikApp.getObject('fPostbyLevel2', 'sxmjUL');
    qlikApp.getObject('fBudgetPart2', 'JGXfpK');
    qlikApp.getObject('fBudgetSection2', 'ewpUUH');
    qlikApp.getObject('fBiennium2', 'UVeVm');
    //charts
    qlikApp.getObject('cPostsByCat2', 'CUXUMS');
    qlikApp.getObject('cPostsByLevel2', 'SYRpSMn');
    qlikApp.getObject('cBudgetPart2', 'VeEgePJ');
    qlikApp.getObject('cBudgetSection2', 'DshA');
    //KPIS
    qlikApp.getObject('kPosts2', 'UNFDQa');
    qlikApp.getObject('kBudget2', 'EUvSM');
    qlikApp.getObject('tAll2', 'ayLnAC');

    //clear selections -- reapply bookmark
    $("#clearS2-1").click(function() {
      qlikApp.bookmark.apply('jNTNeCQ'); //2012-2012
    });
    $("#clearS2-2").click(function() {
      qlikApp.bookmark.apply('jNTNeCQ'); //2012-2012
    });
    $("#clearS2-3").click(function() {
      qlikApp.bookmark.apply('jNTNeCQ'); //2012-2012
    });
  }]);

	/** Bootstraping angular app for app, must be done before Qlik Sense API is used **/
  angular.bootstrap(document.documentElement, ["webApp", "qlik-angular"]);
  qlik.setOnError(function(error) {
    $("#errmsg").html(error.message).parent().show();
  });

});
