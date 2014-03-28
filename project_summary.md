# Beauty Is Random

Random Exquisite Corpse ( function(our_words): {return "Beauty"} )


## Author

Peter Smuts http://github.com/psmuts


## Description

"Beauty is Random" is powered by the interplay between networks,  social and technological, and randomizing algorithms and language.  The project collects individual words, word offered by participants via Google+, Twitter, and Facebook; words collected from Google Trends and finally, a randomized selection of words from the Oxford English Dictionary.  These words become both visual and etymological seeds for the creation of dynamic network visualizations and 'exquisite corpse' sentences (funny, sad, shocking, absurd, poetic and sometimes beautiful) constructed using the collected words.  

Technologically, the project leverages dynamic web technologies as well as a couple machine learning classification and ranking algorithms. The project will harness the tools and techniques of "Big Data" to efficiently process and analyze project data that will be incorporated into future phases of the project.

Technologially, the project leverages Google App Engine running python backend and HTML5,CSS3,JS browser stack.  Future iterations of the project will harness "Big Data" techniques to efficiently process and analyze project data that will be incorporated into future phases of the project.

Participants will be contribute to the project via social media by placing #beautyisrandom tag before their contributed word and an optional word type identifier.  i.e. #BeautyisRandom snuffaluffagus noun.  Contributed words will immediately flash onto the projected scene, in real time (or as fast as they propagate from the various social networks.) I love the idea of visitor to the museum posting words from their smartphones and seeing their words become part of the art in realtime.

Artistically, the project is a continuation of ideas I have been playing with for several years concerning issues of craft and concept, analog proxies for digital artifacts, authorship, ownership, and the implications, liberating and sometimes frightening, of our ever increasing connectedness.  

Finally, the project is a manifestation of what I think the future of art should, and perhaps, must be; connected, interactive, random and probabilistic, democratic, non-deterministic and... beautiful. 

## Link to Prototype

[http://psmutstest.appspot.com/devart1](http://psmutstest.appspot.com/devart1 "Devart Link")

## Example Code

```

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

    var force = d3.layout.force()  
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

   
```

## Links to External Libraries

[D3.js](https://github.com/mbostock)
[Bottle.py](http://bottlepy.org/)
[Colorbrewer.js](http://colorbrewer2.org/)
[Wordnik](http://developer.wordnik.com)


## Images & Videos



