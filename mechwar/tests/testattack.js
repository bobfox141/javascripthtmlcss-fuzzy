#!/usr/bin/env node

import { Attack } from "../attack.js";

function testAttackcreate() {
  console.log("Creating an attack object");
  var p = new Attack();
  if (typeof p == "object") {
    console.log("Object created successfully.");
  } else {
    console.error("Creation failed.");
  }
}

function testAssignAttribs() {
  var p = new Attack();
  p.badmiss = true;
  p.critical = true;
  p.damage = 10;
  process.stdout.write("p.badmiss == ");
  console.log(p.badmiss);
  process.stdout.write("p.critical == ");
  console.log(p.critical);
}

function testGetDamage() {
  var p = new Attack();
  p.damage = 10;
  process.stdout.write("p.damage == ");
  console.log(p.damage);
}

function main() {
  console.log("Running unit tests to completion.");
  testAttackcreate();
  testAssignAttribs();
  testGetDamage();
}

main();
