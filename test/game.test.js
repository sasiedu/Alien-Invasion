'use strict'
const assert = require('assert');
const fs = require('fs');

const Game = require('../lib/game');
const Cities = require('../lib/cities');
const Aliens = require('../lib/aliens');

describe('Game', () => {
    before(() => {
        fs.writeFileSync('test.map', `City1 east=City2 south=City4\nCity2 west=City1 east=City3 south=City5\nCity3 west=City2 south=City6\nCity4 north=City1 east=City5 south=City7\nCity5 west=City4 north=City2 east=City6 south=City8\nCity6 west=City5 north=City3 south=City9\nCity7 north=City4 east=City8\nCity8 west=City7 north=City5 east=City9\nCiity9 west=City8 north=City6`);
    });

    it('#buildWorld should populate cities from test.map and generate 4 aliens', () => {
        Game.buildWorld(['node', 'app.js', '--aliens=4', '--map=test.map']);
        assert.equal(Object.keys(Cities.getAll()).length, 9);
        assert.equal(Object.keys(Aliens.getAll()).length, 4);
    });

    it('#playRound all aliens should have moves equal to 1', () => {
        Game.playRound();
        const aliens = Object.keys(Aliens.getAll());
        aliens.forEach(name => {
            assert.equal(Aliens.get(name).moves, 1);
        });
    })

    after(() => {
        fs.unlinkSync('test.map');
    });
});