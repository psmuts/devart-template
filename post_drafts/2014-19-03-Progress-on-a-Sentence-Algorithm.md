So I worked out some methods for creating sentences.  The first generates a list of word types to use based on the sentence length, which is a random number between 1 and 5.  The second method takes this length and creates a randomly ordered, non-repeating sequence/schema of word types.  This schema is passed to the get_sentence method, which loops through the list of word type and randomly selects a word from the appropriate word type list, generated during class initialization.  
Finally, using this schema a sentence is constructed by 

For now I am just using 4 word types (noun, verb, adjective, adverb, and idiom) because the sentences seem more interesting than when I used more types.  I am working on making the sentence algorithm much richer but do not want to be overly deterministic of the outcome by imposing too much syntactical structure.  Still experimenting.

'''
import random

class Words:

    word_lists = []
    nouns = []
    verbs = []
    adjectives = []
    adverbs = []
    idioms = []
    prepositions = []
    pronouns = []
    proper_nouns = []
    interjections = []
    conjunctions = []

    def __init__(self,c_word_dict):
        self.word_cnt = len(c_word_dict["words"])
        self.word_dict = c_word_dict
        self.sentence = None
        self.word_type_map = {0:"noun", 1:"verb", 2:"adjective", 3:"adverb",4:"interjection",5:"idioms",6:"pronouns",7:"prepositions",8:"conjunctions"}
        self.conjunctions = ["and","but","or","nor","for","yet","so","after","although","as","if","since"]

        for word in c_word_dict["words"]:
    #confirm order in word_lists.
    #adjust order based on mapping!!
            if word["type"] == "noun":
                self.nouns.append(word["word"])

            elif word["type"] == "verb":
                self.verbs.append(word["word"])

            elif word["type"] == "adjective":
                self.adjectives.append(word["word"])

            elif word["type"] == "adverb":
                self.adverbs.append(word["word"])

            elif word["type"] == "idiom":
                self.idioms.append(word["word"])

            elif word["type"] == "preposition":
                self.prepositions.append(word["word"])

            elif word["type"] == "pronoun":
                self.pronouns.append(word["word"])

            elif word["type"] == "proper-noun":
                self.proper_nouns.append(word["word"])

            elif word["type"] == "interjection":
                self.interjections.append(word["word"])
        self.word_lists.append(self.nouns)
        self.word_lists.append(self.verbs)
        self.word_lists.append(self.adjectives)
        self.word_lists.append(self.adverbs)
        self.word_lists.append(self.interjections)
        self.word_lists.append(self.adverbs)
        self.word_lists.append(self.idioms)
        self.word_lists.append(self.pronouns)
        self.word_lists.append(self.prepositions)
        self.word_lists.append(self.conjunctions)


    def get_random(self,n):
        #return n number of word selected randomly from any type
        return_json = {"words": []}
        word_index = random.randint(1,self.word_cnt)
        for i in range(0,int(n)):
            mWord_dict = self.word_dict["words"][word_index]  #includes all node information
            #word_dict = {"word": word_dict["words"][word_index]["word"]}
            return_json["words"].append(mWord_dict)
            #print return_json
        return return_json


    def generate_types(self,schema_length,m_word_types):  #May need to modify this.  It takes types in order, does that make sense?
        if schema_length == len(m_word_types):
            return m_word_types
        elif schema_length > 8 : #hard coded now for number of types we support (noun, verb, adjective, adverb, pronoun, proper-noun, idiom)
            m_words = [0,1,2,3,4,5,6,7]
            return m_words
        else:
            m_word_types.append(len(m_word_types))
            return self.generate_types(schema_length,m_word_types)  #recursive

    def generate_schema(self,schema_length,m_word_types):

        used_word_types = []
        m_schema = []
        prior_word_type = None

        for i in range(0,schema_length):
            while True:
                word_type_index = [random.choice(m_word_types) for _ in range(1)]
                if word_type_index[0] != prior_word_type:
                    m_schema.append(word_type_index[0])
                    prior_word_type = word_type_index[0]
                    break
            #print words
            if len(m_word_types) == 1:
                m_word_types = used_word_types
            else:
                used_word_types.append(word_type_index[0])
                m_word_types.remove(word_type_index[0])
        return m_schema


    def get_sentence(self,n = None):

        #n is optional.  If not included, generate random.
        #this will call some internal methods to generate schema and select words.
        #set self.sentence at return.
        if n == None:
            schema_length = random.randint(1,4)
        else:
            schema_length = n

        word_types = []
        word_types = self.generate_types(schema_length,word_types)
        schema = self.generate_schema(schema_length,word_types)
        m_sentence = []
        for i in schema:
            #print self.word_type_map[i]
            #print len(self.word_lists[i])
            word_index = random.randint(1,len(self.word_lists[i]))
            #print self.word_lists[i][word_index]
            m_sentence.append(self.word_lists[i][word_index])
        sentence = " ".join(m_sentence)
        sentence = sentence.capitalize()
        #now I need to loop through schema, find type, grab related type,
        #for now, until I decide to store type as string or int, map type to in here.
        print schema
        print sentence
        return {"sentence": sentence}
'''
