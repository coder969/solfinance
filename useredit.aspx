<%@ Page Language="C#"  MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage" %>
<%@ Import Namespace="Model" %>
<%@ Import Namespace="Com.FrameWork.Util" %>
<%@ Import Namespace="Services" %>
<asp:Content ID="Content1" runat="server" ContentPlaceHolderID="TitleContent">
个人资料</asp:Content>
<asp:Content ID="Content3" runat="server" ContentPlaceHolderID="head">
<link type="text/css" rel="stylesheet" href="/Content/css/index.css" />
<script type="text/javascript" src="/Scripts/all.js"></script>
<script type="text/javascript">
    function EditUser() {
        $("#form1").submit(); 
    }
</script>
</asp:Content>
<asp:Content id="Content2" ContentPlaceHolderID="ContentPlaceHolder" runat="server">
<%
    Member member = Session["MemberSession"] as Member;
    var id = member.id;
    var phone = member.phone;
    var email = member.email;
    var pwd = member.pwd;
    var regdate = member.regdate;
    var ly = member.ly;
    var username = string.IsNullOrEmpty(member.username) ? "" : member.username;
    var tel =string.IsNullOrEmpty(member.tel)?"":member.tel;
    var fax = string.IsNullOrEmpty(member.fax) ? "" : member.fax;
    var gender = string.IsNullOrEmpty(member.gender) ? "" : member.gender;
    var address = string.IsNullOrEmpty(member.address) ? "" : member.address;    
%>
<div class="wz">&nbsp;&nbsp;&nbsp;您当前所在的位置： <a href="/">风采旅行社首页</a> » <a href="/Member/Main">会员中心首页</a>»个人资料</div>
<div class="page">
<!--left-->
<%Html.RenderPartial("Left");%>
<!--left结束-->
<div class="uright">
<div class="urtitle"><strong>个人资料</strong></div>
<div class="urborder">
  <form name="form1" action="/Member/PostEdit" id="form1" method="post">    
   <ul class="urinput">
    <li><span><em>※</em>真实姓名：</span>
        <input id="username" name="username" type="text" value="<%:username %>" class="inputb" maxlength="15" />
    </li>
    <li><span><em>※</em>称 呼：</span><label><input type="radio" <%:gender.Equals("M") ? "checked='checked'" : ""%> name="gender" value="M"/>先生</label>
    <label><input type="radio" <%:gender.Equals("W") ? "checked='checked'" : ""%> name="gender" value="W"/>小姐</label> </li>
    <li><span>固 话：</span>
        <input id="tel"  name="tel" type="text" value="<%:tel %>" maxlength="30" title="请输入您的固话" class="inputb" />
    </li>
    <li><span>传 真：</span>
        <input id="fax"  name="fax" type="text" value="<%:fax %>" maxlength="30" title="请输入您的传真" class="inputb" />
    </li>
    <li><span>联系地址：</span>
        <input id="address"  name="address" type="text" value="<%:address %>" style="width:250px;" title="请输入您的联系地址" maxlength="128" class="inputb" />
        <div>
            <input id="id" name="id" type="hidden" value="<%:id %>"/>          
            <input id="regdate" name="regdate" type="hidden" value="<%:regdate %>"/>
            <input id="ly" name="ly" type="hidden" value="<%:ly %>"/>
            <input id="phone" name="phone" type="hidden" value="<%:phone %>"/>
            <input id="email" name="email" type="hidden" value="<%:email %>"/>
            <input id="pwd" name="pwd" type="hidden" value="<%:pwd %>"/>
            <input type="button" onclick="return EditUser();" value=" 修 改 " class="inputc" />
        </div>
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