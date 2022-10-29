<template>
	<view class="page">
		<view class="logo"></view>
		<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
		<u--form class="p24" labelPosition="left" labelWidth="100" :model="loginForm" :rules="rules" ref="form1">
			<u-form-item leftIcon="photo-fill" :leftIconStyle="leftIconStyle" label="选择学校" prop="schoolName" borderBottom @click="showSex = true;"
				ref="item1">
				<u--input v-model="loginForm.schoolName" disabled disabledColor="#ffffff" placeholder="请选择学校"
					border="none"></u--input>
				<u-icon slot="right" name="arrow-right"></u-icon>
			</u-form-item>
			<u-form-item leftIcon="photo-fill" :leftIconStyle="leftIconStyle" label="账号" prop="account" borderBotto>
				<u--input v-model="loginForm.account" border="none"></u--input>
			</u-form-item>
			<u-form-item leftIcon="photo-fill" :leftIconStyle="leftIconStyle" label="密码" prop="password" borderBottom>
				<u--input v-model="loginForm.password" border="none" type="password"></u--input>
			</u-form-item>
		</u--form>
		<u-action-sheet :show="showSex" :actions="actions" title="请选择学校" @close="showSex = false"
		@select="handleSelectSchool">
		</u-action-sheet>
		
		<view class="form-submit">
			<u-button shape="circle" type="warning" text="提交绑定" @click="clickBindAccount"></u-button>
			<!-- <u-button shape="circle" style="margin-top: 24rpx;" type="warning" text="暂不绑定" @click="clickBindAccount"></u-button> -->
		</view>
		
	</view>
</template>

<script>
	import {
		_IsEmpty
	} from '@gykeji/jsutil'
	import Utils from '@/common/Utils.js'
	import {
		bindStudentAccount,
		getBindAccount,
		getUnistiryList
	} from '@/config/api.js'
	import to from 'await-to-js'
	export default {
		data() {
			return {
				showSex: false,
				refPage: '',
				loginForm: {
					account: '',
					password: '',
					schoolName: '',
					collegeId: 0
				},
				leftIconStyle: {
					fontSize: '48rpx'
				},
				rules: {
					'schoolName': {
						type: 'string',
						required: true,
						message: '请选择学校',
						trigger: ['blur', 'change']
					},
					'account': {
						type: 'string',
						required: true,
						message: '请填写账号',
						trigger: ['blur', 'change']
					},
					'password': {
						type: 'string',
						required: true,
						message: '请填写密码',
						trigger: ['blur', 'change']
					},
				},
				actions: [],
			};
		},
		async onLoad(options) {
			if (options.from) {
				this.refPage = options.from
			} else {
				this.refPage = '/pages/home/home'
			}
			Utils.afterAjax(await to(getUnistiryList()), async list => {
				this.actions = []
				list.forEach(university => {
					this.actions.push({
						id: university.id,
						name: university.name
					})
				})
				Utils.afterAjax(await to(getBindAccount()), account => {
					if (!_IsEmpty(account)) {
						this.loginForm.account = account.account
						this.loginForm.password = account.password
						this.loginForm.collegeId = account.collegeId
						const college = this.actions.filter(action => action.id === account.collegeId)
						if (!_IsEmpty(college)) {
							this.loginForm.schoolName = college[0].name
						}
					}
				})
			})
			
		},
		methods: {
			clickBindAccount() {
				this.$refs.form1.validate().then(async res => {
					uni.showLoading({
						title: '验证账号密码中'
					})
					Utils.afterAjax(await to(bindStudentAccount(this.loginForm)), bindFlag => {
						if (bindFlag) {
							uni.showToast({
								title: '添加成功!'
							})
							setTimeout(() => {
								const formPage = Utils.urldecode(this.refPage)
								this.$Router.redirectTo({
									url: `/${formPage}`
								})
							}, 500)
						} else {
							uni.showToast({
								title: '账号密码不正确，请检查后重试'
							})
						}
					})
					uni.hideLoading()
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
			handleSelectSchool(e) {
				if (!_IsEmpty(e)) {
					this.loginForm.collegeId = e.id
					this.loginForm.schoolName = e.name
				}
			}
		},
		onReady() {
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			this.$refs.form1.setRules(this.rules)
		},
	};
</script>

<style lang="scss" scoped>
	.page {
		margin-top: 12rpx;
	}
	.logo {
		width: 300rpx;
		height: 300rpx;
		margin: 0 auto;
		border-radius: 50%;
		background: url('/static/logo.jpg') center center no-repeat;
		background-sise:auto 50%;
	}
	
	.form-submit {
		width: 92%;
		margin: 24rpx auto;
	}
</style>
