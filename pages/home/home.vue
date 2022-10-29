<template>
	<view>
		<view class="user-header p24" v-if="isLogin">
			<u-avatar size="120" :src="userInfo.avatar" style="border: 2px solid #f8ca45;"></u-avatar>
			<view class="username">
				<view>
					{{userInfo.nickname}}
					<text class="tag success" v-if="userInfo.bindAccount === true">已绑定</text>
					<text class="tag error" v-if="userInfo.bindAccount === false">未绑定</text>
				</view>
			</view>
			<template v-if="userInfo.studentProfile">
				<view class="school-name">{{userInfo.studentProfile.schoolName}}</view>
				<view class="school-name">{{userInfo.studentProfile.professional}}</view>
			</template>
			
			<!-- <view class="school-name">ARTS (ENG. FOR PROFESSIONALS)</view> -->
		</view>

		<view class="user-header p24" v-else @click="clickWxLogin">
			<u--image width="100rpx" height="100rpx" :showLoading="true"
				:src="defaultUserAvatar" shape="circle"></u--image>
			<view class="username">
				点击登录
			</view>
		</view>

		<view class="menu-items p24">
			<!-- <view class="menu-item">
				<u-icon name="pushpin" color="#ffaa00" size="22"></u-icon>
				<text>到期时间 2022-10-15</text>
			</view> -->
			<view class="menu-item" v-for="(menu, index) in menuList" :key="index" @click="clickMenu(menu)">
				<u-icon :name="menu.icon" :color="menu.color" size="22"></u-icon>
				<text>{{menu.name}}</text>
				<u-icon style="margin-left: auto" name="arrow-right" size="22"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	import Utils from '@/common/Utils.js'
	import to from 'await-to-js'
	import {
		_IsEmpty
	} from '@gykeji/jsutil';
	import {
		mapState,
		mapActions,
		mapMutations
	} from "vuex";
	export default {
		computed: mapState(['isLogin', 'userInfo']),
		data() {
			return {
				defaultUserAvatar: require('@/static/images/default-avatar.jpg'),
				menuList: [{
						name: '绑定学籍账号',
						path: '/pages/home/bindAccount/bindAccount',
						icon: 'pushpin',
						color: '#ffaa00',
						needAuth: true,
					},
					{
						name: '课程表',
						path: `/pages/home/calendar/weekCalendar/weekCalendar`,
						icon: 'warning',
						color: '#ffaa00',
						needAuth: true,
					},
					{
						name: '查成绩',
						path: `/pages/home/grade/grade`,
						icon: 'checkmark',
						color: '#ffaa00',
						needAuth: true,
					},
					{
						name: '问题反馈',
						path: `/pages/feedback/feedback`,
						icon: 'kefu-ermai',
						color: '#ffaa00'
					},
				]
			}
		},
		methods: {
			clickMenu(menu) {
				if (menu.needAuth && !this.isLogin) {
					uni.showToast({
						title: '请先登录'
					})
				} else {
					this.$Router.navigateTo({
						url: menu.path
					})
				}
			},
			clickWxLogin() {
				Utils.clickWxLogin()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user-header {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		padding-bottom: 42rpx;
		margin-top: 12rpx;
		
		.head-img {
			width: 140rpx;
			height: 140rpx;
			border-radius: 50%;
			margin-right: 40rpx;
		}

		.username {
			display: flex;
			flex-direction: column;
			
			> view:first-of-type {
				font-size: 34rpx;
				font-weight: bold;
			}

			.tag {
				margin-top: 12rpx;
				margin-left: 24rpx;
				font-size: 24rpx;
				border: 1px solid;
				border-radius: 8rpx;
				text-align: center;
				width: 84rpx;
			}

			.error {
				color: red;
				border-color: red;
			}

			.success {
				color: green;
				border-color: green;
			}
		}
		
		.school-name {
			font-size: 26rpx;
			font-weight: normal;
			margin-top: 16rpx;
			color: #7f7f7f;
			text-align: center;
		}
	}

	.menu-items {
		display: flex;
		flex-direction: column;

		.menu-item {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			height: 96rpx;
			line-height: 96rpx;
			border-top: 1px solid #eee;

			>text {
				margin-left: 12rpx;
				font-size: 28rpx;
			}
		}
	}
</style>
