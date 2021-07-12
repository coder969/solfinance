CalendarShowDataObj = {
	//	0 放假   1上班
	"2011-12-31" : [ 1,	"上班" ],
	"2012-01-01" : [ 0,"元旦" ],
	"2012-01-02" : [ 0,"" ],
	"2012-01-03" : [ 0,"" ],
	
	"2012-01-21" : [ 1,"上班" ],
	"2012-01-22" : [ 0,	"除夕" ],
	"2012-01-23" : [ 0,	"春节" ],
	"2012-01-24" : [ 0,	"" ],
	"2012-01-25" : [ 0,	"" ],
	"2012-01-26" : [ 0,	"" ],
	"2012-01-27" : [ 0,	"" ],
	"2012-01-28" : [ 0,	"" ],
	"2012-01-29" : [ 1,"上班" ],

	"2012-02-14" : [ 1,"情人节" ],

	"2012-03-31" : [ 1,"上班" ],
	"2012-04-01" : [ 1,"" ],
	"2012-04-02" : [ 0,	"清明节" ],
	"2012-04-03" : [ 0,	"" ],
	"2012-04-04" : [ 0,	"" ],

	"2012-04-28" : [ 1,"上班" ],
	"2012-04-29" : [ 0,	"放假" ],
	"2012-04-30" : [ 0,	"" ],
	"2012-05-01" : [ 0,	"劳动节" ],

	"2012-06-22" : [ 0,	"放假" ],
	"2012-06-23" : [ 0,	"端午节" ],
	"2012-06-24" : [ 0,	"" ],
	
	"2012-09-29" : [ 1,"上班" ],
	"2012-09-30" : [ 0,	"中秋节" ],
	"2012-10-01" : [ 0,	"国庆节" ],
	"2012-10-02" : [ 0,	"" ],
	"2012-10-03" : [ 0,	"" ],
	"2012-10-04" : [ 0,	"" ],
	"2012-10-05" : [ 0,	"" ],
	"2012-10-06" : [ 0,	"" ],
	"2012-10-07" : [ 0,	"" ],

	"t" : ""
}

