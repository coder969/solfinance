function gotoLine() {
    var lineid = $("#lineid").val();
    lineid = lineid == "请输入线路编号" ? "" : lineid;
    if (lineid == "") {
        alert("请输入线路编号");
        $("#lineid").focus();
        return false;
    }
    var url = "/line/" + lineid + ".html";
    location.href = url;
}
/*验证提问*/
function ValidQuestion() {
    var username = $("#username").val();
    if (username == "") {
        alert("请填写您的姓名");
        document.getElementById("username").focus();
        return false;
    }
    var email = document.getElementById("email").value;
    if (email == "") {
        alert("请填写邮箱地址");
        document.getElementById("email").focus();
        return false;
    }
    var qcontent = document.getElementById("qcontent").value;
    if (qcontent == "") {
        alert("请填写您的问题内容");
        document.getElementById("qcontent").focus();
        return false;
    }
    var code = $("#code").val();       
    if (code == "") {
        alert("请输入验证码");
        $("#code").focus();
        return false;
    }
    else
    {
        var r = Math.random();
        var url = "/member/ValidCode?code=" + code + "&r=" + r + "";
        $.ajax({
            type: "GET",
            url: url,
            timeout: 30000,
            success: function (msg) {
                if (msg == "false") {
                    alert("验证码不正确，请重新输入");
                    $("#code").focus();
                }
                else {
                    $("#formAsk").submit();
                }
            }
        }
    )
    }            
}
function getObj(id)
{
	return document.getElementById( id );
}
/* 去前后空格 */
function Trim(str)
{ 
	return str.replace(/(^\s*)|(\s*$)/g,""); 
}

/* 手机校验 */
function egrMobileCheck(in_mobile){
	var reg=new RegExp(/^[0]?1\d{10}$/ig);
	if(!reg.test(in_mobile)){
		return false;
	}
	return true;
}

/* 邮件校验 */
function checkMail(in_email){
	reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if(!(reg.test(in_email))){
		return false;
	}
	return true;
}

/* 电话号码区号校验 */
function checkTel(in_tel){
	reg = /^(\d){3,4}-([0-9]{6,12})+$/;
	if(!(reg.test(in_tel))){
		return false;
	}
	return true;
}

/* 电话号码校验 */
function checkPhone(in_tel){
	reg = /^[\d|-]+$/;
	if(!(reg.test(in_tel))){
		return false;
	}
	return true;
}

/* 线路区域拼音url校验 */
function checkUrlWord(word){
	reg = /^([a-zA-Z\d])*$/ig;
	if(!(reg.test(word))){
		return false;
	}
	return true;
}

function check_number(objvalue){
	patten = /^\d+$/;
	return patten.test(objvalue);   
}



function getRadioValueByName(radioname)
{
	var readioValue = 0;
	var radioArray = document.getElementsByName(radioname);
	for(var i=0;i< radioArray.length;i++){
		if( radioArray[i].checked==true){
			readioValue = radioArray[i].value;
			break;
		}
	}
	return readioValue;
}

function setRadioValueByName(radioname,newValue)
{

	var radioArray = document.getElementsByName(radioname);
	for(var i=0;i< radioArray.length;i++){
		if( radioArray[i].value==newValue){
			radioArray[i].checked = true;
		}else{
			radioArray[i].checked = false;
		}
	}
	return;
}



var tempObj;
function fEvent(sType,oInput){
	switch (sType){
		case "focus" :
			oInput.isfocus = true;
		case "mouseover" :
			oInput.style.borderColor = '#9ecc00';
			break;
		case "select":
			oInput.select();
			oInput.isfocus = true;
			break;
		case "blur" :
			oInput.isfocus = false;
		case "mouseout" :
			if(!oInput.isfocus){
				oInput.style.borderColor='#C2C2C2';
			}
		break;
	}
}


function SetAllInput(){
	var temp,tempValue=null;
    tempObj = document.getElementsByTagName("INPUT");
	for(var i=0; i<tempObj.length; i++){
		if(tempObj[i].type=="text"){
			if(tempObj[i].onfocus == null){	
				tempValue = tempObj[i].value;
				tempObj[i].onfocus = new Function("fEvent('focus',tempObj["+i+"])");
			}
				
			if(tempObj[i].onblur == null)
				tempObj[i].onblur = new Function("fEvent('blur',tempObj["+i+"])");				

			if(tempObj[i].onmouseover == null)
				tempObj[i].onmouseover = new Function("fEvent('mouseover',tempObj["+i+"])");
				
			if(tempObj[i].onmouseout == null)
				tempObj[i].onmouseout = new Function("fEvent('mouseout',tempObj["+i+"])");
				
			if(tempObj[i].onclick == null)
				tempObj[i].onclick = new Function("tempObj["+i+"].select();");
			
			if(tempObj[i].onchange == null){
				if(tempValue != null)
					tempObj[i].onchange = new Function("if(tempObj["+i+"].value!='"+tempValue+"') {tempObj["+i+"].style.color='#333333';}else{tempObj["+i+"].style.color='#666666';}");		
			}				
		} 
	}
}

