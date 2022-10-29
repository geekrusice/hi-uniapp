import {
	getUserInfo
} from '@/config/api.js'
import Utils from '@/common/Utils.js'
import {
	mapState,
	mapActions,
	mapMutations
} from "vuex";
import to from 'await-to-js'
import {
	_IsEmpty
} from '@gykeji/jsutil';

export default {
	computed: mapState(['isLogin', 'userInfo']),
	methods: {
		...mapMutations(['setUserInfo', 'setIsLogin']),
		async getUserInfo() {
			Utils.afterAjax(await to(getUserInfo()), userInfo => {
				this.setUserInfo(userInfo)
				this.setIsLogin(true)
			}, err => {
				if (err.statusCode == 403) {
					setTimeout((err) => Utils.clickWxLogin(), 1000)
				}
			})
		}
	},

}
