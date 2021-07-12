var expireTime = null, startTime = null, xmlHttp = null, start_price = null, visitHistory, line_id, lineContentStartWidth = { tableWidth:712, tableTdTipWidth:89, tableTdWidth:89 }, LineStartDate = "";

function LineShareEmail( line_name, price){
	eamil_title = "来自您朋友的推荐：" + line_name;
	eamil_content = "HI，最近好吗？\n" + "我现在在一家网站上看到了一个比较不错的旅游推荐，分享给你。\n" +
		"工作之余，找个时间给自己休个假吧。\n\n" +
		line_name + " (" + price + ")" + "\n" + 
		location.href;

	eamil_content_default = "HI，最近好吗？<BR>" + 
		"我现在在一家网站上看到了一个比较不错的旅游推荐，分享给你。<BR>" +
		"工作之余，找个时间给自己休个假吧。<BR><BR>" +
		"<strong style='font-size:14px;'>" + line_name.replace("<","[").replace(">","] ") + " <span style='color:red;'>&yen;" + price + "</span></strong>" + "<BR>" + 
		location.href;		
		
	showEmalShare(eamil_title, eamil_content,"",eamil_content_default);
	return;
}

function addNum(val,objId){
	var obj = $(objId);
	var num = obj.value * 1;
	var new_num = num + val;
	if(new_num<=999 && new_num>=0)
		obj.value = new_num;

	AdultNum_value = $('adult_num').value;
	if($('kid_num'))
		KidNum_value = $('kid_num').value;

	ResetInsurOption();
	ShowTotalPrice($('form1'));
	return;
}

function DoSubmit(formObj){
	var formInputObjArray = formObj.getElementsByTagName("input");
	var thisTimeValue = "",AdultNumValue ="", KidNumValue = "";
	for(var i=0; i<formInputObjArray.length; i++){
		switch(formInputObjArray[i].name){
			case "thisTime":
				thisTimeValue = formInputObjArray[i].value;
				break;
			case "AdultNum":
				AdultNumValue = formInputObjArray[i].value;
				break;
			case "KidNum":
				KidNumValue = formInputObjArray[i].value;
				break;
			default:
				break;
		}
	}
	
	var formSelectObjArray = formObj.getElementsByTagName("select");
	for(var i=0; i<formSelectObjArray.length; i++){
		switch(formSelectObjArray[i].name){
			case "thisTime":
				thisTimeValue = formSelectObjArray[i].value;
				break;
			case "AdultNum":
				AdultNumValue = formSelectObjArray[i].value;
				break;
			case "KidNum":
				KidNumValue = formSelectObjArray[i].value;
				break;
			default:
				break;
		}
	}	

	if(thisTimeValue=="" || thisTimeValue=="请输入日期"  ){
		alert("请您选择参团时间");
		return false;
	}
		
	if(AdultNumValue=="" || isNaN(AdultNumValue) || AdultNumValue<1){
		alert("请您输入预定数(数字)");
		return false;
	}

	if(KidNumValue!="" && isNaN(KidNumValue) ){
		alert("请您输入儿童参团人数(数字)");
		return false;
	}	
	
	return true;
}

var ExtraDescTimeObjArray = [];
hideInsurDesc = function(id){
	ExtraDescTimeObjArray[id] = setTimeout('hideAction('+id+')',500);
	return ;
}

clearTimeOutInsur = function(id){
	try{
		clearTimeout(ExtraDescTimeObjArray[id]);
	}catch(e){}
}
hideAction = function(id){
	obj = $('insurDesc_' + id);
	obj.className='dpn';
//	str = $('insurA_' + id).innerHTML;
//	str = str.substring(0,str.length-1);
//	$('insurA_' + id).innerHTML = str;
	return;
}
showInsurDesc = function(id){
	clearTimeOutInsur(id);
	obj = $('insurDesc_' + id);
	obj.className='';
//	str = $('insurA_' + id).innerHTML;
//	str = str.substring(0,str.length-1);
//	$('insurA_' + id).innerHTML = str;
	return;
}

OrderInfoVerify = function(){
	
	var adultNum=0,kidNum=0,Insurance_num=0,RoomFall_num=0,UsedCoupons=0,UsedTravelCoupons=0;
	adultNum = $('adult_num').value; 
	if($('kid_num'))
		kidNum = $('kid_num').value; 
	
	var insurStr = '';
	for(var id in InsurArr){
		if(insurStr!='')
			insurStr += ',';
		num = $('insur_'+id).value;
		insurStr += id+'_'+num+'_'+InsurArr[id][2];
	}
	
	if($('CouponsFlag') && $('CouponsFlag').checked){
		UsedCoupons = $('usedCoupons').value;
	}
	if($('TravelCouponsFlag') && $('TravelCouponsFlag').checked){
		UsedTravelCoupons = $('usedTravelCoupons').value;
	}
	if(adultNum==0 && kidNum==0){
		alert('请选择预定人数。');
		return false;
	}
//alert(adultNum);return false;
	var _url = "/order/orderInfoAction.php?AdultNum=" + adultNum + "&KidNum=" + kidNum + "&insurStr="+insurStr+ "&UsedTravelCoupons="+UsedTravelCoupons + "&UsedCoupons="+UsedCoupons + "&rnd="+new Date();	
	
	returnFuc = function(returnValue){
		try{//alert(returnValue);return;
			eval(returnValue);
		}catch(e){
			alert('网络繁忙1，请您稍后再试。');
			return false;
		}

		if(errorFlag==1){
			//出错
			alert(msgString);
			return false;
		}
	
		if(user_id>0){
			//用户已经登陆
			window.location = "/order/orderContact.php";
			return;
		}
		
		//用户登陆准备的html
		var showTempString	=	'';
			showTempString	+=	'<div id="loadpop">';
			
			showTempString	+=	'<div class="loadpop_tl"></div>';
			showTempString	+=	'<div class="loadpop_tr"></div>';
			showTempString	+=	'<div class="loadpop_bl"></div>';
			showTempString	+=	'<div class="loadpop_br"></div>';
			
			
			showTempString	+=	'<div class="loadpop_t">';
			showTempString	+=	'<img src="../img/c2.gif" style="cursor:pointer" onClick="HidDiv();" />';
			showTempString	+=	'<strong>登录/快速预定</strong>';
			showTempString	+=	'</div>';
			
			showTempString	+=	'<table width="100%" border="0" cellspacing="0" cellpadding="0">';
			showTempString	+=	'<tr>';
			showTempString	+=	'<td height="177" valign="top" class="loadpoprborder">';
			showTempString	+=	'<div class="loadpop_ts"><strong>会员预定</strong></div>';
			showTempString	+=	'<div id="formLoginMsg" class="loadts">&nbsp;</div>';
			showTempString  +=  '<form action="/order/order-login-action.php" id="formLogin" name="formLogin" method="post" onsubmit="return DoSubmitLogin(this)">';
			showTempString	+=	'<input type="hidden" name="actionType" value="0" id="actionType" />';
			showTempString	+=	'<table width="310" border="0" cellspacing="0" cellpadding="0" style="margin:auto;">';

			showTempString	+=	'<tr>';
			showTempString	+=	'<td width="42" height="38" align="center">账户：</td>';
			showTempString	+=	'<td width="268"><input type="text" name="username" id="username" value="会员卡号/手机号/邮箱" maxlength="50" style=" width:200px;" class="order_input1" /></td>';
			showTempString	+=	'</tr>';
			
			showTempString	+=	'<tr>';
			showTempString	+=	'<td height="38" align="center">密码：</td>';
			showTempString	+=	'<td><input type="password" name="passwd" id="passwd" maxlength="14" style=" width:200px;" class="order_input1" />';
			showTempString	+=	' <a href="/users/GetPass.php" target="_blank" style="color:#999999; text-decoration:underline;">忘记密码?</a></td>';
			showTempString	+=	'</tr>';
			
			showTempString	+=	'<tr>';
			showTempString	+=	'<td height="53">&nbsp;</td>';
			showTempString	+=	'<td><input type="image" src="/img/dl.gif" width="81" height="29" />　<img src="../img/zc.gif" width="120" height="29" style="cursor:pointer" onClick="window.open(\'/users/register.php\');"  /></td>';
			showTempString	+=	'</tr>';
			
	//		
			showTempString	+=	'</table>';
			showTempString  +=  '</form>';
			showTempString	+=	'</td>';
			showTempString	+=	'<td valign="top" class="loadpoplborder">';
			showTempString	+=	'<div class="loadpop_ts"><strong>新客户预定</strong></div>';
			showTempString	+=	'<div id="formMobileMsg" class="loadts" style=" padding-left:70px">&nbsp;</div>';
			showTempString  +=  '<form action="/order/order-login-action.php" id="formMobile" name="formMobile" method="post" onsubmit="return DoSubmitMobile(this)">';
			showTempString	+=	'<input type="hidden" name="actionType" value="1" id="actionType" />';			

			showTempString	+=	'<table width="310" border="0" cellspacing="0" cellpadding="0" style="margin:auto;">';
			showTempString	+=	'<tr>';
			showTempString	+=	'<td width="56" height="38" align="center">手机号：</td>';
			showTempString	+=	'<td width="254"><input type="text" name="mobile" id="mobile" maxlength="11" style=" width:200px;" class="order_input1" /></td>';
			showTempString	+=	'</tr>';
			
			showTempString	+=	'<tr>';
			showTempString	+=	'<td height="50">&nbsp;</td>';
			showTempString	+=	'<td><input type="image" src="../img/ksyd.gif" width="91" height="29" /></td>';
			showTempString	+=	'</tr>';
			showTempString	+=	'<tr>';
			showTempString	+=	'<td height="35">&nbsp;</td>';
			showTempString	+=	'<td style="color:#999;">订单提交后，我们会尽快联系您</td>';
			showTempString	+=	'</tr>';
			
			showTempString	+=	'</table>';
			showTempString  +=  '</form>';		
			showTempString	+=	'</td>';
			showTempString	+=	'</tr>';
			showTempString	+=	'</table>';
			showTempString	+=	'</div>';		
	//document.write(showTempString);
		if(ShowMsgDiv==null || !ShowMsgDiv) {
			ShowMsgDiv = new DivMsg();
			ShowMsgDiv.init();
		}
		ShowMsgDiv.HeightAdd = 160;
		ShowDivContent(showTempString);
	
		$("username").onfocus = function(){
			if($("username").value=="会员卡号/手机号/邮箱"){
				$("username").value = '';
			}
			return;
		}
		$("username").onblur = function(){
			if($("username").value==''){
				$("username").value = "会员卡号/手机号/邮箱";
			}
			return;
		}	
		InitForm( "formLogin" , "order_input1_hover" );
		InitForm( "formMobile" , "order_input1_hover" );
		return false;
	}
	
	ajxaSend( _url, "get", null, returnFuc );
	return false;
}


