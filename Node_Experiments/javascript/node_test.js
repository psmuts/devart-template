/**
 * Created by psmuts on 3/3/14.
 */
$( document ).ready(function(){

    var tick_counter = 1
    var data;
    var width = 2000,
        height = 2000

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

    var force = d3.layout.force()  //variable assinged to function.
        .gravity(.3)
        .charge(-5000)
        .linkDistance(20)
        .size([width, height])
        .linkStrength(function(d) {return d.value /100 })  //use to determine closeness for types of relations.
        .friction([.45])
        .alpha([.5])

    d3.json("family.json", function(error,famJSON) {
        if (error) return alert (error);
        force
            .nodes(famJSON.nodes)  //nodes are defined in d3.  nodes in json is arbitrary name
            .links(famJSON.links)  //links are defined in d3.  links in json is arbritrary.  but there is a nodes arrage in the json ditto the links.
            .start();


        var link = svg.selectAll(".link")  // link lines are alone hre.  but could build a g container as well to add text.  assigned to .link class
            .data(famJSON.links)
            .enter().append("line")
            .attr("class", "link")
        //.attr("fill", "#000");  //would be cool to code link based on type of relation


        var node = svg.selectAll(".node")  //build container for node (g) and assign them all to .node class
            .data(famJSON.nodes)
            .enter().append("g")
            .attr("class", "node")
            .call(force.drag);   //turns off dragability

        node.append("circle")  //add shape or image to container to visually represent the node .attr("class", "nodecircle")  //this is me messing around with classhere  works so now circle is external class.
            .on("mouseover", node_mouseover)
            .on("mouseout", node_mouseout)
            .attr("cx", -5)
            .attr("cy", -3)
            .attr("r", function(d) {return d.radi})
            .attr("fill", function (d) {return generateRandomColor()})  //added parameter.

        /*	  //if you want mages.
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
            //.attr("fill" , "Red")  //create function to return color based on data.  Ditto for size.
            .text(function(d) { return d.name });  //name is key in the json file, return is the value.

        force.on("tick", function() {  //I think I have to mess around in here to ge them to not overlap.
            link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });
            node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
                //.attr("transform", function(d) { return "translate(" + (d.radi / 5)* Math.random()/100000 + ")"});
            test_func()
            force.start()
        });

    //while (keepmoving == 1) {

    function startForce(){
        //force.start()
        //use the index of the circle array to play with radius.  let d3.force engine handle physics.
        //this should also check for new words in cloud.
        d3.selectAll("circle").transition().duration(2000).attr("r", Math.random() * 50)
        force
            .gravity(.3)
            .charge(-5000)
            //.linkDistance(20)
            //.size([width, height])
            .linkStrength(function(d) {return d.value /100 })  //use to determine closeness for types of relations.
            .friction([Math.random()/2])
            .alpha([.5])
        force.start()
        //force.stop();
    }


    function test_func(){
        //node.attr("r", Math.random() * 100)
        //loop through collection of all present nodes...
        //need to loop through all circles, get current radius of all existing and shape them.
        //based on some algo
        if (tick_counter == 300) {
            startForce()
            tick_counter = 0
            //d3.selectAll("circle").attr("r", Math.random() * 100)
            //force.start()
            //could add delay
            //console.log (d3.selectAll("circle").attr("r"))
        }
        tick_counter ++
        //add counter to look for new data and reload nodes.  check on cycle, something.  real time.
        console.log(tick_counter)
        //consider adding events to svg, timer to control this ... all doable.
    }
    function generateRandomColor(){

        var r = (Math.round(Math.random()* 127) + 127).toString(16);
        var g = (Math.round(Math.random()* 127) + 127).toString(16);
        var b = (Math.round(Math.random()* 127) + 127).toString(16);
        return '#' + r + g + b;

    }

    function node_mouseover(d) {

        console.log("Node mouseover")
        console.log(d.radi)
        //will be able to add popups here.
        //d3.select(this).transition().duration(250).attr("r", "40px")
        d3.select(this).transition().duration(250).attr("r", (d.radi * 2))
    }

    function node_mouseout(d) {

        console.log("Node mouseover")
        console.log(this)
        //will be able to add popups here.
        d3.select(this).transition().duration(250).attr("r", (d.radi))
    }
    });

});