<script setup lang="ts">
import { onMounted } from "vue";
import { getTutorials } from "../../api/home";

onMounted(() => {
	getTutorials()
		.then((res) => {
			console.log(import.meta.env.VITE_APP_API_URL);
			console.log("res:", res);
		})
		.catch((error) => {
			console.log("error", error);
		});
});
</script>
<template>
	<div class="home">
		<div class="logo">Logo</div>
		<div class="carousel">Carousel</div>
		<div class="marquee">Marquee</div>
		<div class="user-card">UseCard</div>
		<div class="game-box">
			<div class="left-box"></div>
			<div class="right-box"></div>
		</div>
	</div>
</template>
<style>
.home {
	height: 100%;
}
.home div {
	border: 1px gray solid;
	font-size: 14px;
	text-align: center;
}
.logo {
	height: 5%;
}
.carousel {
	height: 20%;
}
.marquee {
	height: 3%;
}
.user-card {
	height: 7%;
}
.game-box {
	height: 55%;
	display: flex;
	flex-direction: row;
}
.left-box {
	width: 15%;
	height: 100%;
	margin: 0 10px 0 10px;
}
.right-box {
	width: 80%;
	height: 100%;
}
</style>
