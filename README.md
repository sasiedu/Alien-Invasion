# ALIEN INVASION

Mad aliens are about to invade the earth and you are tasked with simulating the invasion.

### Prerequisite
* <b>Node</b> (10.9+) https://nodejs.org/en/
* <b>Npm</b> (6.4+)


### Installation
Make sure you have node.js and npm installed.

Clone the repository and install the dependencies
```bash
git clone https://github.com/sasiedu/Alien-Invasion.git
cd Alien-Invasion
npm install
```

### Run
Run node game.js and pass map file and number of aliens as parameters.<br />
Format: ```npm start -- --map=$PATH_TO_MAP_FILE --aliens=$NUMBER_OF_ALIENS```

```bash
npm start -- --map=maps/map-9 --aliens=7
```

### Testing
Run the test suite with:
```bash
npm test
```
[Test Documentation](docs/TEST_DOCUMENTATION.md)

### Assumptions
* Number of cities will always be more than number of aliens.
