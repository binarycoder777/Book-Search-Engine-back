
function rawurlencode(str) {
    str = (str + '').toString();
    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A');
}


function copyMagnetLink(){
    var testCode=document.getElementById("MagnetLink").value;
    if(copy2Clipboard(testCode)!=false){
        alert("已经复制到粘贴板，你可以使用Ctrl+V 贴到需要的地方去了哦！  ");
    }
}

copy2Clipboard=function(txt){
    if(window.clipboardData){
        window.clipboardData.clearData();
        window.clipboardData.setData("Text",txt);
    }
    else if(navigator.userAgent.indexOf("Opera")!=-1){
        window.location=txt;
    }
    else if(window.netscape){
        try{
            netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
        }
        catch(e){
            alert("您的firefox安全限制限制您进行剪贴板操作，请打开’about:config’将signed.applets.codebase_principal_support’设置为true’之后重试，相对路径为firefox根目录/greprefs/all.js");
            return false;
        }
        var clip=Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
        if(!clip)return;
        var trans=Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
        if(!trans)return;
        trans.addDataFlavor('text/unicode');
        var str=new Object();
        var len=new Object();
        var str=Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
        var copytext=txt;str.data=copytext;
        trans.setTransferData("text/unicode",str,copytext.length*2);
        var clipid=Components.interfaces.nsIClipboard;
        if(!clip)return false;
        clip.setData(trans,null,clipid.kGlobalClipboard);
    }
}


var viewMore = document.getElementById('viewMoreUsedbtn');
viewMore.onclick = function(){
    var allBox = document.getElementsByClassName("trhide"),
    i, len;
    for(i=0, l = allBox.length; i < l; i++){
        allBox[i].style.display = "block";
    }
    viewMore.style.display = 'none';
}


var muerbt = muerbt || {
    getCookie: function(name) {
        var n = name + '=';
        var cl = document.cookie.split(';');
        for (var i = 0; i < cl.length; i++) {
            var ci = cl[i].trim();
            if (ci.indexOf(n) == 0) {
                return ci.substring(n.length, ci.length)
            }
        }
        return ''
    },
    setCookie: function(name, value, expireHours) {
        var d = new Date();
        d.setTime(d.getTime() + expireHours * 3600 * 1000);
        document.cookie = name + '=' + value + ';path=/;expires=' + d.toGMTString()
    }
};

function checkMobile() {
    var ua = navigator.userAgent;
    if (ua) {
        ua = ua.toLowerCase();
        var ignoreUa = ['ip', 'android', 'uc', 'phone', 'pad', 'bot', 'spider', 'slurp'];
        for (var i = 0; i < ignoreUa.length; i++) {
            if (ua.indexOf(ignoreUa[i]) > -1) return true
        }
    }
    return window.screen.width < 1024
}
function checkSpider() {
    var ua = navigator.userAgent;
    if (ua) {
        ua = ua.toLowerCase();
        var ignoreUa = ['bot', 'spider', 'slurp'];
        for (var i = 0; i < ignoreUa.length; i++) {
            if (ua.indexOf(ignoreUa[i]) > -1) return true
        }
    }
}
function checkSys() {
    var sys = muerbt.getCookie("sys");
    if (!sys) {
        var system = {
            win: false,
            mac: false,
            xll: false,
            ipad: false
        };
        var p = navigator.platform;
        system.win = p.indexOf("Win") == 0;
        system.mac = p.indexOf("Mac") == 0;
        system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
        system.ipad = (navigator.userAgent.match(/iPad/i) != null) ? true : false;
        var m = (system.win == 0 && system.mac == 0 && system.xll == 0) ? 0 : 1;
        muerbt.setCookie("sys", m, 1000)
    }
};
var isMobile = checkMobile();
var isSpider = checkSpider();

checkSys();

function isFirstPage() {
    var s = window.location.href.substring(window.location.href.lastIndexOf('/'));
    if (s.indexOf('/1') > -1) return true;
    if (s.indexOf('-') < 0) return true;
    return false
}

function generateRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

function createxmlHttpRequest() {
    var xmlHttp;
    if (window.ActiveXObject) {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    } else if (window.XMLHttpRequest) {
        xmlHttp=new XMLHttpRequest();
    }
    return xmlHttp;
}

function addFav() {
    xmlHttp = createxmlHttpRequest();
    xmlHttp.open("GET",'/favorite.html');
    xmlHttp.send(null);
    var url = window.location;
    var title = document.title;
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("360se") > -1) {
        alert("由于360浏览器功能限制，请按 Ctrl+D 手动收藏！");
    }else if (ua.indexOf("msie 8") > -1) {
        window.external.AddToFavoritesBar(url, title); //IE8
    }else if (document.all) {
        try{
            window.external.addFavorite(url, title);
        }catch(e){
            alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
        }
    }else if (window.sidebar) {
        window.sidebar.addPanel(title, url, "");
    }else {
        alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
    }
}


function creat_fh(key){
    var url = '/cfanhao/' + encodeURIComponent(key);
    xmlHttp = createxmlHttpRequest();
    xmlHttp.open("GET",url);
    xmlHttp.send(null);
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4) {
            if (xmlHttp.status == 200) {
                var text = xmlHttp.responseText;
                if(text != 0 ){
                    document.getElementById("cfh").style.display = 'none';
                    document.getElementById("sfh").innerHTML = '番号：<span class="red" >' + text + '</span>';
                    if(window.clipboardData){
                        window.clipboardData.clearData();
                        window.clipboardData.setData("Text",txt);
                    }
                    alert('生成成功，番号：' + text + '\n\n赶快发送分享给朋友吧');
                }else{
                    alert('番号生成失败');
                }
            }else{
                alert('番号生成失败');
            }
        }
    }
}

