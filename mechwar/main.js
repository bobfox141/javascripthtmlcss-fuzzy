// #!/usr/bin/env node
// # file: main.js
// # the main loop for the game. this is a battle between two giant robot,
// # a player created one and a computer generated one
// # the instance determines lots of things, but mostly
// # who wins.

// lets create an attack class here.. an attack is a separate concept with its
// own attributes

import { Mech } from "./mech.js";
import { Attack } from "./attack.js";

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
    this.responserate = rr;
    this.attackmod = atm;
    this.defensemod = defm;
  }
}

function rollD20() {
  const randomNumber = Math.random();
  const scaledNumber = randomNumber * 20;
  const floorNumber = Math.floor(scaledNumber);
  const result = floorNumber + 1;
  return result;
}

function rollD99() {
  const randomNumber = Math.random();
  const scaledNumber = randomNumber * 99;
  const result = Math.floor(scaledNumber);
  return result;
}

function loadplayermech() {
  const fs = require("fs");
  const yaml = require("js-yaml");
  try {
    const fileContents = fs.readFileSync("mech.yaml", "utf8");
    const data = yaml.load(fileContents);
    console.log(data);
  } catch (e) {
    console.error(e);
  }
  return data;
}

function createplayermech() {
  console.log("Creating Player mech.");
  var p = new PlayerMech("Rogue", 100, 20, 20, 15, 85, 1.5, 2);
  return p;
}

function loadcomputermech() {
  const fs = require("fs");
  const yaml = require("js-yaml");

  try {
    const fileContents = fs.readFileSync("computer.yaml", "utf8");
    const data = yaml.load(fileContents);
    console.log(data);
  } catch (e) {
    console.error(e);
  }
  return data;
}

// simple create mech from scratch
function createcomputermech() {
  console.log("Creating AI mech.");
  var c = new PlayerMech("Timberwolf", 100, 20, 20, 15, 85, 2, 1.5);
  return c;
}
// this is binary initiative.
function initiative() {
  if (rollD20() > 10) {
    return true;
  }
  return false;
}

function playermove(pmech, cmech, a) {
  process.stdout.write("function Playermove: Type of Attack Parameter: ");
  console.log(typeof a);
  a = pmech.attack(a);
  a = cmech.defend(a);
}

function computermove(cmech, pmech, a) {
  process.stdout.write("function ComputerMove: Type of Attack Parameter: ");
  console.log(typeof a);
  a = cmech.attack(a); // calls the attack function of the mech, then returns the attack
  a = pmech.defend(a);
}

// returns true or false based on whether there is a winner or not.
// winning conditions a mech hp = 0 or it has no mobility.. i.e.
// no legs
function endofbattle(p, c) {
  return true;
}

function testrandom() {
  let numbers = [];
  console.log("Print out 100 random numbers. \n");
  let count = 0;
  while (count < 100) {
    count++;
    numbers.push(rollD20());
  }
}

function main() {
  let winner = false;
  console.log("Welcome to MechWar, a simple mech shooting game. You load your");
  console.log(
    "Mech, and the computer loads it's mech and you have it out in the arena."
  );
  console.log(
    "A simple AI will pilot your mech, and a similar AI will pilot the computer's"
  );
  console.log(
    "machine. It loads your mech from your mech.yaml file and puts it against the"
  );
  console.log("computers computer.yaml file, generated before battle! ");
  // test the random number gen
  // testrandom();
  console.log();

  // load the data files

  // create the mechs and add the data
  var p = createplayermech();
  var c = createcomputermech();

  // so the idea is to repeat combat turns till someone wins.
  while (!winner) {
    console.log("Rolling for intialtive. Tie goes to the great sky wizard.");

    if (initiative()) {
      console.log("Player has initiative and moves first.");
      var a = new Attack();
      playermove(p, c, a);
      computermove(c, p, a);
    } else {
      console.log("Computer has initiative and moves first.");
      var a = new Attack();
      computermove(c, p, a);
      playermove(p, c, a);
    }
    winner = endofbattle();
  }
}

main();
