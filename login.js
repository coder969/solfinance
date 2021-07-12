function dosumit()
{
	$("loadts").style.display = '';	
	obj=document.getElementById("username");
	if(obj.value==""){
		$("loadts").innerHTML = '<img src="/img/icon1.gif" />请您输入账户。';
		return false;
	}
	
	if(!egrMobileCheck(obj.value)){
		if(!checkMail(obj.value)){
			if(isNaN(obj.value)){
				$("loadts").innerHTML = '<img src="/img/icon1.gif" />请您正确输入账户。';
				return false;
			}
		}
	}
	obj=document.getElementById("passwd")
	if(obj.value==""){
		$("loadts").innerHTML = '<img src="/img/icon1.gif" />请您输入密码。';
		return false;
	}
	
	obj = document.getElementById("code");
	if(obj){
		if(obj.value==""){
			$("loadts").innerHTML = '<img src="/img/icon1.gif" />请您输入验证码。';
			return false;
		}
	}
	
	$("loadts").innerHTML = '';
	return true;
}
function GetLogin()
{
	strTemp = document.getElementById("username");
	/*
	var TempLogin,strTemp,temp;
	temp=""
	temp = GetCookieData("Keepname");
	if(temp!="") {
		strTemp.value=temp;
		document.getElementById("passwd").focus();
	}else{
		
	}*/
	strTemp.onfocus= new Function("usernamefocus()");
	strTemp.onblur= new Function("usernameblur()");
	InitForm( "formLogin" , "inputd_hover" );
}

function GetLoginUserName()
{
	var TempLogin,strTemp,temp;
	temp=""
	strTemp=document.getElementById("username");
	temp = GetCookieData("Keepname");
	if(temp!="") strTemp.value=temp;

	strTemp.onfocus= new Function("usernamefocus()")
	strTemp.onblur= new Function("usernameblur()")		
	
}

function usernamefocus()
{
	var TempLogin;
	TempLogin = document.getElementById("username")
	if(TempLogin.value=="会员卡号/手机号/邮箱") TempLogin.value='';
	else{TempLogin.select();}
}
function usernameblur()
{
	var TempLogin;
	TempLogin=document.getElementById("username")
	if(TempLogin.value=='') TempLogin.value='会员卡号/手机号/邮箱'
}
function setcode()
{
	document.getElementById("Checkcode").src="";
	document.getElementById("Checkcode").src="Code.php?id="+new Date();
	
}