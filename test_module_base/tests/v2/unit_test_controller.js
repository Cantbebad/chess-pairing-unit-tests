
export class TestController {
	_prepare_pure_clean_env() {
		// remove all cookies from site
		document.cookie.split(";").forEach(function(c) { 
			document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" 
				+ new Date().toUTCString() + ";path=/"); });

		/* not used in v2
		window.localStorage.removeItem('trndata')
		window.localStorage.removeItem('tournament-id=', null)
		*/

		let app = new Controller(new Tournament())

		return app
	}

	test_initialize(t) {
		let app = this._prepare_pure_clean_env()
		app.initialize()

		//console.log(app)

		t.mini.assertEq(
			app.data.tournamentInfo.pairing_version,
			1
		)
	}

	test_if_demo_runs(t) {
		let app = this._prepare_pure_clean_env()
		app.initialize()
		app.testAll()

		// console.log(app)

		t.mini.assertEq(app.data.players.length, 10)
		t.mini.assertEq(app.data.rounds.length, 9)
	}

	test_if_demo_runs_after_browser_refresh(t) {
		let app = this._prepare_pure_clean_env()
		app.initialize()
		app.testAll()

		app = null
		app = new Controller(new Tournament())
		app.initialize()
		//console.log(app)

		t.mini.assertEq(app.data.players.length, 10)
		t.mini.assertEq(app.data.rounds.length, 9)
	}
}
