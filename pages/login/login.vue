ort<template>
	<view class="page">
		<ls-loading text="正在登录中..." animation="rise" v-if="true"></ls-loading>
	</view>
</template>

<script>
	import {
		_IsEmpty
	} from '@gykeji/jsutil'
	import {
		USER_TOKEN_KEY
	} from '@/common/Const.js'
	import {
		mapState,
		mapActions,
		mapMutations
	} from "vuex";
	import to from 'await-to-js'
	import {
		wxAuthorization
	} from '@/config/api.js'
	import lsLoading from '@/uni_modules/ls-loading/components/ls-loading/ls-loading.vue'
	import Utils from '@/common/Utils.js'
	
	export default {
		components: {
			lsLoading
		},
		data() {
			return {
				code: "",
				state: "",
				fromPage: "/pages/home/home"
			};
		},
		async onLoad(options) {
			this.code = options?.code
			this.state = options?.state
			this.fromPage = options?.fromPage
			if (this.code && this.state) {
				this.clickWxLogin()
			} else {
				uni.redirectTo({
					url: '/pages/home/home'
				})
			}
		},
		computed: mapState(['userInfo']),
		methods: {
			...mapActions(["afterUserLogin"]),
			async clickWxLogin() {
				Utils.afterAjax(await to(wxAuthorization(this.code, this.state)), token => {
					this.afterUserLogin(token)
					uni.redirectTo({
						url: Utils.urldecode(this.fromPage)
					})
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.login-btn {
		width: 90%;
		margin: 0 auto;
		position: absolute;
		bottom: 300rpx;
	}
</style>
