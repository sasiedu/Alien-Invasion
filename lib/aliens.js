'use strict'

const generateName = require('sillyname');

const Cities = require('./cities');

const Aliens = {
    aliens: {},

    add(name, cityName){
        if (!name || !cityName || Cities.get(cityName) === undefined){
            return ;
        }
        this.aliens[name] = { name: name, city: cityName, moves: 0 };
    },

    get(name){
        return this.aliens[name];
    },

    generate(count){
        let cityNames;

        if (count < 1){
            return ;
        }
        cityNames = Object.keys(Cities.getAll());

        for (let i = 0; i < count; i++){
            const name = generateName();
            let found = false;
            let index;
            let cityName;

            while (!found){
                index = Math.floor(Math.random() * (cityNames.length - 0)) + 0;
                cityName = cityNames[index];
                if (!Cities.get(cityName).alien){
                    this.add(name, cityName);
                    Cities.addAlienToCity(cityName, name);
                    found = true;
                }
            }
        }
    },

    getAll(){
        return this.aliens;
    },

    move(name, cityName){
        if (!name || !cityName){
            return ;
        }

        if (this.aliens[name] === undefined || Cities.get(cityName) === undefined){
            return ;
        }

        if (this.aliens[name].moves === 10000 || this.aliens[name].city === cityName){
            return ;
        }

        Cities.removeAlienFromCity(this.aliens[name].city);
        this.aliens[name].city = cityName;
        this.aliens[name].moves = this.aliens[name].moves + 1;
        Cities.addAlienToCity(cityName, name);
    },

    delete(name){
        if (!name || this.aliens[name] === undefined){
            return ;
        }
        Cities.removeAlienFromCity(this.aliens[name].city);
        delete this.aliens[name];
    }

};

module.exports = Aliens;