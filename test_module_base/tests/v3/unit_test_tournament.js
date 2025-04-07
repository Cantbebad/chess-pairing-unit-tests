
export class TestTournament {
	_prepare_pure_clean_env() {
		/*
			// if fact, in Tournament, we can only saveToCookie now,
			// loadFromCooike is in Controller
			// probably it can be changed
			//
			// It is problematic, as Tournament does not use DOM except
			// this saveToCookie. All data in cookie are from Tournament,
			// no data from Controller, but working with DOM is Controller thing.
			// TODO: refactor: eliminate document.cookie from Tournament
		*/

		// remove all cookies from site
		document.cookie.split(";").forEach(function(c) { 
			document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" 
				+ new Date().toUTCString() + ";path=/"); });

		window.localStorage.removeItem('trndata', null)
		window.localStorage.removeItem('tournament-id=')

		let tour = new Tournament()

		return tour
	}

	test_addPlayer(t) {
		let tour = this._prepare_pure_clean_env()

		tour.addPlayer('Player1', '1600')

		t.mini.assertEq(tour.players.length, 1)
		t.mini.assertEq(tour.players[0].name, 'Player1')
		t.mini.assertEq(tour.players[0].Elo, 1600)
	}

		
	test_add_up_to_100_players(t) {
		let tour = this._prepare_pure_clean_env()
		let eloArr = new Array()

		for (let i=0; i < 100; ++i) {
			const name = "player" + i
			let Elo = Math.floor(Math.random()*4000)
			eloArr.push(Elo)

			if ((Math.random()*2) > 1) {
				// TODO
				//Elo = String(Elo) // this is wrong now, but doesn't throws anything
			}

			tour.addPlayer(name, Elo)

			for (let y = 0; y < i; y++) {
				const name_check = "player" + y
				t.mini.assertEq(tour.players[y].name, name_check) 
				t.mini.assertEq(tour.players[y].Elo, eloArr[y]) 
			}
			t.mini.assertEq(tour.players.length, i+1) 
		}
	}
}
