

//传入父节点，删除它子节点中的空白文本节点
function deleteSpace(node){
    if(navigator.appName == "Microsoft Internet Explorer"&&parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE",""))<9){
        return node;
    }else {
        if(node!=null)
        {
            var childs = node.childNodes;
              for(var i = 0;i < childs.length;i ++){
                if(childs[i].nodeType === 3 && /^\s+$/.test(childs[i].nodeValue)){
                    node.removeChild(childs[i]);
                }
            }
            return node;
        }
    }

}

//初始化搜索框的关键词下拉选项
function initInputSelect() {
    var input=$(".search_text").val();
    var searchText = "";
    var gjtext = "";
    var isxl = false;
    $(".item_text").click(function () {
       // var ipt = $('input.search_text')
       // ipt.val("");
        searchText = $(this).attr("title");
        if (searchText != "全部"&&searchText != "All") {
            var ipt = $('input.search_text')
             if(ipt==null|| ipt.val()==ipt.attr('defaultValue') )
             { ipt.val(""); }



            $(this).parent().parent().find(".item_text").removeClass("item_text_select")
            $(this).addClass("item_text_select")
            $(".sxk").css("visibility", "visible")
            $(".search_text").css("padding-left", "120px")

            $(".search_text_input").css("width", "520px")

            if (isxl == true) {
                $(".xl_list").css("visibility", "hidden")
                isxl = false;
            }
            fillTargetFields(searchText);


        }
        else {
            gjtext = "全部";
            $(this).parent().parent().find(".item_text").removeClass("item_text_select")

            $(this).addClass("item_text_select")

            var ipt = $('input.search_text')
            if(ipt==null||ipt.val()==ipt.attr('defaultValue'))
            {
                ipt.val(ipt.attr('defaultValue'))
                ipt.css('color', '#999999')
            }


            $(".sxk").css("visibility", "hidden")
            $(".bottom_icon").css("visibility", "hidden")

            $(".sxk_name").css("visibility", "hidden")

            $(".search_text").css("padding-left", "20px")
            $(".search_text_input").css("width", "630px")
            if (isxl == true) {
                $(".xl_list").css("visibility", "hidden")
                isxl = false;
            }
        }
    })

    $(".sxk").click(function () {
        if (isxl == false) {
            $(".xl_list").css("visibility", "visible")
            isxl = true;
        } else {
            $(".xl_list").css("visibility", "hidden")
            isxl = false;
        }
    })

    $('body').on('click', '.xl_item', function (event) {
         gjtext = event.currentTarget.id;
        $(".sxk_name").text(event.currentTarget.id)
        $(".xl_list").css("visibility", "hidden")
        isxl = false;
    })


    $(".search_text").val(input);

}

// 搜索框的检索字段下拉层填充
function fillTargetFields(curCtg) {
    if(curCtg!=undefined&&curCtg!=null)
    {
        $(".sxk_name").text(allFields);

        var commonFields = getCommonFields(curCtg);


        var html = "<div class=\"xl_item\" id=" + allFields + " >" + allFields + "</div>";
        for (var j = 0; j < commonFields.length; j++) {
            html += "<div class=\"xl_item\" id=" + commonFields[j] + "  >" + commonFields[j] + "</div>";
        }
        $(".xl_list").html(html)
        $(".sxk").css("visibility","visible");
        $(".bottom_icon").css("visibility","visible");
        $(".sxk_name").css("visibility","visible");
    }


}

// 获取所选一级分类的公共字段
function getCommonFields(topCtg) {

    return getAllFields(topCategories[topCtg]);
}

function getAllFields(scdCtgArr) {
    var result = [];
    var curArr = [];
    var isFirst = true;
    if (typeof(scdCtgArr) == "undefined" || scdCtgArr == null || scdCtgArr.length == 0) {
        result.push("quanbu");
        return;
    }
    for (var i = 0; i < scdCtgArr.length; i++) {
        curArr = secondaryCateories[scdCtgArr[i]];
        for (var j = 0; j < curArr.length; j++) {
            var resultStr = result.join();
            if (resultStr.indexOf(curArr[j]) < 0) {
                result.push(curArr[j]);
            }
        }

    }
    return result;
}

function autocomplete() {

    var suggestServer = "http://find.nlc.cn/suggest/?";
// init autocomplete  搜索框自动补全
    $("input.search_text_input:eq(0)").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: suggestServer,
                data: {
                    type: 1,
                    token: request.term
                },
                dataType: "jsonp",
                success: function (data) {
                    response($.map(data, function (e) {
                        return e.value
                    }));
                },
                complete: function (a, b, c, d) {
                    a;
                }
            });
        },
        minLength: 1,
        select: function (event, ui) {
            $(this).val(ui.item.value);
//			$(this).parent().parent().find("input.submitBtn").click();
        },
        open: function (event, ui) {
            $(this).autocomplete("option", "disabled", false);
        }
    });


}

//初始化顶部搜索框
function initSearchBar() {
    var ipt = $('input.search_text');
    var value;
    if (typeof(iptValue) != 'undefined') {
        value = iptValue;
        $('.search_text').val(value);
    }
    else {
        if (typeof(preQuery) != 'undefined') {
            value = preQuery;
            $('.search_text').val(value);
        }
    }
    var defaultKeyword = '';
    if ($('.item_text_select').attr("id") == "全部" || $('.item_text_select').attr("id") == undefined) {
        defaultKeyword = ipt.attr('defaultValue');
        ipt.val(defaultKeyword);
         ipt.css('color', '#999999');
    }
    else {
        defaultKeyword = '';
        ipt.val(defaultKeyword);

    }

    ipt.focus(function () {
        if (this.value == defaultKeyword) {
            this.value = '';
            $('.search_text').css("color", '#000');
            // keywordInputted = true;
        }

        if ($('.item_text_select').attr("id") != "全部") {
            $('.search_text').css("color", '#000');

        }

    });

    ipt.blur(function () {
        if (!this.value || this.value.length == 0 || this.value.replace(/\s+/g, '').length == 0) {
            if ($('.item_text_select').attr("id") == "全部") {
                this.value = defaultKeyword;
                $('.search_text').css("color", '#999');
                // keywordInputted = false;
            }
        }
    });


    $('input.search_text_input').keydown(function (eventObj) {
        if (eventObj.keyCode == 13) {
            $(this).blur();
            var btnId = this.getAttribute('btnId');
            if (typeof(btnId) != "undefined" && btnId != null && btnId.length > 0) {
                // keywordInputted = true;
                $('.' + btnId).click();
            }
        }
    });


    if (value && value.length > 0 && value != defaultKeyword) {
        ipt.val(value);
        $('.search_text').css("color", '#000');


    }
    ipt.blur();

};

// 检索词长度检查
function isValidKeyword(keyword, len, defaultValue) {
    if (typeof(defaultValue) != "undefined" && defaultValue != null && keyword == defaultValue) {
        return false;
    }

    var keyLen = 0;
    for (var i = 0; i < keyword.length; i++) {
        if (isChinese(keyword.charAt(i))) {
            keyLen += 2;
        } else {
            keyLen += 1;
        }
    }
    if (keyLen > len) {
        var msg = '';
        if (locale == 'en_US') {
            msg = 'keyword should be no longer than' + len / 2 + ' Chinese character or ' + len + 'English character';
        } else {
            msg = '最多输入' + len / 2 + '个汉字或' + len + '个英文字符';
        }
        alert(msg);
        return false;
    }
    return true;
}


