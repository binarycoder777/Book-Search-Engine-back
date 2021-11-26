/*
Correctly handle PNG transparency in Win IE 5.5 & 6.
Copyright 2007 Ignia, LLC
Based in part on code from from http://homepage.ntlworld.com/bobosola.

Use in <HEAD> with DEFER keyword wrapped in conditional comments:
<!--[if lt IE 7]>
<script defer type="text/javascript" src="pngfix.js"></script>
<![endif]-->

 */
var arVersion = navigator.appVersion.split("MSIE");
var version = parseFloat(arVersion[1]);
function fixPng() {

	for ( var i = 0; i < document.images.length; i++) {
		var img = document.images[i];
		fix(img);
	}
}
function fix(obj) {
	if ((version >= 5.5 && version < 7.0) && (document.body.filters)) {
		var imgName = obj.src.toUpperCase();
		if (imgName.indexOf(".PNG") > 0) {
			var width = obj.width;
			var height = obj.height;
			var sizingMethod = (obj.className.toLowerCase().indexOf("scale") >= 0) ? "scale": "image";
			obj.runtimeStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+ obj.src.replace('%23', '%2523').replace("'", "%27")+ "', sizingMethod='" + sizingMethod + "')";
			obj.src = contextPath + "/images/blank.gif";
			obj.width = width;
			obj.height = height;
		}
	}

}