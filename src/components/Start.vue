<template>
	<main class="wrapper">
		<img src="@/assets/svgs/ogopo-logo.svg" alt="Ogopo" />
		<router-link to="/setup/players" class="button">Start New Game</router-link>
		<button v-if="savedGame" class="button" @click="continueGame">Continue Game</button>
	</main>
</template>

<script>
	import { mapMutations } from "vuex";
	export default {
		name: "s-start",
		data(){
			return {
				savedGame: JSON.parse(localStorage.getItem("vuex")).players.length > 0
			}
		},
		methods: {
			...mapMutations(["setAspectRatio"]),
			continueGame(){
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
		},
		created(){
			this.$store.commit('setAspectRatio');
		}
	}
</script>

<style scoped>
	img {
    display: block;
		height: 33vh;
    max-width: 100%;
		margin: 10vh auto 2vh;
	}
	.button {
		font-size: 2em;
		margin: .5em;
	}
</style>