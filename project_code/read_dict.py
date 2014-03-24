__author__ = 'psmuts'
import json
import random
import csv



dictionary = open("dictionary.json")
json_dictionary = json.load(dictionary)

exquisite_array = []
cnt = 0

#$used to create list of wors only
'''
with open('words.csv', 'wb') as f:
    writer = csv.writer(f)
    for word in json_dictionary:
        print word
        writer.writerow([word])
        cnt += 1
        #print json_dictionary[word]
print cnt
'''
#need to add check for double word "words." eliminate
'''
with open("words.csv") as words:
    word_data = words.readlines()

for i in range(0,1000):
    index = random.randint(1,len(word_data))
    print index

    print word_data[index]
    exquisite_array.append(word_data[index])

print exquisite_array
print exquisite_array[0]

'''

nodes_collection = {"nodes":[]}

with open("words.csv") as words:
    word_data = words.readlines()

for i in range(0,1000):
    index = random.randint(1,len(word_data))
    #print index
    node_dict = {"word":word_data[index]}
    #print word_data[index]
    nodes_collection["nodes"].append(node_dict)

print nodes_collection

#modify to create words array for bubble, distributed roughly by word type

#modify to create separate arrays of words, each by type.

#STEP 1:  GENERATE NODES.JSON  THIS IS JUST FOR APPEARANCE.  SEPARATE FROM WORDS ACTUALLY USED.  INTERMITTANTLY UPDATED.

#word_type:

#word_source:

