
import { CookiesWrapper } from '../../../repo/modules/CookiesWrapper.js'

class PerfTimerSimple {
	constructor(fn) {
		this.diff = 0
		this.startVal = 0
		this.endVal = 0
	}

	start() {
		this.startVal = new Date().valueOf()
	}

	end() {
		this.endVal = new Date().valueOf()
		this.diff = this.endVal - this.startVal
	}

	getDiffInSec() {
		return this.diff / 1000
	}
}

class PerfTimerWrapper {
	constructor(fn) {
		this.perfTimerFn = fn
		this.perfTimerDiff = 0

		//return this.perfTimerRun.bind(this)
	}

	perfTimerRun(...params) {
		const timeS = new Date().valueOf()
		let res = this.perfTimerFn(...params)
		
		const timeE = new Date().valueOf()
		this.perfTimerDiff = (timeE - timeS)

		return res
	}

	perfTimerGetDiffInSec() {
		return this.perfTimerDiff / 1000
	}
}

/*
PerfTimerWrapper.prototype.call = function () {
	return this.perfTimerRun()
}
*/


export class TestPerformance {
	_prepare_pure_clean_env() {
		// remove all cookies from site
		document.cookie.split(";").forEach(function(c) { 
			document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" 
				+ new Date().toUTCString() + ";path=/"); });

		window.localStorage.removeItem('trndata')
		window.localStorage.removeItem('tournament-id=', null)

		let app = new Controller(new Tournament())

		return app
	}


	_test_cookie_limits(t) {
		let app = this._prepare_pure_clean_env()
		app.initialize()
		
		for (let i=1; i<=60; ++i) {
			const name = Number(i).toString() + "a".repeat(30)
			//console.log(name)
			app.addPlayerToTable(name, 1000)
		}
		app.randomizePlayers()  // need to skip confirm for now


		let pfs = new PerfTimerSimple()
		pfs.start()
		app.lockAndPairing()
		pfs.end()
		
		console.log("lock and pairing time [in sec]: " + pfs.getDiffInSec())

		pfs.start()
		app.generateTestResults()
		app.saveToCookie()
		pfs.end()

		console.log("generateTestResults [in sec]: " + pfs.getDiffInSec())

		
		let data = new CookiesWrapper().load_base64_from_cookie('trndata')
		console.log(data)
		console.log('cookie size (approx.)  = ' + data.length)

		//console.log(app)

		t.mini.assertEq(app.data.players.length, 60)
		t.mini.assertEq(app.data.rounds.length, 59)
	}

	// not unit test
	test_cookie_limits(t) {
		// time-consuming test (can be nodejs+jsdom+jquery is complicated)
		// uncomment to apply
		console.log("this is time consuming test")
		this._test_cookie_limits(t)
	}

	_test_generate_random_results_performance(t, numOfPlayers) {
		let app = this._prepare_pure_clean_env()
		app.initialize()

		console.log("****************************************")

		//app.generateTestResults = new PerfTimerWrapper(app.generateTestResults)
		
		for (let i=1; i<= numOfPlayers; ++i) {
			const name = Number(i).toString() + "a".repeat(30)
			//console.log(name)
			app.addPlayerToTable(name, 1000)
		}
		app.randomizePlayers()  // need to skip confirm for now

		{
			let pf = null
			pf = new PerfTimerWrapper(app.lockAndPairing.bind(app))
			pf.perfTimerRun()
			console.log(""+ numOfPlayers + ":lockAndPairing time [in sec]: " + pf.perfTimerGetDiffInSec())
		}
		{

			let pf = null
			pf = new PerfTimerWrapper(app.generateTestResults.bind(app))
			//app.generateTestResults()
			pf.perfTimerRun()
			console.log(""+ numOfPlayers + ":generateTestResults time [in sec]: " + 
				pf.perfTimerGetDiffInSec())
		}

		{
			// only to test times

			let pf = null
			pf = new PerfTimerWrapper(app.generateCrossTable.bind(app))
			pf.perfTimerRun()
			console.log(""+ numOfPlayers + ":generateCrossTable time [in sec]: " + 
				pf.perfTimerGetDiffInSec())
		}
		{
			// only to test times

			let pf = null
			pf = new PerfTimerWrapper(app.saveToCookie.bind(app))
			pf.perfTimerRun()
			console.log(""+ numOfPlayers + ":saveToCokie time [in sec]: " + 
				pf.perfTimerGetDiffInSec())
		}

		{
			// only to test times
			let pfs = null
			pfs = new PerfTimerSimple()
			
			app.clearResultsTab()

			pfs.start()
			for (let i = 1; i <= (app.data.rounds.length); i++) { 
				app.createRoundTab(i)
            }
			pfs.end()
			console.log(""+ numOfPlayers + ":createRoundTab time [in sec]: " + 
				pfs.getDiffInSec())
              
		}
	}

	// not unit test
	test_generate_random_results_performance(t) {
		for (let i=25; i<30; ++i) {
			this._test_generate_random_results_performance(t, i)
		}
	}

}
