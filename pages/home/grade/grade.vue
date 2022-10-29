<template>
	<view class="page p24 u-page__item">
		<u-toast ref="uToast"></u-toast>

		<view class="school-logo"></view>
		<view class="semester-grade">Semester Grade</view>
		<view class="title-head">
			<view>{{ userStudentProfile.realname }}</view>
			<view>{{ userStudentProfile.schoolName }}</view>
			<view>{{ userStudentProfile.professional }}</view>
		</view>

		<u-collapse accordion :value="defaultOpen">
			<u-collapse-item v-for="(semesterGrade, index) in semesterGradeItems" :key="index" :name="semesterGrade.semester">
				<text slot="title" class="u-page__item__title__slot-title">Semester {{semesterGrade.semester}}</text>
				<u-icon slot="right-icon" name="arrow-down-fill" ></u-icon>
				<view class="semester u-collapse-content">
					<uni-table class="course-table" emptyText="暂无更多数据" :border="false" :stripe="false">
						<!-- 表头行 -->
						<uni-tr>
							<uni-th width="190rpx" align="center">COURSE CODE</uni-th>
							<uni-th align="center">COURSE NAME</uni-th>
							<uni-th width="120rpx" align="center">GRADE</uni-th>
						</uni-tr>
						<!-- 表格数据行 -->
						<uni-tr v-for="(sgc, index) in semesterGrade.gradeCours">
							<uni-td>{{ sgc.courseCode }}</uni-td>
							<uni-td>{{ sgc.courseName }}</uni-td>
							<uni-td align="center">{{ sgc.grade }}</uni-td>
						</uni-tr>
					</uni-table>

					<view class="grade-review">
						<uni-table class="table" emptyText="暂无更多数据" :border="false" :stripe="false">
							<!-- 表格数据行 -->
							<!-- 表头行 -->
							<uni-tr>
								<uni-th width="100rpx">GPA</uni-th>
								<uni-th width="50rpx">{{ semesterGrade.grade.gpa }}</uni-th>
								<uni-th width="100rpx">CGPA</uni-th>
								<uni-th width="50rpx">{{ semesterGrade.grade.cgpa }}</uni-th>
								<uni-th width="100rpx">CGPA-AT</uni-th>
								<uni-th width="50rpx">{{ semesterGrade.grade.cgpaAt }}</uni-th>
							</uni-tr>
							<uni-tr>
								<uni-td>Course Registration</uni-td>
								<uni-td>{{ semesterGrade.grade.courseRegistration }}</uni-td>
								<uni-td>PASS</uni-td>
								<uni-td>{{ semesterGrade.grade.pass }}</uni-td>
								<uni-td>Cumulative Units</uni-td>
								<uni-td>{{ semesterGrade.grade.cumulativeUnits }}</uni-td>
							</uni-tr>
							<uni-tr>
								<uni-td width="150rpx">Units Exempted</uni-td>
								<uni-td>{{ semesterGrade.grade.unitsExempted }}</uni-td>
								<uni-td width="150rpx">Accumulated Registered</uni-td>
								<uni-td>{{ semesterGrade.grade.accumulatedRegisteredUnit }}</uni-td>
								<uni-td></uni-td>
								<uni-td></uni-td>
							</uni-tr>
						</uni-table>
					</view>
					<u-divider></u-divider>
				</view>
			</u-collapse-item>
		</u-collapse>
	</view>
</template>

<script>
	import {
		_IsEmpty
	} from '@gykeji/jsutil'
	import to from 'await-to-js'
	import Utils from '@/common/Utils.js'
	import {
		getSemesterList,
		getSemesterGrade
	} from '@/config/api.js'
	import ToastMixin from '@/common/mixin/toast.js'
	import AuthMixin from '@/common/mixin/auth.js'
	export default {
		mixins: [ToastMixin, AuthMixin],
		data() {
			return {
				defaultOpen: "",
				showSemester: false,
				semester: "",
				semesterGradeItems: [],
				userStudentProfile: {}
			}
		},
		onLoad() {
			this.getUserInfo()
			this.getSemesterGradeHandler()
		},
		methods: {
			sexSemester(e) {
				this.semester = e.name
			},
			/**
			 * 查询成绩单
			 */
			async getSemesterGradeHandler() {
				this.showLoadingToast()
				Utils.afterAjax(await to(getSemesterGrade(this.semester)), semesterGrade => {
					if (!_IsEmpty(semesterGrade)) {
						this.semesterGradeItems = semesterGrade.semesterGradeItems
						this.userStudentProfile = semesterGrade.userStudentProfile
						if (!_IsEmpty(this.semesterGradeItems)) {
							this.defaultOpen = this.semesterGradeItems[0].semester
						}
					} else {
						this.showErrorIconToast("请稍等,成绩单正在同步中!")
					}
				}, err => {

				})
				uni.hideLoading()
			}
		}
	}
</script>

<style scoped lang="scss">
	.school-logo {
		height: 120rpx;
		background: url('/static/images/logo.png') no-repeat;
		background-size: 380rpx auto;
	}

	.semester-grade {
		text-align: center;
		font-size: 32rpx;
		font-weight: bold;
		margin-bottom: 24rpx;
	}

	.title-head {
		font-size: 24rpx;
		line-height: 28rpx;

		>view {
			margin-bottom: 12rpx;
		}
	}

	.semester {
		.semester-name {
			font-size: 28rpx;
			text-align: center;
			margin: 30rpx 0;
		}
	}

	.u-slot-value {
		view {
			color: #909193;
			font-size: 24rpx;
		}
	}

	.course-table {
		.uni-table-tr:first-of-type {
			background-color: #d5d5d5;
			color: #FFF;
		}
	}

	.grade-review {
		.table {
			margin-top: 24rpx;
		}

		.uni-table-th,
		.uni-table-td {
			padding-top: 0;
			border-bottom: none;
		}


	}

	.uni-table-th,
	.uni-table-td {
		font-size: 24rpx;
		line-height: 24rpx;
		padding: 18rpx 0;
		color: #606266;
	}

	.uni-table-th {
		padding-top: 12rpx;
		font-weight: normal;
	}

	.fotter {
		font-size: 24rpx;
		color: #606266;
		padding-bottom: 24rpx;
	}

	.u-page__item {
		/deep/ .u-cell {
			background: #999999;

			.u-cell__body {
				padding: 12rpx 16rpx;
				font-size: 28rpx;
			}
		}

		/deep/ .u-collapse-item__content__text {
			padding: 12rpx 0;
		}
	}
</style>
