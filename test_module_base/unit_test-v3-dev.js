//import { jsdom }

import { JSDOM } from "jsdom"
import fs from 'node:fs';

let html = null
try {
  html = fs.readFileSync('../repo/index.html', 'utf8');
} catch (err) {
  console.error(err);
}

import jQuery from 'jquery'
globalThis.$ = jQuery(new JSDOM(html).window)

//Mock CookieConsent
let CookieConsent = {
	acceptedCategory : function(e) { return true }
}
globalThis.CookieConsent = CookieConsent

import { Tournament } from '../repo/core/Tournament.js'
import { Controller } from '../repo/script.js'

// create special document.cookie object for jsdom
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

import { generateBergerPairingsIdx } from '../repo/berger-fide.js'

// add names to global space
globalThis.generateBergerPairingsIdx = generateBergerPairingsIdx
globalThis.Tournament = Tournament
globalThis.Controller = Controller

import { TestCtx } from '../repo/modules/SimpleUnitTester.js'

import { TestTournament } from './tests/v3/unit_test_tournament.js'
import { TestBergerPairing } from './tests/v3/unit_test_berger_pairing.js'
import { TestController } from './tests/v3/unit_test_controlle.js'

let ctx = new TestCtx()

//execute_catch_exc(
ctx.execute([
	new TestTournament(),
	new TestBergerPairing(),
	new TestController()
])



