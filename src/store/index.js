import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate';
import getCenter from "../getCenter.js";

Vue.use(Vuex);

export default new Vuex.Store({
	plugins: [createPersistedState()],
  state: {
		ui: {
			toolsExpanded: false,
			controlsExpanded: false,
			controlsDisabled: false,
			aspectRatio: {x: 3, y:2, name: "3:2"}
		},
		tick: 0,
		step: 0,
		ticksPerTurn: 6,
		orbitSpeed: 1,
		deferredMods: [],
		mineralNames: ['tungsten', 'radium', 'copper', 'mercury', 'tin'],
		tools: [
			{
				name: "Turbo Booster",
				description: `This increases your ship's burst range 1 level. Burst ranges start at level 1 and max out at 3. Lasts for 1 turn.`,
				recipe: [
					{mineral: 0, amount: 4},
					{mineral: 1, amount: 4},
					{mineral: 2, amount: 4}
				],
				modification: {
					mutation: "changeBurstRange",
					payload: 1,
					undoPayload: -1,
					epochs: 1
				}
			},
			{
				name: "Super Booster",
				description: "This increases your ship's burst range. Lasts for 2 turns.",
				recipe: [
					{mineral: 2, amount: 6},
					{mineral: 3, amount: 6}
				],
				modification: {
					mutation: "changeBurstRange",
					payload: 1,
					undoPayload: -1,
					epochs: 2
				}
			},
			{
				name: "Diamond Bit",
				description: "Mine minerals at double the normal rate. Lasts for 20 turns.",
				recipe: [
					{mineral: 1, amount: 4},
					{mineral: 2, amount: 4},
					{mineral: 3, amount: 4},
				],
				modification: {
					mutation: "changeMiningStrength",
					payload: 1,
					undoPayload: -1,
					epochs: 20
				}
			},
			{
				name: "Retrograde Bomb",
				description: "Reverses every orbit in the galaxy. Lasts until next turn.",
				recipe: [
					{mineral: 0, amount: 6},
					{mineral: 1, amount: 6}
				],
				modification: {
					mutation: "changeOrbits",
					payload: -1,
					undoPayload: -1,
					epochs: 1
				}
			},
			{
				name: "Warp Speed Bomb",
				description: "Speeds up time to be twice as fast. Planets move around their orbits double the amount they would normally. Lasts until next turn.",
				recipe: [
					{mineral: 0, amount: 8},
					{mineral: 2, amount: 2},
					{mineral: 3, amount: 2}
				],
				modification: {
					mutation: "changeOrbits",
					payload: 2,
					undoPayload: .5,
					epochs: 1
				}
			}
		],
		planets: [],
		planetsInRange: [],
		players: [],
		systems: {
			"4:3": [
				{
					width: 40,
					x: -9,
					y: -13,
					sunSize: 3,
					clockwise: false,
					planets: [
						{
							radius: 1.5,
							ring: 1,
							speed: 20,
							mineral: 0
						},
						{
							radius: .8,
							ring: 1,
							speed: 20,
							mineral: 2,
							spot: 12
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
							spot: 10,
							retrograde: true
						}
					]
				},
				{
					width: 40,
					x: 8.6,
					y: -18,
					sunSize: 2,
					clockwise: false,
					planets: [
						{
							radius: 1.2,
							ring: 1,
							speed: 30,
							mineral: 0
						},
						{
							radius: 1.2,
							ring: 1,
							speed: 30,
							mineral: 0,
							spot: 18
						},
						{
							radius: .8,
							ring: 2,
							speed: 13,
							mineral: 0,
							spot: 6
						},
						{
							radius: 1.2,
							ring: 2,
							speed: 13,
							mineral: 0,
							spot: 10
						}
					]
				},
				{
					width: 40,
					x: -10,
					y: 16.5,
					sunSize: .8,
					clockwise: false,
					planets: [
						{
							radius: 1,
							ring: 1,
							speed: 30,
							mineral: 1
						},
						{
							radius: 1.7,
							ring: 1,
							speed: 30,
							mineral: 3,
							spot: 5
						},
						{
							radius: 2,
							ring: 2,
							speed: 10,
							mineral: 0,
							spot: 3,
							retrograde: true
						},
						{
							radius: 1,
							ring: 3,
							speed: 30,
							mineral: 0
						},
						{
							radius: 1.5,
							ring: 3,
							speed: 30,
							mineral: 2,
							spot: 7
						},
						{
							radius: 1,
							ring: 3,
							speed: 30,
							mineral: 1,
							spot: 14
						},
						{
							radius: .7,
							ring: 3,
							speed: 30,
							mineral: 0,
							spot: 18
						}
					]
				},
				{
					width: 32,
					x: 16,
					y: 27.5,
					sunSize: 3.5,
					clockwise: true,
					planets: [
						{
							radius: 2.5,
							ring: 1,
							speed: 30,
							mineral: 1,
							spot: 4
						},
						{
							radius: 1,
							ring: 2,
							speed: 10,
							mineral: 1
						},
						{
							radius: .8,
							ring: 3,
							speed: 25,
							mineral: 0,
							retrograde: true,
							spot: 2
						},
						{
							radius: 1.2,
							ring: 3,
							speed: 25,
							mineral: 2,
							retrograde: true,
							spot: 12
						},
						{
							radius: 1,
							ring: 4,
							speed: 8,
							mineral: 1,
						},
						{
							radius: .75,
							ring: 5,
							speed: 30,
							mineral: 0,
							spot: 7
						},
						{
							radius: 1.75,
							ring: 5,
							speed: 30,
							mineral: 0,
							spot: 22
						},
						{
							radius: .5,
							ring: 6,
							speed: 100,
							mineral: 2,
							spot: 11
						},
						{
							radius: .5,
							ring: 6,
							speed: 100,
							mineral: 2,
							spot: 36
						},
						{
							radius: 2,
							ring: 7,
							speed: 70,
							mineral: 3
						},
						{
							radius: 1.2,
							ring: 7,
							speed: 70,
							mineral: 1,
							spot: 56
						}
					]
				},
				{
					width: 40,
					x: -2.5,
					y: 50,
					sunSize: 1.5,
					clockwise: true,
					planets: [
						{
							radius: 2.5,
							ring: 1,
							speed: 30,
							mineral: 3,
							spot: 4
						},
						{
							radius: 1,
							ring: 2,
							speed: 10,
							mineral: 2,
							spot: 8
						},
						{
							radius: 1,
							ring: 3,
							speed: 80,
							mineral: 2,
							retrograde: true
						},
						{
							radius: 1.4,
							ring: 3,
							speed: 80,
							mineral: 3,
							retrograde: true,
							spot: 22
						},
						{
							radius: 1.6,
							ring: 3,
							speed: 80,
							mineral: 2,
							retrograde: true,
							spot: 47
						},
						{
							radius: 2,
							ring: 3,
							speed: 80,
							mineral: 3,
							retrograde: true,
							spot: 60
						},
						{
							radius: 1,
							ring: 4,
							speed: 13,
							mineral: 3,
							spot: 5
						}
					]
				},
				{
					width: 50,
					x: 42,
					y: 21,
					sunSize: 5.5,
					clockwise: true,
					planets: [
						{
							radius: 2.5,
							ring: 1,
							speed: 30,
							mineral: 3,
							spot: 12
						},
						{
							radius: 1,
							ring: 2,
							speed: 10,
							mineral: 1,
							spot: 8
						},
						{
							radius: 1,
							ring: 3,
							speed: 150,
							mineral: 2
						},
						{
							radius: 1,
							ring: 3,
							speed: 150,
							mineral: 0,
							spot: 75
						},
						{
							radius: 1,
							ring: 4,
							speed: 24,
							mineral: 0
						},
						{
							radius: 3,
							ring: 4,
							speed: 24,
							mineral: 0,
							spot: 18
						},
						{
							radius: 1,
							ring: 5,
							speed: 30,
							mineral: 1,
							spot: 18
						},
						{
							radius: .8,
							ring: 5,
							speed: 30,
							mineral: 1,
							spot: 12
						},
						{
							radius: 1,
							ring: 6,
							speed: 100,
							mineral: 0,
							spot: 33
						},
						{
						radius: 1.9,
						ring: 6,
						speed: 100,
						mineral: 0,
						spot: 78
						},
						{
							radius: 1.6,
							ring: 7,
							speed: 22,
							mineral: 2
						},
						{
							radius: .7,
							ring: 7,
							speed: 22,
							mineral: 3,
							spot: 12
						}
					]
				},
				{
					width: 25,
					x: 34,
					y: 1,
					sunSize: 5,
					clockwise: false,
					planets: [
						{
							radius: 2.5,
							ring: 1,
							speed: 30,
							mineral: 1,
							spot: 5
						},
						{
							radius: 1,
							ring: 2,
							speed: 10,
							mineral: 3
						},
						{
							radius: 1,
							ring: 3,
							speed: 25,
							mineral: 2,
							retrograde: true,
							spot: 2
						},
						{
							radius: 1,
							ring: 4,
							speed: 60,
							mineral: 0,
							spot: 12
						},
						{
							radius: 1,
							ring: 4,
							speed: 60,
							mineral: 1,
							spot: 25
						},
						{
							radius: 1,
							ring: 4,
							speed: 60,
							mineral: 0,
							spot: 50
						},
						{
							radius: .75,
							ring: 5,
							speed: 30,
							mineral: 0
						},
						{
							radius: 1,
							ring: 7,
							speed: 80,
							mineral: 2,
							spot: 20
						},
						{
							radius: 2,
							ring: 7,
							speed: 80,
							mineral: 0,
							spot: 43
						},
						{
							radius: 1,
							ring: 7,
							speed: 80,
							mineral: 0,
							spot: 70
						},
						{
							radius: 2.6,
							ring: 8,
							speed: 160,
							mineral: 2
						},
						{
							radius: 2,
							ring: 8,
							speed: 160,
							mineral: 0,
							spot: 33
						},
						{
							radius: 1.5,
							ring: 8,
							speed: 160,
							mineral: 1,
							spot: 66
						},
						{
							radius: 1,
							ring: 8,
							speed: 160,
							mineral: 0,
							spot: 90
						},
						{
							radius: 1.7,
							ring: 8,
							speed: 160,
							mineral: 0,
							spot: 143
						}
					]
				},
				{
					width: 39,
					x: 46.3,
					y: -18.5,
					sunSize: 2,
					clockwise: false,
					planets: [
						{
							radius: 1.2,
							ring: 1,
							speed: 30,
							mineral: 0
						},
						{
							radius: 1.2,
							ring: 1,
							speed: 30,
							mineral: 0,
							spot: 18
						},
						{
							radius: .8,
							ring: 2,
							speed: 13,
							mineral: 0,
							spot: 6
						},
						{
							radius: 1.2,
							ring: 2,
							speed: 13,
							mineral: 0,
							spot: 10
						},
						{
							radius: .8,
							ring: 3,
							speed: 100,
							mineral: 0,
							spot: 10
						}
					]
				},
				{
					width: 38,
					x: 21,
					y: 61,
					sunSize: 2,
					clockwise: false,
					planets: [
						{
							radius: .6,
							ring: 1,
							speed: 33,
							mineral: 1,
							spot: 3
						},
						{
							radius: 2,
							ring: 2,
							speed: 30,
							mineral: 0,
							spot: 26
						},
						{
							radius: 1.5,
							ring: 3,
							speed: 26,
							mineral: 0
						},
						{
							radius: 1.2,
							ring: 4,
							speed: 22,
							mineral: 1
						},
						{
							radius: 2,
							ring: 4,
							speed: 22,
							mineral: 1
						},
						{
							radius: .7,
							ring: 5,
							speed: 20,
							mineral: 0,
							spot: 2
						},
						{
							radius: 1,
							ring: 5,
							speed: 20,
							mineral: 3,
							spot: 15
						}
					]
				},
				{
					width: 40,
					x: 67,
					y: 58,
					sunSize: 2,
					clockwise: false,
					planets: [
						{
							radius: 1.2,
							ring: 1,
							speed: 30,
							mineral: 1
						},
						{
							radius: 1.2,
							ring: 1,
							speed: 30,
							mineral: 1,
							spot: 18
						},
						{
							radius: .8,
							ring: 2,
							speed: 13,
							mineral: 1,
							spot: 6
						},
						{
							radius: 1.2,
							ring: 2,
							speed: 13,
							mineral: 1,
							spot: 10
						}
					]
				},
				{
					width: 40,
					x: 64,
					y: -12,
					sunSize: 2,
					clockwise: false,
					planets: [
						{
							radius: 2,
							ring: 1,
							speed: 10,
							mineral: 4,
							spot: 1
						},
						{
							radius: .8,
							ring: 2,
							speed: 30,
							mineral: 0,
							spot: 12
						},
						{
							radius: 1,
							ring: 3,
							speed: 70,
							mineral: 1,
							spot: 3
						},
						{
							radius: 1.2,
							ring: 4,
							speed: 20,
							mineral: 0
						},
						{
							radius: 1.2,
							ring: 4,
							speed: 20,
							mineral: 0,
							spot: 12
						},
						{
							radius: 1,
							ring: 4,
							speed: 20,
							mineral: 0,
							spot: 8
						}
					]
				},
			],
			"3:2": [
				{
					width: 40,
					x: -9,
					y: -13,
					sunSize: 3,
					clockwise: false,
					planets: [
						{
							radius: 1.5,
							ring: 1,
							speed: 20,
							mineral: 0
						},
						{
							radius: .8,
							ring: 1,
							speed: 20,
							mineral: 2,
							spot: 12
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
							spot: 10,
							retrograde: true
						}
					]
				},
				{
					width: 40,
					x: 8.6,
					y: -18,
					sunSize: 2,
					clockwise: false,
					planets: [
						{
							radius: 1.2,
							ring: 1,
							speed: 30,
							mineral: 0
						},
						{
							radius: 1.2,
							ring: 1,
							speed: 30,
							mineral: 0,
							spot: 18
						},
						{
							radius: .8,
							ring: 2,
							speed: 13,
							mineral: 0,
							spot: 6
						},
						{
							radius: 1.2,
							ring: 2,
							speed: 13,
							mineral: 0,
							spot: 10
						}
					]
				},
				{
					width: 40,
					x: -10,
					y: 16.5,
					sunSize: .8,
					clockwise: false,
					planets: [
						{
							radius: 1,
							ring: 1,
							speed: 30,
							mineral: 1
						},
						{
							radius: 1.7,
							ring: 1,
							speed: 30,
							mineral: 3,
							spot: 5
						},
						{
							radius: 2,
							ring: 2,
							speed: 10,
							mineral: 0,
							spot: 3,
							retrograde: true
						},
						{
							radius: 1,
							ring: 3,
							speed: 30,
							mineral: 0
						},
						{
							radius: 1.5,
							ring: 3,
							speed: 30,
							mineral: 2,
							spot: 7
						},
						{
							radius: 1,
							ring: 3,
							speed: 30,
							mineral: 1,
							spot: 14
						},
						{
							radius: .7,
							ring: 3,
							speed: 30,
							mineral: 0,
							spot: 18
						}
					]
				},
				{
					width: 32,
					x: 16,
					y: 27.5,
					sunSize: 3.5,
					clockwise: true,
					planets: [
						{
							radius: 2.5,
							ring: 1,
							speed: 30,
							mineral: 1,
							spot: 4
						},
						{
							radius: 1,
							ring: 2,
							speed: 10,
							mineral: 1
						},
						{
							radius: .8,
							ring: 3,
							speed: 25,
							mineral: 0,
							retrograde: true,
							spot: 2
						},
						{
							radius: 1.2,
							ring: 3,
							speed: 25,
							mineral: 2,
							retrograde: true,
							spot: 12
						},
						{
							radius: 1,
							ring: 4,
							speed: 8,
							mineral: 1,
						},
						{
							radius: .75,
							ring: 5,
							speed: 30,
							mineral: 0,
							spot: 7
						},
						{
							radius: 1.75,
							ring: 5,
							speed: 30,
							mineral: 0,
							spot: 22
						},
						{
							radius: .5,
							ring: 6,
							speed: 100,
							mineral: 2,
							spot: 11
						},
						{
							radius: .5,
							ring: 6,
							speed: 100,
							mineral: 2,
							spot: 36
						},
						{
							radius: 2,
							ring: 7,
							speed: 70,
							mineral: 3
						},
						{
							radius: 1.2,
							ring: 7,
							speed: 70,
							mineral: 1,
							spot: 56
						}
					]
				},
				{
					width: 40,
					x: -2.5,
					y: 50,
					sunSize: 1.5,
					clockwise: true,
					planets: [
						{
							radius: 2.5,
							ring: 1,
							speed: 30,
							mineral: 3,
							spot: 4
						},
						{
							radius: 1,
							ring: 2,
							speed: 10,
							mineral: 2,
							spot: 8
						},
						{
							radius: 1,
							ring: 3,
							speed: 80,
							mineral: 2,
							retrograde: true
						},
						{
							radius: 1.4,
							ring: 3,
							speed: 80,
							mineral: 3,
							retrograde: true,
							spot: 22
						},
						{
							radius: 1.6,
							ring: 3,
							speed: 80,
							mineral: 2,
							retrograde: true,
							spot: 47
						},
						{
							radius: 2,
							ring: 3,
							speed: 80,
							mineral: 3,
							retrograde: true,
							spot: 60
						},
						{
							radius: 1,
							ring: 4,
							speed: 13,
							mineral: 3,
							spot: 5
						}
					]
				},
				{
					width: 50,
					x: 42,
					y: 21,
					sunSize: 5.5,
					clockwise: true,
					planets: [
						{
							radius: 2.5,
							ring: 1,
							speed: 30,
							mineral: 3,
							spot: 12
						},
						{
							radius: 1,
							ring: 2,
							speed: 10,
							mineral: 1,
							spot: 8
						},
						{
							radius: 1,
							ring: 3,
							speed: 150,
							mineral: 2
						},
						{
							radius: 1,
							ring: 3,
							speed: 150,
							mineral: 0,
							spot: 75
						},
						{
							radius: 1,
							ring: 4,
							speed: 24,
							mineral: 0
						},
						{
							radius: 3,
							ring: 4,
							speed: 24,
							mineral: 0,
							spot: 18
						},
						{
							radius: 1,
							ring: 5,
							speed: 30,
							mineral: 1,
							spot: 18
						},
						{
							radius: .8,
							ring: 5,
							speed: 30,
							mineral: 1,
							spot: 12
						},
						{
							radius: 1,
							ring: 6,
							speed: 100,
							mineral: 0,
							spot: 33
						},
						{
						radius: 1.9,
						ring: 6,
						speed: 100,
						mineral: 0,
						spot: 78
						},
						{
							radius: 1.6,
							ring: 7,
							speed: 22,
							mineral: 2
						},
						{
							radius: .7,
							ring: 7,
							speed: 22,
							mineral: 3,
							spot: 12
						}
					]
				},
				{
					width: 25,
					x: 34,
					y: 1,
					sunSize: 5,
					clockwise: false,
					planets: [
						{
							radius: 2.5,
							ring: 1,
							speed: 30,
							mineral: 1,
							spot: 5
						},
						{
							radius: 1,
							ring: 2,
							speed: 10,
							mineral: 3
						},
						{
							radius: 1,
							ring: 3,
							speed: 25,
							mineral: 2,
							retrograde: true,
							spot: 2
						},
						{
							radius: 1,
							ring: 4,
							speed: 60,
							mineral: 0,
							spot: 12
						},
						{
							radius: 1,
							ring: 4,
							speed: 60,
							mineral: 1,
							spot: 25
						},
						{
							radius: 1,
							ring: 4,
							speed: 60,
							mineral: 0,
							spot: 50
						},
						{
							radius: .75,
							ring: 5,
							speed: 30,
							mineral: 0
						},
						{
							radius: 1,
							ring: 7,
							speed: 80,
							mineral: 2,
							spot: 20
						},
						{
							radius: 2,
							ring: 7,
							speed: 80,
							mineral: 0,
							spot: 43
						},
						{
							radius: 1,
							ring: 7,
							speed: 80,
							mineral: 0,
							spot: 70
						},
						{
							radius: 2.6,
							ring: 8,
							speed: 160,
							mineral: 2
						},
						{
							radius: 2,
							ring: 8,
							speed: 160,
							mineral: 0,
							spot: 33
						},
						{
							radius: 1.5,
							ring: 8,
							speed: 160,
							mineral: 1,
							spot: 66
						},
						{
							radius: 1,
							ring: 8,
							speed: 160,
							mineral: 0,
							spot: 90
						},
						{
							radius: 1.7,
							ring: 8,
							speed: 160,
							mineral: 0,
							spot: 143
						}
					]
				},
				{
					width: 39,
					x: 46.3,
					y: -18.5,
					sunSize: 2,
					clockwise: false,
					planets: [
						{
							radius: 1.2,
							ring: 1,
							speed: 30,
							mineral: 0
						},
						{
							radius: 1.2,
							ring: 1,
							speed: 30,
							mineral: 0,
							spot: 18
						},
						{
							radius: .8,
							ring: 2,
							speed: 13,
							mineral: 0,
							spot: 6
						},
						{
							radius: 1.2,
							ring: 2,
							speed: 13,
							mineral: 0,
							spot: 10
						},
						{
							radius: .8,
							ring: 3,
							speed: 100,
							mineral: 0,
							spot: 10
						}
					]
				},
				{
					width: 38,
					x: 21,
					y: 61,
					sunSize: 2,
					clockwise: false,
					planets: [
						{
							radius: .6,
							ring: 1,
							speed: 33,
							mineral: 1,
							spot: 3
						},
						{
							radius: 2,
							ring: 2,
							speed: 30,
							mineral: 0,
							spot: 26
						},
						{
							radius: 1.5,
							ring: 3,
							speed: 26,
							mineral: 0
						},
						{
							radius: 1.2,
							ring: 4,
							speed: 22,
							mineral: 1
						},
						{
							radius: 2,
							ring: 4,
							speed: 22,
							mineral: 1
						},
						{
							radius: .7,
							ring: 5,
							speed: 20,
							mineral: 0,
							spot: 2
						},
						{
							radius: 1,
							ring: 5,
							speed: 20,
							mineral: 3,
							spot: 15
						}
					]
				},
				{
					width: 40,
					x: 67,
					y: 58,
					sunSize: 2,
					clockwise: false,
					planets: [
						{
							radius: 1.2,
							ring: 1,
							speed: 30,
							mineral: 1
						},
						{
							radius: 1.2,
							ring: 1,
							speed: 30,
							mineral: 1,
							spot: 18
						},
						{
							radius: .8,
							ring: 2,
							speed: 13,
							mineral: 1,
							spot: 6
						},
						{
							radius: 1.2,
							ring: 2,
							speed: 13,
							mineral: 1,
							spot: 10
						}
					]
				},
				{
					width: 40,
					x: 64,
					y: -12,
					sunSize: 2,
					clockwise: false,
					planets: [
						{
							radius: 2,
							ring: 1,
							speed: 10,
							mineral: 4,
							spot: 1
						},
						{
							radius: .8,
							ring: 2,
							speed: 30,
							mineral: 0,
							spot: 12
						},
						{
							radius: 1,
							ring: 3,
							speed: 70,
							mineral: 1,
							spot: 3
						},
						{
							radius: 1.2,
							ring: 4,
							speed: 20,
							mineral: 0
						},
						{
							radius: 1.2,
							ring: 4,
							speed: 20,
							mineral: 0,
							spot: 12
						},
						{
							radius: 1,
							ring: 4,
							speed: 20,
							mineral: 0,
							spot: 8
						}
					]
				},
			],
			"16:9": [
				{
					width: 40,
					x: -9,
					y: -14.5,
					sunSize: 3,
					clockwise: false,
					planets: [
						{
							radius: 1.5,
							ring: 1,
							speed: 20,
							mineral: 0
						},
						{
							radius: .8,
							ring: 1,
							speed: 20,
							mineral: 2,
							spot: 12
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
							spot: 10,
							retrograde: true
						}
					]
				},
				{
					width: 40,
					x: 8.6,
					y: -18,
					sunSize: 2,
					clockwise: false,
					planets: [
						{
							radius: 1.2,
							ring: 1,
							speed: 30,
							mineral: 0
						},
						{
							radius: 1.2,
							ring: 1,
							speed: 30,
							mineral: 0,
							spot: 18
						},
						{
							radius: .8,
							ring: 2,
							speed: 13,
							mineral: 0,
							spot: 6
						},
						{
							radius: 1.2,
							ring: 2,
							speed: 13,
							mineral: 0,
							spot: 10
						}
					]
				},
				{
					width: 40,
					x: -11.5,
					y: 17.5,
					sunSize: .8,
					clockwise: false,
					planets: [
						{
							radius: 1,
							ring: 1,
							speed: 30,
							mineral: 1
						},
						{
							radius: 1.7,
							ring: 1,
							speed: 30,
							mineral: 3,
							spot: 5
						},
						{
							radius: 2,
							ring: 2,
							speed: 10,
							mineral: 0,
							spot: 3,
							retrograde: true
						}
					]
				},
				{
					width: 32,
					x: 12.75,
					y: 27.5,
					sunSize: 3.5,
					clockwise: true,
					planets: [
						{
							radius: 2.5,
							ring: 1,
							speed: 30,
							mineral: 1,
							spot: 4
						},
						{
							radius: 1,
							ring: 2,
							speed: 10,
							mineral: 1
						},
						{
							radius: .8,
							ring: 3,
							speed: 25,
							mineral: 0,
							retrograde: true,
							spot: 2
						},
						{
							radius: 1.2,
							ring: 3,
							speed: 25,
							mineral: 2,
							retrograde: true,
							spot: 12
						},
						{
							radius: 1,
							ring: 4,
							speed: 8,
							mineral: 1,
						},
						{
							radius: .75,
							ring: 5,
							speed: 30,
							mineral: 0,
							spot: 7
						},
						{
							radius: 1.75,
							ring: 5,
							speed: 30,
							mineral: 0,
							spot: 22
						},
						{
							radius: .5,
							ring: 6,
							speed: 100,
							mineral: 2,
							spot: 11
						},
						{
							radius: .5,
							ring: 6,
							speed: 100,
							mineral: 2,
							spot: 36
						},
						{
							radius: 2,
							ring: 7,
							speed: 70,
							mineral: 3
						},
						{
							radius: 1.2,
							ring: 7,
							speed: 70,
							mineral: 1,
							spot: 56
						}
					]
				},
				{
					width: 40,
					x: -9,
					y: 50,
					sunSize: 1.5,
					clockwise: true,
					planets: [
						{
							radius: 2.5,
							ring: 1,
							speed: 30,
							mineral: 3,
							spot: 4
						},
						{
							radius: 1,
							ring: 2,
							speed: 10,
							mineral: 2,
							spot: 8
						},
						{
							radius: 1,
							ring: 3,
							speed: 80,
							mineral: 2,
							retrograde: true
						},
						{
							radius: 1.4,
							ring: 3,
							speed: 80,
							mineral: 3,
							retrograde: true,
							spot: 22
						},
						{
							radius: 1.6,
							ring: 3,
							speed: 80,
							mineral: 2,
							retrograde: true,
							spot: 47
						},
						{
							radius: 2,
							ring: 3,
							speed: 80,
							mineral: 3,
							retrograde: true,
							spot: 60
						},
						{
							radius: 1,
							ring: 4,
							speed: 13,
							mineral: 3,
							spot: 5
						}
					]
				},
				{
					width: 45,
					x: 44,
					y: 25,
					sunSize: 5.5,
					clockwise: true,
					planets: [
						{
							radius: 2.5,
							ring: 1,
							speed: 30,
							mineral: 3,
							spot: 12
						},
						{
							radius: 1,
							ring: 2,
							speed: 10,
							mineral: 1,
							spot: 8
						},
						{
							radius: 1,
							ring: 3,
							speed: 150,
							mineral: 2
						},
						{
							radius: 1,
							ring: 3,
							speed: 150,
							mineral: 0,
							spot: 75
						},
						{
							radius: 1,
							ring: 4,
							speed: 24,
							mineral: 0
						},
						{
							radius: 3,
							ring: 4,
							speed: 24,
							mineral: 0,
							spot: 18
						},
						{
							radius: 1,
							ring: 5,
							speed: 30,
							mineral: 1,
							spot: 18
						},
						{
							radius: .8,
							ring: 5,
							speed: 30,
							mineral: 1,
							spot: 12
						},
						{
							radius: 1,
							ring: 6,
							speed: 100,
							mineral: 0,
							spot: 33
						},
						{
						radius: 1.9,
						ring: 6,
						speed: 100,
						mineral: 0,
						spot: 78
						},
						{
							radius: 1.6,
							ring: 7,
							speed: 22,
							mineral: 2
						},
						{
							radius: .7,
							ring: 7,
							speed: 22,
							mineral: 3,
							spot: 12
						}
					]
				},
				{
					width: 25,
					x: 34,
					y: 1,
					sunSize: 5,
					clockwise: false,
					planets: [
						{
							radius: 2.5,
							ring: 1,
							speed: 30,
							mineral: 1,
							spot: 5
						},
						{
							radius: 1,
							ring: 2,
							speed: 10,
							mineral: 3
						},
						{
							radius: 1,
							ring: 3,
							speed: 25,
							mineral: 2,
							retrograde: true,
							spot: 2
						},
						{
							radius: 1,
							ring: 4,
							speed: 60,
							mineral: 0,
							spot: 12
						},
						{
							radius: 1,
							ring: 4,
							speed: 60,
							mineral: 1,
							spot: 25
						},
						{
							radius: 1,
							ring: 4,
							speed: 60,
							mineral: 0,
							spot: 50
						},
						{
							radius: .75,
							ring: 5,
							speed: 30,
							mineral: 0
						},
						{
							radius: 1,
							ring: 7,
							speed: 80,
							mineral: 2,
							spot: 20
						},
						{
							radius: 2,
							ring: 7,
							speed: 80,
							mineral: 0,
							spot: 43
						},
						{
							radius: 1,
							ring: 7,
							speed: 80,
							mineral: 0,
							spot: 70
						},
						{
							radius: 2.6,
							ring: 8,
							speed: 160,
							mineral: 2
						},
						{
							radius: 2,
							ring: 8,
							speed: 160,
							mineral: 0,
							spot: 33
						},
						{
							radius: 1.5,
							ring: 8,
							speed: 160,
							mineral: 1,
							spot: 66
						},
						{
							radius: 1,
							ring: 8,
							speed: 160,
							mineral: 0,
							spot: 90
						},
						{
							radius: 1.7,
							ring: 8,
							speed: 160,
							mineral: 0,
							spot: 143
						}
					]
				},
				{
					width: 39,
					x: 46.5,
					y: -21,
					sunSize: 2,
					clockwise: false,
					planets: [
						{
							radius: 1.2,
							ring: 1,
							speed: 30,
							mineral: 0
						},
						{
							radius: 1.2,
							ring: 1,
							speed: 30,
							mineral: 0,
							spot: 18
						},
						{
							radius: .8,
							ring: 2,
							speed: 13,
							mineral: 0,
							spot: 6
						},
						{
							radius: 1.2,
							ring: 2,
							speed: 13,
							mineral: 0,
							spot: 10
						},
						{
							radius: .8,
							ring: 3,
							speed: 100,
							mineral: 0,
							spot: 10
						}
					]
				},
				{
					width: 38,
					x: 22,
					y: 61.5,
					sunSize: 2,
					clockwise: false,
					planets: [
						{
							radius: .6,
							ring: 1,
							speed: 33,
							mineral: 1,
							spot: 3
						},
						{
							radius: 2,
							ring: 2,
							speed: 30,
							mineral: 0,
							spot: 26
						},
						{
							radius: 1.5,
							ring: 3,
							speed: 26,
							mineral: 0
						},
						{
							radius: 1.2,
							ring: 4,
							speed: 22,
							mineral: 1
						},
						{
							radius: 2,
							ring: 4,
							speed: 22,
							mineral: 1
						},
						{
							radius: .7,
							ring: 5,
							speed: 20,
							mineral: 0,
							spot: 2
						},
						{
							radius: 1,
							ring: 5,
							speed: 20,
							mineral: 3,
							spot: 15
						}
					]
				},
				{
					width: 40,
					x: 67,
					y: 58,
					sunSize: 2,
					clockwise: false,
					planets: [
						{
							radius: 1.2,
							ring: 1,
							speed: 30,
							mineral: 1
						},
						{
							radius: 1.2,
							ring: 1,
							speed: 30,
							mineral: 1,
							spot: 18
						},
						{
							radius: .8,
							ring: 2,
							speed: 13,
							mineral: 1,
							spot: 6
						},
						{
							radius: 1.2,
							ring: 2,
							speed: 13,
							mineral: 1,
							spot: 10
						}
					]
				},
				{
					width: 40,
					x: 64,
					y: -12,
					sunSize: 2,
					clockwise: false,
					planets: [
						{
							radius: 2,
							ring: 1,
							speed: 10,
							mineral: 4,
							spot: 1
						},
						{
							radius: .8,
							ring: 2,
							speed: 30,
							mineral: 0,
							spot: 12
						},
						{
							radius: 1,
							ring: 3,
							speed: 70,
							mineral: 1,
							spot: 3
						},
						{
							radius: 1.2,
							ring: 4,
							speed: 20,
							mineral: 0
						},
						{
							radius: 1.2,
							ring: 4,
							speed: 20,
							mineral: 0,
							spot: 12
						},
						{
							radius: 1,
							ring: 4,
							speed: 20,
							mineral: 0,
							spot: 8
						}
					]
				},
			],
		}
	},
	getters: {
		turn: state => {
			let turn = Math.ceil((state.step+1) / (state.ticksPerTurn)) % state.players.length;
			turn = state.step === 0 ? 1 : turn === 0 ? state.players.length : turn;
      return turn;
		},
		turnTick: state => {
			return state.tick % state.ticksPerTurn;
		},
		currentPlayerId: (state, getters) => {
			return state.players.length ? getters.turn - 1 : 0;
		},
		currentPlayer: (state, getters) => {
			return state.players.length ? state.players[getters.currentPlayerId] : 0;
		},
		currentPlanet: (state, getters) => {
			return state.players.length ? state.planets[+getters.currentPlayer.planet] : "0";
		},
		numberOfPlayers: (state) => {
			return state.players.length;
		}
	},
  mutations: {
		resetGame(state){
			state.players = [];
			state.tick = 0;
			state.step = 0;
			state.planets = [];
			state.planetsInRange = [];
			state.deferredMods = [];
		},
		createPlayer(state) {
			const emptyPlayerObj = {
				name: "",
				color: "#ccc",
				avatar: {
					iris: "#ccc",
					eyeSize: 1,
					headHeight: .975,
					headWidth: 1,
					emotion: null
				},
				planet: "0",
				burstRange: 1,
				miningStrength: 1,
				position: {x:11, y: 11},
				energy: 12,
				materials: [],
				tools: []
			}
			state.players.push(emptyPlayerObj);
		},
		tick (state, n) {
			state.tick += n * state.orbitSpeed;
			state.step = state.step + 1;

			this.dispatch('afterTickUpdate');
		},
		changeBurstRange(state, {payload}){
			const playerId = this.getters.currentPlayerId;
			state.players[playerId].burstRange = state.players[playerId].burstRange + payload;
		},
		changeMiningStrength(state, {payload}){
			const playerId = this.getters.currentPlayerId;
			state.players[playerId].miningStrength = state.players[playerId].miningStrength + payload;
		},
		changeOrbits(state, {payload}){
			state.orbitSpeed = state.orbitSpeed ? state.orbitSpeed * payload : payload;
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

			let xPercent = ((nextRect.x + nextRect.width/2) / galaxyWidth) * 100;
			let yPercent = ((nextRect.y + nextRect.height/2) / galaxyHeight) * 100;
			let mineral;
			let ring;
			let speed;

			state.galaxy = {width: galaxyWidth, height: galaxyHeight};

			mineral = +nextTicks[id].getAttribute('data-mineral');
			ring = +nextTicks[id].getAttribute('data-ring');
			speed = +nextTicks[id].getAttribute('data-speed');

			state.planets[id] = {
				id,
				nextTick: {xPercent, yPercent, width: nextRect.width, height: nextRect.height, x: nextRect.x, y: nextRect.y},
				mineral,
				ring,
				speed
			}
		},
		updatePlanetsInRange: (state) => {	
			let turn = Math.ceil((state.step+1) / (state.ticksPerTurn)) % state.players.length;
			turn = state.step === 0 ? 1 : turn === 0 ? state.players.length : turn;

			let activeShip = state.players[turn - 1];
			const spaceship = document.querySelector('.active.space-ship');
			let planets = state.planets;
			let extendedBurstRange = activeShip.burstRange*4;
			let filteredPlanets = [];
			let planetsInRange = [];

			for(var i = 0; i < planets.length; i++){
				document.getElementById(i).classList.remove("in-range");
				if(
						planets[i].id !== activeShip.planet &&
						planets[i].nextTick.xPercent > activeShip.position.x - extendedBurstRange &&
						planets[i].nextTick.xPercent < activeShip.position.x + extendedBurstRange &&
						planets[i].nextTick.yPercent > activeShip.position.y - extendedBurstRange &&
						planets[i].nextTick.yPercent < activeShip.position.y + extendedBurstRange
					){
						filteredPlanets.push(planets[i]);
				}
			}

			for(var j = 0; j < filteredPlanets.length; j++){
				if ( getDistanceBetween(filteredPlanets[j]) < 0 ){
					document.getElementById(filteredPlanets[j].id).classList.add("in-range");
					planetsInRange.push(filteredPlanets[j]);
				}
			}

			function getDistanceBetween(planet) {
				var a = getCenter(planet.nextTick);
				var b = getCenter(spaceship.getBoundingClientRect());
	
				return Math.hypot((a.x - b.x), (a.y - b.y)) - a.radius - b.radius;
			}

			state.planetsInRange = planetsInRange;
		},
		changePlanet(state, {player, planet}){

			state.players[player].planet = planet;

			// SFX
			// const AudioContext = window.AudioContext || window.webkitAudioContext;
			// const audioContext = new AudioContext();
			const audioEl = document.getElementById('jump-sound');
			// const sound = audioContext.createMediaElementSource(audioEl);
			// const gain = audioContext.createGain();
			// gain.gain.value = 1;
			// sound.connect(gain).connect(audioContext.destination);
			audioEl.play();
			
			// Avatar Animation
			state.players[player].avatar.emotion = 'excited';
			setTimeout(() => {
				state.players[player].avatar.emotion = null;
			}, 1000);
		},
		addMineral(state, {player, mineral}){
			if(state.players[player].materials.length < 24 )
				state.players[player].materials.push(mineral);
		},
		buildTool(state, {tool}){
			const player = this.getters.currentPlayerId;
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
		useTool(state, {tool}){

			// remove tool
			const toolList = this.getters.currentPlayer.tools;
			const toolIndex = toolList.indexOf(tool);
			toolList.splice(toolIndex, 1);

			// Make modification immediately
			state.deferredMods.push({
				step: state.step,
				mutation: state.tools[tool].modification.mutation,
				payload: state.tools[tool].modification.payload
			});

			this.dispatch('afterTickUpdate');

			// Add deferred Mod if necessary
			state.deferredMods.push({
				step: state.step + (state.ticksPerTurn * state.players.length * state.tools[tool].modification.epochs),
				mutation: state.tools[tool].modification.mutation,
				payload: state.tools[tool].modification.undoPayload
			});
		},
		changeEnergy(state, {player, amount}){
			state.players[player].energy = state.players[player].energy + amount;
		},
		expandControls(state, setting){
			state.ui.controlsExpanded = setting;
			if(!setting)
				state.ui.toolsExpanded = false;
		},
		disableControls(state, setting){
			state.ui.controlsExpanded = false;
			state.ui.controlsDisabled = setting;
			if(!setting)
				state.ui.toolsDisabled = false;
		},
		expandTools(state, setting){
			state.ui.toolsExpanded = setting;
		},
		randomizeBoard(state){
			let planets;
			for(var i = 0; i < state.systems.length; i++){
				planets = state.systems[i].planets;
				for(var j = 0; j < planets.length; j++){
					planets[j].radius = randomNumber(.5, 2.5);
					planets[j].mineral = randomNumber(0, 3);
					
					if( j > 0 && planets[j-1].ring === planets[j].ring )
						planets[j].speed = planets[j-1].speed;
					else
						planets[j].speed = randomNumber(8, 100);
				}
			}

			function randomNumber(min, max){
				return Math.floor(Math.random() * (max - min + 1) + min);
			}
		},
		setAspectRatio(state){
			// 3 aspect ratios are supported: 4:3, 3:2, and 16:9. Find the most appropriate aspect ratio for the user's device.
			// 1.33
			// --- 1.415
			// 1.5
			// --- 1.635
			// 1.77
			var aspectRatio = window.screen.width / window.screen.height;
			var aspectRatioNumbers = [];

			if(aspectRatio < 1.415)
				aspectRatioNumbers = [4, 3];
			else if(aspectRatio < 1.635)
				aspectRatioNumbers = [3, 2];
			else
				aspectRatioNumbers = [16, 9];

			// aspectRatioNumbers = [4, 3];

			state.ui.aspectRatio.x = aspectRatioNumbers[0];
			state.ui.aspectRatio.y = aspectRatioNumbers[1];
			state.ui.aspectRatio.name = `${aspectRatioNumbers[0]}:${aspectRatioNumbers[1]}`;
		},
		customizeFlesh(state, {player, color}) {
			state.players[player - 1].color = color;
		},
		customizeIris(state, {player, color}) {
			state.players[player - 1].avatar.iris = color;
		},
		customizeWidth(state, {player, headWidth}) {
			state.players[player - 1].avatar.headWidth = headWidth;
		},
		customizeHeight(state, {player, headHeight}) {
			state.players[player - 1].avatar.headHeight = headHeight;
		},
		customizeEyeSize(state, {player, eyeSize}) {
			state.players[player - 1].avatar.eyeSize = eyeSize;
		},
		customizeName(state, {player, name}) {
			state.players[player - 1].name = name;
		}
	},
	actions: {
		afterTickUpdate({commit, state}) {
			let step = state.step;
			let modsToDelete = [];

			state.deferredMods.forEach((mod, i) => {
				if( step === mod.step ){
					if( typeof(mod.payload) !== 'undefined' )
						commit(mod.mutation, {'payload': mod.payload});
					else
						commit(mod.mutation);

					modsToDelete.push(i);
				}
			});

			modsToDelete.forEach(i => state.deferredMods.splice(i, 1));

			// commit('updatePlanetsInRange');
			setTimeout(() => {
				commit('updatePlanetsInRange');
			}, 600)
		}
	}
});