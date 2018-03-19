
//轮播图一jsonp跨域请求数据

var yuanban = document.getElementsByClassName("hezi")[0]  	//原版
var dahezi = document.getElementsByClassName("dahezi")[0]	//大盒子
//声明回调函数 回调函数名要与callback一致
//
window.onload = function(){
	var scr = document.createElement("script")
	scr.setAttribute("src","http://ie19852360.51mypc.cn?callback=callbackfn")
	document.getElementsByTagName("head")[0].appendChild(scr)
}

function callbackfn(data){
	for(var i in data){
		newban = yuanban.cloneNode(true) //克隆出新盒子
		dahezi.appendChild(newban)		 //插入到大盒子
		var youimg  = data[i].imgUrl     //所有图片
		var xiaotu = newban.querySelectorAll(".youtu a img") //右边四张小图
		var xiaotua = newban.querySelectorAll(".youtu a")    //右边所有a标签
		var zuotu = newban.querySelectorAll(".zuotu a img")  //中间的四张图片
		var tanchucen = newban.querySelectorAll(".tanchucen .img img") //弹出层图片
		var gameId = data[i].gameId   //ID值
		var url = data[i].url
		for(var a = 0;a < youimg.length;a++){
			// var id= newban.setAttribute("gameId",gameId)
			// console.log(id)
			//右边小图
			xiaotu[a].setAttribute("src",data[i].imgUrl[a])
			//中间图片
			zuotu[a].setAttribute("src",youimg[a])
			//弹出层图片 
			tanchucen[a].setAttribute("src",youimg[a])
			xiaotua[a].setAttribute("gameIdzhi",gameId)
			xiaotua[a].setAttribute("href","javascript:void(0)")
			//右边小图链接地址
			// newban.querySelectorAll(".xiaotu a")[a].setAttribute("href",data[i].url)
		}
		//弹出层日期
		var getdata=data[i].date
		var newtime = getdata.split("-")
		newban.querySelectorAll(".riqi")[0].innerHTML = "发行日期："+newtime[0]+"年"+newtime[1]+"月"+newtime[2]+"日"
		//弹出层和右边游戏名
		newban.querySelectorAll(".gameName")[0].innerHTML = data[i].name
		newban.querySelectorAll(".ming")[0].innerHTML = data[i].name
		//中间第一张图片默认显示
		zuotu[0].style.display = "block"
		//弹出层第一张图片默认显示
		tanchucen[0].style.display = "block"
		//获取折扣价格
		var zhekou = data[i].discount
		var many = data[i].originPrice
		var suxiaojia = data[i].price
		if(zhekou == 0){
			newban.querySelectorAll(".zhekou")[0].innerHTML = ""
			newban.querySelectorAll(".many")[0].innerHTML = ""
			newban.querySelectorAll(".suxiaojia")[0].innerHTML ="￥"+suxiaojia
			newban.querySelectorAll(".suxiaojia")[0].style.background="none"
		}
		if(zhekou !== 0){
			newban.querySelectorAll(".zhekou")[0].innerHTML = "-"+zhekou*100 +"%"
			newban.querySelectorAll(".many")[0].innerHTML ="￥"+ many
			newban.querySelectorAll(".suxiaojia")[0].innerHTML ="￥"+suxiaojia
		}
		//评测数量每三个一个逗号
		var pincushu = String(data[i].evaluatingCount) //数字转字符串
		function fenge(select){
			if(select.length<=3){
				return select
			}
			else{
				return fenge(select.substr(0,select.length-3)) + "," + select.substr(select.length-3)
			}
		}
		newban.querySelectorAll(".pincushu")[0].innerHTML = "("+fenge(pincushu)+"&nbsp;"+"篇评测"+")"//评价数量

		//弹出层评测
		// newban.querySelectorAll(".pincushu")[0].innerHTML ="("+data[i].evaluatingCount+"&nbsp;"+"篇评测"+")"
		// newban.querySelectorAll(".pinse")[0].innerHTML = data[i].evaluate
		if(data[i].evaluate == 1){
			newban.querySelectorAll(".pinse")[0].innerHTML = "好评如潮"
		}
		if(data[i].evaluate == 2){
			newban.querySelectorAll(".pinse")[0].innerHTML = "特别好评"
		}
		if(data[i].evaluate == 3){
			newban.querySelectorAll(".pinse")[0].innerHTML = "多半好评"
		}
		if(data[i].evaluate == 4){
			newban.querySelectorAll(".pinse")[0].innerHTML = "褒贬不一"
			newban.querySelectorAll(".pinse")[0].style.color = "#b79f74"
		}
		if(data[i].evaluate == 5){
			newban.querySelectorAll(".pinse")[0].innerHTML = "多半差评"
			newban.querySelectorAll(".pinse")[0].style.color = "#b79f74"
		}
		if(data[i].evaluate == 6){
			newban.querySelectorAll(".pinse")[0].innerHTML = "差评如潮"
			newban.querySelectorAll(".pinse")[0].style.color ="#a34c25"
		}
		if(data[i].evaluate == 7){
			newban.querySelectorAll(".pinse")[0].innerHTML = "无评论"
		}

		//版本图标
		var banben = data[i].platform
		var win = newban.querySelectorAll(".tubiao .win")[0]
		var mac = newban.querySelectorAll(".tubiao .mac")[0]
		var linux = newban.querySelectorAll(".tubiao .linux")[0]
		for(var p in banben){
			if(banben[p] == "Windows"){
				win.style.display = "inline-block"
			}
			if(banben[p] == "Mac OS"){
				mac.style.display = "inline-block"
			}
			if(banben[p] == "Steam"){
				linux.style.display = "inline-block"
			}
		}
		//标签
		var label = newban.querySelectorAll(".biaoqian span")[0]
		for(var j=0;j<data[i].label.length;j++){
			var newlabel = label.cloneNode() 
			newlabel.innerHTML = data[i].label[j]
			label.parentNode.appendChild(newlabel) 
		}
		label.parentNode.removeChild(label) 
		
		
	}	
	dahezi.removeChild(yuanban)
	//第一个盒子默认显示
	$(".dahezi .hezi").eq(0).addClass("show")
	
	// 自动生成小圆点
	//存在执行顺序问题，所以点的生成应在初始化索引值之前
	for(var i = 0; i < $(".aoto").length;i++){
		var count = $(".aoto").eq(i).find(".box").length;
		for(var j = 0; j < count;j++){
			var $obj = $("<span></span>")
			$obj.appendTo($(".dian").eq(i))
			if(j == 0){
				$obj.addClass("yance")
			}
		}
	}

	// 初始化索引值
	for(var i = 0; i <$(".aoto").length;i++){
		var $boxList = $(".aoto").eq(i).find(".box");
		var $dianList = $(".aoto").eq(i).find(".dian").find("span");
		for(var j = 0; j < $boxList.length; j++){
			$boxList.eq(j).attr("index",j)
		}
		for(var j = 0; j < $dianList.length; j++){
			$dianList.eq(j).attr("index",j)
		}
	}

	//隐藏图片和清除点的样式，让指向的当前图片显示和点添加样式
	function lunboluoji(index,obj){
		var $dotList = $(obj).closest(".aoto").find('.dian').find("span");
		// 隐藏所有的图片
		$boxList.hide();
		$boxList.removeClass("show");
		$dotList.removeClass("yance");
		$boxList.eq(index).addClass("show")
		$boxList.eq(index).fadeIn();
		$dotList.eq(index).addClass("yance")
	}

	//点的点击事件
	$(".dian span").click(function(){
		$boxList = $(this).closest(".aoto").find(".box");
		var n = this.getAttribute("index");
		for(var i = 0; i < $boxList.length; i++){
			console.log(n)
			if($boxList.eq(i).hasClass("show")){
				lunboluoji(n,this)
				break;
			}
		}
	})	

	//弹出层轮播图
	$(".aoto .box").mouseenter(function(){
		$(this).find(".tanchucen").fadeIn();
		var $imgList = $(this).find(".tanchucen img")
		var n = 0;
		outplay = setInterval(function(){
			if(n < $imgList.length - 1){
				n++
			}
			else{
				n = 0;
			}
			$imgList.hide();
			$imgList.eq(n).fadeIn();
		},1500)
	}).mouseleave(function(){
		$(this).find(".tanchucen").fadeOut();
		clearInterval(outplay); 
	})

	// 鼠标移上右边小图显示左边大图
	$(".aoto .hezi").mouseenter(function(){
		var $xiaotulist=$(this).find(".xiaotu a")
		// 找到右边的小图
		var $datulist= $(this).find(".zuotu a img")	
		//找到中间的背景图
		for(a=0;a<$xiaotulist.length;a++){
			$xiaotulist.eq(a).attr("index",a)
			//设置非法属性
		}
		$xiaotulist.mouseenter(function(){
			for(var a=0; a<$datulist.length;a++){
				//动画队列问题，JQuery内部提供了停止动画队列的方法 “ stop() ”
				//问题描述：不停地快速划过左边小图并且停止时，之前的动画尚未执行完毕，隐藏无效，图片无法回到回到正确位置
		 		$datulist.eq(a).stop()
			}
			var zhi = $(this).attr("index")
			$datulist.eq(zhi).fadeIn()  
			//显示大图
		})
		$xiaotulist.mouseleave(function(){
			var zhi = $(this).attr("index")
			$datulist.eq(zhi).hide()
			$datulist.eq(0).fadeIn()	
			//隐藏大图
		})
	})

	//自动播放逻辑
	function auto(){
		$boxList = $(".aoto").eq(0).find(".box");
		for(var i = 0; i < $boxList.length; i++){
			if($boxList.eq(i).hasClass("show")){
				if(i < $boxList.length - 1){
					lunboluoji(i+1,$(".aoto").eq(0).find(".arrowsRight"))
				}
				else{
					lunboluoji(0,$(".aoto").eq(0).find(".arrowsRight"))
				}
				break;
			}
		}
	}

	//自动播放
	var autoPlay = setInterval(function(){
		auto()
	},3000)
	//鼠标移上停止计时器
	$(".aoto").eq(0).mouseenter(function(){
		clearInterval(autoPlay)
	})
	//鼠标离开开启计时器
	$(".aoto").eq(0).mouseleave(function(){
		autoPlay = setInterval(function(){
			auto();
		},3000)
	})



	//详情页cookie
	var gameIdarr =[] //声明一个数组，存放数据
    //获取cookie

	if(getCookie("gameidzhi")){
		gameIdarr = getCookie("gameidzhi").split(",")
	}

	var select = ""
	$(".xiaotu a").click(function(){

		for(var j=0;j<gameIdarr.length;j++){
 			if($(this).attr("gameidzhi") == gameIdarr[j]){
 				gameIdarr.splice(j,1)
 			}
 		}
 		gameIdarr.push($(this).attr("gameIdzhi"))
 		var objid = {}  // 此对象写入的cookie数据

		objid.gameidzhi = gameIdarr.toString() //将数组转换为字符串 再将字符串转换为对象，以便于写入cookie 

		setCookie(objid,7) //设置cookie
 		location.href=$(this).attr("src")
	})	

}


