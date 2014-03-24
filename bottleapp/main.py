"""`main` is the top level module for GAE Bottle application.
"""
# Template must 'have a place' for every variable passed to them, if not server cannot parse = error

# import the Bottle framework

import bottle
from bottle import Bottle
#from bottle import template
import json
from json import JSONEncoder
import random
import io
import csv
import cgi
import wordsDAO


app = Bottle()

with open("local_data/words.json", 'rb') as word_json:
    word_dict = json.load(word_json)

word_cnt = len(word_dict["words"])
#pandas not supported, so use numpy

words = wordsDAO.Words(word_dict)

#use list comprehension to create separate lists of each type:  #worry about memory issues later.
#I assume there is a way to load the word dict and lists once to be used by all
#threads.

#store lists in an array in memory, corresponding to word type index.

#print word_dict[0]["word"] #no filter for type though, that is the problem.
#I could load separate dicts of every type.
#store and array of dicts, selected random value from dict based on array index of container.



@app.route('/')
def index():
    #Generate nodes.json for bubbles. These are for visuals only.

    #Could flag this to set time of refresh.
    generateNodes("local_data/words.json","data/test_3.json")
    #generateNodes2("local_data/words.csv","data/test_3.json")
    #return bottle.template('devartv1', username = 'Peter')
    return bottle.template('devartv1')

@app.post('/testpost')
def sign():
    testval = bottle.request.forms.get("most_favorite_thing")
    return testval
    #OK, all works.  pass parameter back.  Try a rest API

@app.get('/template')
def testtemplate():
    return bottle.template('test',{"mosty_tpl" : "Butterscotch", "leasty_tpl" : "Liver"})

@app.get('/testrest')
def testrest():
    return bottle.template('testrest')


@app.get('/resty/<number>')
def resty(number="notfound"):
    number = cgi.escape(number)
    return returnWords(number)

@app.get('/singleword')  #rest API
def single_word():
    #print "GET SINGLE"
    return words.get_random(1)
    #return returnWords(1)


@app.get('/getsentence')  #rest API
def get_sentence():

    return words.get_sentence()

@app.route('/devart1')
def devart1():
    #return "This is a test route"
    my_things = ['KTM 350 XCF-W','BMW F800GS','Dodge Sprinter']
    #return bottle.TemplateError + bottle.TemplatePlugin
    return bottle.template('devartv1', username = 'Peter')
    #return testtemplate


@app.error(404)
def error_404(error):
  """Return a custom 404 error."""
  return 'Bummer, there is nothing at this URL.'

def generateNodes(infile,outfile):
    #Should load into memory for use throughMarkout app

    ##This moved and loads words file into memory when application is initialized.
    ##remember that when adding dynamic words from social networks.
    #with open(infile, 'rb') as word_json:
    #    word_dict = json.load(word_json)
    #word_cnt = len(word_dict["words"])
    #print word_cnt

    i = 0
    j = 0
    #word_map = {0:"noun",1:"verb",2:"adjective",3:"adverb"}
    nodes_dict = {"nodes":[], "links":[]}
    for i in range(0,1000):
        #print i
        word_index = random.randint(1,word_cnt)
        node_dict = {"word": word_dict["words"][word_index]["word"], "index" : i ,"type": word_dict["words"][word_index]["type"], "radi":str(random.randint(1,48))}
        nodes_dict["nodes"].append(node_dict)
        link_dict = {"source": i, "target":  random.randint(0,len(nodes_dict)),"value": random.randint(1,300)}
        nodes_dict["links"].append(link_dict)
        link_dict = {"source": i, "target":  random.randint(0,len(nodes_dict)),"value": random.randint(1,10)}
        nodes_dict["links"].append(link_dict)
        link_dict = {"source": i, "target":  random.randint(0,len(nodes_dict)),"value": random.randint(1,600)}
        nodes_dict["links"].append(link_dict)
        link_dict = {"source": i, "target":  random.randint(0,len(nodes_dict)),"value": random.randint(1,10)}
        nodes_dict["links"].append(link_dict)
        link_dict = {"source": i, "target":  random.randint(0,len(nodes_dict)),"value": random.randint(1,30)}
        nodes_dict["links"].append(link_dict)
        link_dict = {"source": i, "target":  random.randint(0,len(nodes_dict)),"value": random.randint(1,1)}
        nodes_dict["links"].append(link_dict)

        if j < 2:
            j += 1
        else:
            j = 0
        i += 1

    #with io.open("data/peter.json", "w" ,encoding='utf-8') as p:
    #    p.write(JSONEncoder().encode(nodes_dict))

    with io.open(outfile, 'w', encoding='utf-8') as f:
        f.write(unicode(json.dumps(nodes_dict, ensure_ascii=False)))

    #print(json.dumps(nodes_collection))

    f.close()
    word_json.close()
    #return nodes_collection

def updateNodes(infile,outfile):
    None
