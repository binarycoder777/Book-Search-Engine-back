$(function(){
	window.onload = function() {
		var script = document.createElement("script");
		script.src = "http://api.map.baidu.com/api?v=1.2&callback=doNothing";
		document.getElementsByTagName("head")[0].appendChild(script);
	};

});

var libraryNameArr = [];
var pointXArr = [];
var pointYArr = [];
var url = [];

var map = null;

function mapInit() {
	map = new BMap.Map("map");                  // 创建Map实例
	var point = new BMap.Point(103.397428, 38.30923);    // 创建点坐标
	map.centerAndZoom(point, 5);                    // 初始化地图,设置中心点坐标和地图级别。
	map.enableScrollWheelZoom();                    // 启用滚轮放大缩小。
	map.enableKeyboard();                           // 启用键盘操作。
	map.addControl(new BMap.NavigationControl());
	map.addControl(new BMap.ScaleControl());        // 添加比例尺控件
	map.addControl(new BMap.OverviewMapControl());  //添加缩略地图控件
}

var tipOptions = [];
var marker = [];
var infoWindow = [];
var opts = [];

function buildMap(srcLibraryNameArr, srcPointXArr, srcPointYArr, srcUrl) {
	libraryNameArr = srcLibraryNameArr;
	pointXArr = srcPointXArr;
	pointYArr = srcPointYArr;
	url = srcUrl;
	createMaskDiv();
	mapInit();
	map.clearOverlays();
	try {
	for (var i = 0; i < libraryNameArr.length; i++) {
		addMarker(i);
	}
	}catch (e) {
		alert(e);
	}
}

function addMarker(i) {
	marker[i] = new BMap.Marker(new BMap.Point(pointXArr[i], pointYArr[i]));  // 创建标注
	opts[i] = {
		width : 250,     // 信息窗口宽度
		height: 30,     // 信息窗口高度
//		title : libraryNameArr[i]  // 信息窗口标题
		title : "<a target='_black' href='" + url[i] + "'>" + libraryNameArr[i] + "</a>"  // 信息窗口标题
	};
//	var infoWindow = new BMap.InfoWindow("<a target='_black' href='" + url[i] + "'>跳转</a>", opts[i]);
	var infoWindow = new BMap.InfoWindow("", opts[i]);
	marker[i].addEventListener("click", function(){this.openInfoWindow(infoWindow);});
	map.addOverlay(marker[i]);              // 将标注添加到地图中
}

function createMaskDiv() {
	if($(document.body).height()<$(window).height()){
		$('html').height("100%");
		$(document.body).height("100%");
	}
	var mapContainerDiv = $('#mapContainer');
	var mapDiv = $('#map');
	var closeImg = $('#closeBtn');
	if (mapContainerDiv.size() == 0) {
		mapContainerDiv = $('<div id="mapContainer" style="display:block; position:absolute; z-index:10; background:black; filter:alpha(opacity=30);-moz-opacity:0.3;opacity:0.3;"></div>');
		$("body").append(mapContainerDiv);
		mapDiv = $('<div id="map" style="width:800px; height:600px; z-index:50;"></div>');
		$("body").append(mapDiv);
		closeImg = $('<div id="closeBtn" style="padding:0;z-index:51;"><img style="margin:0;" src="../images/close.png"></img></div>')
		$("body").append(closeImg);
		mapContainerDiv.click(function(){closeImg.hide();mapContainerDiv.hide();mapDiv.hide();$('body').css('overflow','auto');});
		$(document).keydown(function(eventObj){if(eventObj.keyCode == 27) {closeImg.hide();mapContainerDiv.hide();mapDiv.hide();$('body').css('overflow','auto');}});
		mapDiv.click(function(){return false;});
		closeImg.click(function(){closeImg.hide();mapContainerDiv.hide();mapDiv.hide();$('body').css('overflow','auto');});
	}
	document.body.style.overflow = 'hidden';
	mapContainerDiv.width($('body').width());
	mapContainerDiv.height($(document.body).height());
	mapContainerDiv.css('position','absolute');
	mapContainerDiv.css('left',0);
	mapContainerDiv.css('top',0);
	mapDiv.css('position','absolute');
	mapDiv.css('left',(mapContainerDiv.width() - mapDiv.width())/2);
	mapDiv.css('top',$(document).scrollTop()+$(window).height()/6 );
	mapContainerDiv.show();
	mapDiv.show();
	closeImg.css('position','absolute');
	closeImg.css('left', (mapDiv.offset().left + mapDiv.width()  - 20));
	closeImg.css('top', (mapDiv.offset().top - 20));
	closeImg.show();
}

function removeMaskDiv() {
	$('#mapContainer').remove();
	libraryNameArr = [];
	pointXArr = [];
	pointYArr = [];
	url = [];
	document.body.style.overflow = 'scroll';
}

function showLibMap(ele) {
	var nameArr = [];
	var nameHasCoordArr = [];
	var urlArr = [];
	$(ele).parents('div').find('div').each(function(){
		var libName = this.getAttribute('libName');
		if (typeof(libName) == "undefined" || libName == null || libName.length == 0) {
			return;
		}
		nameArr[nameArr.length] = libName;
		var url =  this.getAttribute('url');
		urlArr[urlArr.length] = url == null || url.length == 0 ? "javascript:void(0)" : url;
	});
	if (nameArr.length == 0) {
		return;
	}
	var coordXArr = [];
	var coordYArr = [];
	var coord = null;
	for (var i = 0; i < nameArr.length; i++) {
		coord = libCoord[nameArr[i]];
		if (coord == null || coord.length == 0) {
			continue;
		}
		nameHasCoordArr[nameHasCoordArr.length] = nameArr[i];
		var arr = coord.split(',');
		coordXArr[coordXArr.length] = arr[0];
		coordYArr[coordYArr.length] = arr[1];
	}
	if (coordXArr.length == 0) {
		return;
	}
	buildMap(nameHasCoordArr, coordXArr, coordYArr, urlArr);
}

function doNothing() {}
