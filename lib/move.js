'use strict'

exports.northFirst = (city) => {
    if (city.north){
        return city.north;
    }
    if (city.south){
        return city.south;
    }
    if (city.west){
        return city.west;
    }
    return city.east;    
}

exports.southFirst = (city) => {
    if (city.south){
        return city.south;
    }
    if (city.west){
        return city.west;
    }
    if (city.north){
        return city.north;
    }
    return city.east;    
}

exports.westFirst = (city) => {
    if (city.west){
        return city.west;
    }
    if (city.east){
        return city.east;
    }
    if (city.north){
        return city.north;
    }
    return city.south; 
}

exports.eastFirst = (city) => {
    if (city.east){
        return city.east;
    }
    if (city.north){
        return city.north;
    }
    if (city.west){
        return city.west;
    }
    return city.south; 
}