function SetUserInput(){
	var temp,tempValue=null;
    tempObj = document.getElementsByTagName("INPUT");
	for(var i=0; i<tempObj.length; i++){
		if(tempObj[i].type=="text"){
			if(tempObj[i].onfocus == null){	
				tempValue = tempObj[i].value;
				tempObj[i].onfocus = new Function("fEvent('focus',tempObj["+i+"])");
			}
				
			if(tempObj[i].onblur == null)
				tempObj[i].onblur = new Function("fEvent('blur',tempObj["+i+"])");				

				
			if(tempObj[i].onmouseover == null)
				tempObj[i].onmouseover = new Function("fEvent('mouseover',tempObj["+i+"])");
			if(tempObj[i].onmouseout == null)
				tempObj[i].onmouseout = new Function("fEvent('mouseout',tempObj["+i+"])");
			if(tempObj[i].onclick == null)
				tempObj[i].onclick = new Function("tempObj["+i+"].focus();");
			
			if(tempObj[i].onchange == null){
				if(tempValue != null)
					tempObj[i].onchange = new Function("if(tempObj["+i+"].value!='"+tempValue+"') {tempObj["+i+"].style.color='#333333';}else{tempObj["+i+"].style.color='#666666';}");		
			}
		} 
	}
}
var AreasOfCategory = [
[  "01", "出境旅游", "/abroad/", "0", "11", "", "0"]
, [  "02", "国内旅游", "/domestic/", "0", "11", "guoneilvyou1", "0"]
, [  "03", "周边旅游", "/around/", "0", "11", "zhoubianlvyou", "0"]
];
var AreasOfAbroad = [
[  "0111", "东南亚", "/abroad/SEAsia.html", "0", "11", "SEAsia", "0"]
, [  "0114", "海岛", "/abroad/SeaIsland.html", "0", "11", "SeaIsland", "0"]
, [  "0102", "日韩", "/abroad/SNAsia.html", "0", "11", "SNAsia", "0"]
, [  "0106", "南亚", "/abroad/SAsia.html", "1", "11", "SAsia", "0"]
, [  "0103", "澳新", "/abroad/AusNew.html", "0", "11", "AusNew", "0"]
, [  "0113", "欧洲", "/abroad/Europe.html", "0", "11", "Europe", "0"]
, [  "0105", "中东非洲", "/abroad/MAsiaAfrica.html", "1", "11", "MAsiaAfrica", "0"]
, [  "0107", "美洲", "/abroad/America.html", "0", "11", "America", "0"]
, [  "0101", "特价港澳游", "/abroad/HKMacauS.html", "1", "10", "HKMacauS", "0"]
, [  "0108", "港澳游", "/abroad/HKMacau.html", "0", "11", "HKMacau", "0"]
];
var AreasOfAbroadList = [
[  "011102", "新加坡", "/abroad/Singapore.html", "0", "11", "Singapore", "0"]
, [  "011107", "沙巴", "/abroad/shaba.html", "0", "11", "shaba", "0"]
, [  "011101", "泰国", "/abroad/Thailand.html", "0", "11", "Thailand", "0"]
, [  "011103", "马来西亚", "/abroad/Malaysia.html", "0", "11", "Malaysia", "0"]
, [  "011106", "柬埔寨", "/abroad/Cambodia.html", "0", "11", "Cambodia", "0"]
, [  "011105", "越南", "/abroad/Vietnam.html", "0", "11", "Vietnam", "0"]
, [  "011104", "菲律宾", "/abroad/philippine.html", "1", "11", "philippine", "0"]
, [  "011401", "马尔代夫", "/abroad/Maldives.html", "0", "11", "Maldives", "0"]
, [  "011402", "巴厘岛", "/abroad/Bali.html", "0", "11", "Bali", "0"]
, [  "011404", "普吉岛", "/abroad/Phuket.html", "0", "11", "Phuket", "0"]
, [  "011403", "毛里求斯", "/abroad/Mauritius.html", "0", "11", "Mauritius", "0"]
, [  "011405", "苏梅岛", "/abroad/sumeidao.html", "0", "11", "sumeidao", "0"]
, [  "010201", "日本", "/abroad/Japan.html", "0", "11", "Japan", "0"]
, [  "010202", "韩国", "/abroad/Korea.html", "0", "11", "Korea", "0"]
, [  "010203", "韩国自由行", "/abroad/line-list-010203.html", "1", "11", "", "0"]
, [  "010607", "印度", "/abroad/India.html", "1", "11", "India", "0"]
, [  "010601", "尼泊尔", "/abroad/Nepal.html", "1", "11", "Nepal", "0"]
, [  "010602", "缅甸", "/abroad/Myanmar.html", "1", "11", "Myanmar", "0"]
, [  "010301", "澳大利亚", "/abroad/Australia.html", "0", "11", "Australia", "0"]
, [  "010303", "澳洲新西兰", "/abroad/Aus.html", "1", "11", "Aus", "0"]
, [  "010302", "新西兰", "/abroad/NewZealand.html", "0", "11", "NewZealand", "0"]
, [  "010304", "澳洲自由行", "/abroad/line-list-010304.html", "1", "10", "", "0"]
, [  "010305", "南太群岛", "/abroad/line-list-010305.html", "1", "10", "", "0"]
, [  "010306", "南太群岛自由行", "/abroad/line-list-010306.html", "1", "10", "", "0"]
, [  "011301", "法国", "/abroad/France.html", "0", "11", "France", "0"]
, [  "011302", "意大利", "/abroad/Italy.html", "0", "11", "Italy", "0"]
, [  "011303", "瑞士", "/abroad/Switzerland.html", "0", "11", "Switzerland", "0"]
, [  "011304", "英国", "/abroad/England.html", "0", "11", "England", "0"]
, [  "011305", "欧洲深度", "/abroad/EuropeI.html", "0", "11", "EuropeI", "0"]
, [  "011306", "欧洲多国", "/abroad/EuropeII.html", "0", "11", "EuropeII", "0"]
, [  "011307", "大溪地", "/abroad/tahiti.html", "0", "11", "tahiti", "0"]
, [  "010503", "迪拜", "/abroad/Dubai.html", "1", "11", "Dubai", "0"]
, [  "010504", "南非", "/abroad/SouthAfrican.html", "1", "11", "SouthAfrican", "0"]
, [  "010505", "肯尼亚", "/abroad/Kenya.html", "1", "11", "Kenya", "0"]
, [  "010502", "土耳其", "/abroad/Turkey.html", "1", "11", "Turkey", "0"]
, [  "010501", "埃及", "/abroad/Egypt.html", "1", "11", "Egypt", "0"]
, [  "010506", "以色列", "/abroad/yiselie.html", "1", "11", "yiselie", "0"]
, [  "010701", "美国", "/abroad/USA.html", "0", "11", "USA", "0"]
, [  "010702", "加拿大", "/abroad/Canada.html", "0", "11", "Canada", "0"]
, [  "010703", "南美洲", "/abroad/SAmerica.html", "1", "11", "SAmerica", "0"]
, [  "010704", "夏威夷", "/abroad/Hawaii.html", "0", "11", "Hawaii", "0"]
, [  "010101", "香港特价游", "/abroad/xianggangtejiayou.html", "1", "11", "xianggangtejiayou", "0"]
, [  "010102", "港澳特价游", "/abroad/gangaotejiayou.html", "1", "11", "gangaotejiayou", "0"]
, [  "010103", "香港海洋公园", "/abroad/xiangganghaiyanggongyuanlvyou.html", "1", "11", "xiangganghaiyanggongyuanlvyou", "0"]
, [  "010104", "香港迪士尼乐园", "/abroad/xianggangdishinilvyou.html", "1", "11", "xianggangdishinilvyou", "0"]
, [  "010809", "香港", "/abroad/HongKong.html", "0", "11", "HongKong", "0"]
, [  "010810", "港澳", "/abroad/Macau.html", "0", "11", "Macau", "0"]
, [  "010801", "海洋公园", "/abroad/OceanPark.html", "0", "11", "OceanPark", "0"]
, [  "010802", "迪士尼乐园", "/abroad/Disney.html", "0", "11", "Disney", "0"]
];
var AreaOfDomestic = [
[  "0206", "海南", "/domestic/Hainan.html", "0", "11", "Hainan", "0"]
, [  "0212", "福建", "/domestic/Fujian.html", "0", "11", "Fujian", "0"]
, [  "0208", "广西", "/domestic/Guangxi.html", "0", "11", "Guangxi", "0"]
, [  "0201", "云南", "/domestic/yunnan.html", "0", "11", "yunnan", "0"]
, [  "0204", "华东", "/domestic/Huadong.html", "0", "11", "Huadong", "0"]
, [  "0210", "华北", "/domestic/huabei-beijing.html", "0", "11", "huabei-beijing", "0"]
, [  "0214", "江西", "/domestic/jiangxi.html", "0", "11", "jiangxi", "0"]
, [  "0205", "湖南", "/domestic/hunan.html", "0", "11", "hunan", "0"]
, [  "0216", "西藏", "/domestic/XiZangN.html", "0", "11", "XiZangN", "0"]
, [  "0213", "四川", "/domestic/sichuan.html", "0", "11", "sichuan", "0"]
, [  "0203", "湖北", "/domestic/huazhong-hubei.html", "0", "11", "huazhong-hubei", "0"]
, [  "0209", "陕西 河南", "/domestic/shanxi-henan.html", "0", "11", "shanxi-henan", "0"]
, [  "0211", "西北", "/domestic/xibei.html", "1", "11", "xibei", "0"]
, [  "0215", "山西 内蒙", "/domestic/line-list-0215.html", "1", "11", "", "0"]
, [  "0202", "东北", "/domestic/dongbei.html", "1", "11", "dongbei", "0"]
, [  "0207", "三亚酒店", "/domestic/sanyajiudian.html", "1", "11", "sanyajiudian", "0"]
, [  "0217", "重庆", "/domestic/zhongqing.html", "1", "11", "zhongqing", "0"]
];
var AreaOfDomesticList = [
[  "020604", "三亚", "/domestic/Sanya.html", "0", "11", "Sanya", "0"]
, [  "020601", "三亚自由行", "/domestic/sanyaziyouxing.html", "0", "11", "sanyaziyouxing", "0"]
, [  "021201", "厦门", "/domestic/Xiamen.html", "0", "11", "Xiamen", "0"]
, [  "021202", "武夷山", "/domestic/Wuyishan.html", "0", "11", "Wuyishan", "0"]
, [  "020803", "桂林阳朔", "/domestic/Guilin.html", "0", "11", "Guilin", "0"]
, [  "020801", "巴马", "/domestic/Bama.html", "0", "11", "Bama", "0"]
, [  "020802", "德天瀑布", "/domestic/Detian.html", "0", "11", "Detian", "0"]
, [  "020101", "昆明", "/domestic/kunming.html", "0", "11", "kunming", "0"]
, [  "020102", "丽江", "/domestic/lijiang.html", "0", "11", "lijiang", "0"]
, [  "020103", "香格里拉", "/domestic/xianggelila.html", "0", "11", "xianggelila", "0"]
, [  "020403", "上海苏杭", "/domestic/ShanghaiSuhang.html", "0", "11", "ShanghaiSuhang", "0"]
, [  "020401", "黄山", "/domestic/Huangshan.html", "0", "11", "Huangshan", "0"]
, [  "020404", "浙江", "/domestic/Zhejiang.html", "0", "10", "Zhejiang", "0"]
, [  "021001", "北京", "/domestic/beijing.html", "0", "11", "beijing", "0"]
, [  "021002", "天津", "/domestic/tianjin.html", "0", "11", "tianjin", "0"]
, [  "021401", "婺源", "/domestic/wuyuan.html", "0", "11", "wuyuan", "0"]
, [  "021403", "庐山", "/domestic/lushan.html", "0", "11", "lushan", "0"]
, [  "021402", "井冈山", "/domestic/jinggangshan.html", "0", "11", "jinggangshan", "0"]
, [  "020501", "张家界", "/domestic/zhangjiajie.html", "0", "11", "zhangjiajie", "0"]
, [  "020503", "凤凰", "/domestic/fenghuang.html", "0", "11", "fenghuang", "0"]
, [  "021601", "拉萨", "/domestic/lasa.html", "0", "11", "lasa", "0"]
, [  "021602", "林芝", "/domestic/linzhi.html", "0", "11", "linzhi", "0"]
, [  "021603", "日喀则", "/domestic/rieze.html", "0", "11", "rieze", "0"]
, [  "021301", "成都", "/domestic/chengdu.html", "0", "11", "chengdu", "0"]
, [  "021303", "九寨沟", "/domestic/jiuzhai.html", "0", "11", "jiuzhai", "0"]
, [  "021302", "峨眉山", "/domestic/emeishan.html", "0", "11", "emeishan", "0"]
, [  "020304", "武汉", "/domestic/wuhan.html", "1", "11", "wuhan", "0"]
, [  "020302", "长江三峡", "/domestic/changjiangsanxia.html", "0", "11", "changjiangsanxia", "0"]
, [  "020303", "武当山", "/domestic/wudangshan.html", "0", "11", "wudangshan", "0"]
, [  "020301", "神农架", "/domestic/shennongjia.html", "1", "11", "shennongjia", "0"]
, [  "020901", "西安", "/domestic/xian.html", "0", "11", "xian", "0"]
, [  "020902", "洛阳", "/domestic/luoyang.html", "0", "11", "luoyang", "0"]
, [  "021103", "宁夏", "/domestic/ningxia.html", "1", "11", "ningxia", "0"]
, [  "021101", "新疆", "/domestic/xinjiang.html", "1", "11", "xinjiang", "0"]
, [  "021102", "甘肃", "/domestic/line-list-021102.html", "1", "11", "", "0"]
, [  "021104", "青海", "/domestic/line-list-021104.html", "1", "11", "", "0"]
, [  "021501", "太原", "/domestic/taiyuan.html", "1", "11", "taiyuan", "0"]
, [  "021502", "呼伦贝尔", "/domestic/hulunbeier.html", "1", "11", "hulunbeier", "0"]
, [  "020203", "哈尔滨", "/domestic/harbin.html", "1", "11", "harbin", "0"]
, [  "021701", "长江三峡", "/domestic/changjiangsanxia1.html", "1", "11", "changjiangsanxia1", "0"]
, [  "021702", "仙女山", "/domestic/xiannvshan.html", "1", "11", "xiannvshan", "0"]
, [  "021703", "大足石刻", "/domestic/dazushike.html", "1", "11", "dazushike", "0"]
];
var AreaNearShenzhen = [
[  "0305", "清远", "/around/QingYuan1.html", "0", "11", "QingYuan1", "0"]
, [  "0309", "惠州", "/around/Huizhou.html", "0", "11", "Huizhou", "0"]
, [  "0312", "江门阳江", "/around/jiangmen1.html", "0", "11", "jiangmen1", "0"]
, [  "0304", "深圳", "/around/Shenzhen.html", "0", "11", "Shenzhen", "0"]
, [  "0306", "广州", "/around/guangzhou.html", "0", "11", "guangzhou", "0"]
, [  "0310", "肇庆", "/around/zhaoqing1.html", "0", "11", "zhaoqing1", "0"]
, [  "0307", "韶关", "/around/shaoguan1.html", "0", "11", "shaoguan1", "0"]
, [  "0308", "河源", "/around/heyuan1.html", "0", "11", "heyuan1", "0"]
, [  "0311", "阳江", "/around/Yangjiang1.html", "1", "11", "Yangjiang1", "0"]
, [  "0301", "佛山", "/around/foshan.html", "1", "11", "foshan", "0"]
, [  "0313", "珠海", "/around/Zhuhai1.html", "0", "11", "Zhuhai1", "0"]
];
var AreaNearShenzhenList = [
[  "030503", "森波拉", "/around/senbola.html", "0", "11", "senbola", "0"]
, [  "030504", "聚龙湾", "/around/julongwan.html", "0", "11", "julongwan", "0"]
, [  "030501", "清远漂流", "/around/QingYuan.html", "0", "11", "QingYuan", "0"]
, [  "030502", "连州英德", "/around/lianzhouyingde.html", "0", "11", "lianzhouyingde", "0"]
, [  "030505", "奇洞温泉", "/around/xinyinzhan.html", "0", "11", "xinyinzhan", "0"]
, [  "030506", "新银盏温泉", "/around/xinyinzhang.html", "0", "01", "xinyinzhang", "0"]
, [  "030901", "巽寮湾", "/around/xunliaowan.html", "0", "11", "xunliaowan", "0"]
, [  "030909", "惠州温泉", "/around/huizhouwenquan.html", "0", "11", "huizhouwenquan", "0"]
, [  "030910", "三角洲岛", "/around/sanjiaozhoudao.html", "1", "10", "sanjiaozhoudao", "0"]
, [  "030906", "南昆山", "/around/nankunshan.html", "0", "11", "nankunshan", "0"]
, [  "030908", "惠州漂流", "/around/huizhoupiaoliu.html", "1", "11", "huizhoupiaoliu", "0"]
, [  "030902", "温泉大观园", "/around/daguanyuan.html", "1", "11", "daguanyuan", "0"]
, [  "030903", "海滨温泉", "/around/haibinwenquan.html", "1", "11", "haibinwenquan", "0"]
, [  "030904", "龙门铁泉", "/around/longmentiequan.html", "1", "11", "longmentiequan", "0"]
, [  "030905", "天然温泉", "/around/tianranwenquan.html", "1", "11", "tianranwenquan", "0"]
, [  "030907", "龙门温泉", "/around/longmen.html", "1", "11", "longmen", "0"]
, [  "031207", "海陵岛闸坡", "/around/shabazhapo1.html", "0", "11", "shabazhapo1", "0"]
, [  "031201", "阳西沙扒湾", "/around/hailingdao.html", "0", "11", "hailingdao", "0"]
, [  "031212", "江门温泉", "/around/jiangmenwq.html", "0", "11", "jiangmenwq", "0"]
, [  "031205", "上下川岛", "/around/taishanshangchuandao.html", "0", "11", "taishanshangchuandao", "0"]
, [  "031208", "江门漂流", "/around/jiangmenpiaoliu.html", "0", "11", "jiangmenpiaoliu", "0"]
, [  "031202", "古兜温泉", "/around/gudouwenquan.html", "1", "11", "gudouwenquan", "0"]
, [  "031203", "锦江温泉", "/around/jinjiangwenquan.html", "1", "11", "jinjiangwenquan", "0"]
, [  "031204", "富都温泉", "/around/fuduwenquan.html", "1", "11", "fuduwenquan", "0"]
, [  "031206", "山泉湾温泉", "/around/shanquanwanwenquan.html", "1", "11", "shanquanwanwenquan", "0"]
, [  "030401", "南澳西冲", "/around/nanaoxichong.html", "0", "11", "nanaoxichong", "0"]
, [  "030402", "东部华侨城", "/around/DBHuaqiaocheng.html", "0", "11", "DBHuaqiaocheng", "0"]
, [  "030403", "深圳观光", "/around/shenguanguang.html", "0", "10", "shenguanguang", "0"]
, [  "030601", "长隆度假区", "/around/fanyu.html", "0", "10", "fanyu", "0"]
, [  "030602", "增城从化", "/around/conghua.html", "0", "11", "conghua", "0"]
, [  "030603", "百万葵园", "/around/panyubaiwankuiyuan.html", "1", "11", "panyubaiwankuiyuan", "0"]
, [  "031001", "肇庆", "/around/zhaoqing.html", "0", "11", "zhaoqing", "0"]
, [  "031002", "盘龙峡", "/around/deqing.html", "0", "11", "deqing", "0"]
, [  "030703", "丹霞山", "/around/danxiashan.html", "0", "11", "danxiashan", "0"]
, [  "030701", "丽宫国际", "/around/ligongguoji.html", "0", "11", "ligongguoji", "0"]
, [  "030702", "曹溪温泉", "/around/caoxiwenquan.html", "0", "11", "caoxiwenquan", "0"]
, [  "030801", "河源漂流", "/around/Heyuan.html", "0", "11", "Heyuan", "0"]
, [  "030802", "万绿湖", "/around/wanlvhu.html", "0", "11", "wanlvhu", "0"]
, [  "030803", "梅州", "/around/meizhou.html", "1", "11", "meizhou", "0"]
, [  "030804", "叶园温泉", "/around/yeyuanwenquan.html", "0", "11", "yeyuanwenquan", "0"]
, [  "030805", "龙源温泉", "/around/longyuanwenquan.html", "1", "11", "longyuanwenquan", "0"]
, [  "031301", "珠海", "/around/Zhuhai.html", "0", "11", "Zhuhai", "0"]
, [  "031302", "海泉湾", "/around/haiquanwan.html", "0", "11", "haiquanwan", "0"]
, [  "031303", "御温泉", "/around/yuwenquan.html", "0", "11", "yuwenquan", "0"]
, [  "031304", "珠海海岛游", "/around/zhuhaihaidaoyou.html", "1", "11", "zhuhaihaidaoyou", "0"]
];

function CheckInputSearchForaddform(){//请输入想查询的关键字
	if(Trim(document.addform.keyword.value)=="" || Trim(document.addform.keyword.value)=="请输入关键字" || Trim(document.addform.keyword.value)=="请输入想查询的关键字"){
		alert("请输入想查询的关键字");
		document.addform.keyword.select();
		return false;
	}
	document.addform.submit();
	return false;
}