var scrtwo = document.createElement("script")
scrtwo.setAttribute("src","http://ie19852360.51mypc.cn?callback=callbackcookie&gameId="+getCookie("gameidzhi"))
document.getElementsByTagName("head")[0].appendChild(scrtwo)


function callbackcookie(data){
	console.log(data)
	for(var i in data){
		var newchakan = $("<a></a>")
		newchakan.html(data[i].name)
		newchakan.attr("href",data[i].url)
		$(".chakan").prepend(newchakan)
	}
}

// 设置cookie函数
function setCookie(data,time){
	var d = new Date();
	d.setDate(d.getDate() + time)
	for(var i in data){
	document.cookie = i + "=" + data[i] + ";expires=" + d;
	}
}

// 获取cookie函数
function getCookie(qishi){ 
	var str = document.cookie;
	// var qishi ="name"
	var staterindex = str.indexOf(qishi)
	var endindex = str.indexOf(";",staterindex)
	if(endindex == -1){
	endindex = str.length;
	}
	var result = str.slice(staterindex,endindex).split("=")[1]
	return result
}












//侧边栏的图像
var $iList = $(".zhong_leirong i")
for(var i = 0;i<$iList.length;i++){
$iList[i].style.backgroundPosition = -(i*16)+"px"
}	

// // 自动生成小圆点   //存在执行顺序问题，所以点的生成应在初始化索引值之前
// for(var i = 0; i < $(".aoto").length;i++){
// 	var count = $(".aoto").eq(i).find(".box").length;
// 	for(var j = 0; j < count;j++){
// 		var $obj = $("<span></span>")
// 		$obj.appendTo($(".dian").eq(i))
// 		if(j == 0){
// 			$obj.addClass("yance")
// 		}
// 	}
// }

