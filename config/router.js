import Router from 'uni-router-interceptor'
import {
	getUserInfo
} from '@/config/api.js'
import store from '@/store/index.js'
import Utils from '@/common/Utils.js'
import to from 'await-to-js'
import {
	_IsEmpty
} from '@gykeji/jsutil';

const router = new Router({
	homePage: '/pages/home/home' // 首页的page路由
})

const writeList = ['/pages/test/test', '/pages/login/login'];

// 路由前置拦截器
router.beforeEach((to, from, next) => {
	if (writeList.indexOf(to.url) < 0) {
		getUserInfo().then(userInfo => {
			store.commit('setUserInfo', userInfo)
			store.commit('setIsLogin', true)
			next()
		}).catch(() => setTimeout((err) => Utils.clickWxLogin(), 1000))
	} else {
		next()
	}
})

// 路由后置拦截器
router.afterEach((to, from) => {
	// TODO something
})

// 捕获路由错误信息
router.error(() => {
	// TODO something
})

export default router
