// JavaScript Document
    
$( document ).ready(function(){
	
	
	var width = 1260,
		height = 700;

	var loading_gif = $("#loading_gif")

//toggle hide the new tooltip
	
	var popup_new = $('.tooltip')
		popup_new.toggle()
	
	var popup_enhanced = $('.popup-enhanced')
		popup_enhanced.hide();

	var valById = d3.map();  //d3 map loaded for currently selected dataset maps fips to chloro data.
			
	//load domain ranges	
	
	var getColors = d3.scale.threshold()  //configured based on config file.    
			
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
				
	var states = svg.append("g")  //putting states paths in separate container.    
				.attr("class", "states")  //may have to move this to function below.  
				.call(zoom);    //may need a second zoom function but don't see why  
			
	var stateLabels = svg.append("g")
				.attr("class","stateLabels")
				.call(zoom);
				
//declare common variables.	

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
	var GconfigData;
	
//queue files  	
	queue()
		.defer(d3.tsv,"data/data_action_config.tsv")
		.defer(d3.json, "data/us-10m.json")
		.defer(d3.tsv, "data/chloro_time_series.tsv")  
		.defer(d3.tsv, "data/fips_lookup.tsv")  //set scale or quantize range colors.
		.defer(d3.json, "data/us_state_centroids.json")   //Data has FIPS and Geo Data so matching not necessary here. 
		.await(ready);
	
	function ready(error, configData, mapData, chloro_time_data,fips_lk,stateCentroids) { 



		//take first dataset in config file and set as default
		GconfigData = configData;
		
		dataset_selected = configData[0]["dataset_name"];  
		
		//load dropdown dataset selector with dataset names from config file.  
		
		for (var i = 0; i < configData.length; i++) {  //build year array for dropdown dataset selector
				
				dataset_names.push(configData[i]["dataset_name"])
				if (configData[i] == dataset_selected) {
					
					$("#select_dataset").append("<option value = '" + dataset_names[i] + "' selected>" + dataset_names[i] + "</option>") 
					}
					
				else {
					
					$("#select_dataset").append("<option value = '" + dataset_names[i] + "'>" + dataset_names[i] + "</option>") 
					
					}
				}
				
//load config file row for selected datset and pass to datasetConfig function to set date ranges, data domain and color ranges.  

		var configRow = configData.filter(function (row) {  //row is a passed variable based on requested dataset.  
				
				return  row["dataset_name"] == dataset_selected;  
			
			})
		
		datasetConfig(configRow)
		
		
////  START WORKING WITH THE DATA.  Build the map.      //////

		chloro_data = chloro_time_data;   //FULL DATA SET 
		usMapData = mapData;
		fips_lookup = fips_lk;  //county name lookup for FIPS codes.  
		
		chloro_filtered_year = filterData(chloro_data,'year',yr);    //filters 
	
		loadDataMap(chloro_filtered_year);  //creates valById map with fips::dataset_selected, already filtered for year.  
		console.log(counties)
		counties
			.selectAll(".countypath")
			.data(topojson.object(usMapData, usMapData.objects.counties).geometries)
			.enter().append("path")
			.attr("class", "countypath")
			//.attr("class", function(d) { return quantize(valById.get(d.id)); })

			.attr("d", path)
			.attr("id", function (d) {return d.id})  //each county given a css id == to its fips number. 
			.style("fill", function(d) { return getColors(valById.get(d.id)); })  //threshold scale variable.    
			.on("mouseover", mouseoverCounty) 
			.on("mousemove", mousemoveCounty)
			.on("mouseout", mouseoutCounty)
			.on("click", mouseclickCounty)
	
	  states
		  .selectAll("path")  //datum used when applying mesh on top. I have used an individual paths for each state so I can add behaviors to them later.   
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
			
			
			//hide loader.  show "Big Wrapper"
			
			loading_gif.hide();
			$(".bigwrapper").animate({opacity:1},2000);
			
			
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
	  
	function zoommove_manual() {
			
		//console.log(d3.event.translate)
		//console.log(d3.event.scale)
		svg.
		  projection.translate(100).scale(4);
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
		
		strHtml = "<p>FIPS: " + d.id + "<br> Supplemental FIPS Data: " + fips_data[0]["other_data"];
		strHtml = strHtml + "<br><br> Year: " + yr + "<br><br>" +  dataset_selected + " = " + Math.round((100 * chloro_filtered_fips[0][dataset_selected]) * 100) / 100;  //do math on this //need to make this generic based on requested dataset from chloro data.  col names should be labels.  
		strHtml = strHtml + "<br><br> Supplemental Info: " + chloro_filtered_fips[0][dataset_selected + "_tip"]  //do this with variables based on selected dataset.
		strHtml = strHtml + "<br>Click " + "<img src='images/digdeeper.png' class='icondeeper'>" + "to Dig Deeper</a></p>"
	
		$('.ttbodycontainer')
					.css('height','0px')
					.css('opacity', 0)
					
		$('.ttheader').html(fips_data[0].name + " County");
		
		$(".ttdeeper").attr("id",d.id);
			
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

var margin = {top: 0, right: 40, bottom: 30, left: 60},
    pu_width = 950 - margin.left - margin.right,
    pu_height = 650 - margin.top - margin.bottom;

			
var parseDate = d3.time.format("%Y%m%d").parse;

var x = d3.time.scale()
    .range([0, pu_width]);

var y = d3.scale.linear()
    .range([pu_height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .interpolate("basis")
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.temperature); });

var popup_left_frame = d3.select('.popup-enhanced-left-frame').append("svg")
    .attr("width", pu_width + margin.left + margin.right)
    .attr("height", pu_height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data/data.tsv", function(error, data) {
  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

  data.forEach(function(d) {
    d.date = parseDate(d.date);
  });

  var cities = color.domain().map(function(name) {
    return {
      name: name,
      values: data.map(function(d) {
        return {date: d.date, temperature: +d[name]};
      })
    };
  });

  x.domain(d3.extent(data, function(d) { return d.date; }));

  y.domain([
    d3.min(cities, function(c) { return d3.min(c.values, function(v) { return v.temperature; }); }),
    d3.max(cities, function(c) { return d3.max(c.values, function(v) { return v.temperature; }); })
  ]);

  popup_left_frame.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + pu_height + ")")
      .call(xAxis);

  popup_left_frame.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Temperature (ºF)");

  var city = popup_left_frame.selectAll(".city")
      .data(cities)
    .enter().append("g")
      .attr("class", "city");

  city.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .style("stroke", function(d) { return color(d.name); });

  city.append("text")
      .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
      .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")"; })
      .attr("x", -30)
      .attr("dy", ".35em")
      .text(function(d) { return d.name; });
});	
		
			popup_new.toggle(500)
			popup_enhanced.toggle(500)	
			//$("#slider-container").css("opacity","0");  //don't forget to set opacity back 
			$("#slider-container").toggle(200);
			$("#map-controls ul").toggle(500);
				
		
    }
		
		
	//////   FUNCTIONS   ///////
	
	function filterData(dataSet,rowName,value) {
		//this will allow us to filter on any parameter in the csv file.   Yeah.  We can then load 
		console.log(dataSet)
		console.log(rowName)
		console.log(value)
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

		//dataset_selected does not change so just reload for year.  Domain does not change.  
		chloro_filtered_year = filterData(chloro_data,'year',selected_year);
		loadDataMap(chloro_filtered_year)
		counties
			.selectAll(".countypath")
			.data(topojson.object(usMapData, usMapData.objects.counties).geometries)
			.transition()
			.duration(2000)
			.style("fill", function(d) { (valById.get(d.id)); return getColors(valById.get(d.id)); })  //threshold usage.  
			//.attr("class", function(d) { return quantize(valById.get(d.id)); })


		}
		
	function rebindChloroDataset(selected_dataset) {

		//dataset_selected does not change so just reload for year.  Domain does not change.  
		//execute datasetConfig function for dates, domains and ranges.    
		
		console.log(GconfigData)
		
		configRow = GconfigData.filter(function (row) {  //row is a passed variable based on requested dataset.  
				
				return  row["dataset_name"] == dataset_selected;  
			
			})
			
		datasetConfig(configRow)
		//year defaults back to max year in dataset config file.  
		chloro_filtered_year = filterData(chloro_data,'year',yr);  //year is not changing
		
		loadDataMap(chloro_filtered_year)  //relaod data map based on dataset.  using globally set dataset_selected var 
		
		counties
			.selectAll(".countypath")
			.data(topojson.object(usMapData, usMapData.objects.counties).geometries)
			.transition()
			.duration(1000)
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
		rebindChloroDataset(dataset_selected)  //redundant because setting global dataset_selected variable anyway.  
		
		//console.log ("Dataset Changed To " + $("#select_dataset").val()); 
		
		});

		
		
	function datasetConfig (datarow) {
			
			
		min_yr = datarow[0]["min_yr"];
		max_yr = datarow[0]["max_yr"];
		
		yr = max_yr;   //selected year.  Use most recent year (max) as default.  // need to add a 

		//
		$(".select_year_option").remove()
		for (var i = min_yr; i <= max_yr; i++) {  //build year array
			
			yr_array.push(i)
			if (i == yr) {
				
				$("#select_year").append("<option class = 'select_year_option' id = 'select_year_value" + i + "' value = '" + i + "' selected>" + i + "</option>") 
				}
			else {
				
				$("#select_year").append("<option class = 'select_year_option' id = 'select_year_value" + i + "' value = '" + i + "'>" + i + "</option>") 
				
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
	domain_row = d3.csv.parseRows(datarow[0]["domain"])  
	active_domain.length = 0;
	for (var i = 0; i < domain_row[0].length; i++) {
		
			active_domain.push(+ domain_row[0][i])
		
		}
	
	
	range_row = d3.csv.parseRows(datarow[0]["range"])
	active_color_range.length = 0;
	for (var i = 0; i < range_row[0].length; i++) {
		
			active_color_range.push(d3.requote(range_row[0][i]))
		
		}
	
	//build legend  
	
	//for (var i = 0; i < range_row[0].length; i++) {  //clean up, add a column to config table.
	
	$(".colour-legend-box").remove()  
	for (var i = range_row[0].length; i > 0 ; i--) { 	
		// <div class="colour-legend-box" id= "legend-box-1" style="background: #065682"></div>

		//$("#colour-legend").append("<div class='colour-legend-box' id= 'legend-box-'" + i + " style='background:" + range_row[0][i - 1] + "' ></div>")
		d3.select("#colour-legend")
			.append("div")
			.attr("class","colour-legend-box")
			.style("background",range_row[0][i - 1])
		}
	
	d3.selectAll(".colour-legend-box")  ///add fade in transition for whole page.  
			.transition()
			.duration(500)
			.style("opacity", "1")

	
	d3.selectAll(".content-panel-header h1")
			.transition()
			.duration(2000)
			.style("color", range_row[0][5]) 
			.style("opacity", 1)
	
	d3.select("#main-title")
			.transition()
			.duration(2000)
			.style("color", range_row[0][5]) 
			.style("opacity", 1)
	
		
	console.log(active_domain)
	console.log(active_color_range)
	
	getColors                				//threshold scale.  If using quantize, I can do dynamically.  
		.domain(active_domain)
		.range(active_color_range);
			
			}
			
});