function CheckInputSearchAddFormFoot(){//请输入想查询的关键字
	if(Trim(document.addformFoot.keyword.value)=="" || Trim(document.addformFoot.keyword.value)=="请输入想查询的关键字"){
		alert("请输入想查询的关键字");
		document.addformFoot.keyword.select();
		return false;
	}
	document.addformFoot.submit();
	return false;
}



function CheckInputSearchForTimeForm(){
	if(Trim(document.complexform.dest.value)=="" || Trim(document.complexform.dest.value)=="中文/拼音"){
		alert("请输入想查询的目的地");
		document.complexform.dest.select();
		return false;
	}
	document.complexform.submit();
	return false;

}

lineListInit = function( className ){
	if(!className){
		className="m4line_border"	
	}
	var tempArrayObj = document.getElementsByTagName("TABLE");
	for( var index=0; index<tempArrayObj.length; index++ ){
		var tempTrArrayObj = tempArrayObj[index].getElementsByTagName("TR");
		for( var i=0; i<tempTrArrayObj.length; i++ ){
			if( tempTrArrayObj[i].className==className ){
				tempTrArrayObj[i].onmouseover = function(){
					var tempTdArrayObj = this.getElementsByTagName("td");
					for( var j=0; j<tempTdArrayObj.length; j++ ){
						tempTdArrayObj[j].style.background="#FFFFE8";
					}
				}
				tempTrArrayObj[i].onmouseout = function(){
					var tempTdArrayObj = this.getElementsByTagName("td");
					for( var j=0; j<tempTdArrayObj.length; j++ ){
						tempTdArrayObj[j].style.background="#ffffff";
					}
				}			
			}
		}
	}
	return;
}

lineListNewInit = function(){
	var tempArrayObj = document.getElementsByTagName("TABLE");
	for( var index=0; index<tempArrayObj.length; index++ ){
		if( tempArrayObj[index].className == "border_blues" ||  tempArrayObj[index].className == "border_oranges" ){
			var tempTrArrayObj = tempArrayObj[index].getElementsByTagName("TR");
			for( var i=0; i<tempTrArrayObj.length; i++ ){
				if(i==0)
					continue;
				tempTrArrayObj[i].onmouseover = function(){
					var tempTdArrayObj = this.getElementsByTagName("td");
					for( var j=0; j<tempTdArrayObj.length; j++ ){
						tempTdArrayObj[j].style.background="#FFFFE8";
					}
				}
				tempTrArrayObj[i].onmouseout = function(){
					var tempTdArrayObj = this.getElementsByTagName("td");
					for( var j=0; j<tempTdArrayObj.length; j++ ){
						tempTdArrayObj[j].style.background="#ffffff";
					}
				}			
			}
		}
	}
	return;
}

function DisplayDate(){
    var now = new Date();//当前时间
	function getThisMonth(){ //这个月日期
	    return now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate();
	}
	function getNextMonth(){ //下个月日期
        var d=new Date(now.getFullYear(),now.getMonth()+1,now.getDate());
		return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
    }
	document.getElementById('dateA').value=getThisMonth();
	document.getElementById('dateB').value=getNextMonth();
}

/*
var newSS=document.createElement('link');
newSS.rel='icon';
newSS.type='image/x-icon';
newSS.href=escape("/images/favicon.ico");
newSS.href=escape("http://www.google.cn/favicon.ico");
document.getElementsByTagName("head")[0].appendChild(newSS);
newSS.rel='shortcut icon';
document.getElementsByTagName("head")[0].appendChild(newSS);
newSS.rel='Bookmark';
document.getElementsByTagName("head")[0].appendChild(newSS);
*/

/* 加入收藏夹 */
function setHome(title, url) {   
    if(!title) {   
        var title = window.document.title;   
    }   
    if(!url) {   
        var url = window.document.location;   
    }   
    try{   
        if (document.all){    
            window.external.addFavorite(url,title);    
        } else if (window.sidebar) {    
            window.sidebar.addPanel(title, url,"");    
        }    
    }catch(e){};   
}


/*
function setHome(title, url) {
	var title="风采旅行社";
	var url= "http://www.landtu.com";
	if (window.sidebar) window.sidebar.addPanel(title, url,"");
	else if( window.opera && window.print ){
		var mbm = document.createElement('a');
		mbm.setAttribute('rel','sidebar');
		mbm.setAttribute('href',url);
		mbm.setAttribute('title',title);
		mbm.click();
	}
	else if( document.all ) window.external.addFavorite(url,title);
} 
*/

var lastScrollY=0; 
function heartBeat(){  
	var diffY; 
	if (document.documentElement && document.documentElement.scrollTop) 
		diffY = document.documentElement.scrollTop; 
	else if (document.body) 
		diffY = document.body.scrollTop 
	else 
		{/*Netscape stuff*/} 
		 
	//alert(diffY); 
	percent=.1*(diffY-lastScrollY);  
	if(percent>0)percent=Math.ceil(percent);  
	else percent=Math.floor(percent);  
	document.getElementById("lovexin12").style.top=parseInt(document.getElementById ("lovexin12").style.top)+percent+"px"; 
	document.getElementById("lovexin14").style.top=parseInt(document.getElementById ("lovexin12").style.top)+percent+"px"; 
	lastScrollY=lastScrollY+percent;  
	//alert(lastScrollY); 
} 

function ShowOnlineQQ(){
	return;
	suspendcode12="<DIV id=\"lovexin12\" style='z-index:999;right:5px;POSITION:absolute;TOP:280px;'><a href=tencent://message/?uin=706287008&Site=风采旅行社&Menu=yes target=blank title='点击与风采旅行社客服人员交谈'><img border=0 src=/images/qq.gif ></a></div>" 
	suspendcode14="<DIV id=\"lovexin14\" style='right:5px;POSITION:absolute;TOP:120px;'></div>" 
	document.write(suspendcode12);  
	document.write(suspendcode14);  
	window.setInterval("heartBeat()",1); 
}



var lastScrollY=0; 
function heartBeat(){  
	var diffY; 
	if (document.documentElement && document.documentElement.scrollTop) 
		diffY = document.documentElement.scrollTop; 
	else if (document.body) 
		diffY = document.body.scrollTop 
	else 
		{/*Netscape stuff*/} 
		 
	//alert(diffY); 
	percent=.1*(diffY-lastScrollY);  
	if(percent>0)percent=Math.ceil(percent);  
	else percent=Math.floor(percent);  
	document.getElementById("lovexin12").style.top=parseInt(document.getElementById ("lovexin12").style.top)+percent+"px"; 
	document.getElementById("lovexin14").style.top=parseInt(document.getElementById ("lovexin12").style.top)+percent+"px"; 
	lastScrollY=lastScrollY+percent;  
	//alert(lastScrollY); 
} 


function ShowLineTop(){
	suspendcode12="<DIV id=\"lovexin12\" style='z-index:999;right:5px;POSITION:absolute;TOP:280px;'><a href=tencent://message/?uin=706287008&Site=风采旅行社&Menu=yes target=blank title='点击与风采旅行社客服人员交谈'><img border=0 src=/images/qq.gif ></a></div>" 
	suspendcode14="<DIV id=\"lovexin14\" style='right:5px;POSITION:absolute;TOP:120px;'></div>" 
	document.write(suspendcode12);  
	document.write(suspendcode14);  
	window.setInterval("heartBeat()",1); 
}



var visa = -1;
var abroad = 1;
var around = 3;
var domestic = 2;
var vacation = 6;
var hongkong = 4;
var vacation = 5;
var company = 6;
var hotel = 8;
var menpiao = 8;
var destination = 9;
var travelnote = 10;

function ShowNewDestLeft()
{
	if(getObj('destination_nav')){
		var TempObjArray = getObj('destination_nav').getElementsByTagName("LI");
		var LocationHref = window.location.href.split("/");
		
		
		
		var foundFlag = false;
		for( var index = 0; index < TempObjArray.length; index++){
			var TempObj = TempObjArray[index];
			var TempLinkObj = TempObj.getElementsByTagName("A")[0];
			var linkHref = TempLinkObj.href.split("/");
			
			
			switch(linkHref[linkHref.length-1]){
				case "jianjie":
				case "jingdian":
				case "gonglue":
				case "news":
				case "guide":
					if(LocationHref[4]){
						var hrefWords = LocationHref[4].split("#");
				
						if( hrefWords[0] == linkHref[linkHref.length-1]){
							TempObj.className = "currt";
							foundFlag = true;
						}
					}
					break;
			}
			
		}
		
		if(!foundFlag){
			TempObjArray[0].className = "currt";
		}
		
	}	
	return;
}

function ShowNewDestLeft_B()
{
	if(getObj('destination_nav')){
		var TempObjArray = getObj('destination_nav').getElementsByTagName("LI");
		var LocationHref = window.location.href.split("/");
		var locationNames = LocationHref[4].split(".");
	
		var foundFlag = false;
		for( var index = 0; index < TempObjArray.length; index++){
			var TempObj = TempObjArray[index];
			var TempLinkObj = TempObj.getElementsByTagName("A")[0];
			var linkHref = TempLinkObj.href.split("/");
			var pageNames = linkHref[4].split(".");

			switch(pageNames[0]){
				case "DestinationNote":
					var lastWordA = LocationHref[4].substring(LocationHref[4].length-1,LocationHref[4].length);
					var lastWordB = linkHref[4].substring(linkHref[4].length-1,linkHref[4].length);
					if( pageNames[0] == locationNames[0] && lastWordA==lastWordB){
				
						TempObj.className = "currt";
						foundFlag = true;
					}
					break;
				case "DestinationPage":
				case "DestinationMap":
				case "DestinationShow":
					if( pageNames[0] == locationNames[0]){
					
						TempObj.className = "currt";
						foundFlag = true;
					}
					break;
			}
			
		}
		
		if(!foundFlag){
			TempObjArray[0].className = "currt";
		}
		
	}	
	return;
}

changeCity = function(cityCode){
	if(!getObj("line-list")){
		var obj=getObj("line-lists");
		valA=1; valB=2; claN='selected-tabs';
	}
	else{
		var obj=getObj("line-list");
		valA=0; valB=1; claN='selected-tab';
	}
	
	var liObjArray = obj.getElementsByTagName("li");
	
	try{
		switch(cityCode){
			case "sz":
				getObj("szLines").style.display = "";
				getObj("gzLines").style.display = "none";
				liObjArray[valA].className = claN;
				liObjArray[valB].className = "";
				break;
			case "gz":
				getObj("szLines").style.display = "none";
				getObj("gzLines").style.display = "";
				liObjArray[valA].className = "";
				liObjArray[valB].className = claN;
				break;
		
		}
	}catch(e){}
  	return;
}

/*
	使用的ajxa方法统一， 可重复使用
		_url  传递的url地址
		_method 使用方法 post or get 暂时支持 get
		_send 发送的内容 如 a=1&b=2 urlencode
		returnfuc 完成后调用的方法， 一个参数 返回的字符串
	
*/

function axajObj(){
	this.xmlHttpObj = null;
	this.returnFuc = function(val){};
}

axjaReturnFuc = function(value){}
axajSend = function( _url, _method, _send, returnFuc ){
	if(!returnFuc)
		returnFuc = axjaReturnFuc;
	var xmlHttpObj;
    if(window.ActiveXObject){
        xmlHttpObj = new ActiveXObject("Microsoft.XMLHTTP");
    }else if(window.XMLHttpRequest){
        xmlHttpObj = new XMLHttpRequest();
    }
    try{
        xmlHttpObj.onreadystatechange = function(){
			if(xmlHttpObj.readyState == 4)
			{            
				if (xmlHttpObj.status == 200 )
				{
					returnFuc( xmlHttpObj.responseText );
				}
			}	
		};
       	xmlHttpObj.open(_method, _url, true);
		xmlHttpObj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');		
       	xmlHttpObj.send(_send);
    }catch(exception){
        alert("xmlHttp Fail");
    }
	return;	
}


function HtmlInitFuc(fuc){
	if(window.document.all){
		window.attachEvent("onload" ,
			function(e){
				fuc();
			}
		);
	}else{
		window.addEventListener("load",
			function(e){
				fuc();
			},
			false
		);
	}	
	return;
}
/* about nav */
var aboutNavWhere = -1;
function ShowAboutNav()
{
	var aboutNavId = 'about_nav';
	if( aboutNavWhere=="-1" ) 
		return; 
		
	if( !document.getElementById(aboutNavId) ) 
		return; 
		
	var a = document.getElementById(aboutNavId).getElementsByTagName("LI");
	if(aboutNavWhere<a.length)
	{
		a[aboutNavWhere].className = "current";
	}
	return;
}



