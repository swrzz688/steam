//侧边栏的图像
var $iList = $(".zhong_leirong i")
for(var i = 0;i<$iList.length;i++){
$iList[i].style.backgroundPosition = -(i*16)+"px"
}	

var $left=$(".arrowsLeft")
var $right=$(".arrowsRight")
var $hezi=$(".dahezi").find(".hezi")
var $dian=$(".dian")
var w=0 	// 盒子当前位置

// 向右运动逻辑
function rightstar(banner,yuandian){
	yuandian.find("span").eq(w).removeClass("yance")
	banner.hide()
	if(w < banner.length-1){
		w++
	}else{
		w=0
	}
	banner.eq(w).fadeIn(500)
	yuandian.find("span").eq(w).addClass("yance")
}
	

//向右点击逻辑
function right(right,banner,yuandian){
	right.click(function(){
		banner.hide()
		yuandian.find("span").removeClass("yance")
		if(w < banner.length-1){
			w++
		}else{
			w=0
		}
		banner.eq(w).fadeIn(500)
		yuandian.find("span").eq(w).addClass("yance")
	})
}
right($(".arrowsRight"),$(".dahezi").find(".hezi"),$(".dian"))               //one-lun右点击事件
right($(".erlun .twoarrowsRight"),$(".erlun_lei").find(".box"),$(".erlun .erdian")) //two-lun右点击事件

//向左点击逻辑
function left(left,banner,yuandian){
	left.click(function(){
		banner.hide()
		yuandian.find("span").eq(w).removeClass("yance")
		if(w==0){
			w=banner.length-1
		}else{
			w--
		}
		banner.eq(w).fadeIn(500)
		yuandian.find("span").eq(w).addClass("yance")
	})
}
left($(".arrowsLeft"),$(".dahezi").find(".hezi"),$(".dian"))
left($(".twoarrowsLeft"),$(".erlun_lei").find(".box"),$(".erdian"))


//生成点
function shengchendian(changdu,dianfuji){
	for(var d=0;d<changdu;d++){
		var $dav = $("<span></span>")
		$dav.attr("index",d)
		$dav.appendTo(dianfuji)
	}
}
shengchendian($(".hezi").length,$(".dian"))         //one-lun点生成
$dian.find("span").eq(0).addClass("yance")  
shengchendian($(".box").length,$(".erlun .erdian")) //two-lun点生成
$(".erlun .erdian").find("span").eq(0).addClass("yance")

//点的点击逻辑
function diandj(yuandian,banner){
	yuandian.find("span").click(function(){
		banner.hide()
		yuandian.find("span").removeClass("yance")
		w=Number($(this).attr("index"))
		banner.eq(w).fadeIn(800)
		yuandian.find("span").eq(w).addClass("yance")
	})
}
diandj($(".dian"),$(".hezi"))          //one-lun点的点击事件
diandj($(".erlun .erdian"),$(".box"))  //two-lun点的点击事件


// -----------one轮播图弹出层和计时器及自动播放
// 自动播放 
function auto(){
	autoplay = setInterval(function(){
		rightstar($(".hezi"),$(".dian"))
	},3000)	
}
auto()
// 鼠标移上关闭计时器
$(".dahezi").mouseenter(function(){
	clearInterval(autoplay)
})
// 鼠标离开开启计时器
$(".dahezi").mouseleave(function(){
	auto()
})
//鼠标移上点，关闭计时器
$(".dian").mouseenter(function(){
	clearInterval(autoplay)
})
//鼠标离开点，开启计时器
$(".dian").mouseleave(function(){
	auto() 
})

// 弹出层和弹出层轮播图+
$hezi.mouseenter(function(){
	// 鼠标移上右边小图显示左边大图
	var $xiaotulist=$(this).find(".xiaotu a")
	// 找到右边的小图
	console.log($xiaotulist)
	var $datulist= $(this).find(".zuotu img")	
	//找到中间的背景图
	for(a=0;a<$xiaotulist.length;a++){
		$xiaotulist.eq(a).attr("index",a)
		//设置非法属性
	}
	$xiaotulist.mouseenter(function(){
		$hezi.find(".zuotu").css({
			background:"none", 	
			//鼠标移上时隐藏中间的背景图片
		})
		var zhi = $(this).attr("index")
		$datulist.eq(zhi).fadeIn()  
		//显示大图
	})
	$xiaotulist.mouseleave(function(){
		$hezi.find(".zuotu").css({
			background:"",		
			//鼠标离开时显示中间的背景图片
		})
		var zhi = $(this).attr("index")
		$datulist.eq(zhi).hide()	
		//隐藏大图
	})

	// 弹出层的自动播放
	var t=0
	$(this).find(".tanchucen").fadeIn()
	// 获取每个弹出层
	$img=$(this).find(".img img")
	// 获取弹出层的每张照片
	autotan=setInterval(function(){
		for(var n=0;n<$img.length;n++){
			$img.eq(n).hide()
		}
		if(t==$img.length-1){
			t = 0
		}else{
			t++
		}
		$img.eq(t).fadeIn(200)
	},1500)
})

