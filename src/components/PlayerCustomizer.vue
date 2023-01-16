<template>
	<main class="wrapper">
		<h1>Customize player {{ player }}</h1>

		<div class="customizer-layout">
			<form>
				<div style="display: flex;">
					<div class="field">
						<label for="color">Body Color</label>
						<s-color-picker id="color" initial-color="#ccc" @color-change="updateFlesh" />
					</div>
				
					<div class="field">
						<label for="eye-color">Eye Color</label>
						<s-color-picker id="eye-color" initial-color="#ccc"  @color-change="updateIris"/>
					</div>
				</div>
				<div class="field">
					<!-- http://danielstern.ca/range.css -->
					<label for="width">Width</label>
					<s-range type="range" id="width" step=".01" min=".8" max="1.2" :value="1" @update-value="updateWidth" />
				</div>

				<div class="field">
					<label for="height">Height</label>
					<s-range type="range" id="height" step=".01" min=".8" max="1.15" :value=".975" @update-value="updateHeight" />
				</div>



				<div class="field">
					<label for="eye-size">Eye Size</label>
					<s-range type="range" id="eye-size" step=".01" min=".6" max="1.3" :value=".975" @update-value="updateEyeSize" />
				</div>

				<div class="field">
					<label>Name</label>
					<s-mooko @change="updateName"/>
				</div>
			</form>

			<avatar 
				:flesh="currentPlayer.color"
				:iris="currentPlayer.avatar.iris"
				:headWidth="currentPlayer.avatar.headWidth"
				:headHeight="currentPlayer.avatar.headHeight"
				:eyeSize="currentPlayer.avatar.eyeSize"
				class="emotion--null"
			/>
		</div>
		<button v-if="morePlayers" @click="goToNext">next</button>
		<button v-else @click="goToNext">
			<span v-if="!gameLoading">start game</span>
			<img v-else class="preload-symbol" src="@/assets/svgs/loading.svg" />
		</button>
		<div>
			<div class="error-message" :class="{'error-message--hide': !showErrorMessage}">{{validate.message}}</div>
		</div>
	</main>
</template>

<script>
	import { mapMutations } from "vuex";
	import { mapState } from 'vuex'
	import SColorPicker from "./ColorPicker.vue"
	import SRange from "./Range.vue"
	import SMooko from "./Mooko.vue"
	import Avatar from "./Avatar.vue"
	export default {
		name: 's-player-customizer',
		props: {
			player: Number
		},
		components: { SColorPicker, SRange, Avatar, SMooko },
		data() {
			return {
				errorMessage: null,
				showErrorMessage: false,
				gameLoading: false
			}
		},
		computed: {
			...mapState(['players']),
			morePlayers() {
				return this.$store.getters.numberOfPlayers > this.$props.player;
			},
			currentPlayer(){
				return this.$store.state.players[this.$props.player-1];
			},
			validate(){
				if(this.currentPlayer.color === "#ccc")
					return {error: true, message: "Pick a color for your player"};
				else if(this.currentPlayer.name.length === 0)
					return {error: true, message: "Pick a name for your player"};
				else if(this.currentPlayer.name.length === 1)
					return {error: true, message: "Pick a longer name for your player"};
				else
					return {error: false, message: null}
			}
		},
		created(){
			if(!this.$store.state.players.length)
				window.location = "/"
		},
		methods: {
			...mapMutations(["customizeFlesh", "customizeIris", "customizeWidth"]),
			updateFlesh(color){
				this.$store.commit("customizeFlesh", {player: this.$props.player, color: color});
				this.showErrorMessage = false;
			},
			updateIris(color){
				this.$store.commit("customizeIris", {player: this.$props.player, color: color});
			},
			updateWidth(width){
				this.$store.commit("customizeWidth", {player: this.$props.player, headWidth: width});
			},
			updateHeight(height){
				this.$store.commit("customizeHeight", {player: this.$props.player, headHeight: height});
			},
			updateEyeSize(eyeSize){
				this.$store.commit("customizeEyeSize", {player: this.$props.player, eyeSize: eyeSize});
			},
			updateName(name){
				this.$store.commit("customizeName", {player: this.$props.player, name: name});
				this.showErrorMessage = false;
			},
			goToNext(){
				if(this.validate.error)
					this.showErrorMessage = true;
				else if(this.morePlayers)
					this.$router.push({path: `/setup/${this.$props.player + 1}`});
				else{
					this.gameLoading = true;

					const docEl = document.documentElement;
					if (docEl.requestFullscreen) {
						docEl.requestFullscreen();
					} else {
						if (docEl.mozRequestFullScreen) {
							docEl.mozRequestFullScreen();
						} else {
							if (docEl.webkitRequestFullscreen) {
								docEl.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
							}
						}
					}

					setTimeout(() => {
						this.$router.push({path: `/game`});
					}, 1000);
				}
			}
		},
	}
</script>

<style scoped>
	.customizer-layout {
		display: flex;
	}

	.wrapper {
		text-align: left;
	}

	form {
		width: 40%;
		text-align: left;
	}

	form > * + * {
		margin-top: 4.5vh;
	}

	.field {
		margin-right: 2rem;
	}

	.avatar {
		position: fixed;
		right: 0;
		top: 0;
		z-index: -1;
		width: 68%;
		max-height: 100%;
	}

	.error-message {
		display: inline-block;
		min-height: 2em;
		background: var(--color-2);
		margin-top: 1rem;
		padding: .8rem 1rem;
		transition: .2s;
		position: fixed;
		top: 0;
		right: 0;

	}

	.error-message--hide {
		opacity: 0;
	}

	button {
		margin-top: 1em;
		font-size: 1.5em;
		min-width: 7em;
		text-align: center;
	}

	.preload-symbol {
		width: 1.35em;
		display: block;
		margin: 0 auto;
		transform: scale(1.5);
	}

	@media (max-height: 530px){
		button{
			position: fixed;
			right: 1rem;
			bottom: 1rem;
			font-size: 1.3em;
		}
	}

</style>