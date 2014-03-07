// JavaScript Document

$( document ).ready(function(){
	
	var animation_on = true;
	
	var popup_new = $('.tooltip')
		popup_new.hide()
	
	//var ds_sector = [1,19,3,19,8,5,5,1,5,5,5,5,2,2,3,5,7,5,5]  //place holder dataset  this will come from some other dataset.  
	var ds_sector = [14.1,11,9.6,8.7,7.9,7.3,6.7,5.8,4.3,3.7,3.6,2.9,2.9,2.3,1.6,1.3,.9,5.2]
	var ds_sector_len = ds_sector.length
	
	//var ds_text = ["The West is about Agriculture and Resource Extraction","The economic value of these economic sectors is $10,00000", "Lets look at some other sectors."]  //SCRIPTCONTENT ARRAY  
	
	var ds_colors = ['FF7400','9BA136','957B32','B8B43D','2D6D66','C6D175','EBEA31','979710','1F9286','B3D581','FCF216','F8F1A6','65D8CC','6E9D41','F8ED73','91D8D1','EBDC31','9FDB2E'];
	
	var ds_sector_names = ['Mining, Ag, Foresty, Fishing','Education Services','Arts and Enterainment','Utilities','Management of Companies and Enterprises','Other services, non-government','Transportation and Warehousing','Administrative and Waste Management','Accomodation and Food Services','Construction','Wholesale Trade','Retail Trade','Health Care and Social Assistance','Finance and Insurance','Manufacturing','Information','Professional, Scientific and Technical Services','Real Estate Rental and Leasing'];

	//var ds_colors = ['FF8D19','9BA136','957B32','B8B43D','2D6D66','C6D175','EBEA31','979710','1F9286','B3D581','FCF216','F8F1A6','65D8CC','6E9D41','F8ED73','91D8D1','EBDC31','9FDB2E'];

	//populate legend.  
	
////MOVE		
	
	
/////	
	
	
	for (var i = ds_sector.length - 1; i > -1 ; i--) { 	
		// <div class="colour-legend-box" id= "legend-box-1" style="background: #065682"></div>
		console.log(ds_colors[i])
		//$("#colour-legend").append("<div class='colour-legend-box' id= 'legend-box-'" + i + " style='background:" + range_row[0][i - 1] + "' ></div>")
		
		d3.select("#legend_text_container")	
			.append("div")
			.attr("class","legend_text")
			.text(ds_sector_names[i])
		
		
		d3.select("#legend_icon_container")
			.append("div")
			.attr("class","legend_box")
			.attr("id", i )
			.style("background-color","#" + ds_colors[i])
			.on("mouseover",legend_mouseover)
			.on("mouseout", legend_mouseout)

		}
	

	var height = $(this).height();
	var width = $(this).width();
	
	var max_r = .4 * height;
	var rad_array = getRadi(ds_sector, max_r)  //projected radius array

	
	
	var svg = d3.select(".splash_container").append("svg")
			.attr("width", width)
			.attr("height", height)
	
	var bubble_container = svg.append("g")
			.attr("class", "bubble_container")  //bubbles 
	
	bubble_container.selectAll("bubble")
			//.data(ds_sector)
			.data(ds_sector)
			.enter().append("circle")
			.attr("class", "bubble")
			.attr("id", function(d,i) {return "bubble" + (ds_sector_len -1 - i)}) //invert order
			.attr("r", function (d) {return d})				//this will all move elswewhere, I hinkl
			//.attr("r", project_r(ds_sector, max_r, function(d,i){ds_sector_len -1 - i})) 
			.attr("cy", height/2)
			.attr("cx", width/2)	
			//.attr("fill", "#6BE400")
			.attr("opacity", 0)				//refer to bubble data
			.on("mouseover",bubble_mouseover)
			.on("mouseout", bubble_mouseout)
	
	for (i-=0; i< ds_sector.length; i++) {
		
		console.log("Projected Radius = " + project_r(ds_sector,max_r,i))
		
		
		}
				
	chapter_1();
	
	function chapter_1(){
		
		console.log($("#high_text").css("left"))
		console.log($("#high_text").css("right"))
		
		$(".splash_container").animate({opacity:1},500,function(){
			
			$("#high_text").css("left", "0px").html("When you think of the economy of the West...").animate({opacity:1, top: "30%",left: ((width/2) - 300)},6000, function(){
				  
				$("#high_text").animate({opacity:0},500)				
				
				d3.select("#bubble0").attr("r", "20px").transition().duration(3000).attr("fill","#FF7400").attr("opacity", .8).each("end", function(){
				
					$("#high_text").html("you probably think of ranches, minerals, gas, oil, wheat and gold...").animate({opacity:1},4000)
						
						d3.select("#bubble0").transition().duration(2000).attr("r",rad_array[0]).each("end", function(){

							$("#high_text").delay(3000).animate({opacity:0},500, function(){
							
								$("#high_text").html("Those sectors are significant and account for $X00B in annual economic activity across the Rocky Mountain West").animate({opacity:1},3000, function(){
									
									$("#high_text").delay(2000).animate({opacity:0},500, function(){

												$("#high_text").html("but ranching, mining and forestry and agriculture represent a relatively small percentage of overall economic activity...")
													.css("text-align", "left")
													.css("font-size","34px")
													.css("width", "350px")
													.animate({opacity:1, left: "2%",top:"30%"},2000)	//add legend
														
															animation_on = false;
					
															$("#legend_container").animate({opacity:1, top: (height - 650 )/2},3000)
															$(".app_description").animate({opacity:1, bottom: 0, left: (width - width*.8)/2},3000)
															$("#header").animate({opacity:1, top: "2%", left: (width - width*.8)/2},3000, function (){
																
																chapter_2();
																
																})
																								
										})
									})
								})
						
							})
					
						})
					})		
			
				})
		
	}

 	function chapter_2 () {
		
		$("#high_text").delay(2000).animate({opacity:0},500, function(){
	
			bubbleTransition(ds_sector,6)
										
			$("#high_text").html("Travel and entertainment, management services, construction and wholesale trade account for x%").animate({opacity:1},6000, function(){
				
				chapter_3();
				
			})
		})
	}
	
	
	function chapter_3 () {
		
		
	$("#high_text").delay(2000).animate({opacity:0},500, function(){
	
			bubbleTransition(ds_sector,12)
										
			$("#high_text").html("Healthcare, manufacturing, finance, and information services account for x%").animate({opacity:1},6000, function(){
				
				chapter_4();
				
			})
		})
	}		
	
	
	function chapter_4 () {
		
		
	$("#high_text").delay(2000).animate({opacity:0},500, function(){
	
			bubbleTransition(ds_sector,17)
										
			$("#high_text").html("Professional services, scientific research, academic institutions and real estate account for the remaining x%").animate({opacity:1},6000, function(){
				
				chapter_5();
				
			})
		})
	}	
	
	
	function chapter_5 () {
		
		
	$("#high_text").delay(2000).animate({opacity:0},500, function(){
	
			//bubbleTransition(ds_sector,17)
										
			$("#high_text").html("Agriculture, forestry, mining, hunting and fishing account for about 5% of overall economic activity.  Exlpore the data for more detailed information.").animate({opacity:1},6000, function(){				
			$("#high_text").delay(4000).animate({opacity:0},500)
				//chapter_5();
				
			})
		})
	}	
	


////////////// /////////////////

function project_r(array, max_r, position) {
		
		rad = (max_r*((100 - sumArrVals(array,position))/100))
		return rad;
		}



	function bubbleTransition(array, cnt) {

		for (i = cnt; i > -1  ;i--) {
			if (i == cnt) {		
				console.log("equals #bubble = " + i)
				d3.select("#bubble" + i).attr("r", rad_array[0]*1.3).transition().duration(4000).attr("opacity",.8).attr("fill","#" + ds_colors[i]).attr("r",rad_array[0]) //add newest bubble.  transition prior bubbles.  select.  newbubble always gets rad_array[0] 
			} 
			else {
				d3.select("#bubble" + i).transition().duration(4000).attr("opacity",.8).attr("fill","#" + ds_colors[i]).attr("r", +rad_array[cnt - i])
			}
		}
	}
	
	
	$("#toggle_view").click(function(event) { 
		
			
			if ($(this).prop("checked")){ //hide page container class and color image... 
				
					$("#legend_container").hide()
					$(".app_description").hide()
					$("#header").hide()
																				
				
				}
			else { 
			
					$("#legend_container").show()
					$(".app_description").show()
					$("#header").show()
										
			
			
			}
			
		})

	$(window).resize(function(){

		
		if (animation_on) {}
					else {
			
			width = $(document).width()
			height = $(document).height()
				
			$(".splash_container")
				.css("height", height)
				.css("width",width);
				
			bubble_container.selectAll(".bubble")
				.attr("cy", height/2)
				.attr("cx", width/2)
			
			//$("#legend_container").css("top" (height - 650 )/2)

					
	
			
			}
	})





//////helper functions  ///////

	function getRadi(array, max_width) {
		
		var ret_array = [];
		var rad;
		//i = 0;
		for(i=0; i <array.length; i++) {
			//console.log(sumArrVals(array,i))
			//rad = (array[0]*(max_width*(100 - (sumArrVals(array,i)/array[0]))))
			//rad = max_width - (array[0]*(max_width*(((100 - sumArrVals(array,i))/100))/array[i]))
			rad = (max_width*((100 - sumArrVals(array,i))/100))
			//console.log(((100 - sumArrVals(array,i))/100)/array[i])
			ret_array.push(rad)
		}
		return ret_array;
	}
	
	
	function sumArrVals(array, ordVal) {
		
		var sum = 0;
		
		if (ordVal > array.length ) { return null}
		//i = 0
		for(i=0; i < ordVal; i++) {
			
			 sum = sum + array[i];
			
		}	
		return sum;	
	}


	function bubble_mouseover (d,i) {
		
			if (animation_on) {}
			else {
				d3.select(this).attr("opacity",1)
								
				var popupheader = $(".ttheader")
						popupheader.html("<p>" + ds_sector_names[ds_sector_names.length - 1 - i] + " accounts for " + d +"%</p>")
	
				var popupbody = $(".ttbodycontainer")
						popupbody.html("Summary info and links to addional research go here.")
			
				popup_new
					.css("left",(d3.event.pageX ) + 20 + 'px')
					.css("top", (d3.event.pageY) + 20 + 'px')
					.show();
					//.toggle(0, '',function(){		
						/*popupbody.delay(500);
						popupbody.animate({height : '150px', opacity: 1},400); */
					//});

			}
		
	}
	


	function bubble_mouseout (d) {
		
			if (animation_on) {}
			else {
				
				d3.select(this).attr("opacity",.8)
				popup_new.hide()

				}
	}


	function bubble_mousemove(d) {
		
		
		//$(".ttdeeper").css("top","-50px").css("left","-45px")
			popup_new	
					.css("left",(d3.event.pageX ) + 20 + 'px')
					.css("top", (d3.event.pageY)  + 20 + 'px')
		
		
		}



	function legend_mouseover(d) {
		
		var $this = $(this)	
		$this.css("opacity", 1)
		d3.select("#bubble" + $this.prop("id")).attr("opacity",1)
		
		
		//console.log(d3.select("#bubble" + $this.prop("id")).attr("r"))
		
		var popupheader = $(".ttheader")
		//popupheader.html("<p>" + ds_sector_names[ds_sector_names.length - 1 - i] + " accounts for " + d +"%</p>")
		popupheader.html("<p>" + ds_sector_names[$this.prop("id")] + " accounts for " + ds_sector[ds_sector.length - 1 - (+$this.prop("id"))]+ "%</p>")

		var popupbody = $(".ttbodycontainer")
			popupbody.html("Summary info and links to addional research go here.")
			
		popup_new
			.css("left",(d3.select("#bubble" + $this.prop("id")).attr("cx")) + 'px')
			.css("top", (d3.select("#bubble" + $this.prop("id")).attr("cy")) - (d3.select("#bubble" + $this.prop("id")).attr("r")) + 'px')
			.show();

		}
		
		
		
	function legend_mouseout(d) {
		
		var $this = $(this)	
		$(this).css("opacity",.8)
		d3.select("#bubble" + $this.prop("id")).attr("opacity",.8)
		
		popup_new.hide()	
		
		
		}
		
		
});