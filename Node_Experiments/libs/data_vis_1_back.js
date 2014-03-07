// JavaScript Document
    
$( document ).ready(function(){
	
	
	var width = 1260,
		height = 700;

//toggle hide the new tooltip
	
	var popup_new = $('.tooltip')
		popup_new.toggle()
	
	var popup_enhanced = $('.popup-enhanced')
		popup_enhanced.hide();

//load hidden popup

	
	//could check dataset for oldest date, but not necessary now.
	var pad = d3.format("05d")
	var valById = d3.map();
	
	//scales for various data
	var quantize = d3.scale.quantize()  //set domain based on dataset, colors have to cme from somewhere.  
	
	//  not using this right now.  using quantize with data from valById hash map.  

	var fill = d3.scale.log()
		.domain([0, .4])
		.range(["blue", "orange"]);
		
	//in config file.  set these domains and colors.  load as arrays. 
		
	//load domain ranges	
	
	var getColors = d3.scale.threshold()
	
		//in config file.  set these domains and colors.  load as arrays.  
			
	var projection = d3.geo.albersUsa()              //default but call it out anyway.  Also gives us more granular control.
					.translate([width/2, height/2])  //centered
					.scale([width]);					//default size is 1000px
					
	var path = d3.geo.path().projection(projection);
	
	var zoom = d3.behavior.zoom()
		.translate(projection.translate())
		.scale(projection.scale())
		.scaleExtent([2 * height, 8 * height])  //sets zoom min and max
		.on("zoom", zoommove);

	var svg = d3.select(".map-container").append("svg")
		.attr("width", width)
		.attr("height", height)
		//.attr("class", "Oranges")   //color brewer
		.attr("fill", "#fff")
		.attr("z-index",10000);

	var counties = svg.append("g")
			.attr("class", "counties")
			.call(zoom)   //have to call zoom before adding paths, etc.   
		
		counties.append("rect")  //I can't remember why I did this.   Don't this it is necessary
			.attr("class", "background")
			.attr("width", width)
			.attr("height", height);
					
	var states = svg.append("g")  //putting states paths in separate container.    
				.attr("class", "states")  //may have to move this to function below.  
				.call(zoom);    //may need a second zoom function but don't see why  
			
	var stateLabels = svg.append("g")
				.attr("class","stateLabels")
				.call(zoom);
			
	var chloro_filtered_year;
	var chloro_filtered_fips;
	var chloro_data;			//all data for chloro maps
	var chloro_data_subset;		//selected data subset only.  
	var usMapData;
	var fips_lookup;


	var  max_yr;
	var  min_yr;
	var active_domain = [];
	var active_color_range = [];
	var  yr_array = [];
	var yr;						// default year.  use first year in dataset.  t
	var dataset_names = [];   //default dataset.  use first dataset in collection.  reset below
	var dataset_selected;
	
	queue()
		.defer(d3.tsv,"data/data_action_config.tsv")
		.defer(d3.json, "data/us-10m.json")
		.defer(d3.tsv, "data/chloro_time_series.tsv")  
		.defer(d3.tsv, "data/fips_lookup.tsv")  //set scale or quantize range colors.
		.defer(d3.json, "data/us_state_centroids.json")   //Data has FIPS and Geo Data so matching not necessary here. 
		.await(ready);
	
	function ready(error, configData, mapData, chloro_time_data,fips_lk,stateCentroids) {  //test passing second data object and accessing the rate value from that... experiment.  
////  CONFIGURATION AND DEFAULT VARIABLE SETTINGS.     ///


/////  	DATASET SELECTION 	//////
		//dataset_names = ["unemp","reschange","tempchange"];   //loop thorough data config csv and build array  add _tip for tip
		
		dataset_selected = configData[0]["dataset_name"];
		
		for (var i = 0; i < configData.length; i++) {  //build year array
				
				dataset_names.push(configData[i]["dataset_name"])
				if (configData[i] == dataset_selected) {
					
					$("#select_dataset").append("<option value = '" + dataset_names[i] + "' selected>" + dataset_names[i] + "</option>") 
					}
					
				else {
					
					$("#select_dataset").append("<option value = '" + dataset_names[i] + "'>" + dataset_names[i] + "</option>") 
					
					}
				}
		

/////  	DATASET SELECTION 	//////

////  THIS WHOLE SECTION NEED TO BE RESET WHENEVER A NEW DATASET IS SELECTED.  


		
////  DATE RANGE   ////
			
		var configRow = configData.filter(function (row) {  //row is a passed variable based on requested dataset.  
				
				return  row["dataset_name"] == dataset_selected;  
			
			})


		min_yr = configRow[0]["min_yr"];
		max_yr = configRow[0]["max_yr"];
		
		yr = max_yr;   //selected year.  Use most recent year (max) as default.  // need to add a 

		
		for (var i = min_yr; i <= max_yr; i++) {  //build year array
			
			yr_array.push(i)
			if (i == yr) {
				
				$("#select_year").append("<option class = 'select_year_value" + i + "' value = '" + i + "' selected>" + i + "</option>") 
				}
			else {
				
				$("#select_year").append("<option id = 'select_year_value" + i + "' value = '" + i + "'>" + i + "</option>") 
				
				}
			}
		
		
		$( "#slider" ).slider({
			  value:yr,  //these values need to come from the data..
			  min: min_yr,
			  max: max_yr,
			  step: 1,
			  slide: function( event, ui ) {  //slider event
				yr = ui.value;
				$( "#year" ).val(ui.value );  //create function to repopulate and select selected year in drop down.  move above to functions.  
				rebindChloroDate(yr)   ///pass year to rebind chloro
			  }
		});
		
		$( "#year" ).val($( "#slider" ).slider( "value" ) );
		
		///    slider labels
		
		$( "#slider-label-left" ).html(min_yr)
		$( "#slider-label-right" ).html(max_yr)
	
		///   slider labels
			
/////   DATE RANGE   ///////

//  DOMAIN, RANGE COLORS   ////  Plan to implement a configurable choice in external file like Blues, Green, Etc.  and make a table of values... for ease of use.  

//only for this .  should more often do a dynamic scale based on data.  Still like the color control.  Can implement dynamic ones as ncessary.  
	domain_row = d3.csv.parseRows(configRow[0]["domain"])  

	for (var i = 0; i < domain_row[0].length; i++) {
		
			active_domain.push(+ domain_row[0][i])
		
		}
	
	
	range_row = d3.csv.parseRows(configRow[0]["range"])
	
	for (var i = 0; i < range_row[0].length; i++) {
		
			active_color_range.push(d3.requote(range_row[0][i]))
		
		}
	
	//build legend  
	
	//for (var i = 0; i < range_row[0].length; i++) {  //clean up, add a column to config table.  
	for (var i = range_row[0].length; i > 0 ; i--) { 	
		// <div class="colour-legend-box" id= "legend-box-1" style="background: #065682"></div>

		$("#colour-legend").append("<div class='colour-legend-box' id= 'legend-box-'" + i + " style='background:" + range_row[0][i - 1] + "' ></div>")
		//$("#colour-legend-text").append("<p>Strong Effort</p>")  //this will come out of text file.    or from threshold scale test as array.  
		
		}
	
	
	getColors                				//threshold scale.  If using quantize, I can do dynamically.  
		.domain(active_domain)
		.range(active_color_range);
		
		
		
		
////  DOMAIN, RANGE COLORS   //// 		
		

////  START WORKING WITH THE DATA.  Build the map.      //////


		chloro_data = chloro_time_data;   //FULL DATA SET 
		usMapData = mapData;
		fips_lookup = fips_lk;
		
		chloro_filtered_year = filterData(chloro_data,'year',yr);   //psi function 
	
		loadDataMap(chloro_filtered_year);  //psi function 
			
		counties
			.selectAll(".countypath")
			.data(topojson.object(usMapData, usMapData.objects.counties).geometries)
			.enter().append("path")
			.attr("class", "countypath")
			//.attr("class", function(d) { return quantize(valById.get(d.id)); })

			.attr("d", path)
			.attr("id", function (d) {return d.id})  //each county given a css id == to its fips number. 
			.style("fill", function(d) { return getColors(valById.get(d.id)); })  //threshold usage.  //change function name, not unemployment specific.  
			.on("mouseover", mouseoverCounty) 
			.on("mousemove", mousemoveCounty)
			.on("mouseout", mouseoutCounty)
			.on("click", mouseclickCounty)
			
	//states outline
	
	  states
		  .selectAll("path")  //datum used when applying mesh on top. I have used an individual paths for each state.   
		  .data(topojson.object(usMapData, usMapData.objects.states).geometries)
		  .enter().append("path")
		  .attr("d",path)
		 
		
		stateLabels  //could be a proble, not subject to projection.  difficult so scale.  Saw that on HW OpenLayers
			.selectAll("text")  //new labels 
			.data(stateCentroids.features)  //links centroid to ID.  not a map or a merge of data. 
			.enter().append('text')
			.attr("class", "stateLabel")
			.attr('dx', function (d) {return projection ([d.geometry.coordinates[0],d.geometry.coordinates[1]]) [0] - 20;})
			.attr('dy', function (d) {return projection ([d.geometry.coordinates[0],d.geometry.coordinates[1]]) [1];})
			.text(function (d) {return d.properties.name})
			
		
	};
	
/////  MAP RESIZING   /////

	function zoommove() {
			
		//console.log(d3.event.translate)
		//console.log(d3.event.scale)
		  projection.translate(d3.event.translate).scale(d3.event.scale);
		  counties.selectAll("path").attr("d", path);
		  states.selectAll("path").attr("d", path);  
		  stateLabels.selectAll("text")
			.attr('dx', function (d) {return projection ([d.geometry.coordinates[0],d.geometry.coordinates[1]]) [0] - 20;})
			.attr('dy', function (d) {return projection ([d.geometry.coordinates[0],d.geometry.coordinates[1]]) [1];})
	}
	  
/////  MAP RESIZING   /////

	function mouseoverCounty(d){
				
		
		//lookup info like county name , etc from FIPS CODE.  
		
		fips_data = fips_lookup.filter(function(n) {
			
			 return d.id == n.id;  //n is fips code, passed in call.  
			 
			});  
			
		//retreives row from filered cholor dataset.  which are already filtered for year. 
		chloro_filtered_fips = chloro_filtered_year.filter (function (n) {
		
			return d.id == n.id;   //fips ID 

			});
	
		testvar = "name";
		
		strHtml = "<p>FIPS: " + d.id + "<br> Supplemental FIPS Data: " + fips_data[0]["other_data"];
		strHtml = strHtml + "<br><br> Year: " + yr + "<br><br>" +  dataset_selected + " = " + Math.round((100 * chloro_filtered_fips[0][dataset_selected]) * 100) / 100 + "%";  //do math on this //need to make this generic based on requested dataset from chloro data.  col names should be labels.  
		strHtml = strHtml + "<br><br> Supplemental Info: " + chloro_filtered_fips[0]["unemp_tip"]  //do this with variables based on selected dataset.
		strHtml = strHtml + "<br>Click " + "<img src='images/digdeeper.png' class='icondeeper'>" + "to Dig Deeper</a></p>"

		
			
		$('.ttbodycontainer')
					.css('height','0px')
					.css('opacity', 0)
					
		$('.ttheader').html(fips_data[0].name + " County");
		
		$(".ttdeeper").attr("id",d.id);
		
	//try callback with toggle.  	
		popup_new
			.css("left",(d3.event.pageX ) + 30 + 'px')
			.css("top", (d3.event.pageY) + 30 + 'px')
			.toggle(0, '',function(){
				
				var popupbody = $(".ttbodycontainer")
			
				
				strHtml = strHtml + "<img src='images/camper.png' class='popup_icon'><img src='images/fire.png' class='popup_icon'><img src='images/deer.png' class='popup_icon'>"
				
				popupbody.delay(200);
				popupbody.html(strHtml)
				popupbody.animate({height : '300px', opacity: 1},400);
				//could I dynamically add the listener here?
				});
			
		
		}
		
	function mouseoutCounty(d) {
		
			popup_new.hide();
			
		}

	function mousemoveCounty(d) {
				
			popup_new	
				.css("left",(d3.event.pageX ) + 30 + 'px')
				.css("top", (d3.event.pageY) + 30 + 'px')
		}
		
	function mouseclickCounty(d) {
		
		popup_new.toggle(500)
		popup_enhanced.toggle(500)
		
		//$("#slider-container").css("opacity","0");  //don't forget to set opacity back 
		$("#slider-container").toggle(200);
		$("#map-controls ul").toggle(500);
		
/*		
		//animate new objects in....   Need some data and to build the graphs.  Do in separate file then migrate.  
			popup_2.selectAll('#graphContainer1').append("svg") 
				.attr("width", 300)
				.attr("height", 300)
				.append("circle")
					.attr("cx", 150) 
					.attr("cy", 150)
					.attr("r", 50) 
					.attr("opacity", 1)
					.attr("fill", "red")	
		
			popup_2  
				//.style("width", width + "px")  //use percentages.... ///
				//.style("height", height + 30 + "px")
				.style("width", "500px")  //use percentages.... ///
				.style("height", "500px")
				.style("left", width/2)
				.style("top", height/2)  
				.transition()
				.duration(2000)
				.style("opacity", .9)
				.attr("id",$(this).attr("id")); //FIPS.  Use to build everything.  
				
			//d3.select("#graphContainer1").selectAll("svg").remove()
			//d3.select(
			
			createScatter();
			//move everything to function, called from here.  
*/
		
    }
		
		
	//////   FUNCTIONS   ///////
	
	function filterData(dataSet,rowName,value) {
		//this will allow us to filter on any parameter in the csv file.   Yeah.  We can then load 
			var dataSetFiltered;
			
			dataSetFiltered = dataSet.filter(function (row) {  //row is a passed variable based on requested dataset.  
				
				return  row[rowName] == value;  
			
			})
		return dataSetFiltered;
		}
			
		
	function loadDataMap(dataSet) {  
	//why is this map necessary
		
			for (var i = 0; i < dataSet.length; i++) {
			//"unemp"
				valById.set(dataSet[i].id, +dataSet[i][dataset_selected]);  //**** FUCKING AWESOME.  NOW I CAN HANDLE EVERYTHING WITH STRINGS  **  
	
			}
		}

	function rebindChloroDate(selected_year) {
	// this may change to dataset year, or name change to rebindChloroData
		chloro_filtered_year = filterData(chloro_data,'year',selected_year);
		loadDataMap(chloro_filtered_year)
		//set active domain and colors
		
		active_domain = [2, 4, 6, 8, 10, 15, 20, 25, 40];
		active_color_range = ["rgb(147,151,155)", "rgb(122,135,147)", "rgb(198,119,139)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)","rgb(33,113,181)","rgb(8,81,156)","rgb(8,48,107)"];
		getColors
			.domain(active_domain)
			.range(active_color_range);
		
		//change background and other colors if necessary
		
		counties
			.selectAll(".countypath")
			.data(topojson.object(usMapData, usMapData.objects.counties).geometries)
			.transition()
			.duration(2000)
			.style("fill", function(d) { (valById.get(d.id)); return getColors(valById.get(d.id)); })  //threshold usage.  
			//.attr("class", function(d) { return quantize(valById.get(d.id)); })


		}
		
		
		
////   FUNCTIONS    /////
		
////   NAVIGATION  LISTENERS  ////
	
	$('.navbutton').click(function() {
	
		var $this = $(this);
		// hide panels
		$('.content-panel').hide();  
  
        //remove active class from navbuttons
		$('.navbutton.active').removeClass('active'); 
		// add active state to new tab

		//highlight and expand new nav button
		
		//expand size of div, to show summary informaiton.  
		$this.addClass('active').blur();
		
		// retrieve ic from link (is id of panel to display
		var panel = $this.attr('title');
		// show panel
		$(panel).fadeIn(950);
		// don't follow link down page
		return(false);
	}); // end click


	//trigger nav default
	
	$('#navbutton4').click();
	
	//trigger nav default
	
////	NAVIGATION  LISTENERS   /////


////UI EVENT LISTENERS   /////
	
	
	
	$("#select_year").change(function () {
		
		yr = $(this).val();
		rebindChloroDate(yr)
		
		//console.log ("Year Changed To " + $("#select_year").val()); 
		
		});
	
	
	$("#select_dataset").change(function () {
		
		dataset_selected = $(this).val();
		rebindChloroDate(yr)
		
		//console.log ("Dataset Changed To " + $("#select_dataset").val()); 
		
		});
		
		
	
	$("#map_zoom_in").click(function () {
		
			//console.log("button pressed")
			//zoommove()
		
		/*
		d3.select
		projection.translate(d3.event.translate).scale(d3.event.scale);
		counties.selectAll("path").attr("d", path);
		states.selectAll("path").attr("d", path);  
		stateLabels.selectAll("text")
			.attr('dx', function (d) {return projection ([d.geometry.coordinates[0],d.geometry.coordinates[1]]) [0] - 20;})
			.attr('dy', function (d) {return projection ([d.geometry.coordinates[0],d.geometry.coordinates[1]]) [1];})
		*/
		//console.log ("Dataset Changed To " + $("#select_dataset").val()); 
		
		//var zm = d3.behavior.zoom().x(x).y(y).scaleExtent([1, 8]).on("zoom", zoom);
		//var svg = d3.select()...call(zm);
/*		
		function zoomIn() {
		   zm.scale(zm.scale()*2);
		   // probably need to compute a new translation also
			}
			
		function reset() {
		   zm.scale(1);
		   zm.translate([0,0]);
			}
*/
		});
});