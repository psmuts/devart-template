/**
 * Created by psmuts on 3/3/14.
 */
$( document ).ready(function(){

    var tick_counter = 1
    var data;
    //var width = 2400 //document.width
    //var height = 1400 // document.height

    var height = $(this).height();
	var width = $(this).width();
    var bubble_array = []
    //width = $(document).width
    //height = $(document).height

    var svg = d3.select("#splash_container").append("svg")
        .attr("width", width)
        .attr("height", height);

    var force = d3.layout.force()  //variable assinged to function.
        .gravity(.03)
        .charge(-6000)
        .linkDistance(1)
        .size([width, height])
        .linkStrength(function(d) {return d.value /100 })  //use to determine closeness for types of relations.
        .friction([.25])
        .alpha([.15])


        d3.json("data/test_3.json", function(error,famJSON) {
            if (error) return alert (error);
            force
                .nodes(famJSON.nodes)  //nodes are defined in d3.  nodes in json is arbitrary name
                .links(famJSON.links)  //links are defined in d3.  links in json is arbritrary.  but there is a nodes arrange in the json ditto the links.
                .start();


            var link = svg.selectAll(".link")  // link lines invisible.
                //.data(famJSON.links)
                //.enter().append("line")
                //.attr("class", "link")
                //.attr("fill", "#000");  //would be cool to code link based on type of relation


            var node = svg.selectAll(".node")  //build container for node (g) and assign them all to .node class
                .data(famJSON.nodes)
                .enter().append("g")
                .attr("class", "node")
                .attr("id", function(d) { return "node" + d.index })
                .call(force.drag);   //turns off dragability

            node.append("circle")  //add shape or image to container to visually represent the node .attr("class", "nodecircle")  //this is me messing around with classhere  works so now circle is external class.
                .on("mouseover", node_mouseover)
                .on("mouseout", node_mouseout)
                .attr("cx", -5)
                .attr("cy", -3)
                .attr("r", function(d) {return d.radi})
                .attr("fill", function (d) {return generateRandomColor()})  //added parameter.
                .attr("id" , function(d) {return "circle" + d.index})

            /* For node images.
             node.append("image")
             .attr("xlink:href", "https://github.com/favicon.ico")
             .attr("x", -8)
             .attr("y", -8)
             .attr("width", 16)
             .attr("height", 16);
             */

            node.append("text")  //add text to node
                .attr("dx", 0)
                .attr("dy", 0)
                .attr("id", function(d) { return "text" + d.index })
                .text(function(d) { return d.word });  //name is key in the json file, return is the value.

            force.on("tick", function() {  //I think I have to mess around in here to ge them to not overlap.
                link.attr("x1", function(d) { return d.source.x })
                    .attr("y1", function(d) { return d.source.y })
                    .attr("x2", function(d) { return d.target.x })
                    .attr("y2", function(d) { return d.target.y });
                node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
                    //.attr("transform", function(d) { return "translate(" + (d.radi / 5)* Math.random()/100000 + ")"});
                counter_1_functions()
                force.start()
            });



    function startForce(){
        //force.start()
        force
            .gravity(Math.random())
            .charge(Math.random() * -4000)
            .linkDistance(Math.random() * 100)
            //.size([width, height])
            .linkStrength(function(d) {return d.value /100 })  //use to determine closeness for types of relations.
            //.friction([.65])
            .friction([Math.random()])
            .alpha([.5])
        force.start()
        //console.log(force.charge)
        //console.log(force.linkDistance)
        //force.stop();
    }


    function counter_1_functions(){

        //ADD ONE TO RANDOMLY CHANGE COLOR AND SIZE OF NODES AS WELL AS AN OCCASIONAL POSITION BUMP

        if (tick_counter % 10 == 0) {
            //this is great and broadly applicable.  assign id to each dom element based on data.
            //select element using #id.  Use for colors.
            //for testing, make REST call to get a single word.  In production use REST and load new data then transition in.
            //Can also use this to isolate a single word/node/bubble and 'pop' it
            mindex = Math.floor(Math.random() * 1000)
            mword = ''
            $.getJSON("/singleword",
                function(data) {
                    $.each(data.words,function(index,element) {
                        mword = element.word
                        console.log("This Word: " + d3.select("#text" + mindex).text())
                        d3.select("#text" + mindex).text(mword)
                        console.log("Changed to: " + d3.select("#text" + mindex).text())

                    })
                })

            //rollout colors// this will go on a different timer when implemented.
            d3.select("#circle" + mindex).transition().duration(10000).attr("fill",colorbrewer.PiYG[9][Math.floor(Math.random() * 10)])

        }

        //Get Sentence
        if (tick_counter == 100) {
			//$("#high_text").css("left", "0px").html("When you think of the economy of the West...").animate({opacity:1, top: "30%",left: ((width/2) - 300)},6000)
            $.getJSON("/getsentence",
                //return json object
                function(data){
                    //$.each(data.sentence
                    console.log("Banner Updated")
                    console.log(data.sentence)
                    //$("#high_text").css("opacity", "0").html(data.sentence).animate({opacity:.5, top: "85%",left: ((width/2 - 600))},6000)
                    $("#high_text").css("opacity", "0").html(data.sentence).animate({opacity:.9},6000)
                });
        }

        if (tick_counter == 100) {
            startForce()
            tick_counter = 0
            mindex = Math.floor(Math.random() * 1000) //store index and radi values, add to array
            old_r = d3.select("#circle" + mindex).attr("r")
            console.log(mindex)
            console.log(old_r)
            bubble_array.push([mindex,old_r])
            console.log(bubble_array)
            bubble_size =  Math.floor(Math.random() * 121) + 100;
            d3.select("#circle" + mindex).transition().duration(10000).attr("r", bubble_size)  //vary bubble size.  change time intervals
            d3.select("#text" + mindex).transition().duration(10000).style("font-size","2vh")
            console.log(d3.select("#node" + mindex).attr("x"))
            //d3.select("#node" + mindex).transition().attr("cy",100)



            if (bubble_array.length > 4) {
                pop_bubble = bubble_array.shift()
                console.log("Bubble Popping")
                console.log (pop_bubble[0])
                console.log (pop_bubble[1])

                d3.select("#circle" + pop_bubble[0]).transition().duration(10000).attr("r", pop_bubble[1])
                //d3.select("#text" + pop_bubble[0]).transition().duration(10000).style("font-size",".5vh")
            }


        }
        tick_counter ++
    }


    function generateRandomColor(){

        var r = (Math.round(Math.random()* 127) + 127).toString(16);
        var g = (Math.round(Math.random()* 127) + 127).toString(16);
        var b = (Math.round(Math.random()* 127) + 127).toString(16);
        return '#' + r + g + b;

    }

    function node_mouseover(d) {

        console.log("Node mouseover")
        console.log(d)
        //will be able to add popups here.
        //d3.select(this).transition().duration(250).attr("r", "40px")
        d3.select(this).transition().duration(250).attr("r", (200))
    }

    function node_mouseout(d) {

        console.log("Node mouseover")
        console.log(this)
        //will be able to add popups here.
        d3.select(this).transition().duration(250).attr("r", (d.radi))
    }
    });

});