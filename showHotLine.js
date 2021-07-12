showHotLine = function(DivId){
	var DivObj = document.getElementById(DivId);
	if(!DivObj) return;
    var tempObjArray = document.getElementsByTagName("LI");
	if(tempObjArray.length==0) return;

	var contentArray = [];
	var flagIndex = 0;
	for(var index = 0; index<tempObjArray.length; index++){
    	var tempObjA = tempObjArray[index].getElementsByTagName("A");
    	var tempObjImg = tempObjArray[index].getElementsByTagName("IMG");
    	var tempObjB = tempObjArray[index].getElementsByTagName("B");
    	var tempObjEm = tempObjArray[index].getElementsByTagName("EM");
    	var tempObjSpan = tempObjArray[index].getElementsByTagName("SPAN");
    	var tempObjDiv = tempObjArray[index].getElementsByTagName("DIV");
		
		if( tempObjA.length==0 || tempObjImg.length==0 || tempObjB.length==0 || tempObjSpan.length==0 || tempObjDiv.length==0 || tempObjEm.length==0 ){
			continue;	
		}
		contentArray[flagIndex] = {};
		contentArray[flagIndex]["href"] = tempObjA[0].href;
		contentArray[flagIndex]["src"] = tempObjImg[0].src;
		contentArray[flagIndex]["title"] = tempObjB[0].innerHTML.replace(/span/ig,"strong");
		contentArray[flagIndex]["altTitle"] = tempObjA[0].title;
		contentArray[flagIndex]["price"] = tempObjEm[0].innerHTML;
		if(tempObjSpan.length>=2){
			contentArray[flagIndex]["startDate"] = tempObjSpan[1].innerHTML;
		}else{
			contentArray[flagIndex]["startDate"] = tempObjSpan[0].innerHTML;
		}
		contentArray[flagIndex]["detail"] = tempObjDiv[0].innerHTML;
		flagIndex++;
	}
		
	var whereShow = Math.floor(Math.random() * contentArray.length);    	
	if( whereShow >= contentArray.length ){
		whereShow = 0;
	}
	

	var writeContent = "";
		writeContent += '<div id="mtopl">';
		writeContent += '<div class="mtophot"></div>';
		writeContent += '<a href="'+contentArray[whereShow]["href"]+'" title="'+contentArray[whereShow]["altTitle"]+'" >';
		writeContent += '<img src="'+contentArray[whereShow]["src"]+'" width="130" height="80" />';
		writeContent += '</a>';
		writeContent += '</div>';
		writeContent += '<div id="mtopc">';
		writeContent += '<h3>';
		writeContent += '<a href="'+contentArray[whereShow]["href"]+'" title="'+contentArray[whereShow]["altTitle"]+'" >';
		writeContent += contentArray[whereShow]["title"];
  		writeContent += '</a>';
		writeContent += '</h3>';
		writeContent += '<em>';
		writeContent += contentArray[whereShow]["startDate"];
		writeContent += '</em>   ';
		writeContent += '<span>';
		writeContent += '¥'+contentArray[whereShow]["price"]+'起';
		writeContent += '</span><br />';
		writeContent += contentArray[whereShow]["detail"];
		writeContent += '</div>';
	document.write(writeContent);
	return;
}
