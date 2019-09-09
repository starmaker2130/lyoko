function Lyoko(){
    return {
        lexer: function(data){
            console.log(` ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n fx] lexer | core lyoko function \n~~~~~~~~~~~~~~\n raw: ${data}`);

            let rawLexicalInput = data;
            let rawInputArray = [];
            let mark = 0;
            while(rawLexicalInput.indexOf(" ")>-1){
                mark = rawLexicalInput.indexOf(" ");

                if(mark==0)mark==1;

                rawInputArray.push(rawLexicalInput.substring(0, mark));
                rawLexicalInput = rawLexicalInput.substring(mark+1);
            }
            rawInputArray.push(rawLexicalInput);

            console.log("lexer called completennnn");
            console.log(rawInputArray);
            return rawInputArray;
        },
        parser: function(data){
            console.log(` ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n fx] parser | core lyoko function \n~~~~~~~~~~~~~~\n number of terms: ${data.length}`);

            let term, i;
            let self = this;
            for(i=0; i<data.length; i++){
                term = data[i].toUpperCase(); //  the current query search term, not case specific as the term is converted to upper case
                //console.log(term);

                term = this.comb({term: term, index: i}); //
                console.log(term);
                if(self.dictionary[term]!=undefined){     //
                    self.dictionary[term]({code: 0, index: i});
                }
                else{
                    if(term.indexOf("ED")>-1){
                        let morph = term.substring(0, term.indexOf("ED"));
                        if(self.dictionary[morph]!=undefined){
                            self.dictionary[morph]({code: 0, index: i});
                        }
                    }
                    else{
                        self.dictionary.stack.STREAM.push({
                            type: "semantic-node",
                            name: term,
                            index: i
                        });
                    }
                }
            }

            return self.dictionary.stack.STREAM;
            /*
            console.log('final action stream:');
            console.log(self.dictionary.stack.STREAM)
            if(self.dictionary.stack.PHRASE!=null){
                console.log('------------------------ \n    PHRASES \n -----------------------');
                console.log(self.dictionary.stack.PHRASE);
            }
            if(self.dictionary.stack.SENTENCE!=null){
                console.log('------------------------ \n  SENTENCES \n -----------------------');

                console.log(self.dictionary.stack.SENTENCE);
            }
            */
        },
        comb: function(data){
            let self = this;
            let raw = data.term;  // the raw value of the current query search term
            let punctuation = [
                ".",    //0
                ",",    //1
                "!",    //2
                "?",    //3
                ";",    //4
                ":",    //5
                "%",    //6
                "(",    //7
                ")",    //8
                '"',    //9
            ];

            let count = [];
            let final = "";

            for(let j=0; j< punctuation.length; j++){
                if(raw.indexOf(punctuation[j])>-1){   //  if there is punctuation attached to this term, remove it
                    count.push(punctuation[j]); //  stash the punctuation removed in this count array
                    raw = raw.substring(0, raw.indexOf(punctuation[j]))+raw.substring(raw.indexOf(punctuation[j])+1);
                }
            }
            if(count.includes(punctuation[0])) { // if there is a period in the count array then "count" a sentence and add this structure to the core dictionary stack
                if(self.dictionary.stack.ENVIRONMENT!=null){
                    let env = self.dictionary.stack.ENVIRONMENT[0].env;
                }
                self.dictionary.stack.SENTENCE.push({
                    type: "environment",
                    name: "pARk-"+data.index,
                    index: data.index
                });
            }

            if(count.includes(punctuation[3])) { // if there is a question mark in the count array then "count" a query and add this structure to the core dictionary stack
                self.dictionary.stack.SENTENCE.push({
                    type: "environment",
                    name: "pARk-query-"+data.index,
                    index: data.index
                });
            }

            if(count.includes(punctuation[9])){     //  if there are quotes in the phrase, add an object subject to the stack
                if(self.dictionary.stack.OBJECTSUBJECTS==null){
                    self.dictionary.stack.OBJECTSUBJECTS = []
                }
                self.dictionary.stack.OBJECTSUBJECTS.push({
                    obj: data.term,
                    index: data.index
                });
            }

            return raw;

        },
        dictionary: {
            addToStream: function(){

            },
            stack: {
                SESSIONMANAGER: {
                    connection: null
                },
                ENVIRONMENT: null,
                SUBJECTOBJECTS: null,
                OBJECTSUBJECTS: null,
                EFFECTORS: null,
                SELECTORS: null,
                STREAM: [],
                PHRASE: [],
                SENTENCE: [],
                SEMANTICS: [],
                core:{
                    ENGLISH: {
                        hov: {
                            "hyperreality-in" : {
                                type: "effector-infinite",
                                traditionalType: "verb",
                                definition: [
                                    {
                                        type: "verb",
                                        order: 1,
                                        text: "IN."
                                    },
                                ]
                            },
                            "hyperreality-is" : {
                                type: "effector-infinite",
                                traditionalType: "verb",
                                definition: [
                                    {
                                        type: "verb",
                                        order: 1,
                                        text: "IS."
                                    },
                                ]
                            },
                            "hyperreality-you" : {
                                type: "subject-object",
                                traditionalType: "noun",
                                definition: [
                                    {
                                        type: "noun",
                                        order: 1,
                                        text: "YOU."
                                    },
                                ]
                            },
                            "hyperreality-film" : {
                                type: "effector-finite",
                                traditionalType: "verb",
                                definition: [
                                    {
                                        type: "verb",
                                        order: 1,
                                        text: "FILM."
                                    },
                                ]
                            },
                            "SNACK" : {
                                type: "object-subject",
                                traditionalType: "multiple",
                                definition: [
                                    {
                                        type: "noun",
                                        order: 1,
                                        text: "a small portion of food or drink or a light meal, especially one eaten between regular meals."
                                    },
                                    {
                                        type: "noun",
                                        order: 2,
                                        text: "a share or portion"
                                    },
                                    {
                                        type: "noun",
                                        order: 3,
                                        text: "something easily done.",
                                        usage: "note: Australian Slang"
                                    },
                                    {
                                        type: "verb",
                                        order: 4,
                                        text: "to have a snack or light meal, especially between regular meals:"
                                    }
                                ]
                            },
                            "SNACKS": function(){
                                return this.SNACK;
                            },
                            "SHACK" : {
                                type: "object-subject",
                                traditionalType: "multiple",
                                definition: [
                                    {
                                        type: "noun",
                                        order: 1,
                                        text: "a rough cabin; shanty."
                                    },
                                    {
                                        type: "noun",
                                        order: 2,
                                        text: "radio shack",
                                        usage: "Informal"
                                    },
                                    {
                                        type: "verb",
                                        order: 3,
                                        text: "shack up",
                                        usage: "a: to live together as spouses without being legally married; b: to have illicit sexual relations; c: to live in a shack;"
                                    },
                                ]
                            },
                            "STREAM" : {
                                type: "object-subject",
                                traditionalType: "multiple",
                                definition: [
                                    {
                                        type: "noun",
                                        order: 0,
                                        text: "hypermedia flowing as a series of packets or a buffer of data"
                                    },
                                    {
                                        type: "noun",
                                        order: 1,
                                        text: "a body of water flowing in a channel or watercourse, as a river, rivulet, or brook."
                                    },
                                    {
                                        type: "noun",
                                        order: 2,
                                        text: "a steady current in water, as in a river or the ocean:"
                                    },
                                    {
                                        type: "verb",
                                        order: 9,
                                        text: "to flow, pass, or issue in a stream, as water, tears, or blood.",
                                        usage: "note: used without object"
                                    },
                                    {
                                        type: "verb",
                                        order: 10,
                                        text: "to send forth or throw off a stream; run or flow (often followed by with):",
                                        usage: "note: used without object"
                                    },
                                    {
                                        type: "noun",
                                        order: 15,
                                        text: "to send forth or discharge in a stream:",
                                        usage: "note: used with object"
                                    },
                                    {
                                        type: "noun",
                                        order: 16,
                                        text: "to cause to stream or float outward, as a flag.",
                                        usage: "note: used with object"
                                    }
                                ]
                            },
                            "STORE" : {
                                type: "object-subject",
                                traditionalType: "multiple",
                                definition: [
                                    {
                                        type: "noun",
                                        order: 1,
                                        text: "an establishment where merchandise is sold, usually on a retail basis."
                                    },
                                    {
                                        type: "noun",
                                        order: 2,
                                        text: "a grocery"
                                    },
                                    {
                                        type: "verb",
                                        order: 8,
                                        text: "to supply or stock with something, as for future use.",
                                        usage: "note: used with object"
                                    },
                                    {
                                        type: "verb",
                                        order: 9,
                                        text: "to accumulate or put away, for future use (usually followed by up or away).",
                                        usage: "note: used with object"
                                    },
                                    {
                                        type: "noun",
                                        order: 12,
                                        text: "to take in or hold supplies, goods, or articles, as for future use.",
                                        usage: "note: used without object"
                                    },
                                    {
                                        type: "noun",
                                        order: 13,
                                        text: "to remain fresh and usable for considerable time on being stored:",
                                        usage: "note: used without object"
                                    }
                                ]
                            },
                            "ORDER" : {
                                type: "object-subject",
                                traditionalType: "multiple",
                                definition: [
                                    {
                                        type: "noun",
                                        order: 1,
                                        text: "an authoritative direction or instruction; command; mandate."
                                    },
                                    {
                                        type: "noun",
                                        order: 2,
                                        text: "a command of a court or judge."
                                    },
                                    {
                                        type: "noun",
                                        order: 3,
                                        text: "a command or notice issued by a military organization or a military commander to troops, sailors, etc"
                                    },
                                    {
                                        type: "verb",
                                        order: 37,
                                        text: "to give an order, direction, or command to:",
                                        usage: "note: used with object"
                                    },
                                    {
                                        type: "noun",
                                        order: 38,
                                        text: "to direct or command to go or come as specified:",
                                        usage: "note: used with object"
                                    },
                                    {
                                        type: "noun",
                                        order: 46,
                                        text: "to give an order or issue orders:",
                                        usage: "note: used without object"
                                    }
                                ]
                            },
                            "ORDERS": function(){
                                return this.ORDER;
                            },
                            "FRIEND" : {
                                type: "object-subject",
                                traditionalType: "multiple",
                                definition: [
                                    {
                                        type: "noun",
                                        order: 1,
                                        text: "a person attached to another by feelings of affection or personal regard."
                                    },
                                    {
                                        type: "noun",
                                        order: 2,
                                        text: "a person who gives assistance; patron; supporter:"
                                    },
                                    {
                                        type: "noun",
                                        order: 3,
                                        text: "a person who is on good terms with another; a person who is not hostile:"
                                    },
                                    {
                                        type: "noun",
                                        order: 4,
                                        text: "a member of the same nation, party, etc."
                                    },
                                    {
                                        type: "noun",
                                        order: 7,
                                        text: "to befriend.",
                                        usage: "note: used with object"
                                    },
                                    {
                                        type: "noun",
                                        order: 8,
                                        text: "to add (a person) to one's list of contacts on a social media website:",
                                        usage: "note: used with object"
                                    }
                                ]
                            },
                            "FRIENDS": function(){
                                return this.FRIEND;
                            },
                            "CONTENT" : {
                                type: "object-subject",
                                traditionalType: "multiple",
                                definition: [
                                    {
                                        type: "noun",
                                        order: 1,
                                        text: "Usually contents",
                                        usage: "a: something that is contained; b: the subjects or topics covered in a book or document; c: the chapters or other formal divisions of a book or document;"
                                    },
                                    {
                                        type: "noun",
                                        order: 2,
                                        text: "something that is to be expressed through some medium, as speech, writing, or any of various arts:"
                                    },
                                    {
                                        type: "noun",
                                        order: 3,
                                        text: "significance or profundity; meaning:"
                                    },
                                    {
                                        type: "noun",
                                        order: 4,
                                        text: "substantive information or creative material viewed in contrast to its actual or potential manner of presentation:"
                                    },
                                    {
                                        type: "noun",
                                        order: 5,
                                        text: "to take in or hold supplies, goods, or articles, as for future use.",
                                        usage: "note: used without object"
                                    },
                                    {
                                        type: "noun",
                                        order: 5,
                                        text: "that which may be perceived in something:"
                                    },
                                    {
                                        type: "noun",
                                        order: 6,
                                        text: "Philosophy, Logic. the sum of the attributes or notions comprised in a given conception; the substance or matter of cognition."
                                    }
                                ]
                            },
                            "STRAIGHT" : {
                                type: "effector-descriptor",
                                traditionalType: "multiple",
                                definition: [
                                    {
                                        type: "adjective",
                                        order: 1,
                                        text: "without a bend, angle, or curve; not curved; direct:"
                                    },
                                    {
                                        type: "adjective",
                                        order: 2,
                                        text: "exactly vertical or horizontal; in a perfectly vertical or horizontal plane:"
                                    },
                                    {
                                        type: "adverb",
                                        order: 20,
                                        text: "in a straight line:"
                                    },
                                    {
                                        type: "adverb",
                                        order: 21,
                                        text: "in an even form or position:"
                                    },
                                    {
                                        type: "noun",
                                        order: 34,
                                        text: "the condition of being straight."
                                    },
                                    {
                                        type: "noun",
                                        order: 35,
                                        text: "a straight form or position"
                                    }
                                ]
                            },
                            "CLOUD" : {
                                type: "subject-object",
                                traditionalType: "noun",
                                definition: [
                                    {
                                        type: "noun",
                                        order: 1,
                                        text: "ARIA + WINDOW MAILBOX."
                                    },
                                ]
                            },
                            "ALSO" : {
                                type: "selector-infinite",
                                traditionalType: "adverb",
                                definition: [
                                    {
                                        type: "adverb",
                                        order: 1,
                                        text: "in addition; too; besides; as well:"
                                    },
                                    {
                                        type: "adverb",
                                        order: 2,
                                        text: "likewise; in the same manner:"
                                    },
                                    {
                                        type: "conjunction",
                                        order: 3,
                                        text: "and"
                                    }
                                ]
                            },
                            "ARIA" : {
                                type: "subject-object",
                                traditionalType: "noun",
                                definition: [
                                    {
                                        type: "noun",
                                        order: 1,
                                        text: "ARIA"
                                    },
                                ]
                            },
                            "CONNECT" : {
                                type: "subject-object",
                                traditionalType: "noun",
                                definition: [
                                    {
                                        type: "verb",
                                        order: 1,
                                        text: "to join, link, or fasten together; unite or bind:",
                                        usage: "note: used with object"
                                    },
                                    {
                                        type: "verb",
                                        order: 2,
                                        text: "to establish communication between; put in communication:",
                                        usage: "note: used with object"
                                    },
                                    {
                                        type: "verb",
                                        order: 3,
                                        text: "to have as an accompanying or associated feature:",
                                        usage: "note: used with object"
                                    },
                                    {
                                        type: "verb",
                                        order: 7,
                                        text: "to become connected; join or unite:",
                                        usage: "note: used without object"
                                    },
                                    {
                                        type: "verb",
                                        order: 8,
                                        text: "(of trains, buses, etc.) to run so as to make connections (often followed by with):",
                                        usage: "note: used without object"
                                    },
                                    {
                                        type: "adjective",
                                        order: 13,
                                        text: "of or relating to a connection or connections:"
                                    },
                                ]
                            },
                            "PHONE" : {
                                type: "subject-object",
                                traditionalType: "noun",
                                definition: [
                                    {
                                        type: "noun",
                                        order: 1,
                                        text: "an apparatus, system, or process for transmission of sound or speech to a distant point, especially by an electric device."
                                    },
                                    {
                                        type: "noun",
                                        order: 2,
                                        text: "a portable electronic telephone device, as a cell phone, mobile phone, or smartphone."
                                    },
                                    {
                                        type: "verb",
                                        order: 3,
                                        text: "to speak to or summon (a person) by telephone.",
                                        usage: "note: used with object"
                                    },
                                    {
                                        type: "verb",
                                        order: 4,
                                        text: "to send (a message) by telephone.",
                                        usage: "note: used with object"
                                    },
                                    {
                                        type: "verb",
                                        order: 5,
                                        text: "to send a message by telephone.",
                                        usage: "note: used without object"
                                    }
                                ]
                            },
                            "TAP" : {
                                type: "subject-object",
                                traditionalType: "noun",
                                definition: [
                                    {
                                        type: "verb",
                                        order: 1,
                                        text: "to strike with a light but audible blow or blows; hit with repeated, slight blows:",
                                        usage: "note: used with object"
                                    },
                                    {
                                        type: "verb",
                                        order: 2,
                                        text: "to make, put, etc., by tapping:",
                                        usage: "note: used with object"
                                    },
                                    {
                                        type: "verb",
                                        order: 7,
                                        text: "to strike lightly but audibly, as to attract attention.",
                                        usage: "note: used with object"
                                    },
                                    {
                                        type: "verb",
                                        order: 8,
                                        text: "to strike light blows.",
                                        usage: "note: used with object"
                                    },
                                    {
                                        type: "noun",
                                        order: 10,
                                        text: "a light but audible blow:"
                                    },
                                    {
                                        type: "noun",
                                        order: 11,
                                        text: "the sound made by this."
                                    },
                                ]
                            },
                            "SEE" : {
                                type: "subject-object",
                                traditionalType: "verb",
                                definition: [
                                    {
                                        type: "verb",
                                        order: 1,
                                        text: "to perceive with the eyes; look at.",
                                        usage: "note: used with object"
                                    },
                                    {
                                        type: "verb",
                                        order: 2,
                                        text: "to view; visit or attend as a spectator:",
                                        usage: "note: used with object"
                                    },
                                    {
                                        type: "verb",
                                        order: 22,
                                        text: "to have the power of sight.",
                                        usage: "note: used without object"
                                    },
                                    {
                                        type: "verb",
                                        order: 23,
                                        text: "to be capable of perceiving by means of computer vision.",
                                        usage: "note: used without object"
                                    },
                                    {
                                        type: "verb-phrase",
                                        order: 29,
                                        text: "see about; a: to investigate; inquire about.; b: to turn one's attention to; take care of:;"
                                    },
                                    {
                                        type: "verb-phrase",
                                        order: 30,
                                        text: "to attend to; take care of:"
                                    },
                                ]
                            },
                            "WEATHER" : {
                                type: "effector-infinite",
                                traditionalType: "noun",
                                definition: [
                                    {
                                        type: "noun",
                                        order: 1,
                                        text: "the state of the atmosphere with respect to wind, temperature, cloudiness, moisture, pressure, etc."
                                    },
                                    {
                                        type: "noun",
                                        order: 2,
                                        text: "a strong wind or storm or strong winds and storms collectively:"
                                    },
                                    {
                                        type: "verb",
                                        order: 5,
                                        text: "to expose to the weather; dry, season, or otherwise affect by exposure to the air or atmosphere:",
                                        usage: "note: used with object"
                                    },
                                    {
                                        type: "verb",
                                        order: 6,
                                        text: "to discolor, disintegrate, or affect injuriously, as by the effects of weather:",
                                        usage: "note: used with object"
                                    },
                                    {
                                        type: "verb",
                                        order: 10,
                                        text: "to undergo change, especially discoloration or disintegration, as the result of exposure to atmospheric conditions.",
                                        usage: "note: used without object"
                                    },
                                    {
                                        type: "verb",
                                        order: 11,
                                        text: "to endure or resist exposure to the weather:",
                                        usage: "note: used without object"
                                    },
                                ]
                            },
                            "TREE" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: [
                                    {
                                        type: "noun",
                                        order: 1,
                                        text: "a plant having a permanently woody main stem or trunk, ordinarily growing to a considerable height, and usually developing branches at some distance from the ground."
                                    },
                                    {
                                        type: "noun",
                                        order: 2,
                                        text: "any of various shrubs, bushes, and plants, as the banana, resembling a tree in form and size."
                                    },
                                    {
                                        type: "noun",
                                        order: 3,
                                        text: "something resembling a tree in shape, as a clothes tree or a crosstree."
                                    },
                                    {
                                        type: "noun",
                                        order: 4,
                                        text: "Mathematics, Linguistics. tree diagram."
                                    },
                                    {
                                        type: "verb",
                                        order: 14,
                                        text: "to drive into or up a tree, as a pursued animal or person.",
                                        usage: "note: used with object"
                                    },
                                    {
                                        type: "verb",
                                        order: 15,
                                        text: "Informal. to put into a difficult position.",
                                        usage: "note: used with object"
                                    }
                                ]
                            },
                            "BASE" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "PROTEST" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "COUNTRY" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "AFRICA" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "VIDEO" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "PAINTING" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "JUDGEMENT" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "UNION" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "EUROPE" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "EUROPEAN" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "AFRICAN" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "RAPID" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "SUPPORT" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "FORCE" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "REFUGEE" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "STREET" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "CAR" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "ROAD" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "CONE" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "DIVIDER" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "TRAFFIC" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "BOOK" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "SHELF" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "BED" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "ROOM" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "BATH" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "CARPET" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "FLOOR" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "GROUND" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "HANGER" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "UTILITY" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "WATER" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "ELECTRICITY" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "GAS" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "INTERNET" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "WIRELESS" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "MOBILE" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "PHONE" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "BUDE" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "TREE" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "SOUND" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "WEED" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "BUSH" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "PLANT" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "FLOWER" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "BREAKFAST" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "CLUB" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "PHILOSOPHY" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "FAIL" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "SHOW" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "GOD" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "CULTURE" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "REALITY" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "TELEVISION" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "SOFA" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "COUCH" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "BOOK" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "SAFE" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "NIGGER" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "NIGGAR" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "DANGER" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "BASTION" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "FREEDOM" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "SPEECH" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "OF" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "YES" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "WHARF" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "SKYSCRAPER" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "BUILDING" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "DRIVE" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "WOOD" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "RANGE" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "DIVERSE" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "NEIGHBORHOOD" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "NEIGHBOR" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "HOOD" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "DOCK" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "BAY" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "BRIDGE" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "SQUARE" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "PARIS" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "MONTREAL" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "BRAZZAVILLE" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "LONDON" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "CAMBRIDGE" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "SILVER SPRING" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "GROUP" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "CAPITAL" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "DEVELOPMENT" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "DECADE" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "RETAIL" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "HATE" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "CRIME" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "HILARIOUS" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "COON" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "DUNE" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "SAND" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "FUCK" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "SITUATION" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "MASTURBATE" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "CRY" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "SEX" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "DO" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "FEAR" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "FIRE" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "HELLO" : {
                                type: "selector-finite",
                                traditionalType: "noun",
                                definition: []
                            },
                            "WORLD" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "SPECIAL" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "WEDDING" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "MARKET" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "PLACE" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "IDEA" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "MARKETPLACE" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "RUN" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "FAR" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "FAST" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "FURIOUS" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "BLACK" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "WOMAN" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                            "MAN" : {
                                type: "object-subject",
                                traditionalType: "noun",
                                definition: []
                            },
                        }
                    }
                }
            },  //0 = store value in parser stream
            // 1 = activate default execution
            PARK: function(data){
                let self = this;
                //console.log(`[LPARSER] PARK`);

                let marker = document.createElement("div")
                marker.style = "width: 100px; height: 100px; background-color: blue; color: white; border-radius: 50%; text-align: center; line-height: 100px;";
                marker.innerHTML = "pARk";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "environment",
                        name: "pARk",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute pARk functionality');
                }

                //document.getElementById("atown-output-container").appendChild(marker);
            },
            PLAYLIST: function(data){
                let self = this;
                //console.log(`[LPARSER] PLAYLIST`);

                let marker = document.createElement("div")
                marker.style = "width: 75px; height: 75px; background-color: yellow; color: black; border-radius: 50%; text-align: center; line-height: 75px;";
                marker.innerHTML = "playlist";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "objsubj",
                        name: "playlist",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute playlist functionality');
                }
            },
            FIND: function(data){
                let self = this;
                //console.log(`[LPARSER] FIND`);

                let marker = document.createElement("div")
                marker.style = "width: 100px; height: 75px; background-color: green; color: white; border-radius: 15px; text-align: center; line-height: 75px;";
                marker.innerHTML = "search";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "selector-finite",
                        name: "subtract",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute search (core subtraction) functionality');
                }
            },
            LOCALIZE: function(data){
                let self = this;
                //console.log(`[LPARSER] LOCALIZE`);

                let marker = document.createElement("div")
                marker.style = "width: 75px; height: 75px; background-color: yellow; color: black; border-radius: 50%; text-align: center; line-height: 100px;";
                marker.innerHTML = "playlist";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "objsubj",
                        name: "playlist",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute playlist functionality');
                }
            },
            REALIZE: function(data){
                let self = this;
                //console.log(`[LPARSER] REALIZE`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: violet; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "xr";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "effector-finite",
                        name: "hyperreality",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute realize (core hyperreality) functionality');
                }
            },
            DELIVER: function(data){
                let self = this;
                //console.log(`[LPARSER] DELIVER`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "deliver";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "effector-finite",
                        name: "delivery",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute delivery (core delivery) functionality');
                }
            },
            STREAM: function(data){
                let self = this;
                //console.log(`[LPARSER] STREAM`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "deliver";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "effector-finite",
                        name: "delivery",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute delivery (core delivery) functionality');
                }
            },
            FILM: function(data){
                let self = this;
                //console.log(`[LPARSER] FILM`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "deliver";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "effector-finite",
                        name: "hyperreality-film",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){// TODO point this functionality to the core dictionary definitions TODO
                    console.log(' execute film functionality');
                }
            },
            CLOUD: function(data){
                let self = this;
                //console.log(`[LPARSER] FILM`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: lightgray; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "CLOUD";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "subject-object",
                        name: "cloud",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute cloud functionality');
                }
            },
            BRING: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "deliver";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "effector-finite",
                        name: "delivery-bring",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            COLLABORATE: function(data){
                let self = this;
                //console.log(`[LPARSER] COLLABORATE`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "deliver";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "effector-finite",
                        name: "collaborate",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute delivery (core delivery) functionality');
                }
            },
            IN: function(data){
                let self = this;
                //console.log(`[LPARSER] IN`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: orange; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "in";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "effector-infinite",
                        name: "hyperreality-in",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute in (core existential attachment) functionality');
                }
            },
            IS: function(data){
                let self = this;
                //console.log(`[LPARSER] IS`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "is";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "effector-infinite",
                        name: "hyperreality-is",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute is (core existential attachment) functionality');
                }
            },
            YOU: function(data){
                let self = this;
                //console.log(`[LPARSER] YOU`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: yellow; color: black; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "YOU";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "subject-object",
                        name: "hyperreality-you",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute you (core identity) functionality');
                }
            },
            0: function(data){
                let self = this;
                //console.log(`[LPARSER] O [INT]`);

                let marker = document.createElement("div")
                marker.style = "width: 10px; height: 10px; background-color: black; color: white; border-radius: 50%; text-align: center; line-height: 10px;";
                marker.innerHTML = "zero";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "effector-descriptor",
                        name: "zero",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute zero functionality');
                }
            },
            1: function(data){
                let self = this;
                //console.log(`[LPARSER] O [INT]`);

                let marker = document.createElement("div")
                marker.style = "width: 10px; height: 10px; background-color: black; color: white; border-radius: 50%; text-align: center; line-height: 10px;";
                marker.innerHTML = "one";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "effector-descriptor",
                        name: "one",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute one functionality');
                }
            },
            2: function(data){
                let self = this;
                //console.log(`[LPARSER] O [INT]`);

                let marker = document.createElement("div")
                marker.style = "width: 10px; height: 10px; background-color: black; color: white; border-radius: 50%; text-align: center; line-height: 10px;";
                marker.innerHTML = "two";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "effector-descriptor",
                        name: "two",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute two functionality');
                }
            },
            3: function(data){
                let self = this;
                //console.log(`[LPARSER] O [INT]`);

                let marker = document.createElement("div")
                marker.style = "width: 10px; height: 10px; background-color: black; color: white; border-radius: 50%; text-align: center; line-height: 10px;";
                marker.innerHTML = "three";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "effector-descriptor",
                        name: "three",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute three functionality');
                }
            },
            4: function(data){
                let self = this;
                //console.log(`[LPARSER] O [INT]`);

                let marker = document.createElement("div")
                marker.style = "width: 10px; height: 10px; background-color: black; color: white; border-radius: 50%; text-align: center; line-height: 10px;";
                marker.innerHTML = "four";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "effector-descriptor",
                        name: "four",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute four functionality');
                }
            },
            5: function(data){
                let self = this;
                //console.log(`[LPARSER] O [INT]`);

                let marker = document.createElement("div")
                marker.style = "width: 10px; height: 10px; background-color: black; color: white; border-radius: 50%; text-align: center; line-height: 10px;";
                marker.innerHTML = "five";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "effector-descriptor",
                        name: "five",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute five functionality');
                }
            },
            6: function(data){
                let self = this;
                //console.log(`[LPARSER] O [INT]`);

                let marker = document.createElement("div")
                marker.style = "width: 10px; height: 10px; background-color: black; color: white; border-radius: 50%; text-align: center; line-height: 10px;";
                marker.innerHTML = "six";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "effector-descriptor",
                        name: "six",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute six functionality');
                }
            },
            7: function(data){
                let self = this;
                //console.log(`[LPARSER] O [INT]`);

                let marker = document.createElement("div")
                marker.style = "width: 10px; height: 10px; background-color: black; color: white; border-radius: 50%; text-align: center; line-height: 10px;";
                marker.innerHTML = "seven";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "effector-descriptor",
                        name: "seven",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute seven functionality');
                }
            },
            8: function(data){
                let self = this;
                //console.log(`[LPARSER] O [INT]`);

                let marker = document.createElement("div")
                marker.style = "width: 10px; height: 10px; background-color: black; color: white; border-radius: 50%; text-align: center; line-height: 10px;";
                marker.innerHTML = "eight";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "effector-descriptor",
                        name: "eight",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute eight functionality');
                }
            },
            9: function(data){
                let self = this;
                //console.log(`[LPARSER] O [INT]`);

                let marker = document.createElement("div")
                marker.style = "width: 10px; height: 10px; background-color: black; color: white; border-radius: 50%; text-align: center; line-height: 10px;";
                marker.innerHTML = "nine";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "effector-descriptor",
                        name: "nine",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute nine functionality');
                }
            },
            10: function(data){
                let self = this;
                //console.log(`[LPARSER] O [INT]`);

                let marker = document.createElement("div")
                marker.style = "width: 10px; height: 10px; background-color: black; color: white; border-radius: 50%; text-align: center; line-height: 10px;";
                marker.innerHTML = "ten";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "effector-descriptor",
                        name: "ten",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute ten functionality');
                }
            },
            ZERO: function(data){
                let self = this;
                self[0]({code: data.code, index: data.index});
            },
            ONE: function(data){
                let self = this;
                self[1]({code: data.code, index: data.index});
            },
            TWO: function(data){
                let self = this;
                self[2]({code: data.code, index: data.index});
            },
            THREE: function(data){
                let self = this;
                self[3]({code: data.code, index: data.index});
            },
            FOUR: function(data){
                let self = this;
                self[4]({code: data.code, index: data.index});
            },
            FIVE: function(data){
                let self = this;
                self[5]({code: data.code, index: data.index});
            },
            SIX: function(data){
                let self = this;
                self[6]({code: data.code, index: data.index});
            },
            SEVEN: function(data){
                let self = this;
                self[7]({code: data.code, index: data.index});
            },
            EIGHT: function(data){
                let self = this;
                self[8]({code: data.code, index: data.index});
            },
            NINE: function(data){
                let self = this;
                self[9]({code: data.code, index: data.index});
            },
            TEN: function(data){
                let self = this;
                self[10]({code: data.code, index: data.index});
            },
            BASE: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "base";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "base",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            PROTEST: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 75px; height: 50px; background-color: #34970d; color: black; border-radius: 5px; text-align: center; line-height: 50px;";
                marker.innerHTML = "protest";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "effector-finite",
                        name: "protest",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            COUNTRY: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "deliver";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "effector-finite",
                        name: "delivery-bring",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            AFRICA: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 150px; height: 150px; background-color: gold; color: black; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "Africa";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "Africa",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            VIDEO: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "video";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "video",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            PAINTING: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "painting";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "painting",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            JUDGEMENT: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: #090922; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "judgement";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "effector-finite",
                        name: "judgement",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            UNION: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: #203948; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "union";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "union",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            EUROPE: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: #778921; color: white; border-radius: 5px; text-align: center; line-height: 50px;";
                marker.innerHTML = "Europe";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "Europe",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            EUROPEAN: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: black; color: white; border-radius: 5px; text-align: center; line-height: 50px;";
                marker.innerHTML = "European";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "effector-finite",
                        name: "European",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            AFRICAN: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: white; color: blue; border: 2px blue solid; border-radius: 5px; text-align: center; line-height: 50px;";
                marker.innerHTML = "African";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "effector-finite",
                        name: "African",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            RAPID: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: #0f4f4f; color: white; border-radius: 5px; text-align: center; line-height: 50px;";
                marker.innerHTML = "rapid";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "effector-finite",
                        name: "rapid",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            SUPPORT: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "support";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "effector-finite",
                        name: "support",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            FORCE: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "force";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "effector-finite",
                        name: "force",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            REFUGEE: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "refugee";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "refugee",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            STREET: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "street";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "street",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            CAR: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "car";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "car",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            ROAD: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "road";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "effector-finite",
                        name: "road",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            CONE: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "cone";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "cone",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            DIVIDER: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "divider";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "divider",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            TRAFFIC: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "traffic";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "traffic",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            BOOK: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "book";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "book",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            SHELF: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "shelf";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "shelf",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            BED: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "bed";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "bed",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            ROOM: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "room";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "room",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            BATH: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "bath";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "bath",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            CARPET: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "carpet";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "carpet",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            FLOOR: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "floor";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "floor",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            GROUND: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "ground";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "ground",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            HANGER: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "hanger";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "hanger",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            UTILITY: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "utility";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "utility",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            WATER: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "water";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "water",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            ELECTRICITY: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "electricity";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "electricity",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            GAS: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "gas";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "gas",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            INTERNET: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "internet";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "internet",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            WIRELESS: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 125px; height: 50px; background-color: yellow; color: black; border-radius: 5px; text-align: center; line-height: 50px;";
                marker.innerHTML = "wireless";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "wireless",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            MOBILE: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 100px; height: 50px; background-color: blue; color: white; border-radius: 5px; text-align: center; line-height: 50px;";
                marker.innerHTML = "mobile";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "selector-finite",
                        name: "mobile",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            PHONE: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 100px; height: 50px; background-color: violet; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "phone";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "phone",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            BUD: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "bud";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "bud",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            TREE: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "tree";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "tree",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            SOUND: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "sound";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "sound",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            WEED: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "weed";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "weed",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            BUSH: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "bush";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "bush",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            PLANT: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "plant";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "plant",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            FLOWER: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "flower";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "flower",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            BREAKFAST: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "breakfast";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "breakfast",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            CLUB: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "club";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "club",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            PHILOSOPHY: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "philosophy";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "philosophy",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            FAIL: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "fail";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "effector-finite",
                        name: "fail",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            SHOW: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "show";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "effector-finite",
                        name: "show",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            GOD: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "god";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "god",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            CULTURE: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "culture";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "culture",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            REALITY: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "reality";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "reality",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            TELEVISION: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "television";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "television",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            SOFA: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "sofa";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "sofa",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            COUCH: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "couch";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "couch",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            BOOK: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "book";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "book",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            SAFE: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "safe";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "safe",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            NIGGER: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "nigger";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "nigger",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            NIGGAR: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "niggar";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "niggar",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            DANGER: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "danger";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "danger",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            BASTION: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "bastion";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "bastion",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            FREEDOM: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "freedom";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "freedom",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            SPEECH: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "speech";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "speech",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            OF: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "of";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "effector-infinite",
                        name: "of",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            NO: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "no";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "no",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            YES: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "yes";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "yes",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            WHARF: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "wharf";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "wharf",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            SKYSCRAPER: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "skyscraper";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "skyscraper",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            BUILDING: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "building";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "building",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            DRIVE: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "drive";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "drive",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            WOOD: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "wood";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "wood",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            RANGE: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "range";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "range",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            DIVERSE: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "diverse";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "effector-finite",
                        name: "diverse",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            NEIGHBORHOOD: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "neighborhood";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "neighborhood",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            NEIGHBOR: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "neighbor";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "neighbor",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            HOOD: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "hood";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "hood",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            DOCK: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "dock";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "dock",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            BAY: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "bay";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "bay",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            BRIDGE: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "bridge";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "bridge",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            SQUARE: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "square";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "square",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            PARIS: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "Paris";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "Paris",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            MONTREAL: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "Montreal";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "Montreal",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            BRAZZAVILLE: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "Brazzaville";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "Brazzaville",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            LONDON: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "London";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "London",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            CAMBRIDGE: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "Cambridge";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "Cambridge",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            "SILVER SPRING": function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "Silver Spring";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "Silver Spring",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            GROUP: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "group";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "group",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            CAPITAL: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "capital";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "capital",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            DEVELOPMENT: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "development";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "development",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            DECADE: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "decade";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "decade",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            RETAIL: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "retail";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "retail",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            HATE: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "hate";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "hate",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            CRIME: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "crime";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "crime",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            HILARIOUS: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "hilarious";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "hilarious",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            COON: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "coon";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "coon",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            DUNE: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "dune";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "dune",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            SAND: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "sand";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "sand",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            FUCK: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "fuck";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "fuck",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            SITUATION: function(){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "situation";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "situation",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            MASTURBATE: function(){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "masturbate";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "masturbate",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            CRY: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "cry";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "cry",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            SEX: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "sex";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "sex",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            DO: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "do";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "effector-finite",
                        name: "do",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            TEAR: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "tear";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "tear",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            FIRE: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "fire";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "fire",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            HELLO: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "hello";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "selector-finite",
                        name: "hello",
                        element: marker,
                        index: data.index
                    });
                    //console.log(self.stack.STREAM);
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            WORLD: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "world";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "world",
                        element: marker,
                        index: data.index
                    });
                    //console.log(self.stack.STREAM);
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            SPECIAL: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "special";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "selector-finite",
                        name: "special",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            WEDDING: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "wedding";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "wedding",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            MARKET: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "market";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "market",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            PLACE: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "place";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "place",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            IDEA: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "idea";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "idea",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            MARKETPLACE: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "marketplace";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "marketplace",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            RUN: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "run";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "effector-finite",
                        name: "run",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            FAR: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "far";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "selector-infinite",
                        name: "far",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            FAST: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "fast";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "effector-finite",
                        name: "fast",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            FURIOUS: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "furious";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "effector-finite",
                        name: "furious",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            BLACK: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "black";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "effector-finite",
                        name: "black",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },
            WOMAN: function(data){
                let self = this;
                //console.log(`[LPARSER] BRING`);

                let marker = document.createElement("div")
                marker.style = "width: 50px; height: 50px; background-color: red; color: white; border-radius: 50%; text-align: center; line-height: 50px;";
                marker.innerHTML = "woman";

                if(data.code==0){
                    self.stack.STREAM.push({
                        type: "object-subject",
                        name: "woman",
                        element: marker,
                        index: data.index
                    });
                }
                else if(data.code==1){
                    console.log(' execute bring (core delivery) functionality');
                }
            },

        },
        closeWindow: function(){
            window.close();
        },
        start: async function(){
            let self = this;
            if(self.dictionary.stack.SESSIONMANAGER.connection==null){
                self.dictionary.stack.SESSIONMANAGER.connection = io.connect(location.host);
                self.dictionary.stack.SESSIONMANAGER.connection.emit("CLIENTupdateLyokoSessionSERVER", {status: true, request: "new", target: "default"});
                self.dictionary.stack.SESSIONMANAGER.connection.on("SERVERdenyUnauthorizedAccessCLIENT", function(data){
                    if(data.status){
                        console.log(data.code);
                        console.log(data.message);
                        let countClock = 5;
                        console.log(`closing window in ${countClock}...`)
                        let countDown = setInterval(function(){
                            console.log(`${countClock}...`);
                            if(countClock==0){
                                clearInterval(countDown);
                            }
                            countClock--;
                        }, 1000);
                    }
                })
                return true;
            }
            return false;
        },
        execute: function(stream){
            let self = this;
            let parseStream = stream || self.dictionary.stack.STREAM;
            let sections = [];
            let breakpoints = [];

            let shiftValue = self.dictionary.stack.PHRASE.length;

            console.log(self.dictionary.stack.PHRASE);// should be 0 at this point in the program
            let j = self.dictionary.stack.PHRASE.length;  // j = 0;
            for(;j<self.dictionary.stack.SENTENCE.length; j++){// store the locations of the sentence endings (periods/full stops)
                breakpoints.push(self.dictionary.stack.SENTENCE[j].index); // in the comb funciton above whenever a period is located the index of the term after which it is located is stored as well, ie.e. the period's location in the the sentence
            }

            for(let h=0; h<breakpoints.length; h++){
                let l;
                if(h==0){
                    l = 0;
                }
                else{
                    l = breakpoints[h-1]+1;// the term just after the previous breakpoint term so as to avoid "bleeding" into the enxt sentence
                }

                while(l<breakpoints[h]){
                    /*if(parseStream[l].element!=null){
                        document.getElementById("atown-output-container").appendChild(parseStream[l].element);
                    }*/
                    if(self.dictionary.stack.PHRASE.length==h+shiftValue){
                        console.log(`h: ${h}`);
                        self.dictionary.stack.PHRASE.push([]);  //dtart of a new phrase
                    }
                    self.dictionary.stack.PHRASE[h+shiftValue].push(parseStream[l]);
                    l++;
                }
                self.dictionary.stack.PHRASE[h+shiftValue].push(parseStream[l]);
            }

            console.log("----phrases----");
            let phrases = self.dictionary.stack.PHRASE;
            console.log(phrases);
            for(let m = shiftValue; m<phrases.length; m++){

                if(self.dictionary.stack.SEMANTICS.length==m){
                    self.dictionary.stack.SEMANTICS.push(
                        {
                            score: 0,
                            env: 0,     // 0    basis of reality
                            objsubj: 0, //  1   item in story, often acted on, passive
                            semnode: 0,  //  2   item in story --> semantic analysis
                            selector: 0,  //3   aids the viewer in taking action, focus
                            effector: 0, // 4   what allows the viewer to affect action
                            subjobj: 0, //  5   viewer, drives perspective of story
                        });
                }

                for(let n = 0; n<phrases[m].length; n++){
                    let lexType = phrases[m][n].type;
                    //console.log(self.dictionary.stack.SEMANTICS[m]);

                    /* relabel the types that need relabeling */
                    if(lexType=="semantic-node"){
                        let query = phrases[m][n].name;
                        //let dict = "";
                        if(self.dictionary.stack.core.ENGLISH.hov[query]!=null){
                            lexType = self.dictionary.stack.core.ENGLISH.hov[query].type;
                        }
                        /*else{
                            dict = "semantic-node";
                        }
                        //console.log(dict.type);
                        lexType = "semantic-node";*/
                    }


                    /* add phrase elements to output */
                    if(n==0){   //add phrase container at the start of a new sentence
                        var phraseContainer = document.createElement("div");
                        phraseContainer.style = "display: inline-block; width: 275px; height: 150px; border-radius: 15px; padding: 2%; margin: 1% auto; cursor: pointer; background-color: aquamarine; color: white;";
                        phraseContainer.setAttribute("id", `phrase-container-${m}`);
                        document.getElementById("atown-output-container").appendChild(phraseContainer);
                    }

                    if(phrases[m][n].element!=null){    // if there is an element associated with txhis term add it to the ATOWN output
                        document.getElementById(`phrase-container-${m}`).appendChild(phrases[m][n].element);
                    }
                    else if(phrases[m][n].element==null){
                        if(lexType==undefined||lexType==null||lexType=="undefined"){
                            let ref = self.dictionary.stack.core.ENGLISH.hov[phrases[m][n].name]();
                            console.log(`] unknown lex type: ${lexType}`);
                            lexType = ref.type;
                            console.log(lexType);
                        }
                        if(lexType == "object-subject"){
                            let object = document.createElement("div");
                            let objName = phrases[m][n].name;
                            object.style= "width: 50px; height: 50px; border-radius: 50%; text-align: center; line-height: 50px; background-color: white; color: black;"
                            object.classList.add("object-subject-node");
                            object.setAttribute("id", `term-${m}-${n}-${objName}`);


                            document.getElementById(`phrase-container-${m}`).appendChild(object);
                            document.getElementById(`term-${m}-${n}-${objName}`).append(objName);
                        }

                    }



                    /* process the semantic properties of the labels */
                    switch(lexType){
                        case "environment":
                            self.dictionary.stack.SEMANTICS[m].env++;
                            break;
                        case "semantic-node":
                            self.dictionary.stack.SEMANTICS[m].semnode+=2;
                            self.dictionary.stack.SEMANTICS[m].score+=2;
                            break;
                        case "effector-infinite":
                            self.dictionary.stack.SEMANTICS[m].effector+=4.5;
                            self.dictionary.stack.SEMANTICS[m].score+=4.5;
                            break;
                        case "effector-descriptor":
                        case "effector-finite":
                            self.dictionary.stack.SEMANTICS[m].effector+=4;
                            self.dictionary.stack.SEMANTICS[m].score+=4;
                            break;
                        case "selector-infinite":
                            self.dictionary.stack.SEMANTICS[m].selector+=3.5;
                            self.dictionary.stack.SEMANTICS[m].score+=3.5;
                            break;
                        case "selector-finite":
                            self.dictionary.stack.SEMANTICS[m].selector+=3;
                            self.dictionary.stack.SEMANTICS[m].score+=3;
                            break;
                        case "subject-object":
                            self.dictionary.stack.SEMANTICS[m].subjobj+=5;
                            self.dictionary.stack.SEMANTICS[m].score+=5;
                            break;
                        case "object-subject":
                            self.dictionary.stack.SEMANTICS[m].objsubj+=1;
                            self.dictionary.stack.SEMANTICS[m].score+=1;
                            break;
                        default:
                            console.log(`unknown lex type: ${lexType}`);
                            console.log("undefined lex parser value reached");
                            console.log(phrases[m][n]);
                            break;
                    }
                }


            }

            console.log("------semantics-------");
            /*the semantics are additive and are continually processed each time a sentence is added by the user...
            for now this results in redundant data displays but eventually sentence/word weights may change in situ as a conversation progresses
            and the machine modifies its prior interpretations in realtime, just as people do in conversation */

            console.log(self.dictionary.stack.SEMANTICS);
/* the stream is constantly refreshed every time the user enters a new query, i.e. takes a turn speaking in the conversation, the stream represents the current unprocessed information being handed to the machine by the user/developer */
            console.log(self.dictionary.stack.STREAM);
/* the phrase is additive and continualy builds on the sentences written by the user/developer
            console.log(self.dictionary.stack.PHRASE);
            */
            self.dictionary.stack.STREAM = [];
            if(self.dictionary.stack.SESSIONMANAGER.connection==null){
                self.start().then(function(){
                    self.dictionary.stack.SESSIONMANAGER.connection.emit("CLIENTupdatePhraseAndSemanticAnalysisSERVER", {status: true, request: "addphrase", target: "default", semantics: self.dictionary.stack.SEMANTICS, phrase: self.dictionary.stack.PHRASE});
                });
            }
            else{
                self.dictionary.stack.SESSIONMANAGER.connection.emit("CLIENTupdatePhraseAndSemanticAnalysisSERVER", {status: true, request: "addphrase", target: "default", semantics: self.dictionary.stack.SEMANTICS, phrase: self.dictionary.stack.PHRASE});
            }

            /*
            [DONE] send SEMANTICS and PHRASE data server side to an object that updates and analyzes these values in realtime
            [DONE] output the data and appropriate analyses to the server console
            [C] set up a broadcaster that sends out the conversation data to any viewer open to listen to it
            [D] place the object decomposition visualizer (that output box) into its own page
            [E] create a page for viewing the conversation histogram data, i.e. what terms are being used, how often terms are being used, the dictionary definitions of the terms used, the relationship between terms, etc.
            [F] start developing an ARIA intelligent agent response bank that participates in the Lyoko production with the user/developer
            [G] create a page for viewing the ARIA responses


            */






            /*
                TODO:
                1) FIND THE PHRASES WITH THE HIGHEST ENVIRONMENT VALUES
                2) ADD THE ENVIRONMENTS TO THE ENVIRONMENT STACK AND DETERMINE THE BASES (NODE GENEALOGY) STREE
                3) ADD THE SUBJECT-OBJECTS, OBJECT-SUBJECTS, EFFECTORS, and SELECTORS TO THEIR RESPECTIVE STACKS
                4) INTERPRET THE FUNCTIONALITY OF THE SYSTEM FROM THE TEXT
                5) DEFINE THE CONFIDENCE STATISTICS FOR THE INTERPRETATION AND BUILD ANONYMOUS FUNCTIONS THAT ACHIEVE THE INTERPRETED FUNCTIONALITIES
                6) ASSIGN THE ANONYMOUS FUNCTIONS TO THE CORE OPERATION STACK AND START THE EXISTENCE TIMER
                7) CLICKING ON THE ATOWN OUTPUTS HIGHLIGHTS THE OTHER NODES THAT THE SELECTED CHILD IS CONNECTED TO AS WELL AS ITS RELATIONSHIP TO EACH OF THE OTHER NODES AND VALUE WITHIN THE SENTENCE, PHRASE, or INTERPRETON


            */
        }
    }
}

document.addEventListener("DOMContentLoaded", function(){
    var session = Lyoko();
    session.start();

    document.getElementById("submit-terminal-input-button").addEventListener("click", function(){
        let speechElement = document.getElementById("terminal-input-container");
        let speech = speechElement.value;

        while(speechElement.value!=""){
            speechElement.value="";
        }

        let bubble = document.createElement("div");

        bubble.innerHTML = speech;
        bubble.style = `z-index: 50; display: block; width: 250px; height: 125px; border-radius: 10px; background-color: rgba(15, 87, 255, 0.95); margin: 3% auto; color: white; padding: 1%`;
        document.getElementById("message-output-container").appendChild(bubble);

        //let bHeight = bubble.offsetHeight;


        let parseList = session.lexer(speech); // generate the set of objects (words) from the plain text provided by the user/developer
        let parseStream = session.parser(parseList);
        //console.log("parseSTREAM::::::");
      //  console.log(parseStream);
        session.execute(parseStream);
    });
});
