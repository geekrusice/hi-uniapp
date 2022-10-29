import {
	_IsEmpty
} from '@gykeji/jsutil'
export default {
	/**
	 * 对字符串进行url编码操作
	 * @param {String} str 输入字符串
	 */
	urlencode(str) {
		str = (str + '').toString();
		return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
		replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
	},

	/**
	 * 对字符串进行url解码操作
	 * @param {String} str 输入字符串
	 */
	urldecode(str) {
		str = (str + '').toString();
		str = str.replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
		replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+')
		return decodeURIComponent(str)
	},

	/**
	 * 对象转URL参数
	 * @param {Object} data 对象
	 * @param {Boolean} isPrefix 是否添加前面的?
	 * @param {String} arrayFormat 数组的处理格式，可选值['indices', 'brackets', 'repeat', 'comma'] 见源码的case注释
	 */
	queryParams(data = {}, isPrefix = true, arrayFormat = 'brackets') {
		let prefix = isPrefix ? '?' : ''
		let _result = []
		if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1) arrayFormat = 'brackets';
		for (let key in data) {
			let value = data[key]
			// 去掉为空的参数
			if (['', undefined, null].indexOf(value) >= 0) {
				continue;
			}
			// 如果值为数组，另行处理
			if (value.constructor === Array) {
				// e.g. {ids: [1, 2, 3]}
				switch (arrayFormat) {
					case 'indices':
						// 结果: ids[0]=1&ids[1]=2&ids[2]=3
						for (let i = 0; i < value.length; i++) {
							_result.push(key + '[' + i + ']=' + value[i])
						}
						break;
					case 'brackets':
						// 结果: ids[]=1&ids[]=2&ids[]=3
						value.forEach(_value => {
							_result.push(key + '[]=' + _value)
						})
						break;
					case 'repeat':
						// 结果: ids=1&ids=2&ids=3
						value.forEach(_value => {
							_result.push(key + '=' + _value)
						})
						break;
					case 'comma':
						// 结果: ids=1,2,3
						let commaStr = "";
						value.forEach(_value => {
							commaStr += (commaStr ? "," : "") + _value;
						})
						_result.push(key + '=' + commaStr)
						break;
					default:
						value.forEach(_value => {
							_result.push(key + '[]=' + _value)
						})
				}
			} else {
				_result.push(key + '=' + value)
			}
		}
		return _result.length ? prefix + _result.join('&') : ''
	},

	/**
	 * 获取当前页面的路径
	 */
	getCurPage() {
		let pages = getCurrentPages();
		let curPage = pages[pages.length - 1];
		return curPage
	},

	/**
	 * 获取当面页面的访问URL参数
	 */
	getCurOptions() {
		/*获取当前路由*/
		let curPage = this.getCurPage();
		//在微信小程序或是app中，通过curPage.options；如果是H5，则需要curPage.$route.query（H5中的curPage.options为undefined，所以刚好就不需要条件编译了）
		let curParam = curPage.options || curPage.$route.query;
		return curParam
	},
	
	getCurPageAndOptions() {
		return this.urlencode(this.getCurPage().route + this.queryParams(this.getCurOptions()))
	},

	/**
	 * 请求接口后的统一处理方法
	 */
	afterAjax([err, resp], callback, failCallback) {
		console.log('afterAjax', err, resp)
		if (_IsEmpty(err)) {
			callback(resp)
		} else {
			uni.hideLoading();
			uni.$u.toast(err.message || err.msg)
			const bizCode = err.code
			if (bizCode === 161001) {
				setTimeout(() => {
					const formPage = this.urlencode(this.getCurPage().route + this.queryParams(this.getCurOptions()))
					this.$Router.redirectTo({
						url: `/pages/home/bindAccount/bindAccount?from=${formPage}`
					})
				}, 500)
			}
			if (!_IsEmpty(failCallback)) {
				failCallback(err)
			}
		}
	},
	/**
	 * 微信公众号网页登录处理方法，目的是带上登录前的
	 */
	clickWxLogin() {
		const page = this.getCurPage()
		let fromPage = '/pages/home/home'
		if (page.route !== 'pages/login/login' || page.route !== '/pages/login/login') {
			const options = this.getCurOptions()
			fromPage = encodeURIComponent(page.route + this.queryParams(options))
		}
		// #ifdef H5
		const appHost = this.urlencode(process.env.APP_HOSTNAME + '/pages/login/login?fromPage=/' + fromPage)
		const apiHost = process.env.API_HOSTNAME
		window.location.href = `${apiHost}/hi/auth/redirect/wechat-mp?redirectUrl=${appHost}`
		// #endif 
	},
}