function DoSubmitLogin(formObj){
	var usernameValue = $("username").value;
	var passwdValue = $("passwd").value;
	
	if( usernameValue=="" || usernameValue=="会员卡号/手机号/邮箱" ){
		$("formLoginMsg").innerHTML = "请您输入账户。";
		$("username").focus();
		return false;
	}
	
	if( passwdValue=="" ){
		$("formLoginMsg").innerHTML = "请您输入密码。";
		$("passwd").focus();
		return false;
	}
	
	var _url = "/order/orderLoginAction.php?username=" + encodeURIComponent(usernameValue) + 
			"&passwd=" + encodeURIComponent(passwdValue) + 
			"&rnd=" + new Date();
	returnFuc = function(returnValue){
		try{
			eval(returnValue);
		}catch(e){
			$("formLoginMsg").innerHTML = "网络繁忙，请您稍后再试。";
			return false;
		}
		
		if(errorFlag==1){	//出错
			$("formLoginMsg").innerHTML = msgString;
			return false;
		}		
		
		var Days=36500;
		var exp=new Date();
		exp.setTime(exp.getTime()+Days*24*60*60*1000);
		document.cookie = "Keepname=" + escape(user_show_name) + ";path=/;expires=" + exp.toGMTString() + ";domain=.landtu.com;";
		document.cookie = "Email=" + escape(email) + ";path=/;expires=" + exp.toGMTString() + ";domain=.landtu.com;";		

		window.location = "/order/orderContact.php";
		return false;
	}
	ajxaSend( _url, "get", null, returnFuc );
	return false;
}

function DoSubmitMobile(formObj){
	var mobileValue = $("mobile").value;
	if( mobileValue=="" ){
		$("formMobileMsg").innerHTML = "请您输入手机号码。";
		$("mobile").focus();
		return false;
	}
	if(!egrMobileCheck(mobileValue)){
		$("formMobileMsg").innerHTML = "请您正确输入手机号码。";
		$("mobile").focus();
		return false;
	}
	
	returnFuc = function(text){
		if(text=="0"){
			window.location = "/order/orderContact.php?mobile=" + $("mobile").value;
			return true;
		}else{
			$("formMobileMsg").innerHTML = '该手机号码已经注册成为用户了，请您重新输入。';
			return false;
		}
	}
	axajSend( "/users/CheckMobile.php?m=" +Math.random()+"&mobile="+mobileValue, "GET", null , returnFuc );	

	return false;
}

OnSelectDate = function(){
	document.getElementById("thisTimeMsg").style.color='#333333';
	document.getElementById("AdultNum").focus();

	var GroupDate = document.getElementById("thisTime").value;
	var Year = parseInt(GroupDate.substr(0,4),10);
	var Month = parseInt(GroupDate.substr(5,2),10);
	var Day = parseInt(GroupDate.substr(8,2),10);
	var temp = GetPlan(CaculateDay(Year,Month - 1,Day));
	
	if(temp==null)
		return;
	document.getElementById("price").innerHTML='<br />　'
		+ '<font style="font-family:宋体">*</font><strong>'
		+ GroupDate
		+'预定价格为 </strong>成人价格 ￥<font color="#FF3300">'
		+ temp.AdultPrice
		+ '</font>　儿童价格 ￥<font color="#FF3300">'
		+ temp.KidPrice
		+'</font>'
		+ '';	
}


function showDisplay(){
	tempObj = document.getElementById("doDisplay").getElementsByTagName("TR");
	for(var i=0; i<tempObj.length; i++)
	{
		tempObj[i].style.display="";
	}
	document.getElementById("doDisplayNone").style.display="none";
	
}

function goDown(length){
	var where = document.getElementById('doDisplay').scrollTop + (length);
	if(where<0) 
		where=1;
	document.getElementById('doDisplay').scrollTop = where;


	return false;
}


function changeAdultNum(num,formName){
	if(isNaN(num)){
		var s = '<input type="text" value="" name="AdultNum" id="AdultNum" maxlength="4" style="width:45px;" onkeyup="changeAdultNum(this.value,\''+formName+'\');">';
		switch(formName){
			case "form1":
				if(document.getElementById('AdultNumHtmlFir')){
					document.getElementById('AdultNumHtmlFir').innerHTML = s;
				}
				break;
			case "form2":
				if(document.getElementById('AdultNumHtmlSec')){
					document.getElementById('AdultNumHtmlSec').innerHTML = s;
				}
				break;
		}
		
	}
	
	ShowTotalPrice($(formName));
	return;
}

function changeKidNum(num,formName){
	if(isNaN(num)){
		var s = '<input type="text" value="" name="KidNum" id="KidNum" maxlength="4" style="width:45px;" onkeyup="changeAdultNum(this.value,\''+formName+'\');">';			
		switch(formName){
			case "form1":
				if(document.getElementById('KidNumHtmlFir')){
					document.getElementById('KidNumHtmlFir').innerHTML = s;
				}
				break;
			case "form2":
				if(document.getElementById('KidNumHtmlSec')){
					document.getElementById('KidNumHtmlSec').innerHTML = s;
				}
				break;
		}			
			
	}
	ShowTotalPrice($(formName));
	return;
}

function change_kid_num(num){
	if(isNaN(num)){
		var s = '<input type="text" value="" name="KidNum" id="KidNum" maxlength="3" style="width:45px;" onkeyup="change_adult_num(this.value);">';			
		
		if(document.getElementById('KidNumHtmlFir')){
			document.getElementById('KidNumHtmlFir').innerHTML = s;
		}
			
	}
	ShowTotalPrice();
	return;
}
function change_adult_num(num){
	if(isNaN(num)){
		var s = '<input type="text" value="" name="AdultNum" id="AdultNum" maxlength="3" style="width:45px;" onkeyup="change_adult_num(this.value);">';
		if(document.getElementById('AdultNumHtmlFir')){
			document.getElementById('AdultNumHtmlFir').innerHTML = s;
		}
		
	}
	
	ShowTotalPrice();
	return;
}

changeRoomNum = function(num){
	if(isNaN(num)){
		var s = '<input type="text" value="" name="room_num" id="room_num" maxlength="4" style="width:45px;">';
		if(document.getElementById('RoomNumHtmlSec'))
			document.getElementById('RoomNumHtmlSec').innerHTML = s;
	}
	return;
}


function newSelectStartDate(date)
{
	var tempObjArray = document.getElementsByName('thisTime');
	for(var i=0; i<tempObjArray.length; i++ ){
		tempObjArray[i].value = date;
	}
	return;
}

function SelectStartDate(date)
{
	document.getElementById('thisTime').value=date;; 
	document.getElementById('AdultNum').select();
	OnSelectDate();
}

//显示访问记录
var newShowContent = "";
function SetNewVisitHistory(line_name,type,contentType){
	var showString = "", writeCookie = "", cookieName = "", line_url = window.location.href;
	switch(type){
		/*
		case "2":
			cookieName = "vacationNewVisitHistory";
			break;
		*/
		default:
			cookieName = "productVisitHistory";
			break;
	}	

	var visitCookieSting = GetCookieData(cookieName);
	var tempArray_1 = visitCookieSting.split("@@");
	var visitArray = [];
	var index = 0;
	for(var i=0; i<tempArray_1.length; i++){
		var tempArray_2 = tempArray_1[i].split(",");
		if(tempArray_2.length<4) 
			continue;
		if(isNaN(tempArray_2[0]) || tempArray_2[0]=="") 
			continue;
			
		if( tempArray_2[1]=="") 
			continue;
			
		if( tempArray_2[0]*1 == line_id*1 && tempArray_2[2]*1 ==type*1 )
			continue;
		
		visitArray[index] = {
			"line_id":tempArray_2[0],
			"line_name":(tempArray_2[1]),
			"line_type":tempArray_2[2],
			"line_url":tempArray_2[3]
		};
		if(index++>6){
			break;
		}
	}	
	
	writeCookie += (line_id + ',' + escape(line_name) + "," + type + "," + line_url );
	for(var i=0; i<visitArray.length; i++ ){
		if(visitArray[i]["line_name"]=="")
			continue;
			
		writeCookie += "@@" + visitArray[i]["line_id"] + ',' + escape(visitArray[i]["line_name"]) + ',' + visitArray[i]["line_type"] + ',' + visitArray[i]["line_url"] ;
		
		newShowContent += '<li';
		if(i==0){
			newShowContent += ' style="border-top:none;"';
		}else if(i==visitArray.length-1){
			newShowContent += ' style="border-bottom:none;"';
		}
		newShowContent += '>';
		newShowContent += '<a href="'+visitArray[i]["line_url"]+'">'+visitArray[i]["line_name"]+'</a>';
		newShowContent += showString+'</li>';
	}
	if(newShowContent!="")
		newShowContent = '<div id="tlr_title"><h3>最近浏览过的线路</h3></div><ul id="tlr_list">' + newShowContent + '</ul>';

	if(contentType!=1){
		HtmlInitFuc(function(){
			var visitHistory = document.getElementById('visitHistory');
			if(!visitHistory) 
				return;
			visitHistory.style.textAlign = "left";
			visitHistory.style.padding = "0";
			visitHistory.innerHTML = showString;
			return;
		});
	}	

	var Days = 365; //此 cookie 将被保存 90 天
    var exp  = new Date();    //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days*24*60*60*1000);	
	document.cookie = cookieName+"="+(writeCookie)+";expire="+ exp.toGMTString()+";path=/;domain=.landtu.com;";
	return;
}



