'use strict'

const Cities = {
    cities: {},

    add(line){
        const city = {
            name: '',
            north: '',
            south: '',
            east: '',
            west: '',
            alien: ''
        };

        if (!line){
            throw new Error('Invalid line');
        }
        const lineSplit = line.split(' ');
        if (lineSplit.length < 2) {
            throw new Error(`Require at least one direction: ${line}`);
        }
        lineSplit.forEach((item, index) => {
            if (index === 0){
                city.name = item;
            } else {
                const itemSplit = item.split('=');
                if (itemSplit.length === 2 && city[itemSplit[0]] !== undefined) {
                    if (city[itemSplit[0]] !== ''){
                        throw new Error(`Duplicate direction: ${line}`);
                    }
                    city[itemSplit[0]] = itemSplit[1];
                }
            }
        });
        if (!city.north && !city.south && !city.west && !city.east){
            throw new Error(`Require at least one direction: ${line}`);
        }
        this.cities[city.name] = city;
    },

    get(name){
        return this.cities[name];
    },

    delete(name){
        delete this.cities[name];
    },

    addAlienToCity(cityName, alienName){
        if (this.cities[cityName]){
            this.cities[cityName].alien = alienName;
        }
    },

    removeAlienFromCity(cityName){
        if (this.cities[cityName]){
            this.cities[cityName].alien = '';
        }
    }

};

module.exports = Cities;