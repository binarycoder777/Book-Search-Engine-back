///home/zhp/tools/idea/plugins/JavaScriptLanguage/lib/JavaScriptLanguage.jar!/com/intellij/lang/javascript/index/predefined/EcmaScript.js

$(function () {
    initdocType();                  //初始化搜索框下面种类选择以及搜索框里面推荐种类的子分类
    initSearchBar();
    autocomplete();//初始化自动补全
    initShowMoreClick();            //初始化showMoreClick事件
    initShowMore();　　　 　　　　　　　　　//初始化更多标签显示
    initRelativeQueries();    // 在搜索结果页面加载相关搜索词
    initInputSelect();//初始化搜索框的下拉选项
    initSelectElements();          // 初始化所有页面上的select控件，自动选中value值
    initHashHandler();          // 初始化hashchange事件监听
    initResultFieldSlt();       // 初始化列表页的检索字段下拉列表
    initOrderBySlt();           // 初始化列表页的排序下拉框
    initCheckBoxEvent();        // 初始化结果列表页面checkbox外层超链接事件
  /*  initDocGetLink();              // 多版本地址在线阅读*/
    var oUl = document.getElementById("paging"); //获取ul节点
    if(oUl!=null)
    {deleteSpace(oUl);}


    if (location.hash && location.hash.replace(/^#/, '').length > 0) {
        $(window).hashchange();
    }
    var ms_ie = false;
    var ua = window.navigator.userAgent;
    var old_ie = ua.indexOf('MSIE ');
    var new_ie = ua.indexOf('Trident/');

    if ((old_ie > -1) || (new_ie > -1)) {
        ms_ie = true;
    }

    if ( ms_ie ) {
        document.documentElement.className += " ie";
    }
   /* rest=null;*/

});
var overlay = null;
var overLayShow = false;

var loginLink = "";
function initBookGetterDialogResize() {
    $(window).wresize(function () {
        getOverlay();
    })
}

function getOverlay() {
    if (overLayShow) {
        showBookGetterDialog();
    }
}
// 打开详情页面在线阅读弹出框
function showBookGetterDialog() {
    $('html').height("100%");
    $(document.body).height("100%");

    if (!overlay) {
        overlay = $('<div style="display:block; position:absolute; z-index:10; background:black; filter:alpha(opacity=30);-moz-opacity:0.3;opacity:0.3;"></div>');
        $(document.body).append(overlay);
    }
    overlay.width($('body').width());
    overlay.height($(document).height());
    overlay.css('position', 'absolute');
    overlay.css('left', 0);
    overlay.css('top', 0);
    overlay.show();
    overLayShow = true;
    overlay.click(function () {
        closeDialog();
    });
    var leftOft = $(window).width() < 400 ? 100 : ($(window).width() - 400) / 2;
    var topOft = $(window).height() < 180 ? 100 : ($(window).height() - 400) / 3;
    $('#tipInfoDialog').css('left', leftOft + 'px');
    $('#tipInfoDialog').css('top', topOft + 'px');
    overlay.after($('#tipInfoDialog'));
    $('#tipInfoDialog').show();
}

// 关闭详情页在线阅读弹出框
function closeDialog() {
    $('#tipInfoDialog').hide();
    overLayShow = false;
    var replacelink = '<a href="' + location.href + '" id="loginLink" target="_blank" class="btn_b">' + loginTip + '</a><a href="#" class="btn_g" id="otherLink" target="_blank" style="display:none"></a>';
    $('#loginTipInfo').html(needlogin);
    $('#loginLink').parent().html(replacelink);
    $("#closeDialog").show();
    overlay.hide();
  /*  initDocGetLink();*/
}

function error() {
    alert("该数据库馆外不能提供在线阅读");

}

// 在线阅读
function onlineRead(e,isInnerIP,isTsingHuaTongFangLink,isSamlLink,isVpnLink) {
    //alert("innerip="+isInnerIP+"|tsinghuatongfanglink="+isTsingHuaTongFangLink+"|samllink="+isSamlLink+"|vpnlink="+isVpnLink);
       
    if (isUserLogin) {
         window.open($(e).attr("online"));
    } else {
         var directLinkMessage="查看原网页";
         if (isInnerIP != true && isSamlLink == true) {
            if (isTsingHuaTongFangLink == true){
               $('#otherLink').attr('href', "http://kns.cnki.net/kns/brief/result.aspx?dbprefix=SCDB");
               $('#otherLink').html(directLinkMessage);
               $('#otherLink').show();
            }
         }
        
         showBookGetterDialog();
    }

}

// 多版本地址在线阅读
function initDocGetLink(e) {

    if (isUserLogin) {
      /*  $("span[name=hrefEleSrc]").click(function () {*/
            window.open($(e).attr("hrefSrc"));
       /* });*/
    } else {
      /*  $("span[name=hrefEleSrc]").click(function () {*/
            showBookGetterDialog();
       /* });*/
    }

}
function login() {
    window.open(getSSOLoginUrl());
}


function initdocType() {
    var select = $('[title="all"]');
    if (docType != null) {
        select = $('[title=' + docType + ']');
    }

    select.attr("class", "item_text item_text_select");


    if (docType != "全部"&&docType != "All") {
        fillTargetFields(select.attr("title"));
        $(".search_text").css("padding-left", "120px")
        $(".sxk").css("visibility", "visible");
        $(".bottom_icon").css("visibility", "visible");
        $(".sxk_name").css("visibility", "visible");
        $(".sxk_name").text(targetFieldLog);
    }
    else {
        $(".search_text").css("padding-left", "20px")
    }


}

function initHashHandler() {
    var isFirst = false;
    $(window).bind('hashchange', function () {
       /* alert("restRes"+rest);

        jum(rest);*/
        var hash = decodeURIComponent(location.hash);
        var args = {};
        var hashValue = '';
        if (hash && (hashValue = hash.replace(/^#/, '')).length > 0) {
            var main = $('#body');
            $(".loading").show();
            hashValue = hash.replace(/^#/, '');
            var mtArr = [];
            var keyValues = hashValue.split('||');
            for (var i = 0; i < keyValues.length; i++) {
                var kv = keyValues[i].split('--');
                if (kv.length == 2) {
                    args[kv[0]] = kv[1];
                }
            }
            args['searchType'] = 2;

            $.post(
                contextPath + '/search/ajaxSearch',
                args,
                function (data) {
                    $(".loading").hide();
                    $('#body').html(data);
                    var curArea = $('#curArea').html();
                    if (orginArea != null && orginArea.length > 0 && curArea.length > 0 && hasSelected && oldArea == curArea) {
                        $('.mNav[curArea=' + curArea + ']').html(orginArea);
                    }
                    $('#totalCnt').text(resultCount);

                    var chkItemIdxs = '';
                    if (hashValue.indexOf('chkItemIdx') != -1) {
                        chkItemIdxs = hashValue.substring(0, hashValue.indexOf('||'));
                    }
                    var chkIdxArr = new Array();
                    if (chkItemIdxs.length > 0) {
                        chkIdxArr = chkItemIdxs.split('--')[1].split(',');
                    }
                    var chkBoxes = $('input[type=checkbox]');
                    for (var i = 0; i < chkBoxes.length; i++) {
                        chkBoxes[i].checked = false;
                    }
                    mtArr = [];
                    if (chkIdxArr.length > 0) {
                        for (var i = 0; i < chkIdxArr.length; i++) {
                            $(':checkbox[aid="' + chkIdxArr[i] + '"]').attr('checked', true);

                            var po=$(':checkbox[aid="' + chkIdxArr[i] + '"]').parent().parent().parent().find(".two_che");

                            var a=po.length;
                            var b=0;
                            for(var j=0;po.length>j;j++){

                                if(po[j].checked==true)
                                {
                                    b+=1;
                                }
                            }
                            if(b==a)
                            {
                                $(':checkbox[aid="' + chkIdxArr[i] + '"]').parent().parent().parent().find("div > a > input").attr("checked", true);
                            }
                            else {
                                $(':checkbox[aid="' + chkIdxArr[i] + '"]').parent().parent().parent().find("div > a > input").attr("checked", false);

                            }
                            if ($(':checkbox[aid="' + chkIdxArr[i] + '"]').attr('field') == 'mediatype') {
                                mtArr[mtArr.length] = $(':checkbox[aid="' + chkIdxArr[i] + '"]').parents('a').attr('title');
                            }
                        }
                    }




                    // init query field options
                    var fields = getSameFields(mtArr);


                    /* $("#fldText").css("display","block");*/
                    $(".two_che").css("display", "block");

                    var html =  $(".allField").html();
                    for (var i = 0; i < fields.length; i++) {
                        html += '' +
                            '<a  class="dropdown_box_item_a"  href="javascript:void(0);"' +
                            ' fldText="' + fields[i] + '"' +
                            ' code="' + fieldsCode[fields[i]] + '"><div class="dropdown_box_item">'
                            + getStrOfAssignedLen(fields[i], 30) + '</div></a>';


                    }
                    if (html == '') {
                        html = '<a  class="dropdown_box_item_a"  href="javascript:void(0);"    code="all"><div class="dropdown_box_item">  全部检索字段</div></a>';
                    }
                    $('#dropdown_box_1').html(html);
                    bindOptionClick();

                    // init order by select
                    if (typeof(orderBy) != "undefined" && orderBy != null && orderBy.length > 0) {
                        $('.all_paixu_val').html($('a[code=' + orderBy + ']').find(".dropdown_two_item").html());
                      } else {
                        $('#orderByText').html($('a[code="RELATIVE"]').html());

                          }


                    // init query field select
                    if($('#fldText').html().trim()!=null&&$('#fldText').html().trim().length>0)
                    {
                        $('.all_field_val').html(getStrOfAssignedLen($('#fldText').html(), 30));

                    }
                    else
                    {
                        $('.all_field_val').html("全部检索字段");

                    }
                     if( $('.all_field_val').html().trim()==null)
                     {
                         $('.all_field_val').html("全部检索字段");

                     }



                    if (showcountflag == 1) {

                        $(".wai_che").find(':checkbox').attr('checked', 'true');
                    } else {
                        $(".wai_che").find(':checkbox').removeAttr('checked');
                    }
                    window.scrollTo(0, 0);
                    initRelativeQueries();    // 在搜索结果页面加载相关搜索词
                    initOrderBySlt();           // 初始化列表页的排序下拉框
                   initResultFieldSlt();       // 初始化列表页的检索字段下拉列表
                    //initHashHandler();          // 初始化hashchange事件监听
                    initCheckBoxEvent();        // 初始化结果列表页面checkbox外层超链接事件
                    initShowMore();            //初始化列表页左侧删选标签

                    var oUl = document.getElementById("paging"); //获取ul节点
                    deleteSpace(oUl);
                    if (hasSelected) {
                        showMoreObject.reset(curArea);
                    } else {
                        showMoreObject.reset();
                    }
                    initSearchBar();
                }
            );

        } else {
            var url = window.location.href;
            window.location = url.replace('#', '');
            window.scrollTo(0, 0);
        }
    });
}

/*缩小检索范围的年份筛选*/
function yearSearch() {
    var yearFrom = $("#start_year").val();
    var yearTo = $("#end_year").val();
    if (yearFrom.length < 1) {
        yearFrom = 1000;
    }
    if (yearTo.length < 1) {

        yearTo = 2030;
    }
    var yearRegex = /^[1-9]\d{0,3}$/;
    if (yearFrom && yearFrom.length > 0 && !yearRegex.test(yearFrom)) {
        if (locale == 'zh_CN') {
            alert("开始年份格式有误");
        } else {
            alert("year data format error");
        }
        return;
    }

    if (yearTo && yearTo.length > 0 && !yearRegex.test(yearTo)) {
        if (locale == 'zh_CN') {
            alert("截至年份格式有误");
        } else {
            alert("year data format error");
        }
        return;
    }

    if (yearTo && yearTo.length > 0 && yearFrom && yearFrom.length > 0 && yearTo - yearFrom < 0) {
        if (locale == 'zh_CN') {
            alert("开始年份不能大于结束年份");
        } else {
            alert("year range error");
        }
        return;
    }
    if (yearTo - '3000' > 0) {
        if (locale == 'zh_CN') {
            alert("结束年份不能大于3000");
        } else {
            alert("end year should be no more than 3000");
        }
        return;
    }
    else {
        //  alert("搜索成功");
        var expression = $("#keywordIpt").val().replace(/(--)/g, '').replace(/\'/g, ' ');
        var keyword = $("#keywordIpt").val().replace(/(--)/g, '').replace(/\'/g, ' ');
        var extra = "";
        extra = "&docType=" + encodeURIComponent($(".item_text_select").find("title").val());
        extra += "&targetFieldLog=" + encodeURIComponent($("-0").val());

        if (yearFrom.length > 0) {
            expression += ' AND yearint>=' + yearFrom;
        }
        if (yearTo.length > 0) {
            expression += ' AND yearint<=' + yearTo;
        } else if (yearTo.length == 0 && yearFrom.length > 0) {
            expression += ' AND yearint<=2050';
        }
        //search(0, keyword, null, expression, extra, expression);

        var chk = $(this).parents(".check_li").find(":checkbox");
        var extra = {};
        var aqExtra = expression;
        if (typeof(orderBy) != 'undefined' && orderBy != null && orderBy.length != 0) {
            extra['orderBy'] = orderBy;
        }
        if (typeof(queryField) != 'undefined' && queryField != null && queryField.length != 0) {
            extra['queryField'] = queryField;
            aqExtra += queryField + ':' + preQuery;
        }
        if (typeof(fldText) != 'undefined' && fldText != null && fldText.length != 0) {
            extra['fldText'] = fldText;
        }
        filterResults(chk, aqExtra, extra);


    }

}
var hashChange = false;
var orginArea = '';
var hasSelected = true;
var oldArea = '';
//结果列表页面二次检索
function searchInResults() {
    var resultIpt = $('.search_text_bottom').val();
    resultIpt.replace(/[\\\^\"\&]/g, "").replace(/(--)/g, '').replace(/\'/g, ' ');

    var extra = "";
     if (isValid(docType)) {

        extra += "&docType=" + encodeURIComponent(docType);
    }

    if (isValid(targetField)) {

        extra += "&targetField=" + encodeURIComponent(targetField);
    }


    if (isValid(targetFieldLog)) {
        extra += "&targetFieldLog=" + encodeURIComponent(targetFieldLog);
    }

    if (targetFieldLog == "全部字段" || targetFieldLog == "All Field") {
        extra += "&isGroup=isGroup";
    }

    search(2, preQuery, $('.search_text_bottom').val().replace(/[\\\^\"\&]/g, "").replace(/(--)/g, '').replace(/\'/g, ' '), orginQuery, extra, orginQuery);
}


// 列表页点击图片或者题名进入详情页的链接拼装
function makeDetailUrl(obj, url, docID, dataSource, query) {
    var hrefUrl = url + 'docId=' + docID + '&dataSource=' + dataSource + '&query=' + encodeURIComponent(query);
    $(obj).attr("href", hrefUrl);
}

//翻页 结果列表页面上方与下方都有
function turnSearchResultPage(pageNo) {
    hashChange = true;


    if (pageNo > 60) {
        pageNo = 60;
    }
    ajaxSearch(preQuery, secQuery, actualQuery, {
        'pageNo': pageNo,
        'orderBy': orderBy,
        'queryField': queryField,
        'fldText': fldText,
        'isGroup': isGroup
    }, orginQuery);
}


//结果列表页面的显示数量
function showcount(pageNo) {
    hashChange = true;
    if (showcountflag == 0) {
        var extra = {'pageNo': 1, 'orderBy': orderBy, 'queryField': queryField, 'showcount': '1'};
        showcountflag = 1;
    } else {
        var extra = {'pageNo': 1, 'orderBy': orderBy, 'queryField': queryField, 'showcount': '0'};
        showcountflag = 0;
    }

    //if ($('#resultFldText').html() != $('#resultFldOptns a:eq(0)').html()) {
    extra['fldText'] = $('#all_field_val').html().Trim();
    //}

    ajaxSearch(preQuery, secQuery, actualQuery, extra, orginQuery);
}


//结果列表页面过滤、翻页、排序、选择检索字段等均通过ajax进行检索请求的发送
function ajaxSearch(query, secQuery, actualQuery, extra, orginQuery) {



    if(secQuery!=null&&secQuery!="") {
        secQuery = secQuery .replace( new RegExp( '&amp;' , "g" ), '&' );
    }

    if(actualQuery!=null&&actualQuery!="") {

        actualQuery = actualQuery .replace( new RegExp( '&amp;' , "g" ), '&' );
    }

    if(orginQuery!=null&&orginQuery!="") {

        orginQuery = orginQuery .replace( new RegExp( '&amp;' , "g" ), '&' );
    }

    var args = getSearchArgs(query, secQuery, actualQuery);

    if (args == null) {
        return;
    }

    if (typeof(extra) == "object" && extra != null) {
        for (var ppt in extra) {
            if (typeof(extra[ppt]) != "undefined" && extra[ppt] != null) {
                args[ppt] = extra[ppt];
            }
        }
        //add by kaisun
        args['showcount'] = showcountflag;
        //add end
    }
    if (isValid(docType)) {
        args['docType'] = docType;
    }
    if (isValid(targetField)) {
        args['targetField'] = targetField;
    }
    if (isValid(targetFieldLog)) {
        args['targetFieldLog'] = targetFieldLog;
    }
    args["orginQuery"] = orginQuery;
    //判读是否进行聚类搜索
    
    if (args["showcount"] < 1 && (args["orderBy"] == "RELATIVE" || args["orderBy"] == null)

            &&(actualQuery).search("groupbyid")==-1
        &&(location.href).search("isGroup=isGroup")!=-1) {
        args["isGroup"] = "isGroup";
    }

    if (hashChange) {
        var hashValue = '';
        var chkItemIdx = '';
        var chkBoxes = $('input[type=checkbox]');

        for (var i = 0; i < chkBoxes.length; i++) {
            if (chkBoxes[i].checked == true) {
                chkItemIdx += $(chkBoxes[i]).attr('aid') + ',';
            }
        }

        if (chkItemIdx.length > 0) {
            chkItemIdx = chkItemIdx.substring(0, chkItemIdx.length - 1);
        }


        if (chkItemIdx.length > 0) {
            hashValue += 'chkItemIdx--' + chkItemIdx + '||';
        }

        for (var p in args) {
            if (typeof(args[p]) != "undefined" && args[p] != null) {
                hashValue += p + '--' + args[p] + '||';
            }
        }

        if (hashValue.length > 0) {
            hashValue = hashValue.substring(0, hashValue.length - 2);
        }

        window.location.hash = encodeURIComponent(hashValue);
    }
}


//初始化showMoreClick事件
function initShowMoreClick(obj) {
    var currentfield = $(obj).attr("field");
    showMoreObject[currentfield] = showMoreObject[currentfield] + showMoreObject.eachShowNum;
    initShowMore(currentfield);
}


// 初始化“显示更多”
var showMoreObject = {
    eachShowNum: 5,   //每次新增标签个数
    defaultStartIndex: 0, //显示开始下标
    yearint: 0,
    language: 0,
    datasource: 0,
    dataowner: 0,
    firstcreator: 0,
    noRefreshField: ["eachShowNum", "defaultStartIndex", "reset", "noRefreshField"],
    reset: function (norefreshfield) {
        for (var field in showMoreObject) {
            var needRefresh = true;
            for (var prop in this.noRefreshField) {
                if (field == this.noRefreshField[prop] || (norefreshfield && norefreshfield == field)) {
                    needRefresh = false;
                    break;
                }
            }
            if (needRefresh) {
                this[field] = 0;
            }
        }
    }
}


function initShowMore(field) {
    var showStartIndex = showMoreObject.defaultStartIndex;
    if (typeof(field) != "undefined" && field != null) {
        showStartIndex = showMoreObject[field];
    }
    var showEndIndex = 0;			//增加的最后一个标签的下标

    var operateObj = null;
    if (typeof(field) != "undefined" && field != null) {
        operateObj = $('.check_list').find("div[id='more'][field='" + field + "']");
    } else {
        operateObj = $('.check_list').find("div[id='more']");
    }

    operateObj.each(function () {
        var currentfield = $(this).attr("field");
        //更改要显示的标签的display属性
        var length = $('.check_list').find(':checkbox[field="' + currentfield + '"]').length;
        if (typeof(field) != "undefined" && field != null) {
            showEndIndex = showMoreObject[field] + showMoreObject.eachShowNum >= length ? length : showMoreObject[field] + showMoreObject.eachShowNum;
        } else {
            showEndIndex = showMoreObject.defaultStartIndex + showMoreObject.eachShowNum >= length ? length : showMoreObject.defaultStartIndex + showMoreObject.eachShowNum;
        }
        $('.check_list').find(':checkbox[field="' + currentfield + '"]').parents("a:lt(" + showEndIndex + "):gt(" + (showStartIndex) + "),a:eq(" + showStartIndex + ")").attr("style", "display:block");

        //判断是否显示show more
        var display = $('.check_list').find(':checkbox[field="' + currentfield + '"]').parents("a:last").css('display');

        if (length == 0 || (typeof(display) != "undefined" && display != null &&  display =="block")) {
            $(this).attr("style", "display:none;")
        }
    });
}


// 加载底部相关词
function initRelativeQueries() {
    if (typeof(preQuery) == "undefined" || !preQuery || preQuery.length == 0) {
          return;
    }
    $.post(
        contextPath + '/search/getRelativeQueries',
        {'query': preQuery},
        function (data) {
            if (!data || data.length == 0) {
                return;
            }
            var html = '';
            var totalLen = 0;
            var lineBreaked = false;
            for (var i = 0; i < data.length; i++) {

                html += '<a href="javascript:void(search(2, \'' + data[i] + '\',null,null,\'&isGroup=isGroup\'));"><div class="xgsu_ci_item">'

                    + data[i] + '</div></a></td>';
            }

            $('.xgsu_ci_list').html(html);
        },
        'json'
    );
}


// 初始化选择检索极字段下拉列表
function initResultFieldSlt() {
    //alert("initResultFieldSlt");
    var isdrow1 = false;
    $(".all_field").click(function () {
        if (isdrow1 == false) {
            $(".dropdown_box_1").css("visibility", "visible")
            isdrow1 = true;
        } else {
            $(".dropdown_box_1").css("visibility", "hidden")
            isdrow1 = false;
        }
    })
    $(".dropdown_box_item").click(function () {
        $(".all_field_val").text($(this).text())
        $(".dropdown_box_1").css("visibility", "hidden")
        isdrow1 = false;
    })
    $('#dropdown_box_item').mouseleave(function () {
        $('#dropdown_box_item').hide();
    });
    bindOptionClick();
}


// 初始化选择检索极字段下拉列表项的点击事件
function bindOptionClick() {

    $('.dropdown_box_item').parent("a").click(function () {

        filterField($(this).attr('code'), $(this).attr('fldText'));

    });
}


//结果列表页面选择**中包含检索词的结果
function filterField(field, fldText) {
    var aqExtra = null;
    var extra = null;
    if (typeof(field) != "undefined" && field != null && field.length > 0 && field != "all") {
        aqExtra = field + ':' + preQuery;
        extra = {'queryField': field, 'fldText': fldText};
    }
    filterResults(null, aqExtra, extra);
}

// 初始化排序下拉框
function initOrderBySlt() {
    //alert("initOrderBySlt");
    if (typeof(orderBy) == 'undefined' || !orderBy || orderBy.length == 0) {
        orderBy = 'RELATIVE';
    }
    $('.dropdown_two_item').parent("a").click(function () {

        sortResults($(this).attr('code'));

    });
}


// 结果列表页面排序
function sortResults(orderBy) {
    hashChange = true;
    var extra = {'orderBy': orderBy, 'queryField': queryField};
    //if ($('#resultFldText').html() != $('#resultFldOptns a:eq(0)').html()) {
    extra = {'orderBy': orderBy, 'queryField': queryField, 'fldText': $('.all_field_val').html().Trim()};
    //}
    ajaxSearch(preQuery, secQuery, actualQuery, extra, orginQuery);
}


function openAndClose(e) {

    var html = $(e).parent().parent().parent().find(".two_level").css('display');
    if (html == "none") {
        $(e).parent().parent().parent().find(".two_level").show();

        $(e).addClass("open_kg_btn");
    } else {
        $(e).parent().parent().parent().find(".two_level").hide();
        $(e).parent().parent().children("a").find(".kg_btn").removeClass("open_kg_btn");

    }

}

// 过滤项checkbox点击事件
function initCheckBoxEvent() {
    $('.inputCheck').each(function () {
        $(this).click(function () {
            var chk = $(this).parents(".check_li").find(":checkbox");
            var extra = {};
            var aqExtra = '';

            if (typeof(orderBy) != 'undefined' && orderBy != null && orderBy.length != 0) {
                extra['orderBy'] = orderBy;
            }
            if (typeof(queryField) != 'undefined' && queryField != null && queryField.length != 0) {
                extra['queryField'] = queryField;
                aqExtra += queryField + ':' + preQuery;
            }
            if (typeof(fldText) != 'undefined' && fldText != null && fldText.length != 0) {
                extra['fldText'] = fldText;
            }
            filterResults(chk, aqExtra, extra);
               return false;
        });
    });
}
function  showChild(e) {

    if (e.checked==true){

        $(e).parent().parent().parent().find("a > div > input").attr('checked', 'true');
    }else {
        $(e).parent().parent().parent().find("a > div > input").removeAttr('checked');
    }


    
}
var hashChange = false;
var orginArea = '';
var hasSelected = true;
var oldArea = '';

// 列表页过滤结果
function filterResults(ele, aqExtra, extra) {
    if (ele != null) {
        hasSelected = true;
        extra['curArea'] = $(ele).parents('.mNav').attr('curArea');
        oldArea = $(ele).parents('.mNav').attr('curArea');
        orginArea = $(ele).parents('.mNav').html();
        if ($(ele).parents('.mNav').find(':checkbox:checked').size() == 0) {
            hasSelected = false;
        }
    }

    hashChange = true;
    var orgin = orginQuery;
    // assemble field arguments
    var args = {};
    var mtArr = [];
    $('input.inputCheck:checked').each(function () {
        var key = null;
        var value = null;
        key = this.getAttribute('field');
        value = this.getAttribute('code');
        if (typeof(this.getAttribute('do')) != "undefined" && this.getAttribute('do') != null && this.getAttribute('do') == 'clean') {
            value = value.replace(/\s*等$/g, '').replace(/\s*etc$/g, '').replace(/\[.*?\]/g, '').replace(/\(.*?\)/g, '');
            value = '(' + value + ')';
        }
        if (typeof(key) != "undefined" && key != null && key.length > 0 && value != 'all' && $(ele).attr("code") != "all") {
            if (typeof(args[key]) == "undefined" || args[key] == null) {
                args[key] = key + ':(' + value + ') ';
            } else {
                var org = args[key];
                var pattern = /(\().*\)/g;
                var orgValue = org.match(pattern)[0].replace(")", "").replace("(", "");
                args[key] = key + ':(' + orgValue + " OR " + value + ') ';
            }
            if (key == 'mediatype') {
                mtArr[mtArr.length] = $(this).parents('a').attr('title');
            }
        }

    });

    var actualQuery = '';
    var oq = orginQuery;

    if (typeof(secQuery) != 'undefined' && secQuery != null && secQuery != '') {
        if (oq.indexOf(':') > 0) {
            actualQuery = preQuery + ' AND ' + secQuery + oq.substring(oq.substring(0, oq.indexOf(':')).lastIndexOf(' '));
        } else {
            actualQuery = preQuery + ' AND ' + secQuery;
        }
    } else {
        actualQuery = orginQuery;
    }
    for (var prop in args) {
        if (oq.indexOf(prop + ':') >= 0) {
            actualQuery = oq.substring(0, orginQuery.indexOf(prop + ':')) + args[prop];
            if (oq.indexOf(') ', oq.indexOf(prop + ':')) >= 0) {
                actualQuery += oq.substring(oq.indexOf(') ', oq.indexOf(prop + ':')) + 2);
            }

        } else {
            actualQuery += ' ' + args[prop];
        }
        oq = actualQuery;
    }

    if (typeof(aqExtra) != "undefined" && aqExtra != null) {
        actualQuery += ' ' + aqExtra;
    }

    if (typeof(actualQuery) != "undefined" && actualQuery.length > 330) {
        var message = "";
        var width = 0;
        if (locale == 'zh_CN') {
            message = '过滤条件过多，请重新选择';
            width = 182;
        } else {
            message = 'Too many filter conditions, please reselect';
            width = 270;
        }
        $.messager.showBySite({
            msg: message,
            showType: 'fade',
            timeout: 2000,
            width: width,
            height: 45
        }, {
            top: $(ele).position().top + $(ele).height(),//将$.messager.show的top设置为点击对象之下
            left: $(ele).position().left,//将$.messager.show的left设置为与点击对象对齐
            bottom: ""
        });

        $(ele).attr('checked', false);
        return false;
    }


    ajaxSearch(preQuery, secQuery, actualQuery , extra, orginQuery);
}

/*查看其他版本和分册*/
function groupResultButtonClick(searchType, query, secQuery, actual) {
    var extraUrl = "";
    //var docType = $('div.wj_subNav a.current').attr("title");
    //当前选择的类别
    var docType = $('.item_text_select').attr("id");
    if (typeof(docType) != 'undefined' && docType != null && docType.length > 0) {
        extraUrl += '&docType=' + encodeURIComponent(docType);
    }
    extraUrl = extraUrl.replace("&isGroup=isGroup", "");
    var secArr = topCategories[docType];
    if (typeof(secArr) != 'undefined' && secArr != null) {
        var subTypes = [];
        for (var i = 0; i < secArr.length; i++) {
            subTypes.push(categoriesCode[secArr[i]]);
        }
        if (subTypes.length > 0) {
            actual += ' mediatype:(' + subTypes.join(' OR ') + ') ';
        }
    }
    search(searchType, query, secQuery, actual, extraUrl, null, null, "yes");
}


