<template>
	<view class="timetable">
		<view class="cu-bar bg-white text-primary" v-if="weekButton">
			<view></view>
			<view class="week-selector">
				<view class="action" @click="$u.throttle(lastWeek, 500)">
					<!-- <text class="cuIcon-back" style="margin-right: unset;"></text> -->
					<!-- <text class="text-bold text-lg">上一周</text> -->
					<u-icon name="arrow-left"></u-icon>
				</view>
				<view class="content text-bold weekname">
					<view>第{{nowWeek+1}}周</view>
					<view style="font-size: 24rpx;text-align: center;">{{dateLi[0]}}-{{dateLi[dateLi.length - 1]}}
					</view>
					<!-- <uni-icons type="bottom" size="15"></uni-icons> -->
				</view>
				<view class="action" @click="$u.throttle(nextWeek, 500)">
					<!-- <text class="text-bold text-lg">下一周</text>
					<text class="cuIcon-right"></text> -->
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>
			<view class="month-view" @click="goToMonthTimetable()">
				<u-icon name="order" size="42rpx" color="#f6b908"></u-icon>月课表
			</view>
		</view>
		<view class="header-wrap">
			<view class="left-text">
				<text class="month-text">{{tMonth}}月</text>
				<view :class="weeky==(i)?'text-content-today':'text-content'" v-for="i in 7" :key="i">
					<text class="week-txt"
						:style="{ 'color': dMonth === dateDetailsLi[i-1] ? '#FFF' : 'unset', 'background-color': dMonth === dateDetailsLi[i-1] ? '#d9001b' : 'unset' }">周{{ week[i-1]}}</text>
					<text class="date-txt"
						:style="{ 'color': dMonth === dateDetailsLi[i-1] ? '#FFF' : 'unset','background-color': dMonth === dateDetailsLi[i-1] ? '#d9001b' : 'unset' }">{{getDayText(i)}}</text>
				</view>
			</view>
			<u-line></u-line>
		</view>
		<!-- <view class="header">
     <view class="header-item" v-for="(item,index) in week" :key="item" :style="{ color: todayWeekIndex === index ? '#4070FF' : 'unset' }">{{ item }}</view> 
    </view> -->
		<!-- 课件时段 -->
		<view class="main">
			<view class="row" v-for="(item,index) in timetableType" :key="index">
				<u-line dashed color="#E4E7ED"></u-line>
				<view class="time-item">
					<!-- <view class="index">{{ item.index }}</view> -->
					<view class="time">{{ item.name }}</view>
				</view>
				<!-- <u-line dashed color="#E4E7ED"></u-line> -->
			</view>
			<!-- 课程内容框 -->
			<view class="course-container">
				<view class="week" v-for="(week, weekIndex) in courseData" :key="weekIndex">
					<view class="courseList" v-for="(course, courseIndex) in week" :key="courseIndex">
						<view v-if="course.length==1">
							<view @click="handleCourseClick(course, weekIndex, courseIndex)" class="course"
								:style="{ height: (course.length * 73 ) + 'rpx', background: course.backgroundColor,	'border-color': ''+course.borderColor+'',color: course.borderColor}"
								v-if="course.length > 0">{{ course.name }}</view>
						</view>
						<view v-else="course.length!=1">
							<view @click="handleCourseClick(course, weekIndex, courseIndex)" class="course"
								:style="{ height: (course.length * 73+ course.length) + 'rpx', background: course.backgroundColor,	'border-color': ''+course.borderColor+'',color: course.borderColor}"
								v-if="course.length > 0">{{ course.name }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部弹出层 显示周数 -->
		<!-- <view>
			<uni-popup ref="popup" type="bottom">
				<view class="bottom">
					<h4>点击查看该周课表</h4>
					<view style="margin-left: 80upx; ">
						<ly-data-checkbox mode="tag" @change="selectWeek" v-model="weekCurrent"
							:localdata="weekNumberList"></ly-data-checkbox>
					</view>
				</view>

			</uni-popup>
		</view> -->
	</view>
</template>

<script>
	export default {
		name: 'Timetable',
		props: {
			controlWeek: { //控制显示第几周
				type: [Number, String],
				default: 1
			},
			weekTableNumber: { //控制底部弹出层显示多少周数值
				type: [Number, String],
				default: 1
			},
			weekTableState: { //点击第几周是 是否开启底部周表
				type: Boolean,
				default: () => {
					return false
				}
			},
			timetableType: {
				type: Array,
				default: () => {
					return [

					]
				}
			},
			week: {
				type: Array,
				default: () => {
					return ['一', '二', '三', '四', '五', '六', '日']
				}
			},
			timetables: {
				type: Array,
				default: () => {
					return [{
							index: '1',
							name: '08:00\n08:40'
						},
						{
							index: '2',
							name: '08:50\n09:30'
						},
						{
							index: '3',
							name: '09:40\n10:20'
						},
						{
							index: '4',
							name: '10:30\n11:10'
						},
						{
							index: '5',
							name: '11:20\n12:00'
						},
						{
							index: '6',
							name: '14:00\n14:40'
						},
						{
							index: '7',
							name: '15:50\n16:30'
						},
						{
							index: '8',
							name: '16:40\n17:20'
						},
						{
							index: '9',
							name: '17:30\n18:10'
						},
						{
							index: '10',
							name: '19:00\n19:40'
						},
						{
							index: '11',
							name: '20:50\n21:30'
						},
						{
							index: '12',
							name: '21:40\n22:20'
						}
					]
				}
			},
			palette: {
				type: Array,
				default: () => {
					return []
				}
			},
			startdDate: {
				type: String,
				default: () => {
					return ""
				}
			},
			weekButton: {
				type: Boolean,
				default: () => {
					return false
				}
			},
		},
		data() {
			return {
				//borderPalette: [...this.palette, '#fe9d9f', '#91dcfc', '#f4f1d4', '#b0efd3', '#def7f8', '#93f5e0', '#e3e8fb', '#edf3b0', '#bcfbfc', '#efe2f9', '#ffe4a0', '#c9edf1', '#b495e1', '#ffe4a0', '#edffec'],
				allPalette: [...this.palette, '#f05261', '#48a8e4', '#ffd061', '#52db9a', '#70d3e6', '#52db9a', '#3f51b5',
					'#f3d147', '#4adbc3', '#673ab7', '#ff9800', '#76bfcd', '#673ab7', '#ff9800', '#8bc34a'
				],
				nowWeek: 0, // 当前周数下标 
				weekCurrent: 1, //当前周数
				weeky: 1,
				weekvalue: "", //星期几
				//weekNumber:0,//一共的周数 
				weekNumberList: [], //周数集合
				//week: ['周一','周二','周三','周四','周五','周六','周日'],
				dateLi: [12, 13, 14, 15, 16, 17, 18, 2],
				dateDetailsLi: [], //具体时间组
				date: 29, //当前日
				datetAndMonth: "",
				barHeight: 30,
				dMonth: 0, //当前月份 格式：08/09
				tMonth: 0, //左上角月份
				tYear: 0,
				tMonthweeky: 0, //周期里面的月份
				frontDate: 0, //当前时间前 共有几天是这一周的下标数
				afterDate: 0, //当前时间后 共有几天是这一周的下标数

			}
		},
		created() {
			//获取当前日期
			this.dMonth = this.getWeek(0, "", 1)
			//this.weekNumber=10;
			for (let i = 0; i < this.weekTableNumber; i++) {
				this.weekNumberList.push({
					text: i + 1,
					value: i + 1
				})
			}
			//开始周日期 如：2022-08-28 通过这个时间计算离当前时间是第几周
			//计算多少天
			this.nowWeek = this.controlWeek - 1
			var index = this.nowWeek * 7
			//得到多少天之后日期
			let data2 = this.getfun_date(index)
			//console.log("这是上第",this.nowWeek+1,"周",index,"天以后",)
			//得到 data2 这一周的日期
			this.GetTime(data2)

		},
		computed: {
			courseData() {
				// 为数据标记背景颜色的函数
				let paletteIndex = 0
				const getBackgroundColor = () => {
					const backgroundColor = this.allPalette[paletteIndex]
					paletteIndex++
					if (paletteIndex >= this.allPalette.length) {
						paletteIndex = 0
					}
					return backgroundColor
				}
				// 合并
				const listMerge = []
				this.timetables.forEach(function(list, i) {
					if (!listMerge[i]) {
						listMerge[i] = []
					}
					list.forEach(function(item, index) {
						if (!index) {
							return listMerge[i].push({
								name: item,
								length: 1,
								backgroundColor: item === '' ? 'none' : getBackgroundColor()
							})
						}
						if (item === (listMerge[i][index - 1] || {}).name && item) {
							const sameIndex = (listMerge[i][index - 1] || {}).sameIndex
							if (sameIndex || sameIndex === 0) {
								listMerge[i][sameIndex].length++
								return listMerge[i].push({
									name: item,
									length: 0,
									sameIndex: sameIndex
								})
							}
							listMerge[i][index - 1].length++
							return listMerge[i].push({
								name: item,
								length: 0,
								sameIndex: index - 1
							})
						} else {
							return listMerge[i].push({
								name: item,
								length: 1,
								backgroundColor: item === '' ? 'none' : getBackgroundColor()
							})
						}
					})
				})
				return listMerge

			},
			todayWeekIndex() {
				let weekIndex = new Date().getDay() - 1
				if (weekIndex === -1) {
					weekIndex = 6
				}
				console.log(weekIndex)
				return weekIndex
			}
		},
		methods: {

			getDayText(i) {
				let day = this.dateLi[i - 1];
				day = day.toString().replace('月', '')
				return `${this.tMonth}/${day}`
			},

			goToMonthTimetable() {
				this.$Router.navigateTo({
					url: `/pages/home/calendar/calendar?year=${this.tYear}&month=${this.tMonth}`
				})
			},

			handleCourseClick(course, weekIndex, courseIndex) {
				const data = {
					index: courseIndex + 1,
					length: course.length,
					week: this.week[weekIndex],
					weekIndex: weekIndex,
					name: course.name
				}
				//console.log(`星期${data.week}; 第${data.index}节课; 课程名:${data.name}; 课节:${data.length}`)
				// console.log(data)
				this.$emit('courseClick', data)
			},
			//上一周
			lastWeek() {
				// if (this.nowWeek == 0) {
				// 	//console.log("已经是第一周了")
				// 	uni.$u.toast('已经是第一周了')
				// 	return
				// }
				this.nowWeek -= 1
				var index = this.nowWeek * 7
				let data2 = this.getfun_date(index)
				//console.log("这是上第",this.nowWeek,"周",index,"以后")
				this.GetTime(data2)
				//子组件事件
				this.$emit('lastWeekClick', this.nowWeek + 1, data2)
			},
			//下一周
			nextWeek() {
				this.nowWeek += 1
				var index = (this.nowWeek - 1) * 7
				let i = this.afterDate + 1 + index

				let data2 = this.getfun_date(i)
				// console.log("这是下第",this.nowWeek,"周",index,i ,"以后","时间是",data2)
				this.GetTime(data2)

				//子组件事件
				this.$emit('nextWeekClick', this.nowWeek + 1, data2)
			},
			//点击第几周事件 （显示弹出层）
			weekOpen() {
				this.$emit('weekOpenClick')
				if (!this.weekTableState) {
					return
				}
				// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
				// this.$refs.popup.open()

			},
			//底部弹出层  选择周数事件
			selectWeek(e) {
				// console.log(JSON.stringify(e.detail.value))
				this.nowWeek = e.detail.value - 1
				var index = this.nowWeek * 7
				let data2 = this.getfun_date(index)
				//console.log("这是上第",this.nowWeek,"周",index,"天以后",)
				this.GetTime(data2)
				this.$refs.popup.close()
				this.$emit('weekSelectClick', e.detail.value)
			},
			//计算一周日期
			GetTime(dateValue) {
				let date;
				if (dateValue != "") {
					date = new Date(dateValue)
					this.weekvalue = 0
				} else {
					date = new Date();
					var day = date.getDay();
					var arr_week = new Array("日", "一", "二", "三", "四", "五", "六");
					this.weekvalue = arr_week[day]
				}
				this.tYear = date.getFullYear()
				let weekIndex = date.getDay();
				let index = 0;
				let data = [] //日
				let dateDetails = [] //详细日期
				//得到当前月份
				this.tMonth = date.getMonth() + 1;
				//得到当前日期以及之前的
				index = weekIndex
				if (weekIndex == 0) {
					index = 7
				}
				for (let i = index - 1; i >= 0; i--) {
					dateDetails.push(this.getWeek(-i, dateValue, 1))
					if (this.getWeek(-i, dateValue) == 1) {
						data.push(date.getMonth() + 1 + "月")
						this.tMonth = date.getMonth();
					} else {
						data.push(this.getWeek(-i, dateValue))
					}
					this.frontDate = i;
					//console.log("得到当前日期以及之前的",this.getWeek(-i,dateValue))
				}
				//当前日期之后的
				if (weekIndex != 0) {
					for (let i = 1; i <= 7 - weekIndex; i++) {
						dateDetails.push(this.getWeek(i, dateValue, 1))
						if (this.getWeek(i, dateValue) == 1) {
							data.push(date.getMonth() + 2 + "月")
							this.tMonth = date.getMonth() + 1;
						} else {
							data.push(this.getWeek(i, dateValue))
						}
						this.afterDate = i;
						//console.log("当前日期之后的",this.getWeek(-i,dateValue))
					}
				}

				//赋值 一周的日期
				this.dateDetailsLi = dateDetails;
				this.dateLi = data;
			},
			//根据传的时间返回单个年 月 日
			getWeek(day, dateValue, state) {
				let today;
				if (dateValue != "") {
					today = new Date(dateValue)
				} else {
					today = new Date();
				}
				//var today = new Date();
				var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
				today.setTime(targetday_milliseconds);
				var tYear = today.getFullYear();
				var tMonth = today.getMonth();
				var tDate = today.getDate();
				tMonth = tMonth + 1;
				tDate = tDate;
				if (state == 1) {
					return tMonth + "/" + tDate;
				} else if (state == 2) {
					return tYear + "/" + tMonth + "/" + tDate;
				} else {
					return tDate;
				}
				//return  tMonth + "/" + tDate;
			},
			//查看 当前时间之前或者之后第几天的时间
			getfun_date(num) {

				let date1;
				if (this.startdDate != "") {
					date1 = new Date(this.startdDate)
				} else {
					date1 = new Date();

				}
				//var date1 = new Date();
				//今天时间
				var time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate()
				var date2 = new Date(date1);
				date2.setDate(date1.getDate() + num);
				//num是正数表示之后的时间，num负数表示之前的时间，0表示今天
				var time2 = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();
				// console.log(time2,'当前日期');
				return time2;
			},
			//日期相加减得到天数
			getDateDays(date1) {
				let a1 = Date.parse(new Date(date1))
				let a2 = Date.parse(new Date())
				let day = parseInt((a2 - a1) / (1000 * 60 * 60 * 24))
				return day;
			}
		},
		watch: {
			//nowWeek 为接收参数的名称
			nowWeek: {
				handler(item, index) {
					// console.log(item,index)
					this.weekCurrent = item + 1
				},
				deep: true // 深度监听父组件传过来对象变化
			}
		},


	}
</script>

<style scoped lang="scss">
	.bottom {
		background-color: white;
		padding: 15px 0px;

		h4 {
			text-align: center;
			padding-bottom: 10px;
		}

		border-radius: 15px 15px 0px 0px;
		//padding: 0px 30upx;
	}



	//上一周，下一周控件
	.cu-bar {
		display: flex;
		min-height: 70rpx;
		justify-content: center;
		position: relative;
		margin: 6rpx 15rpx;

		.week-selector {
			display: flex;
			justify-content: center;

			.action {
				display: flex;
				justify-content: center;
				flex-direction: column;
				align-items: center;
			}
		}

		.weekname {
			padding: 0 36rpx;
			font-size: 32rpx;
		}

		.month-view {
			display: flex;
			font-size: 32rpx;
			height: 100%;
			justify-content: center;
			flex-direction: row;
			align-items: center;
			color: #f6b908;
			font-weight: bold;
			position: absolute;
			right: 0
		}
	}

	//内容
	.timetable {
		background: white;
		border: 1px solid #E4E7ED;
		border-radius: 8rpx;

		//日期
		.header-wrap {
			width: 100%;
			// height: 40px;
			margin-bottom: 6px;

			.left-text {
				width: 100%;
				height: 100%;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				font-size: 16px;
				margin-bottom: 5px;
			}

			.month-text {
				display: flex;
				align-items: center;
				width: 70rpx;
				height: 100%;
				text-align: center;
				font-weight: normal;
				// padding: 6px 0px;
				font-size: 32rpx;
			}

			.week-txt {
				width: 100%;
				// height: 60%;
				height: 48rpx;
				text-align: center;
				font-size: 28rpx;
				// font-weight: bold;
				//background-color: aqua;
				//padding-top: 10px;
				margin-top: 5px;
				padding: 12rpx 0;
				border-bottom: 2px solid #FFF;
				// border-radius: 16rpx 16rpx 0px 0px;
			}

			.date-txt {
				width: 100%;
				height: 40%;
				text-align: center;
				font-size: 28rpx;
				color: $uni-text-color-grey;
				//background-color: aqua;
				padding-bottom: 10rpx;
				// border-radius: 0px 0px 16rpx 16rpx;
			}

			.text-content {
				height: 100%;
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				margin-left: 3rpx;
				//background-color: antiquewhite;
				//margin: 10px;
				// padding: 6px 0px;

			}

			.text-content-today {
				height: 100%;
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				margin-left: 3rpx;
			}
		}

		.main {
			position: relative;
			margin-top: 2px;

			.row {
				height: 80rpx;
				position: relative;

				&:after {
					content: '';
					height: 0;
					width: 100%;
					position: absolute;
					bottom: 0;
					left: 0;
					border-bottom: 1rpx dashed #E4E7ED;
				}

				.time-item {
					display: flex;
					justify-content: center;
					align-items: center;
					height: 100%;
					// padding: 0 12rpx;
					box-sizing: border-box;
					width: 70rpx;
					text-align: center;
					// background: #F5F7FA;

					//background-color: #909399;
					.index {
						padding-bottom: 8rpx;
						padding-top: 16rpx;
						font-size: 18px;
					}

					.time {
						font-size: 12px;
						color: $uni-text-color-grey;
					}
				}
			}

			.course-container {
				position: absolute;
				top: 0;
				left: 75rpx;
				width: calc(100% - 75rpx);
				height: 100%;
				display: flex;

				//background-color: #909399;
				.week {

					/* //控制评分法
        //flex: 1;
        //width: 0;
        //flex-grow: 1;
        //display: flex;
        //flex-direction: column; */
					.courseList {
						width: 90rpx;
						word-break: break-all;
						color: white;
						overflow: hidden;
						font-size: 24rpx;

						.course {
							border-radius: 8rpx;
							text-align: center;
							border-style: solid;
							border-width: 1px;
							//border-color: #909399;
							//border-color: red;
							//margin: 2px 1px;
							// margin-top: 4px;
						}

						margin: 5px 1px;
					}
				}
			}
		}
	}
</style>
