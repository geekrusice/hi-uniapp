import Utils from '@/common/Utils.js'
import { _IsEmpty } from '@gykeji/jsutil';

// 此vm参数为页面的实例，可以通过它引用vuex中的变量
module.exports = (vm) => {
    // 初始化请求配置
    uni.$u.http.setConfig((config) => {
        /* config 为默认全局配置*/
        config.baseURL = process.env.API_HOSTNAME ? process.env.API_HOSTNAME : 'http://localhost:8080'; /* 根域名 */
		return config
    })
	
	// 请求拦截
	uni.$u.http.interceptors.request.use((config) => { // 可使用async await 做异步操作
	    // 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
	    config.data = config.data || {}
		config.header.Authorization = "Bearer " + vm.$store.state.token
		
	    return config 
	}, config => { // 可使用async await 做异步操作
	    return Promise.reject(config)
	})
	
	// 响应拦截
	uni.$u.http.interceptors.response.use((response) => { /* 对响应成功做点什么 可使用async await 做异步操作*/
		const data = response.data
		const allowCode = [0, 200]

		// 自定义参数
		const custom = response.config?.custom
		if (allowCode.indexOf(data.code) == -1) {
			
			if (data.code === 401) {
				const curPage = Utils.getCurPageAndOptions()
				Utils.clickWxLogin()
			} else {
				// 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
				if (custom.toast !== false) {
					uni.$u.toast(data.message)
				}
				
				// 如果需要catch返回，则进行reject
				return Promise.reject(data)
			}
		}
		return data.data === undefined ? (data.rows === undefined ? {} : data.rows) : data.data
	}, (response) => { 
		const statusCode = response.statusCode
		if (statusCode == 403) {
			const curPage = Utils.getCurPageAndOptions()
			Utils.clickWxLogin()
		} else {
			return Promise.reject(response)
		}
	})
}