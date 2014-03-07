'use strict';

/* Controllers */

function ActionsController($scope, $routeParams, $rootScope, mapDataService)
{

    $scope.detailBody = "";
    $("#main-content").css({"visibility":"visible"});

    var newsDataLoaded = function( results )
    {
        $scope.newsItems = [];

        var items = [ ];

        _.each( results, function(item) {
            items.push( item );
        });

        items.sort( function(a,b) {
            a = new Date(a.date);
            b = new Date(b.date);
            return a < b ? 1 : a > b ? -1 : 0;
        });

        _.each( items, function(item) {

            if ( ($routeParams.itemId && item.id === $routeParams.itemId) || !$routeParams.itemId )
            {
                $scope.newsItems.push(item);
                if ($routeParams.itemId)
                {
                    $scope.detailBody = item.body;
                    $scope.detailBody = $scope.detailBody.replace( /\n/g, "<br/>" );
                    $scope.detailBody = $scope.detailBody.replace(/\\n/g, "<br/>");

                }
            }
        });
    }

    $scope.$on( AppEvent.INTRO_COMPLETE, function(event, data) {
        $("#main-content").fadeIn();
    });

    $scope.init = function()
    {
        $("#main-content").hide();

        if (!$rootScope.introPlaying)
            $("#main-content").fadeIn();


        // Highlight the active menu item

        $("#menu a").removeClass("nav-active");

        if ( window.location.href.indexOf( '/context') > -1) {
            $(".nav-context").addClass("nav-active");
        } else
        if ( window.location.href.indexOf( '/criteria') > -1) {
            $(".nav-criteria").addClass("nav-active");
        } else
        if ( window.location.href.indexOf( '/methodology') > -1) {
            $(".nav-methodology").addClass("nav-active");
        } else
        if ( window.location.href.indexOf( '/actions') > -1) {
            $(".nav-actions").addClass("nav-active");
        }
    };


    mapDataService.getNewsItems( newsDataLoaded );

    $scope.init();


}
ActionsController.$inject = ['$scope', '$routeParams', '$rootScope', 'mapData'];