// 得到检索条件的json对象
function getSearchArgs(query, secQuery, actualQuery) {
    if (!isValid(query))        query = '';
    if (!isValid(secQuery))        secQuery = '';
    if (!isValid(actualQuery))    actualQuery = '';

    if (query.length == 0 && actualQuery.length == 0) {
        return null;
    }

    if (actualQuery.length > 0 && query.length > 0 && secQuery.length > 0) {

        // 修正bug 二次检索翻页结果越来越少
        if (actualQuery.indexOf(query + ' AND ' + secQuery) >= 0) {
            actualQuery = query + ' AND ' + secQuery + actualQuery.substring((query + ' AND ' + secQuery).length);
        } else {
            actualQuery = query + ' AND ' + secQuery + actualQuery.substring(query.length);
        }
        // 修正bug 二次检索翻页结果越来越少
//		actualQuery = query + ' AND ' + secQuery + actualQuery.substring(query.length);
    }

    if (actualQuery.length == 0) {
        if (query.length > 0) {
            actualQuery = query;
        }
        if (secQuery.length > 0) {
            actualQuery += ' AND ' + secQuery;
        }
    }

    return {
        'query': query,
        'secQuery': secQuery,
        'actualQuery': actualQuery
    };
}

// 判断是否合法
function isValid(arg) {
    return !(arg === undefined || arg === null);
}
// 判断是否是中文字符
function isChinese(str) {
    var lst = /[\u4e00-\u9fa5]/;
    return lst.test(str);
}

String.prototype.Trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}


function getQueryString() {
    var result = location.search.match(new RegExp("[/?/&][^/?/&]+=[^/?/&]+", "g"));
      var href = "";
    if (typeof(result) != 'undefined' && result != null && result != "") {
        for (var i = 0; i < result.length; i++) {
            href += result[i].substring(1) + "||";
        }
        if (href != null && href != "") {
            href = href.substring(0, href.length - 2);

        }
        return href;
    }
    return null;
}

/*
function  jum(rest) {
    alert("jum");
    if(rest!=null&&rest.length>0)
    {
        var result = location.search.match(new RegExp("[/?/&][^/?/&]+=[^/?/&]+", "g"));
         var href = "";
        if (typeof(result) != 'undefined' && result != null && result != "") {
            for (var i = 0; i < result.length; i++) {
                href += result[i].substring(1) + "||";
            }
            if (href != null && href != "") {
                 if(rest!=null&&rest!="")
                 { href+=rest;}

                href = href.substring(0, href.length - 2);

            }

            window.location= href;
        }
        return null;

    }

}*/


function getQueryStringResultList() {
     rest=window.location.hash;
    alert("getQueryREsl"+rest);
    var result = location.search.match(new RegExp("[/?/&][^/?/&]+=[^/?/&]+", "g"));
     var href = "";
    if (typeof(result) != 'undefined' && result != null && result != "") {
        for (var i = 0; i < result.length; i++) {
            href += result[i].substring(1) + "||";
        }
        if (href != null && href != "") {
            if(rest!=null&&rest!="")
            { href+=rest;}

            href = href.substring(0, href.length - 2);

        }
        return href;
    }
    return null;
}


//登录
function getSSOLoginUrl() {

    var baseLoginUrl = "http://sso1.nlc.cn/sso/jsp/reader_login.jsp?appId=90001&paramUrl=http://" +
        window.location.host + window.location.pathname + "?ssoparam=";

    var qs = getQueryString();

    if (qs != null) {
        qs = qs + "||fromGuoTu=fromGuoTu";
    } else {
        qs = "fromGuoTu=fromGuoTu";
    }
    var encodeQs = encodeURIComponent(encodeURIComponent(qs));
    var ssoLoginUrl = baseLoginUrl + encodeQs;
     return ssoLoginUrl;

}


//登录
function getSSOLoginUrlResultList() {

    var baseLoginUrl = "http://sso1.nlc.cn/sso/jsp/reader_login.jsp?appId=90001&paramUrl=http://" +
        window.location.host + window.location.pathname + "?ssoparam=";

    var qs = getQueryStringResultList();

    if (qs != null) {
        qs = qs + "||fromGuoTu=fromGuoTu";
    } else {
        qs = "fromGuoTu=fromGuoTu";
    }
    var encodeQs = encodeURIComponent(encodeURIComponent(qs));
    var ssoLoginUrl = baseLoginUrl + encodeQs;
    /*return ssoLoginUrl;*/
    window.location=ssoLoginUrl;

}

