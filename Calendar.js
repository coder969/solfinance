
/*
		日期控件开始(两个日历)
		使用示例 <input type="text" name="SetDate" value="" onfocus="_dateObjTwo.ShowDiv(this);"/>		
		create by hiloy 2009-03-12

*/
function dateObjTwo(){
	this.selectObj = null;
	this.showWhereObj = null;
	this.div = null;
	this.frame = null;
	
	this.bRich = null;					// 0 普通日历  1 富表现日历  2 酒店日历
	this.bRichType = 0;					// 如果为富表现的时候， 是否限制其他日期可选 0 不限制  1 限制
	this.ExpireDate = null;				// 结束时间
	this.GroupArray = new Array();		// data
	this.HotelMonthNum = 3;				// 酒店显示的月份与今天相隔多少个月

	this.todayYear = "";
	this.todayMonth = "";
	this.todayDay = "";
	
	this.selectObjYear = "";
	this.selectObjMonth = "";
	this.selectObjDay = "";
	
	this.showYear = "";
	this.showMonth = "";

	this.Browser = { 
		'isIE' : (navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0), 
		'isFirefox' : navigator.userAgent.indexOf('Firefox') >= 0, 
		'isOpera' : navigator.userAgent.indexOf('Opera') >= 0 
	}; 
	
	this.MonthRichView = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
	
}

dateObjTwo.prototype.init = function(){
	if(this.div==null){
		this.div=document.createElement('DIV');
		this.div.style.display='none';
		this.div.style.position='absolute';
		this.div.style.width='420px';
		this.div.style.height='185px';
		//this.div.style.overflow='hidden';
		this.div.style.padding='0';
		this.div.style.margin='0';

		var bs = document.getElementsByTagName('BODY');
		bs[0].appendChild(this.div);
		this.div.innerHTML='<iframe MARGINWIDTH=0 MARGINHEIGHT=0 HSPACE=0 VSPACE=0 FRAMEBORDER=0 SCROLLING=no width="100%" height="100%" id="dateObjTwoIframe" ></iframe>';
		
		try{
			this.frame = document.frames("dateObjTwoIframe").document	
		}catch(e){
			try{
				this.frame = document.getElementById('dateObjTwoIframe').contentDocument
			}catch(e){
			}
		}
		
	}
	return;
}

dateObjTwo.prototype.HtmlWriteIn = function(content){

	var HtmlData = '';
	HtmlData += '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\r\n<html xmlns="http://www.w3.org/1999/xhtml">';
	HtmlData += '\r\n<head>';
	HtmlData += '\r\n<title>landtu.com</title>';
	HtmlData += this.getCss();
	HtmlData += '\r\n</head><body><div style="border:2px double #6197F1;height:181px;overflow:hidden">';
	HtmlData += content;
	HtmlData += '</div>\r\n</body>';
	HtmlData += '</html>\r\n';
	
	this.frame.open();
	this.frame.write(HtmlData);
	this.frame.close();
	return;
}

