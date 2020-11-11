/*
* create by wq
*请求封装
*method 请求方式
*reqData 发送请求数据
*reqUrl 请求路径
*failFn 请求失败，执行该函数
*sucFn 请求成功，执行该函数
*/

  
function ImageToBase64(url){
	var canvas = document.createElement("canvas");
	canvas.width = img.width;  
	canvas.height = img.height;  
	var ctx = canvas.getContext("2d");  
	ctx.drawImage(img, 0, 0, img.width, img.height);  
	var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();  
	var dataURL = canvas.toDataURL("image/"+ext);  
	return dataURL;  
} 

function Base64ToImage(dataurl, filename = 'file') {
  let arr = dataurl.split(',')
  let mime = arr[0].match(/:(.*?);/)[1]
  let suffix = mime.split('/')[1]
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], `${filename}.${suffix}`, {
    type: mime
  })
}

// 发送GET请求
function getRequest(self,reqUrl, data, sucFn, failFn,showLoad = true){
	reqUrl = self.$url + reqUrl;
	sendRequest('GET',data, reqUrl, failFn, sucFn,self.$token,showLoad);
}
// 发送POST请求
function postRequest(self, reqUrl, data, sucFn, failFn,showLoad = true){
	reqUrl = self.$url + reqUrl;
	sendRequest('POST',data, reqUrl, failFn, sucFn,self.$token,showLoad);
}

function sendRequest(method,data, reqUrl, failFn, sucFn,token,showLoad = true){
	let ct = method == 'GET' ? 'application/json' : 'application/x-www-form-urlencoded';
		
	//#ifdef MP-WEIXIN
		token = uni.getStorageSync('token');
	//#endif
	if(process.env.NODE_ENV !== 'development')
		token = uni.getStorageSync('token');
		
	let header = {
		'token': token,
		'content-type': ct
	};
	
	if(showLoad)
		uni.showLoading({
			title: '加载中',
			mask: true
		});
	uni.request({
		url: reqUrl,
		method: method,
		data: data,
		header: header,
		success: (res) => {
			if(res.statusCode == 200){
				sucFn(res.data);
			}
			else if(res.statusCode == 401){
				// uni.removeStorageSync('token');
				uni.switchTab({
					url:'/pages/auth/index'
				});
			}else
				sucFn(res.data);
		},
		fail: (res) =>{
			// console.log(222);
			httpHandlerError(res, failFn)
		},
		complete: (res) => {
			if(showLoad)
				uni.hideLoading();
		}
	});
}

function httpHandlerError(info, callBack, errTip){
	uni.hideLoading();
	// 请求成功，退出该函数
	if(info.statusCode === 200){
		return  false;
	}
	else if ((info.statusCode > 200 && info.statusCode <= 207) || info.statusCode === 304) {
		uni.showToast({
			title: "发生了意外错误，请刷新重试",
			icon: 'loading',
			duration: 1500
		})
		return true
	} else {
	  /**401 没有权限时，重新登录 */
		if (info.statusCode === 401) {
			uni.redirectTo({
				url: '/pages/auth/index.vue'
			})
		}	
		/**判断是否有自定义错误信息，如果有，优先使用自定义错误信息，其次曝出后台返回错误信息 */
		let errorInfo = ''
		if (errTip) {
			errorInfo = errTip
		} else {
			console.log(info);
			if (info.data.msg) {
				errorInfo = info.data.msg
			} else {
				errorInfo = '也许服务器忙!'
			}
		}
		uni.showToast({
			title: errorInfo,
			icon: 'loading',
			duration: 1500
		})
	  /**发生错误信息时，如果有回调函数，则执行回调 */
		if (callBack) {
			callBack()
		}
		return true;
	}
}
// 判断是否为微信浏览器
function isWXBrowser(){
	var ua = navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == 'micromessenger')
		return true;
	else
		return false;
}
module.exports = {
	getRequest,
	postRequest,
	isWXBrowser,
	ImageToBase64,
	Base64ToImage
}