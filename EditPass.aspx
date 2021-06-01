<%@ Page Language="C#"  MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage" %>
<%@ Import Namespace="Model" %>
<%@ Import Namespace="Com.FrameWork.Util" %>
<%@ Import Namespace="Services" %>
<asp:Content ID="Content1" runat="server" ContentPlaceHolderID="TitleContent">
密码修改</asp:Content>
<asp:Content ID="Content3" runat="server" ContentPlaceHolderID="head">
<link type="text/css" rel="stylesheet" href="/Content/css/index.css" />
<script type="text/javascript" src="/Scripts/all.js"></script>
<script type="text/javascript">
    function ValidPwd() {
        var oldpwd = $("#oldpwd").val();
        if (oldpwd == "") {
            alert("请输入旧密码");
            $("#oldpwd").focus();
            return false;
        }
        else
        {
            if(oldpwd.length < 6 || oldpwd.length > 18)
            {
                alert("密码6-18位字符");
                $("#oldpwd").focus();
                return false;
            }
        }
        var pwd = $("#pwd").val();
        if (pwd == "") {
            alert("请输入新密码");
            $("#pwd").focus();
            return false;
        }
        else
        {
            if (pwd.length < 6 || pwd.length > 18)
            {
                alert("密码6-18位字符");
                $("#pwd").focus();
                return false;
            }
        }
        var pwd1 = $("#pwd1").val();
        if (pwd1 == "") {
            alert("确认密码不能为空");
            $("#pwd1").focus();
            return false;
        }
        else
        {
            if(pwd1 != pwd)
            {
                alert("确认密码不一致，请核实");
                $("#pwd1").focus();
                return false;
            }
        }
        $("#form1").submit();
    }
</script>
</asp:Content>
<asp:Content id="Content2" ContentPlaceHolderID="ContentPlaceHolder" runat="server">
<%
    Member member = Session["MemberSession"] as Member;
    var id = member.id;
%>
<div class="wz">&nbsp;&nbsp;&nbsp;您当前所在的位置： <a href="/">风采旅行社首页</a> » <a href="/Member/Main">会员中心首页</a>»密码修改</div>
<div class="page">
<!--left-->
<%Html.RenderPartial("Left");%>
<!--left结束-->
<div class="uright">
  <div class="urtitle"><strong>修改密码</strong></div>
  <div class="urborder">
   <form  action="/Member/PostPwd" id="form1" name="form1" method="post">
    <ul class="urinput">
     <li><span><em>*</em>旧的密码：</span><input name="oldpwd" type="password" id="oldpwd" maxlength="18" title="请输入您的旧的密码" class="inputb" /></li>
     <li><span><em>*</em>新的密码：</span>
       <input name="pwd" type="password" id="pwd"  maxlength="14" title="请输入您的新的密码" class="inputb" /></li>
     <li><span><em>*</em>确认新密码：</span>
       <input name="pwd1" type="password" id="pwd1"  maxlength="14" title="请您再一次输入您的新密码" class="inputb" />
     <div>
     <input id="id" name="id" type="hidden" value="<%:id %>"/>
     <input type="button" onclick="return ValidPwd();" value=" 修 改 " class="inputc" /></div>
     </li>
     </ul>
   </form>
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