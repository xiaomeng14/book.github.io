//jsonp:'callback',
//登录界面
//方式一
//window.onload = function () {
	//登录内容调用
	/*btnsubmit2();
}*/
function btnsubmit2() {
	//方式一
	if ($('#username2').val() == "" || $('#password2').val() == "") {
		alert("请输入用户名或密码");
	} else {
		$.ajax({
			type:'get',
			url:'http://192.168.0.100/api/index.php?userName=' + $('#username2').val() + '&pwd=' + $('#password2').val() + '&type=1' ,//&type=1表示跨域
			async:true,
			dataType:'jsonp',
			//作用？
			//jsonpCallback:'jsonpCallback',
			success:function (res) {
				console.log(res);
				console.log(res.result);
				if (res.result == 1) {
					location.href='index.html';
				} else {
					alert('用户名或者密码错误');
				}
			}
		})
	}
	
	
	
	//方式二
	/*if ($('#username2').val() == "" || $('#password2').val() == "") {
		alert("请输入用户名或密码");
	} else {
		$.ajax({
			type:'get',
			url:'http://192.168.0.100/api/index.php?userName=' + $('#username2').val() + '&pwd=' + $('#password2').val() + '&type=2' ,//&type=1表示跨域
			async:true,
			success:function (res) {
				var item = JSON.parse(res);
				console.log(res);
				location.href='index.html';
			}
			
		})
	}*/
	
	
	
	//方式三
	/*if ($('#username2').val() == "" || $('#password2').val() == "") {
		alert("请输入用户名或密码");
	} else {
		$.ajax({
			type:'get',
			url:'http://192.168.0.100/api/index.php?userName=' + $('#username2').val() + '&pwd=' + $('#password2').val() + '&type=2' ,//&type=1表示跨域
			async:true,
			success:function (res) {
				var item = JSON.parse(res);*/
				//console.log(item);
				//console.log(item.result);
				/*if (item.result == 1) {
					location.href='index.html';
				} else {
					alert('用户名或者密码错误');
				}				
			}
		})
	}*/
	
	
	
}

