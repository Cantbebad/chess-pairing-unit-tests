
import { JSDOM, CookieJar } from "jsdom"
import fs from 'node:fs';

let html = null
try {
  html = fs.readFileSync('../repo/index.html', 'utf8');
} catch (err) {
  console.error(err);
}

let cookieJar = new CookieJar()

import jQuery from 'jquery'
globalThis.window = new JSDOM(html, {
	url: "http://localhost/",
  referrer: "http://localhost/",
  contentType: "text/html",
  includeNodeLocations: true,
  storageQuota: 100000,
  cookieJar
}).window

globalThis.document = window.document

globalThis.$ = jQuery(globalThis.window)

//Mock CookieConsent
let CookieConsent = {
	acceptedCategory : function(e) { return true }
}
globalThis.CookieConsent = CookieConsent

import { Tournament, Controller } from '../repo/script.js'
import { generateBergerPairingsIdx } from '../repo/berger-fide.js'

globalThis.generateBergerPairingsIdx = generateBergerPairingsIdx
globalThis.Tournament = Tournament
globalThis.Controller = Controller

import { TestCtx } from '../repo/modules/SimpleUnitTester.js'

import { TestTournament } from './tests/v3/unit_test_tournament.js'
import { TestBergerPairing } from './tests/v3/unit_test_berger_pairing.js'
import { TestController } from './tests/v2/unit_test_controller.js'

let ctx = new TestCtx()

// ctx.execute_catch_exc(
ctx.execute([
	new TestTournament(),
	new TestBergerPairing(),
	new TestController()
])



