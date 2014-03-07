// JavaScript Document

$( document ).ready(function(){
	
	
/////  CARTODB  ///////

var sql_geo = new cartodb.SQL({ user: 'psmuts', format: 'geojson', dp: 10});

var sql = new cartodb.SQL({ user: 'psmuts'});

var gbCartodb_collection;
var gbCartodb_filtered;  
var gbCartodb_default;

//toggle hide the new tooltip
	
var popup_new = $('.tooltip')
		popup_new.toggle()
	
var popup_enhanced = $('.enhanced_popup')
		popup_enhanced.toggle()

var enhanced_open = false;
var ep_map_initialized = false;
var mouse_down_x
var mouse_up_x
var mouse_down_y
var mouse_up_y
var mouse_down = false;

var x_rotation = 45;
var y_rotation = 0;
var proj_scale = 350;


var map;  //leaflet map variable


/////  jquery listeners.  Using D3 "on" only for D3 databound objects////
	
	
	$("#ep_close").click(function(){
		
		$(".enhanced_popup").toggle(500);
		enhanced_open = false;


	})
	
/////  jquery listeners.  Using D3 "on" only for D3 databound objects////


////  call opening animation function.  hard coded for now.  /////


////  call opening animation function.  hard coded for now.  /////

var width = 1600;
var	height = 1200;	

width = $(document).width()
height= $(document).height()

var projection = d3.geo.projection(d3.geo.hammer.raw(1.75, 2))
	.rotate([x_rotation, y_rotation])
	//.translate([width/1.9,height/2.3])
	.translate([width/2, height/2])
	.scale(proj_scale);

var path = d3.geo.path()
		.projection(projection);


var graticule = d3.geo.graticule();

var svg = d3.select("#map_container").append("svg")
	.attr("width", "100%")
	.attr("height", "100%")
	//.call(drag)
	
var g = svg.append("g").attr("class", "map_base")

var project_markers = svg.append("g")


///// LOAD BASE MAP   ///////
	d3.json("data/world-110m.json", function(error, world) {
	  g.selectAll("countrypath")
		  .data(topojson.object(world, world.objects.countries).geometries)
		  .enter().append("path")
		  .attr("class", "land")
		  //.attr("class", "countrypath")
		  .attr("d", path)
		  .on("mouseover", testmouseover)
		  .on("mouseout", testmouseout);  
	 
	  g.insert("path", "boundary")
		  .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
		  .attr("class", "boundary")
		  .attr("d", path)

///// LOAD BASE MAP   ///////


////  LOAD PROJECT   ///////
////  LOAD DEFAULT RECORD ////

	sql_geo.execute("SELECT * FROM wd4c_projects WHERE the_geom IS NULL", function(cartodb_collection) {

			gbCartodb_default = cartodb_collection;


	});

////  LOAD DEFAULT project record/ ////
////  LOAD LEGEND  ////

	legend = d3.select("#legend_container").append("svg").append("g")

	legend.append("circle").attr("class","project_marker_ongoing").attr("r", "10px").attr("cx", "40px").attr("cy", "15px").append("text")
	legend.append("text").text("Ongoing").attr("fill", "white").attr("dx", "15px").attr("dy", "50px")
	legend.append("circle").attr("class","project_marker_upcoming").attr("r", "10px").attr("cx", "125px").attr("cy", "15px")
	legend.append("text").text("Upcoming").attr("fill", "white").attr("dx", "95px").attr("dy", "50px")
	legend.append("circle").attr("class","project_marker_completed").attr("r", "10px").attr("cx", "210px").attr("cy", "15px")
	legend.append("text").text("Completed").attr("fill", "white").attr("dx", "180px").attr("dy", "50px")




//sql_geo.execute("SELECT * FROM wd4c_projects WHERE the_geom IS NOT NULL", function(cartodb_collection) {
sql_geo.execute("SELECT * FROM wd4c_projects WHERE the_geom IS NOT NULL", function(cartodb_collection) {
	
	gbCartodb_collection = cartodb_collection;
	//gbCartodb_filtered = filterData(
	console.log(project_markers)
	project_markers
			.selectAll("project_marker")
            .data(cartodb_collection.features)
            .enter().append("circle")
			.attr("cx", function(d) { return projection([d.geometry.coordinates[0], d.geometry.coordinates[1]]) [0] * (Math.floor((Math.random()* 10) +1))}) 
			.attr("cy", function(d) { return projection([d.geometry.coordinates[0], d.geometry.coordinates[1]]) [1] * (Math.floor((Math.random()* 10) +1))}) 
			.style("opacity", "0")

			.on("click", project_click)		//must be bound befre transition	
			.on("mouseover", project_mouseover)	
			.on("mouseout",project_mouseout)
			.on("mousemove", project_mousemove)

			.transition()
			.ease("elastic")
			.duration(5000)
			.attr("cx", function(d) { return projection([d.geometry.coordinates[0], d.geometry.coordinates[1]]) [0] }) 
			.attr("cy", function(d) { return projection([d.geometry.coordinates[0], d.geometry.coordinates[1]]) [1]}) 
			.style("opacity", "1")
			.attr("r", "10px")
			.attr("class", function (d) { return "project_marker_"+ d.properties.status})			
			.attr("id",function (d) { return d.properties.cartodb_id })
			
	 
			load_default_view()
			
		  })
		  .error(function(errors) {
			// console.log('Errors! Oh no!')
		  });


	});
	
	animateIntro()  //need an on document ready....  
	
	d3.select(self.frameElement).style("height", height + "px");  //don't think we need this.


//opening animation
	function animateIntro (){
	
		d3.selectAll(".countrypath")
			.attr("opacity", 1)	
	}

//functions

	function testmouseover (d){

		d3.select(this)
		//.style("opacity", 1)
		.attr("class", "land-hover");
		//.style("fill", "blue")
	}

	function testmouseout (d){
	
		d3.select(this).attr("class", "land");
		load_default_view()
		//d3.select(this).attr("fill", "blue");
	}
	

	function load_default_view () {
	

		$("#left_side_bar_header").html("<p>" + gbCartodb_default.features[0].properties.name + "</p>").animate({opacity: 1},2000);
		$("#left_side_bar_body").html("<p>" + gbCartodb_default.features[0].properties.bullet_summary + "</p>").animate({opacity: 1},2000);
		$("#left_side_bar").animate({opacity: .9},4000);
		$("#legend_container").animate({opacity: .9},4000);
		$("#instructions_container").animate({opacity: .9},4000);
		$("#social_links_container").animate({opacity: 1},4000);
		$("#left_side_bar_title").animate({opacity: .9},4000);
		$("#icon_container").hide().css("opacity", 1)


/*  sequential animation using callback

		$("#left_side_bar_body").animate({opacity: 0}, 500, function() {
            $("#left_side_bar_body").html(gbCartodb_default.features[0].properties.bullet_summary);
            $("#left_side_bar_body").animate({opacity: 1},500);
		});
*/
	}

	
	function project_click (d) {
		

		d3.select(this).transition().duration(250).attr("r", "10px");  //shrink mouseover bubble.  

		enhanced_open = true;  //set to false when enhanced popup is closed
		popup_new.hide()

		$("#ep_detail_header").html(d.properties.name)
		$("#ep_detail_body").html(d.properties.description)
		$("#research").html(d.properties.research_links)
		


		popup_enhanced.toggle(500, function (){

			if (ep_map_initialized == false) {
				
				map = L.map('ep_map', {  //loading map in callback because popup enhanced has to be sized before addeing map to Leaflet map container
						    center: [d.geometry.coordinates[1],d.geometry.coordinates[0]],  //modify based on data
						    zoom: 6,
							minZoom: 3,
							maxZoom:17
						});

						//L.tileLayer('http://{s}.tile.cloudmade.com/f455d75240a145dab3f1b851e78aa8fa/9203/256/{z}/{x}/{y}.png', {   //cloudmade... but think I klike mapbox better

						//L.tileLayer('http://{s}.tiles.mapbox.com/v3/psmuts.map-5nan4cgq/{z}/{x}/{y}.png', {
						L.tileLayer('http://{s}.tile.cloudmade.com/f455d75240a145dab3f1b851e78aa8fa/8/256/{z}/{x}/{y}.png', {
						     //attribution: 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 MapBox'
						}).addTo(map);
			
			}	
			ep_map_initialized = true;

			map.setView([d.geometry.coordinates[1],d.geometry.coordinates[0]],6)  //going for scrolling effect.  from last to next 
			
		})

	}


	function project_mouseover (d) {

		if (enhanced_open == false) {

			console.log ("mouseover")
			
			d3.select(this).transition().duration(250).attr("r", "40px");  

			$("#left_side_bar_header").html("<p>" + d.properties.name + "</p>")
			$("#left_side_bar_body").html("<p>" + d.properties.bullet_summary + "</p>")
			//$("#icon_container").show()

			var popupheader = $(".ttheader")
					popupheader.html(d.properties.name + "<br> <h4> " + d.properties.location_name + "</h4> <br><p> Lat: " + d.geometry.coordinates[1] + "<br>  Lon: " + d.geometry.coordinates[0] + " </p>")

			var popupbody = $(".ttbodycontainer")
					popupbody.html("Click <img src='images/digdeeper.png' class='icondeeper'> to explore the project in more detail.")


			popup_new
				.css("left",(d3.event.pageX ) + 23 + 'px')
				.css("top", (d3.event.pageY) + 25 + 'px')
				.toggle(0, '',function(){		
					/*popupbody.delay(500);
					popupbody.animate({height : '150px', opacity: 1},400); */
				});
			}
		}



	function project_mouseout (d) {
		
		console.log ("mouseout")

		if (enhanced_open == false) {

			popup_new.toggle(0)
			d3.select(this).transition().duration(250).attr("r", "10px");
			load_default_view ();

		}

	}


	function project_mousemove(d) {

		console.log($(document).width())
		console.log(d3.event.pageX)
		console.log($(document).width() - 200 - d3.event.pageX)


			if ( $(document).width() - 250 - d3.event.pageX > 0) { 

				$(".ttdeeper").css("top","-50px").css("left","-45px")
				popup_new	
					.css("left",(d3.event.pageX ) + 23 + 'px')
					.css("top", (d3.event.pageY) + 25 + 'px')

			
			}
			else  {

				$(".ttdeeper").css("top","-50px").css("left","235px")
				popup_new	
					.css("left",(d3.event.pageX ) - 260 + 'px')
					.css("top", (d3.event.pageY) + 25 + 'px')


			}
			
	}
	
	
	

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
	
	$(window).resize(function(){



		width = $(document).width()
		height = $(document).height()

		projection  //update projection algo
			.rotate([x_rotation, y_rotation])
			//.translate([width/1.9,height/2.3])
			.translate([width/2, height/2])
			.scale(340);

		//svg = d3.select("#map_container")
		svg.select("#map_container")
			.attr("width", width)
			.attr("height", height);

		g.selectAll("path")  //update country and boundary
			.attr("d", path)

		//g.selectAll("boundary")
		//	.attr("d",path)

		project_markers.selectAll("circle") 
			.attr("cx", function(d) { return projection([d.geometry.coordinates[0], d.geometry.coordinates[1]]) [0] }) 
			.attr("cy", function(d) { return projection([d.geometry.coordinates[0], d.geometry.coordinates[1]]) [1]}) 
	

	})



	$("#map_container").mousedown(function(event){

		console.log("mouse down" + event.pageX)

		mouse_down = true;
		$(document).css("cursor", "pointer")
		mouse_down_x = event.pageX
		mouse_down_y = event.pageY

	})

	$("#map_container").mouseup(function(event){

		console.log("mouse up" + event.pageX)

		mouse_down = false;

		$(document).css("cursor", "auto")

	})

	$("#map_container").mousemove(function(event){

		if (mouse_down == true) {

			$(document).css("cursor", "pointer")
			$(this).css("cursor", "pointer")


			console.log($(this).css("class"))

			console.log(mouse_up_x)
			console.log(mouse_down_x)
			console.log(mouse_up_x - mouse_down_x)



			$(this).css("cursor", "pointer")

			mouse_up_x = event.pageX
			mouse_up_y = event.pageY

			//check for a difference.  

			var x_rotation_current = x_rotation;
			var x_rotate_amount;

			if (mouse_down_x != mouse_up_x) {


				console.log($(document).width()/3600 * (mouse_up_x - mouse_down_x))

				x_rotate_amount = $(document).width()/3600 * (mouse_up_x - mouse_down_x)
				console.log(x_rotate_amount)

				x_rotation = x_rotation_current + x_rotate_amount
				//x_rotation = x_rotation
				console.log("x rotation" + x_rotation)

			}

			//redraw

			redraw_map()

			mouse_down_x = event.pageX
			//mouse_down_y = event.pageY
		}


	})


	function redraw_map() {  //might not have a "d" here... but no, the "d" is bound to the declared variable.  

		projection  //update projection algo
			.rotate([x_rotation, y_rotation])
			.translate([width/2, height/2])
			.scale(proj_scale);

			g.selectAll("path")  //update country and boundary
				.attr("d", path)

			//g.selectAll("boundary")
			//	.attr("d",path)

			project_markers.selectAll("circle") 
				.attr("cx", function(d) { return projection([d.geometry.coordinates[0], d.geometry.coordinates[1]]) [0] }) 
				.attr("cy", function(d) { return projection([d.geometry.coordinates[0], d.geometry.coordinates[1]]) [1]}) 


	}


});
	