
var denlu_btn = document.getElementById("denlu_btn")
var weitime = document.getElementById("weitime")
var uname = document.getElementById("uname")
var mima = document.getElementById("mima")
window.onload = function(){
	denlu_btn.onclick=function(){
	 	if(iptval !== "" && mimaval !== ""){
		 	if(weitime.checked == true){
			 	function setCookie(data,time){
					var d = new Date();
					d.setDate(d.getDate() + time)
					for(var i in data){
						document.cookie = i + "=" + data[i] + ";expires=" + d;
					}
				}
				var iptval = uname.value;
				var mimaval = mima.value;
				setCookie({ursname:"iptval",name:"mimaval"},7)
		 	}
		 	else{
		 		function removeCookie(attrcookie){
					var d = new Date();
					d.setDate(d.getDate()-1)
					document.cookie = attrcookie + "=1;expires=" + d;
				}
				removeCookie("ursname")
				removeCookie("name")
		 	}
		}
	}

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
	if(!getCookie("ursname")){
		uname.value = ""
		mima.value = ""
	}
	else{
		uname.value = getCookie("ursname")
		mima.value = getCookie("name")
	}
}