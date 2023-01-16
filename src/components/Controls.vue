<template>
	<div @click="$store.commit('expandControls', !$store.state.ui.controlsExpanded)" :class="[{expanded: $store.state.ui.controlsExpanded}, {disabled: $store.state.ui.controlsDisabled}]" class="control-panel">
		<div class="cp-name" :style="`background-color: ${$store.getters.currentPlayer.color}; border-color: ${$store.getters.currentPlayer.color};`">
			<span class="mooko">{{$store.getters.currentPlayer.name}}</span>
			<div class="english">{{$store.getters.currentPlayer.name}}</div>
		</div>

		<div class="cp-body">

			<avatar
				:flesh="this.$store.getters.currentPlayer.color"
				:iris="this.$store.getters.currentPlayer.avatar.iris"
				:headHeight="this.$store.getters.currentPlayer.avatar.headHeight"
				:headWidth="this.$store.getters.currentPlayer.avatar.headWidth"
				:eyeSize="this.$store.getters.currentPlayer.avatar.eyeSize"
				class="cp-avatar"
				:class="'emotion--' + $store.getters.currentPlayer.avatar.emotion"
			/>

			<energy-meter :value="$store.getters.currentPlayer.energy" />

			<section class="cp-materials cp-section mb">
				<span class="cp-section--label">Resources</span>
				<ul class="cp-materials--list" dir="rtl">
					<li v-for="i in 24" :key="i"
						:class="[
							$store.state.mineralNames[$store.getters.currentPlayer.materials[i-1]],
							$store.getters.currentPlayer.materials[i-1] > -1 ? 'owned' : 'unowned'
						]"
					></li>
				</ul>
			</section>

			<section class="cp-tools cp-section mb">
				<span class="cp-section--label">Tools</span>
				<ul class="cp-tools--list">
					<li v-for="i in 4" :key="i"
						:class="$store.getters.currentPlayer.tools.length > i-1 ? $store.state.tools[$store.getters.currentPlayer.tools[i-1]].name : 'no-tool'">
						<img v-if="$store.getters.currentPlayer.tools.length > i-1 && $store.state.tools[$store.getters.currentPlayer.tools[i-1]].name === 'Turbo Booster'" src="@/assets/svgs/turbo-booster.svg" />
						<img v-else-if="$store.getters.currentPlayer.tools.length > i-1 && $store.state.tools[$store.getters.currentPlayer.tools[i-1]].name === 'Diamond Bit'" src="@/assets/svgs/drill-bit.svg" />
						<img v-else-if="$store.getters.currentPlayer.tools.length > i-1 && $store.state.tools[$store.getters.currentPlayer.tools[i-1]].name === 'Retrograde Bomb'" src="@/assets/svgs/retrograde-bomb.svg" />
						<img v-else-if="$store.getters.currentPlayer.tools.length > i-1 && $store.state.tools[$store.getters.currentPlayer.tools[i-1]].name === 'Super Booster'" src="@/assets/svgs/super-booster.svg" />
						<img v-else-if="$store.getters.currentPlayer.tools.length > i-1 && $store.state.tools[$store.getters.currentPlayer.tools[i-1]].name === 'Warp Speed Bomb'" src="@/assets/svgs/warp-speed-bomb.svg" />
						<span class="tool-name">{{$store.getters.currentPlayer.tools.length > i-1 ? $store.state.tools[$store.getters.currentPlayer.tools[i-1]].name : '' }}</span>
					</li>
				</ul>
				<div class="tool-buttons">
					<button @click.stop="$store.commit('expandTools', !$store.state.ui.toolsExpanded)">build / use</button>
				</div>
			</section>

			<section class="cp-buttons">
				<button @click.stop="sit" :style="`border-color: ${$store.getters.currentPlayer.color};`">sit</button>
				<button :disabled="$store.getters.currentPlayer.energy < 1" @click.stop="mine" :style="`border-color: ${$store.getters.currentPlayer.color};`">mine</button>
				<button :disabled="$store.state.planetsInRange.length === 0 || $store.getters.currentPlayer.energy < 2" @click.stop="jump" :style="`border-color: ${$store.getters.currentPlayer.color};`">jump</button>
				<ol class="ticks-left">
					<li v-for="i in 6" :key="i" :class="{'tick-spent': $store.getters.turnTick >= i}"></li>
				</ol>
			</section>

		</div>

	</div>
</template>

