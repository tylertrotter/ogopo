<template>
	<main class="wrapper">
		<img src="@/assets/svgs/ogopo-logo.svg" class="logo" alt="Ogopo" />
		<h1>Number of players</h1>
		<ol>
			<li v-for="i in 7" :key="i">
				<button 
					@click="updatePlayersNum(i+1)"
					:class="{'active': numPlayers === i+1}">{{ i + 1 }}</button>
			</li>
		</ol>
		<button @click="createPlayers()" class="button">OK!</button>
	</main>
</template>

<script>
	import { mapMutations } from "vuex";
	export default {
		name: "s-number-of-players",
		data() {
			return {
				numPlayers: 2
			}
		},
		created(){
			this.$store.commit('resetGame');
		},
		methods: {
			...mapMutations(["createPlayer", "resetGame"]),
			updatePlayersNum(n){
				this.numPlayers = n;
			},
			createPlayers(){
				for(let i = 0; i < this.numPlayers; i++){
					this.$store.commit('createPlayer');
				}
				this.$router.push({path: "/setup/1"});
			}
		}
	}
</script>

<style scoped>
	ol {
		display: flex;
		justify-content: space-between;
		margin: 0 0 2rem;
		padding: 0;
		list-style: none;
	}

	li {
		display: inline-block;
	}

	li button {
		padding: 2vw 3.5vw;
		font-size: 4vw;
	}

	@media (min-width: 900px) {
		li button {
			padding: 20px 35px;
		}
	}
	.active {
		background: var(--color-2);
	}

	.logo {
		max-width: 30vw;
		margin-top: 5vh;
		margin-bottom: 5vh;
	}
</style>