var initObjArray = {};
function InitForm( formName , newClassName ){
	var formObj = getObj(formName);
	if(!formObj)
		return;
		
    var tempObjArray = formObj.getElementsByTagName("INPUT");
	for(var i=0; i<tempObjArray.length; i++){
		if( tempObjArray[i].type=="text" ||tempObjArray[i].type=="password" ){
				
			initObjArray[tempObjArray[i].name] = {
				"oldonfocus" : tempObjArray[i].onfocus,
				"oldonblur" : tempObjArray[i].onblur,
				"oldClassName" : tempObjArray[i].className,
				"newClassName" : newClassName
			}
			if(typeof tempObjArray[i].onfocus != 'function'){
				tempObjArray[i].onfocus = function(){
					this.className = initObjArray[this.name]["newClassName"];	
				};
			}else{
				tempObjArray[i].onfocus = function(){
					this.className = initObjArray[this.name]["newClassName"];
					initObjArray[this.name]["oldonfocus"]();
				}
			}
			
			if(typeof tempObjArray[i].onblur != 'function'){
				tempObjArray[i].onblur = function(){
					this.className = initObjArray[this.name]["oldClassName"];
				};
			}else{
				tempObjArray[i].onblur = function(){
					this.className = initObjArray[this.name]["oldClassName"];
					initObjArray[this.name]["oldonblur"]();
				}
			}
			
		}
	}

	var tempObjArray = formObj.getElementsByTagName("textarea");
	for(var i=0; i<tempObjArray.length; i++){				
		initObjArray[tempObjArray[i].name] = {
			"oldonfocus" : tempObjArray[i].onfocus,
			"oldonblur" : tempObjArray[i].onblur,
			"oldClassName" : tempObjArray[i].className,
			"newClassName" : newClassName
		}
		if(typeof tempObjArray[i].onfocus != 'function'){
			tempObjArray[i].onfocus = function(){
				this.className = initObjArray[this.name]["newClassName"];	
			};
		}else{
			tempObjArray[i].onfocus = function(){
				this.className = initObjArray[this.name]["newClassName"];
				initObjArray[this.name]["oldonfocus"]();
			}
		}
		
		if(typeof tempObjArray[i].onblur != 'function'){
			tempObjArray[i].onblur = function(){
				this.className = initObjArray[this.name]["oldClassName"];
			};
		}else{
			tempObjArray[i].onblur = function(){
				this.className = initObjArray[this.name]["oldClassName"];
				initObjArray[this.name]["oldonblur"]();
			}
		}
	}	
	return;
}
addOnloadFuc = function(fuc){
	if(window.document.all){
		window.attachEvent("onload" ,
			function(e){
				fuc()
			}
		);
	}else{
		window.addEventListener("load",
			function(e){
				fuc()
			},
			false
		);
	}
	return;
}

/*
	使用的ajxa方法统一， 可重复使用
		_url  传递的url地址
		_method 使用方法 post or get 暂时支持 get
		_send 发送的内容 如 a=1&b=2 urlencode
		returnfuc 完成后调用的方法， 一个参数 返回的字符串
*/

ajxaReturnFuc = function(value){}
ajxaSend = function( _url, _method, _send, returnFuc ){
	if(!returnFuc)
		returnFuc = axjaReturnFuc;
		
	var xmlHttpObj;
    if(window.ActiveXObject){
        xmlHttpObj = new ActiveXObject("Microsoft.XMLHTTP");
    }else if(window.XMLHttpRequest){
        xmlHttpObj = new XMLHttpRequest();
    }
    try{
        xmlHttpObj.onreadystatechange = function(){
			if(xmlHttpObj.readyState == 4){            
				if (xmlHttpObj.status == 200 ){
					//alert(xmlHttpObj.responseText)
					returnFuc( xmlHttpObj.responseText );
				}
			}	
		};
		xmlHttpObj.open(_method, _url, true);
		xmlHttpObj.setRequestHeader('Content-type','application/x-www-form-urlencoded');
       	xmlHttpObj.send(_send);
    }catch(exception){
        alert("xmlHttp Fail");
    }
	return;	
}


/* 首页初始化*/
doUserLogin = function(){
	if( getObj("username").value=="" || getObj("username").value=="会员卡号/手机号/邮箱" ){
		alert("请输入您的登陆的帐号;")
		getObj("username").focus();
		return false;
	}
	if( getObj("passwd").value==""){
		alert("请输入您的密码;")
		getObj("passwd").focus();
		return false;
	}
	getObj("formLogin").submit();
	return false;	
};
//js处理select
ClearOption = function(selectId){
	var a = document.getElementById(selectId);
 	a.options.length = 0;
	return;
}

AddOption = function( selectId, Ttext, Tvalue){
	var a = document.getElementById(selectId);
	var oOption = document.createElement("OPTION");   
	oOption.value=Tvalue;   
	oOption.text=Ttext;   
	a.options.add(oOption); 
	return;
}

//email 提示层
var _showEmail = null;
showEmail = function(){
	this.emailArray = [
		"qq.com",
		"sina.com",
		"vip.sina.com",
		"126.com",
		"163.com",
		"hotmail.com",
		"sohu.com",
		"yahoo.com",
		"139.com"
	];
}

showEmail.prototype = new showDivBoxObj();
showEmail.prototype.selectObj = function( obj ){
	try{
		_showEmail.hideDiv();
	}catch(e){}
	_showEmail = this;
	this.selectObj = obj;
	
	this.selectObj.onkeyup = function(event){
		event=event?event:(window.event?window.event:null);
		var kc=event.keyCode;
		if(kc==0)
			return;
		_showEmail.checkInput();
		return;
	}
	
	document.onclick = function(event) {
		var obj;
		event=event?event:(window.event?window.event:null);
		selectObj = event.srcElement ? event.srcElement : event.target;
		if(selectObj!=_showEmail.selectObj){
			_showEmail.hideDiv();
		}
	}
		
	this.checkInput();
	return;
}

showEmail.prototype.checkInput = function(){
	var tempArray = this.selectObj.value.split("@"), j=0, emailArray = [];
	if(tempArray.length>=2 && tempArray[1]!=""){
		for(var i=0; i<this.emailArray.length; i++){
			if( this.emailArray[i].substr(0,tempArray[1].length).toLowerCase() == tempArray[1].toLowerCase() ){
				emailArray[j++] = [
					tempArray[0] + "@" + this.emailArray[i],
					tempArray[0] + "<b>@</b>" + this.emailArray[i].toLowerCase().replace(tempArray[1].toLowerCase(), "<b>"+tempArray[1].toLowerCase()+"</b>" )
				];
			}
		}
	}else{
		for(var i=0; i<this.emailArray.length; i++){
			emailArray[j++] = [
				tempArray[0] + "@" + this.emailArray[i],
				tempArray[0] + "@" + this.emailArray[i]
			];
		}
	}
	if(emailArray.length<1){
		this.hideDiv();
		return;
	}
	
	
	var tempString = "";
	tempString  = '';
	tempString += '<div class="chooseEmailDivObj">';
	tempString += '<ul>';
	for( var i=0; i<emailArray.length; i++){
		tempString += '<li>';
		tempString += '<a href="#" onClick="return _showEmail.returnSetEmail(\''+emailArray[i][0]+'\');">'+emailArray[i][1]+'</a>';
		tempString += '</li>';
	}
	
	tempString += '<li style="text-align:right;">';
	tempString += '<a href="#" onClick="_showEmail.hideDiv(); return false;">关闭</a>';
	tempString += '</li>';
	
	tempString += '</ul>';
	tempString += '</div>';	
	
	this.showDiv(tempString, this.selectObj);
	return;
}

showEmail.prototype.returnSetEmail = function(str){
	if(this.selectObj.value!="")
		this.selectObj.value = str;
		
	this.hideDiv();
	return false;
}

emailShowTip = function(obj){
	var showEmailTemp = new showEmail();
	showEmailTemp.selectObj(obj);
	return;
}

/* 显示层 */
function showDivBoxObj(){
	this.div = null;								//显示层
	this.divClassName = "";						//显示层
	this.selectObj = null;							//目标元素
	
	this.paddingLeft = 0;							//元素显示左边的偏移距离		
	this.paddingTop = 0;							//元素显示头部的偏移距离								
	return;
}
/*控制弹出层的显示*/
showDivBoxObj.prototype.showDiv = function(content, obj){
	if(this.div==null){		
		this.div=document.createElement('DIV');
		this.div.style.display='none';
		this.div.style.position='absolute';
		this.div.className = this.divClassName;
		var bs = document.getElementsByTagName('BODY');
		bs[0].appendChild(this.div);
	}
	

	this.selectObj = obj;
	this.ShowWhere();	
	this.div.innerHTML = content;
	this.div.style.display='';
	return;
}
/*隐藏弹出层*/
showDivBoxObj.prototype.hideDiv = function(){
	if(this.div	== null) 
		return;
	this.div.style.display='none';
	return;
}

showDivBoxObj.prototype.ShowWhere = function(){
	var OBTop=0;
	var OBLeft=0;
	var OBWidth=0;
	var OBHeight=0;
	var oCurrentNode = this.selectObj;
	while(oCurrentNode != null && oCurrentNode.tagName != "BODY"){
		OBTop += oCurrentNode.offsetTop;
		OBLeft += oCurrentNode.offsetLeft;
		oCurrentNode = oCurrentNode.offsetParent;
	}
	OBTop += document.getElementsByTagName('BODY')[0].offsetTop 
	OBLeft += document.getElementsByTagName('BODY')[0].offsetLeft 
    /*top:271px left:230px*/	
	this.div.style.top = (OBTop + 0 +  this.selectObj.offsetHeight *1  + this.paddingTop + "px");
	this.div.style.left = (OBLeft  + 0 + this.paddingLeft + "px");
	
	return;
}
/*首页选择目的地*/
var HKMC = 0;
var showGoWhereObj = new showDivBoxObj();
var ShowGoWhereContent = "";
var showGoWhereHotPlace = [
	 "011401"
	,"020803"
	,"020401"
	,"021201"
	,"010809"
	,"010810"
	,"030501"
	,"030105"
	,"030202"
];
SelectGoWhere = function(obj, cityNum, leftAdd)
{
	if( !leftAdd )
		leftAdd = 0;
	if( isNaN(leftAdd) )
		leftAdd = 0;
			
	if( obj.value=='请选择想去的目的地')
	{
		obj.value ='';
	}
	
	obj.onblur = function()
	{
		if(this.value=='') 
			this.value='请输入想去的目的地';
		return;
	}	   
    var ShowGoWhereContent=document.getElementById("showkeys").innerHTML;    
	showGoWhereObj.paddingLeft = leftAdd;    
	showGoWhereObj.showDiv( ShowGoWhereContent, obj);
	document.onclick = function(event) {
		var obj;
		event=event?event:(window.event?window.event:null);
		selectObj = event.srcElement ? event.srcElement : event.target;
		if(selectObj!=showGoWhereObj.selectObj && selectObj!=showGoWhereObj.div ){
			showGoWhereObj.hideDiv();
		}
	}	
	
	return;
}
/**/
var redArray =["011401","020803","021201", "020401","030101","030105","030202","010809","010810"];
GetCateAreaString = function(secArray,thirdArray,numForRow,cityNum){
	var tempStr  = "";
	var cityName = '深圳';
	var title ='';
	var divClass ='';
	indexSec = 0;
	
	switch(cityNum){
		case 0:
			cityName = '深圳';break;
		case 1:
			cityName = '广州';break;
		default:
			break;
	}
	switch(secArray[0][0].substr(0,2)){
		case '01':
			divClass = '<div class="classlistas">';break;
		case '02':
			divClass = '<div class="classlistbs">';break;
		case '03':
			divClass = '<div class="classlistcs">';break;
		default:
			break;
	}
	
	
	for(var i=0; i<secArray.length; i++){
		
		if(secArray[i][0]=='0108'){
			HKMC = i;
			continue;
		}
		if(secArray[i][3]==0 && secArray[i][4][cityNum]==1){
			
			title = secArray[i][1];
			title = title.replace('旅游','');
			title = cityName + '到' + title + '旅游';
			if(indexSec % numForRow==0)
				tempStr += divClass;
			tempStr += '<p><strong>';
			tempStr += '<a title="' + title + '" href="' + secArray[i][2] + '">';
			tempStr += secArray[i][1];
			tempStr += '</a></strong><br />';

			var temp = '';
			var wordLen = 0;
			for(var j=0; j<thirdArray.length;j++){
				if(thirdArray[j][0].substr(0,4)==secArray[i][0] && thirdArray[j][3]==0 && thirdArray[j][4][cityNum]==1){
					
					if( (wordLen + thirdArray[j][1].length + 3) > 13){
						wordLen = 0;
						temp += '<br />';
					}
					if(wordLen>0){
						temp += '&nbsp;&nbsp;|&nbsp;&nbsp;';
						wordLen += 3;
					}
					tempTitle ='';
					tempTitle = thirdArray[j][1];
					tempTitle = tempTitle.replace('旅游','');
					tempTitle = cityName + '到' + tempTitle + '旅游';
					temp += '<a ' ;
					for(var x=0;x<redArray.length;x++){
						if(thirdArray[j][0]==redArray[x]){
							temp += 'style="color: #ff3300" ';
							break;
						}
					}
					temp += 'title="' + tempTitle + '" href="' + thirdArray[j][2] + '">';
					
					temp += thirdArray[j][1];
					temp += '</a>';
					wordLen += thirdArray[j][1].length;
				}
			}
			
			tempStr += temp;
		
			tempStr += '</p>';
			if((indexSec+1) % numForRow==0)
				tempStr += '</div>';

			indexSec++;
			
		}
		
	}
	if((indexSec) % numForRow!=0 && indexSec>0){
		tempStr += '</div>';
	}
	return tempStr;
}
		

/*所有页面都执行*/
function recordPage(){
	return;
	document.write( unescape("%3Cscript src='http://www.landtu.com/PageStatistics/pageRecord.php?referrer="+encodeURIComponent( document.referrer )+"' type='text/javascript'%3E%3C/script%3E") );
	return;
}