var lineListThemeObj = {
	lineListThemeData : {},
	LineDataObjArray : {},
	doFlag : false,
	getUrlLeft : "",
	
	showTipFlag : true,
	showTipLineString : null,
	showTipDiv : null,
	
	yearMonthTipType : 0,
	tableWithObj : {
		tableWidth : 626,
		tableTdTipWidth : 94,
		tableTdWidth : 76
	},
	imgSrcObj : {
		upSrc : "/img/up.gif",
		downSrc : "/img/down.gif"
	},
	
	httpAjxaSend : function( _url )
	{
		var scrObj = document.createElement('SCRIPT');
		scrObj.src = _url;
		document.body.appendChild(scrObj);		
		return;
	},
	returnFucForAjxaDescription : function( returnObj )
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
		switch( returnObj["type"] )
		{
			case 1:
				var returnString = '<div class="listts">'+
						'<img src="'+
						returnObj["picLink"] +
						'" width="98" height="64" />'+
						'<p>'+
						returnObj["description"] +
						'</p>'+
						'</div>';
				this.lineListThemeData[product_id]["descHtml"] = returnString;
				this.resetContent( product_id,1 );
				this.showContent( product_id, returnString );
				break;
			case 4:
				var returnString = "<div class=newlisttext>" +
					returnObj["description"] +
					"</div>";
				this.lineListThemeData[product_id]["desc2Html"] = returnString;
				this.resetContent(product_id,4);
				this.showContent( product_id, returnString );
				break;
			case 2:
				var returnString = '';
				var SatisfactionObjArray = returnObj["SatisfactionObjArray"];
				for(var index=0; index<SatisfactionObjArray.length; index++)
				{
					var temp = "";
					if(SatisfactionObjArray[index]["schedule_grade"]>0)
					{
						if(temp!="")
							temp += "&nbsp;&nbsp;|&nbsp;&nbsp;";

						temp += "<span>行程："+SatisfactionObjArray[index]["schedule_grade_name"]+"</span>";
					}
					if(SatisfactionObjArray[index]["hotel_grade"]>0)
					{
						if(temp!="")
							temp += "&nbsp;&nbsp;|&nbsp;&nbsp;";

						temp += "<span>住宿："+SatisfactionObjArray[index]["hotel_grade_name"]+"</span>";
					}
					if(SatisfactionObjArray[index]["meals_grade"]>0)
					{
						if(temp!="")
							temp += "&nbsp;&nbsp;|&nbsp;&nbsp;";
							
						temp += "<span>餐食："+SatisfactionObjArray[index]["meals_grade_name"]+"</span>";
					}
					if(SatisfactionObjArray[index]["whole_grade"]>0)
					{
						if(temp!="")
							temp += "&nbsp;&nbsp;|&nbsp;&nbsp;";
							
						temp += "<span>导游："+SatisfactionObjArray[index]["whole_grade_name"]+"</span>";
					}				
					if(SatisfactionObjArray[index]["traffic_grade"]>0)
					{
						if(temp!="")
							temp += "&nbsp;&nbsp;|&nbsp;&nbsp;";
							
						temp += "<span>车辆："+SatisfactionObjArray[index]["traffic_grade_name"]+"</span>";
					}
					if(SatisfactionObjArray[index]["customer_service"]>0)
					{
						if(temp!="")
							temp += "&nbsp;&nbsp;|&nbsp;&nbsp;";
							
						temp += "<span>客服："+SatisfactionObjArray[index]["customer_service_name"]+"</span>";
					}										
					
					returnString += '<dl id="recall_tls"';
					if(index%2 == 1)
						returnString += ' style="background:#F7FBFF;"';
					returnString += '>';
					returnString += '<dd>满意度<br /><strong>'+SatisfactionObjArray[index]["satisfaction"]+'</b></strong></dd>';
					returnString += '<dt>';
					returnString += '<em>'+SatisfactionObjArray[index]["satisfaction_date"];
					returnString += '回访'+SatisfactionObjArray[index]["userString"]+'</em><br />';
					returnString += temp;
					returnString += '<br /><b>'+SatisfactionObjArray[index]["satisfaction_desc"]+'</b>';
					returnString += '</dt>';
					returnString += '</dl>';
				}
				if( returnString=="" )
					returnString = "暂无回访记录";
					
				this.lineListThemeData[product_id]["satisfactionHtml"] = returnString;
				this.resetContent( product_id,2 );
				this.showContent( product_id, returnString );			
				break;
			case 3:
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

				if( product_id.toLowerCase().indexOf("sz")!="-1" )
				{
					lineUrl = "http://sz.landtu.com" + lineUrl;
				}else if( product_id.toLowerCase().indexOf("gz")!="-1" )
				{
					lineUrl = "http://gz.landtu.com" + lineUrl;
				}				
				
				var returnString = "";
				switch(price_type)
				{
					case "0":
						returnString = this.getStartDateString( product_id, this.resetStartDateArrayToObj(StartDateObjArray, DateObjStart, DateObjEnd), lineUrl, 0, lineListThemeObj["tableWithObj"], price_show_type);
						break;
					case "2":
						var objTemp = {
							"LineRoomShowString" : LineRoomShowString,
							"roomObjArrayString" : roomObjArrayString,
							"DateObjStart" : DateObjStart
						};
						this.LineDataObjArray[ product_id ] = {
							"StartDateObjArray" : StartDateObjArray,
							"expire_time" : expire_time,
							"product_id" : product_id
						};
						returnString = this.getRoomStartDateString( product_id, objTemp, lineUrl, 0, price_show_type);
						break;
				}
				this.lineListThemeData[ product_id ]["dateHtml"] = returnString;
				this.resetContent( product_id,3 );
				this.showContent( product_id, returnString );
				switch(price_type)
				{
					case "2":
						this.RoomPriceTableInit( "LineRoomPrice" + product_id );
						break;
				}	
				break;
			default:
			
				break;
			
		}
		return;
	},
	init : function(objId)
	{
		if( !objId )
			objId = "themeContent";
			
		if( !$(objId) )
		{
			return;	
		}
		this.doFlag = true;

		var tempObjArray = $(objId).getElementsByTagName("img");
		for(var index = 0; index<tempObjArray.length; index++)
		{
			tempObj = tempObjArray[index];
			if(tempObj.id && tempObj.id.substr(0,1)=="I")
			{
				var lineIdString = tempObj.id.substr(1);
				
				//定义背景
				if( $("TR"+lineIdString) )
				{
					var trObj = $("TR"+lineIdString);
					
					trObj.onmouseover = function()
					{
						var lineIdString = this.id.substr(2);
						this.className += " listbg";
						if($("S"+lineIdString))
						{
							$("S"+lineIdString).className += " listbg";
						}
					}
					trObj.onmouseout = function()
					{
						var lineIdString = this.id.substr(2);
						this.className = this.className.replace(" listbg","");
						if($("S"+lineIdString))
						{
							$("S"+lineIdString).className = $("S"+lineIdString).className.replace(" listbg","");
						}
					}
					
					if($("S"+lineIdString))
					{
						var sObj = $("S"+lineIdString);
						sObj.onmouseover = function()
						{
							var lineIdString = this.id.substr(1);
							this.className += " listbg";
							if($("TR"+lineIdString)){
								$("TR"+lineIdString).className += " listbg";
							}						
						}
						sObj.onmouseout = function()
						{
							var lineIdString = this.id.substr(1);
							this.className = this.className.replace(" listbg","");
							if($("TR"+lineIdString))
							{
								$("TR"+lineIdString).className = $("TR"+lineIdString).className.replace(" listbg","");
							}
						}							
					}
				}
				
				//初始化变量
				this.dataInit( lineIdString );

				//简介
				this.lineListThemeData[ lineIdString ]["descObj"] = tempObj;
				tempObj.style.cursor="pointer";
				tempObj.onclick = function()
				{
					var lineIdString = this.id.substr(1);					
					if( lineListThemeObj.lineListThemeData[lineIdString]["descHtml"] == "" )
					{
						//获取数据内容
						var getProductUrl = lineListThemeObj.getUrlLeft + 
								"/ajxa/AjxaLineListThemeContent.php?" +
								"product_id=" + lineIdString + 
								"&type=1" +
								"&fuc=lineListThemeObj.returnFucForAjxaDescription" +
								"&rnd=" + new Date();

						lineListThemeObj.httpAjxaSend(getProductUrl);
						return;
					}else{
						if( lineListThemeObj.lineListThemeData[lineIdString]["showType"] == 1  )
						{
							lineListThemeObj.resetContent(lineIdString,0);
							lineListThemeObj.hidDiv( lineIdString );							
						}else{
							lineListThemeObj.resetContent(lineIdString,1);
							lineListThemeObj.showContent( lineIdString, lineListThemeObj.lineListThemeData[lineIdString]["descHtml"] );
						}						
					}
					return;
				}
				
				//图片模式的简介
				if( $("T"+lineIdString) )
				{
					var desc2 = $("T"+lineIdString);
					this.lineListThemeData[lineIdString]["desc2Obj"] = desc2;
					desc2.onclick = function()
					{
						var lineIdString = this.id.substr(1);
						if( lineListThemeObj.lineListThemeData[lineIdString]["desc2Html"] == "" )
						{									
							//获取数据内容
							var getProductUrl = lineListThemeObj.getUrlLeft + 
									"/ajxa/AjxaLineListThemeContent.php?" +
									"product_id=" + lineIdString + 
									"&type=4" +
									"&fuc=lineListThemeObj.returnFucForAjxaDescription" +
									"&rnd=" + new Date();
																	
							lineListThemeObj.httpAjxaSend(getProductUrl);
						}else{
							if( lineListThemeObj.lineListThemeData[lineIdString]["showType"] == 4  )
							{
								lineListThemeObj.resetContent(lineIdString,0);
								lineListThemeObj.hidDiv( lineIdString );		
							}else{
								lineListThemeObj.resetContent(lineIdString,4);
								lineListThemeObj.showContent( lineIdString, lineListThemeObj.lineListThemeData[lineIdString]["desc2Html"] );
							}						
						}
						return false;
					}
				}
				
				//回访初始化
				if( $("F"+lineIdString) )
				{
					var satisfaction = $("F"+lineIdString);
					this.lineListThemeData[lineIdString]["satisfactionObj"] = satisfaction;
					satisfaction.onclick = function()
					{
						var lineIdString = this.id.substr(1);
						if( lineListThemeObj.lineListThemeData[lineIdString]["satisfactionHtml"] == "" )
						{
							//获取数据内容
							var getProductUrl = lineListThemeObj.getUrlLeft + 
									"/ajxa/AjxaLineListThemeContent.php?" +
									"product_id=" + lineIdString + 
									"&type=2" +
									"&fuc=lineListThemeObj.returnFucForAjxaDescription" +
									"&rnd=" + new Date();

							lineListThemeObj.httpAjxaSend(getProductUrl);							
						}else{
							if( lineListThemeObj.lineListThemeData[lineIdString]["showType"] == 2  )
							{
								lineListThemeObj.resetContent( lineIdString,0);
								lineListThemeObj.hidDiv( lineIdString );							
							}else{
								lineListThemeObj.resetContent( lineIdString,2);
								lineListThemeObj.showContent( lineIdString, lineListThemeObj.lineListThemeData[lineIdString]["satisfactionHtml"] );
							}						
						}
						return false;
					}
				}
				
				//出发日期日历初始化
				if( $("D"+lineIdString) )
				{
					var DateObj = $("D"+lineIdString);
					
					//提示的obj
					if( this.showTipLineString == null )
					{
						this.showTipLineString = lineIdString;
					}
					
					this.lineListThemeData[lineIdString]["dateObj"] = DateObj;
					DateObj.onclick = function()
					{
						var lineIdString = this.id.substr(1);
						if( lineListThemeObj.lineListThemeData[lineIdString]["dateHtml"] == "" )
						{
							//获取数据内容
							var getProductUrl = lineListThemeObj.getUrlLeft + 
									"/ajxa/AjxaLineListThemeContent.php?" +
									"product_id=" + lineIdString + 
									"&type=3" +
									"&fuc=lineListThemeObj.returnFucForAjxaDescription" +
									"&rnd=" + new Date();
							

							lineListThemeObj.httpAjxaSend(getProductUrl);							
						}else{
							if( lineListThemeObj.lineListThemeData[lineIdString]["showType"] == 3  )
							{
								lineListThemeObj.resetContent( lineIdString,0 );
								lineListThemeObj.hidDiv( lineIdString );							
							}else{
								lineListThemeObj.resetContent( lineIdString,3 );
								lineListThemeObj.showContent( lineIdString, lineListThemeObj.lineListThemeData[lineIdString]["dateHtml"] );
							}						
						}				
						return false;
					}
				}				
			}
		}
		
		//显示提示的层
		if( this.showTipFlag && this.showTipLineString != null  )
		{
			this.showTipDiv = document.createElement('DIV');
			this.showTipDiv.className = "pops";
			$(objId).appendChild(this.showTipDiv);
			this.showTipDiv.id = 'showTipDivId';
			
			var DLineObjWhere = GetObjShowWhere("D"+this.showTipLineString);
			var ILineObjWhere = GetObjShowWhere("I"+this.showTipLineString);
			var themeContentWhere = GetObjShowWhere(objId);
			if( ( DLineObjWhere["top"] - ILineObjWhere["top"] < 100 ) && (DLineObjWhere["top"] < ILineObjWhere["top"]) )
			{
				this.showTipDiv.style.top = (DLineObjWhere["top"] - themeContentWhere["top"] - 35  + "px");
				this.showTipDiv.style.left = (DLineObjWhere["left"] - themeContentWhere["left"] - 145 + "px");			
				this.showTipDiv.innerHTML = '<img src="/img/open.gif" style="cursor:pointer" onclick="lineListThemeObj.showTipDiv.style.display=\'none\'" />';
			}
			setTimeout("lineListThemeObj.showTipDiv.style.display='none';",5000);
		}
		return;
	},
	dataInit : function( lineId )
	{
		if(!this.lineListThemeData[lineId])
		{
			this.lineListThemeData[lineId] = {
				"descHtml" : "",
				"desc2Html" : "",
				"satisfactionHtml" : "",
				"dateHtml" : "",
				"descObj" : null,
				"satisfactionObj" : null,
				"dateObj" : null,	
				"desc2Obj" : null,	
				"showType" : 0		// 0 未显示  1 显示详情  2 显示满意度  3 显示日历  4 图片详细描述
			};
		};
		return;
	},
	resetContent : function(lineId,showType)
	{
		if($( "I"+lineId ))
		{
			$( "I"+lineId ).src = "/img/listz1.gif";
		}
		if($( "F"+lineId ))
		{
			$( "F"+lineId ).innerHTML = $( "F"+lineId ).innerHTML.replace("▲","▼");
		}
		if($( "D"+lineId ))
		{
			$( "D"+lineId ).innerHTML = $( "D"+lineId ).innerHTML.replace("▲","▼");
		}
		if($( "T"+lineId ))
		{
			$( "T"+lineId ).innerHTML = $( "T"+lineId ).innerHTML.replace("▲","▼");
		}

		this.lineListThemeData[lineId]["showType"] = showType;
		switch(showType)
		{
			case 1:
				if($( "I"+lineId ))
				{
					$( "I"+lineId ).src = "/img/listz2.gif";
				}
				break;
			case 2:
				if($( "F"+lineId ))
				{
					$( "F"+lineId ).innerHTML = $( "F"+lineId ).innerHTML.replace("▼","▲");
				}
				break;
			case 3:
				if($( "D"+lineId ))
				{
					$( "D"+lineId ).innerHTML = $( "D"+lineId ).innerHTML.replace("▼","▲");
				}
				break;
			case 4:
				if($( "T"+lineId ))
				{
					$( "T"+lineId ).innerHTML = $( "T"+lineId ).innerHTML.replace("▼","▲");
				}
				break;
				
		}
		return;
	},
	goDown : function(lineId,length)
	{
		if(!$("doDisplay__"+lineId))
			return;
			
		var where = $("doDisplay__"+lineId).scrollTop + (length);
		if(where<0) 
			where=1;
		$("doDisplay__"+lineId).scrollTop = where;
		return false;
	},
	showContent : function( lineId, content )
	{
		if($("P"+lineId))
		{
			$("P"+lineId).style.display = "none";
		}
		
		if($("S"+lineId))
		{
			$("S"+lineId).style.display = "";
		}
		if($("SC"+lineId))
		{
			$("SC"+lineId).innerHTML = content;
		}
		return;
	},
	hidDiv : function( lineId )
	{
		if($("P"+lineId))
		{
			$("P"+lineId).style.display = "";
		}
		$("S"+lineId).style.display = "none";
		$("SC"+lineId).innerHTML = "";
		return;		
	},
	resetStartDateArrayToObj : function( StartDateArray, DateObjStart, DateObjEnd )
	{
		//为日历准备数据
		var StartDateObjTempArray = [], StartDateObjTemp = {};
		for( var index=0; index<StartDateArray.length; index++)
		{
			StartDateObjTemp[StartDateArray[index][0]] = StartDateArray[index];
		}

		var tempArray, DateObjStartYear, DateObjStartMonth, DateObjStartDay, DateObjStartOB, DateObjStartYear, DateObjStartMonth, DateObjStartDay, DateObjStartWeedDayNum, DateObjStartWeedDayNumTemp, DateObjEndYear, DateObjEndMonth, DateObjEndDay, DateObjEndOB;
	
		tempArray = DateObjStart.split("-");
		DateObjStartYear = parseInt(tempArray[0],10);
		DateObjStartMonth = parseInt(tempArray[1],10)-1;
		DateObjStartDay = parseInt(tempArray[2],10);
		DateObjStartOB = new Date(DateObjStartYear,DateObjStartMonth,DateObjStartDay);
	
		tempArray = DateObjEnd.split("-");
		DateObjEndYear = parseInt(tempArray[0],10);
		DateObjEndMonth = parseInt(tempArray[1],10)-1;
		DateObjEndDay = parseInt(tempArray[2],10);
		DateObjEndOB = new Date(DateObjEndYear,DateObjEndMonth,DateObjEndDay);
	
		var monthChange = "-1";
		while(DateObjStartOB<=DateObjEndOB)
		{
			DateObjStartYear = parseInt(DateObjStartOB.getFullYear(),10);
			DateObjStartMonth = parseInt(DateObjStartOB.getMonth(),10);
			DateObjStartDay = parseInt(DateObjStartOB.getDate(),10);	
			DateObjStartWeedDayNum = parseInt(DateObjStartOB.getDay(),10);	
					
			var rowspan = "";
			if(DateObjStartWeedDayNum==0 && monthChange != DateObjStartMonth )
			{
				monthChange = DateObjStartMonth;
				
				var DateObjStartTempOB = new Date(DateObjStartOB.getYear(),DateObjStartOB.getMonth()+1,1); 
				var MonthLastDay = new Date(DateObjStartTempOB-86400000); 
				var LastMonthDay = parseInt(MonthLastDay.getDate(),10);
				
				var num = LastMonthDay - DateObjStartDay + 1;
				rowspan = parseInt( num/7 ,10);
				if( rowspan * 7 < num)
				{
					rowspan ++;
				}
			}
			
			var thisYear = DateObjStartYear;
			var thisMonth = (DateObjStartMonth+1);
			var thisDay = (DateObjStartDay);
			if(thisMonth<10) thisMonth = "0" + thisMonth.toString();
			if(thisDay<10) thisDay = "0" + thisDay.toString();
			var yearmonthday = thisYear + "-" + thisMonth + "-" + thisDay;
	
			var tempObj = {
				"year" : thisYear,
				"month" : thisMonth,
				"day" : thisDay,
				"dayNum" : DateObjStartWeedDayNum,
				"yearmonthday" : yearmonthday,
				"rowspan" : rowspan,
				"adult_price" : "",
				"kid_price" : "",
				"status_info" : "",
				"group_bit" : ""
			};
			if( StartDateObjTemp[yearmonthday] )
			{
				tempObj["adult_price"] = StartDateObjTemp[yearmonthday][1];
				tempObj["kid_price"] = StartDateObjTemp[yearmonthday][2];
				tempObj["status_info"] = StartDateObjTemp[yearmonthday][3];
				tempObj["group_bit"] = StartDateObjTemp[yearmonthday][4];
			}
			StartDateObjTempArray.push(tempObj);	
			DateObjStartOB = new Date(DateObjStartYear,DateObjStartMonth,DateObjStartDay+1);
		}
		return StartDateObjTempArray;
	},	
	getStartDateString : function(product_id, StartDateObjArray, lineUrl, showType, WidthObj, price_show_type)
	{
		//获取日历的string
		var BGmonth = 0, BG =0, thisYear, thisMonth, thisDay, BGColor;
		var DateOB = new Date();
		thisYear = DateOB.getFullYear();
		thisMonth = DateOB.getMonth()+1;
		thisDay = DateOB.getDate();
		if(thisMonth<10) thisMonth = "0" + thisMonth.toString();
		if(thisDay<10) thisDay = "0" + thisDay.toString();
		
		if(!WidthObj)
		{
			WidthObj = lineListThemeObj["tableWithObj"];
		}
		
		var imgSrcObj = lineListThemeObj["imgSrcObj"];
	
		var _getDateNameObj = new getDateNameObj();
		
			var returnString  = "";
				returnString += "\n" + '<table width="' + WidthObj["tableWidth"] + '" cellpadding="0" cellspacing="1" bgcolor="#D8EAFE" style="margin:2px 0 0 0;" >';
				returnString += "\n" + '<tr id="tl_rl2">';
				returnString += "\n" + '<td width="'+WidthObj["tableTdTipWidth"]+'" height="26" align="center" bgcolor="#D8EAFE">';
				returnString += "\n" + '<a href="#" onclick="lineListThemeObj.goDown(\'' + product_id + '\',-56); return false;">';
				returnString += "\n" + '<img src="' + imgSrcObj["upSrc"] + '" />';
				returnString += "\n" + '</a>';
				returnString += "\n" + '</td>';
				returnString += "\n" + '<td width="' + WidthObj["tableTdWidth"] + '" align="center" bgcolor="#EDF5FE"><span>星期日</span></td>';
				returnString += "\n" + '<td width="' + WidthObj["tableTdWidth"] + '" height="25" align="center" bgcolor="#EDF5FE">星期一</td>';
				returnString += "\n" + '<td width="' + WidthObj["tableTdWidth"] + '" align="center" bgcolor="#EDF5FE">星期二</td>';
				returnString += "\n" + '<td width="' + WidthObj["tableTdWidth"] + '" align="center" bgcolor="#EDF5FE">星期三</td>';
				returnString += "\n" + '<td width="' + WidthObj["tableTdWidth"] + '" align="center" bgcolor="#EDF5FE">星期四</td>';
				returnString += "\n" + '<td width="' + WidthObj["tableTdWidth"] + '" align="center" bgcolor="#EDF5FE">星期五</td>';
				returnString += "\n" + '<td width="' + WidthObj["tableTdWidth"] + '" align="center" bgcolor="#EDF5FE"><span>星期六</span></td>';
				returnString += "\n" + '</tr>';
				returnString += "\n" + '</table>';		
						
				returnString += "\n" + '<div class="Calendar" id="doDisplay__' + product_id + '">';
				returnString += "\n" + '<table width="' + WidthObj["tableWidth"] + '" cellpadding="0" cellspacing="1" bgcolor="#D8EAFE" style="margin-top:-1px;">';
				
				for(var index=0; index<StartDateObjArray.length; index++)
				{
					var PrintDate = StartDateObjArray[index];
					if( PrintDate["month"] != BGmonth)
					{
						BGmonth = PrintDate["month"];
						BG = (BG==0?1:0);
					}										
					if(PrintDate["dayNum"]=="0")
					{
						returnString += '<tr>';
					}
					if(PrintDate["rowspan"]!="")
					{
						returnString += '<td rowspan="' + PrintDate["rowspan"] + 
							'" width="' + WidthObj["tableTdTipWidth"] + 
							'" align="center" bgcolor="#FFFDF4"><b>' +
							(lineListThemeObj.yearMonthTipType == 0 ? (PrintDate["year"]+'年'+PrintDate["month"]+'月') : (PrintDate["year"]+'-'+PrintDate["month"]) )+
							'</b></td>';
					}								
	
					var dayShow = PrintDate["day"];
					/*
					var t = _getDateNameObj.getDateName( new Date(PrintDate["year"], (PrintDate["month"]-1) ,PrintDate["day"]) );
					if(t!=""){
						dayShow = "<em>" + t + "</em>";
					}
					*/
					if( thisYear == PrintDate["year"] && thisMonth == PrintDate["month"] && thisDay == PrintDate["day"])
					{					
						returnString += '<td width="' + WidthObj["tableTdWidth"] + '" height="55" align="center" style="background:#FFFFE1;color:#FF6600;" >';
						returnString += '<div>' + PrintDate["day"] + '<br /><span>今天</span></div>';
						returnString += '</td>';
					}else{
						if(BG==0)
						{
							BGColor = '#FFFFFF';
						}else{
							BGColor = '#F7FCFF';
							BGColor = '#ffffff';
						}
						
						var showName = "";
						var classNameTemp = ""
						if( CalendarShowDataObj[ PrintDate["year"] + "-" + PrintDate["month"] + "-" + PrintDate["day"] ] )
						{
							var temp = CalendarShowDataObj[ PrintDate["year"] + "-" + PrintDate["month"] + "-" + PrintDate["day"] ];
							switch(temp[0])
							{
								case 0:
									BGColor = '#FEF8F5';
									classNameTemp = "div1"
									break;								
								case 2:
									BGColor = '#ffffff';
									classNameTemp = "div1"
									break;
								case 3:
									BGColor = '#ffffff';
									classNameTemp = "div2"
									break;
								case 1:
								default:
									BGColor = '#ECF5FF';
									classNameTemp = "div2"
									break;
							}
							if(temp[1]!="")
							{
								showName = '<div class="' + classNameTemp + '">' + temp[1] + '</div>'
							}
						}
	
						returnString += '<td width="' + WidthObj["tableTdWidth"] + '" height="55" align="center" style="background:' + BGColor + ';" >';
	
						if(PrintDate["adult_price"]=="0")
						{
							PrintDate["adult_price"] = "电询";
						}
						if(PrintDate["kid_price"]=="0")
						{
							PrintDate["kid_price"] = "电询";
						}
						
						var adult_price = (PrintDate["adult_price"]!="电询"?"¥":"") + PrintDate["adult_price"];
						var kid_price = (PrintDate["kid_price"]!="电询"?"¥":"") + PrintDate["kid_price"];
						
						var title = PrintDate["year"] + "-" + PrintDate["month"] + "-" + PrintDate["day"] + '预定价格为 ';
						switch(price_show_type*1)
						{
							case 1:	
								title += '双人价 ' + adult_price;
								break;	
							case 2:		
								title += '单人价 ' + adult_price;
								break;	
							case 0:
							default:
								title += '成人 ' + adult_price + '　儿童 ' + kid_price;
								break;
						}			
				
	
						switch(PrintDate["status_info"])
						{
							case "1":	//正常使用
								returnString += '<div class="td4">';
								returnString += showName;						
								returnString += '<a href="'+lineUrl+'"';
								returnString += ' title="' + title + '"';
								if(showType==1)
								{
									returnString += ' onclick="newSelectStartDate(\''+PrintDate["year"]+'-'+PrintDate["month"]+'-'+PrintDate["day"]+'\');"'; 	
								}else{
									returnString += ' target="_blank"'; 	
								}
								returnString += ' >';
								returnString += PrintDate["day"];
								returnString += '<br />';
								returnString += '<span>';
								returnString += adult_price;
								returnString += '</span>';
								if( PrintDate["group_bit"]>0 && PrintDate["group_bit"]<=5 )
								{
									returnString += '<br /><em>余位 ' + PrintDate["group_bit"] + '</em>';
								}else if(PrintDate["group_bit"]>5){
									returnString += '<br /><em>余位>5</em>';
								}
								returnString += '</a>';							
								returnString += '</div>';
								break;
							case "2":	//已经成团
								returnString += '<div class="td4">';
								returnString += showName;						
								returnString += '<a href="'+lineUrl+'"';
								returnString += ' title="' + title + '"';
								if(showType==1)
								{
									returnString += ' onclick="newSelectStartDate(\''+PrintDate["year"]+'-'+PrintDate["month"]+'-'+PrintDate["day"]+'\');"'; 	
								}else{
									returnString += ' target="_blank"'; 	
								}
								returnString += ' >';
								returnString += PrintDate["day"];
								returnString += '<br />';
								returnString += '<span>';
								returnString += adult_price;
								returnString += '</span>';
								
								returnString += '<br /><em>成团';
								if( PrintDate["group_bit"]>0 && PrintDate["group_bit"]<=5 )
								{
									returnString += ' 余位 ' + PrintDate["group_bit"];
								}else if(PrintDate["group_bit"]>5){
									returnString += ' 余位>5';
								}
								returnString += '</em>';
								returnString += '</a>';							
								returnString += '</div>';
								break;							
							case "0":	//暂停使用
								returnString += '<div class="td2">';
								returnString += showName;						
								returnString += PrintDate["day"];
								returnString += '<br /><span>';
								returnString += adult_price;
								returnString += '</span>';
								returnString += '</div>';
								break;
								
							case "-1":	//已经满团
								//returnString += '<div ' +  (showName!=''?' class="td4"':' class="td2"') + '>';
								returnString += '<div class="td2">';
								returnString += showName;						
								returnString += PrintDate["day"];
								returnString += '<br /><span>';
								returnString += adult_price;
								returnString += '</span>';
								returnString += '<br /><em>满团</em>';
								returnString += '</div>';
								break;
							default:
								returnString += '<div ' +  (showName!=''?' class="td4"':'') + '>';
								returnString += showName;						
								returnString += PrintDate["day"];
								returnString += '</div>';
								break;	
						}
						returnString += '</td>';						
					}
	
					if(PrintDate["dayNum"]=="6")
					{
						returnString += '</tr>';
					}											
				}
	
				returnString += "\n" + '</table>';
				returnString += "\n" + '</div>';
				
				returnString += "\n" + '<table width="' + WidthObj["tableWidth"] + '" cellpadding="0" cellspacing="1" bgcolor="#D8EAFE" style="margin-top:-1px;">';
				returnString += "\n" + '<tr id="tl_rl2">';
				returnString += "\n" + '<td width="'+WidthObj["tableTdTipWidth"]+'" height="26" align="center" bgcolor="#D8EAFE">';
				returnString += "\n" + '<a href="#" onclick="lineListThemeObj.goDown(\'' + product_id + '\',56); return false;">';
				returnString += "\n" + '<img src="' + imgSrcObj["downSrc"] + '" />';
				returnString += "\n" + '</a>';
				returnString += "\n" + '</td>';
				returnString += "\n" + '<td width="' + WidthObj["tableTdWidth"] + '" align="center" bgcolor="#EDF5FE"><span>星期日</span></td>';
				returnString += "\n" + '<td width="' + WidthObj["tableTdWidth"] + '" height="25" align="center" bgcolor="#EDF5FE">星期一</td>';
				returnString += "\n" + '<td width="' + WidthObj["tableTdWidth"] + '" align="center" bgcolor="#EDF5FE">星期二</td>';
				returnString += "\n" + '<td width="' + WidthObj["tableTdWidth"] + '" align="center" bgcolor="#EDF5FE">星期三</td>';
				returnString += "\n" + '<td width="' + WidthObj["tableTdWidth"] + '" align="center" bgcolor="#EDF5FE">星期四</td>';
				returnString += "\n" + '<td width="' + WidthObj["tableTdWidth"] + '" align="center" bgcolor="#EDF5FE">星期五</td>';
				returnString += "\n" + '<td width="' + WidthObj["tableTdWidth"] + '" align="center" bgcolor="#EDF5FE"><span>星期六</span></td>';
				returnString += "\n" + '</tr>';
				returnString += "\n" + '</table>';
		
		return returnString;
	},
	getRoomStartDateString : function( product_id, LineRoomObj, lineUrl, showType, price_show_type)
	{
		var returnString  = "";
			returnString += '<div id="tlinehotel" class="mar_tt" style="width:636px; border:1px solid #D8EAFE; background:#EDF5FE; margin-top:0;">';
			returnString += '<div class="tlinehotel" style="width:630px;">';
			returnString += '<div class="tlhoteltime" style=" border-bottom:1px solid #EDF5FE;"><font id="selectDateMsg">';
			returnString += LineRoomObj["LineRoomShowString"];
			returnString += '</font>&nbsp;&nbsp;&nbsp;&nbsp;';
			returnString += '<input name="start_date' + product_id + '" type="hidden" id="start_date' + product_id + '" value="'+ LineRoomObj["DateObjStart"] +'" onFocus="ShowCalendar(this);" class="inputicon" readonly="readonly">';
			returnString += '<a href="#" onClick="lineListThemeObj.ClearRoomStartDate( \'' + product_id + '\');ShowCalendar($(\'start_date' + product_id + '\'),this); return false;">修改日期</a></div>';
			returnString += '<div class="tlhotel" style="width:618px;"><h3>酒店房型</h3></div>';
			returnString += '<div id="LineRoomPrice' + product_id + '">';
			
			switch(price_show_type*1)
			{
				case 1:
					returnString += '<table width="620" cellpadding="0" cellspacing="0">';
					returnString += '<tr class="tlinehoteltr">';
					returnString += '<td width="160" height="25" bgcolor="#EEF9FF">&nbsp;&nbsp;房型</td>';
					returnString += '<td width="60" bgcolor="#EEF9FF">餐食</td>';
					returnString += '<td width="260" bgcolor="#EEF9FF">价格说明</td>';
					returnString += '<td width="80" align="center" bgcolor="#EEF9FF">价格</td>';
					returnString += '<td width="60" bgcolor="#EEF9FF">&nbsp;</td>';
					returnString += '</tr>';
				
					for( var index=0; index<LineRoomObj["roomObjArrayString"].length; index++ )
					{
						var tempObj = LineRoomObj["roomObjArrayString"][index];
						returnString += '<tr class="tlinehoteltd">';
						returnString += '<td height="36" class="tlinehoteltdicon">';
						returnString += '<b>' + tempObj["room_name"] + '</b>';;
						returnString += '<p>' + tempObj["price_show_type_desc"] + '</p>';
						returnString += '</td>';
						returnString += '<td><font color="#0466EC">' + tempObj["breakfast_name"] + '</font></td>';
						returnString += '<td>' + tempObj["room_desc"] + '</td>';
						returnString += '<td align="center"><font color="#FF6600">' + tempObj["adult_price"] + '</font></td>';
						returnString += '<td align="center"><a href="' + lineUrl + '" target="_blank"><img src="/img/hotelbt.gif" width="58" height="20"></a></td>';
						returnString += '</tr>';
					}
					
					returnString += '</table>';
					break;
				case 0:
				default:
					returnString += '<table width="620" cellpadding="0" cellspacing="0">';
					returnString += '<tr class="tlinehoteltr">';
					returnString += '<td width="160" height="25" bgcolor="#EEF9FF">&nbsp;&nbsp;房型</td>';
					returnString += '<td width="60" bgcolor="#EEF9FF">餐食</td>';
					returnString += '<td width="160" bgcolor="#EEF9FF">价格说明</td>';
					returnString += '<td width="80" align="center" bgcolor="#EEF9FF">价格(成人)</td>';
					returnString += '<td width="80" align="center" bgcolor="#EEF9FF">价格(小童)</td>';
					returnString += '<td width="60" bgcolor="#EEF9FF">&nbsp;</td>';
					returnString += '</tr>';
					
					for( var index=0; index<LineRoomObj["roomObjArrayString"].length; index++ )
					{
						var tempObj = LineRoomObj["roomObjArrayString"][index];
						returnString += '<tr class="tlinehoteltd">';
						returnString += '<td height="36" class="tlinehoteltdicon">';
						returnString += '<b>' + tempObj["room_name"] + '</b>';;
						returnString += '<p>' + tempObj["price_show_type_desc"] + '</p>';
						returnString += '</td>';
						returnString += '<td><font color="#0466EC">' + tempObj["breakfast_name"] + '</font></td>';
						returnString += '<td>' + tempObj["room_desc"] + '</td>';
						returnString += '<td align="center"><font color="#FF6600">' + tempObj["adult_price"] + '</font></td>';
						returnString += '<td align="center"><font color="#FF6600">' + tempObj["kid_price"] + '</font></td>';
						returnString += '<td align="center"><a href="' + lineUrl + '" target="_blank" ><img src="/img/hotelbt.gif" width="58" height="20"></a></td>';
						returnString += '</tr>';
					}
					returnString += '</table>';			
					break;
			}
			returnString += '</div>';
			returnString += '</div>';
			returnString += '</div>';
	
		return returnString;
	},
	ClearRoomStartDate : function( lineIdString )
	{
		bRich = 1;
		SetExpireDate( this.LineDataObjArray[ lineIdString ][ "expire_time" ] );
		var StartDateArray = this.LineDataObjArray[ lineIdString ][ "StartDateObjArray" ];
		for( var i=0; i<StartDateArray.length; i++)
		{
			PushGroup(StartDateArray[i][0],"","",1);
		}
		dateSelectAction = function(value,obj)
		{	
			var tempLoading = "<div align='center' style='margin:20px auto'><img src='/img/blueloading.gif'></div>";
			lineListThemeObj.resetContent( lineIdString,3 );
			lineListThemeObj.showContent( lineIdString, tempLoading );
			lineListThemeObj.RoomPriceTableInit( "LineRoomPrice" + lineIdString );
			
			//获取数据内容
			var getProductUrl = lineListThemeObj.getUrlLeft + 
					"/ajxa/AjxaLineListThemeContent.php?" +
					"product_id=" + lineIdString + 
					"&type=3" +
					"&fuc=lineListThemeObj.returnFucForAjxaDescription" +
					"&start_date=" + value +
					"&rnd=" + new Date();
			lineListThemeObj.httpAjxaSend(getProductUrl);
			return;			
		}
		return;
	},
	RoomPriceTableInit : function(ObjId)
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
		
	
	
};


