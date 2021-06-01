<%@ Page Language="C#"  MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage" %>
<%@ Import Namespace="Model" %>
<%@ Import Namespace="Com.FrameWork.Util" %>
<%@ Import Namespace="Services" %>
<asp:Content ID="Content1" runat="server" ContentPlaceHolderID="TitleContent">
会员管理中心</asp:Content>
<asp:Content ID="Content3" runat="server" ContentPlaceHolderID="head">
<link type="text/css" rel="stylesheet" href="/Content/css/index.css" />
<script type="text/javascript" src="/Scripts/all.js"></script>
</asp:Content>
<asp:Content id="Content2" ContentPlaceHolderID="ContentPlaceHolder" runat="server">
<%
    Member member = Session["MemberSession"] as Member;
    var username = member.username;
    var phone = member.phone;
    var email = member.email;
    var regdate = member.regdate.Substring(0, 10);
%>
<div class="wz">&nbsp;&nbsp;&nbsp;您当前所在的位置： <a href="/">风采旅行社首页</a> » <a href="/Member/Main">会员中心首页</a></div>
<div class="page">
<%Html.RenderPartial("Left");%>
<div class="uright">
  <div class="urtitle"><strong>会员中心首页</strong></div>
  <div class="urborder">
  <div class="urhi"><strong><%:member.username %></strong> 您好，欢迎您登录会员中心</div>
   <div class="urtext">
     <strong>会员姓名：</strong><%:username%><br />     
     <strong>手机号：</strong><%:phone %><br />
     <strong>邮　箱：</strong><%:email %><br />
     <strong>注册日期：</strong><%:regdate %>
   </div>
</div>
</div>
</div>
<div class="explanation" style="margin-top:8px;">
  <div class="exp">
    <ul>
    <li style="border-left:0px;"><h3><span>1</span><a href="http://www.landtu.com/about/help.shtml#1" rel="nofollow">订购流程说明</a></h3>
    <p>查询<br />提交订单<br />付款<br />签署旅游合同</p></li>
    <li><h3><span>2</span><a href="http://www.landtu.com/about/help.shtml#2" rel="nofollow">付款方式说明</a></h3>
    <p>亲临门市付款<br />网上支付<br />银行转帐</p></li>
    <li><h3><span>3</span><a href="http://www.landtu.com/about/help.shtml#3" rel="nofollow">合同签署和发票</a></h3>
    <p>亲临门市签署<br />快递签署<br />传真签署<br />发票项目</p></li>
    <li><h3><span>4</span><a href="http://www.landtu.com/about/help.shtml#4" rel="nofollow">电子抵用券</a></h3>
    <p>获取方法<br />使用方法<Br /><br /><br /></p></li>
    <li style="border-right:0px;"><h3><span>5</span><a href="http://www.landtu.com/about/help.shtml#5" rel="nofollow">其他事项</a></h3>
    <p>取消和退订<br />出境游签证<br />旅游保险<br />联系我们</p></li>
    </ul>
  </div>
  <div class="lineclear"></div>
  </div>
<script type="text/javascript">
    ShowNewNav(6);
    SetReferer();
</script>
</asp:Content>