'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
//angular.module('myApp.services', []).
 // value('version', '0.1');


angular.module( 'apiServices', ['ngResource']).
	factory('mapData', function ($resource, $rootScope)
	{
		
        //LIVE URL
        var BASE_URL = TCIAM_GLOBAL_BASE_URL + "admin/index.php/api/";

        // LOCAL URL
        //var BASE_URL = "http://localhost/fuelcmstest/api/";

		var self = this;


		var _getAllResource;
		var _getItemResource;
        var _selectedCountries = [ ];
        var _detailCountry = null;
        var _detailItem = null;

        self.mapDataEntries = null;
        self.newsItems = null;
        self.euData = {};


		self.initialize = function() {

			_getAllResource = $resource( BASE_URL + ':request/entries/format/json', {method:'GET', request: '@request', isArray:true}, {
				update:{method:'JSON'}
			});

			_getItemResource = $resource( BASE_URL + 'news/entry/id/:itemId/format/json', {method:'GET', itemId: '@itemId', isArray:false}, {
				query:{method:'GET'}
			});
		};


		self.getMapData = function( onCompleteCallback )
        {
            if (!onCompleteCallback) onCompleteCallback = function() {};

            if (self.mapDataEntries)
            {
                onCompleteCallback( self.mapDataEntries );
            }
            else
            {
			    _getAllResource.query( { request: 'content' }, function(response)
                {
                    self.mapDataEntries = [ ];

                    _.each( response, function(entry)
                    {
                        if ( entry.iso != "EU" )
                            self.mapDataEntries.push( entry );
                        else
                            self.euData = entry;
                    });

                    /*
                    _.each( self.euCodes, function(euCode)
                    {
                       var found = false;
                        _.each( self.mapDataEntries, function(existingEntry)
                        {
                            if ( existingEntry.iso == euCode )
                            {
                                existingEntry.isEU = true;
                                existingEntry.addEU = true;
                                found = true;
                            }
                        });

                        if (!found)
                        {
                            var ob = { };

                            for (var key in self.euData)
                            {
                                ob[key] = self.euData[key];
                            }

                            ob.name =self.getEUName(euCode) + ' (EU)';
                            ob.isEU = true;
                            ob.addEU = false;
                            ob.iso = euCode;
                            ob.effort = self.euData.effort;
                            ob.box_colour = self.euData.box_colour;


                            self.mapDataEntries.push( ob );
                        }
                    });
                    */



                    onCompleteCallback( self.mapDataEntries );
                });
            }
		}

        self.getCountryData = function( isoCode )
        {
            var result = null;

            if (isoCode == "EU")
                result = self.euData;

            _.each( self.mapDataEntries, function(item) {
               if (item.iso === isoCode)
                result = item;
            });

            return result;
        }

		self.getNewsItems = function( onCompleteCallback )
        {
            if (!onCompleteCallback) onCompleteCallback = function() {};

            if (self.newsItems)
            {
                onCompleteCallback( self.newsItems );
            }
            else
            {
                _getAllResource.query( { request: 'news' }, function(response) {
                    self.newsItems = response;
                    _.each( self.newsItems, function(item) {
                        var ds = String(item.date);
                        ds = ds.replace(/-/g, "/");
                        item.date = new Date(ds);
                    });
                    onCompleteCallback( self.newsItems );
                });
            }
		}

		self.getNewsItem = function( itemId ) 
		{
            _.each( self.newsItems, function(item) {
               if (item.id === itemId)
                return item;
            });

            return null;
		}

        self.selectCountry = function( countryId )
        {
            if (!_selectedCountries)
            {
                _selectedCountries = [ ];
            }

            if (_selectedCountries.length === 3)
            {
                self.unselectCountry( _selectedCountries.pop() );
            }

            _selectedCountries = _.union( [countryId], _selectedCountries );
        }


        self.selectCountryDetail = function( countryId, itemId )
        {
            _detailCountry = countryId;
            _detailItem = itemId;
        }


        self.deselectCountryDetail = function()
        {
            _detailCountry = null;
            _detailItem = null;
        }


       self.getSelectedCountryDetail = function()
       {
           if (_detailCountry)
           {
               return self.getCountryData( _detailCountry );
           }

           return null;
       }

       self.getSelectedDetailItem = function()
       {
           return _detailItem;
       }

        self.unselectCountry = function( countryId )
        {
            _selectedCountries = _.without( _selectedCountries, countryId );
            $rootScope.$broadcast( AppEvent.DESELECT_COUNTRY, countryId );
        }

        self.getSelectedCountries = function()
        {
            return _selectedCountries;
        }

        self.getSelectedCountryIds = function()
        {
            var str = "";
            _.each( _selectedCountries, function(c) {
               str += String( self.getCountryData(c).country_id ) + ",";
            });

            if (str.charAt(str.length-1) == ",")
            {
                str = str.substr( 0, str.length-1);
            }
            return str;
        }

        self.clearSelectedCountries = function()
        {
            _selectedCountries = [ ];
        }


        self.isEU = function( code )
        {
            if ( _.indexOf( self.euCodes, code) > -1 )
                return true;
            else
                return false;
        }


		/*
		return $resource('http://localhost/fuelcmstest/api/content/entries/format/json', {}, 
		{
			getMapData: {method: 'GET', params: {}, isArray:true }
		});
		*/
		





        self.getEUName = function( code )
        {
            for (var i = 0; i < self.euCodes.length; i++)
            {
                if (code == self.euCodes[i])
                    return self.euNames[i];
            }
            return "EU";
        }


        self.euCodes = ['AT','BE','BG','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE','GB'];
        self.euNames = [
            'Austria',
            'Belgium',
            'Bulgaria',
            'Cyprus',
            'Czech Republic',
            'Denmark',
            'Estonia',
            'Finland',
            'France',
            'Germany',
            'Greece',
            'Hungary',
            'Ireland',
            'Italy',
            'Latvia',
            'Lithuania',
            'Luxembourg',
            'Malta',
            'Netherlands',
            'Poland',
            'Portugal',
            'Romania',
            'Slovakia',
            'Slovenia',
            'Spain',
            'Sweden',
            'United Kingdom'];


        self.initialize();
        return self;


	});