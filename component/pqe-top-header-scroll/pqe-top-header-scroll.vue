<template name="pqe-top-header-scroll">
	<view :class="'Main'" >
		<view :class="'header-title '+[statuSbar?'statuSbar':'']" :style="pqeTitileStyle">
			<view :class="'leftRight'" v-if="statuLeftRight" @click="_pqeLeftClick">
				<image :style="headerLeft" :src="urlImageLeft" v-if="isImageLeft"></image>
				<view :style="headerLeft" v-else>{{textLeft}}</view>
			</view>
			<view :class="statuLeftRight?'headerMain':''" @click="pqeMainClick">{{headerTitle}}</view>
			<view :class="'leftRight'" v-if="statuLeftRight" @click="pqeRightClick">
				<image :style="headerRight" :src="urlImageRight" v-if="isImageRight"></image>
				<view :style="headerRight" v-else>{{textRight}}</view>
			</view>
		</view>
		<scroll-view :class="'header-title-scroll'" :style="pqeScrollStyle" :scroll-y="scrollY" :scroll-x="scrollX">
			<slot></slot>
		</scroll-view>
	</view>
</template>
<script>
export default {
	name: "pqe-top-header-scroll",
	data(){
		return{
			width:0,
			height:0,
		}
	},
	//属性
	props: {
		
		//是否自动获取状态栏高度
		statuSbar: {
			type: Boolean,//属性类型
			value: true,
			//=============================
		},
		//header高度
		pqeScrollStyle:{
			type:String,
			value:'',
			//=============================
		},
		//header高度
		pqeMainStyle:{
			type:String,
			value:'',
			//=============================
		},
		//标题
		pqeTitileStyle:{
			type:String,
			value:'',
			//=============================
			//=============================
		},
		//是否滚动
		scrollY:{
			type:Boolean,
			value:false,
			//=============================
		},
		scrollX:{
			type:Boolean,
			value:false,
			//=============================
		},
		headerTitle:{
			type:String,
			value:'pqe',
			//=============================
		},
		statuLeftRight:{
			type:Boolean,
			value:false
		},
		headerLeft:{
			type:String,
			value:'width:100%,height:100%',
			//=============================
		},
		headerRight:{
			type:String,
			value:'',
			//=============================
		},
		isImageLeft:{
			type:Boolean,
			value:false,
			//=============================
		},
		isImageRight:{
			type:Boolean,
			value:false,
			//=============================
		},
		urlImageLeft:{
			type:String,
			value:'',
			//=============================
		},
		urlImageRight:{
			type:String,
			value:'',
			//=============================
		},
		textLeft:{
			type:String,
			value:'',
			//=============================
		},
		textRight:{
			type:String,
			value:'',
			//=============================
		}
	},
	//
	computed:{},
	methods: {
		GetWidthHeight:function(){
		},
		_pqeLeftClick:function(){
			this.$emit("pqeLeftClick")
		},
		_pqeRightClick:function(){
			this.triggerEvent("pqeRightClick")
		},
		_pqeMainClick:function(){
			this.triggerEvent("pqeRightClick")
		},
	},
	created(){
	},
	mounted(){}
}
</script>
<style>
.Main{width: 100%;height: 667px;display: flex;flex-direction:column;}
.statuSbar{padding-top: calc(var(--status-bar-height));}
.header-title{width: 100%;flex-grow:0;}
.header-title-scroll{width: 100%;height: 1rpx;flex-grow:1;}
.leftRight{width: 20%;height: 100%;}
.headerMain{width: 60%;height: 100%;}
</style>