
//import pkg from './Tournament.js';
//const { Tournament } = pkg;


import { Tournament } from "../../repo/core/Tournament.js"

let t = new Tournament()


console.log(t)

//import { generateBergerPairingsIdx } from '../test_no_module_base/berger-fide-patch2.cjs'
import { generateBergerPairingsIdx } from '../../repo/berger-fide.js'

//import './repo/berger-fide.js'
//import pkg from './repo/berger-fide.js'
//import generateBergerPairingsIdx from './repo/berger-fide.js'
//import './repo/berger-fide.js'
console.log('generateBergerPairingsIdx: ' + generateBergerPairingsIdx)
console.log(typeof generateBergerPairingsIdx)

// Mock CookieConsent
let CookieConsent = {
	acceptedCategory : function(e) { return false }
}

//globalThis 
globalThis.CookieConsent = CookieConsent
//globalThis.generateBergerPairingsIdx =  generateBergerPairingsIdx

let x = generateBergerPairingsIdx(4)
console.log(x)

console.log(CookieConsent)
//t.addPlayer("abc", 2000)
//

globalThis.generateBergerPairingsIdx = generateBergerPairingsIdx

t.addPlayer('player1', 1500)
t.addPlayer('player2', 1700)
t.addPlayer('player3', 1900)
t.addPlayer('player4', 1600)
t.sortPlayers()
console.log(t)

t.generatePairings()
//console.log(pairing)
console.log(t)
console.log(t.rounds)
 
t.setResult(0, 0, '1')
t.setResult(0, 1, '0')
t.setResult(1, 0, '0')
t.setResult(1, 1, '0.5')

console.log("After setting results:")
console.log(t.rounds)
let standings = t.calculateStandings()
console.log(standings)





