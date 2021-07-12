/*验证网址*/
function checkeURL(URL) {
    var str = URL;
    //在JavaScript中，正则表达式只能使用"/"开头和结束，不能使用双引号
    //判断URL地址的正则表达式为:http(s)?://([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?
    //下面的代码中应用了转义字符"\"输出一个字符"/"
    var Expression = /([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
    var objExp = new RegExp(Expression);
    if (objExp.test(str) == true) {
        return true;
    } else {
        return false;
    }
}
/*验证新增，更改友情链接信息*/
function validLink() {
    var webname = $("#webname").val();
    if (webname == "") {
        alert("站点名称不能为空");
        $("#webname").focus();
        return false;
    }
    var website = $("#website").val();
    if (website == "") {
        alert("站点地址不能为空");
        $("#website").focus();
        return false;
    }
    else {
        if (checkeURL(website) == false) {
            alert("地址格式不正确,标准格式为[www.87667777.com]");
            $("#website").focus();
            return false;
        }
    }
    var sortid = $("#sortid").val();
    if (sortid == "") {
        alert("序号不能为空");
        $("#sortid").focus();
        return false;
    }
    else {
        if (isNaN(sortid)) {
            alert("序号请填写数字");
            $("#sortid").focus();
            return false;
        }
    }
}
/*验证线路信息*/
function ValidLine() {
    next1();
    next2();
    var pricedesc = $("#pricedesc").text();
    if (pricedesc == "") {
        alert("费用介绍未填写");
        $("#pricedesc").focus();
        return false;
    }
    var orderdesc = $("#orderdesc").text();
    if (orderdesc == "") {
        alert("预订须知未填写");
        $("#orderdesc").focus();
        return false;
    }
    var ltips = $("#ltips").text();
    if (ltips == "") {
        alert("温馨提示未填写");
        $("#ltips").focus();
        return false;
    }
    $("#form1").submit();     
}
function perv() {
    $("#tb1").show();
    $("#tb2").hide();
    $("#tb3").hide();
    var self = $("#ultab").children("li");
    self.removeClass("yes");
    $("#li1").addClass("yes");
}
function next1() {
    var ddcs = $("#ddcs").val();
    if (ddcs == "") {
        alert("到达城市不能为空");
        $("#ddcs").focus();
        return false;
    }
    var price = $("#price").val();
    if (price == "") {
        alert("线路价格未填写");
        $("#price").focus();
        return false;
    }
    var ldate = $("#ldate").val();
    if (ldate == "") {
        alert("出发日期未填写");
        $("#ldate").focus();
        return false;
    }
    var routeday = $("#routeday").val();
    if (routeday == "") {
        alert("行程天数未填写");
        $("#routeday").focus();
        return false;
    }
    var title = $("#title").val();
    if (title == "") {
        alert("标题未填写");
        $("#title").focus();
        return false;
    }
    $("#tb1").hide();
    $("#tb2").show();
    $("#tb3").hide();
    var self = $("#ultab").children("li");
    self.removeClass("yes");
    $("#li2").addClass("yes");
}
function next2() {
    var route = KE.html('route');
    if (route == "") {
        alert("行程介绍未填写");
        $("#content").focus();
        return false;
    }
    $("#tb1").hide();
    $("#tb2").hide();
    $("#tb3").show();
    var self = $("#ultab").children("li");
    self.removeClass("yes");
    $("#li3").addClass("yes");
}