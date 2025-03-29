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

import { Tournament, Controller } from '../repo/script.js'

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

globalThis.generateBergerPairingsIdx = generateBergerPairingsIdx
globalThis.Tournament = Tournament
globalThis.Controller = Controller

import { TestCtx } from '../repo/modules/SimpleUnitTester.js'

import { TestTournament } from './tests/v3/unit_test_tournament.js'
import { TestBergerPairing } from './tests/v3/unit_test_berger_pairing.js'
import { TestController } from './tests/v2/unit_test_controller.js'

let ctx = new TestCtx()

ctx.execute([
	new TestTournament(),
	new TestBergerPairing(),
//	new TestController() // will not work, 'cause cant recognize document.getElementById
])