dateObjTwo.prototype.getCss = function(){
	var string = "";
	string += '\r\n<style>';
	string += '\r\n body{ margin:0; padding:0; background:#fff; font-family:Verdana, Arial, Helvetica, sans-serif;}';

	string += '\r\n td{ font-size:12px;}';
	string += '\r\n .content{ width:50%;; float:left; height:'+this.div.style.height+'}';
	
	string += '\r\n .left{ border-right:1px double #1995ED; padding:1px; height:'+this.div.style.height+'}';
	string += '\r\n .right{padding:1px; height:'+this.div.style.height+'}';
	
	string += '\r\n a{ color:#666666; text-decoration:none; }';
	string += '\r\n a:hover{ color:#CC0000; text-decoration:underline; background:#f7f7f7;}';
	
	string += '\r\n .title td{background:#EAF5FD; color:#024EB3; font-weight:600;}';
	string += '\r\n .title a{ font-weight:600; text-decoration:underline;}';
	string += '\r\n .date td{ background:#1995ED; color:#fff; font-weight:600; text-align:center;}';
	string += '\r\n .date td.su{color:#FFFF00;}';
	
	string += '\r\n .day a{display:block; padding:3px 0 3px 0;}';
	string += '\r\n .day a:hover{background:#666; color:#fff; text-decoration:none; }';
	
	string += '\r\n .month a{ text-decoration:none; display:block; padding:6px 0 5px 0;}';
	string += '\r\n .month a:hover{background:#666; color:#fff; text-decoration:none; }';
	string += '\r\n .month td{ text-align:center;}';
	
	string += '\r\n .year a{ text-decoration:none; display:block; padding:1px 0 1px 0;}';
	string += '\r\n .year a:hover{background:#666; color:#fff; text-decoration:none; }';
	string += '\r\n .year td{ text-align:center;}';
	
	string += '\r\n .selectDate{ background:#CAD9EA;}';
	string += '\r\n .selectDate a{ color:#009900; font-weight:600; text-align:center;}';
	string += '\r\n .today a{font-weight:600; color:#006699;}';

	string += '\r\n .selectMonth{ background:#CAD9EA;}';
	string += '\r\n .selectMonth a{ color:#009900; font-weight:600; text-align:center;}';
	string += '\r\n .todayMonth a{font-weight:600; color:#006699;}';
	
	string += '\r\n a.rich{ color:#024EB3; background:#EAF5FD; font-weight:600; text-decoration:underline;}'
	string += '\r\n a.rich:hover{ color:#FF3300; background:#EAF5FD; font-weight:600; text-decoration:underline;}'
	
	string += '.day2{ color:#999;}';
	string += '.day3{ text-decoration:line-through; color:#024EB3;}';
	string += '.day4 {background-color:#EAF5FD; font-weight:bold;}';
	
	
	
	string += '\r\n</style>';
	return string;
}

dateObjTwo.prototype.HideDiv = function(){
	if(this.div	== null) 
		return;
	this.div.style.display='none';
	return;
}

dateObjTwo.prototype.ShowDiv = function(objInput,objWhere){

	this.init();
	try{
		this.selectObj = objInput;
		this.selectObj.blur();
	}catch(e){}
	this.showWhereObj = objWhere?objWhere:this.selectObj;
	
	if(this.div	== null) 
		return;
	this.div.style.display='block';
	this.ShowWhere();
	
	var DateOB = new Date();
	this.todayYear = parseInt(DateOB.getFullYear(),10);
	this.todayMonth = parseInt(DateOB.getMonth(),10);
	this.todayDay = parseInt(DateOB.getDate(),10);
	
	var value = this.selectObj.value;
	if(value==""){
		this.selectObjYear = this.todayYear;
		this.selectObjMonth = this.todayMonth;
		this.selectObjDay = this.todayDay;		

	}else{
		var tempArray = value.split("-");

		var Year = parseInt(tempArray[0],10);
		var Month = parseInt(tempArray[1],10)-1;
		var Day = parseInt(tempArray[2],10);
		
		var DateOB = new Date(Year,Month,Day);
		this.selectObjYear = DateOB.getFullYear();
		this.selectObjMonth = DateOB.getMonth();
		this.selectObjDay = DateOB.getDate();
	}

	this.showYearMonth(this.selectObjYear,this.selectObjMonth);

	document.onclick = function(event) {
		var obj;
		event=event?event:(window.event?window.event:null);
		obj = event.srcElement ? event.srcElement : event.target;
		if( obj != _dateObjTwo.selectObj && obj != _dateObjTwo.showWhereObj ){
			_dateObjTwo.HideDiv();
			document.onclick = null;
		}		
	}
	return;
}