// 鼠标离开hezi事件
$hezi.mouseleave(function(){
	// 清除弹出层计时器
	clearInterval(autotan)
	// 鼠标离开hezi隐藏所对应的弹出层
	$(this).find(".tanchucen").hide()
	for(var n=0;n<$img.length;n++){
			$img.eq(n).hide()
	}
	t = 0
	$img.eq(0).fadeIn(200)	
})
// -------------------------------------------------


//tab选项卡
$(".tab_List li").mouseenter(function(){
	if(!$(this).hasClass("show")){
		var zhi = $(this).index();
		$(".tab_matter .show").fadeOut(100,function(){ 	//先渐隐
			$(".tab_matter li").eq(zhi).fadeIn(100);		//后渐显
		});
		$(".tab_List li").removeClass("show")
		$(".tab_matter li").removeClass("show")
		$(this).addClass("show")
		$(".tab_matter li").eq(zhi).addClass("show")
	}
})






// 	var $left=$(".arrowsLeft")
// 	var $right=$(".arrowsRight")
// 	var $hezi=$(".dahezi").find(".hezi")
// 	var $dian=$(".dian")
// 	var w=0 	// 盒子当前位置

// 	// // 向右运动逻辑
// 	function rightstar(banner,yuandian){
// 		yuandian.find("span").eq(w).removeClass("yance")
// 		banner.hide()
// 		if(w==banner.length-1){
// 			w=0
// 		}else{
// 			w++
// 		}
// 		banner.eq(w).fadeIn(500)
// 		yuandian.find("span").eq(w).addClass("yance")
// 	}
	

// 	//向右点击逻辑
// 	function right(right,banner,yuandian){
// 		right.click(function(){
// 			banner.hide()
// 			yuandian.find("span").removeClass("yance")
// 			if(w==banner.length-1){
// 				w=0
// 			}else{
// 				w++
// 			}
// 			banner.eq(w).fadeIn(500)
// 			yuandian.find("span").eq(w).addClass("yance")
// 		})
// 	}
// 	right($(".arrowsRight"),$(".dahezi").find(".hezi"),$(".dian"))


// 	//向左点击逻辑
// 	function left(left,banner,yuandian){
// 		left.click(function(){
// 			banner.hide()
// 			yuandian.find("span").eq(w).removeClass("yance")
// 			if(w==0){
// 				w=banner.length-1
// 			}else{
// 				w--
// 			}
// 			banner.eq(w).fadeIn(500)
// 			yuandian.find("span").eq(w).addClass("yance")
// 		})
// 	}
// 	left($(".arrowsLeft"),$(".dahezi").find(".hezi"),$(".dian"))


// 	//生成点
// 	function shengchendian(changdu,dianfuji){
// 		for(var d=0;d<changdu;d++){
// 			var $dav = $("<span></span>")
// 			$dav.attr("index",d)
// 			$dav.appendTo(dianfuji)
// 		}
// 	}
// 	shengchendian($(".hezi").length,$(".dian"))
// 	$dian.find("span").eq(0).addClass("yance")


// 	//点的点击逻辑
// 	function diandj(yuandian,banner){
// 		yuandian.find("span").click(function(){
// 			banner.hide()
// 			yuandian.find("span").removeClass("yance")
// 			w=Number($(this).attr("index"))
// 			banner.eq(w).fadeIn(800)
// 			yuandian.find("span").eq(w).addClass("yance")
// 		})
// 	}
// 	diandj($(".dian"),$(".hezi"))

// 	// 自动播放
// 	function auto(){
// 	autoplay = setInterval(function(){
// 		rightstar($(".hezi"),$(".dian"))
// 	},3000)	
// }
// auto()

// // // 鼠标移上关闭计时器
// $(".dahezi").mouseenter(function(){
// 	clearInterval(autoplay)
// })
// // 鼠标离开开启计时器
// $(".dahezi").mouseleave(function(){
// 	auto()
// })
// // //鼠标移上点，关闭计时器
// $(".dian").find("span").mouseenter(function(){
// 	clearInterval(autoplay)
// })
// //鼠标离开点，开启计时器
// $(".dian").find("span").mouseleave(function(){
// 	auto();
// })

	// 右点击事件
// $right.click(function(){
// 		rightstar()
// 	})

	// 左点击事件
	// $left.click(function(){
	// 	$hezi.hide()
	// 	$first.removeClass("yance")
	// 	if(w==0){
	// 		w=$hezi.length-1
	// 	}else{
	// 		w--
	// 	}
	// 	$hezi.eq(w).fadeIn(500)
	// 	$first.eq(w).addClass("yance")
	// })
	

	
	// 生成点
	// for(var d=0;d<$hezi.length;d++){
	// 	var $dav=$("<span></span>")
	// 	$dav.attr("index",d)
	// 	$dav.appendTo($dian)
	// }
	// var $first=$dian.find("span")	
	// // 获取所有点
	// $first.eq(0).addClass("yance")	
	// // 第一个点颜色默认
	// $hezi.eq(0).show()	
	// // 第一个hezi默认显示


	// $first.click(function(){
	// 	$first.removeClass("yance")
	// 	$hezi.hide()
	// 	w = Number($(this).attr("index"))
	// 	console.log(w)
	// $hezi.eq(w).fadeIn(800)	
	// //渐显
	// $first.eq(w).addClass("yance") //span加样式
	// })
	// 点的点击事件
		

