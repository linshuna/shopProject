// 常用工具合集
/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
	if (!name) return;
	return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
}
export const clearStore = function(){
	window.localStorage.clear();
}

// 本地存储
export const setCookie = function(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
} 
	
//读取cookie
export const getCookie = function(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
	var c = ca[i];
	while (c.charAt(0)==' ') c = c.substring(1);
	if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
	}
	return "";
}


export const delCookie = function(name){
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if(cval != null){
		document.cookie= name + "="+cval+";expires=" + exp.toGMTString()+";path=/;"
	}
};
export const clearCookie = function(){
	var date=new Date();
	date.setTime(date.getTime()-10000);
	var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
	if (keys) {
		for (var i = keys.length; i--;)
			document.cookie=keys[i]+"=0; expire="+date.toGMTString()+"; path=/";
	}
}

// 时间转换
export const  format = function(time, format){
	var t = new Date(time);
	var tf = function(i){return (i < 10 ? '0' : '') + i};
	//var tf = function(i){return i};
	return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
		switch(a){
			case 'yyyy':
				return tf(t.getFullYear());
				break;
			case 'MM':
				return tf(t.getMonth() + 1);
				break;
			case 'mm':
				return tf(t.getMinutes());
				break;
			case 'dd':
				return tf(t.getDate());
				break;
			case 'HH':
				return tf(t.getHours());
				break;
			case 'ss':
				return tf(t.getSeconds());
				break;
		}
	})
  }

export const  formatDateTime = function(date) {  
	date = new Date(date)
	var y = date.getFullYear();  
	var m = date.getMonth() + 1;  
	m = m < 10 ? ('0' + m) : m;  
	var d = date.getDate();  
	d = d < 10 ? ('0' + d) : d;  
	var h = date.getHours();  
	h=h < 10 ? ('0' + h) : h;  
	var minute = date.getMinutes();  
	minute = minute < 10 ? ('0' + minute) : minute;  
	var second=date.getSeconds();  
	second=second < 10 ? ('0' + second) : second;  
	return y + '-' + m + '-' + d;  
};  




	
// var arr = [
//     {"id":"1001","name":"值1","value":"111"},
//     {"id":"1001","name":"值1","value":"11111"},
//     {"id":"1002","name":"值2","value":"25462"},
//     {"id":"1002","name":"值2","value":"23131"},
//     {"id":"1002","name":"值2","value":"2315432"},
//     {"id":"1003","name":"值3","value":"333333"}
// ];
//将相同的id存在同一个数组里面 变成二位数据 
//arr的结果 
// [{data:[
// 	{"id":"1001","name":"值1","value":"111"},
// 	{"id":"1001","name":"值1","value":"11111"}],
// 	id: '1001',
// 	name: '值1'
// }, ...] 
// var map = {},
//     dest = [];
// for(var i = 0; i < arr.length; i++){
//     var ai = arr[i];
//     if(!map[ai.id]){
		
//         dest.push({
//             id: ai.id,
//             data: [ai]
//         });
//         map[ai.id] = ai;
//     }else{
//         for(var j = 0; j < dest.length; j++){
//             var dj = dest[j];
//             if(dj.id == ai.id){
//                 dj.data.push(ai);
//                 // break;
//             }
//         }
//     }
// }
//数组中根据某个对象 进行筛选数据
export function SliceArrPublic(id,arr) {
	var	map  = {},
    	dest = [];
	for(var i = 0; i < arr.length; i++){
		var ai = arr[i];
		if(!map[ai[id]]){
			dest.push({
				sameE: ai[id],
				data: [ai]
			})
			map[ai[id]] = ai;
		}else{
			for(var j = 0; j < dest.length; j++){
				var dj = dest[j];
				if(dj.sameE == ai[id]){
					dj.data.push(ai);
				}
			}
		}
	}
	return dest;
}

