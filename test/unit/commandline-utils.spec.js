'use strict'
const assert = require('assert');

const CommandlineUtils = require('../../lib/utils/commandline-utils');

describe('CommandlineUtils.parse(cmdArgs[])', () => {

    it('returns empty null if cmdArgs is empty', () => {
        assert.equal(CommandlineUtils.parse([]), null);
    });

    it('returns empty null if cmdArgs length is less than 4', () => {
        assert.equal(CommandlineUtils.parse(['node', 'game.js']), null);
    });

    it('returns empty null if required values(--map and --aliens) are not in cmdArrgs', () => {
        assert.equal(CommandlineUtils.parse(['node', 'game.js', '--world=map-1', '--count=3']), null);
    });

    it('returns empty null if required values --aliens is not a number', () => {
        assert.equal(CommandlineUtils.parse(['node', 'game.js', '--map=map-1', '--aliens=three']), null);
    });

    it('returns empty null if required values --aliens is a number less than 1', () => {
        assert.equal(CommandlineUtils.parse(['node', 'game.js', '--map=map-1', '--aliens=0']), null);
    });

    it('returns an object { mapPath, alienCount }', () => {
        const obj = CommandlineUtils.parse(['node', 'game.js', '--map=map-1', '--aliens=3']);
        assert.equal(obj.mapPath, 'map-1');
        assert.equal(obj.alienCount, 3);
    });
});