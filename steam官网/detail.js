var body=document.getElementsByTagName("body")[0]

//默认第一个小图获取白框
$(".tu_item").eq(0).find("i").addClass("kuang") 
// 下面小图片的个数
var $length = $(".tu_item").length 
//所有大图隐藏
$(".lr_datu .nba_tu img").hide() 
//第一张显示
$(".lr_datu .nba_tu img").eq(0).show() 

//获取大图下标
for(var a=0;a<$(".lr_datu .nba_tu img").length;a++){
	$(".lr_datu .nba_tu img").eq(a).attr("index",a)
	$(".tu_item img").eq(a).attr("index",a)
}

//初始化
function xiaotudj(){
	$(".lr_datu .nba_tu img").hide() //所有大图隐藏
	$(".lr_datu .nba_tu img").removeClass("show")
	$(".lr_datu .nba_tu img").eq(adv.m).fadeIn(800)
	$(".lr_datu .nba_tu img").eq(adv.m).addClass("show")
}

//小图点击逻辑
$(".tu_item img").click(function(){
	adv.m = $(this).attr("index")
	xiaotudj()
	kuangs(adv.m)
})

var itemWrap = $(".sceoll");
var kuangList = itemWrap.find("i");
//当前所在的张数
var adv = {};
adv.m = 0;
//可视区域最左侧图片的下标
adv.n = 0;
adv.count = kuangList.length;

var t = Math.floor(adv.count/5)
var h=adv.count-t*5

function kuangs(index){
	kuangList.removeClass("kuang");
	kuangList.eq(index).addClass("kuang");
}

//移动逻辑
function movekuang(newIndex){
	var r = adv.count - adv.m;
	var l = adv.n;
	if(r > h){
		itemWrap.animate({
			"marginLeft":-(adv.m) * 120 
		});
	}
	else{
		itemWrap.animate({
			"marginLeft":-(adv.count - 5) * 120 
		});
	}
	adv.n = newIndex || adv.m;
}

//右点击逻辑
$(".right_ctn").click(function(){
	++adv.m;
	if(adv.m == adv.count){
		adv.m = 0;
		movekuang();
	}
	if(adv.m == adv.n + 5){
		movekuang() 
	}
	kuangs(adv.m)
	xiaotudj()
})
function right(){
	++adv.m;
	if(adv.m == adv.count){
		adv.m = 0;
		movekuang();
	}
	if(adv.m == adv.n + 5){
		movekuang() 
	}
	kuangs(adv.m)
	xiaotudj()
}

//左点击逻辑
$(".left_ctn").click(function(){
	--adv.m
	if(adv.m == -1){
		adv.m = adv.count-1
		movekuang();
	}
	if(adv.m < adv.count-5 && adv.m>=5){
		movekuang()
	}
	if(adv.m==4){
		itemWrap.animate({
			"marginLeft": 0
		});
		$(".conter_dtn").animate({
			left : 0 + "px"
		})
	}
	kuangs(adv.m)
	xiaotudj()
})

//滑动条
$(".conter_dtn").mousedown(function(event){
	//进度条自身内相对于浏览器的坐标
	var t = event.clientX;
	//进度条的相对于父级元素的左边距
	var ml=parseInt(this.style.left)
	var zhi=this
	//可移动宽度
	var dtnwidth=$(this).parent().width() - $(this).width()+1

	body.onselectstart = function(){
		return false;
	}

	window.onmousemove = function(event){
		//移动过后的坐标
		var T = event.clientX;
		//移动后的左边距
		var newml=parseInt(zhi.style.left)
		if(T-t+ml>dtnwidth){
			return
		}
		if(T-t+ml<0){
			return 
		}
		else{
			zhi.style.left = T-t+ml + "px"
			//进度条百分比
			var jingdu=Math.round(newml/dtnwidth*100)/100
			itemWrap.css({
				marginLeft:-((itemWrap.width()-600)*jingdu)
			})
		}
	}
	window.onmouseup=function(){
		body.onselectstart=null;
		window.onmousemove=null;
	}
})

var autoplay=setInterval(function(){
	right()
},2000)
$(".lz_lr").mouseenter(function(){
	clearInterval(autoplay)
})
$(".lz_lr").mouseleave(function(){
	autoplay=setInterval(function(){
		right()
	},2000)
})


// 展开逻辑
$(".zhankai_lr").click(function(){
	$lr = $(this).closest(".auto_rightctn").find(".autogame_tu");
	$zhankai = $(this).closest(".auto_rightctn").find(".zhankai_lr");
	$zhankai.hide()
	$lr.animate({
		maxHeight:"1913px"
	},1000)
})