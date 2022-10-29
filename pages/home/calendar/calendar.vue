<template>
	<view class="page">
		<uni-calendar :date="defaultDay" class="p24" :insert="true" :lunar="false" @change="change"
			@monthSwitch="onMonthSwitchHandler" :selected="selected" />
		<view class="schedule-list p24">
			<scroll-view scroll-y :style="{
					minHeight: $u.addUnit(200),
                    height: $u.addUnit(400),
                    maxHeight: $u.addUnit(1000)
                }">
				<view class="list-title">课程清单</view>
				<timeline>
					<timelineItem v-for="(time, key) in selected" :key="key" :leftTime="time.data.fullDate">
						<view class="tripItem">
							<view class="title">课程：{{time.data.name}}</view>
							<view class="tips" v-if="time.data.custom">内容：
								<u-parse :content="time.data.custom" />
							</view>
						</view>
					</timelineItem>
				</timeline>
			</scroll-view>
		</view>

		<u-modal :show="showEventDetail" title="课程详情" :closeOnClickOverlay="true" @confirm="showEventDetail = false"
			:showCancelButton="true" cancelText="不再提醒" @cancel="onStopRemindEventHandler">
			<view class="slot-content">
				<scroll-view scroll-y :style="{
                    height: $u.addUnit(200)
                }">

					<timeline v-if="showEventDetail">
						<timelineItem :leftTime="eventSelectd.data.fullDate">
							<view class="tripItem">
								<template v-if="eventSelectd.data">
									<view class="title">课程：{{eventSelectd.data.name}}</view>
									<view class="tips" v-if="eventSelectd.data.custom">内容：
										<u-parse :content="eventSelectd.data.custom" />
									</view>
								</template>

							</view>
						</timelineItem>
					</timeline>
				</scroll-view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue'
	import timeline from '@/components/chenbin-timeline/timeLine.vue'
	import timelineItem from '@/components/chenbin-timeline/timelineItem.vue'
	import to from 'await-to-js'
	import moment from "moment";
	import {
		getUserEventsCalendar,
		stopRemindEvent
	} from '@/config/api.js'
	import {
		_IsEmpty,
		_FormatDate
	} from '@gykeji/jsutil';
	export default {
		data() {
			return {
				defaultDay: '',
				defaultEventId: 0,
				showEventDetail: false,
				eventSelectd: {
					date: '2022-10-2',
					info: '签到',
					data: {
						id: 0,
						custom: '自定义信息',
						name: '自定义消息头',
						fullDate: '2022-10-2 18:00:00',
					}
				},
				selected: [{
					date: '1999-10-2',
					info: '签到',
					data: {
						custom: '自定义信息',
						name: '自定义消息头',
						fullDate: '1999-10-2 18:00:00',
					}
				}]
			}
		},
		onLoad(options) {
			const year = options?.year
			const month = options?.month
			this.defaultEventId = options?.eventId

			if (year && month) {
				this.defaultDay = `${year}-${month}-01`
			} else {
				options.year = _FormatDate(new Date(), "yyyy")
				options.month = _FormatDate(new Date(), "MM")
				options.day = _FormatDate(new Date(), "DD")
				this.defaultDay = _FormatDate(new Date(), "yyyy-MM-DD")
			}

			this.onMonthSwitchHandler(options)
		},
		components: {
			uParse,
			timeline,
			timelineItem
		},
		methods: {
			change(e) {
				if (e && e.extraInfo) {
					this.$Router.navigateTo({
						url: `/pages/home/course/course?id=${this.eventSelectd.id}`
					})
					// this.eventSelectd = e.extraInfo
					// this.showEventDetail = true
				}
			},
			async onMonthSwitchHandler(params) {
				this.selected = await getUserEventsCalendar(params.year, params.month)
				if (this.defaultEventId) {
					const selected = this.selected.find(event => {
						return event.data.id == this.defaultEventId
					})

					if (selected) {
						this.eventSelectd = selected
						this.showEventDetail = true
					}
				}
			},
			async onStopRemindEventHandler() {
				const eventId = this.eventSelectd.data.id
				const [err, flag] = await to(stopRemindEvent(eventId))
				if (!_IsEmpty(err)) {
					uni.showToast({
						title: err
					})
				} else {
					uni.showToast({
						title: "成功"
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.schedule-list {
		margin-top: 24rpx;
		border-top: 1px solid #ccc;
		padding-top: 12rpx;

		.list-title {
			color: #ffaa00;
			font-size: 32rpx;
			font-weight: bold;
		}
	}

	.hi-week-calendar {
		font-size: 24rpx;
		display: flex;
		flex-direction: column;

		.week-calendar-day {
			display: flex;
			flex-direction: row;

			.month,
			.week {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				height: 45px;
				border-bottom-color: #F5F5F5;
				border-bottom-style: solid;
				border-bottom-width: 1px;
			}
		}
	}
</style>
