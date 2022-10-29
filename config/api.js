const http = uni.$u.http

// 微信H5授权登录
export const wxAuthorization = (code, state) => http.get(`/hi/auth/wechat-mp?code=${code}&state=${state}`)

// 绑定学籍账号
export const bindStudentAccount = (bindStudentAccount) => http.post('/hi/user-account/bind-account', bindStudentAccount)

// 获取用户详情信息
export const getUserInfo = () => http.get('/user/userinfo')

// 查询用户绑定的账号密码
export const getBindAccount = () => http.post('/hi/user-account/account')

// 查询大学列表
export const getUnistiryList = () => http.get('/aborad/college/list?status=1')

// 查询日程列表
export const getUserEventsCalendar = (year, month) => http.get(`/aborad/timetable/app/list?year=${year}&month=${month}`)

// 不再提醒日程
export const stopRemindEvent = (eventId) => http.get(`/calendar/stop-remind?eventId=${eventId}`)

// 提交反馈
export const submitHelpFeedback = (feedback) => http.post(`/aborad/feedback`, feedback)

// 获取学期列表
export const getSemesterList = () => http.get('/grade/semester')

// 根据学期查询成绩单
export const getSemesterGrade = (semester) => http.get(`/aborad/grade/mine`)

// 查询周课程
export const weekTimetable = (day) => http.get(`/aborad/timetable/week?weekDate=${day}`)

// 查询课程详情
export const getTimetableInfo = id => http.get(`/aborad/timetable/${id}`)