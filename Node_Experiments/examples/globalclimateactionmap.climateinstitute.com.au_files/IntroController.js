'use strict';

/* Controllers */

function IntroController($scope, $rootScope, $timeout)
{
    var self = this;

    var TEXT_1 = "A little less conversation";
    var TEXT_2 = "A little more action";

   // var TEXT_1 = "1";
   // var TEXT_2 = "2";

    self.container = $('#intro-anim');
    self.plusitems = [];
    self.headerContainer = $('#header-anim');
    self.headerPlusItems = [ ];


    $rootScope.introPlaying = true;
    $scope.introText = "";
    $scope.created = false;

    $scope.characters1 = TEXT_1.split("");
    $scope.characters2 = TEXT_2.split("");

    $scope.init = function()
    {
        // Create the top and bottom borders
        var top = $("<div class='intro-border-panel-top'></div>");
        var bottom = $("<div class='intro-border-panel-bottom'></div>");

        //$(".intro-text").css( { opacity:1 } );
        $("#content-borders").append(top);
        $("#content-borders").append(bottom);

        $(".intro-border-panel-top").animate( { "left" : "0%" }, 1000, function() {

            $(".intro-text").css( { "padding-left":"65px"} );
            animStep();
            //animStep2();
        });


        $(".intro-border-panel-bottom").animate( { "left" : "0%" }, 1000, function() {
            //$(".intro-text").css( { "opacity" : 1 });
        });
    };


    $scope.skipIntro = function()
    {

        $scope.introText = "";
        $(".intro-text").remove();

        headerAnimation();

        $(".title-main").animate( { "padding-top" : "20px" }, function() {
            $("#menu").animate( { "padding-top" : "36px" }, function() {
                $rootScope.$broadcast( AppEvent.INTRO_COMPLETE );
                $rootScope.introPlaying = false;
                $("#main-content").css({"visibility":"visible", "opacity":"0"});
                $("#main-content").animate( { "opacity" : "1"}, 1000 );
                $("#button-menu").css({"visibility":"visible", "opacity":"0"});
                $("#button-menu").animate( { "opacity" : "1"}, 1000 );
            } );
        });

        //$rootScope.$broadcast( AppEvent.INTRO_COMPLETE );
        //$rootScope.introPlaying = false;
    }

    var animateTitle = function()
    {
    }


    var animStep = function()
    {

        /*
        $scope.introText = "A little less conversation";
        $scope.$apply();

        $(".intro-text").css({"padding-top":"270px"});

        $(".intro-text").animate( {
            "padding-top" : "250px",
            "opacity" : 1 },
            1500 ).delay( 1000 ).animate( {
                "opacity": 0,
                "padding-top": "230px" }, 1500, function() {
                    animStep3();
            });

        */

        $scope.skipIntro();
        return false;

        if ($scope.characters1.length)
        {
            $scope.introText += $scope.characters1.shift();
            $timeout( animStep, 50 );
        }
        else
        {
            $(".intro-text").animate( { opacity:0 }, 1500, function() {
                $scope.introText = "";
                $scope.$apply();
                $(".intro-text").css( { opacity:1 } );
                $(".intro-text").css( { "padding-left":"150px"} );
                animStepNext();
            });

        }

    }

    var animStepNext = function()
    {
        if ($scope.characters2.length)
        {
            $scope.introText += $scope.characters2.shift();
            $timeout( animStepNext, 50 );
        }
        else
        {
            animStep3();
            /*
            $(".title-main").animate( { "padding-top" : "20px" }, function() {

                $("#menu").animate( { "padding-top" : "50px" }, function() {
                    $rootScope.$broadcast( AppEvent.INTRO_COMPLETE );
                } );
            });

            $(".intro-text").animate( { "margin-top" : "-300px" } );
            */
        }
    }





    var animStep3 = function()
    {
        //$(".intro-text").css({"padding-top":"270px"});
        //$scope.introText = "A little more action";
        //var txt = "<span>A</span><span class='intro-text-remove'> little more a</span><span>ction</span>";
        var txt = "A<span class='intro-text-remove'> little more a</span>ction";
        $(".intro-text").html( txt );

        $scope.$apply();

        animStep4();
        /*
        $(".intro-text").animate( {
                "padding-top" : "250px",
                "opacity" : 1 },
            1500, animStep4)
            */
    };

    var animStep4 = function()
    {
        $(".intro-text-remove").delay(500).animate( {
            opacity : 0
        }, 1000, function() {
           // Slide to the left

            //$(".intro-text-remove").css({"position":"absolute"});

            //$(".intro-text-remove").animate( { "width" : "0px" }, 500, function() {
           //$(".intro-text-remove").animate( { "left" : "-300px" }, 500, function() {
               //$(".intro-text-remove").remove();
           $(".intro-text-remove").toggle("slide", function() {

               $(".intro-text").animate( { "padding-left":"0px" }, 500, function() {
                   $(".title-main").animate( { "padding-top" : "20px" }, function() {
                       $("#menu").animate( { "padding-top" : "36px" }, function() {
                           $rootScope.$broadcast( AppEvent.INTRO_COMPLETE );
                           $rootScope.introPlaying = false;
                           $("#main-content").css({"visibility":"visible", "opacity":"0"});
                           $("#main-content").animate( { "opacity" : "1"}, 1000 );
                           $("#button-menu").css({"visibility":"visible", "opacity":"0"});
                           $("#button-menu").animate( { "opacity" : "1"}, 1000 );
                       } );
                   });

                   $(".intro-text").animate( { "margin-top" : "-300px" }, function() {
                       headerAnimation();
                   } );
               } );
           });

        });
    }






    var animStep2 = function()
    {
        for (var i = 0; i < 100; i++)
        {
            var xpos = parseInt(Math.random() * 800);
            var ypos = parseInt(Math.random() * 130);

            if (parseInt(Math.random() * 2) == 1)
            {
                ypos += 300;
            }

            self.plusitems.push( $('<div>+</div>').addClass('intro-anim-plus').text('+').appendTo( self.container ).css({"left":xpos}).css({"top":ypos}) );
        }

        var dl = 3000;
        $.each( self.plusitems, function() {
            dl = parseInt(Math.random() * 1000);
            $(this).animate({"opacity":0}, dl*2).animate( { "opacity":1}, 200 );
        });
        //$('.intro-anim-plus').animate({}, 200).delay(Math.random() * 3).animate( { "opacity":1} );
    }



    var headerAnimation = function()
    {
        for (var i = 0; i < 60; i++)
        {
            var xpos = 240 + (parseInt(Math.random() * 680));
            var ypos = parseInt(Math.random() * 80);

            self.headerPlusItems.push( $('<div>+</div>').addClass('intro-anim-plus').text('+').appendTo( self.headerContainer ).css({"left":xpos}).css({"top":ypos}) );
        }

        var dl = 3000;
        $.each( self.headerPlusItems, function() {
            dl = parseInt(Math.random() * 1000);
            $(this).animate({"opacity":0}, dl*2).animate( { "opacity":1}, 200 );
        });
    }

    $scope.init();

}
IntroController.$inject = ['$scope', '$rootScope', '$timeout'];