writeVisitContent = function(){
	document.write(newShowContent);
	return;
}


//新的图片显示效果
ImgShowAction = function(){
	if(LinePhotoString.length==0)
		return;
	
	var contentString = "";
	for(var i=0; i<LinePhotoString.length; i++){
		contentString += '<img src="'+LinePhotoString[i][0]+'" width="48" height="33" style="cursor:pointer" onmouseover="bigImgShow(this,'+i+')" onmouseout="hidBigShow();"  onclick="document.getElementById(\'showPageImg\').src=\''+LinePhotoString[i][1]+'\'" />';
	}
	document.write(contentString);
	return;
}

bigImgShow = function(obj,curPointIndex){
	if(curPointIndex>=LinePhotoString.length)
		return;
	
	//显示层
	var showObjDiv = document.getElementById( "imgBigDiv" );
	if(!showObjDiv){
		showObjDiv = document.createElement('DIV');
		showObjDiv.style.display='none';
		showObjDiv.style.position='absolute';
		showObjDiv.id='imgBigDiv';
		var bs = document.getElementsByTagName('BODY');
		bs[0].appendChild(showObjDiv);
	}
	
	
	//显示内容
	var tempString = "", addWidth = 8;
	tempString = '<iframe MARGINWIDTH=0 MARGINHEIGHT=0 HSPACE=0 VSPACE=0 FRAMEBORDER=0 SCROLLING=no ';
	if(LinePhotoString[curPointIndex][2]>300){
		tempString +=' width="'+(300+addWidth)+'"';
		tempString +=' height="'+(300*LinePhotoString[curPointIndex][3]/LinePhotoString[curPointIndex][2]*1+addWidth)+'"';
	}else{
		tempString +=' width="'+(LinePhotoString[curPointIndex][2]*1+addWidth)+'"';
		tempString +=' height="'+(LinePhotoString[curPointIndex][3]*1+addWidth)+'"';
	}
	tempString +='  id="ShowBigImgIframe" ></iframe>';
	showObjDiv.innerHTML = tempString;
	
	var frame;
	try{
		frame = document.frames("ShowBigImgIframe").document	
	}catch(e){
		try{
			frame = document.getElementById('ShowBigImgIframe').contentDocument
		}catch(e){}
	}

	
	var showObjDivInnerHTML = '<div style="border:1px solid #D8E7FE;"><img style="padding:3px; background:#fff;" src="'+LinePhotoString[curPointIndex][1]+'" ';
	if(LinePhotoString[curPointIndex][2]>300){
		showObjDivInnerHTML += ' width="300"';
		showObjDivInnerHTML += ' height="'+300*LinePhotoString[curPointIndex][3]/LinePhotoString[curPointIndex][2]*1+'"';
	}else{
		showObjDivInnerHTML += ' width="'+LinePhotoString[curPointIndex][2]*1+'"';
		showObjDivInnerHTML += ' height="'+LinePhotoString[curPointIndex][3]*1+'"';
	}
	showObjDivInnerHTML += '/></div>';
	
	tempString  = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';
	tempString += '<html xmlns="http://www.w3.org/1999/xhtml">';
	tempString += '<head>';
	tempString += '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';
	tempString += '<title></title>';
	tempString += '<style>';
	tempString += '*{ margin:0; padding:0;}';
	tempString += '</style>';
	tempString += '</head>';
	tempString += '<body>';
	tempString += showObjDivInnerHTML;
	tempString += '</body>';
	tempString += '</html>';	
	
	frame.open();
	frame.write(tempString);
	frame.close();
	
	
	//定位
	var OBTop=0,OBLeft=0,OBWidth=0,OBHeight=0;
	var oCurrentNode = obj;
	while(oCurrentNode != null && oCurrentNode.tagName != "BODY"){
		OBTop += oCurrentNode.offsetTop;
		OBLeft += oCurrentNode.offsetLeft;
		oCurrentNode = oCurrentNode.offsetParent;
	}
	OBTop += document.getElementsByTagName('BODY')[0].offsetTop 
	OBLeft += document.getElementsByTagName('BODY')[0].offsetLeft 

	showObjDiv.style.top = (OBTop + 4 + obj.offsetHeight + "px");
	showObjDiv.style.left = (OBLeft  + 0 + "px");

	if( (300*LinePhotoString[curPointIndex][3]/LinePhotoString[curPointIndex][2]+OBTop*1)*1 >(document.documentElement.clientHeight*1+document.documentElement.scrollTop)*1){
		showObjDiv.style.top = (OBTop - 0 + "px");
		showObjDiv.style.left = (OBLeft  + obj.offsetWidth + 4 + "px");
	}

	//显示层
	showObjDiv.style.display='';
	return;
}


hidBigShow = function(){
	var showObjDiv = document.getElementById( "imgBigDiv" );
	if(!showObjDiv)
		return;
	showObjDiv.style.display='none';
	return;
}



//线路详细页面的幻灯片
whereHotImgPage = 1;
nextEnd = false;
preEnd = false;
hotImgOnePageNum = 5;
hotImgTotalPage = 0;
hotImgCurPage = 1;
hotImgWhere = 0;
var imgListObj = [];


showHotImg = function(){
	
	if(LinePhotoString.length==0)
		return;
	HtmlInitFuc(function(){
		for(var i=0; i<LinePhotoString.length; i++){
			imgListObj[i] = new Image();
			imgListObj[i].src = LinePhotoString[0][1];	
		}
		return;
	});	
	hotImgTotalPage = parseInt(LinePhotoString.length/hotImgOnePageNum,10);
	if(hotImgTotalPage*hotImgOnePageNum<LinePhotoString.length) hotImgTotalPage = hotImgTotalPage+1;
	
	var writeHtmlSting = "";
	writeHtmlSting += '<div id="tlpic">';
	writeHtmlSting += '<img src="';
	writeHtmlSting += LinePhotoString[0][1];
	writeHtmlSting += '" style="filter:revealTrans(Transition=1,Duration=0.9); cursor:pointer;" onclick="goImgNext();" />';
	writeHtmlSting += '</div>';
	writeHtmlSting += '<div id="tlpictol">第 <span id="curPage">'+hotImgCurPage+'</span> 张  共 '+LinePhotoString.length+' 张</div>';
	writeHtmlSting += '<div id="tlpicdiv">';
	
	writeHtmlSting += '<div class="tlpiculdiv1" id="goPicPre"><a href="#" onclick="goPre();return false;"><img src="../images/img/tlpic_ls.jpg" /></a></div>';
	
	if(LinePhotoString.length>5)
		writeHtmlSting += '<div class="tlpiculdiv2" id="goPicSec"><a href="#" onclick="goNext();return false;"><img src="../images/img/tlpic_r.gif" /></a></div>';
	else
		writeHtmlSting += '<div class="tlpiculdiv2" id="goPicSec"><a href="#" onclick="goNext();return false;"><img src="../images/img/tlpic_rs.jpg" /></a></div>';	
	
	
	writeHtmlSting += '<div style="width:586px; overflow:hidden; white-space:nowrap; margin-left:6px; padding-left:2px;" id="LineShowImgList">';
	writeHtmlSting += '<div style="width:'+(hotImgTotalPage*hotImgOnePageNum*120)+'px; white-space:nowrap;" id="LineShowImgList">';	
	writeHtmlSting += '<ul id="tlpicul">';
	for(var index=0; index<LinePhotoString.length; index++){
		writeHtmlSting += '<li style="cursor:pointer" onclick="selectSmallImg('+index+');"';
		if(index==0)
			writeHtmlSting += ' class="tlpicli"';
		writeHtmlSting += '>';
		writeHtmlSting += '<img src="';
		writeHtmlSting += LinePhotoString[index][0];
		writeHtmlSting += '" />';
		writeHtmlSting += '</li>';
	}

	writeHtmlSting += '</ul>';
	writeHtmlSting += '</div>';
	writeHtmlSting += '</div>';
	writeHtmlSting += '</div>';
	
	document.write(writeHtmlSting);
	return;
}

selectSmallImg = function(whereIndex){
	var BigImgObj = document.getElementById('tlpic').getElementsByTagName("img")[0];
	var tempLiArray = document.getElementById('tlpicdiv').getElementsByTagName("li"); 

	for(var index=0; index<tempLiArray.length; index++){
		tempLiArray[index].className = "";
	}
	tempLiArray[whereIndex].className = "tlpicli";
	hotImgWhere = whereIndex;
	
	document.getElementById('curPage').innerHTML = hotImgWhere+1;
	
	try{
		BigImgObj.filters.item(0).transition = 12;
		BigImgObj.filters.item(0).Apply();
		BigImgObj.src = LinePhotoString[whereIndex][1]
		BigImgObj.filters.item(0).Play();
	}catch(e){
		BigImgObj.src = LinePhotoString[whereIndex][1]
	}		
	return;
}

goImgNext = function(){
	var tempLiArray = document.getElementById('tlpicdiv').getElementsByTagName("li"); 	
	if( hotImgWhere + 1 <tempLiArray.length )
		hotImgWhere = hotImgWhere + 1;
	else
		return;
		
	selectSmallImg(hotImgWhere);
	if(hotImgWhere+1 > hotImgCurPage * hotImgOnePageNum)
		goNext();
	return;
}

