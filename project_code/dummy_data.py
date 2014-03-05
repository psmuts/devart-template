__author__ = 'psmuts'

#explore using numpy to modify elements of word array such as rather than requerying source

#experiment, if I change the data, does D# automatically change presentation (javascript)

#When a new word comes into word universe, append to dictionary, do not create a new
import random
import io, json

i = 0
j = 0
word_map = {0:"noun",1:"verb",2:"adjective",3:"adverb"}
nodes_collection = {"nodes":[], "links":[]}
for i in range(0,1000):
    #words  1:noun,2:adjective,3:verb,4:adverb
    node_dict = {"word": word_map[j], "type": str(j), "radi":str(random.randint(1,40))}
    nodes_collection["nodes"].append(node_dict)
    link_dict = {"source": i, "target":  random.randint(0,len(nodes_collection)),"value": random.randint(1,300)}
    nodes_collection["links"].append(link_dict)
    link_dict = {"source": i, "target":  random.randint(0,len(nodes_collection)),"value": random.randint(1,10)}
    nodes_collection["links"].append(link_dict)
    link_dict = {"source": i, "target":  random.randint(0,len(nodes_collection)),"value": random.randint(1,600)}
    nodes_collection["links"].append(link_dict)
    link_dict = {"source": i, "target":  random.randint(0,len(nodes_collection)),"value": random.randint(1,10)}
    nodes_collection["links"].append(link_dict)
    link_dict = {"source": i, "target":  random.randint(0,len(nodes_collection)),"value": random.randint(1,30)}
    nodes_collection["links"].append(link_dict)
    link_dict = {"source": i, "target":  random.randint(0,len(nodes_collection)),"value": random.randint(1,1)}
    nodes_collection["links"].append(link_dict)
#be cool to generate links to each other word type

    '''
    link_dict = {"source": i, "target":  random.randint(0,len(nodes_collection)),"value": random.randint(1,10)}
    nodes_collection["links"].append(link_dict)
    link_dict = {"source": i, "target":  random.randint(0,len(nodes_collection)),"value": random.randint(1,10)}
    nodes_collection["links"].append(link_dict)
    link_dict = {"source": i, "target":  random.randint(0,len(nodes_collection)),"value": random.randint(1,10)}
    nodes_collection["links"].append(link_dict)
    '''
    if j < 2:
        j += 1
    else:
        j = 0
    i += 1

with io.open('test_3.json', 'w', encoding='utf-8') as f:
  f.write(unicode(json.dumps(nodes_collection, ensure_ascii=False)))
print(json.dumps(nodes_collection))



