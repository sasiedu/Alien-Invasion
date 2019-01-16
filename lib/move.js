'use strict'

const Cities = require('./cities');

exports.northFirst = (city) => {
    if (city.north && Cities.get(city.north) !== undefined){
        return city.north;
    }
    if (city.south && Cities.get(city.south) !== undefined){
        return city.south;
    }
    if (city.west && Cities.get(city.west) !== undefined){
        return city.west;
    }
    return city.east;    
}

exports.southFirst = (city) => {
    if (city.south && Cities.get(city.south) !== undefined){
        return city.south;
    }
    if (city.west && Cities.get(city.west) !== undefined){
        return city.west;
    }
    if (city.north && Cities.get(city.north) !== undefined){
        return city.north;
    }
    return city.east;    
}

exports.westFirst = (city) => {
    if (city.west && Cities.get(city.west) !== undefined){
        return city.west;
    }
    if (city.east && Cities.get(city.east) !== undefined){
        return city.east;
    }
    if (city.north && Cities.get(city.north) !== undefined){
        return city.north;
    }
    return city.south; 
}

exports.eastFirst = (city) => {
    if (city.east && Cities.get(city.east) !== undefined){
        return city.east;
    }
    if (city.north && Cities.get(city.north) !== undefined){
        return city.north;
    }
    if (city.west && Cities.get(city.west) !== undefined){
        return city.west;
    }
    return city.south; 
}