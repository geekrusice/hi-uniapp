<template>
	<view class="page">
		<view class="title p24">{{event.eventName}}</view>
		<u-cell-group class="event-group">
			<u-cell icon="calendar-fill" :title="parseEventTime(event.timestart)"></u-cell>
			<u-cell icon="clock" :title="parseEventTimeQuantum(event.timestart, event.timeduration)"></u-cell>
			<u-cell icon="tags-fill" title="Course event"></u-cell>
			<u-cell icon="list" title="Regular class session"></u-cell>
			<u-cell icon="grid-fill" title="AKW103 INTRODUCTION TO MANAGEMENT"></u-cell>
		</u-cell-group>
		
		<view class="p24" style="margin-top: 42rpx;">
			<u-button type="warning" text="Go to Activity"></u-button>
		</view>
	</view>
</template>

<script>
	import {getTimetableInfo} from '@/config/api.js'
	import {
		_IsEmpty,
		_FormatDate
	} from '@gykeji/jsutil';
	import Utils from '@/common/Utils.js'
	import to from 'await-to-js'
	export default {
		data() {
			return {
				event: {}
			}
		},
		methods: {
			async getTimetableInfo(id) {
				Utils.afterAjax(await to(getTimetableInfo(id)), event => {
					this.event = event
				})
			},
			parseEventTime(timestamp, fmt = "yyyy年MM月DD日") {
				const date = new Date(timestamp * 1000)
				return _FormatDate(date, fmt)
			},
			parseEventTimeQuantum(starttime, timeduration) {
				timeduration = parseInt(timeduration)
				timeduration += starttime
				const startDate = new Date(starttime * 1000)
				const endDate = new Date(timeduration * 1000)
				return _FormatDate(startDate, "HH:mm") + '-' + _FormatDate(endDate, "HH:mm")
			}
		},
		async onLoad(options) {
			const id = options?.id
			if (!_IsEmpty(id) && id > 0) {
				this.getTimetableInfo(id)
			}
		}
	}
</script>

<style lang="scss" scoped>
.title {
	font-size: 32rpx;
	font-weight: bold;
	margin: 24rpx 0;
}
.event-group {
	/deep/ .u-cell__body {
		padding: 20rpx;
	}
	/deep/ .u-cell__title-text {
		font-size: 32rpx !important;
	}
}
</style>
