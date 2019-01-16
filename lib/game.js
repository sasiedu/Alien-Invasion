'use strict'

const CommandlineUtils = require('./utils/commandline-utils');
const FileUtils = require('./utils/file-utils');
const Cities = require('./cities');
const Aliens = require('./aliens');
const Moves = require('./move');

exports.buildWorld = (processArgv) => {
    let args;
    let fileLines;
    
    args = CommandlineUtils.parse(processArgv);
    if (!args){
        throw new Error(`
        Missing or invalid commandline arguments.\n
        Format: npm start --map=$path_to_map_file --aliens=$number_of_aliens.\n
        NB: Number of cities should be more than number of aliens.
        `);
    }
    fileLines = FileUtils.readFile(args.mapPath);
    if (fileLines == undefined || !fileLines){
        throw new Error(`
        Invalid or missing file: ${args.mapPath}
        `);
    }

    fileLines.forEach(line => {
        Cities.add(line);
    });

    Aliens.generate(args.alienCount);
};

const alienFight = (city, newAlien) => {
    let oldAlien = Cities.get(city).alien;
    Cities.delete(city);
    Aliens.delete(oldAlien);
    Aliens.delete(newAlien);
    console.log(`${city} has been destroyed by ${oldAlien} and ${newAlien}`);
}

const getNewCity = (alien) => {
    let city;
    let index;

    city = Cities.get(alien.city);
    if (!city || city === undefined){
        return null;
    }
    index = Math.floor(Math.random() * 4);
    if (index === 0){
        return Moves.northFirst(city);
    }
    if (index === 1){
        return Moves.westFirst(city);
    }
    if (index === 2){
        return Moves.southFirst(city);
    }
    return Moves.eastFirst(city);
}

exports.playRound = () => {
    let alienMoved = false;
    let aliens;

    aliens = Object.keys(Aliens.getAll());
    aliens.forEach(name => {
        let alien;
        let nextCity;
        
        alien = Aliens.get(name);
        if (!alien || alien === undefined || alien.moves === 10000){
            return ;
        }
        nextCity = getNewCity(alien);
        console.log(`alien: ${name}`);
        console.log(`next city: ${nextCity}`);
        if (!nextCity || nextCity === undefined){
            return ;
        }

        if (Cities.get(nextCity) === undefined || !Cities.get(nextCity)){
            return ;
        }
        if (Cities.get(nextCity).alien){
            alienFight(nextCity, name);
        } else {
            Aliens.move(name, nextCity);
            alienMoved = true;
        }
    });
    return alienMoved;
}