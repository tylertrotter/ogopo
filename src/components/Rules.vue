<template>
	<main class="wrapper left-aligned">
		<button class="close" @click="goBack">&times;</button>
		<h1>Ogopo Rules</h1>

		<h2>Backstory</h2>

		<p>Civil war rages on Oogogoo, the home planet of the Mookogoo. Very recently, all the military leaders from the warring factions have independently come to the same conclusion&mdash;the only way to break the stalemate is to develop the theoretical t-bomb. The t-bomb is only theoretical because to create one requires huge amounts of the galaxies most precious resources, tin.</p>

		<p>In order to win the race to the bomb and therefore the war, each faction has recruited the bravest mookogoo on the planet for a daring mission. The mission is to fly across the galaxy to the remote but tin-rich planet of Oogobobo, mine 12 cargo containers of the mineral and bring it back home for the scientists to build the bomb. </p>

		<h2>Objective</h2>

		<p>The first player to navigate to the green of Oogobobo,  mine 12 units of tin, and then make it back to the home planet, wins! Players must plan their trip across the galaxy based on the alignment and movement of planets.</p>

		<h2>How to Play</h2>

		<h3>Sit, Mine or Jump</h3>

		<p>Each player's turn is split into 6 ticks. With each new tick, all planets move along their orbits. The speed of the orbit is indicated by the number of dots shown on the planet's path. On a player's turn each tick brings with it a decision that must be made to sit (E.g. bide one's time and do nothing), mine, or jump (to a new planet).</p>

		<h3>Mining</h3>

		<p>The planets are composed of different elements that are useful for building various tools that can help in the mission. The resources mined on a tick will be of the same color as the planet. It takes 1 fuel unit to mine a resource.</p>

		<h4>Resource Colors</h4>

		<ul>
			<li>Tungsten (blue)</li>

			<li>Radium (purple)</li>

			<li>Copper (red)</li>

			<li>Mercury (orange)</li>

			<li>Tin (green)</li>
		</ul>

		<h3>Jumping</h3>

		<p>Space ships are only able to go in short bursts to nearby planets. A player's spaceship is surrounded by a ring indicating how far the ship can travel. A planet must be at least partially within this burst range  to be accessible. Even if a planet is in range, without at least 2 fuel units a ship won't have the energy to make the jump.</p>

		<h3>Fuel</h3>


		<p>Each player's space ship is powered by solar energy. The closer a ship is to the sun in the current solar system, the more energy is absorbed with each tick of the player's turn. On the ring closest to the sun a full fuel unit is charged, a diminishing fraction of a fuel unit is charged with each ring going out. 1/2 fuel unit is charged while on second ring, 1/3 unit on third ring and so on.</p>
		<p>It takes two fuel units to jump to a nearby planet and one fuel unit to mine.</p>

		<h3>Tools</h3>

		<ul>
			<li>
				<h4>Turbo Booster</h4>
				<p>This increases your ship's burst range 1 level. Burst ranges start at level 1 and max out at 3. Lasts for remainder of your turn.</p>
				<p><strong>Recipe:</strong> 4 units of radium, 4 units of tungsten, 4 units of copper</p>
			</li>

			<li>
				<h4>Super Booster</h4>
				<p>This increases your ship's burst range. Lasts for 2 turns.</p>
				<p><strong>Recipe:</strong> 6 units of copper, 6 units of mercury</p>
			</li>

			<li>
				<h4>Diamond Bit</h4>
				<p>Mine minerals at double the normal rate. Lasts for 20 turns.</p>
				<p><strong>Recipe:</strong> 4 units of radium, copper, and mercury each</p>
			</li>

			<li>
				<h4>Retrograde Bomb</h4>
				<p>Reverses every orbit in the galaxy. Lasts for the epoch.</p>
				<p><strong>Recipe:</strong> 6 units of radium, 6 units of mercury</p>
			</li>

			<li>
				<h4>Warp Speed Bomb</h4>
				<p>Speeds up time to be twice as fast. Planets move around their orbits double the amount they would normally. Lasts for the epoch.</p>
				<p><strong>Recipe:</strong> 8 units of tungsten, 2 units of copper, 2 units of mercury</p>
			</li>
		</ul>
	</main>
</template>

<script>
	export default {
		name: "s-rules",
		methods: {
			goBack() {
				this.$router.go(-1);
			}
		}
	}
</script>

<style scoped>
	.close {
		position: fixed;
		top: 10px;
		right: 10px;
		font-size: 1.5em;
	}
</style>