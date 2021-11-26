	/**
	 * 指定位置显示$.messager.show
	 * options $.messager.show的options
	 * param = {left,top,right,bottom}
	 */
	$.extend($.messager, {
		showBySite : function(options,param) {
			var site = $.extend( {
				left : "",
				top : "",
				right : 0,
				bottom : -document.body.scrollTop
						- document.documentElement.scrollTop
			}, param || {});
			var win = $("body > div .messager-body");
			if(win.length<=0)
				$.messager.show(options);
			win = $("body > div .messager-body");
			win.window("window").css( {
				left : site.left,
				top : site.top,
				right : site.right,
				zIndex : $.fn.window.defaults.zIndex++,
				bottom : site.bottom
			});
		}
	});