/*
	获取改天日期是什么节日类
	_getDateNameObj = new getDateNameObj();
	var t = _getDateNameObj.getDateName( new Date(2011,3,5) );
	if(t!="") alert(t);
*/

getDateNameObj = function()
{
	this.showAllFlag = true;
	
	//特殊国历节日 *表示放假日
	this.tHoliday = new Array(
	);

	//国历节日 *表示放假日
	this.sHoliday = new Array(
		"0101*元旦",
		"0214 情人节",
		"0308 妇女节",
		"0312 植树节",
		"0315 315",		
		"0401 愚人节",		
		"0501 劳动节",
		"0504 青年节",		
		"0512 护士节",
		"0531 无烟日",
		"0601 儿童节",
		"0701 建党节",
		"0801 建军节",	
		"0910 教师节",
		"0920 爱牙日",
		"1001*国庆节",
		"1024 霜降",
		"1224 平安夜",
		"1225 圣诞节",
		"1101 万圣节",
		"1108 记者节",
		"1111 神棍节"
	);

	//农历节日 *表示放假日
	this.lHoliday = new Array(
		"0100*除夕",
		"0101*春节",
		"0115 元宵节",
		"0202 中和节",
		"0505 端午节",
		"0707 七夕情人节",
		"0909 重阳节",
		"0715 中元节",
		"0815 中秋节",
		"1208 腊八节",
		"1224 小年"
	);

	this.solarTerm = new Array(
		" 小寒",
		" 大寒",
		" 立春",
		" 雨水",
		" 惊蛰",
		" 春分",
		"*清明节",
		" 谷雨",
		" 立夏",
		" 小满",
		" 芒种",
		" 夏至",
		" 小暑",
		" 大暑",
		" 立秋",
		" 处暑",
		" 白露",
		" 秋分",
		" 寒露",
		" 霜降",
		" 立冬",
		" 小雪",
		" 大雪",
		" 冬至"
	);

	this.sTermInfo = new　Array(0,21208,42467,63836,85337,107014,128867,150921,173149,195551,218072,240693,263343,285989,308563,331033,353350,375494,397447,419210,440795,462224,483532,504758) 

	this.sTerm = function(y,n)
	{ 
		var   offDate   =   new   Date(   (   31556925974.7*(y-1900)   +   this.sTermInfo[n]*60000     )   +   Date.UTC(1900,0,6,2,5)   ) 
		return {m:offDate.getUTCMonth(),d:offDate.getUTCDate()}  
	} 

	/*
	//清明节  春分后的15日
	//父亲节  每年六月的第三个星期天
	//感恩节  每年11月的第四个星期四
	*/
	
	// 传入日期OBJ, 传回农历日期OBJ = new Date();
	this.getDateName = function(objDate)
	{
		var thisYear, thisMonth, thisDay, checkMonth, checkDay, tempCheckObj, returnName;
		
		thisYear = parseInt(objDate.getFullYear(),10);
		thisMonth = parseInt(objDate.getMonth(),10)+1;
		thisDay = parseInt(objDate.getDate(),10);

		//农历信息
		_stateToLunar = new stateToLunar();
		var stateObj = _stateToLunar.Lunar(objDate);
		
		//特殊节日
		returnName = this.checkDayName(this.tHoliday,thisMonth,thisDay);
		if(returnName!="")
		{
			return returnName;	
		}
		
		//国历节日
		returnName = this.checkDayName(this.sHoliday,thisMonth,thisDay);
		if(returnName!="")
		{
			return returnName;	
		}
		
		//农历节日
		returnName = this.checkDayName(this.lHoliday,parseInt(stateObj.month,10),parseInt(stateObj.day,10));
		if(returnName!="")
		{
			return returnName;	
		}

		
		//节气
		var solarTerm = new Array();
		for( var i in this.solarTerm)
		{
			var obj = this.sTerm(thisYear,i);
			var m = (obj.m + 1), d = obj.d;
			if(m<10) m = "0"+m;
			if(d<10) d = "0"+d;
			solarTerm[i] = m + d + this.solarTerm[i];
		}
		
		returnName = this.checkDayName(solarTerm,thisMonth,thisDay);
		if(returnName!="")
		{
			return returnName;	
		}				

		return "";
	}
	
	this.checkDayName = function(ArrayObj, month, day)
	{
		for( var i in ArrayObj)
		{
			checkMonth = parseInt(ArrayObj[i].substr(0,2),10);
			checkDay = parseInt(ArrayObj[i].substr(2,2),10);
			if( checkMonth == parseInt(month,10) && checkDay==parseInt(day,10) )
			{
				if( this.showAllFlag || ArrayObj[i].substr(4,1)=="*")
				{
					return ArrayObj[i].substr(5);
				}
			}
		}
		return "";
	}
	
}