<script>
	import { mapMutations } from "vuex";
	import energyMeter from "./EnergyMeter.vue"
	import avatar from "./Avatar.vue"
	import getCenter from "../getCenter.js";

	const AudioContext = window.AudioContext || window.webkitAudioContext;

	export default {
		name: "s-controls",
		components: { avatar, energyMeter },
		methods: {
			...mapMutations(["tick", "changePlanet", "addMineral", "changeEnergy", "expandControls", "disableControls"]),
			getEnergy(){
				this.changeEnergy({player: this.$store.getters.currentPlayerId, amount: 1 / this.$store.getters.currentPlanet.ring});
			},
			disableInteraction(time){
				document.querySelector("body").classList.add("disable-interaction");

				if(time){
					setTimeout(function(){
						document.querySelector("body").classList.remove("disable-interaction");
					}, time);
				}
			},
			sit(){
				this.disableInteraction(600);
				this.getEnergy();
				this.tick(1);
				this.planetSound();
			},
			mine(){
				if(this.$store.getters.currentPlayer.energy <= 0)
					return;

				this.$emit('action', {
					className: 'mining',
					duration: 1000
				});
					
				this.disableInteraction(600);

				for(let i = 0; i < this.$store.getters.currentPlayer.miningStrength; i++) {
					this.addMineral({player: this.$store.getters.currentPlayerId, mineral: this.$store.getters.currentPlanet.mineral});
				}
				
				this.getEnergy();

				// use energy
				this.changeEnergy({player: this.$store.getters.currentPlayerId, amount: -1});
				this.mineSound();
				
				
				this.tick(1);
			},
			jump(){

				if(this.$store.getters.currentPlayer.energy <= 0)
					return;

				this.getEnergy();

				// use energy
				this.changeEnergy({player: this.$store.getters.currentPlayerId, amount: -2});

				let planetsInRange = this.$store.state.planetsInRange;
				if( planetsInRange.length === 1){
					
					this.disableInteraction(600);
					this.changePlanet({player: this.$store.getters.currentPlayerId, planet: planetsInRange[0].id})
					this.tick(1);
				}else{
					this.$store.getters.currentPlayer.avatar.emotion = 'thinking';

					this.$store.commit('disableControls', true);

					let planetId = this.$store.getters.currentPlayer.planet;

					
					let shipCoords = getCenter(document.getElementById(planetId).getBoundingClientRect());

					const galaxy = document.getElementById('galaxy');
					galaxy.style.transformOrigin = `${shipCoords.x}px ${shipCoords.y}px`;

					let galaxyRect = galaxy.getBoundingClientRect();
					let xOffset = galaxyRect.width/2 - shipCoords.x;
					let yOffset = galaxyRect.height/2 - shipCoords.y;

					galaxy.style.transform = `scale(2.2) translateX(${xOffset/2.2}px) translateY(${yOffset/2.2}px)`;
					galaxy.classList.add('zoom');

					for( let i = 0; i < planetsInRange.length; i++ ){
						document.getElementById(planetsInRange[i].id).classList.add('in-range');
					}
				}
			},
			planetSound(){
				// notes b4 to c4
				const notes = [493.9, 440, 392, 349.2, 329.6, 293.7, 261.6];
				const ring = this.$store.getters.currentPlanet.ring;
				const speed = this.$store.getters.currentPlanet.speed;
				const soundLength = speed / 10;
				
				const audioContext = new AudioContext(); 
				let oscillator = audioContext.createOscillator();
			
				const gain = audioContext.createGain();
				
				oscillator.frequency.exponentialRampToValueAtTime(100, 0);
				oscillator.frequency.exponentialRampToValueAtTime(notes[ring-1], .15);
				oscillator.frequency.exponentialRampToValueAtTime(100, .85);
				gain.gain.exponentialRampToValueAtTime(.005, 0);
				gain.gain.exponentialRampToValueAtTime(.0001, soundLength-.2);
				gain.gain.exponentialRampToValueAtTime(.05, .2);

				oscillator.connect(gain).connect(audioContext.destination);
				oscillator.start();
				oscillator.stop(soundLength);
			},
			mineSound() {
				const audioContext = new AudioContext(); 
				let osc = audioContext.createOscillator();
				let squeal = audioContext.createOscillator();

				const gainOsc = audioContext.createGain();
				osc.type = "triangle";

				const squealGain = audioContext.createGain();
				squealGain.gain.setValueAtTime(.001, audioContext.currentTime);
				squeal.frequency.setValueAtTime(5000, audioContext.currentTime);


				for (let i = 0; i < 10; i++) {
					let beat = (i * .1);
					gainOsc.gain.setValueAtTime(3.5, beat);
					gainOsc.gain.exponentialRampToValueAtTime(0.001, beat + .8);
								
					osc.frequency.setValueAtTime(20, beat);
					osc.frequency.exponentialRampToValueAtTime(0.001, beat + .8);
				}

				osc.connect(gainOsc);
				squeal.connect(squealGain);

				gainOsc.connect(audioContext.destination);
				squealGain.connect(audioContext.destination);

				osc.start(audioContext.currentTime);
				squeal.start(audioContext.currentTime);

				osc.stop(audioContext.currentTime + .8);
				squeal.stop(audioContext.currentTime + .8);
			}
		}
	}
