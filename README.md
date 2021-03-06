# UNVIZ Boilerplate #

## Introduction ##
* This is a template for making [UN](http://www.un.org/en/index.html)-style data visualization web app using [Qlik Sense Mashup API](https://help.qlik.com/sense/2.0/en-us/developer/#../Subsystems/Mashups/Content/mashups-introduction.htm%3FTocPath%3DBuilding%2520mashups%7C_____0) and [AngularJS]() framework.
* Version : 1.2
* Live Demo : [UN Budget](https://unite.un.org/sites/unite.un.org/files/app-budget-v-2-2/index.html#/)

## Setting Up ##
### Requirement ###
* Local server
     * If you're building a mashup from external Qlik Sense server, you can put this repository on your local server. Use [BabyWebServer (Windows)](http://www.pablosoftwaresolutions.com/html/baby_web_server.html) or [MAMP (MAC)](https://www.mamp.info/en/) when testing the website on your local desktop, because other ways, such as SimpleHTTPServer, cannot have your website connect to the qlik server.
     * Else, if you're building mashup on your Qlik Sense Desktop, put this repository on C://Users/Documents/Qlik/Extensions/ folder.
* Browser that supports HTML5 (Chrome, Firefox, IE 10 and above).
* Optional : [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) installed on your machine 
### Getting Started ###
If you have git installed on your machine, clone this repository and put on your local server using by running this command on your terminal / command prompt :
```
git clone https://bitbucket.org/oictviz/unviz-boilerplate.git

```
Otherwise, just manually download this repository using download button on left panel.
### Configuration ###
Calling Qlik stylesheets and scripts on index.html file :
```
#!html
<!-- Vendor : Qlik -->
<!-- Qlik Desktop : delete the <servername>:<port> -->
<link rel="stylesheet" href="<hostname>:<port>/resources/autogenerated/qlik-styles.css">
<script src="<servername>:<port>/resources/assets/external/requirejs/require.js"></script>
```
Define base URL for [requireJS](http://requirejs.org/) to get Qlik Sense module and extensions on js/viz.js : 

```
#!javascript
/* Connect to a Qlik Server */
/* Qlik Desktop : use the commented address  */
var config = {
  host: "<hostname>", // window.location.hostname,
  prefix: "/",
  port: "<port>", // window.location.port,
  isSecure: true // window.location.protocol === "https:"
};

require.config({
  baseUrl:
		(config.isSecure ? "https://" : "http://")
		+ config.host
		+ (config.port ? ":" + config.port : "")
		+ config.prefix + "resources"
});

```
Open a web socket to Qlik Sense Engine by calling the app :
```
#!javascript
function getQlikApp() {
  return qlik.openApp("<appID>", config) //change the first param to app ID
}
```

## Using this Template ##
### Folder Directory Guidelines ###
This template's directory is goes as follows :
```
#!
root/
-- css/
-- img/
---- logos/
-- js/
-- lib/
-- part/
---- home.html
---- section1.html
---- section2.html
---- 404.html
-- tpl/
---- header.html
---- footer.html
-- index.html
-- favicon.ico

```
The **lib/** folder should contain all the resources you will not edit (e.g bootstrap, font-awesome). If you want to create additional stylesheet and scripts, put them on **css/** and **js/** files. When building multi-tabs web app like [UN Budget](), but the sections as a separate .html file on **part/** folder. The **tpl/** or template folder should contain the footer and header only. Put the big images like the main banner on **img/** folder, and logos on **img/logos/**.

### Changing Main Image ###
Put the image on the **img/** folder, and change the image URL on .parallax class in css/main.css :
```
#!css
.parallax {
  .....
  background-image: url("../img/UNGA.jpg"); <!-- change this URL -->
  .....
}
```
### Adding New Tabs ###
The tabs are handled using angular-router module. If your new tab has Qlik objects on it, you have to define new controller for every page. Otherwise, you can just use PageCtrl controller. 
Add the section on part/header.html :
```
#!html
  <div class="container">
    <section class="region region-header">
      <div id="block-superfish-1" class="block block-superfish">
        <ul id="superfish-1" class="menu sf-menu sf-main-menu sf-navbar sf-style-space sf-total-items-6 sf-parent-items-6 sf-single-items-0 superfish-processed sf-js-enabled sf-shadow">
               <li role="presentation"><a href="#" aria-controls="home" role="tab" data-toggle="tab">Home</a></li>
               <li role="presentation"><a href="#section1" aria-controls="indicator" role="tab" data-toggle="tab">2014-2015 Biennium</a></li>
               <li role="presentation"><a href="#section2" aria-controls="country" role="tab" data-toggle="tab">2012-2013 Biennium</a></li>
        </ul>
      </div>
    </section>
  </div>
```
Edit the configuration for webApp module on js/viz.js:
```
#!javascript
/** ROUTES **/
webApp.config(function($routeProvider) {
  $routeProvider
  .when("/", {templateUrl: "part/home.html",controller: "PageCtrl"}) //home controller
  .when("/section1", {templateUrl: "part/section1.html",controller: "S1Ctrl"}) //section 1 controller
  .when("/section2", {templateUrl: "part/section2.html",controller: "S2Ctrl"}) //section 2 controller
  .when("/newSection", {templateUrl: "part/newSection.html",controller: "NewCtrl"}) //new section controller
  // else 404
  .otherwise({templateUrl: "part/404.html",controller: "PageCtrl"});
  });
```
Create new controller : 
```
#!javascript
webApp.controller("NewCtrl", ['$scope', '$location', function($scope, $location) {
  if (!qlikApp) {
     qlikApp = getQlikApp();
  }
  // Your code goes here ....
}]);
```

### Version Tracking ###

* 1.0 : Intial template with UN-Look and Feel
* 1.1 : Social media sharing, Clear selection
* 1.2 : Current selection, [loading animation](https://www.tjvantoll.com/2013/04/24/showing-a-css-based-loading-animation-while-your-site-loads/), new configuration, README, browser rejector
 

### To-Do ###

* Writing tests
* Code review
* Other guidelines

### Contact ###

* Created by Kania Azrina (azrina@un.org)
* Maintained by Yilin Wei