
export class TestController {
	_prepare_pure_clean_env() {
		if (document && document.cookie) {
			// we are in nodejs, this is correct

			document.cookie = {}
		}
		let app = new Controller(new Tournament())

		return app
	}

	test_initialize(t) {
		let app = this._prepare_pure_clean_env()
		app.initialize()

		//console.log(app)

		t.mini.assertEq(
			app.data.tournamentInfo.autoShuffleOrderOfPlayers,
			true
		)
	}

	test_if_demo_runs(t) {
		let app = this._prepare_pure_clean_env()
		app.initialize()
		app.demo()

		//console.log(app)

		t.mini.assertEq(app.data.players.length, 10)
		t.mini.assertEq(app.data.rounds.length, 9)
		t.mini.assertEq(
			app.data.tournamentInfo.title,
			'Fictional Tournament'
		)
	}

	test_if_demo_runs_after_browser_refresh(t) {
		let app = this._prepare_pure_clean_env()
		app.initialize()
		app.demo()

		app = null
		app = new Controller(new Tournament())
		app.initialize()
		//console.log(app)

		t.mini.assertEq(app.data.players.length, 10)
		t.mini.assertEq(app.data.rounds.length, 9)
		t.mini.assertEq(
			app.data.tournamentInfo.title,
			'Fictional Tournament'
		)
	}
}
