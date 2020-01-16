<template name="pqe-top-header">
	<view :class="'Main '+[statuSbar?'statuSbar':'']" :style="pqeStyle">
		<view :class="'header-titile '+[statuSbar?'statuSbar':'']" :style="pqeStyle"><slot /></view>
	</view>
</template>
<script>
export default {
	name: "pqe-top-header",
	data(){
		return{
			
		}
	},
	//属性
	props: {
		//是否自动获取状态栏高度
		statuSbar: {
			type: Boolean,//属性类型
			value: true
		},
		//header高度
		pqeStyle:{
			type:String,
			value:''
		},
		//标题
		titile:{
			type:String,
			value:''
		}
	},
	//
	computed:{},
	methods: {
		函数名称:function(obj){
		
		},
	},
	created(){},
	mounted(){}
}
</script>
<style>
.Main{width: 100%;}
.statuSbar{padding-top: calc(var(--status-bar-height));}
.header-titile{width: 100%;position: fixed;top:0rpx;left: 0rpx;}
</style>