//
// // 初始化索引值
// for(var i = 0; i <$(".aoto").length;i++){
// 	var $boxList = $(".aoto").eq(i).find(".box");
// 	var $dianList = $(".aoto").eq(i).find(".dian").find("span");
// 	for(var j = 0; j < $boxList.length; j++){
// 		$boxList.eq(j).attr("index",j)
// 	}
// 	for(var j = 0; j < $dianList.length; j++){
// 		$dianList.eq(j).attr("index",j)
// 	}
// }

//隐藏图片和清除点的样式，让指向的当前图片显示和点添加样式
function lunboluoji(index,obj){
	var $dotList = $(obj).closest(".aoto").find('.dian').find("span");
	// 隐藏所有的图片
	$boxList.hide();
	$boxList.removeClass("show");
	$dotList.removeClass("yance");
	$boxList.eq(index).addClass("show")
	$boxList.eq(index).fadeIn();
	$dotList.eq(index).addClass("yance")
}


//右点击
$(".arrowsRight").click(function(){
	$boxList = $(this).closest(".aoto").find(".box");
	for(var i = 0; i < $boxList.length; i++){
		if($boxList.eq(i).hasClass("show")){
			if(i < $boxList.length - 1){
				lunboluoji(i+1,this)
			}
			else{
				lunboluoji(0,this)
			}
			break;
		}
	}
})

