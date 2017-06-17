
//方式一：原生JS
//获得上面价格
var prices =document.getElementById("J_prices");
//获得下面小框
var specsList = document.getElementsByClassName("specs-list");
//进行循环
for (var i = 0;i < specsList.length;i++) {
	specsList[i].onclick = function () {
		prices.innerHTML = this.getAttribute("data-price");
	}
}


//方式二：事件委托+jQuery
//获得上面价格
$(function() {
	$("#J_standardsList").on("click","span",function () {
		$("#J_prices").text($(this).attr("data-price"))
	})
})


//方式一：原生JS
//获得最外层ul
/*var tabList = document.getElementById("J_tabList");
window.onscroll = function () {
	if (scroll().top > 1191) {
		tabList.className += " resp-tabs-list-fixed";		
	} else {
		tabList.className = "resp-tabs-list";
	}
}*/

//方式二
$(document).scroll(function(event){
	console.log($(this).scrollTop());
//console.log()
	if($(this).scrollTop()>=1191){
	$("#J_tabList").css({
	'position' : "fixed",
	"top":"0px"
})
	}else{
		$("#J_tabList").css({
	'position' : "",
	
})
	}
})





function scroll() {
    if(window.pageYOffset != null)  //  ie9+ 和其他浏览器
    {
        return {
            left: window.pageXOffset,   //left是自定义，任意起名
            top: window.pageYOffset
        }
    }
    else if(document.compatMode == "CSS1Compat")  // 声明的了 DTD
    // 检测是不是怪异模式的浏览器 -- 就是没有 声明<!DOCTYPE html>
    {
        return {
            left: document.documentElement.scrollLeft,
            top: document.documentElement.scrollTop
        }
    } else {//此处else可省略
    	 return { //  剩下的肯定是怪异模式的
	        left: document.body.scrollLeft,
	        top: document.body.scrollTop
    	}
    }
   
}





