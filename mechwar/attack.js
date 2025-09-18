#!/usr/bin/env node

// the standard attack class. This is really simple for now, but it will grow.
// an attack is an instance in itself because it doesn't matter to the target
// what hit it. so every half turn an attack is created and destroyed.

class Attack {
  constructor() {
    this.hit = false; // when we create it there may not be a hit..
    this.critical = false;
    this.badmiss = false;
    this.damage = 0; // damage is transferred from attack to defense...
    this.damagebonus = 2;
  }

  setcritical(a) {
    this.critical = a;
  }

  getcritical() {
    return this.critical;
  }

  setbadmiss(a) {
    this.badmiss = a;
  }
  getbadmiss() {
    return this.badmiss;
  }

  setdamage(a) {
    this.damage = a;
  }

  getdamage() {
    return this.damage;
  }

  setdamagebonus(a) {
    this.damagebonus = a;
  }

  getdamagebonus() {
    return this.damagebonus;
  }
}

export { Attack };
