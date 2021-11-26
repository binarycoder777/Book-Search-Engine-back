<!DOCTYPE HTML >
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta name="viewport" content="width=device-width, maximum-scale=1.0, initial-scale=1.0">
    <title>文津搜索</title>
    <script src="/js/jquery/html5.js" type="text/javascript"></script>
    <script src="/js/jquery/jquery-1.7.js" type="text/javascript"></script>
    <script src="/js/common.js" type="text/javascript"></script>
    <script src="/js/index.js" type="text/javascript"></script>
    <script src="/js/jquery/jquery-ui.min.js" type="text/javascript"></script>
    <!--script src="/js/jquery/jquery-ui-1.8.22.custom.min.js" type="text/javascript"></script-->
    <script src="/js/data/categories_index_zh.js" , type="text/javascript"></script>


    <script src="/js/data/librariesCoordinates.js" type="text/javascript"></script>
    <link href="/css/smoothness/jquery-ui-1.8.20.smoothness.css" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" type="text/css" href="/css/index.css" media="screen"/>
    <link rel="stylesheet" type="text/css" href="/css/common.css" media="screen"/>
    <script type="text/javascript">
        var iptValue = "";
        var contextPath = '';
        var locale = 'zh_CN';
        var isSSOBackendValid = 'false';
        var userName = '';
        var isHomePage = 'true';
        var defaultOrderBy = 'PUBLISH_DATE_DESC';
    </script>

    <script src="/js/initSSO.js" type="text/javascript"></script>
    <script src="/js/jquery/jquery.engine3D.js" type="text/javascript"></script>
    <script src="/js/jquery/jquery.particlePhysics.js" type="text/javascript"></script>
    <script src="/js/jquery/jquery.starfieldTagCloud.js" type="text/javascript"></script>
    <script language="javascript">
        document.write("<script language=\"javascript\" src=\"https://sso1.nlc.cn/sso/foreign/authenManager/get-sso-ticket?rand=" + Math.random() + "\">");
        document.write("<\/script>");
    </script>
</head>
<body  style="background:  url('/images/gt_bg.png')   no-repeat  center center fixed; /* background-size: 100%;*/">

<div class="navigation" id="index_navigation">
    <div class="navigation_item">
        <a href="http://www.nlc.cn/" target="_blank">国图首页</a>
    </div>

   <script type="text/javascript">
        var loginUrl = getSSOLoginUrl();
        loginUrl = '<div class="navigation_item"> <a href="' + loginUrl + '">登录</a></div>';
        document.write(loginUrl);
    </script>
    <div class="navigation_item">
        <a href="https://sso1.nlc.cn/sso/userRegist/toRegisteUser" target="_blank">注册</a>
    </div>
    <!--<div class="navigation_item">
        <a href="/show/suggest" target="_blank">意见反馈</a>
    </div>-->

    <div class="navigation_item">
        <a href="/show/help">帮助</a>
    </div>
</div>

<div class="wj_1024" >

   <div class="search_fix" style="margin-top: 460px;">
        <div class="sxk_fix">
            <div class="sxk">
                <span class="sxk_name" defaultText="全部字段"></span>
                <i class="bottom_icon"></i>
            </div>
            <div class="xl_list">
                <div class="xl_item" onclick="xlitem()" id="全部字段">
图书、论文、期刊报纸信息一步获取                </div>
                <div class="xl_item" id="题名">
                    题名
                </div>
                <div class="xl_item" id="文章">
                    文章
                </div>
                <div class="xl_item" id="关键词">
                    关键词
                </div>
            </div>
        </div>
       <div  class="search_text" >
           <input type="text"   class="search_text_input ui-autocomplete-input" id="keywordIpt" name="query" btnId="search_btn"
               defaultValue="图书、论文、期刊报纸信息一步获取"/>
           </div>
        <div class="search_btn" onclick="indexSearch(true)"></div>
        <div class="advanced_retrieval">
            <div class="retrieval—1" style="width: 140px">
                <a href="/show/advancedSearch" target="_blank">高级检索</a>
            </div>
            <div class="retrieval—2"  style="width: 140px">
                <a href="http://dportal.nlc.cn:8332/zylb/zylb_szzymh_sjkcz.htm">联邦检索</a>
            </div>
        </div>
    </div>
    <div class="key_word">

        <div class="key_item">
            <div class="item_text" title="全部" id="全部"></div>
        </div>
        <div class="key_item">
            <span class="shu"></span>
            <div class="item_text" title="图书" id="图书"></div>
        </div>
        <div class="key_item">
            <span class="shu"></span>
            <div class="item_text" title="古文献" id="古文献"></div>
        </div>
        <div class="key_item">
            <span class="shu"></span>
            <div class="item_text" title="论文" id="论文"></div>
        </div>
        <div class="key_item">
            <span class="shu"></span>
            <div class="item_text" title="期刊报纸" id="期刊报纸"></div>
        </div>
        <div class="key_item">
            <span class="shu"></span>
            <div class="item_text" title="多媒体" id="多媒体"></div>
        </div>
        <div class="key_item">
            <span class="shu"></span>
            <div class="item_text" title="缩微文献" id="缩微文献"></div>
        </div>
        <div class="key_item">
            <span class="shu"></span>
            <div class="item_text" title="文档" id="文档"></div>
        </div>
        <div class="key_item">
            <span class="shu"></span>
            <div class="item_text" title="词条" id="词条"></div>
        </div>
        <div class="hot"></div>
        <div class="hot_title">
            <a style="text-decoration:none;color:#333333" href="/search/showHotQueries"
               class="black">搜索热词榜</a></div>
        　

    </div>


    <div class="copyright" >
        <div class="record_number">京ICP备05014420号</div>
        <div class="all_copyright">国家图书馆版权所有</div>
    </div>

</div>
<div style="width:0px;height:0px;background-color:#FFFFFF;position:fixed;right:0px;bottom:0px;padding:20px;z-index:999;">尊敬的读者：<br/>
      因“全国公民身份证号码查询服务中心”将于2020年7月11日早9:00至2020年7月12日早9:00进行设备停机维护操作，受此影响，在线实名认证功能将暂停对外服务。我们会 全国公民身份证号码查询服务中心”恢复正常对外服务后，即刻恢复在线实名认证服务，对于给您带来的不便深表歉意，感谢您对我们工作的支持！<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;国家图书馆<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2020年7月8日<br/>
 </div>
</body>
</html>