//获取两个日期的相差几天
export function getDays(strDateStart,strDateEnd){
	var strSeparator = "-"; //日期分隔符
	var oDate1;
	var oDate2;
	var iDays;
	oDate1= strDateStart.split(strSeparator);
	oDate2= strDateEnd.split(strSeparator);
	var strDateS = new Date(oDate1[0], oDate1[1]-1, oDate1[2]);
	var strDateE = new Date(oDate2[0], oDate2[1]-1, oDate2[2]);
	iDays = parseInt(Math.abs(strDateS - strDateE ) / 1000 / 60 / 60 /24)//把相差的毫秒数转换为天数 
	return iDays ;
}

export function getHoursCha(strDateEnd){ 
	var date1=new Date();  //开始时间
	var date2=new Date(strDateEnd.split("-").join("/"));    //结束时间
	var date3=date2.getTime()-date1.getTime()  //时间差的毫秒数
	var leave1=date3%(24*3600*1000)    //计算天数后剩余的毫秒数
	var hours=Math.floor(leave1/(3600*1000));
	return hours;
}

//获取是星期几
export function getWeekDay(day){
    var weekDay = new Date(day).getDay();
    var currentDay = new Date().getDay();
    if(weekDay==currentDay){
        return "今天";
    }
    switch (weekDay) {
        case 0:
            return "星期日";
        case 1:
            return "星期一";
        case 2:
            return "星期二";
        case 3:
            return "星期三";
        case 4:
            return "星期四";
        case 5:
            return "星期五";
        case 6:
            return "星期六";
   }

}

// 截取字符串
export function GetQueryString(name) {
	let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
	let r = window.location.search.substr(1).match(reg); //真实环境请用这句
	if (r!==null) return (r[2]); return null;
}

//切割数组
export function sliceArr(data,n){
	var result = [];
	for(var i=0;i<data.length;i+=n){
		result.push(data.slice(i,i+n));
	}
	return result;
}
//判断是微信打开,还是其他浏览器打开
export function isLookInMic(){
	let ua = navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == "micromessenger") {
		return true;
	}else{
		return false;
	}
}

//处理手机上传获取不到文件类型的兼容问题
export function checkFileType(type, file, back) {
    /**
     * type png jpg mp4 ...
     * file input.change=> this.files[0]
     * back callback(boolean)
     */
    // http://www.garykessler.net/library/file_sigs.html
	var args = arguments;
    if (args.length != 3) {
        back(0);
    }
    var type = args[0]; // type = '(png|jpg)' , 'png'
    var file = args[1];
    var back = typeof args[2] == 'function' ? args[2] : function() {};
    if (file.type == '') {
        // 如果系统无法获取文件类型，则读取二进制流，对二进制进行解析文件类型
        var imgType = [
			//华为
			'ef bb bf 3c 3f 78 6d 6c 20 76 65 72',//doc
			'50 4b 3 4 a 0 0 0 0 0 87 4e', //docx xlsx
			'25 50 44 46 2d 31 2e 35 d a 25 b5',//pdf
			'3d 3d 3d 3d 3d 3d 3d 3d 3d 3d 3d 3d',//txt
			'd0 cf 11 e0 a1 b1 1a e1 0 0 0 0',//xls
            'ff d8 ff', //jpg
            '89 50 4e', //png

            // '0 0 0 14 66 74 79 70 69 73 6F 6D', //mp4
            // '0 0 0 18 66 74 79 70 33 67 70 35', //mp4
            // '0 0 0 0 66 74 79 70 33 67 70 35', //mp4
            // '0 0 0 0 66 74 79 70 4D 53 4E 56', //mp4
            // '0 0 0 0 66 74 79 70 69 73 6F 6D', //mp4

            // '0 0 0 18 66 74 79 70 6D 70 34 32', //m4v
            // '0 0 0 0 66 74 79 70 6D 70 34 32', //m4v

            // '0 0 0 14 66 74 79 70 71 74 20 20', //mov
            // '0 0 0 0 66 74 79 70 71 74 20 20', //mov
            // '0 0 0 0 6D 6F 6F 76', //mov

            // '4F 67 67 53 0 02', //ogg
			// '1A 45 DF A3', //ogg

			// '25 50 44 46',//pdf

			// 'ef bb bf 3c 3f 78 6d 6c 20 76 65 72',//doc
			// 'D0 CF 11 E0 A1 B1 1A E1',//DOC, DOT, PPS, PPT, XLA, XLS, WIZ
			// '50 4B 03 04 14 00 06 00',//DOCX, PPTX, XLSX
			
			// '0D 44 4F 43',//doc
			// '00 6E 1E F0',//ppt
			// '0F 00 E8 03',//ppt
			// 'A0 46 1D F0',//ppt
			// 'FD FF FF FF nn nn 00 00',//ppt

		];
		var typeName = ['.doc','.docx','.pdf','.txt','.xls','.jpg','.png']
        // var typeName = [ 'jpg', 'png', 'mp4', 'mp4', 'mp4', 'mp4', 'mp4', 'm4v', 'm4v', 'mov', 'mov', 'mov', 'ogg', 'ogg',
		// 	'pdf', 'doc', 'docx'
        // ];
        var sliceSize = /png|jpg|jpeg/.test(type) ? 3 : 12;
        var reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.addEventListener("load", function(e) {
            var slice = e.target.result.slice(0, sliceSize);
			reader = null;
            if (slice && slice.byteLength == sliceSize) {
                var view = new Uint8Array(slice);
				var arr = [];
                view.forEach(function(v) {
                    arr.push(v.toString(16));
				});

                view = null;
				var idx = imgType.indexOf(arr.join(' '));
                if (idx > -1) {
                    back(typeName[idx]);
                } else {
                    back(false);
                }
            } else {
                back(false);
            }

        });
    } else {
		var type = file.name.match(/\.(\w+)$/)[1];
        back(type);
    }
}

