// JavaScript Document

    
$( document ).ready(function(){
	//Width and height
	var w_bar = 600;
	var h_bar = 250;
	var barPadding = 1;
	
	//data
	
	var dataset = [ 25, 7, 5, 26, 11, 8, 25, 14, 23, 19,
14, 11, 22, 29, 11, 13, 12, 17, 18, 10,12,15,25,40,45,14,24,34 ];
	
	//scales
	
	var xScale = d3.scale.ordinal()
				.domain(d3.range(dataset.length))
				.rangeRoundBands([0,w_bar],0.05);
	var yScale = d3.scale.linear()
				.domain([0,d3.max(dataset)])
				.range([0, h_bar])
	
	
	var svg = d3.select("body")  //initialize an SVG element.  
	.append("svg")  //append svg element to 
	.attr("width", w_bar) // <-- Here
	.attr("height", h_bar);
	

	svg.selectAll("rect")
	.data(dataset)
	.enter()
	.append("rect")
	.attr({
		"x": function(d,i) {return xScale(i);},
		"y": function (d) { return h_bar - yScale(d);},
		"width": xScale.rangeBand(),
		"height": function(d) { return yScale(d);},
		"fill": function (d) { return "rgb(0,0, " + d * 10 + ")";}
	});
	
	
	svg.selectAll("text")
		.data(dataset)
		.enter()
		.append("text")
		.text(function (d) {
			
			return d;
			
			})
		.attr( {
			
			"x": function (d,i) { return xScale(i) + xScale.rangeBand()/2},
			"y": function (d) { return h_bar - yScale(d) + 15;},
			"text-anchor":"middle",
			"fill": "white",
			"font-size": "11pt",
			"font-family":"sans-serif"
			} )
			
			
			
			
			
			
});