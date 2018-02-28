//图片当前位置
var n=0;




var body=document.getElementsByTagName("body")
//初始化
$(".lr_datu .nba_tu img").hide() //所有大图隐藏
$(".lr_datu .nba_tu img").eq(0).show() //第一张显示
for(var a=0;a<$(".lr_datu .nba_tu img").length;a++){
	$(".lr_datu .nba_tu img").eq(a).attr("index",a)
}
$(".tu_item").eq(0).find("i").addClass("kuang") //默认第一个小图获取白框

var $length = $(".tu_item").length  // 下面小图片的个数

//点击图片逻辑
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