/*指定长度的随即数字*/
rndNum = function(len){
	var returnString = "";
	if(isNaN(len)){
		return returnString;
	}
	for(var index=0; index<len; index++){
		returnString += Math.floor(Math.random()*10).toString();
	}
	return returnString;
}


var jiathis_config={
	siteNum:15,
	sm:"tsina,tqq,qzone,douban,renren,baidu,xiaoyou,kaixin001,tsohu,t163,qq,hi,tieba,googleplus,tianya",
	summary:"",
	ralateuid:{
		"tsina":"风采旅行社"
	},
	hideMore:false
}
var eamil_title = "", eamil_content = "";
shareContent = function(imgpath, type)
{
	var title = encodeURIComponent(document.title), url = encodeURIComponent(location.href), appkey="2758711613", writeString = "", _url;
	if(!imgpath){
		imgpath ="";	
	}else{
		imgpath = encodeURIComponent(imgpath)
	}
	type = type?type*1:"0";

	switch(type){
		case 1:		
		    if(eamil_title!=""){
				writeString += "<a href=\"#\" onclick=\"showEmalShareAction();return false;\" title=\"邮件分享给好友\" >";
				writeString += "<img src=\"/img/special/icon_email.gif\" />";
				writeString += "</a>";
			}
			
			_url = "http://service.weibo.com/share/share.php?url="+url+"&appkey="+appkey+"&title="+title+"&pic="+imgpath+"&ralateUid=1865929164";	
			writeString += "&nbsp;&nbsp;<a href=\""+_url+"\" target=\"_blank\" title=\"分享到新浪微博\" >";
			writeString += "<img src=\"http://www.landtu.com/img/sinas.gif\" />";
			writeString += "</a>";
			
			_url = 'http://v.t.qq.com/share/share.php?url='+url+'&site='+encodeURIComponent("http://www.landtu.com")+'&pic='+imgpath+'&title='+title;
			writeString += "&nbsp;&nbsp;<a href=\""+_url+"\" target=\"_blank\" title=\"分享到腾讯微博\" >";
			writeString += "<img src=\"http://www.landtu.com/img/qqs.gif\" />";
			writeString += "</a>";			
			break;	
		case 2:		
		    if(eamil_title!=""){
				writeString += "<a href=\"#\" onclick=\"showEmalShareAction();return false;\" title=\"邮件分享给好友\" >";
				writeString += "<img src=\"/img/special/icon_email.gif\" /> 邮件分享";
				writeString += "</a>";
			}
			
			_url = "http://service.weibo.com/share/share.php?url="+url+"&appkey="+appkey+"&title="+title+"&pic="+imgpath+"&ralateUid=1865929164";	
			writeString += "&nbsp;&nbsp;<a href=\""+_url+"\" target=\"_blank\" title=\"分享到新浪微博\" >";
			writeString += "<img src=\"http://www.landtu.com/img/sinas.gif\" /> 新浪微博";
			writeString += "</a>";
			
			_url = 'http://v.t.qq.com/share/share.php?url='+url+'&site='+encodeURIComponent("http://www.landtu.com")+'&pic='+imgpath+'&title='+title;
			writeString += "&nbsp;&nbsp;<a href=\""+_url+"\" target=\"_blank\" title=\"分享到腾讯微博\" >";
			writeString += "<img src=\"http://www.landtu.com/img/qqs.gif\" /> 腾讯微博";
			writeString += "</a>";			
			break;	
			
		case 0:
		default:
			_url = "http://service.weibo.com/share/share.php?url="+url+"&appkey="+appkey+"&title="+title+"&pic="+imgpath+"&ralateUid=1865929164";	
			writeString += "<a href=\""+_url+"\" target=\"_blank\" title=\"分享到新浪微博\" >";
			writeString += "<img src=\"http://www.landtu.com/img/sina.jpg\" />";
			writeString += "</a>";
			
			_url = 'http://v.t.qq.com/share/share.php?url='+url+'&site='+encodeURIComponent("http://www.landtu.com")+'&pic='+imgpath+'&title='+title;
			writeString += "&nbsp;<a href=\""+_url+"\" target=\"_blank\" title=\"分享到腾讯微博\" >";
			writeString += "<img src=\"http://www.landtu.com/img/qq.jpg\" />";
			writeString += "</a>";
			break;		
	}
	
	<!-- JiaThis Button BEGIN -->
	writeString  = '';
	writeString += '<div id="ckepop">';
	writeString += '<a href="http://www.jiathis.com/share" class="jiathis jiathis_txt" target="_blank"><img src="/img/share.gif" border="0" /></a>';
	writeString += '</div>';
	document.write(writeString);
	document.write( unescape("%3Cscript src='http://v2.jiathis.com/code/jia.js' type='text/javascript'%3E%3C/script%3E") );
	<!-- JiaThis Button END -->
	return;
}

shareSmallContent = function(imgpath){
	var title = encodeURIComponent(document.title), url = encodeURIComponent(location.href), appkey="2758711613", writeString = "", _url;
	if(!imgpath){
		imgpath ="";	
	}else{
		imgpath = encodeURIComponent(imgpath)
	}
	
	_url = "http://service.weibo.com/share/share.php?url="+url+"&appkey="+appkey+"&title="+title+"&pic="+imgpath+"&ralateUid=1865929164";	
	writeString += "<a href=\""+_url+"\" target=\"_blank\" title=\"分享到新浪微博\" >";
	writeString += "<img src=\"http://www.landtu.com/img/sinas.gif\" /> 新浪微博";
	writeString += "</a>";
	
	_url = 'http://v.t.qq.com/share/share.php?url='+url+'&site='+encodeURIComponent("http://www.landtu.com")+'&pic='+imgpath+'&title='+title;
	writeString += "&nbsp;&nbsp;<a href=\""+_url+"\" target=\"_blank\" title=\"分享到腾讯微博\" >";
	writeString += "<img src=\"http://www.landtu.com/img/qqs.gif\" /> 腾讯微博";
	writeString += "</a>";
	
	
	<!-- JiaThis Button BEGIN -->	
	writeString  = '';
	writeString += '<div id="ckepop">';
	writeString += '<a href="http://www.jiathis.com/share" class="jiathis jiathis_txt" target="_blank"><img src="/img/share.gif" border="0" /></a>';
	writeString += '</div>';
	document.write(writeString);
	
	document.write( unescape("%3Cscript src='http://v2.jiathis.com/code/jia.js' type='text/javascript'%3E%3C/script%3E") );
	return;
}





GetObjShowWhere = function(ObjName){
	var returnObj = {
		"top" : 0,
		"left" : 0
	};
	if(!getObj(ObjName))
		return returnObj;
		
	var OBTop=0;
	var OBLeft=0;
	var OBWidth=0;
	var OBHeight=0;

	var oCurrentNode = getObj(ObjName);
	while(oCurrentNode != null && oCurrentNode.tagName != "BODY"){
		OBTop += oCurrentNode.offsetTop;
		OBLeft += oCurrentNode.offsetLeft;
		oCurrentNode = oCurrentNode.offsetParent;
	}
	
	returnObj = {
		"top" : OBTop,
		"left" : OBLeft
	};
	return returnObj;
}

GetObjShowWhereByObj = function(Obj){
	var returnObj = {
		"top" : 0,
		"left" : 0
	};
		
	var OBTop=0;
	var OBLeft=0;
	var OBWidth=0;
	var OBHeight=0;

	var oCurrentNode = Obj;
	while(oCurrentNode != null && oCurrentNode.tagName != "BODY"){
		OBTop += oCurrentNode.offsetTop;
		OBLeft += oCurrentNode.offsetLeft;
		oCurrentNode = oCurrentNode.offsetParent;
	}
	
	returnObj = {
		"top" : OBTop,
		"left" : OBLeft
	};
	return returnObj;
}


function goUrlDest(){
	if(getObj('s_keyword').value=='请输入目的地或景点' || getObj('s_keyword').value=='' || getObj('s_keyword').value=='景点、地图、游记、攻略'){
		alert('请输入搜索关键词。');
		return false;
	}
	window.location="http://jingdian.landtu.com/search/" + encodeURIComponent(getObj('s_keyword').value);
	return;
}

function goUrlBottom(){
	if(getObj('s_keyword_b').value=='请输入目的地或景点' || getObj('s_keyword_b').value=='' || getObj('s_keyword_b').value=='景点、地图、游记、攻略'){
		alert('请输入搜索关键词。');
		return false;
	}
	window.location="/search/" + encodeURIComponent(getObj('s_keyword_b').value);
	return;
}

function goUrlB(){
	if(getObj('s_keyword').value=='请输入目的地或景点' || getObj('s_keyword').value=='' || getObj('s_keyword').value=='景点、地图、游记、攻略'){
		alert('请输入搜索关键词。');
		return false;
	}
	window.location="/newDestination/DestinationSearch.php?search_words=" + encodeURIComponent(getObj('s_keyword').value);
	return;
}

/*头部初始化*/
var hostAreaCode = "";
function headInit(AreaCode)
{
	hostAreaCode = AreaCode;
	try{
		getObj("city").onmouseover = function()
		{
			getObj('citys').className = '';
		}
		getObj("city").onmouseout = function()
		{
			getObj('citys').className = 'dpn';
		}
		var tempObj = getObj("city").getElementsByTagName("h1");
		if(tempObj.length>0)
		{
			tempObj[0].style.cursor = "pointer";
		}
		var tempObj = getObj("city").getElementsByTagName("strong");
		if(tempObj.length>0)
		{
			tempObj[0].style.cursor = "pointer";
		}		
	}catch(e){}
	return;	
}


/*初始化元素底下的图片大宽*/
contentImgInit = function(objId,defaultWidth){
	if(!getObj(objId)){
		return false;
	}
    var imgObjArray = getObj(objId).getElementsByTagName("img");
	for(var index=0; index<imgObjArray.length; index++){
		var imgObj = imgObjArray[index];
		try{
			if( imgObj.width ){
				if( parseInt(imgObj.width,10) > parseInt(defaultWidth,10) ){
					imgObj.width = defaultWidth;
				}
			} 
		}catch(e){
			if(imgObj.offsetWidth){
				if( parseInt(imgObj.offsetWidth,10) > parseInt(defaultWidth,10) ){
					imgObj.width = defaultWidth;
				}
			}
		}finally{
			if(imgObj.style.width){
				if( parseInt(imgObj.style.width,10) > parseInt(defaultWidth,10) ){
					imgObj.style.width = defaultWidth + "px";
				}
			}
		}
	}
	return;
}

/*************************************************
*
*	分享
*/
showEmalShareAction = function(){
	if(!eamil_title || eamil_title==""){
		return false;
	}
	showEmalShare(eamil_title, eamil_content);
	return false;
}
function showEmalShare(emailTitle, emailContent, emailTxt, emailDefaultContent)
{
	emailTitle = emailTitle?emailTitle:"来自您朋友的推荐："+document.title;
	emailContent = emailContent?emailContent:"";
	emailTxt = emailTxt?emailTxt:"";
	emailDefaultContent = emailDefaultContent?emailDefaultContent:"";
	
	var msg  = '';
		msg += '<form name="formNewShare" id="formNewShare" action="/product/EmailShareAction.php" method="post" onsubmit="return DoSubmitEmailShare(this)">';
		msg += '<div class="emaildiv">';
		msg += '<div class="emaildivtop"><a href="javascript:HidDiv()">关闭</a><strong>分享给我的好友</strong></div>';
		msg += '<div class="emailorder">';
		msg += '<table width="100%" border="0" cellpadding="0" cellspacing="0">';
		msg += '<tr>';
		msg += '<td width="10%" height="47" align="right" valign="top"><strong>收件人邮箱</strong></td>';
		msg += '<td width="90%" valign="top"><input name="email_txt" type="text" maxlength="50" id="email_txt" title="请您输入收件人邮箱" style="width:365px;" value="'+emailTxt+'" /> *</td>';
		msg += '</tr>';
		msg += '<tr>';
		msg += '<td height="47" align="right" valign="top"><strong>邮件标题</strong></td>';
		msg += '<td valign="top"><input readonly="readonly" name="email_title" type="text" id="email_title" title="请您输入邮件标题" style="width:365px" maxlength="50"; value="'+emailTitle+'" />  *</td>';
		msg += '</tr>';
		msg += '<tr>';
		msg += '<td height="150" align="right" valign="top"><strong>邮件内容</strong></td>';
		msg += '<td valign="top"><textarea readonly="readonly" name="email_content" id="email_content" cols="45" rows="5" title="请您输入邮件内容" >'+emailContent+'</textarea></td>';
		msg += '</tr>';
		msg += '<textarea name="email_content_default" id="email_content_default" style="display:none;" >'+emailDefaultContent+'</textarea>';
		msg += '<tr>';
		msg += '<td height="47" align="right" valign="top"><strong>验证码</strong></td>';
		msg += '<td valign="top"><input type="text" name="email_code" id="email_code" maxlength="4" style="width:110px;" title="请您输入验证码" />';
		msg += ' <img src="../users/Code.php" id="CheckcodeForShare" title="看不清楚，点击图片换一张？"  width="95" height="32" onclick="setcode(\'CheckcodeForShare\');" style="cursor:pointer"; /></td>';
		msg += '</tr>';
		msg += '</table>';
		msg += '</div>';
		msg += '<div class="emaildivend"><input type="submit" id="formNewShareBtn" value="分享给好友" class="sendemail" />　　<span id="shareEmailTip"></span></div>';//抱歉发送失败，请重新发送
		msg += '</div>';	
		msg += '</form>';
		
		
	if(ShowMsgDiv==null || !ShowMsgDiv) {
		ShowMsgDiv = new DivMsg();
		ShowMsgDiv.init();
		ShowMsgDiv.HeightAdd = 0;
		ShowDivContent(msg);
	}else{
		ShowMsgDiv.HeightAdd = 0;
		ShowDivContent(msg);
		setcode('CheckcodeForShare');
	}
	
	//setcode('CheckcodeForShare');
	
	var inputArray = getObj("formNewShare").getElementsByTagName('input');
	for( var i=0; i<inputArray.length; i++ ){
		switch(inputArray[i].name){
			case "email_title":
			case "email_code":
				inputArray[i].onfocus = function(){
					if( this.value == this.title ){
						this.value = "";
					}
					this.className = "";
				}
				inputArray[i].onblur = function(){
					if( this.value=="" || this.value == this.title ){
						this.className = "err";
						this.value = this.title;
					}else{
						this.className = "";
					}
				}
				break;
			case "email_txt":
				inputArray[i].onfocus = function(){
					if( this.value == this.title ){
						this.value = "";
					}
					this.className = "";
				}
				inputArray[i].onblur = function(){
					if( this.value=="" || this.value == this.title ){
						this.className = "err";
						this.value = this.title;
					}else{
						if( !checkMail(this.value) ){
							this.className = "err";
						}else{
							this.className = "";
						}						
					}
				}						
				break;			
		}
		
	}
	
	var inputArray = getObj("formNewShare").getElementsByTagName('textarea');
	for( var i=0; i<inputArray.length; i++ ){
		switch(inputArray[i].name){
			case "email_content":
				inputArray[i].onfocus = function(){
					if( this.value == this.title ){
						this.value = "";
					}
					this.className = "";
				}
				inputArray[i].onblur = function(){
					if( this.value=="" || this.value == this.title ){
						this.className = "err";
						this.value = this.title;
					}else{
						this.className = "";
					}
				}
				break;
		}
		
	}	
		
	return;
}