goPre = function(){
	var goPicPreObj = document.getElementById('goPicPre');
	var PicPreImgObj = goPicPreObj.getElementsByTagName("img")[0];
	var goPicSecObj = document.getElementById('goPicSec');
	var PicSecImgObj = goPicSecObj.getElementsByTagName("img")[0];
	
	if(preEnd){
		return;	
	}
	
	hotImgCurPage = hotImgCurPage-1;
	if(hotImgCurPage<=1){
		PicPreImgObj.src = "../images/img/tlpic_ls.jpg";
		hotImgCurPage = 1;
		preEnd = true;
	}else{
		PicPreImgObj.src = "../images/img/tlpic_l.gif";
	}
	
	goHotImgMove(-119*5);
	
	PicSecImgObj.src = "../images/img/tlpic_r.gif";
	nextEnd = false;
	return;
}

goNext = function(){
	var goPicPreObj = document.getElementById('goPicPre');
	var PicPreImgObj = goPicPreObj.getElementsByTagName("img")[0];
	var goPicSecObj = document.getElementById('goPicSec');
	var PicSecImgObj = goPicSecObj.getElementsByTagName("img")[0];
	
	if(LinePhotoString.length<=5){
		PicSecImgObj.src = "../images/img/tlpic_rs.jpg";
		return;
	}
	if(nextEnd){
		return;
	}
	
	hotImgCurPage = hotImgCurPage + 1;
	if(hotImgCurPage>=hotImgTotalPage){
		PicSecImgObj.src = "../images/img/tlpic_rs.jpg";
		nextEnd = true;
	}
	goHotImgMove(119*5);
	
	PicPreImgObj.src = "../images/img/tlpic_l.gif";
	preEnd = false;
	return;
}


function goHotImgMove(length){
	var where = document.getElementById('LineShowImgList').scrollLeft + (length);
	if(where<0) {
		document.getElementById('LineShowImgList').scrollLeft = 0;
		return;
	}
//		document.getElementById('LineShowImgList').scrollLeft = where;
//		return;
	document.getElementById('LineShowImgList').scrollLeft += length - parseInt(length/onceMoveLength,10)*onceMoveLength 
	clearInterval(MyMar);
	runLength += parseInt(length/onceMoveLength,10);
	MyMar=setInterval(autoMoveHotImg,speed);
	//document.getElementById('LineShowImgList').scrollLeft = where;
	return;
}
var speed = 1;
var runLength = 0;
var MyMar;
var onceMoveLength = 40	//一次移动的距离
autoMoveHotImg = function(){
	if(runLength==0){
		clearInterval(MyMar);
		return;
	}
	if(runLength>0){
		document.getElementById('LineShowImgList').scrollLeft+=onceMoveLength;
		runLength-=1;
	}else{
		document.getElementById('LineShowImgList').scrollLeft-=onceMoveLength;
		runLength+=1;
	}	
	return;
}


//页面top
var showLineDivIndex, showLineDivIntervalObj, showLineDivIntervalUpObj, showLineDivPageUpIndex = 150;
goTop = function(){
	clearInterval(showLineDivIntervalUpObj);
	var diffY = 0, TClientHeight = 0, TClientWidth = 0;
	if(document.documentElement && document.documentElement.scrollTop){
		diffY = document.documentElement.scrollTop;
		TClientHeight = document.documentElement.clientHeight;
		TClientWidth = document.documentElement.clientWidth;
	}else if (document.body){
		diffY = document.body.scrollTop;
		TClientHeight = window.innerHeight; 
		TClientWidth = window.innerWidth; 
	}else{
		/*Netscape stuff*/
		return true;
	}
	showLineDivPageUpIndex = parseInt(diffY/6,10);
	showLineDivIntervalUpObj = setInterval("goTopAction()",1);
	return false
}

goTopAction = function(){
	if(document.documentElement && document.documentElement.scrollTop){
		if(document.documentElement.scrollTop>0){
			var tempValue = document.documentElement.scrollTop - showLineDivPageUpIndex;	
			if(tempValue<=0){
				tempValue = 0;
				clearInterval(showLineDivIntervalUpObj);
			}
			document.documentElement.scrollTop = tempValue;			
		}
	}else if (document.body){
		var tempValue = document.body.scrollTop - showLineDivPageUpIndex;	
		if(tempValue<=0){
			tempValue = 0;
			clearInterval(showLineDivIntervalUpObj);
		}		
		document.body.scrollTop = tempValue;	
	}else{
		/*Netscape stuff*/
		return true;
	}	
	return;
}



showLineDivAction = function( objName ){
	if( !objName || objName ==""){
		objName = "topDiv";
	}
	if(showLineDivIndex>10){
		clearInterval(showLineDivIntervalObj);
		return;
	}
	document.getElementById(objName).style.filter = "alpha(opacity = " + (showLineDivIndex*10) + ")";
	document.getElementById(objName).style.opacity = (showLineDivIndex*10)/100;
	showLineDivIndex++;
	return;
}

ShowPageTop = function(){
	
	if(!$("topDiv")){
		var writeHtml = '<a href="#" onclick="return goTop();" title="回到顶部"><img src="http://www.landtu.com/img/top.gif" /></a>';
		var div=document.createElement('DIV');
			div.className = "tline_l_top";
			div.id = "topDiv";
			div.style.top = "0px";
			div.style.display = "none";
			div.innerHTML = writeHtml;
		document.getElementById('tline_l').appendChild(div);
	}
	
	window.onscroll = function(){
		var diffY = 0, TClientHeight = 0;
		if (document.documentElement && document.documentElement.scrollTop){
			diffY = document.documentElement.scrollTop;
			TClientHeight = document.documentElement.clientHeight;
		}else if (document.body){
			diffY = document.body.scrollTop;
			TClientHeight = window.innerHeight; 
		}else{
			/*Netscape stuff*/
			return;
		}
		if(diffY==0){
			document.getElementById("topDiv").style.display = "none";
			return;
		}

		var OBTop = 0;
		var oCurrentNode = $("mainEnd");
		while(oCurrentNode != null && oCurrentNode.tagName != "BODY"){
			OBTop += oCurrentNode.offsetTop;
			oCurrentNode = oCurrentNode.offsetParent;
		}
		OBTop += document.getElementsByTagName('BODY')[0].offsetTop 
		var TMainHeightEnd = OBTop;
		
		var OBTop=0;
		var oCurrentNode = $("page");
		while(oCurrentNode != null && oCurrentNode.tagName != "BODY"){
			OBTop += oCurrentNode.offsetTop;
			oCurrentNode = oCurrentNode.offsetParent;
		}
		OBTop += document.getElementsByTagName('BODY')[0].offsetTop 
		var TMainHeightStart = OBTop;	
		diffY = diffY - TMainHeightStart;
	
		var topDivWhere = parseInt( (TClientHeight*0.8) + diffY , 10 );
		if( (TClientHeight + diffY + 200) > TMainHeightEnd ){
			topDivWhere = topDivWhere + TMainHeightEnd - TClientHeight - diffY - 200;
		}

		document.getElementById("topDiv").style.top = topDivWhere +"px";
		if(document.getElementById("topDiv").style.display=="none"){
			document.getElementById("topDiv").style.display = "";
			document.getElementById("topDiv").style.filter = "alpha(opacity = 0)";
			document.getElementById("topDiv").style.opacity = "0";
			showLineDivIndex = 0;
			showLineDivIntervalObj = setInterval("showLineDivAction('topDiv')",1);
		}
		return;
	}
}

/**********************************集合地点地图*************************************************/

//google地图
var GmarkerArray = [], _showGoogleMeetMap, _baiduMapObj;
function showGoogleMeetMap(){
	this.mapInit = false;
	this.lineMap = null;
	this.lineMapObj = null;
	
	this.moveObj = null;
	this.moveObjTop = 20;
	this.moveObjMoveLength = 29;
	this.mapShowType = 0;			//0 鼠标划过是更改图片   1 鼠标划过显示地图

	this.GmarkerIdArray = [];
	this.GmarkerObjArray = [];
	this.GmarkerContentArray = {};
	this.clickIco = null;
	
	this.timeoutObj = null;
	this.iconUrl = "/img/markers.png";
	return;
}

showGoogleMeetMap.prototype.init = function(){
	_showGoogleMeetMap = this;
	for(var i=0; i<GmarkerArray.length; i++){
		this.GmarkerIdArray.push( GmarkerArray[i]["meet_place_id"] );
		this.GmarkerContentArray[GmarkerArray[i]["meet_place_id"]] = GmarkerArray[i];
	}

	this.lineMapObj = document.getElementById("googleMapDiv");
	this.moveObj = document.getElementById("GoogleMap_d");
	
	this.mapIcoInit();

	//定位
	var OBTop=0, OBLeft=0, OBWidth=0, OBHeight=0, oCurrentNode, obj;
	if(this.GmarkerIdArray.length==0)
		return;
		
	for(var i=0; i<this.GmarkerIdArray.length; i++){		
		obj = document.getElementById("meet_"+this.GmarkerIdArray[i]);
		break;
	}	

	oCurrentNode = $("page");
	while(oCurrentNode != null && oCurrentNode.tagName != "BODY"){
		OBTop += oCurrentNode.offsetTop;
		oCurrentNode = oCurrentNode.offsetParent;
	}
	OBTop += document.getElementsByTagName('BODY')[0].offsetTop 
	var TMainHeightStart = OBTop;	

	OBTop=0;
	oCurrentNode = obj;
	while(oCurrentNode != null && oCurrentNode.tagName != "BODY"){
		OBTop += oCurrentNode.offsetTop;
		OBLeft += oCurrentNode.offsetLeft;
		oCurrentNode = oCurrentNode.offsetParent;
	}
	OBTop += document.getElementsByTagName('BODY')[0].offsetTop 
	OBLeft += document.getElementsByTagName('BODY')[0].offsetLeft 
	
	this.lineMapObj.style.top = (OBTop - 34 + obj.offsetHeight - TMainHeightStart + "px");
	this.lineMapObj.style.left = (310 + 80 + "px");	

	return;
}

