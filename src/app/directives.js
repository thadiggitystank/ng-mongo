﻿(function(ngMongo) {

    ngMongo.directive("deleteButton", function () {
        return {
            //default is attribute
            restrict: "E",
            //replace the html content
            replace: true,
            //NOTE: this is not the scope itself! It is a definition object that tells the injected scope what to do.
            scope: {
                // tell angular to peel text attribute value and set a variable named 'text' on the scope
                text: "@",
                // & tells angular to delegate whatever the setting is to the parent scope
                action: "&",
            },
            // notice we are setting the ng-click to action, which is a delegate that is inherited from the parent scope.
            // this allows us to decouple our directive from our controller. 
            template: "<button class='btn btn-danger' ng-click='action()'><span class='glyphicon glyphicon-remove'></span> {{text}}</button>"
        }
    });

    ngMongo.directive("addButton", function () {
        return {
            restrict: "E",
            scope: {
                text: "@",
                action: "&"
            },
            template: "<button class='btn btn-success' ng-click='action()'> {{text}}</button>"
        }
    });

    //the scope is shared with the parent controller so the bindings still work
    ngMongo.directive("breadcrumbs", function($routeParams) {
        return {
            restrict: "E",
            templateUrl: "views/breadcrumb.html",
            controller: function ($scope) {
                var rootUrl = "#/";
                $scope.crumbs = [ { url: rootUrl, text: "Databases" } ];
                var runningUrl = rootUrl;
                for (var param in $routeParams) {
                    runningUrl += $routeParams[param] + "/";
                    $scope.crumbs.push({ url: runningUrl, text: $routeParams[param] });
                }

            }
        }
    });

}(angular.module("ngMongo")));