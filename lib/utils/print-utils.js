'use strict'

const Cities = require('../cities');
const Aliens = require('../aliens');

const Print = {
    cities(){
        let cities = Cities.getAll();
        let names = Object.keys(cities);

        console.log('\n+++++++++++ Cities +++++++++++');
        names.forEach(name => {
            let string = name;

            if (cities[name].north && cities[name].north !== undefined && cities[cities[name].north] !== undefined){
                string = `${string} north=${cities[name].north}`
            }
            if (cities[name].south && cities[name].south !== undefined && cities[cities[name].south] !== undefined){
                string = `${string} south=${cities[name].south}`
            }
            if (cities[name].east && cities[name].east !== undefined && cities[cities[name].east] !== undefined){
                string = `${string} east=${cities[name].east}`
            }
            if (cities[name].west && cities[name].west !== undefined && cities[cities[name].west] !== undefined){
                string = `${string} west=${cities[name].west}`
            }
            console.log(string);
        });
        console.log('-------------------------------');
    },

    aliens(){
        let aliens = Aliens.getAll();
        let names = Object.keys(aliens);

        console.log('\n+++++++++++ Aliens +++++++++++');
        names.forEach(name => {
            console.log(`${name} is in ${aliens[name].city} and has ${aliens[name].moves} moves`);
        });
        console.log('-------------------------------');
    }
};

module.exports = Print;