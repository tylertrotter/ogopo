<template>
	<g>
		<circle class="orbit" cx="50%" cy="50%" :r="orbitRadius+'%'" :style="`stroke-dasharray: ${dasharrayCalc};`" />
		<circle
			@click="jumpHere"
			:id="this.id"
			class="planet"
			:class="$store.state.mineralNames[mineral]"
			cx="50%"
			:cy="planetPosition"
			:r="radius + '%'"
			:style="`transform: rotate(${rotate}deg);`"
		/>
		<circle
			class="next-tick"
			cx="50%"
			:cy="planetPosition"
			:r="radius + '%'"
			:style="`transform: rotate(${nextTick}deg);`"
			:data-planet-id="this.id"
			:data-ring="ring"
			:data-speed="speed"
			:data-mineral="mineral"
		/>
	</g>
</template>

<script>
	import { mapMutations } from "vuex";
	import assignId from "../mixins/assignId";
import { setTimeout } from 'timers';

	export default {
		name: 's-planet',
		mixins: [assignId],
		props: [
			'radius',
			'ring',
			'speed',
			'retrograde',
			'mineral',
			'spot'
		],
		data(){
			return {
				direction: +1,
				center: null
			}
		},
		methods: {
			...mapMutations(['changePlanet', 'tick']),
			jumpHere(e){
				if(!e.srcElement.classList.contains('in-range'))
					return

				let galaxy = document.getElementById('galaxy');
				galaxy.setAttribute('style', '');
				galaxy.classList.remove('zoom');

				let inRangePlanets = document.querySelectorAll('.in-range');

				for(let i = 0; i < inRangePlanets.length; i++){
					inRangePlanets[i].classList.remove('in-range');
				}

				setTimeout(() => {
					this.changePlanet({player: this.$store.getters.turn - 1, planet: this.id})
					this.tick(1);
					this.$store.commit('disableControls', false);
				}, 2000)

			}
		},
		computed: {
			planetPosition(){
				const outerOrbit = 45;
				return (outerOrbit - this.ring * 5) + '%';
			},
			orbitRadius(){
				const minOrbitRadius = 5;
				return (minOrbitRadius + this.ring * 5);
			},
			dasharrayCalc(){
				const circum = (this.orbitRadius * 2 * Math.PI) / this.speed.toFixed(2);
				return `.1% ${circum - .1}%`;
			},
			rotate(){
				const spot = +this.spot || 0;
				let degrees = (360 / this.speed) * (this.$store.state.tick * this.direction) + (spot * (360 / this.speed));
				return degrees;
			},
			nextTick(){

				let degrees = (360 / this.speed) * (this.$store.state.orbitSpeed * this.direction);
				return this.rotate + degrees;
			}

		},
		created(){
			const primaryDirection = this.$parent.$props.clockwise ? +1 : -1;
			this.direction = this.retrograde ? primaryDirection * -1 : primaryDirection;

			this.$store.subscribe((mutation) => {
				if(mutation.type === "tick"){
					this.$store.commit("updatePlanet", this.id);
				}
			});
		},
		mounted(){
			setTimeout(()=>{
				this.$store.commit("updatePlanet", this.id);
			})
		}
	}
</script>

<style scoped>
	.planet,
	.next-tick {
		transform-origin: center;
		transition: all .5s;
	}
	.planet {
		stroke-width: 0;
	}

	[id="0"].planet {
		stroke: white;
		stroke-width: 2;
	}

	.next-tick {
		fill: gray;
		opacity: 0;
	}

	.orbit {
		fill: none;
		stroke-width: 1px;
		stroke: #999;
		transform-origin: center;
		transform: rotate(-90deg);
	}

	.tungsten {
		fill: var(--tungsten);
		stroke: var(--tungsten);
	}

	.radium {
		fill: var(--radium);
		stroke: var(--radium);
	}

	.copper {
		fill: var(--copper);
		stroke: var(--copper);
	}

	.mercury {
		fill: var(--mercury);
		stroke: var(--mercury);
	}

	.tin {
		fill: var(--tin);
		stroke: var(--tungsten);
	}

	.zoom .planet:not(.in-range){
		opacity: .3;
		pointer-events: none;
		fill: gray;
	}

	.in-range {
		stroke-width: 15;
		stroke-opacity: .2;
	}
</style>