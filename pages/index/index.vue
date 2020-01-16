<template>
    <view style="flex: 1;">
		<uni-load-more  :loadingType="loadingType" :contentText="contentText" ></uni-load-more>
	 </view>
</template>
<script>
	//1引入组件 uni-load-more.vue
import uniLoadMore from '../../component/pqe-refresh/pqe-refresh.vue'
		
		var _self,
			page = 1,
			timer = null;
		// 定义全局参数,控制数据加载
		
export default {
    components: {//2注册组件
        uniLoadMore
    },
    data(){
		return{
			page:0,
		    newsList: [],
		    loadingText: '加载中...',
		    loadingType: 0,//定义加载方式 0---contentdown  1---contentrefresh 2---contentnomore
		    contentText: {
		        contentdown:'上拉显示更多',
		        contentrefresh: '正在加载...',
		        contentnomore: '没有更多数据了'
		    }
		}
	},
	
    onLoad: function() {
        _self = this;
				//页面一加载时请求一次数据
        this.getnewsList();
    },
    onPullDownRefresh: function() {
				//下拉刷新的时候请求一次数据
        this.getnewsList();
    },
    onReachBottom: function() {
			//触底的时候请求数据，即为上拉加载更多
			//为了更加清楚的看到效果，添加了定时器
        if (timer != null) {
            clearTimeout(timer);
        }
        timer = setTimeout(function() {
            _self.getmorenews();
        }, 1000);
				
				// 正常应为:
				_self.getmorenews();
    },
    methods: {
        getmorenews: function() {
			var _self=this;
            if (_self.loadingType !== 0) {//loadingType!=0;直接返回
                return false;
            }
            _self.loadingType = 1;
            uni.showNavigationBarLoading();//显示加载动画
            uni.request({
                url:'https://demo.hcoder.net/index.php?user=hcoder&pwd=hcoder&m=list1&page=' + _self.page,
                method: 'GET',
                success: function(res) {
                    console.log(JSON.stringify(res));
                    if (res.data == null) {//没有数据
                        _self.loadingType = 2;
                        uni.hideNavigationBarLoading();//关闭加载动画
                        return;
                    }
                    page++;//每触底一次 page +1
                    _self.newsList = _self.newsList.concat(res.data.split('--hcSplitor--'));//将数据拼接在一起
                    _self.loadingType = 0;//将loadingType归0重置
                    uni.hideNavigationBarLoading();//关闭加载动画
                }
            });
        },
        getnewsList: function() {//第一次回去数据
            var _self=this;
			_self.page = 1;
            this.loadingType = 0;
            uni.showNavigationBarLoading();
			console.log("==================")
            uni.request({
                url: 'https://demo.hcoder.net/index.php?user=hcoder&pwd=hcoder&m=list1&page=1',
                method: 'GET',
                success: function(res) {
                    page++;//得到数据之后page+1
                    _self.newsList = res.data.split('--hcSplitor--');
                    uni.hideNavigationBarLoading();
                    uni.stopPullDownRefresh();//得到数据后停止下拉刷新
					console.log(JSON.stringify(res))
                }
            });
			 uni.hideNavigationBarLoading();
        }
    }
};
</script>
<style>
.newslist {
    padding: 10px;
    line-height: 60px;
    font-size: 28px;
}
.loading {
    text-align: center;
    line-height: 80px;
}
</style>