showGoogleMeetMap.prototype.mapIcoInit = function(){
	if(this.mapShowType==0){
		for(var i=0; i<this.GmarkerIdArray.length; i++){		
			var imgObj = document.getElementById("meet_"+this.GmarkerIdArray[i]);
			var meetTbodyObj = document.getElementById("meet_tbody_"+this.GmarkerIdArray[i]);
			
			//初始化
			imgObj.style.cursor = "pointer";
			if(meetTbodyObj != this.clickIco){
				var TdObjArray = meetTbodyObj.getElementsByTagName("td");
				for(var index=0; index<TdObjArray.length; index++){
					TdObjArray[index].style.background = "";
				}
			
				var imgTempObj = meetTbodyObj.getElementsByTagName("img");
				for(var index_t=0; index_t<imgTempObj.length; index_t++){
					if( imgTempObj[index_t].id.indexOf("meet_") >=0 ){
						imgTempObj[index_t].src = "http://www.landtu.com/img/jhfd.gif";
					}
				}
			}
			var imgTempObj = meetTbodyObj.getElementsByTagName("img");
			for(var index_t=0; index_t<imgTempObj.length; index_t++){
				if( imgTempObj[index_t].id.indexOf("mapview_") >=0 ){
					imgTempObj[index_t].style.display = "none";
				}
			}
			
			//定义属性
			meetTbodyObj.onclick = function(){
				_showGoogleMeetMap.mapShowType = 1;
				_showGoogleMeetMap.clickIco = this;
				_showGoogleMeetMap.mapIcoInit();

				var imgTempObj = this.getElementsByTagName("img");
				for(var index_t=0; index_t<imgTempObj.length; index_t++){
					if( imgTempObj[index_t].id.indexOf("mapview_") >=0 ){
						imgTempObj[index_t].style.display = '';
					}
				}
						
				var meet_id = this.id.replace("meet_tbody_","");
				_showGoogleMeetMap.showGoogleMap(_showGoogleMeetMap.GmarkerContentArray[meet_id]["lat"],_showGoogleMeetMap.GmarkerContentArray[meet_id]["lng"], meet_id);							
				for(var i=0; i<_showGoogleMeetMap.GmarkerIdArray.length; i++){
					if( meet_id==_showGoogleMeetMap.GmarkerIdArray[i]){
						_showGoogleMeetMap.moveObj.style.top = _showGoogleMeetMap.moveObjTop + _showGoogleMeetMap.moveObjMoveLength*i + "px";
						break;
					}
				}						
				return;
			};	
			
			meetTbodyObj.onmouseover = function(){
				var TdObjArray = this.getElementsByTagName("td");
				for(var index=0; index<TdObjArray.length; index++){
					TdObjArray[index].style.background = "#FFFCEC";
				}
				var imgTempObj = this.getElementsByTagName("img");
				for(var index_t=0; index_t<imgTempObj.length; index_t++){
					if( imgTempObj[index_t].id.indexOf("meet_") >=0 ){
						imgTempObj[index_t].src = "http://www.landtu.com/img/jhfds.gif";
					}
				}
				return;
			};
			
			meetTbodyObj.onmouseout = function(){
				var TdObjArray = this.getElementsByTagName("td");
				for(var index=0; index<TdObjArray.length; index++){
					TdObjArray[index].style.background = "";
				}
				var imgTempObj = this.getElementsByTagName("img");
				for(var index_t=0; index_t<imgTempObj.length; index_t++){
					if( imgTempObj[index_t].id.indexOf("meet_") >=0 ){
						imgTempObj[index_t].src = "http://www.landtu.com/img/jhfd.gif";
					}
				}
				return;
			};
			
		}
	}else{
		for(var i=0; i<this.GmarkerIdArray.length; i++){		
			var imgObj = document.getElementById("meet_"+this.GmarkerIdArray[i]);
			var meetTbodyObj = document.getElementById("meet_tbody_"+this.GmarkerIdArray[i]);
			
			meetTbodyObj.onclick = function(){
				_showGoogleMeetMap.mapShowType = 0;
				_showGoogleMeetMap.clickIco = this;
				_showGoogleMeetMap.mapIcoInit();
				_showGoogleMeetMap.lineMapObj.style.display = 'none';
				return;				
			};			
			
			meetTbodyObj.onmouseover = function(){
				for(var i=0; i<_showGoogleMeetMap.GmarkerIdArray.length; i++){		
					var meetTbodyObj = document.getElementById("meet_tbody_"+_showGoogleMeetMap.GmarkerIdArray[i]);
					var TdObjArray = meetTbodyObj.getElementsByTagName("td");
					for(var index=0; index<TdObjArray.length; index++){
						TdObjArray[index].style.background = "";
					}	
				}
				var imgTempObj = document.getElementById("mapdiv").getElementsByTagName("img");
				for(var index_t=0; index_t<imgTempObj.length; index_t++){
					if( imgTempObj[index_t].id.indexOf("mapview_") >=0 ){
						imgTempObj[index_t].style.display = "none";
					}
				}

				
				var TdObjArray = this.getElementsByTagName("td");
				for(var index=0; index<TdObjArray.length; index++){
					TdObjArray[index].style.background = "#FFFCEC";
				}
				var imgTempObj = this.getElementsByTagName("img");
				for(var index_t=0; index_t<imgTempObj.length; index_t++){
					if( imgTempObj[index_t].id.indexOf("mapview_") >=0 ){
						imgTempObj[index_t].style.display = '';
					}
				}
				var meet_id = this.id.replace("meet_tbody_","");
				_showGoogleMeetMap.showGoogleMap(_showGoogleMeetMap.GmarkerContentArray[meet_id]["lat"],_showGoogleMeetMap.GmarkerContentArray[meet_id]["lng"],meet_id);
				for(var i=0; i<_showGoogleMeetMap.GmarkerIdArray.length; i++){
					if( meet_id==_showGoogleMeetMap.GmarkerIdArray[i]){
						_showGoogleMeetMap.moveObj.style.top = _showGoogleMeetMap.moveObjTop + _showGoogleMeetMap.moveObjMoveLength*i + "px";
						break;
					}
				}						
				return;					
			}
			
			meetTbodyObj.onmouseout = function(){};
			
			var imgTempObj = meetTbodyObj.getElementsByTagName("img");
			for(var index_t=0; index_t<imgTempObj.length; index_t++){
				if( imgTempObj[index_t].id.indexOf("meet_") >=0 ){
					imgTempObj[index_t].src = "http://www.landtu.com/img/jhfds.gif";
				}
			}			
		}	
	}
	return;
}

showGoogleMeetMap.prototype.showGoogleMap = function(latLeft,latRight,meet_id)
{
	//显示
	this.lineMapObj.style.display = '';
	if(!this.mapInit){
		this.mapInit = true;
		
		if(!document.getElementById("GoogleMap")){
			return false;
		}
		this.lineMap = new BMap.Map("GoogleMap");
		
		var point = new BMap.Point( latRight, latLeft);
		this.lineMap.centerAndZoom(point, 15);
		
		var opts = {type : BMAP_NAVIGATION_CONTROL_SMALL}
		this.lineMap.addControl(new BMap.NavigationControl(opts));
		
		//创建一个图标模板，指定阴影等
		function createMarker(markerObj,index,iconUrl){
			var iconUrl = "/img/markers.png";
			var myIcon = new BMap.Icon( iconUrl, new BMap.Size(23, 25), {
				offset : new BMap.Size(10, 25),
				imageOffset : new BMap.Size(0, -index*25)
			});
	
			var point = new BMap.Point(markerObj["lng"], markerObj["lat"]);
			var marker = new BMap.Marker(point, {icon: myIcon});
			marker.setTitle(markerObj["meet_place_name"]);
		
			marker.addEventListener("click", function(){   
				window.open("/line/jihedian_"+line_id+".html#"+index);
				return;
			});


			return marker;
		}
		
		for(var i=0; i<this.GmarkerIdArray.length; i++){
			// 在地图中心添加一个标记 
			this.GmarkerObjArray[i] = createMarker( this.GmarkerContentArray[this.GmarkerIdArray[i]],i,this.iconUrl);
			this.lineMap.addOverlay( this.GmarkerObjArray[i] );
		}
		
		// 关闭按钮
		function ZoomControl(){
			// 默认停靠位置和偏移量
			this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
			this.defaultOffset = new BMap.Size(10, 10);
		}
		ZoomControl.prototype = new BMap.Control();
		ZoomControl.prototype.initialize = function(map){
			// 创建一个DOM元素
		  	var div = document.createElement("div");
		  	div.innerHTML  ="<img src='http://www.landtu.com/img/jhc.gif' >";
		  	div.style.cursor = "pointer";
		  	div.onclick = function(e){
				_showGoogleMeetMap.mapShowType = 0;
				_showGoogleMeetMap.clickIco = null;
				_showGoogleMeetMap.mapIcoInit();
				_showGoogleMeetMap.lineMapObj.style.display = 'none';
			}
		  	// 添加DOM元素到地图中
		  	_showGoogleMeetMap.lineMap.getContainer().appendChild(div);
		  	// 将DOM元素返回
		  	return div;
		}
		var myZoomCtrl = new ZoomControl();
		this.lineMap.addControl(myZoomCtrl);
	}
	
	// 将地图中心定位
	clearTimeout(this.timeoutObj);
	this.timeoutObj = setTimeout(function(){
		var point = new BMap.Point( latRight, latLeft);
		_showGoogleMeetMap.lineMap.panTo(point); 
		
		for(var i=0; i<_showGoogleMeetMap.GmarkerIdArray.length; i++){
			// 在地图中心添加一个标记 
			var leftIndex = 0;
			var this_meet_id = _showGoogleMeetMap.GmarkerContentArray[_showGoogleMeetMap.GmarkerIdArray[i]]['meet_place_id'];
			if( this_meet_id==meet_id){
				leftIndex = -23
			}
			var myIcon = new BMap.Icon( _showGoogleMeetMap.iconUrl, new BMap.Size(23, 25), {
				offset : new BMap.Size(10, 25),
				imageOffset : new BMap.Size(leftIndex, -i*25)
			});	
			
			_showGoogleMeetMap.GmarkerObjArray[i].setIcon(myIcon); 
		}
		
	},250);
	
	
	return;
}

