// JavaScript Document

$( document ).ready(function(){
	
		/*
	var width = 960,
		height = 680;
	*/
	//alert($(document).width())
	
	//wrap everything in divs
	
	//thinking to have huge SVG div.  Then a centered main... want the effect of of big, moving space.  
	//use popup.  add mpdes
	
	//svg on top of svg for working dogs nodes [staff, projects, species, other metrics]
	
	var width = 2000;
		height = 1500;	
/*	
	var projection = d3.geo.fahey()
		.scale(383)
		.translate([width / 2.5, height / 3])  //should be based on window or doc.  
		//.translate([900, 500])
		.precision(.1)
		//.rotate(0,50,90);
*/	
	var projection = d3.geo.projection(d3.geo.hammer.raw(1.75, 2))
		//.rotate([10, 45])
		.translate([width/2.05,height/2.75])
		.scale(360);
		
	
	var path = d3.geo.path()
			.projection(projection);
	
	var graticule = d3.geo.graticule();
	
	var svg = d3.select("#map_container").append("svg")
		.attr("width", "100%")
		.attr("height", "100%");
	
	svg.append("defs").append("path")
		.datum({type: "Sphere"})
		.attr("id", "sphere")
		.attr("d", path);
	
	svg.append("use")
		.attr("class", "stroke")
		.attr("xlink:href", "#sphere");
	
	svg.append("use")
		.attr("class", "fill")
		//.style("fill", "url(#gradient)")  //Eureka: applied only to this single background not the dataset
		.attr("xlink:href", "#sphere");
	
	svg.append("path")
		.datum(graticule)
		.attr("class", "graticule")
		.attr("d", path);
	

	d3.json("data/world-110m.json", function(error, world) {
	  svg.selectAll("countrypath")
		  .data(topojson.object(world, world.objects.countries).geometries)
		  .enter().append("path")
		  //.attr("class", "land")
		  .attr("class", "countrypath")
		  .attr("d", path)
		  .on("mouseover", testmouseover)
		  .on("mouseout", testmouseout);  
	 
	  svg.insert("path", "boundary")
		  .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
		  .attr("class", "boundary")
		  .attr("d", path)

		  //.attr("filter", "url(#blur)");

		  
//playing with SVG filters and glowing effects

	var filter = svg.append("svg:defs")
		  .append("svg:filter")
		  .attr("id", "blur")
		  .append("svg:feGaussianBlur")
		  .attr("stdDeviation", 10);	  

	var gradient = svg.append("svg:defs")
			.append("svg:radialGradient")
			.attr("id", "gradient")
			.attr("x1", "0%")
			.attr("y1", "0%")
			.attr("x2", "100%")
			.attr("y2", "100%")
			.attr("spreadMethod", "pad");
		 
		gradient.append("svg:stop")
			.attr("offset", "0%")
			.attr("stop-color", "#777")
			.attr("stop-opacity", .8);
		 
		gradient.append("svg:stop")
			.attr("offset", "100%")
			.attr("stop-color", "#222")
			//.attr("stop-color", "#6CC")
			.attr("stop-opacity", 1);
			
//test gradient rect
/*
		svg.append("svg:rect")
			.attr("width", 100)
			.attr("height", 100)
			.style("fill", "url(#gradient)");	
*/		

/* Test Image for Filters  
	svg.append("svg:image")
		.attr("xlink:href", "http://octodex.github.com/images/original.jpg")
		.attr("width", "200px")
		.attr("height", "200px")
		.attr("x",600)
		.attr("y", 600)
		.attr("filter", "url(#blur)");
*/
/*
	svg.append("line")
		.attr("class", "myfirstline")
		.attr("x1", 200)
		.attr("y1", 500)
		.attr("x2", 500)
		.attr("y2", 500)
		.attr("filter", "url(#blur)");
		
	dataset = [[10,300],[50,350],[60,400]];
	
	svg.selectAll("stupidCircle")  //can only select element that don't exist if you are binding data 
		.data(dataset)
		.enter()  ///not data bound, so enter does not work. 
		.append("circle")
		//.attr("class", "testnode")
		.attr("r", function (d) {return d[0]})
		//.attr("r", 6)
		.attr("cy", "50%")
		.attr("cx", function (d) {return d[1]})
		.attr("stroke","red")
		.attr("fill","orange")
		.attr("opacity",1)
		//.attr("filter", "url(#blur)");

*/
		
		// y1="0" x2="500" y2="50" stroke="black"

//add circle too with opacity
	});
	
	animateIntro()  //need an on document ready....  
	
	d3.select(self.frameElement).style("height", height + "px");



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
	//d3.select(this).attr("fill", "blue");
	}
	
	
	
});
	