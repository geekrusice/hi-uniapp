<template>
	<view class="page p32">
		<u-toast ref="uToast"></u-toast>
		<u--form :model="feedback" labelWidth="auto" :rules="rules" ref="form1">
			<u-form-item labelPosition="top" label="描述您的问题或者建议" prop="content" borderBottom>
				<u--input v-show="false" v-model="feedback.content"></u--input>
				<u-textarea v-model="feedback.content" count ref="textarea"></u-textarea>
			</u-form-item>
			<u-form-item labelPosition="top" label="相关截图说明" prop="screenshot" borderBottom>
				<u-upload :fileList="fileListScreenshot" @afterRead="afterRead" @delete="deletePic" name="Screenshot"
					multiple :maxCount="12" :previewFullImage="true"></u-upload>
			</u-form-item>
			<u-form-item labelPosition="top" label="留下您的联系方式,方便我们迅速解决问题" prop="contact" borderBottom>
				<u--input v-model="feedback.contact"></u--input>
			</u-form-item>
			<u-button type="primary" text="点击提交" :loading="loading" @click="submitHelpFeedbackHandler"></u-button>
		</u--form>
	</view>
</template>

<script>
	import {
		_IsEmpty
	} from '@gykeji/jsutil'
	import uploadMixin from '@/common/mixin/upload.js'
	import toastMixin from '@/common/mixin/toast.js'
	import {
		submitHelpFeedback
	} from '@/config/api.js'
	import to from 'await-to-js'
	export default {
		mixins: [uploadMixin, toastMixin],
		data() {
			return {
				loading: false,
				feedback: {
					content: "",
					uploadFileRespList: [],
					contact: ""
				},
				fileListScreenshot: [],
				rules: {
					content: [{
						required: true,
						message: '请描述您的问题或者建议'
					}]
				}
			};
		},
		onReady() {
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			this.$refs.form1.setRules(this.rules)
		},
		methods: {
			submitHelpFeedbackHandler() {
				this.showLoadingToast()
				this.loading = true
				this.$refs.form1.validate().then(async res => {
					if (!_IsEmpty(this.fileListScreenshot)) {
						this.feedback.uploadFileRespList = this.fileListScreenshot.map(item => item.originData)
					}
					const [err, resp] = await to(submitHelpFeedback(this.feedback))
					if (_IsEmpty(err)) {
						this.showSuccessIconToast("反馈成功，我们将以最快的方式处理")
						this.fileListScreenshot = []
						this.$refs.form1.resetFields()
					} else {
						this.showErrorIconToast(err)
					}
					this.loading = false
					uni.hideLoading()
				}).catch(errors => {
					this.loading = false
					uni.hideLoading()
				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	.staff-service {
		display: flex;
		flex-direction: row;
		width: 95%;
		margin-top: 56rpx;
		border: 5px solid #000;
		border-radius: 10rpx;

		.right-remark {
			text {
				display: block;
				margin-bottom: 16rpx;
				font-size: 28rpx;

				&:first-of-type {
					font-size: 36rpx;
					font-weight: bold;
				}

				&:nth-of-type(2) {
					font-size: 24rpx;
					color: blue;
				}
			}
		}
	}

	.staff-explain {
		text-align: center;
		font-size: 28rpx;
		color: rgb(118, 118, 118);
		padding: 12rpx 0;
	}
</style>
