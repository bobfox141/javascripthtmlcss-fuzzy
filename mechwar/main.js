// #!/usr/bin/env node
// # file: main.js
// # the main loop for the game. this is a battle between two giant robot, 
// # a player created one and a computer generated one
// # the instance determines lots of things, but mostly 
// # who wins. 



class Mech {
    constructor(nm, hp, dam, ar, sh) {
        this.name = nm;
        this.hitpoints = hp;
        this.damage = dam;
        this.armor = ar;
        this.shields = sh;
    }
    
}

class PlayerMech extends Mech {
    constructor(nm, hp, dam, ar, sh, pi, mr, atm, defm) {
        super(nm, hp, dam, ar, sh);
        this.pilot = pi;
        this.movement = mr;
        this.attackmod = atm;
        this.defensemod = defm;
    }
}

class ComputerMech extends Mech {

        constructor(nm, hp, dam, ar, sh, pi, rr, atm, defm) {
        super(nm, hp, dam, ar, sh);
        this.pilot = pi;
        this.responserate = mr;
        this.attackmod = atm;
        this.defensemod = defm;
    }
}
    
    function attack() {
        return rollD20();
    };
    
    function defend() {
        return rollD20();
    };


function rollD20() {
  // Generate a random number between 0 (inclusive) and 1 (exclusive)
  const randomNumber = Math.random();
  // Scale the random number to the range 0 to 19 (inclusive)
  // by multiplying by 20 (the number of sides)
  const scaledNumber = randomNumber * 20;
  // Round down to the nearest whole number to get an integer from 0 to 19
  const floorNumber = Math.floor(scaledNumber);
  // Add 1 to get the final result in the range 1 to 20 (inclusive)
  const result = floorNumber + 1;
  return result;
}

function loadplayermech() {
    const fs = require('fs');
    const yaml = require('js-yaml');

    try {
        const fileContents = fs.readFileSync('mech.yaml', 'utf8');
        const data = yaml.load(fileContents);
        console.log(data);
    } catch (e) {
        console.error(e);
    }
    return data;
}


function loadcomputermech() {
    const fs = require('fs');
    const yaml = require('js-yaml');

    try {
        const fileContents = fs.readFileSync('computer.yaml', 'utf8');
        const data = yaml.load(fileContents);
        console.log(data);
    } catch (e) {
        console.error(e);
    }
    return data;
}



function main() {
    console.log("Welcome to MechWar, a simple mech shooting game. You load your");
    console.log("Mech, and the computer loads it's mech and you have it out in the arena.");
    console.log("A simple AI will pilot your mech, and a similar AI will pilot the computer's");
    console.log("machine. It loads your mech from your mech.yaml file and puts it against the");
    console.log("computers computer.yaml file, generated before battle! ");
    // load the data files 
    
    
    // create the mechs and add the data
    const playermech = new Mech();
    const computermech = new Computermech();
    

}


main();