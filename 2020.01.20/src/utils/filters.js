
let filters = {
  noDataTip: function (value) {
    if (!value) return '暂无';
    else return value;
  },
  noAssessTip: function (value) { 
    if (!value || value == '') return '此用户没有填写评价';
    else return value;
  },
  unescape:function (html) {
    return html
      .replace(html ? /&(?!#?\w+;)/g : /&/g, '&amp;')
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, "\"")
      .replace(/&#39;/g, "\'");  
  },
  formatDateTimeFilter: function(value){//过滤时间 yyyy:mm:dd hh:MM:ss
    if (!value||value=='') return '';
    else return formatDateTime(value);
  },
  formatFilter: function(value,type){
    if (!value||value=='') return '';
    else return format(value,type);
  },
  filterHotTag: function(value){
    var hotTag = value==0?'重要紧急':(value==1?'重要':(value==2?'紧急':(value==3?'常规':'')))
    return hotTag;
  },
  filterSecretTask: function(value){
    var hotTag = value==0?'普通任务':'私密任务'
    return hotTag;
  },
  uploadTag: function(name){//过滤上传的内容
    var index = name.lastIndexOf('.');
    name = name.substring(index+1);//获取文件的类型
    var imgUrl = '';
    imgUrl = name == 'jpg'||name == 'png'||name == 'jpeg'? 'image':
              name == 'pdf'?'upload-pdf-icon.png':
                name == 'doc'||name == 'docx'?'upload-doc-icon.png':
                  name == 'md'?'upload-md-icon.png':
                    name == 'ppt'||name == 'pptx'?'upload-ppt-icon.png':
                      name == 'xls'||name == 'xlsx'?'upload-xlsx-icon.png':'upload-txt-icon.png';
    return imgUrl=='image'?true:imgUrl;
  },
  isNotAmount: function(value){
    return value?value:0;
  },
  dealHttp: function(oUrl){
    if(oUrl.indexOf(":")>-1){
      var oUrlArr = oUrl.split(":");
      oUrl = oUrlArr[oUrlArr.length-1]
      var idx = oUrl.indexOf("/")
      oUrl = oUrl.substring(idx);
    }
    return oUrl;
  },
  compareSort: function compare(property){
      return function(a,b){
          var value1 = a[property];
          var value2 = b[property];
          return value1 - value2;
      }
  }
}
export default filters;

//时间处理
function  formatDateTime(date) {
  if(typeof date == 'string'&& date.indexOf("-")>-1){//主要是ios的兼容问题
    date = date.split("-").join("/") 
  }
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
  var endTime = y + '-' + m + '-' + d;
  // return y + '-' + m + '-' + d+' '+ h +':' + minute + ':' + second;  
	return endTime;  
};  

//有类型的时间分类
function format(time, format){
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