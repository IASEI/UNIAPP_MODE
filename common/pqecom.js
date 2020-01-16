/*
* create by wq
*请求封装
*method 请求方式
*reqData 发送请求数据
*reqUrl 请求路径
*failFn 请求失败，执行该函数
*sucFn 请求成功，执行该函数
*/

//
var img = "imgurl";//imgurl 就是你的图片路径  
  
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

//提示
function promptMessage(title,mask,icon,duration){
	uni.hideToast()
	uni.showToast({title: title,mask:mask,icon: icon,duration: duration});
}

function soeRequest(self, method, reqData, reqUrl, failFn, sucFn){
	// console.log(method, reqUrl);
	uni.showLoading({
	    title: '加载中',
		mask: true
	});
	uni.request({
		url: URL + reqUrl,
		method: method,
		data: reqData,
		header: {
			'content-type': 'application/json',
			// 'cookie': 'token=' + self.globalData['USER_TOKEN']
		},
		complete: (res) => {
			console.log(res.data);
			let error = httpHandlerError(res, failFn)
			if (error) return;
			sucFn(res);
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
	      url: '/pages/index/index.vue'
	    })
	  }
	  /**判断是否有自定义错误信息，如果有，优先使用自定义错误信息，其次曝出后台返回错误信息 */
	  let errorInfo = ''
	  if (errTip) {
	    errorInfo = errTip
	  } else {
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

module.exports = {
	soeRequest,
	setDataLocal,
	getDataLocal,
	promptMessage,
	getOnlineData
}