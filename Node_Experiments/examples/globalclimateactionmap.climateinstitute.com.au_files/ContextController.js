'use strict';

/* Controllers */

function ContextController($scope, $rootScope)
{
    if (!$rootScope.introPlaying)
        $("#main-content").css({"visibility":"visible"});


    $scope.$on( AppEvent.INTRO_COMPLETE, function(event, data) {
        $("#main-content").fadeIn();
    });

    $scope.init = function()
    {
        $rootScope.$broadcast( AppEvent.DESELECT_ALL_COUNTRIES );

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

    $scope.init();

}
ContextController.$inject = ['$scope', '$rootScope'];