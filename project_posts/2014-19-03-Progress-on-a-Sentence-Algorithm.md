So I worked out some scripts for creating sentences.  The first generates a list of word types to use based on the sentence length, which is a random number between 1 and 5.  The second method takes this length and creates a randomly ordered, non-repeating sequence/schema of word types.  Example…..

Finally, using this schema a sentence is constructed by 

All of the word data and sentence construction methods live in the following Python class 

schema generator

word type selector


While the class can support any length schema and presently up to 8 word types, I am still working out way of.

My concern is to not overly the determine/control the final sentence by imposing too much structure but still get interesting sentences.  For now I am just using 4 word types (noun, verb, adjective, adverb, and ?) 

Still implementing a text-speak list as well as the social network words and contributed words.  