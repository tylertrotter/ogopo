import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
		ui: {
			toolsExpanded: false,
			controlsExpanded: false,
			aspectRatio: {x: 3, y:2}
		},
		tick: 0,
		step: 0,
		orbitSpeed: 1,
		deferredMods: [
			{
				player: 0,
				step: 4,
				mutation:  "changeBurstRange",
				payload: 1
			},
			{
				step: 4,
				mutation:  "retrograde"
			}
		],
		mineralNames: ['tungsten', 'radium', 'copper', 'mercury', 'tin'],
		tools: [
			{
				name: "Turbo Booster",
				description: "This increases your ship's burst range 1 level. Burst ranges start at level 1 and max out at 3. Lasts for remainder of your turn.",
				recipe: [
					{mineral: 0, amount: 4},
					{mineral: 1, amount: 4},
					{mineral: 2, amount: 4}
				]
			},
			{
				name: "Super Booster",
				description: "This increases your ship's burst range. Lasts for 2 turns.",
				recipe: [
					{mineral: 2, amount: 6},
					{mineral: 3, amount: 6}
				]
			},
			{
				name: "Freeze Bomb",
				description: "Freezes all planets. Spaceships can function, miners can mine, but planet's don't move. Lasts for the epoch.",
				recipe: [
					{mineral: 0, amount: 6},
					{mineral: 1, amount: 6}
				]
			},
			{
				name: "Retrograde Bomb",
				description: "Reverses every orbit in the galaxy. Lasts for the epoch.",
				recipe: [
					{mineral: 1, amount: 6},
					{mineral: 4, amount: 6}
				]
			},
			{
				name: "Warp Speed Bomb",
				description: "Speeds up time to be twice as fast. Planets move around their orbits double the amount they would normally. Lasts for the epoch.",
				recipe: [
					{mineral: 0, amount: 8},
					{mineral: 2, amount: 2},
					{mineral: 3, amount: 2}
				]
			}
		],
		planets: [],
		planetsInRange: [],
		players: [
			{
				name: "pubogu",
				color: "orange",
				avatar: {
					iris: "purple",
					eyeSize: .8,
					headHeight: 1.1,
					headWidth: .8,
					emotion: null
				},
				planet: "0",
				burstRange: 1,
				position: {x:20, y: 24},
				energy: 12,
				materials: [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,2,2,2,2,2,2],
				tools: []
			},
			{
				name: "bobo",
				color: "red",
				avatar: {
					iris: "green",
					eyeSize: 1.2,
					headHeight: 1,
					headWidth: 1,
					emotion: null
				},
				planet: "0",
				burstRange: 1,
				position: {x:-10, y: 60},
				energy: 12,
				materials: [],
				tools: []
			},
			{
				name: "gubo",
				color: "purple",
				avatar: {
					iris: "#bada55",
					eyeSize: .8,
					headHeight: .8,
					headWidth: 1.1,
					emotion: null
				},
				planet: "0",
				burstRange: 1,
				position: {x:-10, y: 40},
				energy: 12,
				materials: [],
				tools: []
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
			const ticksPerTurn = 6;
			let turn = Math.ceil((state.step+1) / (ticksPerTurn)) % state.players.length;
			turn = state.step === 0 ? 1 : turn === 0 ? 3 : turn;
      return turn;
		},
		currentPlayerId: (state, getters) => {
			return getters.turn - 1;

		},
		currentPlayer: (state, getters) => {
			return state.players[getters.currentPlayerId];
		},
		currentPlanet: (state, getters) => {
			return state.planets[+getters.currentPlayer.planet];
		}
	},
  mutations: {
		tick (state, n) {
			state.tick += n * state.orbitSpeed;
			state.step = state.step + 1;

			this.dispatch('checkMods');
		},
		changeBurstRange(state, {playerId, payload}){
			state.players[playerId].burstRange = state.players[playerId].burstRange + payload;
		},
		retrograde(state){
			state.orbitSpeed = state.orbitSpeed * -1;
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
			let mineral;
			let bySun;

			state.galaxy = {width: galaxyWidth, height: galaxyHeight};

			mineral = +nextTicks[id].getAttribute('data-mineral');

			bySun = nextTicks[id].getAttribute('data-ring') === '1';

			state.planets[id] = {
				id,
				nextTick: {xPercent, yPercent, width: nextRect.width, height: nextRect.height, x: nextRect.x, y: nextRect.y},
				mineral,
				bySun
			}
		},
		updatePlanetsInRange(state, planets){
			state.planetsInRange = planets;
		},
		changePlanet(state, {player, planet}){
			state.players[player].planet = planet;

			state.players[player].avatar.emotion = 'excited';
			setTimeout(() => {
				state.players[player].avatar.emotion = null;
			}, 1000);
		},
		addMineral(state, {player, mineral}){
			state.players[player].materials.push(mineral);
		},
		addTool(state, {player, tool}){
			state.players[player].tools.push(tool);

			// remove materials used for the tool
			let recipe = state.tools[tool].recipe;
			let filteredMaterials =	state.players[player].materials;

			for(let i = 0; i < recipe.length; i++){
				for(let j = 0; j < recipe[i].amount; j++){
					let removeIndex = filteredMaterials.indexOf(recipe[i].mineral);
					filteredMaterials.splice(removeIndex, 1);
				}
			}
		},
		changeEnergy(state, {player, amount}){
			state.players[player].energy = state.players[player].energy + amount;
		},
		expandControls(state, setting){
			state.ui.controlsExpanded = setting;
			if(!setting)
				state.ui.toolsExpanded = false;
		},
		expandTools(state, setting){
			state.ui.toolsExpanded = setting;
		}
	},
	actions: {
		checkMods({commit, state}) {
			let playerId = this.getters.currentPlayerId;
			let step = state.step;
			let isActivePlayer;
			let modsToDelete = [];

			state.deferredMods.forEach((mod, i) => {
				isActivePlayer = playerId === mod.player;

				if( step === mod.step ){
					if( isActivePlayer && typeof(mod.payload) !== 'undefined' )
						commit(mod.mutation, {'playerId': mod.player, 'payload': mod.payload});
					else if( isActivePlayer )
						commit(mod.mutation, {'playerId': mod.player});
					else
						commit(mod.mutation);

					modsToDelete.push(i);
				}
			});

			modsToDelete.forEach(i => state.deferredMods.splice(i, 1));
		}
	}
});