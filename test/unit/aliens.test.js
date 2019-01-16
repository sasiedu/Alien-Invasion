'use strict'
const assert = require('assert');

const Aliens = require('../../lib/aliens');
const Cities = require('../../lib/cities');

describe('Aliens.add(name, cityName)', () => {
    before(() => {
        
        Cities.cities = {
            Foo: { name: 'Foo', north: 'Bar', south: 'Bee', west: '', east: '', alien: '' }
        };

        Aliens.aliens = {};
    });

    it('pass an empty name, should not throw an error', () => {
        Aliens.add('', 'Foo');
    });

    it('pass an empty city name, Aliens.get(name) should return undefined', () => {
        Aliens.add('Foo', '');
        assert.equal(Aliens.get('Foo'), undefined);
    });

    it('pass an invalid city name, Aliens.get(name) should return undefined', () => {
        Aliens.add('Foo', 'Bar');
        assert.equal(Aliens.get('Foo'), undefined);
    });

    it('pass in alien name and valid city name, Aliens.get(name) should return an object', () => {
        Aliens.add('Alien', 'Foo');
        assert.deepEqual(Aliens.get('Alien'), { name: 'Alien', city: 'Foo', moves: 0 });
    });

    after(() => {
        Aliens.aliens = {};
        Cities.cities = {};
    });
});

describe('Aliens.generate(number)', () => {
    before(() => {
        
        Cities.cities = {
            Foo: { name: 'Foo', north: 'Bar', south: 'Bee', west: '', east: '', alien: '' },
            Bar: { name: 'Bar', north: 'Bee', south: 'Foo', west: '', east: '', alien: '' },
            Bee: { name: 'Bee', north: 'Bar', south: 'Foo', west: '', east: '', alien: '' }
        };

        Aliens.aliens = {};
    });

    it('pass in a number less than 1, Aliens.getAll should be an empty object', () => {
        Aliens.generate(0);
        assert.deepEqual(Aliens.getAll(), {});
    });

    it('pass in a number greater than 0, Aliens.getAll array should be the same length as the number', () => {
        Aliens.generate(3);
        assert.equal(Object.keys(Aliens.getAll()).length, 3);
    });

    after(() => {
        Aliens.aliens = {};
        Cities.cities = {};
    });
});

describe('Aliens.move(name, city)', () => {
    before(() => {
        Cities.cities = {
            Foo: { name: 'Foo', north: 'Bar', south: 'Bee', west: '', east: '', alien: 'Alien' },
            Bar: { name: 'Bar', north: 'Bee', south: 'Foo', west: '', east: '', alien: '' },
            Bee: { name: 'Bee', north: 'Bar', south: 'Foo', west: '', east: '', alien: 'Alien2' }
        };
        Aliens.aliens = {
            Alien: { name: 'Alien', city: 'Foo', moves: 0},
            Alien2: { name: 'Alien2', city: 'Bee', moves: 10000}
        };
    });

    it('pass empty name, should not throw any error', () => {
        Aliens.move('', 'Foo');
    });

    it('pass non existing name, should not throw any error', () => {
        Aliens.move('AlienBaby', 'Foo');
    });

    it('pass empty city, alien should not move', () => {
        Aliens.move('Alien', '');
        assert.equal(Aliens.get('Alien').city, 'Foo');
    });

    it('pass invalid city, alien should not move', () => {
        Aliens.move('Alien', 'Bazz');
        assert.equal(Aliens.get('Alien').city, 'Foo');
    });

    it('pass same city, alien should not move', () => {
        Aliens.move('Alien', 'Foo');
        assert.equal(Aliens.get('Alien').city, 'Foo');
        assert.equal(Aliens.get('Alien').moves, 0);
        assert.equal(Cities.get('Foo').alien, 'Alien');
    });

    it('moves equal 10000, alien should not move', () => {
        Aliens.move('Alien2', 'Bar');
        assert.equal(Aliens.get('Alien2').city, 'Bee');
        assert.equal(Aliens.get('Alien2').moves, 10000);
        assert.equal(Cities.get('Bee').alien, 'Alien2');
    });

    it('pass in existing name with valid city name, alien should move to new city', () => {
        Aliens.move('Alien', 'Bee');
        assert.equal(Aliens.get('Alien').city, 'Bee');
        assert.equal(Aliens.get('Alien').moves, 1);
        assert.equal(Cities.get('Bee').alien, 'Alien');
        assert.equal(Cities.get('Foo').alien, '');
    });

    after(() => {
        Aliens.aliens = {};
        Cities.cities = {};
    });
});

describe('Aliens.delete(name)', () => {
    before(() => {
        Cities.cities = {
            Foo: { name: 'Foo', north: 'Bar', south: 'Bee', west: '', east: '', alien: 'Alien' }
        };
        Aliens.aliens = {
            Alien: { name: 'Alien', city: 'Foo', moves: 0}
        };
    });

    it('pass an empty name, should not throw an error', () => {
        Aliens.delete('');
    });

    it('pass invalid name, should not throw an error', () => {
        Aliens.delete('Alien2');
    });

    it('pass a valid name, should not throw an error', () => {
        Aliens.delete('Alien');
        assert.equal(Aliens.get('Alien'), undefined);
        assert.equal(Cities.get('Foo').alien, '');
    });

    after(() => {
        Cities.cities = {};
        Aliens.aliens = {};
    });
});