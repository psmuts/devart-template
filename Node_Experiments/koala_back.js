// JavaScript Document

$(document).ready(function() {
	
	var w = 800;  //moved to external data
	var h = 800;
	
	var cnt = 0;
	
	// ID,R,CX,CY
	//Seed Dataset.  
	var dataset = [ [1,100,100,100], [25,100,110,110] ,[25,100,120,120], [25,100,130,130]];  //dataset will be created and pushed to based on dimensions and mousevers...
	//seed dataset with 1 value pair based on hw
////use case:
//  Create 
//
//  Maybe put oa shutter/shake on each element....
// 
//  store x,y, generated from variables.  
//   dataset.push([newNumber1, newNumber2, name]);
////

	
 var svg_dot = d3.select("body")
						.append("svg")
						.attr("width", w)
						.attr("height", h);

		svg_dot.selectAll("circle")
			.data(dataset)
			.enter()
			.append("circle")
			.attr({
				"class" : "dot",
				"id": function (d) { return d[0]},
				"r" :  function (d) { return d[1]; },
				"cx": function (d) { return d[2]; },  //first valiue of array selecting, looping through with beautifuil f(d)
				"cy" : function (d) { return d[3]; },
				"fill": function (d) {return generateRandomColor()},
				"opacity": .85
				})
			
			
	//listener all  			
d3.selectAll('.dot')
			.on("mouseover", function() {
			
			var cx = parseInt($(this).attr("cx"),10)
			var cy = parseInt($(this).attr("cy"),10)
			var r = parseInt($(this).attr("r"),10)
			var cls = $(this).attr("class")
			
			var int_cx = cx + cnt*10
		    var int_cy =  cy + cnt*10
			var int_r =  r
			
			
						
		cnt = cnt + 1;
	
	//PUT START INTO INIT FUNCTION.  RE RUN EVERYTHING WITH VALUES STORED IN DATA.  TOO SLOW?
	
			//change size of $(this)
			
			//add three identicals to svg and dataset.  need to know the calling id, no ordinal value does not matter
		//so, only need to know dataset.length to assign id d(0) + 1, 
		dataset.push([cnt,r,cy + (cnt* 10),cx + (cnt * 10)])
		//add circle svgs to svg containe
		 var dots = svg_dot.selectAll("circle")
				.data(dataset)
			dots.enter()
				.append("circle")
				.on("mouseover", function() { updateDots( int_r,int_cx,int_cy)})
				.attr({
					"class" : "dot",
					"id": function (d) { return d[0]},
					"r" :  function (d) { return d[1]},
					"cx": function (d) { return d[2]},  //first valiue of array selecting, looping through with beautifuil f(d)
					"cy" : function (d) { return d[3]},
					"fill": function (d) {return generateRandomColor()},
					"opacity": .85
					})
					//.classed("dot",true)
					//.on("mouseover", function() { updateDots()})
			
	
			});
			
	function updateDots(my_r, my_cx, my_cy){
		
		cnt = cnt + 1;
		
		//alert("passed vals" + my_r + " " + my_cx + " " + my_cy);
		
		var int_cx = parseInt(my_cx,10) + cnt*2
		var int_cy =  parseInt(my_cy,10) + cnt*2
		var int_r =  parseInt(my_r,10) + cnt*2

		//alert("new vals" + int_r + " " + int_cx + " " + int_cy);
			

		
		dataset.push([2,cnt,int_r,int_cx,int_cy])

		//add circle svgs to svg containe
		 var dots = svg_dot.selectAll("circle")
				.data(dataset)
			dots.enter()
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
					.on("mouseover", function() { updateDots(int_r,int_cx,int_cy)})
		
		
		
		//alert("DFDDFDD")
		
		
		
		
		}
		
//other functions
function generateRandomColor(){
	
	var r = (Math.round(Math.random()* 127) + 127).toString(16);
    var g = (Math.round(Math.random()* 127) + 127).toString(16);
    var b = (Math.round(Math.random()* 127) + 127).toString(16);
    return '#' + r + g + b;
	 
	 }
	 
    
});