#!/usr/bin/env node

// the standard attack class. This is really simple for now, but it will grow.
// an attack is an instance in itself because it doesn't matter to the target
// what hit it. so every half turn an attack is created and destroyed.

class Attack {
  constructor(c, b, d) {
    this.hit = true; // seems obvious but...
    this.critical = c;
    this.badmiss = b;
    this.damage = d; // damage is transferred from attack to defense...
    this.damagebonus = 2;
  }
}