dateObjTwo.prototype.showYearMonth = function(Year,Month){
	
	this.bRich = bRich;
	this.bRichType = bRichType;
	this.HotelMonthNum = HotelMonthNum;
	
	var string = "";
	var DateOB = new Date(Year,Month,1);
	var firYear = parseInt(DateOB.getFullYear(),10);
	var firMonth = parseInt(DateOB.getMonth(),10);
	
	var DateOB = new Date(Year,Month+1,1);
	var secYear = parseInt(DateOB.getFullYear(),10);
	var secMonth = parseInt(DateOB.getMonth(),10);

	switch(this.bRich){
		case 1:		//线路富表现日历
			string += this.GetContentRichLine(firYear,firMonth,1);
			string += this.GetContentRichLine(secYear,secMonth,2);	
			break;
		case 2:		//酒店富表现日历
			string += this.GetContentRichHotel(firYear,firMonth,1);
			string += this.GetContentRichHotel(secYear,secMonth,2);	
			break;
		default:
			string += this.GetContent(firYear,firMonth,1);
			string += this.GetContent(secYear,secMonth,2);	
			break;
	}
		
	this.HtmlWriteIn(string);
	return;
}

//日历表现模式
dateObjTwo.prototype.GetContent = function(Year,Month,index){
	var Month_Label = this.MonthRichView; 

	var string = "";
	
	string += '<div class="content">';
	string += '<div class="'
	if(index == 1){
		string += 'left';
	}else{
		string += 'right';
	}
	string += '" >';
	string += '<table cellpadding="0" cellspacing="0" width="100%">';
	string += '<tr class="title">';
	string += '<td height="28px" width="30" align="center">';
	if(index == 1){
		string += '<a href="#" onclick=\"parent._dateObjTwo.showYearMonth('+Year+','+(Month-1)+');return false;\" title=\"上一月\" >《</a>';
	}
	string += '</td>';
	string += '<td align="center"><a href="#" onclick=\"parent._dateObjTwo.ShowYear('+Year+','+Month+');return false;\">'+Year+'年</a>　<a href="#" onclick=\"parent._dateObjTwo.ShowMonth('+Year+','+Month+');return false;\">'+Month_Label[Month]+'</a></td>';
	
	string += '<td width="30"  align="center">';
	if(index == 2){
		string += '<a href="#" onclick=\"parent._dateObjTwo.showYearMonth('+Year+','+(Month)+');return false;\" title=\"下一月\">》</a></td>';
	}
	string += '</td>';
	string += '</tr>';
	string += '</table>';
	
	string += '<table cellpadding="0" cellspacing="0" width="100%">';
	string += '<tr class="date">';
	string += '<td class="su" height="22">日</td>';
	string += '<td>一</td>';
	string += '<td>二</td>';
	string += '<td>三</td>';
	string += '<td>四</td>';
	string += '<td>五</td>';
	string += '<td class="su">六</td>';
	string += '</tr>';
	
	for(i = 0; i < 6; i++){	
		string += "<tr class=\"day\">";
		for(j = 0; j < 7; j ++){
			string += this.CreateMonthTD(Year,Month,i,j);
		}
		string += "</tr>";
	}	
	
	string += '</table>';
	string += '</div>';
	string += '</div>';
	return string;
}

dateObjTwo.prototype.CreateMonthTD= function(Year,Month,Row,Col){
	var DateObj = new Date(Year,Month,1);
	
	var Day1 = DateObj.getDay();
	var TDay = Row * 7 + Col - Day1 + 1;
	var TDString = "";
	var DayLastObj = new Date(Year,Month+1,0);
	var DayLast = DayLastObj.getDate();
	
	if(TDay <= 0 || TDay > DayLast)
		TDString = "<td align=\"center\" height=\"22\">&nbsp;</td>\n";
	else{
		TDString  = "<td align=\"center\" ";
		if( this.selectObjYear == Year && this.selectObjMonth == Month && this.selectObjDay == TDay ){
			TDString += " class=\"selectDate\""	;
		}else if( this.todayYear == Year && this.todayMonth == Month && this.todayDay == TDay ){
			TDString += " class=\"today\""	;
		}
		TDString += ">";
		TDString += "<a href=\"#\" onclick=\"parent._dateObjTwo.selectValue(" + Year + "," + Month + "," + TDay + ");return false;\">" + TDay + "</a>";
		TDString += "</td>\n";
	}
	
	return TDString;
}

