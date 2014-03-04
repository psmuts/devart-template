# 
<H4> Beauty Is Random </H4>
Random Exquisite Corpse( function(our_words): {return "Beauty"} ) 

## Author
Peter Smuts
[http://github.com/psmuts]  


## Description
"Beauty is Random" is powered by the interplay between networks,  social and technological, and random algorithms.  The project collects individual words, a word a day offered from contributors via Google+, Twitter, and Facebook and uses them as both visual and etymological seeds for the creation of dynamic network visualizations as well as sentences (funny, sad, shocking, absurd, poetic and sometimes beautiful,) constructed using the collected words and translated between most languages using Google Translate.  

Technologially, the project leverages all the latest web technologies as well as a couple machine learning classification and ranking algorithms. The project will harness the tools and techniques of "Big Data" to efficiently process and analyze project data that will be incorporated into future phases of the project.

Artistically, the project is a continuation of ideas I have been playing with for several years which concern issues of craft and concept, analog proxies for digital artifacts, authorship, ownership, and the implications, liberating and sometimes frightening, of our ever increasing connectedness.  

Finally, the project is a manifestation of what I think the future of art should, and perhaps, must be; connected, interactive, random and probabalistic, democratic, non-deterministic and... beautiful.  

## Link to Prototype
COMING SOON

[Example Link](http://www.google.com "Example Link")

## Example Code
```
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

    d3.json("corpse.json", function(error,famJSON) {
        if (error) return alert (error);
        force
            .nodes(famJSON.nodes)  
            .links(famJSON.links)  
            .start();

        var link = svg.selectAll(".link")  
            .data(famJSON.links)
            .enter().append("line")
            .attr("class", "link")

        var node = svg.selectAll(".node")  
            .data(famJSON.nodes)
            .enter().append("g")
            .attr("class", "node")
            .call(force.drag);   
```
## Links to External Libraries
[D3.js](https://github.com/mbostock)
[Bottle.py](http://bottlepy.org/)

## Images & Videos
COMING SOON
