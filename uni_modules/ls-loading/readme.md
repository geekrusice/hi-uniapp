# ls-loading


## 说明

本组件通常用于页面数据需要异步加载时，为避免出现数据加载完毕之前页面上出现空数据的尴尬情况，显示loading层作为页面载入过渡。
使用时在想要使用的页面引入即可，它不会影响你页面中原有的布局。

**插件结构已改为[uni-modules规范](https://uniapp.dcloud.net.cn/uni_modules)格式**


## 用法示例

```html
<template>
	<view>
		<ls-loading text="now loading..." :animation="animation" v-if="pageLoading"></ls-loading>
		<!-- 下面照常写你的页面布局 -->
	</view>
</template>
```

```js
import lsLoading from '@/uni_modules/ls-loading/components/ls-loading/ls-loading.vue';
export default {
	components: {
		lsLoading
	},
	data() {
		return {
			pageLoading: true,
			animation: 'twinkle'
		}
	},
	onLoad() {
		// 这里模拟接口请求,接口请求成功后将pageLoading改为false
		setTimeout(() => {
			this.pageLoading = false;
		}, 3000);
	}
}
```
	
## 组件参数
|  属性名   | 类型  | 默认值  | 说明  |
|  ----  | ----  | ----  | ----  |
| nav  | `Boolean` | `false` | 是否预留出标题栏的高度（可用于自定义标题栏页面） |
| tab  | `Boolean` | `false` | 是否预留出tabBar的高度（可用于自定义tabbar页面） |
| embed  | `Boolean` | `false` | 是否为嵌入模式（该模式采用非绝对定位布局，实际位置根据页面布局而定） |
| text  | `String` | `正在加载` | 加载中的文字 |
| fontSize  | `String`或`Number` | `58` (单位rpx)| 加载中文字大小 |
| animation  | `String` | `twinkle` | 动画类型，详细说明请看下方`animation参数说明` |
| under-color  | `String` | `#e8e7e8` | 底层文字颜色，注意不同的动画类型对此参数的支持有差异，具体请参照`animation参数说明` |
| highlight-color  | `String` | `#00bfff` | 高亮文字颜色，注意不同的动画类型对此参数的支持有差异，具体请参照`animation参数说明` |

### animation参数说明
|  类型   | 说明  | 是否支持under-color  | 是否支持highlight-color  |
|  ----  | ----  | ----  | ----  |
|  `twinkle`  |  文字闪烁效果  |  `否`  |  `否`  |
|  `focus`  |  文字聚焦效果  |  `否`  |  `否`  |
|  `rise`  |  模拟水位上涨效果  |  `是`  |  `是`  |
|  `progress`  |  水平进度加载效果  |  `是`  |  `是`  |
|  `jump`  |  文字跳动效果  |  `是`  |  `否`  |

## 效果预览
**1.文字闪烁效果**
[![ytq8l8.gif](https://s3.ax1x.com/2021/02/07/ytq8l8.gif)](https://imgchr.com/i/ytq8l8)

**2.文字聚焦效果**
[![ytqs6U.gif](https://s3.ax1x.com/2021/02/07/ytqs6U.gif)](https://imgchr.com/i/ytqs6U)

**3.模拟水位上涨效果**
[![ytqWkR.gif](https://s3.ax1x.com/2021/02/07/ytqWkR.gif)](https://imgchr.com/i/ytqWkR)

**4.水平进度加载效果**
[![ytqhfx.gif](https://s3.ax1x.com/2021/02/07/ytqhfx.gif)](https://imgchr.com/i/ytqhfx)

**5.文字跳动效果**
[![ytqOAA.gif](https://s3.ax1x.com/2021/02/07/ytqOAA.gif)](https://imgchr.com/i/ytqOAA)


## 谢谢