</script>

<style >
	.control-panel {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		width: 70px;
		background: var(--control-panel);
		color: white;
		transition: all .5s;
	}

	.cp-body {
		padding: 8px;
	}

	* {
		box-sizing: border-box;
	}

	.mb{
		margin-bottom: 3vh;
	}

	.control-panel.expanded {
		width: 230px;
	}

	.control-panel.disabled {
		right: -70px;
	}

	.cp-name {
		position: absolute;
		width: 100%;
		padding: 3px 8px;
		font-size: 9px;
		margin-bottom: 0;
		transition: all .6s;
	}

	.cp-name .english {
		position: absolute;
		right: 10px;
		/* margin-top: .5em; */
		opacity: 0;
		font-size: 11px;
		color: #888;
	}

	.cp-avatar {
		margin-bottom: .25em;
		margin-top: .75em;
		height: 6vh;
		max-width: 100%;
		transition: all .6s;
	}

	.expanded .cp-name {
		font-size: 25px;
		/* padding-top: 27px; */
		background-color: transparent !important;
		border-top: 5px solid;
	}

	.expanded .cp-name .english {
		opacity: 1;
		transition: all .6s .6s;
	}

	.expanded .cp-avatar {
		height: 13vh;
		margin-top: -.5em;
		margin-bottom: 0;
	}

	@media (max-height: 500px) {
		.expanded .cp-avatar {
			height: 11vh;
			margin-top: -0.2em;
			margin-bottom: -0.2em;
		}
	}

	.cp-section {
		height: 21.5vh;
		background: var(--gray);
		padding: 8px;
	}

	.cp-materials--list,
	.cp-tools--list {
		width: 100%;
		height: 100%;
		padding: 0 0 0 20px;
		margin: 0;
		list-style: none;
	}

	.cp-tools--list img {
		width: 1em;
		height: 1em;
	}

	.cp-materials--list {
		display: flex;
		flex-wrap: wrap;
	}

	.cp-materials--list li {
		width: calc(25% - 2px);
		height: calc(16% - 1px);
		background: rgba(255,255,255,.05);
		margin: 1px;
	}

	.cp-section--label {
		display: block;
		position: absolute;
		width: calc(20vh - 12px);
		height: 20px;
		margin-top: calc(20vh - 12px);
		transform: rotate(-90deg);
		transform-origin: 0 top;
		text-align: center;
		font-size: 12px;
		text-transform: uppercase;
	}

	.cp-buttons {
		position: absolute;
		bottom: 0;
		width: calc(100% - 16px);
	}

	.cp-buttons button {
		display: block;
		width: 100%;
		margin: 2.3vh 0;
		padding: 1.1vh 8px;
	}

	/* Tools */
	.cp-tools {
		position: relative;
		min-height: 86px;
		overflow: hidden;
	}

	.cp-tools--list {
		overflow: hidden;	
	}

	.cp-tools--list li {
		display: flex;
		align-items: center;
		height: 25%;
		margin-bottom: 0;
		white-space: nowrap;
		transition: all .6s;
	}

	.tool-icon {
		display: inline-block;
		flex-shrink: 0;
		width: 1em;
		height: 1em;
		text-align: center;
	}

	.no-tool .tool-icon {
		background: rgba(255,255,255,.075);
		border-radius: 50%;
	}

	.tool-name {
		display: inline-block;
		opacity: 0;
		transition: .6s all;
		margin-left: .4em;
	}

	.expanded .tool-name {
		opacity: 1;
	}

	@media (max-height: 500px) {
		.cp-tools--list {
			font-size: 11px;
		}

		.tool-buttons {
			top: 5px;
			right: 30px !important;
			transform: rotate(-90deg);
			transform-origin: 100% 0%;
		}

		.tool-buttons button {
			font-size: 11px;
		}
	}

	@media (min-height: 501px) {
		.expanded .cp-tools--list li {
			height: 20%;
		}
	}

	.tool-buttons {
		position: absolute;
		bottom: 0;
		left: -999999px;
		opacity: 0;
		transition: opacity .2s;
	}

	.tool-buttons button {
		margin: 1vh;
		padding-top: .5vh;
		padding-bottom: .5vh;

	}

	.expanded .tool-buttons {
		left: initial;
		right: 0;
		opacity: 1;
		transition: opacity .6s .6s;
	}

	.interaction-disabler {
		display: none;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1;
	}

	.disable-interaction .interaction-disabler {
		display: block;
	}

	.ticks-left {
		display: flex;
		justify-content: space-between;
		margin: 0;
		margin-top: -1vh;
		margin-bottom: 1vh;
		padding: 0;
		list-style: none;
	}

	.ticks-left li{
		width: 10%;
		height: 2px;
		background: rgba(255,255,255,.2);
	}

	li.tick-spent {
		background: white;
	}
</style>