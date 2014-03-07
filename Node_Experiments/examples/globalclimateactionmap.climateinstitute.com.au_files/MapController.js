'use strict';

/* MapController */

function MapController($scope, $route, $rootScope, $location, mapDataService)
{

    var LAT_RANDOM = 15;
    var LON_RANDOM = 15;
    var self = this;

    self.map = null;
    self.countryData = [];
    self.countryCodes = [];
    self.markers = [];
    self.colourData = { };
    self.rolloverIcons = [];

    $scope.mapVisible = true;

    $scope.$watch(function() { return $location.url() }, function(){
        return false;
    });


    $scope.$on( AppEvent.INTRO_COMPLETE, function( event, data) {
        $scope.mapVisible = true;
        $("#menu").css({"visibility" : "visible" });

        $("#map-container").css({"visibility" : "visible" });
        $("#map-container").animate( { "opacity":1 }, 1000, function () {
        });

        $scope.$apply();
    });


    $scope.$on( AppEvent.DESELECT_COUNTRY, function( event, code ) {
        self.map.deselectRegion(code);
    });

    $scope.$on( AppEvent.DESELECT_ALL_COUNTRIES, function( event ) {
        _.each( mapDataService.getSelectedCountries(), function(id) {
           self.map.deselectRegion(id, true);
           mapDataService.unselectCountry(id);
        });
    });


    var mapDataLoaded = function( results )
    {
        self.countryData = results;

        for (var i = 0; i < results.length; i++)
        {
            self.countryCodes[i] = results[i].iso;

            self.colourData[ results[i].iso ] = parseInt(results[i].effort);

            // Create a bunch of random markers for each active country
            /*
            for (var k = 0; k < 10; k++)
            {
                self.markers.push(
                    { latLng: [
                        parseFloat(results[i].lat) + (Math.random() * LAT_RANDOM) - (LAT_RANDOM*0.5),
                        parseFloat(results[i].lon) + (Math.random() * LON_RANDOM) - (LON_RANDOM*0.5) ],
                        iso: results[i].iso,
                        name: results[i].name }
                );
            }
            */
        }



        $scope.init();
        _.each( self.rolloverIcons, function(icon) {
           $(icon).addClass("actionoffset1");
        });
    }



    var hasCountryData = function( code )
    {
        return $.inArray( code, self.countryCodes ) != -1;
    }


    var countryOverHandler = function( event, code )
    {
        _.each( self.rolloverIcons, function(icon) {
            $(icon).addClass("actionoffset1");
            $(icon).css({"opacity":"0"});
        });
        var countryMarkers = [ ];

        if (!hasCountryData( code ))
        {
            event.preventDefault();
            return false;
        }

        var countryData = mapDataService.getCountryData( code );
        var boxColour = countryData.box_colour;
        if (!boxColour || boxColour === "")
        {
            boxColour = "#FF0000";
        }

        var rgn = self.map.getRegionElement( code );

        rgn.style.hover["stroke-width"] = 1;
        rgn.style.hover.stroke = boxColour;
        rgn.updateStyle();


        //countryMarkers = self.map.getMarkersWithISO( code );

        $(".jvectormap-label").stop(true);
        $("#maplabel-base").stop(true);

        if (countryData.isEU && !countryData.addEU)
            $(".maplabel-text").text( mapDataService.getCountryData(code).name.toUpperCase() );
        else
            $(".maplabel-text").text( mapDataService.getCountryData(code).name.toUpperCase() );

        $("#maplabel-head").css( { "border-top-color": boxColour,
                                    "border-bottom-color": boxColour,
                                    "border-left-color": boxColour,
                                    "border-right-color": boxColour });

        $("#maplabel-base").css( { "height":"0px", "background":boxColour } );

        $(".jvectormap-label").css( { "opacity":"0" } );

        $(".jvectormap-label").animate({"opacity":"1"}, 200, function() {
            $("#maplabel-base").animate( { "height" : "70px" }, 150 );
        });


        _.each( self.rolloverIcons, function(icon) {
          $(icon).removeClass( "actionoffset1 actionoffset2 actionoffset3 actionoffset4 actionoffset5 actionoffset6" );
          $(icon).stop(true);
          $(icon).clearQueue();
        });

        var euData = mapDataService.getCountryData("EU");

        /*
        if (countryData.isEU && !countryData.addEU)
        {
            $(self.rolloverIcons[0]).addClass( String("actionoffset" + euData.emission_target_action) );
            $(self.rolloverIcons[1]).addClass( String("actionoffset" + euData.energy_target_action) );
            $(self.rolloverIcons[2]).addClass( String("actionoffset" + euData.carbon_price_action) );
            $(self.rolloverIcons[3]).addClass( String("actionoffset" + euData.emission_standard_action) );
            $(self.rolloverIcons[4]).addClass( String("actionoffset" + euData.energy_efficiency_action) );
            $(self.rolloverIcons[5]).addClass( String("actionoffset" + euData.farming_emissions_action) );
        }
         else
        */
         if (!countryData.isEU || countryData.addEU)
        {
            $(self.rolloverIcons[0]).addClass( String("actionoffset" + countryData.emission_target_action) );
            $(self.rolloverIcons[1]).addClass( String("actionoffset" + countryData.energy_target_action) );
            $(self.rolloverIcons[2]).addClass( String("actionoffset" + countryData.carbon_price_action) );
            $(self.rolloverIcons[3]).addClass( String("actionoffset" + countryData.emission_standard_action) );
            $(self.rolloverIcons[4]).addClass( String("actionoffset" + countryData.energy_efficiency_action) );
            $(self.rolloverIcons[5]).addClass( String("actionoffset" + countryData.farming_emissions_action) );


            if (countryData.addEU)
            {
                showEuPopup( code, boxColour );
            }
        }




        _.each( self.rolloverIcons, function(icon) {
            if (!$(icon).hasClass("actionoffset1"))
            {
                $(icon).delay(250).animate( { "opacity":"1"});
            }
        });
    };


    var showEuPopup = function( code, boxColour )
    {
        return;

        var euData = mapDataService.getCountryData("EU");
        boxColour = euData.box_colour;


        $(".jvectormap-label-eu").addClass('shown');
        $(".jvectormap-label-eu").css({"visibility":"visible"})
        $(".jvectormap-label-eu").stop(true);
        $("#maplabel-base-eu").stop(true);

        $(".maplabel-text-eu").text( mapDataService.getCountryData("EU").name.toUpperCase() );

        $("#maplabel-head-eu").css( { "border-top-color": boxColour,
            "border-bottom-color": boxColour,
            "border-left-color": boxColour,
            "border-right-color": boxColour });
        $("#maplabel-base-eu").css( { "height":"0px", "background": boxColour } );
        $(".jvectormap-label-eu").css( { "opacity":"0" } );
        $(".jvectormap-label-eu").animate({"opacity":"1"}, 200, function() {
            $("#maplabel-base-eu").animate( { "height" : "70px" }, 150 );
        });

        $(self.rolloverIcons[6]).addClass( String("actionoffset" + euData.emission_target_action) );
        $(self.rolloverIcons[7]).addClass( String("actionoffset" + euData.energy_target_action) );
        $(self.rolloverIcons[8]).addClass( String("actionoffset" + euData.carbon_price_action) );
        $(self.rolloverIcons[9]).addClass( String("actionoffset" + euData.emission_standard_action) );
        $(self.rolloverIcons[10]).addClass( String("actionoffset" + euData.energy_efficiency_action) );
        $(self.rolloverIcons[11]).addClass( String("actionoffset" + euData.farming_emissions_action) );
    }


    var hideEuPopup = function()
    {
        $(".jvectormap-label-eu").removeClass('shown');
        $(".jvectormap-label-eu").css({"visibility":"hidden"})
    }


    var countryOutHandler = function( event, code )
    {
        hideEuPopup();
        _.each( self.rolloverIcons, function(icon) {
            // $(icon).css( { "opacity" : "0" } );
            $(icon).addClass( "actionoffset1 ");
        });
        /*
        _.each( self.rolloverIcons, function(icon) {
            //$(icon).css( { "opacity":"0"} );
            //$(icon).addClass("actionoffset1");
        });
        */
    }

    var markerOverHandler = function( event, code )
    {
        event.preventDefault();
        return false;
    };

    var beforeLabelShow = function( event, label, code )
    {
        if (!hasCountryData( code ))
        {
            event.preventDefault();
            return false;
        }
    }

    var countryClick = function( event, code )
    {
        if (!hasCountryData( code ))
        {
            event.preventDefault();
            return false;
        }
    }

    var countrySelected = function( event, code, isSelected, selectedRegions )
    {
        mapDataService.deselectCountryDetail();

        if (isSelected)
        {
            var countryData = mapDataService.getCountryData( code );
            var boxColour = countryData.box_colour;
            var rgn = self.map.getRegionElement( code );
            rgn.style.selected["stroke-width"] = 2;
            rgn.style.selected.stroke = boxColour;
            rgn.updateStyle();
            mapDataService.selectCountry( code );
        }
        else
            mapDataService.unselectCountry( code );


       // $(event.currentTarget).css( { "fill":"#FF0000" } );

        $location.path("/map");
        $scope.$apply();
        $rootScope.$broadcast( AppEvent.MAP_UPDATE );
        event.preventDefault();
        return false;
    }

    $scope.init = function()
    {
        $("#map").css( { "opacity" : 0 });

        $('#map').vectorMap(
            { map: 'world_mill_en',
                series:
                {
                    regions: [{
                        values: self.colourData,
                        //scaleColors: ['#C8EEFF', '#0071A4'],
                        normalizeFunction: 'polynomial'
                    }]
                },
                regionStyle: {
                    initial: {
                        fill: '#ffffff'
                    }
                },
                regionsSelectable: true,
                markersSelectable: false,
                onRegionLabelShow: beforeLabelShow,
                onRegionSelected: countrySelected,
                onRegionOver: countryOverHandler,
                onRegionOut: countryOutHandler,
                onMarkerOver: markerOverHandler,
                onMarkerLabelShow: beforeLabelShow,
                onRegionClick: countryClick,
                hoverOpacity: 0.7,
                backgroundColor: '#383f47',
                markerStyle: {
                    initial: {
                        "pointer-events": "none",
                        fill: '#FF0000'
                        //384553
                    }
                },
                //markers: self.markers
            });

        $("#map").animate( { opacity: 1 }, 1000 );
        self.map = $('#map').vectorMap('get', 'mapObject');

        // Store references for the rollover icons

        self.rolloverIcons = [ ];
        self.rolloverIcons[0] = $(".jvectormap-label div.icon1");
        self.rolloverIcons[1] = $(".jvectormap-label div.icon2");
        self.rolloverIcons[2] = $(".jvectormap-label div.icon3");
        self.rolloverIcons[3] = $(".jvectormap-label div.icon4");
        self.rolloverIcons[4] = $(".jvectormap-label div.icon5");
        self.rolloverIcons[5] = $(".jvectormap-label div.icon6");

        /*
        self.rolloverIcons[6] = $(".jvectormap-label-eu div.icon1");
        self.rolloverIcons[7] = $(".jvectormap-label-eu div.icon2");
        self.rolloverIcons[8] = $(".jvectormap-label-eu div.icon3");
        self.rolloverIcons[9] = $(".jvectormap-label-eu div.icon4");
        self.rolloverIcons[10] = $(".jvectormap-label-eu div.icon5");
        self.rolloverIcons[11] = $(".jvectormap-label-eu div.icon6");
         */
        _.each( self.rolloverIcons, function(icon) {
           // $(icon).css( { "opacity" : "0" } );
            $(icon).addClass( "actionoffset1 ");
        });
    };



    mapDataService.getMapData( mapDataLoaded );

}
MapController.$inject = ['$scope', '$route', '$rootScope', '$location', 'mapData'];