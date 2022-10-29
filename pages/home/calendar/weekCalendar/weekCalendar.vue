<template>
	<view>
		<ly-curriculumtable :weekTableState="true" :weekTableNumber="weekNumbers" :controlWeek="controlWeek"
			:timetableType="timetableType" :timetables="timetables" :startdDate="startdDate" :weekButton="weekButton"
			@nextWeekClick="nextWeekClick" @lastWeekClick="lastWeekClick" @courseClick="courseClick">
		</ly-curriculumtable>
	</view>
</template>

<script>
	import {
		weekTimetable
	} from '@/config/api.js'
	import Utils from '@/common/Utils.js'
	import to from 'await-to-js'
	import lyCurriculumtable from '@/components/ly-curriculumtable/ly-curriculumtable.vue'
	import {_FormatDate} from '@gykeji/jsutil'
	export default {
		data() {
			return {
				weekNumbers: 20, //一共显示几周
				controlWeek: 1, //显示的第几周
				weekButton: true, //开启上一周下一周按钮
				startdDate: '', //开始时间  默认为当前时间
				timetables: [
					// ['大学英语', '大学英语', '大学英语', '', '', '', '毛概', '毛概',],
					// ['', '', '信号与系统', '信号与系统', '模拟电子技术基础', '模拟电子技术基础', '模拟电子技术基础', '模拟电子技术基', '', '', '', '信号与系'],
					// ['大学体育', '大学体育', '形势与政策', '形势与政策', '', '', '', '', ''],
					// ['', '', '', '', '电装实习', '电装实习', '', '', ''],
					// ['', '', '数据结构与算法分析数据结构与算法分析', '数据结构与算法分析数据结构与算法分析', '', '', '', '', '信号与系'],
				],
				timetablesRawData: {},
				timetableType: [{
						index: '1',
						name: '08:00'
					},
					{
						index: '2',
						name: '09:00'
					},
					{
						index: '3',
						name: '10:00'
					},
					{
						index: '4',
						name: '11:00'
					},
					{
						index: '5',
						name: '12:00'
					},
					{
						index: '6',
						name: '13:00'
					},
					{
						index: '7',
						name: '14:00'
					},
					{
						index: '8',
						name: '15:00'
					},
					{
						index: '9',
						name: '16:00'
					},
					{
						index: '10',
						name: '17:00'
					},
					{
						index: '11',
						name: '18:00'
					},
					{
						index: '12',
						name: '19:00'
					},
					{
						index: '12',
						name: '20:00'
					},
					{
						index: '13',
						name: '21:00'
					},
					{
						index: '14',
						name: '22:00'
					},
					{
						index: '15',
						name: '23:00'
					},
					{
						index: '16',
						name: '00:00'
					},
					{
						index: '17',
						name: '01:00'
					},
					{
						index: '18',
						name: '02:00'
					},
					{
						index: '19',
						name: '03:00'
					},
					{
						index: '20',
						name: '04:00'
					},
					{
						index: '21',
						name: '05:00'
					},
					{
						index: '22',
						name: '06:00'
					},
					{
						index: '23',
						name: '07:00'
					},
				]
			}
		},
		methods: {
			courseClick(re) {
				console.log(re)
				const event = this.timetablesRawData[re.weekIndex]?.timetableWeek[re.index]
				console.log("取出事件", event)
				this.$Router.redirectTo({
					url: `/pages/home/course/course?id=${event.id}`
				})
			},
			nextWeekClick(e, lastDay) {
				console.log("下一周", e)
				this.getWeekTimetaleData(lastDay)
			},
			lastWeekClick(e, lastDay) {
				console.log("上一周", e, lastDay)
				this.getWeekTimetaleData(lastDay)
			},
			async getWeekTimetaleData(day) {
				uni.showLoading({
					title: "数据正在加载中"
				})
				Utils.afterAjax(await to(weekTimetable(day)), week => {
					this.timetables = []
					this.timetablesRawData = week
					week.forEach(dayTime => {
						const todayTime = []
						dayTime.timetableWeek.forEach(today => {
							if (today.id === null) {
								todayTime.push('')
							} else {
								todayTime.push(today.eventName)
							}
						})
						this.timetables.push(todayTime)
					})
					uni.hideLoading();
				})
			}
		},
		components: {
			lyCurriculumtable
		},
		onLoad() {
			const today = _FormatDate(new Date())
			this.getWeekTimetaleData(today)
			
			// this.getWeekTimetaleData('2022-06-11')
		}
	}
</script>

<style>

</style>
