// JavaScript Document

$(document).ready(function() {
	
	var w = 800;  //moved to external data
	var h = 800;
	var r = 400;
	var cnt = 0;
	
	// ID,R,CX,CY
	//Seed Dataset.  
	var dataset = [];  //dataset will be created and pushed to based on dimensions and mousevers...
	//seed dataset with 1 value pair based on hw
////use case:
//  Create 
//
//  Maybe put oa shutter/shake on each element....
// 
//  store x,y, generated from variables.  
//   dataset.push([newNumber1, newNumber2, name]);
////	


dataset.push([cnt,r,w/2,h/2])

 var svg_dot = d3.select("body")
						.append("svg")
						.attr("width", w)
						.attr("height", h);

		svg_dot.selectAll("circle")
			.data(dataset)
			.enter()
			.append("circle")
			.on("mouseover", function() { updateDots( $(this))})
			.attr({
				"class" : "dot",
				"id": function (d) { return d[0]},
				"r" :  function (d) { return d[1]; },
				"cx": function (d) { return d[2]; },  //first valiue of array selecting, looping through with beautifuil f(d)
				"cy" : function (d) { return d[3]; },
				"fill": function (d) {return generateRandomColor()},
				"opacity": .85
				})
				.on("mouseover", function(d) { updateDots( $(this))})
			
		
	//listener all  	//could just add listener to each as doing now, and call 		
		
//function updateDots(my_id,my_r, my_cx, my_cy){
function updateDots(callingObject){
		
		my_id = callingObject.attr("id")
		
		my_r = callingObject.attr("r")
		
		my_cx = callingObject.attr("cx")
		
		my_cy = callingObject.attr("cy")
		
		alert("passed vals:  id= " + my_id + "r= " + my_r + "cx = " + my_cx + "cy = " + my_cy);
		
		var calling_id = my_id
		
		cnt = cnt + 1;
		
		my_id = cnt
		my_r = my_r/2
		my_cx = my_cx/2
		my_cy = my_cy/2

		alert("new vals id=" + my_id + " r=" + my_r + " cx = " + my_cx + " cy = " + my_cy);
	
		
		dataset.push([my_id,my_r,my_cx,my_cy])
		
		alert(dataset)

		//add circle svgs to svg containe
		 var dots = svg_dot.selectAll("circle")
				.data(dataset)
				//before enter, resize durrent
				dots.attr("r", "100")
				
			dots	
				.enter()
				.append("circle")
				.attr({
					"class" : "dot",
					"id": function (d) { return d[0]},
					"r" :  function (d) { return d[1]},
					"cx": function (d) { return d[2]},  //first valiue of array selecting, looping through with beautifuil f(d)
					"cy" : function (d) { return d[3]},
					"fill": function (d) {return generateRandomColor()},
					"opacity": .85
					})
					.on("mouseover", function() { updateDots($(this))})
				//dots
				//	.attr("cx",
		
		//need to update changed dots, calling do.  id.  
		
		
		}
		
//other functions
function generateRandomColor(){
	
	var r = (Math.round(Math.random()* 127) + 127).toString(16);
    var g = (Math.round(Math.random()* 127) + 127).toString(16);
    var b = (Math.round(Math.random()* 127) + 127).toString(16);
    return '#' + r + g + b;
	 
	 }
	 
    
});