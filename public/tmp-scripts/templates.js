angular.module("app").run(["$templateCache", function($templateCache) {$templateCache.put("accessdenied/templates/index.html","<div class=\"test\">\r\nACCESS DENIED\r\n</div>");
$templateCache.put("home/templates/index.html","<div class=\"test\">\r\n{{test}}<br/>\r\nf d sdfgsdfg sdfgsd fgfsd gdg sdg\r\n</div>");
$templateCache.put("home/templates/test.html","xxdcxdfcfvd");
$templateCache.put("login/templates/index.html","<div class=\"row\">\r\n    <div class=\"medium-3 columns\"><h1>Login to the system</h1></div>\r\n    <div class=\"medium-2 columns\"><i>{{date | date:\'yyyy-MM-dd\'}}</i></div>\r\n</div>\r\n\r\n<form ng-submit=\"submit()\" ng-controller=\"LoginController\">\r\n    <div class=\"row\">\r\n        <div class=\"medium-6 columns\"><label for=\"username\">Username:</label></div>\r\n        <div class=\"medium-6 columns\"><input id=\"username\" placeholder=\"username\"/></div>\r\n    </div>\r\n\r\n    <div class=\"row\">\r\n        <div class=\"medium-6 columns\"><label for=\"username\">Password:</label></div>\r\n        <div class=\"medium-6 columns\"><input id=\"password\" type=\"password\" placeholder=\"password\"/></div>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div class=\"medium-3 columns\"><button type=\"submit\">Login</button></div>\r\n    </div>\r\n</form>\r\n\r\n");}]);