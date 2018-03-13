//侧边栏的图像
var $iList = $(".zhong_leirong i")
for(var i = 0;i<$iList.length;i++){
$iList[i].style.backgroundPosition = -(i*16)+"px"
}	

// 自动生成小圆点   //存在执行顺序问题，所以点的生成应在初始化索引值之前
for(var i = 0; i < $(".box").length;i++){
	var count = $(".aoto").eq(i).find(".box").length;
	console.log(count)
	for(var j = 0; j < count;j++){
		var $obj = $("<span></span>")
		$obj.appendTo($(".dian").eq(i))
		if(j == 0){
			$obj.addClass("yance")
		}
	}
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
// 初始化索引值
for(var i = 0; i <$(".box").length;i++){
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

//弹出层轮播图
$(".aoto .hezi").mouseenter(function(){
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
	var $datulist= $(this).find(".zuotu img")	
	//找到中间的背景图
	for(a=0;a<$xiaotulist.length;a++){
		$xiaotulist.eq(a).attr("index",a)
		//设置非法属性
	}
	$xiaotulist.mouseenter(function(){
		$(".hezi").find(".zuotu").css({
			background:"none", 	
			//鼠标移上时隐藏中间的背景图片
		})
		var zhi = $(this).attr("index")
		$datulist.eq(zhi).fadeIn()  
		//显示大图
	})
	$xiaotulist.mouseleave(function(){
		$(".hezi").find(".zuotu").css({
			background:"",		
			//鼠标离开时显示中间的背景图片
		})
		var zhi = $(this).attr("index")
		$datulist.eq(zhi).hide()	
		//隐藏大图
	})
})

//点的点击事件
$(".dian span").click(function(){
	$boxList = $(this).closest(".aoto").find(".box");
	var n = this.getAttribute("index");
	console.log(n)
	for(var i = 0; i < $boxList.length; i++){
		if($boxList.eq(i).hasClass("show")){
			lunboluoji(n,this)
			break;
		}
	}
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



//轮播图一jsonp跨域请求数据

var yuanban = document.getElementsByClassName("hezi")[0]  //原版
var dahezi = document.getElementsByClassName("dahezi")[0]
//声明回调函数 回调函数名要与callback一致
function callbackfn(data){
	// console.log(date)
	for(var i in data){
		newban = yuanban.cloneNode(true)
		var youimg  = data[i].imgUrl //右边的所有图片
		var xiaotu = newban.querySelectorAll(".youtu a img")
		newban.querySelectorAll(".gameName")[0].innerHTML = data[i].name
		newban.querySelectorAll(".many")[0].innerHTML ="￥"+ data[i].originPrice
		// newban.querySelectorAll(".suxiaojia")[0].innerHTML = data[i].price
		for(var a = 0;a < youimg.length;a++){
			xiaotu[a].setAttribute("src",data[i].imgUrl[a])
			newban.querySelectorAll(".xiaotu a")[a].setAttribute("href",data[i].url)
		}
		dahezi.appendChild(newban)
	}
	dahezi.removeChild(yuanban)
}


window.onload = function(){
	var scr = document.createElement("script")
	scr.setAttribute("src","http://192.168.1.100:81?callback=callbackfn")
	document.getElementsByTagName("head")[0].appendChild(scr)
}
// document.getElementById("input").onkeyup=function(){
// 	if(this.value){
// 		var src = document.creatElement("script")
// 		script.setAttribute("src","http://192.168.1.102/jsonpName.php?callback=callbackfn="+this.value)
// 		document.getElementsByTagName("head")[0].appendChild(script)
// 	}
// 	else{
// 		document.getElementsByTagName("div")[0].innerHTML=""
// 	}
// }