//左点击
$(".arrowsLeft").click(function(){
	$boxList = $(this).closest(".aoto").find(".box");
	for(var i = 0; i < $boxList.length; i++){
		if($boxList.eq(i).hasClass("show")){
			if(i !== 0){
				lunboluoji(i-1,this)
			}
			else{
				lunboluoji($boxList.length - 1,this)
			}
			break;
		}
	}
})

// //弹出层轮播图
// $(".aoto .box").mouseenter(function(){
// 	$(this).find(".tanchucen").fadeIn();
// 	var $imgList = $(this).find(".tanchucen img")
// 	var n = 0;
// 	outplay = setInterval(function(){
// 		if(n < $imgList.length - 1){
// 			n++
// 		}
// 		else{
// 			n = 0;
// 		}
// 		$imgList.hide();
// 		$imgList.eq(n).fadeIn();
// 	},1500)
// }).mouseleave(function(){
// 	$(this).find(".tanchucen").fadeOut();
// 	clearInterval(outplay); 
// })

// // 鼠标移上右边小图显示左边大图
// $(".aoto .hezi").mouseenter(function(){
// 	var $xiaotulist=$(this).find(".xiaotu a")
// 	// 找到右边的小图
// 	var $datulist= $(this).find(".zuotu img")	
// 	//找到中间的背景图
// 	for(a=0;a<$xiaotulist.length;a++){
// 		$xiaotulist.eq(a).attr("index",a)
// 		//设置非法属性
// 	}
// 	$xiaotulist.mouseenter(function(){
// 		$(".hezi").find(".zuotu").css({
// 			background:"none", 	
// 			//鼠标移上时隐藏中间的背景图片
// 		})
// 		var zhi = $(this).attr("index")
// 		$datulist.eq(zhi).fadeIn()  
// 		//显示大图
// 	})
// 	$xiaotulist.mouseleave(function(){
// 		$(".hezi").find(".zuotu").css({
// 			background:"",		
// 			//鼠标离开时显示中间的背景图片
// 		})
// 		var zhi = $(this).attr("index")
// 		$datulist.eq(zhi).hide()	
// 		//隐藏大图
// 	})
// })

