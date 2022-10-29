import Vue from "vue"
import Vuex from 'vuex'
import {userInfo} from '@/config/api.js'
import Consts from '@/common/Const.js'
import { _IsEmpty } from "@gykeji/jsutil"
import to from 'await-to-js'

Vue.use(Vuex)
 const store = new Vuex.Store({
	state: {
		userInfo: {},
		token: 'eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjQ1MzA0YTdmLTc3ODQtNDUyYS05YmM1LTY0MGNmMmMyYzBkMSJ9.pPEgcsTXJmSMe-IykNPYi7UUjHlSpwHX2QwIYPKAd8y7PTBC-Ufz4HJa2v5Vm5AVXsJtKOXGNqL1GWg4v1FOeQ', //uni.getStorageSync(Consts.USER_TOKEN_KEY),
		isLogin: false
	},
	mutations: {
		setToken(state,token){
			uni.setStorageSync(Consts.USER_TOKEN_KEY, token)
			state.token = token
		},
		setUserInfo(state, userInfo) {
			state.userInfo = userInfo
		},
		setIsLogin(state, flag) {
			state.isLogin = flag
		}
	},
	actions: {
		afterUserLogin({commit}, token) {
			commit("setToken",token)
			commit("setIsLogin", true)
		}
	}
})

export default store