//首页和其他也面的上方检索按钮
function indexSearch(fromHome) {


    //var query = $('#keywordIpt').val().replace(/[\\\^\"\&]/g,"").replace(/(--)/g, '').replace(/\'/g, ' ');   //去掉'\',\^\等特殊字符
    var query = $('#keywordIpt').val().replace(/[\\\^\"\&]/g, "").replace(/(--)/g, '').replace(/<|>|\||&|%|@|,|\;|\$/g, '');
//	if (!query || query.length == 0 || !keywordInputted || query.Trim().length == 0) {
    if (!query || query.length == 0 || query.Trim().length == 0) {
        $('#keywordIpt').val("");
        return;
    }
    query = query.Trim();
    var defaultValue = $('#keywordIpt').attr("defaultvalue");
    if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) {
        if (!isValidKeyword(query, 30, defaultValue)) {
            return;
        }
    }
    if (!isValidKeyword(query, 60, defaultValue)) {
        return;
    }
    var targetField = $(".sxk_name").text();

    var actualQuery = query;
    var extraUrl = '';

    var docType = $('.item_text_select').attr("title");
    if (typeof(docType) != 'undefined' &&
        docType != null &&
        docType.length > 0) {

        extraUrl += '&docType=' + encodeURIComponent(docType);

        // 媒体类型
        var secArr = topCategories[docType];
        if (typeof(secArr) != 'undefined' && secArr != null) {
            var subTypes = [];
            for (var i = 0; i < secArr.length; i++) {
                subTypes.push(categoriesCode[secArr[i]]);
            }
            if (subTypes.length > 0) {
                actualQuery += ' mediatype:(' + subTypes.join(' OR ') + ') ';
            }
            extraUrl += "&mediaTypes=" + subTypes.join(',');

            // 检索字段
            if (typeof(targetField) != 'undefined' &&
                targetField != null &&
                targetField.length > 0 &&
                targetField != $(".sxk_name").attr('defaultText')) {
                actualQuery += ' ' + encodeURIComponent(fieldsCode[targetField]) + ':(' + query + ') ';
                extraUrl += '&targetField=' + encodeURIComponent(fieldsCode[targetField]);
            }
        }

        //添加targetfiledlog
        var targetFieldLog = targetField;
        if (typeof(targetFieldLog) == "undefined" || targetFieldLog == null || targetFieldLog.length == 0) {
            if (locale == 'zh_CN') {
                targetFieldLog = "全部字段";
            } else {
                targetFieldLog = "All Field";
            }
        }
        extraUrl += "&isGroup=isGroup";
        extraUrl += "&targetFieldLog=" + encodeURIComponent(targetFieldLog);

    }
    $('#instant-search-btn').attr('disabled', "true");
    search(2, query, null, actualQuery, extraUrl, null, fromHome);
}

//除去使用ajax进行检索之外的检索都掉用此search
function search(searchType, query, secQuery, actual, extra, orgin, fromHome, isOpenNewPage) {
      if (!query || query.length == 0 || query == $('input.search_text').attr('defaultValue')) {

        return;
    }
    if (secQuery != null && typeof(secQuery) != 'undefined') {
        if (secQuery == $('.search_text_bottom').attr('defaultValue')) {

            return;
        }

    }

    var args = getSearchArgs(query, secQuery, actual);
    if (args == null) {
        return;
    }

    var url = contextPath + '/search/doSearch'
        + '?query=' + encodeURIComponent(args.query)
        + '&secQuery=' + encodeURIComponent(args.secQuery)
        + '&actualQuery=' + encodeURIComponent(args.actualQuery)
        + '&searchType=' + encodeURIComponent(searchType);
    if (isValid(orgin)) {
        url += '&orginQuery=' + encodeURIComponent(orgin);
    }
    if (typeof(extra) == "undefined" || extra == null) {
        extra = '';
    }

    if (!(/.*?(&docType)/i.test(extra))) {
        if (locale == 'zh_CN') {
            extra += "&docType=" + encodeURIComponent("全部");
        } else {
            extra += "&docType=" + encodeURIComponent("All");
        }
    }

    if (!(/.*?(&targetFieldLog)/i.test(extra))) {
        if (locale == 'zh_CN') {
            extra += "&targetFieldLog=" + encodeURIComponent("全部字段");
        } else {
            extra += "&targetFieldLog=" + encodeURIComponent("All Field");
        }
    }
    // added by guohuaxue
    if (typeof (orderBy) == 'undefined' || orderBy != null || orderBy.length == 0) {
        if (typeof (defaultOrderBy) != "undefined" && defaultOrderBy != null
            && defaultOrderBy.length > 0) {
            orderBy = defaultOrderBy;
            extra += '&orderBy=' + defaultOrderBy;

        }
    }


    if (typeof (orderBy) != 'undefined' && orderBy != null && orderBy.length != 0 && orderBy != "RELATIVE") {

        extra = extra.replace("&isGroup=isGroup", "");
    }

    if (isValid(extra)) {
        url += extra;
    }
    if (isValid(fromHome)) {
        url += '&fromHome=' + fromHome;
    }
    if (isOpenNewPage != null && isOpenNewPage == "yes") {
        window.open(url);
    } else {
        window.location = url;
    }

}


// 下拉列表选中默认值
function initSelectElements() {
    $('select').each(function () {
        var dftValue = this.getAttribute('defaultValue');
        if (!dftValue || dftValue.length == 0) {
            return;
        }
        for (var i = 0; i < this.childNodes.length; i++) {
            if (dftValue == this.childNodes[i].value) {
                this.childNodes[i].selected = true;
                return;
            }
        }
    });
}


function getSameFields(scdCtgArr) {
    var result = [];
    var curArr = [];
    var isFirst = true;
    for (var i = 0; i < scdCtgArr.length; i++) {
        curArr = secondaryCateories[scdCtgArr[i]];
        for (var j = 0; j < curArr.length; j++) {
            if (isFirst) {
                result.push(curArr[j]);
            } else {
                result = retainAll(result, curArr);
            }
        }
        if (isFirst) {
            result = result;
        }
        isFirst = false;
    }
    return result;
}


function retainAll(arr1, arr2) {
    var result = [];
    var i = 0;
    if (typeof(arr1) != "undefined" && typeof(arr2) != "undefined" && arr1.length > 0 && arr2.length > 0) {
        for (var i = 0; i < arr1.length; i++) {
            for (var j = 0; j < arr2.length; j++) {
                if (arr1[i] == arr2[j]) {
                    result[result.length] = arr1[i];
                    break;
                }
            }
        }
    }
    return result;
}


// 获取指定长度的字符串
function getStrOfAssignedLen(str, maxLen) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        if (isChinese(str.charAt(i))) {
            len += 2;
        } else {
            len += 1;
        }
        if (len > maxLen) {
            break;
        }
    }
    if (i < str.length) {
        return str.substring(0, i) + '...';
    } else {
        return str;
    }
}

// 改变图片的大小
function changeImgSize(img, w, h) {
    var widthRate = ($(img).width()) / w - 1;
    var heightRate = ($(img).height()) / h - 1;
    var widthAfter;
    var heightAfter;
    if (widthRate > 0 && widthRate >= heightRate) {
        widthAfter = w;
        heightAfter = w * $(img).height() / $(img).width();
    } else if (heightRate > 0 && heightRate >= widthRate) {
        heightAfter = h;
        widthAfter = h * $(img).width() / $(img).height();
    } else {
        widthAfter = $(img).width();
        heightAfter = $(img).height();
    }
    $(img).css("width", widthAfter + "px");
    $(img).css("height", heightAfter + "px");
    ///$(img).css("margin-top", "-" + (heightAfter / 2) + "px");
//	$(img).css("margin-left", "-" + (widthAfter / 2)  + "px");
}
