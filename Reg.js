/*会员注册*/
function setcode() {
    var imgsrc = $("#imgcode")[0].src;
    var time = new Date().getTime();
    var imgcode = $("#imgcode");
    var newsrc = imgsrc + '?' + time;
    imgcode.attr("src", newsrc);
}
function CheckMobilePhone(phone) {
    var pattern = /^(13|15|18)+\d{9}$/;
    return pattern.test(phone);
}
function CheckEmailAddress(email) {
    var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return pattern.test(email);
}
function trim(inputString) {
    //xiao duan 22/06/2007 
    if (typeof inputString != "string") { return inputString; }
    var retValue = inputString;
    var ch = retValue.substring(0, 1);
    while (ch == " ") {
        //检查字符串开始部分的空格
        retValue = retValue.substring(1, retValue.length);
        ch = retValue.substring(0, 1);
    }
    ch = retValue.substring(retValue.length - 1, retValue.length);
    while (ch == " ") {
        //检查字符串结束部分的空格
        retValue = retValue.substring(0, retValue.length - 1);
        ch = retValue.substring(retValue.length - 1, retValue.length);
    }
    while (retValue.indexOf("  ") != -1) {
        //将文字中间多个相连的空格变为一个空格
        retValue = retValue.substring(0, retValue.indexOf("  ")) + retValue.substring(retValue.indexOf("  ") + 1, retValue.length);
    }
    retValue = retValue.replace(' ', '');
    return retValue;
}
/*验证手机号码*/
function checkphone(phone) {
    phone = trim(phone);
    var r = Math.random();
    $("#phone").attr("value", phone);
    if (phone != "") {
        if (!CheckMobilePhone(phone)) {
            $("#pphone").addClass("divts")
            $("#pphone").html("手机号码格式不正确");
            $("#phoneico").attr("src", "/Content/images/no1.gif");
            $("#phoneico").show();
            $("#phone").focus();
        }
        else {
            $.ajax({
                type: "get", //使用get方法访问后台           
                url: "/Member/checkphone?phone=" + phone + "&r=" + r + "",
                success: function (status) {
                    $("#phoneinfo").attr("value", status);
                    if (status == "True") {
                        $("#pphone").addClass("divts");
                        $("#pphone").html("该手机号已注册，无法注册");
                        $("#phoneico").attr("src", "/Content/images/no1.gif");
                        $("#phoneico").show();
                        $("#phone").focus();
                    }
                    else {
                        $("#pphone").removeClass("divts");
                        $("#pphone").html("恭喜您，该手机号可注册");
                        $("#phoneico").attr("src", "/Content/images/yes1.gif");
                        $("#phoneico").show();
                    }
                }
            })
        }
    }
}
/*验证邮箱地址*/
function checkemail(email) {
    email = trim(email);
    var r = Math.random();
    $("#email").attr("value", email);
    if (email != "") {
        if (!CheckEmailAddress(email)) {
            $("#pemail").addClass("divts")
            $("#pemail").html("邮箱地址格式不正确");
            $("#emailico").attr("src", "/Content/images/no1.gif");
            $("#emailico").show();
            $("#email").focus();
        }
        else {
            $.ajax({
                type: "get", //使用get方法访问后台           
                url: "/Member/checkemail?email=" + email + "&r=" + r + "",
                success: function (status) {
                    $("#emailinfo").attr("value", status);
                    if (status == "True") {
                        $("#pemail").addClass("divts")
                        $("#pemail").html("该邮箱地址已注册，无法注册");
                        $("#emailico").attr("src", "/Content/images/no1.gif");
                        $("#emailico").show();
                        $("#email").focus();
                    }
                    else {
                        $("#pemail").removeClass("divts");
                        $("#pemail").html("恭喜您，该邮箱地址可注册");
                        $("#emailico").attr("src", "/Content/images/yes1.gif");
                        $("#emailico").show();
                    }
                }
            })
        }
    }
}
function checkpwd(pwd) {
    pwd = trim(pwd);
    $("#pwd").attr("value", pwd);
    if (pwd != "") {
        if (pwd.length < 6 || pwd.length > 18) {
            $("#ppwd").show();
            $("#ppwd").addClass("divts");
            $("#ppwd").html("密码6-18位字符");
            $("#pwd").focus();
        }
        else {
            $("#ppwd").show();
            $("#ppwd").removeAttr("divts");
            $("#ppwd").html("");
        }
    }
}
function ValidReg() {
    /*验证手机号码*/
    var phone = $("#phone").attr("value");
    if (phone == "") {
        $("#pphone").addClass("divts");
        $("#pphone").html("请输入手机号码");
        $("#phoneico").attr("src", "/Content/images/no1.gif");
        $("#phoneico").show();
        $("#phone").focus();
        return false;
    }
    else {
        if (!CheckMobilePhone(phone)) {
            $("#pphone").addClass("divts");
            $("#pphone").html("手机号码格式不正确");
            $("#phoneico").attr("src", "/Content/images/no1.gif");
            $("#phoneico").show();
            $("#phone").focus();
            return false;
        }
        else {
            var info = $("#phoneinfo").attr("value");
            if (info == "True") {
                $("#pphone").addClass("divts");
                $("#pphone").html("该手机号码已注册，无法注册");
                $("#phoneico").attr("src", "/Content/images/no1.gif");
                $("#phoneico").show();
                $("#phone").focus();
                return false;
            }
            else {
                $("#pphone").removeClass("divts");
                $("#pphone").html("恭喜您，该手机号码可注册");
                $("#phoneico").attr("src", "/Content/images/yes1.gif");
                $("#phoneico").show();
            }
        }
    }
    /*验证邮箱*/
    var email = $("#email").val();
    if (email == "") {
        $("#pemail").addClass("divts");
        $("#pemail").html("请输入邮箱地址");
        $("#pemailico").attr("src", "/Content/images/no1.gif");
        $("#pemailico").show();
        $("#email").focus();
        return false;
    }
    else {
        if (!CheckEmailAddress(email)) {
            $("#pemail").addClass("divts");
            $("#pemail").html("邮箱地址格式不正确");
            $("#pemailico").attr("src", "/Content/images/no1.gif");
            $("#pemail").show();
            $("#email").focus();
            return false;
        }
        else {
            var info = $("#emailinfo").attr("value");
            if (info == "True") {
                $("#pemail").addClass("divts");
                $("#pemail").html("该邮箱地址已注册，无法注册");
                $("#pemailico").attr("src", "/Content/images/no1.gif");
                $("#pemailico").show();
                $("#email").focus();
                return false;
            }
            else {
                $("#pemail").removeClass("divts");
                $("#pemail").html("恭喜您，该邮箱地址可注册");
                $("#pemailico").attr("src", "/Content/images/yes1.gif");
                $("#pemailico").show();
            }
        }
    }
    /*验证密码*/
    var pwd = $("#pwd").val();
    if (pwd == "") {
        $("#ppwd").addClass("divts");
        $("#ppwd").html("请输入密码");
        $("#pwdico").attr("src", "/Content/images/no1.gif");
        $("#pwdico").show();
        $("#pwd").focus();
        return false;
    }
    else {
        if (pwd.length < 6 || pwd.length > 18) {
            $("#ppwd").addClass("divts");
            $("#ppwd").html("密码6-18位字符");
            $("#pwdico").attr("src", "/Content/images/no1.gif");
            $("#pwdico").show();
            $("#pwd").focus();
            return false;
        }
        else {
            $("#ppwd").removeClass("divts");
            $("#pwdico").attr("src", "/Content/images/yes1.gif");
            $("#pwdico").show();
            $("#ppwd").html("");
        }
    }
    var pwd1 = $("#pwd1").val();
    if (pwd1 != pwd) {
        $("#ppwd1").addClass("divts");
        $("#ppwd1").html("确认密码不一致，请核查");
        $("#pwd1ico").attr("src", "/Content/images/no1.gif");
        $("#pwd1ico").show();
        $("#pwd1").focus();
        return false;
    }
    else {
        $("#ppwd1").removeClass("divts");
        $("#pwd1ico").attr("src", "/Content/images/yes1.gif");
        $("#pwd1ico").show();
        $("#ppwd1").html("");
    }
    /*验证验证码*/
    var code = $("#code").val();
    if (code == "") {
        alert("请输入验证码");
        $("#code").focus();
        return false;
    }
    else {
        var r = Math.random();
        var url = "/member/ValidCode?code=" + code + "&r=" + r + "";
        $.ajax({
            type: "GET",
            url: url,
            timeout: 30000,
            success: function (msg) {
                if (msg == "false") {
                    alert("验证码不正确，请重新输入");
                    $("#validcode").attr("value", "error");
                    $("#code").focus();
                    //setcode();
                }
                else {
                    $("#validcode").attr("value", "ok");
                    var validcode = $("#validcode").val();
                    if (validcode == "ok") {
                        obj = document.getElementsByName("agree")[0];
                        if (obj.checked == false) {
                            alert("您必须接受风采旅行社协议，才能继续注册");
                            return false;
                        }
                        else {
                            $("#formReg").submit();
                        }
                    }
                }
            }
        }
        )
    }
}
/*验证会员登录*/
function ValidLogin() {
    var username = $("#username").val();
    username = username == "手机号/邮箱" ? "" : username;
    if (username == "") {
        alert("请输入会员卡号");
        $("#username").focus();
        return false;
    }
    var password = $("#password").val();
    if (password == "") {
        alert("请输入登录密码");
        $("#password").focus();
        return false;
    }
    $("#formLogin").submit();
}