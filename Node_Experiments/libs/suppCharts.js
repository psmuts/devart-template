// JavaScript Document

function createScatter() {
	
	
	var w = 200;
	var h = 200;
	var padding = 30;
	
	//get initial data 
	
	//refreshdata();
//get initial data 

//design layout visually.  use classes and id to access.  load dynamically!!!!  test d3.html.  

//Random number dataset

var dataset = []; //[[10,10],[20,20],[30,30],[40,40],[50,50],[60,60],[70,70],[80,80],[90,90]];

dataset = refreshdata(dataset);

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
			.range([1, 5])
			.nice()
			
var svg_scatter = d3.select("#graphContainer2")
	.append("svg")
	.attr({
		"width":w,
		"height" :h
		})
	
//add circle svgs to svg container
/*
	svg_scatter.selectAll("circle")
		.data(dataset)
		.enter()
		.append("circle")
		.attr({
			"cx": function (d) { return d[0]; },  //first valiue of array selecting, looping through with beautifuil f(d)
			"cy" : function (d) { return d[1]; },  //second value of array selection 
			"r" : function(d) { return d[1]},  //if you set to x, get huge overlappping things  
			"fill": function (d) {return generateRandomColor()},
			"opacity": .85
			});
		*/

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
			});

	//AXiS Practice

var xAxis = d3.svg.axis()
			.scale(xScale)  //define what scale the x-axis will use.  Defied above as 
			.orient("bottom")
			.ticks(5)
			
//append axis, LAST so on top, to SVG Scatter
svg_scatter.append("g")   //"g" is a defined element of an SVG.  Invisible
			.attr("class", "x axis")  //apply class from style sheet.  sweet.  
			.attr("transform","translate(0," + (h - padding) + ")")
			.call(xAxis);
			
var yAxis = d3.svg.axis()
			.scale(yScale)
			.orient("right")
			.ticks(5)
			
svg_scatter.append("g")   //"g" is a defined element of an SVG.  Invisible
			.attr("class", "y axis")  //apply class from style sheet.  sweet.  
			.attr("transform","translate(" + (10) + ", 0)")  //move to left
			.call(yAxis)
		
	
var formatAsPercent = d3.format(".1%");   //xAxis.tickFormat(formatAsPercent);
	

}
	
			
//helper functions

function generateRandomColor(){
	
	var r = (Math.round(Math.random()* 127) + 127).toString(16);
    var g = (Math.round(Math.random()* 127) + 127).toString(16);
    var b = (Math.round(Math.random()* 127) + 127).toString(16);
    return '#' + r + g + b;
	 
	 }
	 
	
function refreshdata(dataset) {
	

	dataset = [];  //empty it and return new
					
	var numDataPoints = 150;
	var xRange = Math.random() * 1000;
	var yRange = Math.random() * 1000;
	var name = "Name";
	for (var i = 0; i < numDataPoints; i++) {
		var newNumber1 = Math.floor(Math.random() * xRange);
		var newNumber2 = Math.floor(Math.random() * yRange);
		dataset.push([newNumber1, newNumber2, name]);
		}
			return dataset;	
}
	 