DoSubmitEmailShare = function(formObj){
	var SendString = "", ShareBtn;
	var inputArray = formObj.getElementsByTagName('input');
	for( var i=0; i<inputArray.length; i++ ){
		switch(inputArray[i].name){
			case "email_title":
			case "email_code":
				if( inputArray[i].value=="" || inputArray[i].value == inputArray[i].title ){
					shareEmailTip.innerHTML = inputArray[i].title;
					return false;	
				}
				break;
			case "email_txt":
				if( inputArray[i].value=="" || inputArray[i].value == inputArray[i].title ){
					shareEmailTip.innerHTML = inputArray[i].title;
					return false;	
				}else{
					if( !checkMail(inputArray[i].value) ){
						shareEmailTip.innerHTML = "请您正确填写邮件地址";
						return false;	
					}					
				}
				break;			
		}
		
		if(inputArray[i].name!=""){
			if(SendString!=""){
				SendString += "&"; 	
			}
			SendString += inputArray[i].name + "=" + encodeURIComponent(inputArray[i].value); 	
		}
		
		if( inputArray[i].id=="formNewShareBtn" ){
			ShareBtn = inputArray[i];
		}
	}
	var inputArray = formObj.getElementsByTagName('textarea');
	for( var i=0; i<inputArray.length; i++ ){
		switch(inputArray[i].name){
			case "email_content":
				if( inputArray[i].value=="" || inputArray[i].value == inputArray[i].title ){
					shareEmailTip.innerHTML = inputArray[i].title;
					return false;	
				}
				break;
		}
		if(inputArray[i].name!=""){
			if(SendString!=""){
				SendString += "&"; 	
			}
			SendString += inputArray[i].name + "=" + encodeURIComponent(inputArray[i].value); 	
		}		
	}		

	shareEmailTip.innerHTML = "";
	ShareBtn.value = "正在分享中....";
	formObj.onsubmit = function(){
		return false;	
	}

	axjaReturnFuc = function(value){
		try{
			eval(value);
		}catch(e){
			ShareBtn.value = "分享给好友";
			formObj.onsubmit = function(){
				return DoSubmitEmailShare(this);
			}
			shareEmailTip.innerHTML = "网络繁忙，请您稍后再试。";
			return false;
		}
		if(errorFlag==1){
			ShareBtn.value = "分享给好友";
			formObj.onsubmit = function(){
				return DoSubmitEmailShare(this);
			}
			shareEmailTip.innerHTML = returnString;
			return false;			
		}
		
		var showMsg  = '';
			showMsg += '<div class="emaildiv">';
			showMsg += '<div class="emaildivtop"><a href="javascript:HidDiv()">关闭</a><strong>分享线路给我的好友</strong></div>';
			showMsg += '<div class="emailok">';
			showMsg += '<p><strong>☻ 分享成功！</strong></p>';
			showMsg += '已分享至您的好友<strong>'+sendEmailTxt+'</strong><br />您可以<a href="javascript:HidDiv()">点击这里</a>关闭窗口';
			showMsg += '</div>';
			showMsg += '</div>';
		
		ShowDivContent(showMsg);

		return;
	}
	var _url = formObj.action+"?"+SendString+"&rnd=" + new Date();
	axajSend( _url, "post", null, axjaReturnFuc );
	return false;
}


/**/
//读取COOKIE
function GetCookieData(sL)
{
    var sRet="";
    var sC=""+document.cookie;
    if(sC.length>0)
    {
        var aC=sC.split(";",100);
        var iC=aC.length;
        for(var i=0;i<iC;i++)
        {
            if(aC[i].indexOf(sL+"=")!=-1)
            {
                var aRet=aC[i].split("=");
                sRet=unescape(aRet[1]);
                break;
            }
        }
    }
    return sRet;
} 

