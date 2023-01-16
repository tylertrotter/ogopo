<template>
	<div class="board" :class="currentAction">
		<s-galaxy />
		<s-tool-details />
		<s-controls @action="setAction" />
		<s-player-transition />
		<div class="interaction-disabler"></div>
		<audio autoplay loop>
			<source src="@/assets/audio/ambient.mp3" type="audio/mpeg" />
		</audio>
		<audio id="jump-sound">
			<source src="@/assets/audio/jump.mp3" type="audio/mpeg" />
		</audio>
	</div>
</template>

<script>
	import SGalaxy from './Galaxy.vue';
	import SToolDetails from './ToolDetails.vue';
	import SControls from './Controls.vue';
	import SPlayerTransition from './PlayerTransition.vue';
import { setTimeout } from 'timers';

	export default {
		name: 's-board',
		components: {
			SGalaxy,
			SToolDetails,
			SControls,
			SPlayerTransition
		},
		data(){
			return {
				currentAction: null
			}
		},
		methods: {
			setAction(options){
				this.currentAction = options.className;

				setTimeout(()=>{
					this.currentAction = null;
				}, options.duration);
			}
		}
	}
</script>

<style scoped>
	.board {
		display: flex;
		position: relative;
    flex-direction: column;
    justify-content: center;
		overflow: hidden;
		height: 100vh;
	}
</style>