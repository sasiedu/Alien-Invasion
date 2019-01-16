'use strict'
const assert = require('assert');

const Cities = require('../../lib/cities');

describe('Cities.add(line)', () => {
    it('pass an empty line, should throw an error [Invalid line]', () => {
        assert.throws(() => { Cities.add('') }, Error, 'Invalid line');
    });

    it('pass a line with only city name, should throw an error [Require at least one direction: $line]', () => {
        assert.throws(() => { Cities.add('Foo') }, Error, 'Require at least one direction: Foo');
    });

    it('pass a line with no valid direction, should throw an error [Require at least one direction: $line]', () => {
        assert.throws(() => { Cities.add('Foo noth=Bar') }, Error, 'Require at least one direction: Foo noth=Bar');
    });

    it('pass a line with duplicate direction, should throw an error [Duplicate direction: $line]', () => {
        assert.throws(() => { Cities.add('Foo north=Bar north=Bee') }, Error, 'Duplicate direction: Foo north=Bar north=Bee');
    });

    it('pass a line with city name and 2 valid directions, should be successful', () => {
        Cities.add('Foo north=Bar south=Bee');
        assert.deepEqual(Cities.get('Foo'), { name: 'Foo', north: 'Bar', south: 'Bee', west: '', east: '', alien: '' });
    });

    after(() => {
        Cities.cities = {};
    });
});

describe('Cities.get(name)', () => {
    before(() => {
        Cities.cities = {
            Foo: { name: 'Foo', north: 'Bar', south: 'Bee', west: '', east: '', alien: '' }
        };
    });

    it('pass empty name, should return undefined', () => {
        assert.equal(Cities.get(''), undefined);
    });

    it('pass non existing name, should return undefined', () => {
        assert.equal(Cities.get('Bar'), undefined);
    });

    it('pass existing name, should return a city object', () => {
        assert.deepEqual(Cities.get('Foo'), { name: 'Foo', north: 'Bar', south: 'Bee', west: '', east: '', alien: '' });
    });

    after(() => {
        Cities.cities = {};
    });
});

describe('Cities.delete(name)', () => {
    before(() => {
        Cities.cities = {
            Foo: { name: 'Foo', north: 'Bar', south: 'Bee', west: '', east: '', alien: '' }
        };
    });

    it('pass empty string, should not throw any error', () => {
        Cities.delete('');
    });

    it('pass a city name, Cities.get city name should return undefined', () => {
        Cities.delete('Foo');
        assert.equal(Cities.get('Foo'), undefined);
    });

    after(() => {
        Cities.cities = {};
    });
});