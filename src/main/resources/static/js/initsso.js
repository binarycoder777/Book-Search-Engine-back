$(function(){
		// ticket存在，则把ticket发送到后台，验证ticket是否合法
			if (ticket!=null && ticket!='') {
				var data={
					       'access_token' : ticket,
					       'timestamp':'${.now?string["hhmmSSsss"]}',
					       }
				$.ajax({
				       async:false,
				       url:"https://sso1.nlc.cn/sso/foreign/authenManager/sso-login",
				       type: "GET",
				       dataType: 'jsonp',
				       jsonp: 'callback',
				       data : $.param(data,true),
				       success: function (obj) {
				    	   if(obj.state==0){
				           // alert("验证成功");
				           // alert(obj.user.uid);
				           var ssodata = {
				            'username':obj.user.uid
				           }
				           $.ajax({
				               url:contextPath+'/sso/saveuser',
					       type: 'GET',
				               data:$.param(ssodata,true),
				               success:function(returnObj) {      // 返回json格式，{'result':返回码,’errmsg’:’错误信息’},
							if (returnObj.result == 200) {				// 200表示验证成功
								// document.getElementById('loginOut').style.display
								// = '';//显示登录成功
								var loginHTML = '';
								if (locale == 'zh_CN') {
									loginHTML = '<a href="http://www.nlc.cn/" target="_blank">国图首页</a><span> 欢迎您！'+returnObj.username;
									if(isHomePage=="false"){
										loginHTML+='</span><a href="/">文津搜索首页</a>';
									}
								loginHTML += '<a href="/user/searchHistory">个人中心</a><a href="'+contextPath+'/sso/logoutjump">退出</a><a href="#">意见反馈</a><a href="'+contextPath+'/show/help_EN" target="_blank">帮助</a>';
								}else{
									loginHTML = '<a href="http://www.nlc.cn/" target="_blank">National Library</a><span> Welcome!'+returnObj.username;
									if(isHomePage=="false"){
										loginHTML+='</span><a href="/">WenJin Search</a>';
									}
									loginHTML += '<a href="/user/searchHistory">User Center</a><a href="'+contextPath+'/sso/logoutjump">Logout</a><a href="#">Feedback</a><a href="'+contextPath+'/show/help_EN" target="_blank">Help</a>';
								}
								$("#wjHd .fn_bar .nav").html(loginHTML);
							}
						}
					});
				}else{
					 $.ajax({
			               url:contextPath+'/sso/clearUserInfo',
					success:function(resultObj){}
					 });
					 //location.href = getSSOLoginUrl();

			}
				}
				});
			}

});
