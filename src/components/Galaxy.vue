<template>
	<svg id="galaxy" class="galaxy" :width="$store.state.ui.aspectRatio.x" :height="$store.state.ui.aspectRatio.y">
		<s-solar-system v-for="(system, i) in $store.state.systems[$store.state.ui.aspectRatio.name]" :key="i"
			:width="system.width"
			:x="system.x+'%'"
			:y="system.y+'%'"
			:sun-size="system.sunSize"
			:clockwise="system.clockwise"
		>
			<s-planet v-for="(planet, j) in system.planets" :key="j"
				:radius="planet.radius"
				:ring="planet.ring"
				:speed="planet.speed"
				:mineral="planet.mineral"
				:spot="planet.spot"
				:retrograde="planet.retrograde"
			/>
		</s-solar-system>

		<s-space-ship v-for="(player, i) in $store.state.players" :key="`${player.name}-${i}`" :player="i + 1" />

	</svg>
</template>

<script>
	import SSolarSystem from './SolarSystem.vue';
	import SPlanet from './Planet.vue';
	import SSpaceShip from './SpaceShip.vue';

	export default {
		name: 's-board',
		components: {
			SSolarSystem,
			SPlanet,
			SSpaceShip
		}
	}
</script>

<style scoped>
	.galaxy {
		width: 100%;
		height: auto;
		background: var(--void);
		transition: all 2s;
	}
</style>