Front End:

	- Exhibition

	-Web/Mobile Interface
		-Contributor
		-Vistor

Only 1000 words are set to create the word nodes.  More nodes became very slow.  Words are updated and sentences generated via REST calls on a timer.  every second or so one of the word nodes is substituted for a new random word.  


Controller:

	Python using Bottle lightweight web framework.  Rest API

Backend:

	Currently just text files and log files.  Implementing MongoDB datastore for logging of generated sentences, word frequencies and schemas as well as user information.







db.messages.update({"headers.Message-ID" : "<8147308.1075851042335.JavaMail.evans@thyme>"},{"$push":{"headers.To" : "mrpotatohead@10gen.com"}})