showMeetGoogleMap = function(){
	var writeHtml = '';
		writeHtml += '<div class="googleMapDiv">';
		writeHtml += '<div id="GoogleMap_d" class="GoogleMap_d"><img src="http://www.landtu.com/img/jhiocn.gif" /></div>';
		writeHtml += '<div id="GoogleMap" style="width:262px; height:242px;"></div>';
		writeHtml += '</div>';
		
	var div=document.createElement('DIV');
		div.style.display='none';
		div.id = 'googleMapDiv';
		div.innerHTML = writeHtml;
	document.getElementById('tline_l').appendChild(div);
	
	_showGoogleMeetMapObj = new showGoogleMeetMap();
	_showGoogleMeetMapObj.init();
	return;
}

// *******************************显示大题图***********************************
var _showMeetGoogleMapBig;
showMeetGoogleMap_big = function(view){
	_showMeetGoogleMapBig = this;
	if(!document.getElementById("googlemapshowl")){
		return false;
	}
	this.lineMap = new BMap.Map("googlemapshowl");
	this.GmarkerIdArray = [];
	this.GmarkerContentArray = {};
	this.GmarkerObjArray = [];
	this.clickIco = null;
	this.timeoutObj = null;
	this.iconUrl = "/img/markers.png";

	var lat = 0, lng = 0, pic_view = 0;
	lat = GmarkerArray[view]["lat"];
	lng = GmarkerArray[view]["lng"];	
	pic_view = view;
	for(var i=0; i<GmarkerArray.length; i++){
		this.GmarkerIdArray.push( GmarkerArray[i]["meet_place_id"] );
		this.GmarkerContentArray[GmarkerArray[i]["meet_place_id"]] = GmarkerArray[i];
	}		
		
	var point = new BMap.Point( lng, lat);
	this.lineMap.centerAndZoom(point, 15);
		
	var opts = {type : BMAP_NAVIGATION_CONTROL_SMALL}
	this.lineMap.addControl(new BMap.NavigationControl(opts));

	//创建一个图标模板，指定阴影等
	function createMarker(markerObj,index,iconUrl){
		var myIcon = new BMap.Icon( iconUrl, new BMap.Size(23, 25), {
			offset : new BMap.Size(10, 25),
			imageOffset : new BMap.Size(0, -index*25)
		});
		
		var point = new BMap.Point(markerObj["lng"], markerObj["lat"]);
		var marker = new BMap.Marker(point, {icon: myIcon});
		marker.setTitle(markerObj["meet_place_name"]);
	
		var infoWindow = new BMap.InfoWindow(markerObj["meet_place_name"]);  // 创建信息窗口对象
		infoWindow.setTitle("");
					
		marker.addEventListener("click", function(){   
			if( infoWindow.isOpen() ){
				this.closeInfoWindow();	
			}else{
				this.openInfoWindow(infoWindow);	
			}
			return;		
		});
		marker.openInfoWindow(infoWindow);
		infoWindow.enableAutoPan();
		infoWindow.enableCloseOnClick();
		return marker;
	}
	
	for(var i=0; i<this.GmarkerIdArray.length; i++){
		// 在地图中心添加一个标记 
		this.GmarkerObjArray[i] = createMarker( this.GmarkerContentArray[this.GmarkerIdArray[i]],i,this.iconUrl);
		this.lineMap.addOverlay( this.GmarkerObjArray[i] );
	}	
		
	var meetTbodyObj = document.getElementById("meet_tbody_"+this.GmarkerIdArray[pic_view]);
	if( !meetTbodyObj )
	{
		return;
	}
	var TdObjArray = meetTbodyObj.getElementsByTagName("td");
	for(var index=0; index<TdObjArray.length; index++){
		TdObjArray[index].style.background = "#FFFCEC";
	}
	var imgTempObj = meetTbodyObj.getElementsByTagName("img");
	for(var index_t=0; index_t<imgTempObj.length; index_t++){
		if( imgTempObj[index_t].id.indexOf("meet_") >=0 ){
			imgTempObj[index_t].src = "http://www.landtu.com/img/jhfds.gif";
		}
	}

	
	for(var i=0; i<this.GmarkerIdArray.length; i++){		
		var imgObj = document.getElementById("meet_"+this.GmarkerIdArray[i]);
		var meetTbodyObj = document.getElementById("meet_tbody_"+this.GmarkerIdArray[i]);
		meetTbodyObj.onmouseover = function(){
			for(var i=0; i<_showMeetGoogleMapBig.GmarkerIdArray.length; i++){		
				var meetTbodyObj = document.getElementById("meet_tbody_"+_showMeetGoogleMapBig.GmarkerIdArray[i]);
				var TdObjArray = meetTbodyObj.getElementsByTagName("td");
				for(var index=0; index<TdObjArray.length; index++){
					TdObjArray[index].style.background = "";
				}
				var imgTempObj = meetTbodyObj.getElementsByTagName("img");
				for(var index_t=0; index_t<imgTempObj.length; index_t++){
					if( imgTempObj[index_t].id.indexOf("meet_") >=0 ){
						imgTempObj[index_t].src = "http://www.landtu.com/img/jhfd.gif";
					}
				}
			}
			
			var TdObjArray = this.getElementsByTagName("td");
			for(var index=0; index<TdObjArray.length; index++){
				TdObjArray[index].style.background = "#FFFCEC";
			}
			
			var imgTempObj = this.getElementsByTagName("img");
			for(var index_t=0; index_t<imgTempObj.length; index_t++){
				if( imgTempObj[index_t].id.indexOf("meet_") >=0 ){
					imgTempObj[index_t].src = "http://www.landtu.com/img/jhfds.gif";
				}
			}
			var meet_id = this.id.replace("meet_tbody_","");
			
			clearTimeout(this.timeoutObj);
			this.timeoutObj = setTimeout(function(){

				var point = new BMap.Point( _showMeetGoogleMapBig.GmarkerContentArray[meet_id]["lng"], _showMeetGoogleMapBig.GmarkerContentArray[meet_id]["lat"]);
				_showMeetGoogleMapBig.lineMap.panTo(point); 
				
				for(var i=0; i<_showMeetGoogleMapBig.GmarkerIdArray.length; i++){
					// 在地图中心添加一个标记 
					var leftIndex = 0;
					var this_meet_id = _showMeetGoogleMapBig.GmarkerContentArray[_showMeetGoogleMapBig.GmarkerIdArray[i]]['meet_place_id'];
					if( this_meet_id==meet_id){
						leftIndex = -23
					}
					var myIcon = new BMap.Icon( _showMeetGoogleMapBig.iconUrl, new BMap.Size(23, 25), {
						offset : new BMap.Size(10, 25),
						imageOffset : new BMap.Size(leftIndex, -i*25)
					});	
					
					_showMeetGoogleMapBig.GmarkerObjArray[i].setIcon(myIcon); 
				}
				
			},250);
			return;					
		}
	}	
	return;
}

var _showMeetBaiDuMapSet
showMeetBaiDuMapSet = function(){
	_showMeetBaiDuMapSet = this;
	if(!document.getElementById('showMapForSet')){
		return false;
	}

	this.lineMap = new BMap.Map("showMapForSet");
	this.GmarkerIdArray = [];
	this.GmarkerContentArray = {};
	this.GmarkerObjArray = [];
	this.clickIco = null;
	this.timeoutObj = null;

	var lat = 0, lng = 0, pic_view = 0;
	for(var i=0; i<GmarkerArray.length; i++){
		if(lat==0){
			lat = GmarkerArray[i]["lat"];
			lng = GmarkerArray[i]["lng"];
		}
		this.GmarkerIdArray.push( GmarkerArray[i]["meet_place_id"] );
		this.GmarkerContentArray[GmarkerArray[i]["meet_place_id"]] = GmarkerArray[i];
	}		
		
	var point = new BMap.Point( lng, lat );
	this.lineMap.centerAndZoom( point, 15 );
		
	var opts = {type : BMAP_NAVIGATION_CONTROL_SMALL}
	this.lineMap.addControl(new BMap.NavigationControl(opts));

	
	this.GmarkerObjArray[0] = createMarker( this.GmarkerContentArray[this.GmarkerIdArray[0]],0,this.iconUrl);
	this.lineMap.addOverlay( this.GmarkerObjArray[0] );

	function createMarker(markerObj){
		
		var point = new BMap.Point(markerObj["lng"], markerObj["lat"]);
		var marker = new BMap.Marker(point);
		marker.setTitle(markerObj["meet_place_name"]);
	
		var infoWindow = new BMap.InfoWindow(markerObj["meet_place_name"]);  // 创建信息窗口对象
		infoWindow.setTitle("");

		marker.addEventListener("click", function(){   
			if( infoWindow.isOpen() ){
				this.closeInfoWindow();	
			}else{
				this.openInfoWindow(infoWindow);	
			}
			return;		
		});
		marker.openInfoWindow(infoWindow);
		infoWindow.enableAutoPan();
		infoWindow.enableCloseOnClick();
		return marker;
	}
	for(var i=0; i<this.GmarkerIdArray.length; i++){
		// 在地图中心添加一个标记 
		this.GmarkerObjArray[i] = createMarker( this.GmarkerContentArray[this.GmarkerIdArray[i]]);
		this.lineMap.addOverlay( this.GmarkerObjArray[i] );
	}	

	return;	
}


