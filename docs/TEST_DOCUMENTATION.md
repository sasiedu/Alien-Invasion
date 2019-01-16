# ALIEN INVASION TEST DOCUMENTATION

* [Game](game)

* [Aliens.add(name, cityName)](aliens.add(name,-cityname))

* [Aliens.generate(number)](aliens.generate(number))

* [Aliens.move(name, city)](aliens.move(name,-city))

* [Aliens.delete(name)](aliens.delete(name))

* [Cities.add(line)](cities.add(line))

* [Cities.get(name)](cities.get(name))

* [Cities.delete(name)](cities.delete(name))

* [addAlienToCity(cityName, alienName)](addalientocity(cityname,-alienname))

* [removeAlienFromCity(cityName)](removealienfromcity(cityname))

* [CommandlineUtils.parse(cmdArgs[])](commandlineutils.parse(cmdargs[]))

* [FileUtils.readFile(filePath)](fileutils.readfile(filepath))
# Game
 Game #buildWorld should populate cities from test.map and generate 4 aliens

```
Game.buildWorld(['node', 'app.js', '--aliens=4', '--map=test.map']);
assert.equal(Object.keys(Cities.getAll()).length, 9);
assert.equal(Object.keys(Aliens.getAll()).length, 4);
```


 Game #playRound all aliens should run with no error

```
Game.playRound();
```


# Aliens.add(name, cityName)
 Aliens.add(name, cityName) pass an empty name, should not throw an error

```
Aliens.add('', 'Foo');
```


 Aliens.add(name, cityName) pass an empty city name, Aliens.get(name) should return undefined

```
Aliens.add('Foo', '');
assert.equal(Aliens.get('Foo'), undefined);
```


 Aliens.add(name, cityName) pass an invalid city name, Aliens.get(name) should return undefined

```
Aliens.add('Foo', 'Bar');
assert.equal(Aliens.get('Foo'), undefined);
```


 Aliens.add(name, cityName) pass in alien name and valid city name, Aliens.get(name) should return an object

```
Aliens.add('Alien', 'Foo');
assert.deepEqual(Aliens.get('Alien'), { name: 'Alien', city: 'Foo', moves: 0 });
```


# Aliens.generate(number)
 Aliens.generate(number) pass in a number less than 1, Aliens.getAll should be an empty object

```
Aliens.generate(0);
assert.deepEqual(Aliens.getAll(), {});
```


 Aliens.generate(number) pass in a number greater than 0, Aliens.getAll array should be the same length as the number

```
Aliens.generate(3);
assert.equal(Object.keys(Aliens.getAll()).length, 3);
```


# Aliens.move(name, city)
 Aliens.move(name, city) pass empty name, should not throw any error

```
Aliens.move('', 'Foo');
```


 Aliens.move(name, city) pass non existing name, should not throw any error

```
Aliens.move('AlienBaby', 'Foo');
```


 Aliens.move(name, city) pass empty city, alien should not move

```
Aliens.move('Alien', '');
assert.equal(Aliens.get('Alien').city, 'Foo');
```


 Aliens.move(name, city) pass invalid city, alien should not move

```
Aliens.move('Alien', 'Bazz');
assert.equal(Aliens.get('Alien').city, 'Foo');
```


 Aliens.move(name, city) pass same city, alien should not move

```
Aliens.move('Alien', 'Foo');
assert.equal(Aliens.get('Alien').city, 'Foo');
assert.equal(Aliens.get('Alien').moves, 0);
assert.equal(Cities.get('Foo').alien, 'Alien');
```


 Aliens.move(name, city) moves equal 10000, alien should not move

```
Aliens.move('Alien2', 'Bar');
assert.equal(Aliens.get('Alien2').city, 'Bee');
assert.equal(Aliens.get('Alien2').moves, 10000);
assert.equal(Cities.get('Bee').alien, 'Alien2');
```


 Aliens.move(name, city) pass in existing name with valid city name, alien should move to new city

```
Aliens.move('Alien', 'Bee');
assert.equal(Aliens.get('Alien').city, 'Bee');
assert.equal(Aliens.get('Alien').moves, 1);
assert.equal(Cities.get('Bee').alien, 'Alien');
assert.equal(Cities.get('Foo').alien, '');
```


# Aliens.delete(name)
 Aliens.delete(name) pass an empty name, should not throw an error

```
Aliens.delete('');
```


 Aliens.delete(name) pass invalid name, should not throw an error

```
Aliens.delete('Alien2');
```


 Aliens.delete(name) pass a valid name, should not throw an error

```
Aliens.delete('Alien');
assert.equal(Aliens.get('Alien'), undefined);
assert.equal(Cities.get('Foo').alien, '');
```


# Cities.add(line)
 Cities.add(line) pass an empty line, should throw an error [Invalid line]

```
assert.throws(() => { Cities.add('') }, Error, 'Invalid line');
```


 Cities.add(line) pass a line with only city name, should throw an error [Require at least one direction: $line]

```
assert.throws(() => { Cities.add('Foo') }, Error, 'Require at least one direction: Foo');
```


 Cities.add(line) pass a line with no valid direction, should throw an error [Require at least one direction: $line]

