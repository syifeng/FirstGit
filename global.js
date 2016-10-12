 

function vipInit(programId,programType,resourceUrl){
	$.ajax({
		type: "POST",
	   url: resourceUrl + "/clt/programAuthentication.msp",
	   data: {"programId" :programId, "programType":programType},
	   dataType:"json",
	   success: function(res){
			console.log(res);	
			if(res.resultCode && res.resultCode == "0000"){//如果当前
				var privilegeInfo = "";
				if(res.status == 1){
					$("#playPanelID").children("#HLSPlayer").slideDown(300);
				}else if(res.status == 2){
					privilegeInfo =	'<div class="tip-msg">当前节目为会员收费节目，在客户端观看，如未安装客户端请下载后登陆观看</div>';
					$("#playPanelID").html(privilegeInfo);
				}else if(res.status == 3){
					privilegeInfo =	'<div class="tip-msg">当前节目为按次收费节目，在客户端观看，如未安装客户端请下载后登陆观看</div>';
					$("#playPanelID").html(privilegeInfo);
				}else if(res.status == 4){
					privilegeInfo =	'<div class="tip-msg">当前节目为会员与单次任选一个，在客户端观看，如未安装客户端请下载后登陆观看</div>';
					$("#playPanelID").html(privilegeInfo);
				}else{
					privilegeInfo =	'<div class="tip-msg">'+res.resultMsg+'</div>';
					$("#playPanelID").html(privilegeInfo);
				}								
			}else if(res.resultCode && res.resultCode == "1111"){
				privilegeInfo =	'<div class="tip-msg">'+res.resultMsg+'</div>';
				$("#playPanelID").html(privilegeInfo);
			}else if(res.resultCode && res.resultCode == "0081"){
				$("#playPanelID").children("#HLSPlayer").slideDown(300);
			}
	   }
	});
}
function closeThePanel(theBtn){
	$(theBtn).hide();
}

/** 
  组件在父组件中垂直居中
  设置子组件margin-top= (父组件.height - 子组件.height)/2;
 */
 function verticalMiddle(parentNode, childNode){
	var grandHeight = $(parentNode).parent().css("height").replace("px","");
	var parentHeight = $(parentNode).css("height").replace("px","");
	parentHeight = grandHeight;
	console.log("当前grandHeight： " + grandHeight	);
	//$(parentNode).css("height", parentHeight+"px");
	var childHeight = $(childNode).css("height").replace("px","");
	var middleMargin = parseInt((parseInt(parentHeight) - parseInt(childHeight))/2);
	console.log("当前设置margin-top： " + middleMargin	);
	$(childNode).css({"margin-top": middleMargin+"px"});
 }
/**
* js样式初始化，解决一些动态变化时css不能实时变化的样式
**/
function styleInit(){
	//下载按钮垂直居中组件垂直居中
	verticalMiddle(".img-top", ".btn-top");
}

Date.prototype.dateBefore = function(){
	var date = new Date();
	var differTime = (date.getTime() - this.getTime());
	console.log(differTime);
	if(differTime <  (60 * 1000)){
		return "刚刚";
	}else if (differTime >=  (60 * 1000) && differTime <  (60 * 60 * 1000)){
		var differMinute = Math.floor((differTime)/(60 * 1000));
		return differMinute+"分钟前";
	}else if (differTime >=  (60 * 60 * 1000) && differTime <  (24 * 60 * 60 * 1000)){
		var differHour = Math.floor((differTime)/(60 * 60 * 1000));
		return differHour+"小时前";
	}else if (differTime >=  (24 * 60 * 60 * 1000) && differTime <  (30 * 24 * 60 * 60 * 1000)){
		var differDay = Math.floor((differTime)/(24 *  60 * 60 * 1000));
		return differDay+"天前";
	}else if (differTime >=  (30 * 24 * 60 * 60 * 1000) && differTime <  (365 * 24 * 60 * 60 * 1000)){
		var differMonth = Math.floor((differTime)/(365 * 60 * 60 * 1000));
		return differMonth+"月前";
	}else{
		var differYear = Math.floor((differTime)/(365 * 60 * 60 * 1000));
		return differYear+"年前";
	}
}

/*话题app下载 
1:首页 2:详情页 3专题 4直播 5图集 6 外链 7:话题 8，我的社区 
*/ 
function allPageAppdowncheck(id,contid,contType, downUrl){ 
  var result = true,url; 
   var ua = window.navigator.userAgent.toLowerCase(); 
  // alert(ua);
	//if (/iphone|ipad|ipod/.test(ua)) {
	//	   alert("当前不支持iso下载");
	//		return;
	//}
	if(contType == 1){ 
       url = "app.cntv.cn://2|" + contType + "|" + contid 
   }else{ 
       url = "app.cntv.cn://7|" + contType + "|" + contid 
   }
   //url = "app.cntv.cn://"+contType+"|"+contid;     
   if(contid==''&&contType!='')url = "app.cntv.cn://"+contType;   
	    var timeout, t = 1000; 
	   var t1 = Date.now(); 
	   var chromeIntent=""; 
	   var isChrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/); 
	   var isOpera = ua.match(/opera\/([\d.]+)/); 
	   var isFirefox = ua.match(/firefox\/([\d.]+)/); 
	   var isAndriod = ua.match(/(Android);?[\s\/]+([\d.]+)?/); 
	   var ifr =null; 
	   var isIOS9 = window.navigator.userAgent.match(/OS 9/i) != null; 
	   var isIOS10 = window.navigator.userAgent.match(/OS 10/i) != null; 
	   var isIOS = ua.indexOf("iphone")!=-1; 
	if(isIOS9 || isIOS10){//适配ios9，不支持iframe方式，直接href 
		//alert(isIOS9 + " -- " + isIOS10);
		alert(url);
	   window.location.href = url; 
   }else{ 
      if((isChrome ||isOpera ||isFirefox) &&!isIOS){ 
          var chromeIntent = "intent://app.cntv.cn/#Intent;scheme="+url+";package=com.wondertek.paper;end"; 
           window.location.href = chromeIntent;   
      }else{ 
          ifr = document.createElement("iframe"); 
           ifr.setAttribute('src', url); 
           ifr.setAttribute('style', 'display:none');   
           document.body.appendChild(ifr); 
      } 
   } 
   timeout = setTimeout(function () { 
           var t2 = Date.now(); 
           if (t2 - t1 < t + 1000) { 
               result = false; 
           }   
    }, t); 
   setTimeout(function () { 
       if(!result){ 
           var dUrl = $("#"+id).attr("data-url"); 
           if(!dUrl || dUrl.length < 5){ 
               dUrl=downUrl; 
           } 
           window.setTimeout(function(){window.location = dUrl;},1000); 
       } 
   }, 1500); 
}