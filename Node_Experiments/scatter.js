// JavaScript Document

    
$( document ).ready(function(){

//Width and height
var w_scatter = 600;
var h_scatter = 400;

	var dataset_scatter = [
			[5, 20], 
			[480, 90], 
			[250, 50], 
			[100, 33], 
			[330, 95],
			[410, 12], 
			[475, 44], 
			[25, 67], 
			[85, 21], 
			[220, 88]
];

//add div to body

//add svg contaner do body
var svg_scatter = d3.select("body")
	.append("svg")
	.attr({
		"width":w_scatter,
		"height" :h_scatter
		})

//add circle svgs to svg container

	svg_scatter.selectAll("circle")
		.data(dataset_scatter)
		.enter()
		.append("circle")
		.attr({
			"cx": function (d) { return d[0]; },  //first valiue of array selecting, looping through with beautifuil f(d)
			"cy" : function (d) { return d[1]; },  //second value of array selection 
			"r" : function(d) { return Math.sqrt(h_scatter - d[1])},
			"fill":"green"
			})
			
		svg_scatter.selectAll("text")
			.data(dataset_scatter)
			.enter()
			.append("text")
			.text(function(d) { return d[0] + "," + d[1];})
			.attr({
				"x": function(d) {return d[0];},
				"y": function(d) { return d[1];},
				"font-family": "sans-serif",
				"font-size": "10px",
				"fill": "orange"
				})

});