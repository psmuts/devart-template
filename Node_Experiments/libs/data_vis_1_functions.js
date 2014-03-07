// JavaScript Document



function zoommove() {
	// alert("moving")  //getting here.  
  projection.translate(d3.event.translate).scale(d3.event.scale);
  counties.selectAll("path").attr("d", path);
  states.selectAll("path").attr("d", path);  
  stateLabels.selectAll("text")
  	.attr('dx', function (d) {return projection ([d.geometry.coordinates[0],d.geometry.coordinates[1]]) [0] - 20;})
	.attr('dy', function (d) {return projection ([d.geometry.coordinates[0],d.geometry.coordinates[1]]) [1];})
}
  

function mouseover(d) {
	
	//alert (d.id);
	
	//tooltip info here!!!  custom class.  show hide....  outside D3????
	}
	
	
function filterData(dataSet,rowName,value) {
	//this will allow us to filter on any parameter in the csv file.   Yeah.  We can then load 
		var dataSetFiltered;
		dataSetFiltered = dataSet.filter(function (row) {
			
			return  row[rowName] == value;
		
		})
	return dataSetFiltered;
	}
	
	
function loadDataMap(dataSet) {
	//don't see why we need to do this map thing, something to do with inconsistency in how browsers parse...  
	// I will change this to use indexes and send entire set to the map every 
	
	//here is where I can load the appropriate data map id:data pair for each specific cholorpleth.
	
	//for now build all separately.    
	
	//I think I can only do ID::Rate or ID: ??  can't have other values 
	 		for (var i = 0; i < dataSet.length; i++) {
			//change name of rateById to selectedDataById
				rateById.set(dataSet[i].id, +dataSet[i].rate);
	
			}
	}
	
function click(d) {  
	  
	  //now need to move this all to new place for proper structure.  

	if (yr == "2011" ) {yr = "2012"} else if (yr == "2012" ) {yr = "2011"}  //this will be replaced by slider/input value... 

		unemployment_filtered = filterData(unemployment_data,'year',yr);

		loadDataMap(unemployment_filtered)

		counties
    	.selectAll("path")
      	.data(topojson.object(usMapData, usMapData.objects.counties).geometries)
		.transition()
		.duration(2000)
        //.style("fill", function(d) { return fill(path.area(d)); });  //test up to here using area fill to color.  Then bind to rateById map.  
	  	//.attr("class", function(d) { return quantize(rateById.get(d.id)); })  //class usage.  see <style> above.
   		.style("fill", function(d) { return unemploymentColors(rateById.get(d.id)); })  //threshold usage.   
}