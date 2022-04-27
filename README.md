# Lyoko

_for earth_

using language as a browser for a world-desktop

**_Lyoko_** is a framework for people to use natural, intuitive modes of human communication including verbal and non-verbal expressions to augment their environment. Human beings use language and motion to codify abstract thoughts and/or experiences. Current programming paradigms require that developers reframe and bend real-world concepts into abstractions that conform to the limitations of the computing environment. We use keyboards and flat screens to discuss airflows along rockets, the impact of climate change on crop yields, the tremendous impact of the pandemic, etc. Many aspects of life lose their flavor when perceived through the flaccid lens of a flat screen while hunched over a hand-wringing mechanism, wrist-binding mechanism.

By serializing principles of **_ATOWN_** with current immersive media technology we can engage with our world more holistically, merging the "abstract" study accomplished via computing with the "real" phenomenon we experience through our senses. **_Lyoko_** re-contextualizes human language as an application programming interface for the application that is the entire world of phenomena we could ever experience. This _world-desktop_ of experiences is made up of the **_Distributed Immersive Applications_**, or **_DIAs_**, written in Lyoko, that collectively make up the immersive internet of things known as the **_Public Augmented Reality Kinectome_**, or **_pARk_**.

Developers can implement the module in both modular server-side and non-modular client-side applications with just a few lines of JavaScript code.

## Examples:

* Build A Simple Scene

## Usage:

[Server-side](#server-side)

[Client-side](#client-side)

### Server-Side
The following phrase is entered into the Lyoko Language Processor:

```javascript
In the pARk, there is a store called "Snack Shack" that operates between the hours of 11pm and 6am EST.
In this store, you can stream whatever content you like and watch it with others -- in person or remotely.
You can also order snacks and get them delivered straight to your Wimble or cARd.
```
 2. import lyoko-vraudioplayer (using the 'require' method is recommended; some Node releases do not have the newest ES6 features enabled by default)

 (a) using add method
```javascript
var myPlayer = require('lyoko-vraudioplayer');

myPlayer.spawn();
```

### Client-Side

1. download the boilerplate or make your own test directory

```javascript
var myPlayer = new Lyoko();
myPlayer.build();

myPlayer.add('../media/img/You.png', '../media/audio/You.mp3' , { title: 'you', author: 'Unibe@t', year: 2016});

myPlayer.add('../media/img/0001.png', '../media/audio/WaterToWine.mp3' , { title: 'Water to Wine', author: 'KAYTRANADA ft. Kali Uchis', year: 2016});

coreEventListeners.launch([myPlayer]);
```


### Full API


| property       | type   | description |
| ------------- |:-------------:| -----:|
| type          | string       | the object type of the Player |
| socket        | object        |  the web socket connection the Player uses for IP communication |
| hello         | method        | the initiator method|