function LoginCookie()
{
	if(UrlWhere!=0 ){
		ThisArray[4] = window.location.href.replace(/\//g,"%2F").replace(/\:/,"%3A").replace(/\=/,"%3D").replace(/\?/,"%3F");
	}
	var TempLogin,strTemp,temp;
	TempLogin=document.getElementById("Login");
	if(typeof(TempLogin)  !=   "object"){return;}

	var strName_1 = "";
	strName_1 = "Keepname";

	if( checkLoginIf() )
		temp= GetCookieData(strName_1) + '(<a href="http://www.landtu.com/users/manage.php" >会员中心</a>) <a href="http://www.landtu.com/users/LoginOut.php">退出</a>';
	else
	{
		temp= GetCookieData(strName_1)+' <a href="http://www.landtu.com/users/Login.php?goBackUrl='+(ThisArray[4]==""?ThisArray[UrlWhere]:ThisArray[4])+'">登录</a> | <a href="http://www.landtu.com/users/register.php">注册</a>';
	}
	document.write(temp);  
	return;
}

function checkLoginIf(){
	if( GetCookieData("Myname")!="")
		return true;
	else
		return false;
}


function LoginCenter()
{
	var TempLogin,strTemp,temp,month;
	LoginCookie();
	TempLogin=document.getElementById("username");
	if(GetCookieData("PHPSESSID")!="" && GetCookieData("cdb_auth")!="" && GetCookieData("Myname")!="")
		temp= GetCookieData("Keepname");
	else
		temp='游客';
	TempLogin.innerHTML=temp;
	
	var myDate = new Date();
	month = myDate.getMonth()+1;
	DayName=new Array("日","一","二","三","四","五","六");
	document.getElementById("date").innerHTML=myDate.getFullYear()+"年"+month+"月"+myDate.getDate()+"日 （星期" + DayName[myDate.getDay()] +"）";
	
}

function LoginNewsCookie()
{
	if(UrlWhere!=0 ){
		ThisArray[4] = window.location.href.replace(/\//g,"%2F").replace(/\:/,"%3A").replace(/\=/,"%3D").replace(/\?/,"%3F");
	}
	
	var TempLogin,strTemp,temp;
	TempLogin=document.getElementById("Login");
	if(typeof(TempLogin)  !=   "object"){return;}

	var strName_1 = "", temp = "";
	strName_1 = "Keepname";

	if( checkLoginIf() ){
		temp = '<span class="title">' + 
			GetCookieData(strName_1) + 
			'(<a href="http://www.landtu.com/users/manage.php" >会员中心</a>)' +
			'</span>' +
			'&nbsp;|&nbsp;' +
			'<a href="http://www.landtu.com/users/LoginOut.php">退出</a>' +
			' |';
	}else{
		temp = '<span class="title">' + 
			GetCookieData(strName_1) + 
			'</span>' + 
			' <a href="http://www.landtu.com/users/Login.php?goBackUrl='+(ThisArray[4]==""?ThisArray[UrlWhere]:ThisArray[4])+'">登录</a>' +
			'&nbsp;|&nbsp;'+
			'<a href="http://www.landtu.com/users/register.php">注册</a>' +
			' |';
	}
	document.write(temp);
	return;
}




var UrlWhere = -1;
var ThisArray = ["%2Fusers%2Fmanage.php","%2Fabroad","%2Fdomestic","%2Faround",""];
function ShowNav()
{
	if(UrlWhere=="-1") 
		return; 
	var a = document.getElementById('head').getElementsByTagName("DT");
	if(UrlWhere<a.length)
		a[UrlWhere].className = a[UrlWhere].className==""?"stop":"stop1";
	
	return;
}

/* 新的头部 */
function ShowNewNav(m)
{
	//NewNavInit();
	if(m=="-1") return; 
	if(getObj('nav')){
		var a = getObj('nav').getElementsByTagName("LI");
		if(UrlWhere<a.length){
			a[m].className = "current";
		}
	}
	if(getObj('newnav')){
		var a = getObj('newnav').getElementsByTagName("LI");
		if(m<a.length){
			a[m].className += " selected";
		}
	}	
	return;
}

//下拉列表
var NewNavListContentArray = [], NewNavShowInterval;
function HidNewNavDiv(){
	var div = getObj("newNavContent1");
	div.style.display = "none";	
	return;
}
function NewNavInit()
{
	if(!getObj('newnav')){
		return;	
	}

	if( !getObj("newNavContent") ){
		var div = document.createElement('DIV');
		div.id = 'newNavContent';
		div.innerHTML =  '<div id="newNavContent1" style="position:absolute; z-index:9999; width:445px; left:68px; top:0px; display:none;"></div>';
		var bs = document.getElementsByTagName('BODY');
		bs[0].appendChild(div);
		
		var div = getObj("newNavContent1");
		div.onmouseout = function(){
			NewNavShowInterval = setTimeout("HidNewNavDiv();",500);
			//this.style.display = "none";	
		}	
		div.onmouseover = function(){
			clearTimeout(NewNavShowInterval);
			this.style.display = "";	
		}	
		
	}
	
	var objWhere = GetObjShowWhereByObj(getObj("newNavContent"));
		
	var a = getObj('newnav').getElementsByTagName("LI");
	a[abroad].onmouseover = function(){
		NewNavInitData(this,abroad);
		clearTimeout(NewNavShowInterval);
		return;
	}
	a[abroad].onmouseout = function(){
		NewNavShowInterval = setTimeout("HidNewNavDiv();",500);
		return;
	}


	a[domestic].onmouseover = function(){
		NewNavInitData(this,domestic);
		clearTimeout(NewNavShowInterval);
		return;
	}
	a[domestic].onmouseout = function(){
		NewNavShowInterval = setTimeout("HidNewNavDiv();",500);
		return;
	}
	
	
	a[around].onmouseover = function(){
		NewNavInitData(this,around);
		clearTimeout(NewNavShowInterval);
		return;
	}
	a[around].onmouseout = function(){
		NewNavShowInterval = setTimeout("HidNewNavDiv();",500);
		return;
	}

	return;
}

NewNavInitData = function(obj, type){    
	if( !NewNavListContentArray[type] ){
		var topArray, moreSecArray, moreThiArray;
		try{
			if(!AreasOfCategory){
				return;	
			}
		}catch(e){
			return;	
		}

		switch(type){
			case 1:	//出境
				topArray = AreasOfCategory[0];
				moreSecArray = AreasOfAbroad;
				moreThiArray = AreasOfAbroadList;
				break;
			case 2://国内
				topArray = AreasOfCategory[1];
				moreSecArray = AreaOfDomestic;
				moreThiArray = AreaOfDomesticList;
				break;
			case 3://周边
				topArray = AreasOfCategory[2];
				moreSecArray = AreaNearShenzhen;
				moreThiArray = AreaNearShenzhenList;
				break;
			default:
				return;
				break;
		}
		
		if(hostAreaCode==""){
			hostAreaCode = "sz";	
		}
		//var hostUrl = "http://www.87666888.com";
        var hostUrl="http://localhost:13838";
		
		var area_code_where = 0;
		switch(hostAreaCode){
			case "sz":
				area_code_where = 0;
				break;
			case "gz":
				area_code_where = 1;
				break;
			default:
				return;
				break;
		}
		
		var tempArray , checkTempArray;
		tempArray = [];
		checkTempArray = moreSecArray;
		for(var i=0; i<checkTempArray.length; i++){
			if(checkTempArray[i][3]=="1"){
				continue;	
			}
			if(checkTempArray[i][4].substr(area_code_where,1)!="1"){
				continue;	
			}
			tempArray.push( checkTempArray[i] );
		}
		moreSecArray = tempArray;
		
		tempArray = [];
		checkTempArray = moreThiArray;
		for(var i=0; i<checkTempArray.length; i++){
			if(checkTempArray[i][3]=="1"){
				continue;	
			}
			if(checkTempArray[i][4].substr(area_code_where,1)!="1"){
				continue;	
			}
			tempArray.push( checkTempArray[i] );
		}
		moreThiArray = tempArray;	
		
		var widthString = "", ulWidthString = "";
		switch(type){
			case 1:
				widthString = '';
				break;
			case 2:
				//widthString = 'width:290PX;';
				//ulWidthString = 'width:260PX;';
				break;			
			case 3:
				//widthString = 'width:290PX;';
				//ulWidthString = 'width:260PX;';
				break;
			/*
			case 3:
				widthString = 'width:260PX;';
				ulWidthString = 'width:230PX;';
				break;
			*/
		}			
	
		var tempString = '';
		
			tempString += '<div id="navlist"';
			if(widthString!=""){
				tempString += ' style="'+widthString+'"';
			}
			tempString += '>';
			
			tempString += '<div class="top"><a href="' + hostUrl + topArray[2] + '">'+topArray[1]+'</a></div>';		
			
			tempString += '<div class="navlist"';
			if(widthString!=""){
				tempString += ' style="'+widthString+'"';
			}
			tempString += '>';
			
			tempString += '<ul';
			if(ulWidthString!=""){
				tempString += ' style="'+ulWidthString+'"';
			}

			tempString += '>';	       
			for(var i=0; i<moreSecArray.length; i++){
				var ForTempString = "";
				for(var j=0; j<moreThiArray.length; j++){
					if(moreSecArray[i][0]!=moreThiArray[j][0].substr(0,4)){
						continue;	
					}				
					if(ForTempString!=""){
						ForTempString += "&nbsp;&nbsp;|&nbsp;&nbsp;";
					}
					ForTempString += '<a href="' + hostUrl  + moreThiArray[j][2] + '">' + moreThiArray[j][1] + '</a>';
				}
				ForTempString = "<span>"+ForTempString+"</span>";
				
				tempString += '<li';
				tempString += ' style="';
				if(i == moreSecArray.length-1){
					tempString += ' border:0 none;';
				}
				if(ulWidthString!=""){
					tempString += ulWidthString;
				}
				tempString += '"';
				tempString += '>';
					
				if(moreSecArray[i][6]!="1"){
					tempString += '<strong><a href="' + hostUrl  + moreSecArray[i][2] + '">' + moreSecArray[i][1] + '</a></strong>';
				}else{
					tempString += '<strong>' + moreSecArray[i][1] + '</strong>';
				}
				tempString +=  ForTempString;
				tempString += '</li>';				
			}
			
			tempString += '</ul>';
			tempString += '</div>';
			tempString += '<div class="bl"></div><div class="br"></div>';
			tempString += '</div>';
		NewNavListContentArray[type] = tempString;
	}	
	getObj("newNavContent1").innerHTML = NewNavListContentArray[type];

	var objWhere = GetObjShowWhereByObj(obj);
	var NavContentObjWhere = GetObjShowWhereByObj(getObj("newNavContent"));
	var navObjWhere = GetObjShowWhereByObj(getObj("newnav"));
	
	var div = getObj("newNavContent1");
	var t = 0, l = 0;
	if( type == UrlWhere ){
		t = 4;
		l = -2;
	}
	div.style.display=  '';
	div.style.left = objWhere.left - navObjWhere.left  - l + "px";
	div.style.top = objWhere.top - NavContentObjWhere.top - t + 36 + "px";
	return;
}

/* 设置网站地图 */
mapInit = function( ObjId )
{
	
	getObj(ObjId).onmouseover = function()
	{
		var ObjArray = this.getElementsByTagName("strong");
		if( ObjArray.length>0 )
		{
			ObjArray[0].className = "more_bg";
		}
		var ObjArray = this.getElementsByTagName("div");
		if( ObjArray.length>0 )
		{
			ObjArray[0].className = "more";
		}		
		return;		
	}
	
	getObj(ObjId).onmouseout = function()
	{
		var ObjArray = this.getElementsByTagName("strong");
		if( ObjArray.length>0 )
		{
			ObjArray[0].className = "";
		}
		var ObjArray = this.getElementsByTagName("div");
		if( ObjArray.length>0 )
		{
			ObjArray[0].className = "dpn";
		}		
		return; 
	}
	
	return;
}


function SetReferer()
{
	if(GetCookieData("HttpReferer")==""){
		Set("HttpReferer",document.referrer);
	}
	return;
}

function Set(Key,value)
{
	document.cookie = Key+"="+value+";path=/;";
	return;
}

function getOs() 
{ 
	var OsObject = ""; 
	if(navigator.userAgent.indexOf("MSIE")>0) { 
		return "MSIE"; 
	} 
	if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){ 
		return "Firefox"; 
	} 
	if(isSafari=navigator.userAgent.indexOf("Safari")>0) { 
		return "Safari"; 
    }  
	if(isCamino=navigator.userAgent.indexOf("Camino")>0){ 
		return "Camino"; 
	} 
	if(isMozilla=navigator.userAgent.indexOf("Gecko/")>0){ 
		return "Gecko"; 
	} 
	return;
} 


function SetVacationVisitCookie(ThisId,ThisName)
{
	var TempSearchKey_id = new Array();
	var TempSearchKey_name = new Array();

    var Days = 30; //此 cookie 将被保存 30 天
    var exp  = new Date();    //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
	
	var haveGet = false;
	for(var i=0; i<6; i++){
		TempSearchKey_id[i] = GetCookieData("VacationSearchKey"+i+"Id");
		TempSearchKey_name[i] = GetCookieData("VacationSearchKey"+i+"Name");
		
		if(TempSearchKey_id[i]==ThisId){
			haveGet = true;
		}
	}
	if(!haveGet){
		for(var i=5; i>0; i--){
			TempSearchKey_id[i] = TempSearchKey_id[i-1];
			TempSearchKey_name[i] = TempSearchKey_name[i-1];			
		}
		TempSearchKey_id[0] = ThisId;
		TempSearchKey_name[0] = ThisName;	
		
		for(var i=0; i<6; i++){
			document.cookie = "VacationSearchKey"+i+"Id"+"="+escape(TempSearchKey_id[i])+";expire="+ exp.toGMTString()+";path=/;";
			document.cookie = "VacationSearchKey"+i+"Name"+"="+escape(TempSearchKey_name[i])+";expire="+ exp.toGMTString()+";path=/;";
		}	
	}
	ShowVacationCookie();
	return;
}

function ShowVacationCookie()
{
	var TempSearchKey_id = new Array();
	var TempSearchKey_name = new Array();
	for(var i=0; i<6; i++){
		TempSearchKey_id[i] = GetCookieData("VacationSearchKey"+i+"Id");
		TempSearchKey_name[i] = GetCookieData("VacationSearchKey"+i+"Name");
	}
	
	var tempHtml ="";
	//tempHtml = "<ul>";
	for(var i=0; i<6; i++)
	{
		tempHtml += '<div class="p_l_l_li"><a href="/vacation/'+TempSearchKey_id[i]+'.html">'+TempSearchKey_name[i]+'</a></div>';
	}	
	//tempHtml += "</ul>";
	document.getElementById("historyList").innerHTML = tempHtml;	
	return;
}

function show_login_ask_info()
{
	var obj = document.getElementById("formAsk");
	var nameObj = obj.document.getElementById("yourName");
	var mailObj =obj.document.getElementById("email");
	
	nameObj.value = GetCookieData("Uname");
	mailObj.value = GetCookieData("Email");
	if(document.getElementById("user_email"))
	{
		var sub_mailObj = document.getElementById("user_email");
		sub_mailObj.value = GetCookieData("Email");
	}
	return;
}


//随即显示页面右边的广告
function ShowLinePic(hotShowId)
{
	if(!hotShowId){
		hotShowId = "hot_show";
	}
	document.getElementById('hot').style.display = "none";
	var hotLI = document.getElementById('hot').getElementsByTagName("li");
	var lineAD = GetCookieData("lineAD");
	if(isNaN(lineAD)){
		lineAD = Math.floor(Math.random() * hotLI.length);    
	}else{
		lineAD = lineAD*1 +1;
	}	
	if( lineAD >= hotLI.length ){
		lineAD = 0;
	}
	document.getElementById(hotShowId).innerHTML = hotLI[lineAD].innerHTML;
	Set("lineAD",lineAD);
}

//线路编号跳转
function goLineUrl( ObjId )
{
	var tempObj = getObj(ObjId);
	if(!tempObj)
		return;
	temp = Trim(tempObj.value);
	if(temp!="")
	{
		switch(temp.substring(0,1))
		{
			case "p":
			case "P":
				var key = temp.substring(1);
				if( key=="" || isNaN(key) )
				{
					alert("请您正确输入产品编号");	
					tempObj.select();
					tempObj.focus();
					return;
				}
				var url = '/vacation/' + key + '.html'; 
				break;
			default:
				if( temp=="" || isNaN(temp) )
				{
					alert("请您输入线路编号查询");	
					tempObj.select();
					tempObj.focus();
					return;
				}
				var url = '/line/' + temp  + '.html'; 
				break;
		}
		switch(hostAreaCode)
		{
			case "sz":
			case "gz":
				url = "http://" + hostAreaCode + ".landtu.com" + url;
				break;
		}
		window.location = url;
	}
	return false;
}



//线路编号查询
function showLineSearch()
{
	var string = '<input type="text" id="lineId" value="请输入线路编号查询"' +
		' onfocus="if(this.value==\'请输入线路编号查询\') this.value=\'\';"' +
		' onblur="if(this.value==\'\') this.value=\'请输入线路编号查询\';"' +
		' class="inputwz" />' +
		'<input type="image" src="/img/go.gif" onclick="goUrl();" style="border:none;" />';
	document.write(string);
	return true;
}

function goUrl()
{
	var tempObj = document.getElementById('lineId');
	if(!tempObj)
		return;
	temp = Trim(tempObj.value);
	if(temp!="")
	{
		switch(temp.substring(0,1))
		{
			case "p":
			case "P":
				var key = temp.substring(1);
				if( key=="" || isNaN(key) )
				{
					alert("请您正确输入产品编号");	
					tempObj.select();
					tempObj.focus();
					return;
				}
				window.location = '/vacation/' + key + '.html'; 
				break;
			default:
				if( temp=="" || isNaN(temp) )
				{
					alert("请您输入线路编号查询");	
					tempObj.select();
					tempObj.focus();
					return;
				}
				window.location = '/line/' + temp  + '.html'; 
				break;
		}
	}
	return false;
}

//点击显示不一样的层并且赋不同的类名
function showDifTab( objId, tarName, tarClassName, showContentLeft )
{
	if( !getObj(objId) )
		return;
		
	var ObjArray = getObj(objId).getElementsByTagName( tarName );
	if( ObjArray.length==0 )
	{
		return;
	}

	for( var i=0; i<ObjArray.length; i++ )
	{
		ObjArray[i].onclick = function()
		{
			for( var i=0; i<ObjArray.length; i++ )
			{
				if(ObjArray[i]==this)
				{
					ObjArray[i].className = tarClassName;
					if( getObj( showContentLeft + i ) )
					{
						getObj( showContentLeft + i ).className = "";
					}
				}else{
					ObjArray[i].className = "";
					if( getObj( showContentLeft + i ) )
					{
						getObj( showContentLeft + i ).className = "dpn";
					}					
				}
			}
					
			/*
			var LIOBJ = getObj("mpcity").getElementsByTagName("LI");
			var ContentObj = getObj("province_content").getElementsByTagName("DIV");
			var TempContentObj = [], index = 0;
			for( var i=0; i<ContentObj.length; i++ )
			{
				if( ContentObj[ i ].id.substr(0,9) == "province_" )
				{
					ContentObj[ i ].className = "dpn";
					TempContentObj[ index++ ] = ContentObj[ i ];
				}
			}
			
			for( var i=1; i<LIOBJ.length; i++ )
			{					
				if( LIOBJ[i]==this )
				{
					LIOBJ[i].className = "norder_tagcurr"
					TempContentObj[ i-1 ].className = "";
				}else{
					LIOBJ[i].className = ""
				}
			
			}
			*/
		}
		
		var AIOBJ = ObjArray[i].getElementsByTagName("A");
		if( AIOBJ.length==0 )
			continue;
		AIOBJ[0].onclick = function()
		{
			return false; 
		}
	}
	return;	
}

/* 幻灯片可以重构 */
showHuandengpianHotImg = {
	AObj : null,
	ImgObj : null,
	PageDivObj : null,
	imgListObj : [],
	pageClass : { "on":"curr", "out":"" },
	
	curPage:0,				//当前标签
	waitTime:4000,			//自动播放间隔时间
	autoItv:null,			//自动播放计数	跳转时计数器
	
	//重构的函数
	ObjContent : function( key )
	{
		var writeInString  = "";
			writeInString += '<div class="mpslide" onmouseover="showHuandengpianHotImg.over_stop();" onmouseout="showHuandengpianHotImg.over_start();">';
			writeInString += '<a target="_blank" id="link_obj_'+key+'" href="' + this.imgListObj[this.curPage]["href"] + '">';
			writeInString += '<img id="img_obj_'+key+'" src="' + this.imgListObj[this.curPage]["src"]  + '" width="720" height="280" style="filter:revealTrans(Transition=1,Duration=0.9);" />';
			writeInString += '</a>';
			writeInString += '<div id="page_obj_'+key+'">';
			writeInString += this.getPageString(this.curPage);
			writeInString += '</div>';
			writeInString += '</div>';
		return writeInString;	
	},
	showAction : function( ObjId )
	{
		if(!getObj(ObjId))
			return;
			
		var IMGOBJ = getObj(ObjId).getElementsByTagName("img");
		var AOBJ = getObj(ObjId).getElementsByTagName("a");
		
		if( IMGOBJ.length==0 )
			return;
			
		for( var i=0; i<IMGOBJ.length; i++ )
		{
			this.imgListObj[i] = {
				"src" : IMGOBJ[i].src,
				"href" : AOBJ[i].href
			}			
		}
		
		var key = Math.floor(Math.random()*10000+1);
		var writeInString = this.ObjContent(key);
		document.write(writeInString);
		
		this.AObj = getObj( "link_obj_"+key );
		this.ImgObj = getObj( "img_obj_"+key );
		this.PageDivObj = getObj( "page_obj_"+key );		
		
		this.over_start();					
		return;
	},
	getPageString : function( pageNum )
	{
		if( this.imgListObj.length<=1 )
			return "";
		var writeInString  = "";
			writeInString += '<ul>';
			for( var i=0; i<this.imgListObj.length; i++ )
			{
				writeInString += '<li';
				if( i*1==pageNum*1 )
				{
					writeInString += ' class="' + this.pageClass["on"] + '"';
				}else{
					writeInString += ' class="' + this.pageClass["out"] + '"';
				}
				writeInString += '>';
				writeInString += '<a href="javascript:showHuandengpianHotImg.over_in('+i+');" >' + (i+1) + '</a>';
				writeInString += '</li>';
			}	
			writeInString += '</ul>';
		return writeInString;
	},
	slideTo : function()
	{
		this.AObj.href = this.imgListObj[this.curPage]["href"];
		try{
			this.ImgObj.filters.item(0).transition = 12;
			this.ImgObj.filters.item(0).Apply();
			this.ImgObj.src = this.imgListObj[this.curPage]["src"];
			this.ImgObj.filters.item(0).Play();
		}catch(e){
			this.ImgObj.src = this.imgListObj[this.curPage]["src"];
		}
		this.PageDivObj.innerHTML = this.getPageString(this.curPage);
		return;
	},
	autoSlide:function()
	{
		if(this.curPage < this.imgListObj.length-1 ){
			this.curPage++;
		}else{
			this.curPage = 0;
		}
		this.slideTo();
		return;
	},
	over_in:function(n)
	{
		this.curPage = n;
		this.slideTo();
		return;
	},		
	over_start:function()
	{
		this.autoItv = setInterval( function(){
			showHuandengpianHotImg.autoSlide();
		}, this.waitTime );	
		return;
	},
	over_stop:function()
	{
		clearInterval(this.autoItv);
		return;
	}	
}

//判断浏览器类型
function getBrowser()  
{  
   var OsObject = "";  
   if(navigator.userAgent.indexOf("MSIE")>0) {  
        return "MSIE";  
   }  
   if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){  
        return "Firefox";  
   }  
   if(isSafari=navigator.userAgent.indexOf("Safari")>0) {  
        return "Safari";  
   }   
   if(isCamino=navigator.userAgent.indexOf("Camino")>0){  
        return "Camino";  
   }  
   if(isMozilla=navigator.userAgent.indexOf("Gecko/")>0){  
        return "Gecko";  
   }
   return "unknown";
}  