```
assert.throws(() => { Cities.add('Foo noth=Bar') }, Error, 'Require at least one direction: Foo noth=Bar');
```


 Cities.add(line) pass a line with duplicate direction, should throw an error [Duplicate direction: $line]

```
assert.throws(() => { Cities.add('Foo north=Bar north=Bee') }, Error, 'Duplicate direction: Foo north=Bar north=Bee');
```


 Cities.add(line) pass a line with city name and 2 valid directions, should be successful

```
Cities.add('Foo north=Bar south=Bee');
assert.deepEqual(Cities.get('Foo'), { name: 'Foo', north: 'Bar', south: 'Bee', west: '', east: '', alien: '' });
```


# Cities.get(name)
 Cities.get(name) pass empty name, should return undefined

```
assert.equal(Cities.get(''), undefined);
```


 Cities.get(name) pass non existing name, should return undefined

```
assert.equal(Cities.get('Bar'), undefined);
```


 Cities.get(name) pass existing name, should return a city object

```
assert.deepEqual(Cities.get('Foo'), { name: 'Foo', north: 'Bar', south: 'Bee', west: '', east: '', alien: '' });
```


# Cities.delete(name)
 Cities.delete(name) pass empty string, should not throw any error

```
Cities.delete('');
```


 Cities.delete(name) pass a city name, Cities.get city name should return undefined

```
Cities.delete('Foo');
assert.equal(Cities.get('Foo'), undefined);
```


# Cities.addAlienToCity(cityName, alienName)
 Cities.addAlienToCity(cityName, alienName) pass empty city name, should not throw any error

```
Cities.addAlienToCity('', 'alien');
```


 Cities.addAlienToCity(cityName, alienName) pass non existing city name, should not throw any error

```
Cities.addAlienToCity('Bar', 'alien');
```


 Cities.addAlienToCity(cityName, alienName) pass an empty alien name, should not throw any error

```
Cities.addAlienToCity('Foo', '');
```


 Cities.addAlienToCity(cityName, alienName) pass an existing city name and alien name, Cities.get(cityName).alien should be equal to alien name

```
Cities.addAlienToCity('Foo', 'alien');
assert.equal(Cities.get('Foo').alien, 'alien');
```


# Cities.removeAlienFromCity(cityName)
 Cities.removeAlienFromCity(cityName) pass empty city name, should not throw any error

```
Cities.removeAlienFromCity('');
```


 Cities.removeAlienFromCity(cityName) pass non existing city name, should not throw any error

```
Cities.removeAlienFromCity('Bar');
```


 Cities.removeAlienFromCity(cityName) pass an existing city name, Cities.get(cityName).alien should be empty

```
Cities.removeAlienFromCity('Foo');
assert.equal(Cities.get('Foo').alien, '');
```


# CommandlineUtils.parse(cmdArgs[])
 CommandlineUtils.parse(cmdArgs[]) empty array - cmdArgs[]

```
assert.equal(CommandlineUtils.parse([]), null);
```


 CommandlineUtils.parse(cmdArgs[]) array less than 4 - cmdArgs['node', 'game.js']

```
assert.equal(CommandlineUtils.parse(['node', 'game.js']), null);
```


 CommandlineUtils.parse(cmdArgs[]) without values values(--map and --aliens) - cmdArgs['node', 'game.js', '--world=map-1', '--count=3']

```
assert.equal(CommandlineUtils.parse(['node', 'game.js', '--world=map-1', '--count=3']), null);
```


 CommandlineUtils.parse(cmdArgs[]) when --aliens value is not a number - cmdArgs['node', 'game.js', '--map=map-1', '--aliens=three']

```
assert.equal(CommandlineUtils.parse(['node', 'game.js', '--map=map-1', '--aliens=three']), null);
```


 CommandlineUtils.parse(cmdArgs[]) when --aliens value is less than 1 - cmdArgs['node', 'game.js', '--map=map-1', '--aliens=0']

```
assert.equal(CommandlineUtils.parse(['node', 'game.js', '--map=map-1', '--aliens=0']), null);
```


 CommandlineUtils.parse(cmdArgs[]) cmdArgs['node', 'game.js', '--map=map-1', '--aliens=3']

```
const obj = CommandlineUtils.parse(['node', 'game.js', '--map=map-1', '--aliens=3']);
assert.equal(obj.mapPath, 'map-1');
assert.equal(obj.alienCount, 3);
```


# FileUtils.readFile(filePath)
 FileUtils.readFile(filePath) pass non existing file, should return undefined

```
assert.equal(FileUtils.readFile('no-file'), undefined);
```


 FileUtils.readFile(filePath) pass empty file, should return null

```
assert.equal(FileUtils.readFile('empty-file'), null);
```


 FileUtils.readFile(filePath) pass one-line file, should return an array with length 1

```
const arr = ['Foo north=Bar west=Baz'];
assert.deepEqual(FileUtils.readFile('one-line'), arr);
```


 FileUtils.readFile(filePath) pass multiple-lines file, should return an array with length equal to number of lines in file

```
assert.deepEqual(FileUtils.readFile('multiple-lines'), ['Foo north=Bar west=Baz', 'Foo north=Bar west=Baz', 'Foo north=Bar west=Baz']);
```
