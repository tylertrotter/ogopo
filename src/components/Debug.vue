<template>
	<div class="debug">
		<div id="console"></div>
	</div>
</template>

<script>
	export default {
		name: 'debug'
	}
</script>

<style scoped>
	.debug {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 1000;
		background: #666;
		color: white;
		padding: 10px;
	}
</style>