<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";
	 /* #ifdef H5 */ 
	uni-page-head { display: none; } 
	/* #endif */
	.page {
	}
	
	.p24 {
		padding: 0 24rpx;
	}
	
	.p32 {
		padding: 0 32rpx;
	}
</style>