dateObjTwo.prototype.ShowYear = function(Year,Month){
	var DateOB = new Date(Year,Month,1);
	Year = parseInt(DateOB.getFullYear(),10);
	Month = parseInt(DateOB.getMonth(),10);
	
	var startYear = Year - 35;
	var YearArray = [];
	var index = 0;
	for(var i=startYear; i<startYear+72; i++){
		YearArray[index++] = i;
	}

	var string = "";
	string += '<div style="padding:1px;">';
	string += '<table cellpadding="0" cellspacing="0" width="100%">';
	string += '<tr class="title">';
	string += '<td width="45" align="center"><a href="#" onclick=\"parent._dateObjTwo.ShowYear('+(YearArray[0]-37)+','+Month+');return false;\">上一页</a></td>';
	string += '<td  height="28px" align="center">'+YearArray[0]+' ~ '+YearArray[YearArray.length-1]+'</td>';
	string += '<td width="45" align="center"><a href="#" onclick=\"parent._dateObjTwo.ShowYear('+(YearArray[YearArray.length-1]+36)+','+Month+');return false;\">下一页</a></td>';
	string += '</tr>';
	string += '</table>';
	
	string += '<table cellpadding="0" cellspacing="0" width="100%" class="year">';
	
	var index = 1;
	for( var i=0; i<YearArray.length; i++){
		if(index == 1){
			string += '<tr>';
		}
		string += '<td ';
		if(this.selectObjYear==YearArray[i]){
			string += ' class="selectMonth" ';
		}else if( this.todayYear == YearArray[i]){
			string += ' class="todayMonth" ';
		}
		string += '>';
		string += '<a href="#" onclick=\"parent._dateObjTwo.ShowMonth('+YearArray[i]+','+Month+');return false;\">'+YearArray[i]+'</a></td>';
		if(index == 8){
			string += '</tr>';
			index = 0
		}
		index++;
	}
	
	string += '</table>';
	
	this.HtmlWriteIn(string);
	return;
}

dateObjTwo.prototype.ShowMonth = function(Year,Month){
	var DateOB = new Date(Year,Month,1);
	Year = parseInt(DateOB.getFullYear(),10);
	Month = parseInt(DateOB.getMonth(),10);

	var Month_Label = this.MonthRichView; 

	var string = "";
	string += '<div style="padding:1px;">';
	string += '<table cellpadding="0" cellspacing="0" width="100%">';
	string += '<tr class="title">';
	string += '<td width="30" align="center"></td>';
	string += '<td  height="28px" align="center"><a href="#" onclick=\"parent._dateObjTwo.ShowYear('+Year+','+Month+');return false;\">'+Year+'年</a>　<a href="#"  onclick=\"parent._dateObjTwo.showYearMonth('+Year+','+Month+');return false;\">'+Month_Label[Month]+'</a></td>';
	string += '<td width="30" align="center"></td>';
	string += '</tr>';
	string += '</table>';
	
	string += '<BR><table cellpadding="0" cellspacing="0" width="100%" class="month">';
	
	var index = 1;
	for( var i=0; i<Month_Label.length; i++){
		if(index == 1){
			string += '<tr>';
		}
		string += '<td width="25%" ';
		if(this.selectObjMonth==i && this.selectObjYear == Year){
			string += ' class="selectMonth" ';
		}else if(this.todayMonth==i && this.todayYear == Year){
			string += ' class="todayMonth" ';
		}
		string += '>';
		string += '<a href="#" onclick=\"parent._dateObjTwo.showYearMonth('+Year+','+i+');return false;\">'+Month_Label[i]+'</a></td>';
		if(index == 4){
			string += '</tr>';
			index = 0
		}
		index++;
	}
	
	string += '</table>';
	
	this.HtmlWriteIn(string);
	return;
}

