'use strict';

function ReportsController( $scope, $rootScope, mapDataService )
{

    var self = this;
    $scope.selectedCriteria = "none";
    $scope.selectedCountry = 'none';
    $scope.customData = "";


    self.onMapDataLoaded = function( results )
    {
        $scope.results = results;


        $scope.$apply();
    }



    $scope.init = function()
    {

    }



    $scope.changeCriteria = function(event)
    {
        $('input:radio[id="actionFocus"]').attr('checked', 'checked');
    }

    $scope.changeCountry = function(event)
    {
        $('input:radio[id="countryFocus"]').attr('checked', 'checked');
    }

    $scope.changeCustom = function(event)
    {
        $scope.customData = mapDataService.getSelectedCountryIds();
    }

    $scope.init();
    mapDataService.getMapData( self.onMapDataLoaded );

}

ReportsController.$inject = [ '$scope', '$rootScope', 'mapData' ];