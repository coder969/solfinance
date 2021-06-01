<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<title>会员注册</title>
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
<div class="login_border1">
  <div class="login_border2">
  <div class="login_border3">
    <h3>注册成为风采旅行社会员</h3>
    <div class="login_border4">
    <form method="post" id="formReg" name="formReg" action="/member/Register">        
      <ul class="login_l">
      <li>
        <span><em>*</em>手机号:</span><input name="phone" id="phone" type="text" class="inputa" maxlength="11" onblur="checkphone(this.value);"/>
        <img src="/Content/images/yes1.gif" width="16" height="16" id="phoneico" style="display:none;" />
        <div id="pphone">请填写有效手机号码，以便接收订单等通知，及时了解订单情况</div>
        <input id="phoneinfo" type="hidden"/>
      </li>  
      <li>
        <span><em>*</em>邮 箱:</span><input name="email" id="email" type="text" class="inputa" onblur="checkemail(this.value);" maxlength="50" />
        <img src="/Content/images/no1.gif" width="16" height="16" id="emailico" style="display:none;" />
        <div id="pemail">请输入有效的邮件地址，当密码遗失时凭此领取。</div>
        <input id="emailinfo" type="hidden"/>
      </li>
      <li>
        <span><em>*</em>密 码:</span><input  name="pwd" id="pwd" type="password" class="inputa" maxlength="14" />
        <img src="/Content/images/yes1.gif" width="16" height="16" id="pwdico" style="display:none;" />
        <div id="ppwd">不超过7个汉字，或14个字节（数字，字母和下划线）</div>
      </li>
      <li>
          <span><em>*</em>再次输入密码:</span><input name="pwd1" id="pwd1" type="password" class="inputa"  maxlength="14" />
          <img src="/Content/images/yes1.gif" width="16" height="16" id="pwd1ico" style="display:none;" />
          <div id="ppwd1">请您再一次输入密码。</div>
      </li>      
      <li><span><em>*</em>验证码:</span><input  name="code" id="code" type="text" class="inputa" style="width:85px;" maxlength="4" />
        <img src="/Member/CreateCodeImage" id="imgcode" width="80" height="29" class="imgts" alt="点击刷新验证码" style="color:Red;width:80px;height:29px;cursor:pointer;" onclick="javascript:var time = new Date().getTime(); this.src=this.src + '?' + time;"> 
        <a href="#" onclick="setcode(); return false;">更换验证码</a><div>&nbsp;</div>
        <div><label><input  name="agree" id="agree" type="checkbox" value="1"  /> 我已阅读并接受风采旅行社<a href="/about/protocol.shtml" target="_blank">会员协议</a>确认</label><br />
        <br />
        <input id="validcode" name="validcode" type="hidden"/>
        <input type="image" onclick="ValidReg();return false" style="width:114px; height:39px;" src="/Content/images/bt1.jpg"/></div>
      </li>
      </ul>
      </form>
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