// 酒店富表现模式
dateObjTwo.prototype.GetContentRichHotel = function(Year,Month,index){
	var Month_Label = this.MonthRichView; 
	var string = "";	
	string += '<div class="content">';
	string += '<div class="'
	if(index == 1){
		string += 'left';
	}else{
		string += 'right';
	}
	string += '" >';
	string += '<table cellpadding="0" cellspacing="0" width="100%">';
	string += '<tr class="title">';
	string += '<td height="28px" width="30" align="center">';
	if(index == 1){
		if( (Year*12+Month) > (this.todayYear*12+this.todayMonth) )
			string += '<a href="#" onclick=\"parent._dateObjTwo.showYearMonth('+Year+','+(Month-1)+');return false;\" title=\"上一月\" >《</a>';
	}

	string += '</td>';
	string += '<td align="center">'+Year+'年　'+Month_Label[Month]+'</td>';
	string += '<td width="30"  align="center">';
	if(index == 2){
		if( Month < (this.todayMonth+this.HotelMonthNum) )
			string += '<a href="#" onclick=\"parent._dateObjTwo.showYearMonth('+Year+','+(Month)+');return false;\" title=\"下一月\">》</a></td>';
	}
	string += '</td>';
	string += '</tr>';
	string += '</table>';
	
	string += '<table cellpadding="0" cellspacing="0" width="100%">';
	string += '<tr class="date">';
	string += '<td class="su" height="22">日</td>';
	string += '<td>一</td>';
	string += '<td>二</td>';
	string += '<td>三</td>';
	string += '<td>四</td>';
	string += '<td>五</td>';
	string += '<td class="su">六</td>';
	string += '</tr>';
	
	for(i = 0; i < 6; i++){	
		string += "<tr class=\"day\">";
		for(j = 0; j < 7; j ++){
			string += this.CreateMonthHotelTD(Year,Month,i,j);
		}
		string += "</tr>";
	}	
	
	string += '</table>';
	string += '</div>';
	string += '</div>';
	return string;	
}
dateObjTwo.prototype.CreateMonthHotelTD = function(Year,Month,Row,Col){
	var DateObj = new Date(Year,Month,1);
	var Day1 = DateObj.getDay();
	var TDay = Row * 7 + Col - Day1 + 1;
	var TDString = "";
	var DayLastObj = new Date(Year,Month+1,0);
	var DayLast = DayLastObj.getDate();
	
	if(TDay <= 0 || TDay > DayLast)
		TDString = "<td align=\"center\" height=\"22\">&nbsp;</td>\n";
	else{
		switch(this.HotelDateStatus(Year,Month,TDay)){
			default:
			case 1:
				TDString += "<td align=\"center\" height=\"22\" class=\"day2\">" + TDay + "</td>\n";
				break;
			case 2:
				
				DayNum = this.CaculateDay(Year,Month,TDay);
				Plan = this.GetPlan(DayNum);
				if(Plan == null){
					TDString += "<td align=\"center\" height=\"22\" class=\"day2\">" + TDay + "</td>\n";
				}else{
					if(Plan.Status == 0)
						TDString += "<td align=\"center\" height=\"22\" title=\"已过期\" class=\"day3\">" + TDay + "</td>\n";
					else{
						TDString += "<td align=\"center\" height=\"22\" class=\"day4\"><a href=\"#\" onclick=\"parent._dateObjTwo.selectValue(" + Year + "," + Month + "," + TDay + ");return false;\" class=\"rich\">" + TDay + "</a></td>\n";
					}
				}			
				break;
		}
	}
	return TDString;
}
	

//线路富表现模式
dateObjTwo.prototype.GetContentRichLine = function(Year,Month,index){
	var Month_Label = this.MonthRichView; 

	var string = "";
	string += '<div class="content">';
	string += '<div class="'
	if(index == 1){
		string += 'left';
	}else{
		string += 'right';
	}
	string += '" >';
	string += '<table cellpadding="0" cellspacing="0" width="100%">';
	string += '<tr class="title">';
	string += '<td height="28px" width="30" align="center">';
	if(index == 1){
		string += this.GetPageStringLast(Year,Month);
	}
	string += '</td>';
	string += '<td align="center">'+Year+'年'+Month_Label[Month]+'</td>';
	
	string += '<td width="30"  align="center">';
	if(index == 2){
		string += this.GetPageStringNext(Year,Month);
	}
	string += '</td>';
	string += '</tr>';
	string += '</table>';
	
	string += '<table cellpadding="0" cellspacing="0" width="100%">';
	string += '<tr class="date">';
	string += '<td class="su" height="22">日</td>';
	string += '<td>一</td>';
	string += '<td>二</td>';
	string += '<td>三</td>';
	string += '<td>四</td>';
	string += '<td>五</td>';
	string += '<td class="su">六</td>';
	string += '</tr>';
	
	for(i = 0; i < 6; i++){	
		string += "<tr class=\"day\">";
		for(j = 0; j < 7; j ++){
			string += this.CreateMonthRichLineTD(Year,Month,i,j);
		}
		string += "</tr>";
	}	
	
	string += '</table>';
	string += '</div>';
	string += '</div>';
	return string;
}

