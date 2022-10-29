export default {
	methods: {
		showSuccessIconToast(message) {
			this.showToast({
				type: 'success',
				title: '成功',
				message,
				iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
			})
		},
		showErrorIconToast(message) {
			this.showToast({
				type: 'error',
				icon: false,
				title: '出错啦',
				message,
				iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
			})
		},
		showLoadingToast() {
			uni.showLoading({
				title: "数据加载中"
			})
		},
		showToast(params) {
			this.$refs.uToast.show({
				...params
			})
		}

	}
}
