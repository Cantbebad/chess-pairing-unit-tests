//import { jsdom }

import { JSDOM } from "jsdom"

console.log("jsdom")
console.log(JSDOM)
//const jsdom = require("jsdom");
//const { JSDOM } = jsdom;

//let dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
//console.log(dom.window.document.querySelector("p").textContent); // "Hello world"

//globalThis.window  = new JSDOM(`...`);
//globalThis.document  = new JSDOM(`...`);
//globalThis.document  = new JSDOM(`...`).window;
// or even
//const { document } = (new JSDOM(`...`)).window;

//const turn = require("Tournament.js")
//

import fs from 'node:fs';

let html = null
try {
  html = fs.readFileSync('../../repo/index.html', 'utf8');
//  console.log(data);
	console.log("read ok")
} catch (err) {
  console.error(err);
}

import jQuery from 'jquery'
console.log("jquery: ")
console.log(jQuery)
globalThis.$ = jQuery(new JSDOM(html).window)
//globalThis.window.jQuery = jQuery


//Mock CookieConsent
let CookieConsent = {
	acceptedCategory : function(e) { return true }
}
globalThis.CookieConsent = CookieConsent

import { Tournament } from '../../repo/core/Tournament.js'

//import { Controller } from './script-patched.js'
import { Controller } from '../../repo/script.js'

if (typeof document !== 'undefined') {
	// in browser
}
else {
	// in nodejs
	// use unique class name 
	class NodeDocument484948494849 {;}

	globalThis.document = new NodeDocument484948494849()
	document.cookie = {}
}

//import { generateBergerPairingsIdx } from '../test_no_module_base/berger-fide-patch2.cjs'
import { generateBergerPairingsIdx } from '../../repo/berger-fide.js'
globalThis.generateBergerPairingsIdx = generateBergerPairingsIdx

let app = new Controller(new Tournament())
app.initialize()

console.log(app)

app.addPlayerToTable('player1', 1500)
app.addPlayerToTable('player2', 1600)
app.addPlayerToTable('player3', 1900)
app.addPlayerToTable('player4', 1800)

globalThis.confirm = () => { return true}

app.lockAndPairing()

app.saveToCookie()

console.log(app)

app.loadFromCookie()

// Test refresh
app = null

app = new Controller(new Tournament())
app.initialize()

console.log(app)
console.log(app.data.players)


// Test refresh
app = null

app = new Controller(new Tournament())
app.initialize()

console.log(app)
console.log(app.data.players)

app.demo()

console.log(app)
console.log(app.data.players)


// Test refresh
app = null

app = new Controller(new Tournament())
app.initialize()

console.log(app)
console.log(app.data.players)