dateObjTwo.prototype.CreateMonthRichLineTD = function(Year,Month,Row,Col){
	var DateObj = new Date(Year,Month,1);
	
	var Day1 = DateObj.getDay();
	var TDay = Row * 7 + Col - Day1 + 1;
	var TDString ="";
	var DayLastObj = new Date(Year,Month+1,0);
	var DayLast = DayLastObj.getDate();
	
	if(this.bRichType!=1){
		if(TDay <= 0 || TDay > DayLast)
			TDString += "<td align=\"center\" height=\"22\">&nbsp;</td>\n";
		else{
			switch(this.DateStatus(Year,Month,TDay)){
				case 1:
					TDString += "<td align=\"center\" height=\"22\" class=\"day2\">" + TDay + "</td>\n";
					break;
				case 2:
					DayNum = this.CaculateDay(Year,Month,TDay);
					Plan = this.GetPlan(DayNum);
	
					if(Plan == null){
						TDString += "<td align=\"center\" height=\"22\" class=\"day2\">" + TDay + "</td>\n";
					}else{
						if(Plan.Status == 0)
							TDString += "<td align=\"center\" height=\"22\" title=\"已满\" class=\"day3\">" + TDay + "</td>\n";
						else{
							var GroupTitle = "";
							if(Plan.AdultPrice!=""){
								GroupTitle = "title=\"可预订，成人价 " + Plan.AdultPrice+(Plan.AdultPrice=="电询"?"":"元") + " 儿童价 " + Plan.KidPrice+(Plan.KidPrice=="电询"?"":"元") +"\"";
							}
							if(!GroupTitle){
								var GroupTitle = "";
							}
							TDString += "<td align=\"center\" height=\"22\" class=\"day4\"><a href=\"#\" " + GroupTitle + " onclick=\"parent._dateObjTwo.selectValue(" + Year + "," + Month + "," + TDay + ");return false;\" class=\"rich\">" + TDay + "</a></td>\n";
						}
					}
					break;
			}	
		}
	}else{
		if(TDay <= 0 || TDay > DayLast)
			TDString += "<td align=\"center\" height=\"22\">&nbsp;</td>\n";
		else{
			switch(this.DateStatus(Year,Month,TDay)){
				case 1:
					TDString += "<td align=\"center\" height=\"22\"><a href=\"#\" onclick=\"parent._dateObjTwo.selectValue(" + Year + "," + Month + "," + TDay + ");return false;\" >" + TDay + "</a></td>\n";
					break;
				case 2:
					DayNum = this.CaculateDay(Year,Month,TDay);
					Plan = this.GetPlan(DayNum);
					if(Plan == null){
						TDString += "<td align=\"center\" height=\"22\"><a href=\"#\" onclick=\"parent._dateObjTwo.selectValue(" + Year + "," + Month + "," + TDay + ");return false;\" >" + TDay + "</a></td>\n";
					}else{
						if(Plan.Status == 0)
							TDString += "<td align=\"center\" height=\"22\" title=\"已满\" class=\"day3\"><a href=\"#\" onclick=\"parent._dateObjTwo.selectValue(" + Year + "," + Month + "," + TDay + ");return false;\" >" + TDay + "</a></td>\n";
						else{
							var GroupTitle = "";
							if(Plan.AdultPrice!=""){
								GroupTitle = "title=\"可预订，成人价 " + Plan.AdultPrice+(Plan.AdultPrice=="电询"?"":"元") + " 儿童价 " + Plan.KidPrice+(Plan.KidPrice=="电询"?"":"元") +"\"";
							}
							if(!GroupTitle){
								var GroupTitle = "";
							}							
							TDString += "<td align=\"center\" height=\"22\" class=\"day4\"><a href=\"#\" " + GroupTitle + " onclick=\"parent._dateObjTwo.selectValue(" + Year + "," + Month + "," + TDay + ");return false;\" class=\"rich\">" + TDay + "</a></td>\n";
						}
					}
					
					break;
			}	
		}		
	}
	
	return TDString;
}


