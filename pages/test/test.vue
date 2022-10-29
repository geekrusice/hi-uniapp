<template>
	<view>
		<button @click="goToPage">xxx</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goToPage() {
				this.$Router.redirectTo({
				  url: '/pages/home/home',
				  query: {} // 路由传参
				})
			}
		}
	}
</script>

<style>

</style>
