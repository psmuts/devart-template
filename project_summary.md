# Beauty Is Random

Random Exquisite Corpse ( function(our_words): {return "Beauty"} )


## Author

Peter Smuts http://github.com/psmuts


## Description

"Beauty is Random" is powered by the interplay between networks,  social and technological, and random algorithms.  The project collects individual words, word offered by participants via Google+, Twitter, and Facebook; words collected from Google Trends and finally, a randomized selection of words from the Oxford English Dictionary.  These words become both visual and etymological seeds for the creation of dynamic network visualizations and 'exquisite corpse' sentences (funny, sad, shocking, absurd, poetic and sometimes beautiful) constructed using the collected words and translated between languages using Google Translate.  

Technologically, the project leverages dynamic web technologies as well as a couple machine learning classification and ranking algorithms. The project will harness the tools and techniques of "Big Data" to efficiently process and analyze project data that will be incorporated into future phases of the project.

Artistically, the project is a continuation of ideas I have been playing with for several years which concern issues of craft and concept, analog proxies for digital artifacts, authorship, ownership, and the implications, liberating and sometimes frightening, of our ever increasing connectedness.  

Finally, the project is a manifestation of what I think the future of art should, and perhaps, must be; connected, interactive, random and probabilistic, democratic, non-deterministic and... beautiful. 

Something about creativity being provoked by unexpected, unpredictable relations of ideas... 

## Link to Prototype
COMING SOON

[Example Link](http://www.google.com "Example Link")

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
[Wordnik](http://developer.wordnik.com/)\

## Images & Videos


