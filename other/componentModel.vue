<template name="组件名称">
	<view>
	    ......
	</view>
</template>
<script>
export default {
	name: "",
	data(){
		return{
			
		}
	},
	//属性
	props: {
		属性名称: {
			type: String,//属性类型
			value: "值"
		},
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
组件样式
</style>