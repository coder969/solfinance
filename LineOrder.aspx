<%@ Page Language="C#"  MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage" %>
<%@ Import Namespace="Model" %>
<%@ Import Namespace="Com.FrameWork.Util" %>
<%@ Import Namespace="Services" %>
<asp:Content ID="Content1" runat="server" ContentPlaceHolderID="TitleContent">
旅游订单—风采旅行社</asp:Content>
<asp:Content ID="Content3" runat="server" ContentPlaceHolderID="head">
<link type="text/css" rel="stylesheet" href="/Content/css/index.css" />
<script type="text/javascript" src="/Scripts/all.js"></script>
</asp:Content>
<asp:Content id="Content2" ContentPlaceHolderID="ContentPlaceHolder" runat="server">
<%
    IList<LineOrder> orderlist = ViewData["orderlist"] as IList<LineOrder>;
    int page = NumberUtil.parseInt(ViewData["page"].ToString());
    int count = NumberUtil.parseInt(ViewData["count"].ToString());
    int Npage = (count + 6 - 1) / 6;//总页数
%>
<div class="wz">&nbsp;&nbsp;&nbsp;您当前所在的位置： <a href="/">风采旅行社首页</a> » <a href="/Member/Main">会员中心首页</a> »旅游订单</div>
<div class="page">
<%Html.RenderPartial("Left");%>
<div class="uright">
  <div class="urtitle"><strong>我的订单</strong></div>
  <div class="urborder" >
   <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr class="urtabletr">
    <td width="9%" height="28" class="urtabletdl">订单号</td>
    <td width="43%">线路</td>
    <td width="18%">下单日期</td>
    <td width="12%" align="center">出发日期</td>
    <td width="9%" align="center">价格</td>
    <td width="9%" align="center">订单状态</td>
  </tr>
  <%if(orderlist != null && orderlist.Count > 0)
  {
    foreach(var item in orderlist)
    {
      %>
      <tr class="urtabletd">
        <td height="32" class="urtabletdl">22305</td>
        <td class="urtabletdr"><a href='/line/<%:item.lid %>.html' target='_blank'><%:item.ltitle %></a></td>
        <td><%:item.bookdate %></td>
        <td align="center"><%:item.ldate %></td>
        <td align="center"><strong>¥<%:item.numprice %></strong></td>
        <td align="center"><span><%:item.status %></span></td>
      </tr>
      <%    
    }
  }
  %> 
  </table>
  <div class="pages">
<%if (!page.Equals(1))
    {
    %>
    <a href="/Member/LineOrder?page=1" class="first">首页</a>
    <a href="/Member/LineOrder?page=<%:(page - 1) %>" class="prev">上一页</a>
    <%    
    }
    else
    {
        %>
        <span class="first">首页</span>
        <span class="prev">上一页</span>
        <%  
    }
%>
<%for(int i = 1; i <= Npage; i++)
{
    if (page > 10)
    {
        for (int m = 6; m >= 1; m--)
        {
            %><a href="/Member/LineOrder?page=<%:(page - m) %>"><%:(page - m) %></a><%  
        }
        for (int n = 0; n <= 6; n++)
        {
            if (n.Equals(0))
            {
                %><span class="cur"><%:page %></span><%  
            }
            else
            {
                if ((page + n) < Npage)
                {
                    %><a href="/Member/LineOrder?page=<%:(page +n) %>"><%:(page + n) %></a><%
                }
            }
        }
        break;
    }
    else
    {
        if (i <= 10)
        {
            if (page.Equals(i))
            {
                %><span class="cur"><%:page %></span><%
            }
            else
            {
                %><a href="/Member/LineOrder?page=<%:i %>"><%:i %></a><%
            }
        }   
    }
    %>
               
    <%    
}
if(page.Equals(Npage))
{
    %>
    <span class="next">下一页</span>
    <span class="last">尾页</span>
    <%              
}
else
{
    %>
    <a href="/Member/LineOrder?page=<%:page+1 %>">下一页</a>
    <a href="/Member/LineOrder?page=<%:Npage %>">尾页</a>
    <%                
}
%>
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