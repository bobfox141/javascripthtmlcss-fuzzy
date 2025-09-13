// #!/usr/bin/env node
// # file: main.js
// # the main loop for the game. this is a battle between two giant robot,
// # a player created one and a computer generated one
// # the instance determines lots of things, but mostly
// # who wins.


// lets create an attack class here.. an attack is a separate concept with its 
// own attributes
class Attack {
    constructor(c, b, d ) {
	this.critical = c; 
	this.badmiss = b;
	this.damage = d; // damage is transferred from attack to defense...
	this.damagebonus = 2;
    }

}


class Mech {
    constructor(nm, hp, dam, ar, sh, pi) {
	this.name = nm;
	this.hitpoints = hp;
	this.damage = dam;   // this is damage range [1.. dam]
	this.armor = ar;
	this.shields = sh;
	this.eject = true;
	this.head = true;
	this.arm = true;
	this.reactor = true;
	this.torso = true;
	this.leg = true;
	this.pilot = pi;     // pilot skill factor
	this.mobility = true;
	this.attacks = true;
	this.shutdown = false;
    }

    // basic to hit calculation
    attack() {
	
	let roll = rollD20();
	// attack tree. 
	let critical = false;
	let badmiss = false;
	let damage = 0;
	let damagebonus = 2;

	if (roll > 18) {
	    process.stdout.write("Critical Hit! Double damage plus possible penetration effects Calculating.... ");
	    critical = true;
	    badmiss = false;
	    damage = this.dam * damagebonus;  // critical hit, max damage + critical bonus
	    return true;
	} 
	else if (roll > 10) {   // direct hit full damage * pilot skill 
	    process.stdout.write("Direct Hit! Calculating damage... ");
	    critical = false;
	    badmiss = false;
	    damage = this.damage + (this.damage * this.pilot / 100.0);
	    return true;
	}
	else if (roll > 7) {      // glancing hit affected by skill of pilot
	    process.stdout.write("Hit. Lesser Damage reduced by spreading over the area... ");
	    critical = false;
	    badmiss = false;           
	    damage = this.damage + (this.damage * this.pilot / 200.0);
	    return true;
	}
	else if (roll > 2) {      // complete miss 
	    console.log("Miss. No damage, no energy transferred.");
	    critical = false;    
	    badmiss = false;
	    damage = 0;
	    return false; 
	}
	else {
	    console.log("Bad Miss.")
	    critical = false;
	    badmiss = true;
	    damage = this.damage + ( this.damage * this.pilot / 200.0);   // bad miss damage is reflected on the firing mech. 
	    return false;
	}
	
    }

    // defend routine
    defend(a) {
	critical = a.critcal;
	badmiss = a.badmiss;
	damage = a.damage;
	damagebonus = a.damagebonus;
	let roll = rollD20();
	// if there is damage
	if (damage > 0) {
	    console.log("Attack hits, damage applied, rolling to defend...");
	    if (roll > 18) {
		if (critical) {
		    console.log("Critical Defend, Critical Attack blocked, normal damage applies.");
		    this.hp -= damage;
		    
		    let systemroll = rollD20();
		    if (systemroll == 0) {
			console.log("Direct hit to reactor. Your mech shutdown, all lifesupport is down.");
			if (this.eject) {
			    console.log("Ejecting!!!");
			}
			else {
			    console.log("Ejection failed, lifesupport failed, emergency beacon activated.");
			}
			this.reactor = false;
			this.shutdown = true;
			this.hp = 0;
			return true;  // special case mech is done.
		    }
		    else if (systemroll > 15) {
			this.head = false;
			this.hp -= damage + (.2 * this.hp);
			
		    }
		    else if (systemroll > 10) {
			this.arm = false;
			this.hp -= damage + (.2 * this.hp);
		    }
		    else if (systemroll > 5) {
			this.leg = false;
			this.hp -= damage + (.2 * this.hp);
		    }
		    else if (systemroll > 0) {
			this.torso = false;
			this.hp -= damage + (.3 * this.hp);

		    }
		    
		}
		else {
		    console.log("Critical Defend, all damage blocked!");
		    damage = 0;
		    return false;
		}
		if (this.hp < 1) {
		    console.log("Defender systems shutdown, status critical, ejecting!");
		    this.shutdown = true;
		}
		return true;
	    }
	    else if (roll > 10) {
		console.log("Skilled Defender. ")
		damage = damage * this.pilot / 100.0;   // 
		this.hp -= damage;

	    }
	    else if (roll > 7) {
		console.log("Defense negates a portion of the damage.")
		damage = damage * this.pilot / 200.0;   // 
		this.hp -= damage;  
	    }
	    else if (roll > 2) {
		this.hp -= damage;
	    }
	    else {
		console.log("Bad Defend. Attack damage is multiplied by 1.5");
		damage = damage * 1.5;
		this.hp -= damage;
	    }
	    return true;
	}
	return false;

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

function createplayermech(mech) {
    mech.
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
// this is binary initiative.
function initiative() {
    if (rollD20() > 10) {
	return true;
    }
    return false;
}


function playermove() {
    
}

function computermove() {
    attack()

}

function endofturn() {
    return true;
}

function testrandom() {
    console.log("Print out 100 random numbers. \n");
    let count = 0;
    while (count < 100) {
	count++;
	push.append(rollD20());
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
    testrandom();
    console.log();

    // load the data files

    // create the mechs and add the data
    const playermech = new PlayerMech();
    const computermech = new ComputerMech();
    while (!winner) {
	console.log("Rolling for intialtive. Tie goes to the great sky wizard.");
	if (initiative()) {
	    console.log("Player has initiative and moves first.");
	    playermove();
	    computermove();
	} else {
	    console.log("Computer has initiative and moves first.");
	    computermove();
	    playermove();
	}
	winner = endofturn();
    }
}

main();
