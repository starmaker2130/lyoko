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
            //console.log(rawInputArray);                    
            console.log("lexer called complete");
            return rawInputArray;
        },
        parser: function(data){
            console.log(` ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n fx] parser | core lyoko function \n~~~~~~~~~~~~~~\n number of terms: ${data.length}`);

            let term, i;
            let self = this;
            for(i=0; i<data.length; i++){
                term = data[i].toUpperCase();
                //console.log(term);

                term = this.comb({term: term, index: i});
                //console.log(term);
                if(self.dictionary[term]!=undefined){
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
            let raw = data.term;
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
                if(raw.indexOf(punctuation[j])>-1){
                    count.push(punctuation[j]);
                    raw = raw.substring(0, raw.indexOf(punctuation[j]))+raw.substring(raw.indexOf(punctuation[j])+1);
                }
            }
            if(count.includes(punctuation[0])){
                if(self.dictionary.stack.ENVIRONMENT!=null){
                    let env = self.dictionary.stack.ENVIRONMENT[0].env;
                }
                self.dictionary.stack.SENTENCE.push({
                    type: "environment",
                    name: "pARk",
                    index: data.index
                });
            }                    
            if(count.includes(punctuation[9])){
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
                                type: "selector",
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
            2: function(){
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
            3: function(){
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
            4: function(){
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
            5: function(){
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
            6: function(){
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
            7: function(){
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
            8: function(){
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
            9: function(){
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
            10: function(){
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
            ONE: function(){
                let self = this;
                self[1]({code: data.code, index: data.index});
            },
            TWO: function(){
                let self = this;
                self[2]({code: data.code, index: data.index});
            },
            THREE: function(){
                let self = this;
                self[3]({code: data.code, index: data.index});
            },
            FOUR: function(){
                let self = this;
                self[4]({code: data.code, index: data.index});
            },
            FIVE: function(){
                let self = this;
                self[5]({code: data.code, index: data.index});
            },
            SIX: function(){
                let self = this;
                self[6]({code: data.code, index: data.index});
            },
            SEVEN: function(){
                let self = this;
                self[7]({code: data.code, index: data.index});
            },
            EIGHT: function(){
                let self = this;
                self[8]({code: data.code, index: data.index});
            },
            NINE: function(){
                let self = this;
                self[9]({code: data.code, index: data.index});
            },
            TEN: function(){
                let self = this;
                self[10]({code: data.code, index: data.index});
            }
        },
        execute: function(stream){
            let self = this;
            let parseStream = stream || self.dictionary.stack.STREAM;
            let sections = [];
            let breakpoints = [];
            
            let shiftValue = self.dictionary.stack.PHRASE.length;
            
            let j = self.dictionary.stack.PHRASE.length;
            for(;j<self.dictionary.stack.SENTENCE.length; j++){// store the locations of the sentence endings (periods/full stops)
                breakpoints.push(self.dictionary.stack.SENTENCE[j].index);
            }

            for(let h=0; h<breakpoints.length; h++){
                let l;
                if(h==0){
                    l = 0;
                }
                else{
                    l = breakpoints[h-1];
                }

                while(l<breakpoints[h]){
                    /*if(parseStream[l].element!=null){
                        document.getElementById("atown-output-container").appendChild(parseStream[l].element);
                    }*/
                    if(self.dictionary.stack.PHRASE.length==h+shiftValue){
                        console.log(`h: ${h}`);
                        self.dictionary.stack.PHRASE.push([]);
                    }
                    self.dictionary.stack.PHRASE[h+shiftValue].push(parseStream[l]);
                    l++;
                }
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

                    if(phrases[m][n].element!=null){    // if there is an element associated witht his term add it to the ATOWN output
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
            console.log(self.dictionary.stack.SEMANTICS);
            self.dictionary.stack.STREAM = [];
            
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
        
        
        let parseList = session.lexer(speech);
        let parseStream = session.parser(parseList);
        session.execute(parseStream);
    });
});