/*
	日历换成农历的类
*/
stateToLunar = function()
{
	// 日期资料
	this.lunarInfo = new Array (
		0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,
		0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,
		0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,
		0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,
		0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,
		0x06ca0,0x0b550,0x15355,0x04da0,0x0a5d0,0x14573,0x052d0,0x0a9a8,0x0e950,0x06aa0,
		0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,
		0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b5a0,0x195a6,
		0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,
		0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,
		0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,
		0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,
		0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,
		0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,
		0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0
	);
	this.solarMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
}

// 传回农历 y年的总天数
stateToLunar.prototype.lYearDays = function(y) 
{
	var i, sum = 348;
	for (i = 0x8000; i > 0x8; i >>= 1) 
		sum += (this.lunarInfo[y - 1900] & i)? 1: 0;
	return (sum + this.leapDays(y));
}

// 传回农历 y年闰月的天数
stateToLunar.prototype.leapDays = function(y) 
{
	if(this.leapMonth(y)) 
 		return ((this.lunarInfo[y - 1900] & 0x10000)? 30: 29);
	else 
		return (0);
}

// 传回农历 y年闰哪个月 1-12 , 没闰传回 0
stateToLunar.prototype.leapMonth = function(y) 
{
	return (this.lunarInfo[y - 1900] & 0xf);
}

