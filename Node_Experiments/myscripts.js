// JavaScript Document

    
$( document ).ready(function(){
	
	
	var w = 1200;
	var h = 900;
	var padding = 30;
	
/*
var dataset = [
[5, 20, "Fred"], [480, 90, "Mary"], [250, 50, "Suzie"], [100, 33, "Bob"], [330, 95, "Ralph"],
[410, 12, "Marj"], [475, 44, "Phil"], [25, 67, "Mark"], [85, 21, "Larry"], [220, 88, "Jane"], [600,150, "Peter"]
];
*/

//Random number dataset

var dataset = [];
var numDataPoints = 150;
var xRange = Math.random() * 1000;
var yRange = Math.random() * 1000;
var name = "Name";
for (var i = 0; i < numDataPoints; i++) {
	var newNumber1 = Math.floor(Math.random() * xRange);
	var newNumber2 = Math.floor(Math.random() * yRange);
	dataset.push([newNumber1, newNumber2, name]);
	}

var xScale = d3.scale.linear()  //in javascript variable can store functions.  
			.domain([0,d3.max(dataset,function(d) { return d[0]})])
			.range([padding,w-(padding * 2)])  //can use Range Round to smooth numbers
			.nice()
			
var yScale = d3.scale.linear()  //in javascript variable can store functions.  
			.domain([0,d3.max(dataset,function(d) { return d[1]})])
			.range([h-padding,padding])
			.nice()

var rScale = d3.scale.linear()
			.domain([0, d3.max(dataset, function(d) { return d[1]; })])
			.range([5, 25])
			.nice()


var svg_scatter = d3.select("body")
	.append("svg")
	.attr({
		"width":w,
		"height" :h
		})

//add circle svgs to svg container

	svg_scatter.selectAll("circle")
		.data(dataset)
		.enter()
		.append("circle")
		.attr({
			"cx": function (d) { return xScale(d[0]); },  //first valiue of array selecting, looping through with beautifuil f(d)
			"cy" : function (d) { return yScale(d[1]); },  //second value of array selection 
			"r" : function(d) { return rScale(d[1])},  //if you set to x, get huge overlappping things  
			"fill": function (d) {return generateRandomColor()},
			"opacity": .85
			})
			
/*		
		svg_scatter.selectAll("text")
			.data(dataset)
			.enter()
			.append("text")
			.text(function(d) { return d[2] + ": " +  d[0] + "," + d[1];})
			.attr({
				"x": function(d) {return xScale(d[0]) +  rScale(d[1]);},  //position right on edge of radius.  Nice PS.  
				"y": function(d) { return yScale(d[1]) -   rScale(d[1]);},
				"font-family": "sans-serif",
				"font-size": "6px",
				"fill": "olive"
				})
*/		
	
				
	//AXES Practice
	
	var xAxis = d3.svg.axis()
				.scale(xScale)  //define what scale the x-axis will use.  Defied above as 
				.orient("bottom")
				.ticks(5)
				
	//append axis, LAST so on top, to SVG Scatter
	svg_scatter.append("g")   //"g" is a defined element of an SVG.  Invisible
				.attr("class", "axis")  //apply class from style sheet.  sweet.  
				.attr("transform","translate(0," + (h - padding) + ")")
				.call(xAxis)
				
	var yAxis = d3.svg.axis()
				.scale(yScale)
				.orient("right")
				.ticks(5)
	svg_scatter.append("g")   //"g" is a defined element of an SVG.  Invisible
			.attr("class", "axis")  //apply class from style sheet.  sweet.  
			.attr("transform","translate(" + (10) + ", 0)")  //move to left
			.call(yAxis)
			
		//format axis
		
	var formatAsPercent = d3.format(".1%");
	
	//xAxis.tickFormat(formatAsPercent);
				
				
//helper functions

 function generateRandomColor(){
	
	var r = (Math.round(Math.random()* 127) + 127).toString(16);
    var g = (Math.round(Math.random()* 127) + 127).toString(16);
    var b = (Math.round(Math.random()* 127) + 127).toString(16);
    return '#' + r + g + b;
	 
	 }
	 

	 
	 
	 


});