/**********************************集合地点地图*************************************************/
// 在线提问验证
function CheckAskSubmit()
{
   var a = $("formAsk").getElementsByTagName("input");
   for (var i=0; i<a.length; i++) 
    {  
   		a[i].value=Trim(a[i].value);
		switch(a[i].name){ 
			case "yourName": 
				if(a[i].value==""){
					alert("请输入您的称呼");
					a[i].select();
					a[i].focus();
					return false;
				}
				break;
			case "email": 
				if(a[i].value==""){
					break;
				}
				if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(a[i].value))){
					alert("请输入正确的邮件格式");
					a[i].select();
					a[i].focus();
					return false;
				}								
				break;		
			case "code": 
				if(a[i].value==""){
					alert("请您输入验证码");
					a[i].select();
					a[i].focus();
					return false;
				}
				break;						
			default: 
				break;
		}		

	}
	var tempObj = document.getElementsByTagName("textarea")[0];
	if(tempObj.value==""){
		alert("请您输入提问的内容。");
		return false;
	}
	return true;
}

// 隐藏订阅层
function HidDivSubscribe(){
	var obj = document.getElementById("divForSubscribe");
	var OB = obj.getElementsByTagName("div");
	if(OB.length>0){
		for(var i=0;i<OB.length;i++){
			OB[i].style.display = 'none';
		}
	}
	return;
}

//	显示订阅层
ShowDivSubscribe = function(){
	var obj = document.getElementById("divForSubscribe");
	var OB = obj.getElementsByTagName("div");
	if(OB.length>0){
		for(var i=0;i<OB.length;i++){
			OB[i].style.display = '';
		}
	}else{
		CreateDivSubscribe();
		
		setStartTime(exp_date,180);

		var mailObj =document.getElementById("user_email");
		mailObj.value = GetCookieData("Email");
		ShowDivSubscribe();
	}
	
	
	return;
}

// 创建订阅层 前台
CreateDivSubscribe = function(){
	
	var writeHtml = '';

		writeHtml += '<div class="loadpop_icon"></div>';
		writeHtml += '<div class="loadpop_tls"></div>';
		writeHtml += '<div class="loadpop_trs"></div>';
		writeHtml += '<div class="loadpop_bls"></div>';
		writeHtml += '<div class="loadpop_brs"></div>';
		writeHtml += '<div class="loadpop_t" style=" width:410px;">';

		writeHtml += '<img src="../img/c2.gif" style="cursor:pointer" onClick="HidDivSubscribe();" />';
		writeHtml += '<strong>价格更新邮件订阅</strong>			</div>';

		writeHtml += '<table width="100%" border="0" cellspacing="0" cellpadding="0">';
		writeHtml += '<tr>';
		writeHtml += '<td height="177" valign="top">';
		writeHtml += '<div class="loadpop_tz">当您关注的线路价格更新时，我们会立即通过邮件提醒您！</div>';
		writeHtml += '<div id="formSubscribeMsg" class="loadts" style="padding-left:80px;">&nbsp;</div>';
		writeHtml += '<table width="374" border="0" cellspacing="0" cellpadding="0" style="margin:auto;">';

		writeHtml += '<form action="/product/SubscribeCreate.php" id="formSubscribe" name="formSubscribe" method="post" onsubmit="return DoSubmitSubscribe(this)">';
		writeHtml += '<input type="hidden" name="line_id" value="' + line_id + '" />';
		writeHtml += '<tr>';
		writeHtml += '<td width="65" height="38" align="center">日期范围：</td>';

		writeHtml += '<td width="224">';
		writeHtml += '<input type="text" name="date_from" id="date_from" value="' + date_from + '" maxlength="10" style=" width:90px;" class="order_input1" onfocus="dateOnFocus(this);ShowCalendar(this);" />';
		writeHtml += ' 至 ';
		writeHtml += '<input type="text" name="date_to" id="date_to" value="' + date_to + '" maxlength="10" style=" width:90px;" class="order_input1" onfocus="dateOnFocus(this);ShowCalendar(this)" />';
		writeHtml += '</td>';

		writeHtml += '<td width="85" align="right"><input type="image" src="/img/btdy.gif" width="81" height="29" /></td>';
		writeHtml += '</tr>';

		writeHtml += '<tr>';
		writeHtml += '<td height="38" align="center">您的邮箱：</td>';
		writeHtml += '<td><input type="text" name="user_email" id="user_email" maxlength="50" style=" width:206px;" class="order_input1" /></td>';
		writeHtml += '<td>&nbsp;</td>';
		writeHtml += '</tr>';
		writeHtml += '</form>';
		writeHtml += '</table>';
		writeHtml += '</td>';
		writeHtml += '</tr>';
		writeHtml += '</table>';
	OnSelectDate = function(){};

	var div=document.createElement('DIV');
		div.style.display='none';
		div.style.width='410px';
		div.style.height='175px';
		div.style.position='absolute';
		div.style.left='300px';
		div.style.marginTop='1px';
		div.id = 'loadpop';
		div.innerHTML = writeHtml;
	
	document.getElementById('divForSubscribe').appendChild(div);
	
	return;
}

// 订阅表单验证
function DoSubmitSubscribe(){
	var objs = document.getElementById("formSubscribeMsg");
	var fromValue = document.getElementById("date_from").value;
	var toValue = document.getElementById("date_to").value;
	var emailValue = document.getElementById("user_email").value;
	if(fromValue=='' || toValue==''){
		alert('请选择订阅日期');
		return false;
	}
	if(emailValue==''){
		objs.innerHTML='请输入邮箱地址';
		return false;
	}
	
	if(fromValue <= exp_date){
		objs.innerHTML='订阅开始日期请大于最后出团日期';
		return false;
	}
	if(fromValue > toValue ){
		objs.innerHTML='请选择正确的订阅日期区间';
		return false;
	}
	if(timeCompare(fromValue,toValue)>10){
		objs.innerHTML='订阅日期区间请不要超过10天';
		return false;
	}
	if( !checkMail(emailValue)){
		objs.innerHTML='请输入正确的邮箱地址';
		return false;
	}
	return true;
}

// 时间比较
function timeCompare(d1,d2){
	var date1 = d1.split("-"); 
	var date2 = d2.split("-");
	var date_1,date_2;
	if(date1[0]<1970 || date2[0]<1970)
	{return;}

	date_1 = date1[0]+"/"+date1[1]+"/"+date1[2];
	date_2 = date2[0]+"/"+date2[1]+"/"+date2[2];

	var val = (Date.parse(date_2)-Date.parse(date_1))/1000/60/60/24;
	
	return val;
}

dateSelectAction = function( value, obj ){
	if(obj.name=='date_from'){
		setDateTo(value);
		setStartTime(value,dayApart);
	}
	
	return;
}

function timeFormat(val){
	var date = '';
	date += val.getFullYear()+'-';
	if((val.getMonth()+1)<10){
		date += '0'+ (val.getMonth()+1)+'-';
	}else{
		date += (val.getMonth()+1)+'-';
	}
	if(val.getDate()<10){
		date += '0'+ val.getDate();
	}else{
		date += val.getDate();
	}
	return date;
}

function dateOnFocus(obj){
	a = document.getElementById("date_from").value;
	if(obj.name=='date_to'){
		setStartTime(a,dayApart);
	}
	if(obj.name=='date_from'){
		setStartTime(exp_date,180);
	}

	return;
}

function setDateTo(selectVal){
	
	var ten = new Date();
	var selectValList = selectVal.split("-");
	var selectVal = selectValList[0]+"/"+selectValList[1]+"/"+selectValList[2];
	ten.setTime(Date.parse(selectVal)+1000*60*60*24*daySelectApart);
	ten = timeFormat(ten);
	document.getElementById("date_to").value = ten;
	SetExpireDate(ten);
	
}

function setStartTime(dateBegin,dateLast){
	var date;
	var selectValList = dateBegin.split("-");
	var selectVal = selectValList[0]+"/"+selectValList[1]+"/"+selectValList[2];
	var dateArray = [];
	for(var i=1;i<=dateLast;i++){
		date =(Date.parse(selectVal)+1000*60*60*24*i);
		var newDate = new Date();
		newDate.setTime(date);
		newDate = timeFormat(newDate);
		temp = [newDate,'0','0','1'];
		dateArray.push(temp); 
	}	
	ClearGroup();
	startTime = dateArray;
	for(var ii=0; ii<startTime.length; ii++ ){
		PushGroup(startTime[ii][0],startTime[ii][1],startTime[ii][2],startTime[ii][3]);
	}
	SetExpireDate(startTime[dateLast-1][0]);
	return;
}

