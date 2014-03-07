// JavaScript Document

$( document ).ready(function(){
	
	console.log("ready")
	var ds_sector = [5,10,16,24,20,15,10,30,21,28,35]  //place holder dataset 
	
	
	var ds_text = ["The West is about Agriculture and Resource Extraction","The economic value of these economic sectors is $10,00000", "Lets look at some other sectors."]  //3 text scripts.  
	
	var height = $(this).height();
	var width = $(this).width();
	
	var svg = d3.select(".splash_container").append("svg")
			.attr("width", width)
			.attr("height", height)
	
	var bubble_container = svg.append("g")
			.attr("class", "bubble_container")  //bubbles 
	var bubble = bubble_container.selectAll("bubble")
			.data(ds_sector)
			.enter().append("circle")
			.attr("class", "bubble")
			.attr("r", function (d) {return d * (height/75)})								//this will all move elswewhere, I hinkl
			.attr("cy", height/2)
			.attr("cx", width/2)	
			.attr("fill", "red")
			.attr("opacity", .5)
			//on("mouseover", bubble_mouseover)				//refer to bubble data
	frame_1();



	function frame_1(){
		
		
		$(".splash_container").animate({opacity:1},3000,function(){
			
	
			bubble_container.transition().delay(10000).each("end", frame_2)
			
			
			})
		
		
		
	}

	function frame_2 (){
		
	$(".splash_container").delay(3000).animate({opacity:0},3000)
	 //alert("hey there sexy")
	frame_1()
	
	}
	
/*	
	function animateFirstStep(){
    d3.select(this)
      .transition()            
        .delay(0)            
        .duration(1000)
        .attr("r", 10)
        .each("end", animateSecondStep);
};

function animateSecondStep(){
    d3.select(this)
      .transition()
        .duration(1000)
        .attr("r", 40);
};

*/



});