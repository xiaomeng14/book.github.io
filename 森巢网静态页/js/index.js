
window.onload = function () {
	//城市列表
	moreCity ();
	//购物车列表
	cart ();
	//所有产品分类  函数调用
	menuPlan ();
	//所有产品分类  家具区域
	furnBtn ();
	//tab栏切换
	tabList ();
	//城市列表ajax调用
	cityAjax ();
}	



//函数封装
var jquery = {
	/*
	 * 添加class方法
	 * ele 操作元素 className 添加的class
	 * jquery.addClass(ele,"class")
	 */
	addClass : function (ele,className) {
		//添加class
		ele.className += " " + className;
	},
	/*
	 * 移除class方法
	 * ele 操作元素 
	 */
	removeClass : function (ele,classNames) {
		if (ele.length > 0) {
			for (var i = 0;i < ele.length;i++) {

				if (this.hasClass(ele[i],classNames)) {
					
					//问题一   正则表达式不明白
					ele[i].className = ele[i].className.replace(new RegExp("(^| +)" + classNames + "( +|$)",'g'),"");
				}
			} 
		} else {
			ele.className = ele.className.replace(new RegExp("(^| +)" + classNames + "( +|$)",'g'),"");
		}
		//ele.classList.remove(className);
		//删除类名
		
		//方式二删除属性，使用replace，有bug,产生空格，使用正则
		//ele.className = ele.className.replace(new RegExp("(^| +)") + className + "( +|$)",'g');
		//ele.className = ele.className.replace(className,'');
	},
	show : function (ele) {
		ele.style.display="block";
	},
	hide : function (ele) {
		if (ele.length > 0) {
			for (var i = 0;i < ele.length;i++) {
				//if (ele[i].style.display == "block")) {
				if (this.css(ele[i],"display") == "block") {
					ele[i].style.display="none";
				}
			}
		} else {
			ele.style.display="none";
		}
		
		
	},
	css : function (cur,attribute){
		//cur.currentStyle  数据类型为true  ie以下版本不能使用getComputedStyle
		return cur.currentStyle ? cur.currentStyle[attribute]:document.defaultView.getComputedStyle(cur,false)[attribute]
	},
	hasClass : function (ele,className) {
		
		//方式一  三元运算符
		return ele.className.indexOf(className) >= 0 ? true : false;
		
		//方式二 if else判断
		/*if (ele.className.indexOf(className) >= 0 ){
			return true;
		} else {
			return false;
		}*/
	},
	
	
	
	
	
	
	
	
	
	
	
	
	//重点理解 尚未理解
	paddingMove : function (cur,moveNum) {
		clearInterval(cur.times);
		cur.times = setInterval(function () {
			//获取当前元素paddingLeft
			var pLeft = parseInt (cur.style.paddingLeft) || 0;
			//运动速度
			var speed = 0;
			if (moveNum > 0) {
				speed = parseInt (pLeft + 10) / 10;
				if (pLeft >= moveNum) {
					clearInterval(cur.times);
					return;
				}
			} else {
				speed = -parseInt (pLeft + 10) / 10;
				if (pLeft <= moveNum) {
					clearInterval(cur.times);
					return;
				}
			}
			speed = speed > 0 ? Math.floor(speed) : Math.ceil(speed);
			cur.style.paddingLeft = (pLeft + speed) + "px";
		},30)
	}
}





//封装城市列表函数
function moreCity () {
	//移入到城市时，显示下面城市
	//悬浮在父节点上，出现子节点一二的内容
	var cityWarp = document.getElementById("J_cityWarp");
	//获取子节点一
	var cityName = document.getElementById("J_cityName");
	//获取子节点二
	var moreCity = document.getElementById("J_moreCity");
	
//	var className = JCityName.className;
	cityWarp.onmouseover = function () {
//		cityName.className = "city-name city-active";
		//cityName.classList.add("city-active");
		jquery.addClass(cityName,"city-active");

//		moreCity.style.display="block";
		jquery.show(moreCity);
	}
	cityWarp.onmouseout = function () {
		//移除属性方式一
//		cityName.className = "city-name";
		
		//移除属性方式二
		jquery.removeClass(cityName,"city-active")
		
		//moreCity.style.display="none";
		jquery.hide(moreCity);
	}
	
	
	//先获得每个span的大父亲
	var nd_cityList = document.getElementsByClassName("city-list")[0];
	
	//方式一 使用for循环
	//先获得每一个span
	/*for (var i = 0;i < citySpan.length;i++) {
		citySpan[i].onclick = function () {
			var cityInfo = this.innerHTML;
			cityName.innerHTML = cityInfo;
		}
	}*/
	
	//事件委托绑定城市列表事件
	nd_cityList.onclick = function (event) {
		var ev = event || window.event;
		//获取点击目标
		var tar = ev.target || ev.srcElement;
		//获取当前点击元素的标签
		if (tar.nodeName = "SPAN") {
//			console.log(tar.nodeName);
			//获取当前点击元素innerHTML赋值到城市名城上面
			cityName.innerHTML = tar.innerHTML;
			cityName.classList.remove("city-active");
			moreCity.style.display = "none";
		}
	}
}





//方式一：jsonp获取数据渲染