ShowTotalPrice = function(FormObj){
	if(!FormObj)
		return;
		
	var thisTime_value = "", AdultNum_value = 0, KidNum_value = 0, AdultNum_price = 0, KidNum_price = 0;
	
	var OBJArray = FormObj.getElementsByTagName("input");
	for(var index=0; index<OBJArray.length; index++){
		switch( OBJArray[index].name ){
			case "AdultNum":
				AdultNum_value = OBJArray[index].value;
				break;
			case "KidNum":
				KidNum_value = OBJArray[index].value;
				break;
		}
	}

	var OBJArray = FormObj.getElementsByTagName("select");
	for(var index=0; index<OBJArray.length; index++){
		switch( OBJArray[index].name ){
			case "AdultNum":
				AdultNum_value = OBJArray[index].value;
				break;
			case "KidNum":
				KidNum_value = OBJArray[index].value;
				break;
			case "thisTime":
				thisTime_value = OBJArray[index].value;
				break;
		}
	}
	
	for(var index=0; index<StartDateArray.length; index++){
		if( StartDateArray[index][0] == thisTime_value ){
			AdultNum_price = StartDateArray[index][1];
			KidNum_price = StartDateArray[index][2];
			break;	
		}
	}
	
	var totalPriceShow = 0;
	var totalPriceShowFlag = 0;
	if( AdultNum_value*1>0 ){
		if(AdultNum_price==0){
			totalPriceShowFlag = 1;
		}else{
			totalPriceShow = totalPriceShow*1 + AdultNum_value*1*AdultNum_price;
		}
	}
	
	if( KidNum_value*1>0 ){
		if(KidNum_price==0){
			totalPriceShowFlag = 1;
		}else{
			totalPriceShow = totalPriceShow*1 + KidNum_value*1*KidNum_price;
		}
	}	
	
	var ShowObj = null
	switch( FormObj.name ){
		case "form1":
			ShowObj = $("PriceTotalOne");
			break;
		case "form2":
			ShowObj = $("PriceTotalTwo");
			break;
		default:
			return;
			break;
	}
	if(!ShowObj){
		return;	
	}
	
	if(totalPriceShowFlag==1){
		ShowObj.innerHTML = "总价：<strong>电询</strong>";
	}else{
		ShowObj.innerHTML = "总价：<strong>"+totalPriceShow+"</strong>元";
	}
	ShowObj.style.display = "";
	return;
}

lineInit = function()
{
	ShowPageTop();
	switch(price_type){
		case "0":
			break;
		case "1":
			break;
		case "2":				
			SetExpireDate(expireTime);
			var changeDate = false;
			for( var i=0; i<StartDateArray.length; i++)
			{
				PushGroup(StartDateArray[i][0],"","",1);
				if(LineStartDate == StartDateArray[i][0])
				{
					changeDate = true;	
				}
			}
			
			dateSelectAction = function(value,obj)
			{	
				//	扩展函数，选择日历后触发
				var tempLoading = "<div align='center' style='margin:20px auto'><img src='/img/blueloading.gif'></div>";
				$("LineRoomPrice").innerHTML = tempLoading;
			
				lineListThemeObj.returnFucForAjxaDescription = function(returnObj)
				{
					if( !returnObj )
					{
						alert("ajxa出现错误")	;
						return;			
					}
					
					if( returnObj["errorFlag"]==1 )
					{
						alert(returnObj["errorMsg"]);
						return;			
					}
					
					var product_id = returnObj["product_id"];		
					returnObj["type"] = 1*returnObj["type"];
								
					var returnString = '';
					
					var DateObjStart = returnObj["DateObjStart"];
					var DateObjEnd = returnObj["DateObjEnd"];
					var StartDateObjArray = returnObj["StartDateObjArray"];
					
					var LineRoomShowString = returnObj["LineRoomShowString"];
					var roomObjArrayString = returnObj["roomObjArrayString"];
					
					var lineUrl = returnObj["lineUrl"];
					var price_type = returnObj["price_type"];
					var price_show_type = returnObj["price_show_type"];
					var expire_time = returnObj["expire_time"];	
					var start_price = returnObj["start_price"];	
					var start_date = returnObj["start_date"];	
					var LineRoomShowString = returnObj["LineRoomShowString"];	
					
					showRoomPrice(roomObjArrayString);

					lineListThemeObj.RoomPriceTableInit( "LineRoomPrice" );
					
					if($("start_price"))
					{
						$("start_price").innerHTML = "¥"+start_price+"<b>起</b>";
					}		
					
					$("thisTime").value = start_date;
					$("thisTimeTwo").value = start_date;
					$("selectDateMsg").innerHTML = LineRoomShowString;
					
					ClearOption("price_id");
					ClearOption("price_id_two");
					for( var i=0; i<roomObjArrayString.length; i++ )
					{
						var tempObj = roomObjArrayString[i];
						AddOption( "price_id", tempObj["room_name"]+" "+tempObj["adult_price_show"] , tempObj["price_id"]);
						AddOption( "price_id_two", tempObj["room_name"]+" "+tempObj["adult_price_show"] , tempObj["price_id"]);
					}		
					return;
				}			
				var getProductUrl = lineListThemeObj.getUrlLeft + 
						"/ajxa/AjxaLineListThemeContent.php?" +
						"product_id=" + line_id + 
						"&type=3" +
						"&fuc=lineListThemeObj.returnFucForAjxaDescription" +
						"&start_date=" + value +
						"&rnd=" + new Date();
				lineListThemeObj.httpAjxaSend(getProductUrl);
				return;
			}
			
			if(changeDate)
			{
				dateSelectAction(LineStartDate,$("start_date"));
			}
			break;
	}
	return;
}

RoomPriceTableInit = function(ObjId)
{	
	if(!ObjId){
		ObjId = "LineRoomPrice";
	}
	if( !$(ObjId) ){
		return;
	}
	var priceTableObjArray = $(ObjId).getElementsByTagName('TR');
	for( var i=0; i<priceTableObjArray.length; i++){
		if( priceTableObjArray[i].className.indexOf("tlinehoteltr")!=-1 )
			continue;

		priceTableObjArray[i].onmouseout = function(){
			this.className = this.className.replace(" tdcurr","");
		}
		priceTableObjArray[i].onmouseover = function(){
			this.className += " tdcurr";
		}
	} 
	return;
}

showRoomPrice = function(RoomPriceArray)
{
	if(!$("LineRoomPrice"))
		return;
		
	var PriceString = "";
	PriceString = "<div class=\"tlhotel\"><h3>酒店房型</h3></div>";
	switch(price_show_type){
		case "0":
			PriceString += '<table width="688" cellpadding="0" cellspacing="0">';
			PriceString += '<tr class="tlinehoteltr">';
			PriceString += '<td width="194" height="25" bgcolor="#EEF9FF">&nbsp;&nbsp;房型</td>';
			PriceString += '<td width="66" bgcolor="#EEF9FF">餐食</td>';
			PriceString += '<td width="172" bgcolor="#EEF9FF">价格说明</td>';
			PriceString += '<td width="90" align="center" bgcolor="#EEF9FF">价格(成人)</td>';
			PriceString += '<td width="90" align="center" bgcolor="#EEF9FF">价格(小童)</td>';
			PriceString += '<td width="74" bgcolor="#EEF9FF">&nbsp;</td>';
			PriceString += '</tr>';
			if(RoomPriceArray.length==0){
				PriceString += '<tr class="tlinehoteltd">';
				PriceString += '<td height="36" colspan="6"><span>暂无房型</span></td>';
				PriceString += '</tr> ';
			}else{
				for( var i=0; i<RoomPriceArray.length; i++ ){
					PriceString += '<tr class="tlinehoteltd">';
					PriceString += '<td height="36" class="tlinehoteltdicon"><b>' + RoomPriceArray[i]["room_name"] + '</b><p>' + RoomPriceArray[i]["price_show_type_desc"] + '</p></td>';
					PriceString += '<td><font color="#0466EC">' + RoomPriceArray[i]["breakfast_name"] + '</font></td>';
					PriceString += '<td>' + RoomPriceArray[i]["room_desc"] + '</td>';
					PriceString += '<td align="center"><font color="#FF6600">' + RoomPriceArray[i]["adult_price"] + '</font></td>';
					PriceString += '<td align="center"><font color="#FF6600">' + RoomPriceArray[i]["kid_price"] + '</font></td>';
					PriceString += '<td align="center"><a href="/order/LineOrderDetailVacation.php?line_id=' + line_id + '&price_id=' + RoomPriceArray[i]["price_id"] + '"><img src="/img/hotelbt.gif" width="58" height="20"></a></td>';
					PriceString += '</tr>';
				}
			}
			PriceString += '</table>';	
			break;
		case "1":
			PriceString += '<table width="688" cellpadding="0" cellspacing="0">';
			PriceString += '<tr class="tlinehoteltr">';
			PriceString += '<td width="213" height="25" bgcolor="#EEF9FF">&nbsp;&nbsp;房型</td>';
			PriceString += '<td width="79" bgcolor="#EEF9FF">餐食</td>';
			PriceString += '<td width="213" bgcolor="#EEF9FF">价格说明</td>';
			PriceString += '<td width="93" align="center" bgcolor="#EEF9FF">价格</td>';
			PriceString += '<td width="88" bgcolor="#EEF9FF">&nbsp;</td>';
			PriceString += '</tr>';
			if(RoomPriceArray.length==0){
				PriceString += '<tr class="tlinehoteltd">';
				PriceString += '<td height="36" colspan="5"><span>暂无房型</span></td>';
				PriceString += '</tr>';
			}else{
				for( var i=0; i<RoomPriceArray.length; i++ ){
					
					PriceString += '<tr class="tlinehoteltd">';
					PriceString += '<td height="36" class="tlinehoteltdicon"><b>' + RoomPriceArray[i]["room_name"] + '</b><p>' + RoomPriceArray[i]["price_show_type_desc"] + '</p></td>';
					PriceString += '<td><font color="#0466EC">' + RoomPriceArray[i]["breakfast_name"] + '</font></td>';
					PriceString += '<td>' + RoomPriceArray[i]["room_desc"] + '</td>';
					PriceString += '<td align="center"><font color="#FF6600">' + RoomPriceArray[i]["adult_price"] + '</font></td>';
					PriceString += '<td align="center"><a href="/order/LineOrderDetailVacation.php?line_id=' + line_id + '&price_id=' + RoomPriceArray[i]["price_id"] + '"><img src="/img/hotelbt.gif" width="58" height="20"></a></td>';
					PriceString += '</tr>';				
				}					
			}
			PriceString += '</table>';  		
			break;
	}
	
	$("LineRoomPrice").innerHTML = PriceString;
	lineListThemeObj.RoomPriceTableInit();
	
	return;
}