dateObjTwo.prototype.GetPageStringLast = function(Year,Month)
{
	var MonthNum = Year * 12 + Month;
	var CurrentMonthNum = this.todayYear * 12 + this.todayMonth;

	if(CurrentMonthNum >= MonthNum)
		return "";
		
	return '<a href="#" onclick="parent._dateObjTwo.showYearMonth('+Year+','+(Month-1)+');return false;" title="上一月" >《</a>';
}

dateObjTwo.prototype.GetPageStringNext = function(Year,Month){
	var MonthNum = Year * 12 + Month;
	var ExpireNum = 0;

	ExpireDate = this.ExpireDate;

	if(ExpireDate != null){
		ExpireNum = ExpireDate.getFullYear() * 12 + ExpireDate.getMonth();
		if(MonthNum >= ExpireNum)
			return "";
	}

	return '<a href="#" onclick="parent._dateObjTwo.showYearMonth('+Year+','+(Month)+');return false;" title="上一月" >》</a>';
}

//》

dateObjTwo.prototype.ShowWhere = function()
{
	if(!this.showWhereObj){
		this.showWhereObj = this.selectObj;	
	}
	var OBTop=0;
	var OBLeft=0;
	var OBWidth=0;
	var OBHeight=0;

	var oCurrentNode = this.showWhereObj;
	while(oCurrentNode != null && oCurrentNode.tagName != "BODY"){
		OBTop += oCurrentNode.offsetTop;
		OBLeft += oCurrentNode.offsetLeft;
		oCurrentNode = oCurrentNode.offsetParent;
	}

	OBTop += document.getElementsByTagName('BODY')[0].offsetTop 
	OBLeft += document.getElementsByTagName('BODY')[0].offsetLeft 
	
	this.div.style.top = (OBTop + 0 + this.showWhereObj.offsetHeight + "px");
	this.div.style.left = (OBLeft  + 0 + "px");

	return;
}

dateObjTwo.prototype.selectValue = function(Year,Month,Day){
	Month = Month+1;
	var string = "";
	string += Year+"-";
	if(Month<10){
		string += "0";
	}
	string += Month+"-";
	if(Day<10){
		string += "0";
	}	
	string += Day;
	this.selectObj.value = string;
	this.HideDiv();
	dateSelectAction(string,this.selectObj);
}

dateSelectAction = function(value,obj){	//	扩展函数，选择日历后触发
	
}

// share function
dateObjTwo.prototype.CaculateDay  = function(Year,Month,Day)
{
	var DateOB = new Date(Year,Month,Day);
	var MillSecond = DateOB.getTime();

	return Math.round(DateOB.getTime() / (1000 * 60 * 60 * 24));
}

dateObjTwo.prototype.GetPlan = function(DayNum)
{
	var Plan;
	var i;

	for(i = 0; i < this.GroupArray.length; i++){
		if(this.GroupArray[i].DayNum == DayNum)
			return this.GroupArray[i];
	}
	return null;
}


//线路富表现 用到的函数
function GroupPlan(DayNum,AdultPrice,KidPrice,Status)
{
	this.DayNum = DayNum;
	this.AdultPrice = AdultPrice;
	this.KidPrice = KidPrice;
	this.Status = Status;
}

