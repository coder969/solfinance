<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<title>会员登录</title>
<link type="text/css" rel="stylesheet" href="/Content/css/landtu.css" />
<script type="text/javascript" src="/Scripts/jquery-1.7.1.min.js"></script>
<script type="text/javascript" src="/Scripts/Reg.js"></script>
</head>
<body>
<!--Head-->
<div class="head">
<div class="login_nav"><a href="/">首 页</a>&nbsp;&nbsp;┆&nbsp;&nbsp;<a href="/abroad">出境游</a>&nbsp;&nbsp;┆&nbsp;&nbsp;<a href="/domestic">国内游</a>&nbsp;&nbsp;┆&nbsp;&nbsp;<a href="/around">周边游</a>&nbsp;&nbsp;┆&nbsp;&nbsp;<a href="/car">租车</a>&nbsp;&nbsp;┆&nbsp;&nbsp;<a href="/visa">签证</a></div>
<div class="login_tel"><div><a href="/" title="风采旅行社"><img src="http://87666888.com/images/logo/logo.gif" alt="风采旅行社" /></a></div>
  <span>预订电话<strong> 027-51519799</strong></span></div>
</div> 
<!--Head_end-->
<!--Main-->
<div class="page">
<div class="loadl">
  <div class="loadbn"></div>
  <div class="loadtext"><strong>还不是会员？注册成为风采旅行社会员</strong><br />
1. 以便我们更好的为您服务<br />
2. 会员参加旅游，可以获赠抵用券，以获得更多优惠。<br />
<a href="/Member/reg"><img src="/Content/images/bt3.jpg" /></a></div>
</div>
<div class="loadr">
  <div class="login_border1">
  <div class="login_border2">
  <div class="login_border3">
    <h3>风采旅行社会员登录</h3>
    <div class="login_border5">
    <div class="loadts">&nbsp;</div>
    <form action="/Member/PostLogin" id="formLogin" name="formLogin"  method="post">   
      <ul class="loadinput">
       <li><span>账 户:</span><input type="text"  onfocus="if(this.value=='手机号/邮箱'){this.value=''}" onblur="if(this.value==''){this.value='手机号/邮箱'}" class="inputd" name="username" id="username" value="手机号/邮箱" size="24" maxlength="50"/>
       </li>
       <li><span>密 码:</span><input  type="password" class="inputd" name="password" id="password" size="24" maxlength="14"/>
       </li>
       <li>
        <div><input type="image" onclick="ValidLogin();return false;" src="/Content/images/bt2.jpg" /><br />
        <a href="/Member/reg">注册新会员</a></div>
       </li>
      </ul>
    </form>
    </div>
  </div>
  </div>
</div>
</div>
<%Html.RenderPartial("AjaxHelp");%>
</div>
<div class="footernew">
  <p><span class="fl"><a href="http://www.cyberpolice.cn" target="_blank" rel="nofollow"><img src="/Content/images/index-footer1.gif" width="36" height="43" border="0"></a></span>
	 <span class="fr">网络110<br />报警服务</span></p>
  <p><span class="fl"><a href="http://www.miibeian.gov.cn" target="_blank" rel="nofollow"><img src="/Content/images/index-footer2.gif" width="35" height="43" border="0"></a></span>
	 <span class="fr">经营性网站<br />备案信息</span></p>
  <p><span class="fl" style="width:44px;"><a href="http://net.china.cn/chinese/index.htm" target="_blank" rel="nofollow"><img src="/Content/images/index-footer3.gif" width="44" height="44" border="0"></a></span><span class="fr" style="width:64px;">不良信息<br>举报中心</span></p>
      <p><a target="_blank" href="https://sealinfo.verisign.com/splash?form_file=fdf/splash.fdf&dn=www.landtu.com&lang=zh_cn" rel="nofollow"><img src="/Content/images/vs.gif" border="0" width="120" height="50"></a></p>	
  <p><a target="_blank" href="http://union.tenpay.com/cgi-bin/trust_mch/ShowTrustMchInfo.cgi?uin=1205906301&uin_type=1" rel="nofollow"><img src="/Content/images/trust_logo.gif" border="0" width="120" height="50"></a></p>	
  <p><a target="_blank" href="http://www.ebs.gov.cn/EntCertificate.aspx?mainId=e6282d20-64cd-419f-a829-a08c1f249b96" rel="nofollow"><img src="/Content/images/trust_logos.gif" border="0" alt="深圳市市场监督管理局企业主体身份公示" width="120" height="50"></a></p>
  <p style=" padding-top:2px; height:48px;"><a href="http://trust.360.cn/search.php" target="_blank" title="360可信网站" rel="nofollow"><img src="/Content/images/btm360.gif" border="0" width="120" height="47" /></a></p>
</div>
</body>
</html>
