'use strict';

/* Controllers */

function MainController($scope, $rootScope, $location, $routeParams, mapDataService)
{
    var countries = [];
    $scope.countries = [];

    $scope.detailTitle = "Snapshot";
    $scope.detailRowTitle = "Overview";
    $scope.detailRowContent = "Snapshot text will go here.";


    self.applyCountryDetail = function()
    {
        if (mapDataService.getSelectedCountryDetail())
        {
            $scope.selectedCountry = mapDataService.getSelectedCountryDetail();

            if (mapDataService.getSelectedDetailItem())
            {
                $scope.detailTitle = "Focus"
                switch( mapDataService.getSelectedDetailItem() )
                {
                    case "emission-target":
                        $scope.detailRowTitle = "Emissions Target";
                        $scope.detailRowContent = $scope.selectedCountry.emission_target_long;
                        break;
                    case "energy-target":
                        $scope.detailRowTitle = "Renewable Energy Target";
                        $scope.detailRowContent = $scope.selectedCountry.energy_target_long;
                        break;
                    case "carbon-price":
                        $scope.detailRowTitle = "Carbon Price";
                        $scope.detailRowContent = $scope.selectedCountry.carbon_price_long;
                        break;
                    case "emission-standard":
                        $scope.detailRowTitle = "Emissions Standard";
                        $scope.detailRowContent = $scope.selectedCountry.emission_standard_long;
                        break;
                    case "energy-efficiency":
                        $scope.detailRowTitle = "Energy Efficiency";
                        $scope.detailRowContent = $scope.selectedCountry.energy_efficiency_long;
                        break;
                    case "farming-emissions":
                        $scope.detailRowTitle = "Forest + Farming Emissions";
                        $scope.detailRowContent = $scope.selectedCountry.farming_emissions_long;
                        break;
                }
            }
        }
        else
        {
            $scope.selectedCountry = null;
        }
    }


    self.applyCountryDetail();


    $scope.$on(AppEvent.MAP_UPDATE, function(event, data)
    {
        mapDataService.deselectCountryDetail();
        self.applyCountryDetail();
        $scope.refreshUI();
        $(".spotlight-detail-title").css( { "color":"#99FFFF" } );
        $(".spotlight-detail-body").css( { "color":"#a7a9ab" } );

    });

    $scope.init = function()
    {
        $("#menu a").removeClass("nav-active");
    };

    $scope.refreshUI = function()
    {
        if (!$rootScope.introPlaying)
            $("#main-content").css({"visibility":"visible"});

        countries = mapDataService.getSelectedCountries();
        $scope.countries = [];

        _.each( countries, function(country) {
            $scope.countries.push( mapDataService.getCountryData( country ));
        });

        $(".spotlight-detail-title").css( { "color":"#99FFFF" } );
        $(".spotlight-detail-body").css( { "color":"#a7a9ab" } );

        $scope.$apply();
    }




    ////////////////////////////////////////////////////////////////////////
    // Mouse events for spotlight title/first item
    //
    $scope.spotlightFirstItemOver = function($event)
    {
        $($event.currentTarget).addClass( "spotlight-item-remove");
    }

    $scope.spotlightFirstItemOut = function($event)
    {
        $($event.currentTarget).removeClass( "spotlight-item-remove");
    }

    $scope.spotlightFirstItemClick = function($event)
    {
        $rootScope.$broadcast( AppEvent.DESELECT_COUNTRY, $($event.currentTarget).attr('data') );
        mapDataService.deselectCountryDetail();
        self.applyCountryDetail();
    }



    ////////////////////////////////////////////////////////////////////////
    // Mouse events for spotlight detail items
    //

    $scope.spotlightItemOver = function($event)
    {
       $scope.highlightColour = mapDataService.getCountryData( $($event.currentTarget).attr("data") ).box_colour;

       $($event.currentTarget).addClass( "spotlight-detail-item-over");
        $($event.currentTarget).find(".spotlight-detail-title").css( { "color":$scope.highlightColour } );
        $($event.currentTarget).find(".spotlight-detail-body").css( { "color":$scope.highlightColour } );
    }

    $scope.spotlightItemOut = function($event)
    {
        $($event.currentTarget).removeClass( "spotlight-detail-item-over");
        $($event.currentTarget).find(".spotlight-detail-title").css( { "color":'#99FFFF' } );
        $($event.currentTarget).find(".spotlight-detail-body").css( { "color":'#a7a9ab' } );
    }

    $scope.spotlightItemClick = function($event)
    {
        //$location.path("/map/" + $($event.currentTarget).attr('data') + "/" + $($event.currentTarget).attr('id'));
        mapDataService.selectCountryDetail( $($event.currentTarget).attr('data'), $($event.currentTarget).attr('id') );
        self.applyCountryDetail();
    }

    ////////////////////////////////////////////////////////////////////////






    $scope.$on("$viewContentLoaded", $scope.refreshUI );

    $scope.init();

}
MainController.$inject = ['$scope', '$rootScope', '$location', '$routeParams', 'mapData'];