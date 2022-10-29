import to from 'await-to-js'
export default {
	methods: {
		// 删除图片
		deletePic(event) {
			this[`fileList${event.name}`].splice(event.index, 1)
		},
		// 新增图片
		async afterRead(event) {
			// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
			let lists = [].concat(event.file)
			let fileListLen = this[`fileList${event.name}`].length
			lists.map((item) => {
				this[`fileList${event.name}`].push({
					...item,
					status: 'uploading',
					message: '上传中'
				})
			})
			console.log(this[`fileList${event.name}`])
			for (let i = 0; i < lists.length; i++) {
				const result = await this.uploadFilePromise(lists[i].url)
				let item = this[`fileList${event.name}`][fileListLen]
				this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
					status: 'success',
					message: '',
					url: result.url,
					originData: {
						url: result.url
					}
				}))
				fileListLen++
			}
		},
		uploadFilePromise(url) {
			return new Promise((resolve, reject) => {
				let a = uni.uploadFile({
					url: process.env.API_HOSTNAME + '/common/upload',
					filePath: url,
					name: 'file',
					header: {
						Authorization: `Bearer ${this.$store.state.token}`
					},
					success: (res) => {
						if (res.statusCode == 200) {
							const resp = JSON.parse(res.data)
							if (resp.code == 200) {
								resolve(resp)
							}
						}
						reject()
					}
				});
			})
		},
	}
}