function cityAjax (){
	$.ajax({
		type:'get',
		url:'http://192.168.0.100:8080/森巢网完整/data/index.json',
		async:true,
		
		dataType:'jsonp',
		jsonp:'callback',
		jsonpCallback:'jsonpCallback',	
		
		
		success:function (resp) {
			//获取json城市列表
			var cityName = resp.data.city;
			//var htmlStr = "";
			//for循环遍历
			for (var i = 0;i < cityName.length;i++) {
				//var item = cityName[i].cityname;
				//console.log(cityName[i].cityname);
				//htmlStr += '<span>' + cityName[i].cityname + '</span>';
				$("<span>"+cityName[i].cityname+"</span>").appendTo(".city-list");
			}
		}
	})
}


//方式二：json
/*function cityAjax (){
	$.ajax({
		type:"get",
		url:"data/index.json",
		async:true,
		dataType : "json",
		success : function(res){
			var cits = res.data.city;
			for(var i = 0 ;i<cits.length;i++){
				var item = cits[i].cityname;
				console.log(item);
				
				$("<span>"+item+"</span>").appendTo(".city-list");
				console.log(nd_cityList)
			}
		}
	})
}
*/












//购物车添加class carthover
function cart () {
	//获得父节点元素
	var mycartWarp = document.getElementById("J_mycartWarp");
	//获得子节点一
	var mycartArea = document.getElementById("J_mycartArea");
	//获得子节点二
	var mycart = document.getElementById("J_mycart");
	//先储存样式,为了方便类名的可重用性，不需要知道原始类名
	var className = mycartArea.className;
	mycartWarp.onmouseover = function () {
		//推荐使用+=，后面需要添加空格
//		mycartArea.className += " carthover";
		jquery.addClass(mycartArea,"carthover");
		//mycart.style.display = "block";
		jquery.show(mycart);
	}
	mycartWarp.onmouseout = function () {
//		mycartArea.className = className;
		jquery.removeClass(mycartArea,"carthover");
		
		//mycart.style.display = "none";
		jquery.hide(mycart);
	}
}





//所有产品分类 函数
function menuPlan () {
	var warpMenu = document.getElementById("J_warpMenu");
	//获取最大元素
	var menu = document.getElementById("J_menu");
	//获得父菜单栏每个   li
//	var menuList = menu.children;
	var menuList = menu.querySelectorAll("li");
	//悬浮在总菜单上，出现对应内容
	
	var sonMenu = document.getElementById("J_sonMenu");
	//获得子菜单栏的每个li
	var sonMenuList = sonMenu.querySelectorAll(".commonidty-son-detail");

//	console.log(sonMenuList);
	for (var i = 0;i < menuList.length;i++) {
		menuList[i].index = i;
		//悬浮每个li
		menuList[i].onmouseover = function () {
			jquery.paddingMove(this,20);
			//避免了DOM的重复操作
			if (!jquery.hasClass(this,'lihoverstyle')) {
				
			
				//sonMenu.style.display = "block";
				//显示二级子菜单
				jquery.show(sonMenu);
				//移除选中的class
				
				jquery.removeClass(menuList,"lihoverstyle");
//				//当前添加class
				jquery.addClass(this,"lihoverstyle");
//				//隐藏所有的子菜单内容
				jquery.hide(sonMenuList);
//				//显示对应的菜单内容














				//问题二：为什么进行If判断？
				if (sonMenuList[this.index]) {
					jquery.show(sonMenuList[this.index]);
				};
				
				
			}

			
		};
		menuList[i].onmouseout = function () {
			jquery.paddingMove(this,0);
		}
		
	}
	
	//onmouseleave
	warpMenu.onmouseleave = function () {
		jquery.removeClass(menuList,'lihoverstyle');
		jquery.hide(sonMenu);
	}
	
	
}


//家具列表点击出现右侧内容
function furnBtn () {
	//获取点击项  父级ul
	var home = document.getElementById("J_home");
	//获得点击项  父级每个ul下的子节点li
	var homeLi = home.querySelectorAll("li");
	//获得每个li点击后显示的 的div
	var sonHome = document.getElementById("J_sonHome");
	//获得每个div的孩子ul
	var sonHomeList = sonHome.querySelectorAll("ul");
	for (var i = 0;i < homeLi.length;i++) {
		homeLi[i].index = i; 
		//点击事件
		homeLi[i].onclick = function () {
			//点击每个li出现对应的div项
			jquery.show(sonHome);
			//移除所有li的class名
			jquery.removeClass(homeLi,"active");
			//给当前li添加样式class
			jquery.addClass(this,"active");
			//隐藏当前所有的子菜单栏 ul
			jquery.hide(sonHomeList);
			//显示对应当前ul菜单栏
			if (sonHomeList[this.index]) {
				jquery.show(sonHomeList[this.index]);
			};
		}
	}
}



function tabList () {
	var tab = document.querySelectorAll(".tab-right-common");
	var tabList = null;
	for (var i = 0;i < tab.length;i++) {
		//获取所有ul中的li
		var tabList = tab[i].querySelectorAll("li");
		for (var j = 0;j < tabList.length;j++) {
			tabList[j].onclick = function () {
				//获取到当前ul下的li
				var list = this.parentNode.querySelectorAll("li");
				//先删除所有li的样式
				jquery.removeClass(list,"active");
				//当前li获得样式active
				jquery.addClass(this,"active");
			}
			
		}
	}
	
	
}



