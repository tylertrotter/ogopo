<template>
	<svg class="avatar" viewBox="0 0 100 100">
		<defs>
			<clipPath id="eye-lids">
				<rect x="30" y="35" width="35" height="24" class="eye-lid-mask" />
			</clipPath>
		</defs>

		<g class="koobo" :fill="flesh">
			<path d="M68 17.5 Q 50 30 50 50 Q 50 30 32 17.5" />
			<path d="M62 17.5 Q 50 30 50 50 Q 50 30 32 17.5" fill="black" fill-opacity=".2" />
			<ellipse cx="50" cy="17" rx="18" ry="5" />
			<ellipse cx="50" cy="16" rx="14" ry="2.75" style="fill:black; fill-opacity: .5; stroke: white; stroke-opacity: .1;"  />
		</g>

		<g class="head" :fill="flesh" :style="`transform: scale(${headWidth}, ${headHeight});`">
			<circle cx=50 cy=60 r=30 class="head-proper" :stroke="flesh" />
			<circle cx=53 cy=57 r=25 style="fill: white; opacity: .15" />
		</g>

		<g class="eye" :style="`transform: scale(${eyeSize}); translate(${eyeSize} ${eyeSize})`">
			<circle cx=50 cy=47 r=14 :fill="flesh"  />
			<g clip-path="url(#eye-lids)" >
				<circle cx=50 cy=47 r=12 class="eye-white" />
				<g class="inner-eye">
					<circle cx=50 cy=47 r=6 :fill="iris" />
					<circle cx=50 cy=47 r=3 fill="black" class="pupil" />
				</g>
			</g>
		</g>

		<path class="mouth mouth--null" d="M40 73 Q 50 85 60 73" stroke="black" stroke-linecap="round" stroke-width="2" fill="transparent"/>
		<ellipse class="mouth mouth--excited" cx="50" cy="75" rx="11" ry="5" />
		<path class="mouth mouth--thinking" d="M40 73, Q 50 68 60 73" stroke="black" stroke-linecap="round" stroke-width="2" fill="transparent"/>

	</svg>
</template>

<script>
	export default {
		name: "avatar",
		props: {
			flesh: String,
			iris: String,
			eyeSize: Number,
			kooboSize: Number,
			headWidth: Number,
			headHeight: Number
		}
	}
</script>

<style scoped>

	@keyframes koobo {
		0%{ transform: rotate(0); }
		20%{ transform: scaleY(1.15)  rotate(10deg); }
		80%{ transform: rotate(-20deg); }
		100%{ transform: rotate(0); }
	}

	@keyframes koobo--excited {
		0%{ transform: scaleY(1.15) rotate(-10deg); }
		100%{ transform: scaleY(1.5) rotate(-20deg); }
	}

	.koobo {
		transform-origin: center;
		animation: koobo 30s infinite;
	}

	.emotion--excited .koobo {
			animation: koobo--excited 1s infinite;
	}

	.head {
		transform-origin: center;
	}

	@keyframes cillia {
		0% { stroke-width: 3; }
		50% { stroke-width: 5; }
		100% { stroke-width: 3; }
	}

	.head-proper {
		stroke-opacity: .5;
		stroke-dasharray: 1 2;
		animation: cillia 3s infinite;
	}

	.eye {
		transform-origin: center;
	}

	.eye-white {
		fill: white;
		stroke: var(--flesh);
	}

	@keyframes eye {
		0% { transform: translate(0, 0); }
		40% { transform: translate(3%, 0); }
		60% { transform: translate(-3%, -3%); }
		70% { transform: translate(-2.5%, -3%); }
		80% { transform: translate(1%, 3%); }
		100% { transform: translate(0, 0); }
	}

	.inner-eye {
		animation: eye 10s infinite;
	}

	.emotion--thinking .inner-eye {
		animation: none;
		transform: translate(-3%, -3%);
	}

	@keyframes blink {
		50% { transform: scaleY(1); }
		51% { transform: scaleY(0); }
		53% { transform: scaleY(1); }
	}

	.eye-lid-mask {
		transform-origin: center;
		animation: blink 10s infinite;
	}

	.emotion--thinking .eye-lid-mask {
		transform-origin: center;
		transform: scaleY(.6) rotate(30deg);

		animation: none;
	}

	.mouth {
		opacity: 0;
	}

	.emotion--null .mouth--null,
	.emotion--excited .mouth--excited,
	.emotion--thinking .mouth--thinking {
		opacity: 1;
	}
</style>