//scrollTo
var scrollToHeightObj = {
	"IntervalObj" : null,
	"TotalTime" : 30,	//执行次数
	"tarHeight" : 0,
	"speed" : 0,
	"tarType" : 0,		//0 向下  1 向上
	"oldTotalTime" : 0	//旧的次数
};
switch( getBrowser() )
{
	case "MSIE":
		scrollToHeightObj["TotalTime"] = 5;
		break;
	case "Firefox":
		break;
	case "Safari":
		break;
	case "Camino":
		break;
	case "Gecko":
		break;
}
scrollToHeightObj["oldTotalTime"] = scrollToHeightObj["TotalTime"];

scrollToHeight = function( height )
{
	if( !isNaN(height) )
	{
		scrollToHeightObj["tarHeight"] = height;
	}
	
	clearInterval(scrollToHeightObj["IntervalObj"]);
	var diffY = 0, TClientHeight = 0, TClientWidth = 0;
	if(document.documentElement && document.documentElement.scrollTop)
	{
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
	
	if( scrollToHeightObj["tarHeight"] == diffY)
	{
		return true;	
	}
	
	scrollToHeightObj["speed"] = parseInt((scrollToHeightObj["tarHeight"] - diffY)/scrollToHeightObj["TotalTime"],10);
	if( scrollToHeightObj["speed"]>0 )
	{
		scrollToHeightObj["tarType"] = 0;
	}else{
		scrollToHeightObj["tarType"] = 1;
	}

	scrollToHeightObj["IntervalObj"] = setInterval("scrollToHeightAction()",1);
	return false
}

scrollToHeightAction = function()
{	
	//这里只有不是在顶部的时候跳转
	if(document.documentElement && document.documentElement.scrollTop)
	{
		var thisScrollTop = document.documentElement.scrollTop;			
	}else if (document.body){
		var thisScrollTop = document.body.scrollTop;			
	}else{
		clearInterval(scrollToHeightObj["IntervalObj"]);
		/*Netscape stuff*/
		return true;
	}	
	var tempValue = thisScrollTop + scrollToHeightObj["speed"];	
	
	if( (scrollToHeightObj["tarType"]==1 && tempValue<=scrollToHeightObj["tarHeight"]) || (scrollToHeightObj["tarType"]==0 && tempValue>=scrollToHeightObj["tarHeight"]) )
	{
		tempValue = scrollToHeightObj["tarHeight"];
		clearInterval(scrollToHeightObj["IntervalObj"]);
		scrollToHeightObj["TotalTime"] = scrollToHeightObj["oldTotalTime"];
	}
	
	if(document.documentElement && document.documentElement.scrollTop)
	{
		document.documentElement.scrollTop = tempValue;			
		if( thisScrollTop==document.documentElement.scrollTop )
		{
			clearInterval(scrollToHeightObj["IntervalObj"]);
			scrollToHeightObj["TotalTime"] = scrollToHeightObj["oldTotalTime"];
		}	
	}else if (document.body){
		document.body.scrollTop = tempValue;
		if( thisScrollTop==document.body.scrollTop )
		{
			clearInterval(scrollToHeightObj["IntervalObj"]);
			scrollToHeightObj["TotalTime"] = scrollToHeightObj["oldTotalTime"];
		}
	}else{
		return true;
	}		
	return true;
}

scrollToObj = function( objId, addHeight )
{
	if( !getObj(objId))
		return false;
	
	var OBTop=0;
	var OBLeft=0;
	var OBWidth=0;
	var OBHeight=0;
	var oCurrentNode = getObj(objId);
	while(oCurrentNode != null && oCurrentNode.tagName != "BODY")
	{
		OBTop += oCurrentNode.offsetTop;
		OBLeft += oCurrentNode.offsetLeft;
		oCurrentNode = oCurrentNode.offsetParent;
	}
	OBTop += document.getElementsByTagName('BODY')[0].offsetTop;
	OBLeft += document.getElementsByTagName('BODY')[0].offsetLeft;
	
	if( addHeight && !isNaN(addHeight))
	{
		OBTop += addHeight;
	}
	scrollToHeight(OBTop);
	return false;
}
//浮动导航
LeftNavObj = {
	'divId' : '_LeftNav',
	'IntervalObj' : null,
	'cssText' : 'position:fixed;height:auto;left:45px;',
	'scrollFunction' : null,
	'onresizeFunction' :null
};
function ObjLeftResize(obj){
	if(document.documentElement.clientWidth<1340){
		obj.style.left = (document.documentElement.clientWidth - 1310)/2 + 'px';
	}else{
		obj.style.left = (document.documentElement.clientWidth - 1340)/2 + 'px';
	}
	return;
}

showLeftNavObj = function(){
	DivObj = getObj(LeftNavObj["divId"]);
	setInterval("ObjLeftResize(DivObj)",100);
	if( getBrowser()=="MSIE" )  
	{
		var userAgent = navigator.userAgent
		var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
		reIE.test(userAgent);
		var fIEVersion = parseFloat(RegExp["$1"]);
		if(fIEVersion == 6.0)
		{
			LeftNavObj["cssText"] = "position:absolute;margin:10px;height:auto;";
			DivObj.style.cssText = LeftNavObj["cssText"];
			
			LeftNavObj["scrollFunction"] = window.onscroll;
			window.onscroll = function(){
				try{
					LeftNavObj["scrollFunction"]();
				}catch(e){}
				DivObj.style.top = document.documentElement.scrollTop ;
			}
			return;
		}
	}
	DivObj.style.cssText = LeftNavObj["cssText"];

//	LeftNavObj["onresizeFunction"] = window.onresize;
	return;
};
//返回页面头部
pageTopObj = {
	"content" : '<a href="#" onclick="return PageGoTopAction();" title="回到顶部"><img src="http://hk.landtu.com/img/gotop.png" /></a>',
	"pageShowIndex" : 0,
	"pageShowSpeed" : 10,
	"IntervalObj" : null,
	"cssText" : "position:fixed; bottom:20px; right: 20px",
	"scrollFunction" : null,
	"t":"t"
};
showPageTopObj = function()
{
	if( !((document.documentElement && document.documentElement.scrollTop) || document.body) )
	{
		return true;
	}		
	if( getBrowser()=="MSIE" )  
	{
		var userAgent = navigator.userAgent
		var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
		reIE.test(userAgent);
		var fIEVersion = parseFloat(RegExp["$1"]);
		if(fIEVersion == 6.0)
		{
			return;
		}
	}else{
		pageTopObj["pageShowSpeed"] = 2;
	}
	
	if(!getObj("pageGoTopDiv"))
	{
		var writeHtml = pageTopObj["content"];
		var cssText = pageTopObj["cssText"];
		var div = document.createElement('DIV');
			div.id = "pageGoTopDiv";
			div.style.cssText = cssText;
			div.style.display = "none";
			div.innerHTML = writeHtml;
		document.getElementsByTagName("body")[0].appendChild(div);	
	}
	
	pageTopObj["scrollFunction"] = window.onscroll;	
	window.onscroll = function ()
	{
		try{
			pageTopObj["scrollFunction"]();
		}catch(e){}

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
		if(diffY==0)
		{
			//getObj("pageGoTopDiv").style.display = "none";
			pageTopObj["pageShowIndex"] = 0;
			clearInterval(pageTopObj["IntervalObj"]);
			pageTopObj["IntervalObj"] = setInterval("hidePageGoTopAction('pageGoTopDiv')",1);
			return;
		}

		if( getObj("pageGoTopDiv").style.display=="none" )
		{
			getObj("pageGoTopDiv").style.display = "";
			getObj("pageGoTopDiv").style.filter = "alpha(opacity = 0)";
			getObj("pageGoTopDiv").style.opacity = "0";
			pageTopObj["pageShowIndex"] = 0;
			clearInterval(pageTopObj["IntervalObj"]);
			pageTopObj["IntervalObj"] = setInterval("showPageGoTopAction('pageGoTopDiv')",1);
		}
		return;
	}		
	
	return;
}

PageGoTopAction = function()
{
	scrollToHeightObj["oldTotalTime"] = scrollToHeightObj["TotalTime"];
	scrollToHeightObj["TotalTime"] = 6;
	scrollToHeight( 0 );
	return false;	
}

showPageGoTopAction = function( objName )
{
	if( !objName || objName ==""){
		objName = "pageGoTopDiv";
	}
	
	var totalChange = pageTopObj["pageShowIndex"]*pageTopObj["pageShowSpeed"];
	if( totalChange>=100 )
	{
		totalChange = 100;
		clearInterval(pageTopObj["IntervalObj"]);
	}
	document.getElementById(objName).style.filter = "alpha(opacity = " + totalChange + ")";
	document.getElementById(objName).style.opacity = totalChange/100;
	pageTopObj["pageShowIndex"]++;
	return;
}

hidePageGoTopAction = function( objName )
{
	if( !objName || objName ==""){
		objName = "pageGoTopDiv";
	}
	
	var totalChange = 100 - pageTopObj["pageShowIndex"] * pageTopObj["pageShowSpeed"];
	if( totalChange<=0 )
	{
		totalChange = 0;
		clearInterval(pageTopObj["IntervalObj"]);
		document.getElementById(objName).style.display = "none";
		return;
	}
	document.getElementById(objName).style.filter = "alpha(opacity = " + totalChange + ")";
	document.getElementById(objName).style.opacity = totalChange/100;
	pageTopObj["pageShowIndex"]++;
	return;
}




