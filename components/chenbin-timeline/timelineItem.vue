<template>
	<view class="timelineItem">
		<view class="timeItem">
			<view class="leftTime">
				{{getDay(leftTime)}}
				<view>{{getTime(leftTime)}}</view>
			</view>
			<view class="line">
				<view class="out" :style="{background: color == '' ? '' : color}">
					<view class="inner" :style="{background: color == '' ? '' : color}"></view>
				</view>
			</view>
			<view class="rightContent">
				<slot></slot>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		props:{
			leftTime:{
				type:String,
				default:''
			},
			color:{
				type:String,
				default:''
			}
		},
		data(){
			return {
				day: '',
				time: ''
			}
		},
		methods: {
			getDay(leftTime) {
				// yyyy-MM-dd HH:mm:ss
				const day = leftTime.match(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])/)
				return day && day[0];
				
			}, 
			getTime(leftTime) {
				const time = this.leftTime.match(/(0?[0-9]|1[0-9]|[2][0-3]):(0?[0-9]|[1-5][0-9])\d+/)
				return time && time[0];
			}
		}
	}
</script>

<style scoped lang="less">
	.timelineItem {
		.timeItem {
			display: flex;
			.leftTime {
				width: 135rpx;
				padding: 0 10rpx;
				font-size:22rpx;
				font-family:PingFangSC-Medium,PingFang SC;
				font-weight:500;
				color:rgba(51,51,51,1);
				margin-right: 10rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.line {
				width: 1px;
				background:rgba(204,204,204,1);
				position: relative;
				.out {
					position: absolute;
					top: 0;
					left: 50%;
					transform: translateX(-50%);
					display: flex;
					justify-content: center;
					align-items: center;
					width: 28rpx;
					height: 28rpx;
					background : rgba(236,104,23,0.6);
					border-radius: 50%;
					.inner {
						width: 18rpx;
						height: 18rpx;
						background : rgba(236,104,23,1);
						border-radius: 50%;
					}
				}
			}
			.rightContent {
				flex: 1;
				padding: 0 10rpx 40rpx;
				margin-left: 20rpx;
				min-height: 50rpx;
			}
		}
	}
</style>
