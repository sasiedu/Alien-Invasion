'use strict'

const Game = require('./lib/game');
const Print = require('./lib/utils/print-utils');

const main = () => {
    let continuePlay = true;

    try{
        Game.buildWorld(process.argv);
        while (continuePlay){
            continuePlay = Game.playRound();
        }
        Print.cities();
        Print.aliens();
    } catch(e){
        console.error(`Error: ${e.message}`);
    }
}

main();