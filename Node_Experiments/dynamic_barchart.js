// JavaScript Document

    
$( document ).ready(function(){
	
	//get data
	var maxValue = 100;
	var dataset = [];
	refreshdata();

	//var dataset = refreshdata();
//Iiitialize Graphics	
	
	//Width and height
	var w_bar = 600;
	var h_bar = 250;
	var barPadding = 1;
	
	//data
	
	/*
	var dataset = [ 20, 7, 5, 26, 11, 8, 25, 14, 23, 19,
14, 11, 22, 29, 11, 13, 12, 17, 18, 10 ];
	*/
	
	//scales //is this data and all global.  ?
	
	//because this variable is a function it is executed each time it is called.  Cool... confirm.  
	var xScale = d3.scale.ordinal()
				.domain(d3.range(dataset.length))
				.rangeRoundBands([0,w_bar],0.05);
	var yScale = d3.scale.linear()
				.domain([0,d3.max(dataset)])
				.range([0, h_bar])
	
	//insert SVG container (?terminology) element into bodyu
	var svg = d3.select("body")    
	.append("svg")  
	.attr("width", w_bar) 
	.attr("height", h_bar);
	
	//add shapes for data 
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
	
	//add labels
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

//listenters
//could use jquery but will use d3 because of benefits later.
			
		d3.select('#update_data')
			.on("click", function() {
				
				
				/*
			
				dataset = [ 11, 12, 15, 20, 18, 17, 16, 18, 23, 25,
					5, 10, 13, 19, 21, 25, 22, 18, 15,45 ];
					
				*/
				
				refreshdata();
				
				//Update scale
				
				//reset y scale
				yScale.domain([0,d3.max(dataset)]);
				
				//reset x scale
				
				xScale.domain(d3.range(dataset.length))
				
					
					//Update all rects
					
					svg.selectAll("rect")
						.data(dataset)
						.transition()
						.duration(2000)
						.ease("cubic-in-out")
						.delay(function(d, i) {
							return i * 100;
							})
						.attr({
							"x": function(d,i) {return xScale(i);},
							"y": function (d) { return h_bar - yScale(d);},
							"width": xScale.rangeBand(),
							"height": function(d) { return yScale(d);},
							"fill": function (d) { return "rgb(0,0, " + d * 10 + ")";}
						});
						
					svg.selectAll("text")
						.data(dataset)
						.transition()
						.duration(2000)
						.ease("cubic-in-out")
						.delay(function(d, i) {
							return i * 100;
							})
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
				
		});  //#update_data on click
	
		
	function refreshdata() {
					
				var numValues = dataset.length;
				if (numValues == 0) { numValues = 25};
				dataset = [];
				for (var i = 0; i < numValues; i++) {
				var newMember = Math.floor(Math.random() * maxValue);
					dataset.push(newMember);
			
				}
			
			return true;	
		}
			
			
});