dateObjTwo.prototype.PushGroup = function(GroupDate,AdultPrice,KidPrice,Status)
{
	var DayNum;

	var Year = parseInt(GroupDate.substr(0,4),10);
	var Month = parseInt(GroupDate.substr(5,2),10);
	var Day = parseInt(GroupDate.substr(8,2),10);

	DayNum = this.CaculateDay(Year,Month - 1,Day);
	
	var Plan = new GroupPlan(DayNum,AdultPrice,KidPrice,Status);
	this.GroupArray.push(Plan);
	return;
}

dateObjTwo.prototype.SetExpireDate = function(ExDate)
{
	var Year = parseInt(ExDate.substr(0,4),10);
	var Month = parseInt(ExDate.substr(5,2),10);
	var Day = parseInt(ExDate.substr(8,2),10);

	this.ExpireDate = new Date(Year,Month - 1,Day);
	return;
}

/*	判断日期有效性	0 非法日期	1 不在有效期内	2 在有效期内	*/
dateObjTwo.prototype.DateStatus = function (Year,Month,Day)
{
	var TheDayNum = this.CaculateDay(Year,Month,Day);
	var TodayNum = this.CaculateDay(this.todayYear,this.todayMonth,this.todayDay);
	var ExpireNum = 0;
	ExpireDate = this.ExpireDate;

	if(ExpireDate != null)
		ExpireNum = this.CaculateDay(ExpireDate.getFullYear(),ExpireDate.getMonth(),ExpireDate.getDate());
	
	if(TheDayNum < TodayNum)
		return 1;

	if(ExpireNum != 0 && ExpireNum < TheDayNum)
		return 1;
	
	return 2;

}

/*	
	酒店用到的函数
*/

/*	判断日期有效性	0 非法日期	1 不在有效期内	2 在有效期内	*/
dateObjTwo.prototype.HotelDateStatus = function (Year,Month,Day)
{
	var TheDayNum = this.CaculateDay(Year,Month,Day);
	var TodayNum = this.CaculateDay(this.todayYear,this.todayMonth,this.todayDay);
	
	if(TheDayNum < TodayNum)
		return 1;
	
	return 2;
}



var _dateObjTwo = new dateObjTwo();

/*
	日期控件结束
*/




//	兼容原来的日历
//		只兼容到线路日历

//	参数定义
var bRich = 0;							//表现 		 1 副表现模式  0 普通日历
var bRichType = 0;
var HotelMonthNum = 3;					//酒店预订时显示月份的数量

function ShowCalendar(ob,objWhere)
{
	objWhere = objWhere?objWhere:ob;
	_dateObjTwo.ShowDiv(ob,objWhere);
}
function CancelBubble(event){

}
dateSelectAction = function(value,obj){	//	扩展函数，选择日历后触发
	obj.style.color = "#333333";	
	OnSelectDate();
}

OnSelectDate = function(){
	
}
function SetExpireDate(ExDate)
{
	_dateObjTwo.SetExpireDate(ExDate);
}


//GroupDate的格式 "YYYY-MM-DD"
function PushGroup(GroupDate,AdultPrice,KidPrice,Status)
{
	_dateObjTwo.PushGroup(GroupDate,AdultPrice,KidPrice,Status);
	return;
}

//GroupDate clear
function ClearGroup()
{
	_dateObjTwo.GroupArray = new Array();
	return;
}


//计算1970-01-01年以来的天数
function GetlinuxDate(TicketDate)
{
	var Year = parseInt(TicketDate.substr(0,4),10);
	var Month = parseInt(TicketDate.substr(5,2),10);
	var Day = parseInt(TicketDate.substr(8,2),10);
	return _dateObjTwo.CaculateDay(Year,Month - 1,Day);
}

function GetPlan(DayNum)
{
	return _dateObjTwo.GetPlan(DayNum);
}
function CaculateDay(Year,Month,Day)
{
	return _dateObjTwo.CaculateDay(Year,Month,Day);
}

function GroupSort(PlanA,PlanB)
{
	if(PlanA.DayNum > PlanB.DayNum)
		return 1;

	if(PlanA.DayNum < PlanB.DayNum)
		return -1;

	return 0;
}



function patch(n)
{
	var r = "";

	if (n < 10)	
		r = "0" + n;
	else
		r = "" + n;

	return r;
}