// //点的点击事件
// $(".dian span").click(function(){
// 	$boxList = $(this).closest(".aoto").find(".box");
// 	var n = this.getAttribute("index");
// 	console.log(n)
// 	for(var i = 0; i < $boxList.length; i++){
// 		if($boxList.eq(i).hasClass("show")){
// 			lunboluoji(n,this)
// 			break;
// 		}
// 	}
// })	

// //自动播放逻辑
// function auto(){
// 	$boxList = $(".aoto").eq(0).find(".box");
// 	for(var i = 0; i < $boxList.length; i++){
// 		if($boxList.eq(i).hasClass("show")){
// 			if(i < $boxList.length - 1){
// 				lunboluoji(i+1,$(".aoto").eq(0).find(".arrowsRight"))
// 			}
// 			else{
// 				lunboluoji(0,$(".aoto").eq(0).find(".arrowsRight"))
// 			}
// 			break;
// 		}
// 	}
// }

// //自动播放
// var autoPlay = setInterval(function(){
// 	auto()
// },3000)
// //鼠标移上停止计时器
// $(".aoto").eq(0).mouseenter(function(){
// 	clearInterval(autoPlay)
// })
// //鼠标离开开启计时器
// $(".aoto").eq(0).mouseleave(function(){
// 	autoPlay = setInterval(function(){
// 		auto();
// 	},3000)
// })


//tab选项卡
$(".tab_List li").mouseenter(function(){
	if(!$(this).hasClass("show")){
		var zhi = $(this).index();
		$(".tab_matter .show").fadeOut(100,function(){ 		//先渐隐
			$(".tab_matter li").eq(zhi).fadeIn(100);		//后渐显
		});
		$(".tab_List li").removeClass("show")
		$(".tab_matter li").removeClass("show")
		$(this).addClass("show")
		$(".tab_matter li").eq(zhi).addClass("show")
	}
})

// $(".tab").mouseenter(function(){
// 	liveTab = $(this);
// 	//所在的（this）选项卡游戏列表添加  非法属性（下标）
// 	for(var i = 0 ; i < liveTab.find(".tableList").length ; i++){
// 		liveTab.find(".tableList").eq(i).attr("xiabiao",i);
// 	}
// 	liveTab.find(".tableList").mouseenter(function(){
// 		if(!$(this).hasClass("foucs")){
// 			liveTab.find(".tableList").removeClass("foucs")
// 			$(this).addClass("foucs")
// 			b = $(this).attr("xiabiao");
// 			liveTab.find(".tableMain").hide();
// 			liveTab.find(".tableMain").eq(b).fadeIn(100);
// 		}
// 	});
// });










//tab选项卡点击事件
for(var t=0;t<$(".left_top a").length;t++){
	$(".left_top a").eq(t).attr("xiabiao",t);
}

$(".left_top a").click(function(){
	$(".left_top a").removeClass("tab_name")
	$(this).addClass("tab_name");
	z = $(this).attr("xiabiao");
	if($(this).attr("xiabiao")==z){
		$(".left_matter .tab_List").removeClass("show");
		$(".right_matter ul").removeClass("show");
		$(".left_matter .tab_List").eq(z).addClass("show");
		$(".right_matter ul").eq(z).addClass("show");
	}
		
})





