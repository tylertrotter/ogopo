import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
		aspectRatio: {x: 3, y:2},
		tick: 0,
		mineralNames: ['tungsten', 'radium', 'copper', 'mercury', 'tin'],
		planets: [],
		planetsInRange: [],
		players: [
			{
				name: "pubogu",
				color: "orange",
				planet: "0",
				burstRange: 3,
				position: {x:-10, y: 20},
				materials: []
			},
			{
				name: "gubo",
				color: "blue",
				planet: "0",
				burstRange: 3,
				position: {x:-10, y: 40},
				materials: []
			},
			{
				name: "bobo",
				color: "red",
				planet: "0",
				burstRange: 3,
				position: {x:-10, y: 60},
				materials: []
			}
		],
		systems: [
			{
				width: 40,
				x: 0,
				y: 0,
				sunSize: 5,
				clockwise: false,
				planets: [
					{
						radius: 2,
						ring: 1,
						speed: 10,
						mineral: 0
					},
					{
						radius: 2,
						ring: 1,
						speed: 10,
						mineral: 2,
						spot: 1
					},
					{
						radius: 1,
						ring: 2,
						speed: 22,
						mineral: 0,
						spot: 10,
						retrograde: true
					},
					{
						radius: .75,
						ring: 2,
						speed: 22,
						mineral: 0,
						spot: 20,
						retrograde: true
					},
					{
						radius: 2.25,
						ring: 3,
						speed: 18,
						mineral: 1,
						spot: 5
					},
					{
						radius: 1,
						ring: 3,
						speed: 18,
						mineral: 1,
						spot: 12
					},
					{
						radius: .75,
						ring: 3,
						speed: 18,
						mineral: 2,
						spot: 17
					},
					{
						radius: 1,
						ring: 4,
						speed: 40,
						mineral: 0,
						spot: 2,
						retrograde: true
					},
					{
						radius: 2,
						ring: 4,
						speed: 40,
						mineral: 0,
						spot: 2,
						retrograde: true
					},
					{
						radius: 1,
						ring: 4,
						speed: 40,
						mineral: 0,
						spot: 2,
						retrograde: true
					},
					{
						radius: 2,
						ring: 4,
						speed: 40,
						mineral: 0,
						spot: 10,
						retrograde: true
					}
				]
			},
			{
				width: 32,
				x: 26.5,
				y: 32,
				sunSize: 3,
				clockwise: true,
				planets: [
					{
						radius: 2.5,
						ring: 1,
						speed: 30,
						mineral: 2,
					},
					{
						radius: 1,
						ring: 2,
						speed: 10,
						mineral: 1,
					},
					{
						radius: 1,
						ring: 3,
						speed: 25,
						mineral: 2,
						retrograde: true
					},
					{
						radius: 1,
						ring: 4,
						speed: 6,
						mineral: 1,
					},
					{
						radius: .75,
						ring: 5,
						speed: 30,
						mineral: 0,
					},
					{
						radius: .5,
						ring: 6,
						speed: 100,
						mineral: 2,
					},
					{
						radius: 2,
						ring: 7,
						speed: 200,
						mineral: 3
					}
				]
			},
			{
				width: 50,
				x: 50,
				y: 0,
				sunSize: 2,
				clockwise: true,
				planets: [
					{
						radius: 2.5,
						ring: 1,
						speed: 30,
						mineral: 4
					},
					{
						radius: 1,
						ring: 2,
						speed: 10,
						mineral: 1
					},
					{
						radius: 1,
						ring: 3,
						speed: 25,
						mineral: 2
					},
					{
						radius: 1,
						ring: 4,
						speed: 24,
						mineral: 0
					},
					{
						radius: 1,
						ring: 5,
						speed: 30,
						mineral: 1
					},
					{
						radius: 1,
						ring: 6,
						speed: 100,
						mineral: 0
					},
					{
						radius: 1,
						ring: 7,
						speed: 20,
						mineral: 3
					}
				]
			},
			{
				width: 22,
				x: 33,
				y: 5,
				sunSize: 5,
				clockwise: false,
				planets: [
					{
						radius: 2.5,
						ring: 1,
						speed: 30,
						mineral: 1
					},
					{
						radius: 1,
						ring: 2,
						speed: 10,
						mineral: 1
					},
					{
						radius: 1,
						ring: 3,
						speed: 25,
						mineral: 2,
						retrograde: true
					},
					{
						radius: 1,
						ring: 4,
						speed: 60,
						mineral: 0
					},
					{
						radius: .75,
						ring: 5,
						speed: 30,
						mineral: 0
					},
					{
						radius: 4,
						ring: 7,
						speed: 100,
						mineral: 2
					}
				]
			}
		],
	},
	getters: {
		turn: state => {
			const ticksPerTurn = 10;
			const startTick = 0;
			let turn = Math.ceil((state.tick-startTick) / ticksPerTurn) % state.players.length;
			turn = state.tick === startTick ? 1 : turn === 0 ? 3 : turn;
      return turn;
		},
		planetMinerals: state => {
			// WIP
			const planets = document.querySelectorAll('.planet');
		}
	},
  mutations: {
		step (state, n) {
			state.tick += n;
		},
		updatePlanet(state, id){
			// id and array index should always be the same,
			// otherwise this would break.

			const galaxy = document.getElementById("galaxy");
			let galaxyWidth = galaxy.clientWidth;
			let galaxyHeight = galaxy.clientHeight;

			const nextTicks = document.querySelectorAll('.next-tick');
			// const thisTicks = document.querySelectorAll('.planet');

			let nextRect = nextTicks[id].getBoundingClientRect();
			// let thisRect = thisTicks[id].getBoundingClientRect();

			// console.log(nextRect, thisRect)

			let xPercent = ((nextRect.x + nextRect.width/2) / galaxyWidth) * 100;
			let yPercent = ((nextRect.y + nextRect.height/2) / galaxyHeight) * 100;

			state.galaxy = {width: galaxyWidth, height: galaxyHeight};

			state.planets[id] = {
				id,
				nextTick: {xPercent, yPercent, width: nextRect.width, height: nextRect.height, x: nextRect.x, y: nextRect.y}
			}

		},
		updatePlanetsInRange(state, planets){
			state.planetsInRange = planets;
		},
		changePlanet(state, {player, planet}){
			state.players[player].planet = planet;
		}
  }
});