//添加水印
export function watermark(settings) {
    //默认设置
    var defaultSettings={
        watermark_txt: "数字人事+智税人才",
        watermark_x: -28,//水印起始位置x轴坐标
        watermark_y: 0,//水印起始位置Y轴坐标
        watermark_rows:10,//水印行数
        watermark_cols: 12,//水印列数
        watermark_x_space:0,//水印x轴间隔
        watermark_y_space:0,//水印y轴间隔
        watermark_color:'#000000',//水印字体颜色
        watermark_alpha:0.1,//水印透明度
        watermark_fontsize:'12px',//水印字体大小
        watermark_fontWeight:'bold',//水印字体加粗
        watermark_font:'微软雅黑',//水印字体
        watermark_width: 68,//水印宽度
        watermark_height: 68,//水印长度
        watermark_angle: 25//水印倾斜度数
    };
    //采用配置项替换默认值，作用类似jquery.extend
    if(arguments.length===1&&typeof arguments[0] ==="object" )
    {
		var src=arguments[0]||{};
        for(var key in src)
        {
            if(src[key]&&defaultSettings[key]&&src[key]===defaultSettings[key])
                continue;
            else if(src[key])
                defaultSettings[key]=src[key];
        }
	}
	
	// var oTemp = document.createDocumentFragment();
	var oTemp = document.createElement("div");
	oTemp.style.position = "fixed";
    oTemp.style.width= "100%";
    oTemp.style.height= "100%";
    oTemp.style.top= 0;
    oTemp.style.left= 0;
    // oTemp.style.zIndex= 1;
    oTemp.style.background= "#f5f5f5";
    //获取页面最大宽度
    var page_width = Math.max(document.body.scrollWidth,document.body.clientWidth);
    //获取页面最大长度
    var page_height = Math.max(document.body.scrollHeight,document.body.clientHeight);
    //如果将水印列数设置为0，或水印列数设置过大，超过页面最大宽度，则重新计算水印列数和水印x轴间隔
    if (defaultSettings.watermark_cols == 0 ||
   　　　　(parseInt(defaultSettings.watermark_x 
　　　　+ defaultSettings.watermark_width *defaultSettings.watermark_cols 
　　　　+ defaultSettings.watermark_x_space * (defaultSettings.watermark_cols - 1)) 
　　　　> page_width)) {
        defaultSettings.watermark_cols = 
　　　　　　parseInt((page_width
　　　　　　　　　　-defaultSettings.watermark_x
　　　　　　　　　　+defaultSettings.watermark_x_space) 
　　　　　　　　　　/ (defaultSettings.watermark_width 
　　　　　　　　　　+ defaultSettings.watermark_x_space));
        defaultSettings.watermark_x_space = 
　　　　　　parseInt((page_width 
　　　　　　　　　　- defaultSettings.watermark_x 
　　　　　　　　　　- defaultSettings.watermark_width 
　　　　　　　　　　* defaultSettings.watermark_cols) 
　　　　　　　　　　/ (defaultSettings.watermark_cols - 1));
	}
    //如果将水印行数设置为0，或水印行数设置过大，超过页面最大长度，则重新计算水印行数和水印y轴间隔
    if (defaultSettings.watermark_rows == 0 ||
   　　　　(parseInt(defaultSettings.watermark_y 
　　　　+ defaultSettings.watermark_height * defaultSettings.watermark_rows 
　　　　+ defaultSettings.watermark_y_space * (defaultSettings.watermark_rows - 1)) 
　　　　> page_height)) {
        defaultSettings.watermark_rows = 
　　　　　　parseInt((defaultSettings.watermark_y_space 
　　　　　　　　　　　+ page_height - defaultSettings.watermark_y) 
　　　　　　　　　　　/ (defaultSettings.watermark_height + defaultSettings.watermark_y_space));
        defaultSettings.watermark_y_space = 
　　　　　　parseInt((page_height 
　　　　　　　　　　- defaultSettings.watermark_y 
　　　　　　　　　　- defaultSettings.watermark_height 
　　　　　　　　　　* defaultSettings.watermark_rows) 
　　　　　　　　　/ (defaultSettings.watermark_rows - 1));
    }
    var x;
	var y;
    for (var i = 0; i < defaultSettings.watermark_rows; i++) {
        y = defaultSettings.watermark_y + (defaultSettings.watermark_y_space + defaultSettings.watermark_height) * i;
        for (var j = 0; j < defaultSettings.watermark_cols; j++) {
            x = defaultSettings.watermark_x + (defaultSettings.watermark_width + defaultSettings.watermark_x_space) * j;

            var mask_div = document.createElement('div');
            mask_div.id = 'mask_div' + i + j;
            mask_div.appendChild(document.createTextNode(defaultSettings.watermark_txt));
            //设置水印div倾斜显示
            mask_div.style.webkitTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
            mask_div.style.MozTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
            mask_div.style.msTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
            mask_div.style.OTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
            mask_div.style.transform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
            mask_div.style.visibility = "";
            mask_div.style.position = "absolute";
            mask_div.style.left = x + 'px';
            mask_div.style.top = y + 'px';
            mask_div.style.overflow = "hidden";
            mask_div.style.zIndex = "9999";
            //mask_div.style.border="solid #eee 1px";
            mask_div.style.opacity = defaultSettings.watermark_alpha;
            mask_div.style.fontSize = defaultSettings.watermark_fontsize;
            mask_div.style.fontWeight = defaultSettings.watermark_fontWeight;
            mask_div.style.fontFamily = defaultSettings.watermark_font;
            mask_div.style.color = defaultSettings.watermark_color;
            mask_div.style.textAlign = "center";
            mask_div.style.width = defaultSettings.watermark_width + 'px';
            mask_div.style.height = defaultSettings.watermark_height + 'px';
			mask_div.style.lineHeight = defaultSettings.watermark_height + 'px';
			mask_div.style.textAlign = 'right';			
            mask_div.style.display = "block";
			oTemp.appendChild(mask_div);
        };
	};
	var app = document.getElementById("app");
    app.appendChild(oTemp);
}

//根据某个属性进行排序
export function compare(property){
    return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
}