// 传回农历 y年m月的总天数
stateToLunar.prototype.monthDays = function(y, m) 
{
	return ((this.lunarInfo[y - 1900] & (0x10000 >> m))? 30: 29 );
}

// 传回国历 y年某m+1月的天数
stateToLunar.prototype.solarDays = function(y, m) 
{
	if (m == 1)
		return (((y % 4 == 0) && (y % 100 != 0) || (y % 400 == 0))? 29: 28);
	else
		return (this.solarMonth[m]);
}


// 算出农历, 传入日期OBJ, 传回农历日期OBJ = new Date();
// 该农历日期OBJ属性有 .year .month .day .isLeap
stateToLunar.prototype.Lunar = function (objDate) 
{
	var i, leap=0, temp=0;
	var baseDate = new Date(1900, 0, 31);
	var offset = (objDate - baseDate) / 86400000;
	 
	var dayCyl = offset + 40;
	var monCyl = 14;
 
	for (i = 1900; i < 2050 && offset > 0; i++) 
	{
		temp = this.lYearDays(i);
		offset -= temp;
		monCyl += 12;
	}

	if (offset < 0) 
	{
		offset += temp;
		i--;
		monCyl -= 12;
	}

	var year = i;
	var yearCyl = i-1864;
 
	leap = this.leapMonth(i); //闰哪个月
	var isLeap = false;

	for (i = 1; i < 13 && offset > 0; i++) 
	{
  		//闰月
		if (leap > 0 && i == (leap + 1) && isLeap == false) 
		{ 
   			--i; 
   			isLeap = true; 
   			temp = this.leapDays(year); 
  		} else { 
   			temp = this.monthDays(year, i); 
  		}
  		//解除闰月
  		if (isLeap == true && i == (leap + 1)) 
			isLeap = false;
  
  		offset -= temp;
		
 		if (isLeap == false) 
		 	monCyl ++;
 	}

 	if (offset == 0 && leap > 0 && i == leap + 1) 
	{
  		if (isLeap) 
		{ 
   			isLeap = false; 
  		} else { 
   			isLeap = true; 
   			--i; 
   			--monCyl;
  		}
 	}
 
 	if (offset < 0) 
	{ 
  		offset += temp; 
  		--i; 
  		--monCyl; 
 	}
 
 	month = i;
 	day = offset + 1;
	
	return {
		"year" : year,			//农历年
		"month" : month,		//农历月
		"day" : day,			//农历日
		"isLeap" : isLeap		//农历是否闰月
	};
}