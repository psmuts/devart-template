__author__ = 'psmuts'

#FINISH DATA SCIENCE.  HARD CODE A SENTENCE GeneratorExit  CATCH UP ON CLASSES.

class generate_corpse:
    import random
    words = []
    used_words = []
    schema = []

    def __init__(self, schema_length,words):
        self.schema_length = schema_length
        self.word = words

    def generate_wordlist(self):
        if self.schema_length == len(self.words):
            return self.words #do we take out return, just set the state instead.
        elif self.schema_length > 4 :
            self.words = [0,1,2,3]
            return self.words
        else:
            self.words.append(len(self.words))
            return generate_wordlist(self.schema_length,self.words)




#tha all works.  turning into a class..
#this little script could create a book of infinite length of non-repeating word types.  Pretty cool.
import random


def generate_wordlist(schema_length,m_words):  #wordcount max if 4.  error check
    if schema_length == len(m_words):
        return m_words
    elif schema_length > 4 :
        m_words = [0,1,2,3]
        return m_words
    else:
        m_words.append(len(m_words))
        return generate_wordlist(schema_length,m_words)


schema_length = random.randint(1,8)

print schema_length

words = []
words = generate_wordlist(schema_length,words)
print words
used_words = []
schema = []
prior_word = None

for i in range(0,schema_length):
    print "count" + str(i)
    print "Words"
    print words
    print "Used Words"
    print used_words
    print "Schema"
    print schema
    print "Prior Word"
    print prior_word
    while True:
        word_index = [random.choice(words) for _ in range(1)]
        if word_index[0] != prior_word:
            schema.append(word_index[0])
            prior_word = word_index[0]
            break
    #print words
    if len(words) == 1:
        words = used_words
    else:
        used_words.append(word_index[0])
        words.remove(word_index[0])


print schema


'''
!!!! IN MAIN ,ACTUAL WORD SELECTION.  CREATE ARRAY VECTORS OF EACH WORD TYPE THEN CHOOSE RANDOMLY FROM THE VECTOR.  SO EASY

FOR NOW USE RANDOM.CHOICE FOR SELECTION
USE RANDOM.RANDINT FOR 0,12 FOR schema_length
#build sentence now
using numpy/pandas, slice my python dictionary of words into array vectors based on word_type and randomly selected a word
return sentence with actual words rather than numbers, may be able to query panda table, but easier to convert json to bytearray
and mainipulate that way.
load into div and animate to screen.


#could just use a dictionary.

def generate_schema(schema_length,words):

    None

sentence = [0,4,2,3,0]

print generate_schema(6,words)

def del_dups():
    schema =  [random.choice(words) for _ in range(schema_length)]
    prior = None
    for i in range(0,schema_length):
        if schema[i] == prior:  # elim single duplicate pair.  need to also ensure use of all if all.
            return generate_schema(schema_length,words)
        else:
            prior = schema[i]
    return schema



    #TEST POP DIV GRAPHICS


    Generate word on server and send to browser via REST API
'''