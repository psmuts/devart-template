// JavaScript Document

$( document ).ready(function(){
	
	
	var max_r = 300;
	
	//var ds_sector = [1,19,3,19,8,5,5,1,5,5,5,5,2,2,3,5,7,5,5]  //place holder dataset  this will come from some other dataset.  
	var ds_sector = [14.1,11,9.6,8.7,7.9,7.3,6.7,5.8,4.3,3.7,3.6,2.9,2.9,2.3,1.6,1.3,.9,5.2]
	var rad_array = getRadi(ds_sector, max_r)  //projected radius array
	
	var ds_text = ["The West is about Agriculture and Resource Extraction","The economic value of these economic sectors is $10,00000", "Lets look at some other sectors."]  //3 text scripts.  
	
	var height = $(this).height();
	var width = $(this).width();
	
	var svg = d3.select(".splash_container").append("svg")
			.attr("width", width)
			.attr("height", height)
	
	var bubble_container = svg.append("g")
			.attr("class", "bubble_container")  //bubbles 
	
	bubble_container.selectAll("bubble")
			//.data(ds_sector)
			.data(rad_array)
			.enter().append("circle")
			.attr("class", "bubble")
			.attr("id", function(d,i) {return "bubble" + i})
			.attr("r", function (d) {return d})				//this will all move elswewhere, I hinkl
			.attr("cy", height/1.75)
			.attr("cx", width/2)	
			//.attr("fill", "#6BE400")
			.attr("opacity", 0)				//refer to bubble data
		
	//bubble_container.forEach(function(d){ console.log(d[0])})
	//create variables to hold these setting variables
	frame_1();
	
	function frame_1(){
		
		console.log($("#high_text").css("left"))
		console.log($("#high_text").css("right"))
		
		$(".splash_container").animate({opacity:1},500,function(){
			
			$("#high_text").css("left", "0px").html("When you think of the economy of the West...").animate({opacity:1, left: ((width/2) - 350)},4000, function(){  
				
				d3.select("#bubble17").attr("r", "20px").transition().duration(3000).attr("fill","#FF7400").attr("opacity", 1).each("end", function(){
				
					$("#high_text").animate({opacity:0},1000, function(){
						
						$("#high_text").html("you probably think of farms, ranches, minerals, gas, wheat and gold..").animate({opacity:1},3000)
						
						d3.select("#bubble17").transition().duration(4000).attr("r",rad_array[0]).each("end", function(){

							$("#high_text").animate({opacity:0},1000, function(){
							
								$("#high_text").html("USE SMALL CIRCLES FOR LEGEND").animate({opacity:1, left:"4%", width:"400px", fontSize:"36px"},4000, function(){
									
										d3.select("#bubble16").attr("r", rad_array[0]*1.3).transition().duration(4000).attr("opacity",1).attr("fill","#91C85B").attr("r",rad_array[0]) //come in from outside and shrink first bubble.  
										d3.select("#bubble17").transition().duration(4000).attr("r",rad_array[1]).each("end", function(){
											
											d3.select("#bubble15").attr("r", rad_array[0]*1.3).transition().duration(4000).attr("opacity",1).attr("fill","#88D7A1").attr("r",rad_array[0]) //come in from outside and shrink first bubble.  
											d3.select("#bubble16").transition().duration(4000).attr("r",rad_array[1])
											d3.select("#bubble17").transition().duration(4000).attr("r",rad_array[2]).each("end", function(){
												
												d3.select("#bubble14").attr("r", rad_array[0]*1.3).transition().duration(4000).attr("opacity",1).attr("fill","#CBD581").attr("r",rad_array[0]) //come in from outside and shrink first bubble.  
												d3.select("#bubble15").transition().duration(4000).attr("r",rad_array[1])
												d3.select("#bubble16").transition().duration(4000).attr("r",rad_array[2])
												d3.select("#bubble17").transition().duration(4000).attr("r",rad_array[3]).each("end", function(){
													
													d3.select("#bubble13").attr("r", rad_array[0]*1.3).transition().duration(4000).attr("opacity",1).attr("fill","#86712D").attr("r",rad_array[0]) //come in from outside and shrink first bubble.  
													d3.select("#bubble14").transition().duration(4000).attr("r",rad_array[1])
													d3.select("#bubble15").transition().duration(4000).attr("r",rad_array[2])
													d3.select("#bubble16").transition().duration(4000).attr("r",rad_array[3])
													d3.select("#bubble17").transition().duration(4000).attr("r",rad_array[4]).each("end", function(){
													
														d3.select("#bubble12").attr("r", rad_array[0]*1.3).transition().duration(4000).attr("opacity",1).attr("fill","#97A838").attr("r",rad_array[0]) //come in from outside and shrink first bubble.  
														d3.select("#bubble13").transition().duration(4000).attr("r",rad_array[1])
														d3.select("#bubble14").transition().duration(4000).attr("r",rad_array[2])
														d3.select("#bubble15").transition().duration(4000).attr("r",rad_array[3])
														d3.select("#bubble16").transition().duration(4000).attr("r",rad_array[4])
														d3.select("#bubble17").transition().duration(4000).attr("r",rad_array[5]).each("end", function(){
															
															d3.select("#bubble11").attr("r", rad_array[0]*1.3).transition().duration(4000).attr("opacity",1).attr("fill","#53C6B3").attr("r",rad_array[0]) //come in from outside and shrink first bubble.  
															d3.select("#bubble12").transition().duration(4000).attr("r",rad_array[1])
															d3.select("#bubble13").transition().duration(4000).attr("r",rad_array[2])
															d3.select("#bubble14").transition().duration(4000).attr("r",rad_array[3])
															d3.select("#bubble15").transition().duration(4000).attr("r",rad_array[4])
															d3.select("#bubble16").transition().duration(4000).attr("r",rad_array[5])
															d3.select("#bubble17").transition().duration(4000).attr("r",rad_array[6]).each("end", function(){
																
																d3.select("#bubble10").attr("r", rad_array[0]*1.3).transition().duration(4000).attr("opacity",1).attr("fill","#64822B").attr("r",rad_array[0]) //come in from outside and shrink first bubble.  
																d3.select("#bubble11").transition().duration(4000).attr("r",rad_array[1])
																d3.select("#bubble12").transition().duration(4000).attr("r",rad_array[2])
																d3.select("#bubble13").transition().duration(4000).attr("r",rad_array[3])
																d3.select("#bubble14").transition().duration(4000).attr("r",rad_array[4])
																d3.select("#bubble15").transition().duration(4000).attr("r",rad_array[5])
																d3.select("#bubble16").transition().duration(4000).attr("r",rad_array[6])
																d3.select("#bubble17").transition().duration(4000).attr("r",rad_array[7]).each("end", function(){
																	
																																
																	d3.select("#bubble9").attr("r", rad_array[0]*1.3).transition().duration(4000).attr("opacity",1).attr("fill","#ABB83D").attr("r",rad_array[0]) //come in from outside and shrink first bubble.  
																	d3.select("#bubble10").transition().duration(4000).attr("r",rad_array[1])																	
																	d3.select("#bubble11").transition().duration(4000).attr("r",rad_array[2])
																	d3.select("#bubble12").transition().duration(4000).attr("r",rad_array[3])
																	d3.select("#bubble13").transition().duration(4000).attr("r",rad_array[4])
																	d3.select("#bubble14").transition().duration(4000).attr("r",rad_array[5])
																	d3.select("#bubble15").transition().duration(4000).attr("r",rad_array[6])
																	d3.select("#bubble16").transition().duration(4000).attr("r",rad_array[7])
																	d3.select("#bubble17").transition().duration(4000).attr("r",rad_array[8]).each("end", function(){
																		
																															
																		d3.select("#bubble8").attr("r", rad_array[0]*1.3).transition().duration(4000).attr("opacity",1).attr("fill","#D4847D").attr("r",rad_array[0]) //come in from outside and shrink first bubble.  
																		d3.select("#bubble9").transition().duration(4000).attr("r",rad_array[1])																	
																		d3.select("#bubble10").transition().duration(4000).attr("r",rad_array[2])																	
																		d3.select("#bubble11").transition().duration(4000).attr("r",rad_array[3])
																		d3.select("#bubble12").transition().duration(4000).attr("r",rad_array[4])
																		d3.select("#bubble13").transition().duration(4000).attr("r",rad_array[5])
																		d3.select("#bubble14").transition().duration(4000).attr("r",rad_array[6])
																		d3.select("#bubble15").transition().duration(4000).attr("r",rad_array[7])
																		d3.select("#bubble16").transition().duration(4000).attr("r",rad_array[8])
																		d3.select("#bubble17").transition().duration(4000).attr("r",rad_array[9]).each("end", function(){
																		
																			d3.select("#bubble7").attr("r", rad_array[0]*1.3).transition().duration(4000).attr("opacity",1).attr("fill","#775E28").attr("r",rad_array[0]) //come in from outside and shrink first bubble.  
																			d3.select("#bubble8").transition().duration(4000).attr("r",rad_array[1])																	
																			d3.select("#bubble9").transition().duration(4000).attr("r",rad_array[2])																	
																			d3.select("#bubble10").transition().duration(4000).attr("r",rad_array[3])																	
																			d3.select("#bubble11").transition().duration(4000).attr("r",rad_array[4])
																			d3.select("#bubble12").transition().duration(4000).attr("r",rad_array[5])
																			d3.select("#bubble13").transition().duration(4000).attr("r",rad_array[6])
																			d3.select("#bubble14").transition().duration(4000).attr("r",rad_array[7])
																			d3.select("#bubble15").transition().duration(4000).attr("r",rad_array[8])
																			d3.select("#bubble16").transition().duration(4000).attr("r",rad_array[9])
																			d3.select("#bubble17").transition().duration(4000).attr("r",rad_array[10]).each("end", function(){	
																			
																			
																				d3.select("#bubble6").attr("r", rad_array[0]*1.3).transition().duration(4000).attr("opacity",1).attr("fill","#ABB83A").attr("r",rad_array[0]) //come in from outside and shrink first bubble.  
																				d3.select("#bubble7").transition().duration(4000).attr("r",rad_array[1])																	
																				d3.select("#bubble8").transition().duration(4000).attr("r",rad_array[2])																	
																				d3.select("#bubble9").transition().duration(4000).attr("r",rad_array[3])																	
																				d3.select("#bubble10").transition().duration(4000).attr("r",rad_array[4])																	
																				d3.select("#bubble11").transition().duration(4000).attr("r",rad_array[5])
																				d3.select("#bubble12").transition().duration(4000).attr("r",rad_array[6])
																				d3.select("#bubble13").transition().duration(4000).attr("r",rad_array[7])
																				d3.select("#bubble14").transition().duration(4000).attr("r",rad_array[8])
																				d3.select("#bubble15").transition().duration(4000).attr("r",rad_array[9])
																				d3.select("#bubble16").transition().duration(4000).attr("r",rad_array[10])
																				d3.select("#bubble17").transition().duration(4000).attr("r",rad_array[11]).each("end", function(){	
																				
																		
																					d3.select("#bubble5").attr("r", rad_array[0]*1.3).transition().duration(4000).attr("opacity",1).attr("fill","#91C85B").attr("r",rad_array[0]) //come in from outside and shrink first bubble.  
																					d3.select("#bubble6").transition().duration(4000).attr("r",rad_array[1])																	
																					d3.select("#bubble7").transition().duration(4000).attr("r",rad_array[2])																	
																					d3.select("#bubble8").transition().duration(4000).attr("r",rad_array[3])																	
																					d3.select("#bubble9").transition().duration(4000).attr("r",rad_array[4])																	
																					d3.select("#bubble10").transition().duration(4000).attr("r",rad_array[5])																	
																					d3.select("#bubble11").transition().duration(4000).attr("r",rad_array[6])
																					d3.select("#bubble12").transition().duration(4000).attr("r",rad_array[7])
																					d3.select("#bubble13").transition().duration(4000).attr("r",rad_array[8])
																					d3.select("#bubble14").transition().duration(4000).attr("r",rad_array[9])
																					d3.select("#bubble15").transition().duration(4000).attr("r",rad_array[10])
																					d3.select("#bubble16").transition().duration(4000).attr("r",rad_array[11])
																					d3.select("#bubble17").transition().duration(4000).attr("r",rad_array[12]).each("end", function(){
																						
																							
																						d3.select("#bubble4").attr("r", rad_array[0]*1.3).transition().duration(4000).attr("opacity",1).attr("fill","#5A5C1F").attr("r",rad_array[0]) //come in from outside and shrink first bubble.  
																						d3.select("#bubble5").transition().duration(4000).attr("r",rad_array[1])																																						
																						d3.select("#bubble6").transition().duration(4000).attr("r",rad_array[2])																	
																						d3.select("#bubble7").transition().duration(4000).attr("r",rad_array[3])																	
																						d3.select("#bubble8").transition().duration(4000).attr("r",rad_array[4])																	
																						d3.select("#bubble9").transition().duration(4000).attr("r",rad_array[5])																	
																						d3.select("#bubble10").transition().duration(4000).attr("r",rad_array[6])																	
																						d3.select("#bubble11").transition().duration(4000).attr("r",rad_array[7])
																						d3.select("#bubble12").transition().duration(4000).attr("r",rad_array[8])
																						d3.select("#bubble13").transition().duration(4000).attr("r",rad_array[9])
																						d3.select("#bubble14").transition().duration(4000).attr("r",rad_array[10])
																						d3.select("#bubble15").transition().duration(4000).attr("r",rad_array[11])
																						d3.select("#bubble16").transition().duration(4000).attr("r",rad_array[12])
																						d3.select("#bubble17").transition().duration(4000).attr("r",rad_array[13]).each("end", function(){	})																							
																						
																						
																						
																						
																						
																						
																		
																							})	
																				
																				
																				})																			
																				
																				
																				
																			})																		
																			
																			
																			})																		
																		
																		
															
																		
																		})
																	
																	
																	})
																
																
																})
																
//#3D8FB8,91C85B,88D7A1,CBD581,86712D,97A838,3E6722,64822B,53C6B3,39AC69,ABB83D,363312,B83D56,862D4A,C090DA,BB813E,DBC994,245C6B,14323D,A3A437, 91C85B
															
															})
													
													})
													
												})
											
											
											})
											
											
										})
									
								})
							})
						})
					})
					
				})
			})		
			
		})
		
	}

	function frame_2 (){
		
		console.log("frame 2")
		//d3.select("#bubble1").transition().duration(4000).attr("r",function(d){ return (d)*(max_r/d)}).each("end")
		//d3.select("#bubble0").transition().duration(4000).attr("fill", "green").attr("r",function(d){ return (d)*(max_r-prior_r-d/d)}).each("end")
		
		
		//keep looping through prior_r
	$(".splash_container").delay(3000).animate({opacity:0},3000)
	 //alert("hey there sexy")
	frame_1()
	
	}
	

	function getRadi(array, max_width) {
		
		var ret_array = [];
		var rad;
		
		for(i=0; i <array.length; i++) {
			//console.log(sumArrVals(array,i))
			//rad = (array[0]*(max_width*(100 - (sumArrVals(array,i)/array[0]))))
			//rad = max_width - (array[0]*(max_width*(((100 - sumArrVals(array,i))/100))/array[i]))
			rad = (max_width*((100 - sumArrVals(array,i))/100))
			//console.log(((100 - sumArrVals(array,i))/100)/array[i])
			ret_array.push(rad)
			console.log(ret_array)
		}
		console.log(ret_array)
		return ret_array;
	}
	
	
	function sumArrVals(array, ordVal) {
		
		var sum = 0;
		
		if (ordVal > array.length ) { return null}
		
		for(i=0; i < ordVal; i++) {
			
			 sum = sum + array[i];
			
		}	
		return sum;	
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