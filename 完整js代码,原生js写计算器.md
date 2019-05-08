define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	
	var Model = function(){
		this.callParent();
	};
	var results="";
    var results2="";
    var calresults="";
    var lastkey="";
    var lastresult;
    var flg=1;
    //以*，/开头
    var re1=/^[\*|\/].+/;
    //以*，/，-，+结尾
    var re2=/.+[\*|\/|\+|\-]$/;
    // /*-+中的某一个
    var re3=/(\+|-|\*|\/)/;
    
    //除了 = 和 %键之外的方法
	Model.prototype.buttonClick = function(event){
	   var lab = event.source.label;
	   //清屏
	   if (lab =="C") {
           results="";
           $(this.getElementByXid("input1")).val("0");
           return;
       }
//      设置如果上一个点击是运算符号，那下一个显示就不能是运算符号。
       if(lastkey.match(re3)&&lab.match(re3)){
           return;
       }
//       按了等号运算后得到的结果继续运算
       if(lastkey=="="&&lab.match(re3)){
          results=calresults;
       }
       if(lastkey=="="&&lab.match("=")){
          results = results;
       }
       //相反数功能
       if (lab=="+/-"&&results!="") {
            if (flg==-1) {
//            .match()方法的前提是两个string类型变量的比较
               results=String(results2);
               $(this.getElementByXid("input1")).val(results);
               flg=-flg;
               return;
            }
               results2=results;
               results = "-"+"("+results+")";
               flg=-flg;
               $(this.getElementByXid("input1")).val(results);
            return;  
        }
	    results+= lab;
	    lastkey=lab;   
	   $(this.getElementByXid("input1")).val(results);
//       display.innerText=results; 
	};
// 用于 =  和  %的方法
	Model.prototype.result = function(event){
		var lab = event.source.label;
       //连按 = 号的情况
		if(lastkey=="="&&lab.match("=")){
         return;
       }
//       单个运算符号非法输入的问题
	    if(results.length == 1 && results.match(re3)){
	    	$(this.getElementByXid("input1")).val("输入错误");
	    	results="";
	    	return;
	    }
//      以*/开头或者以/*-+结尾的输入格式错误	    
		if (results.match(re1)||results.match(re2)) {
         $(this.getElementByXid("input1")).val("输入错误");
         results="";
         return;
      }
//      eval()函数用于运算
		calresults=eval(results);
		$(this.getElementByXid("input1")).val(calresults);
		lastkey="=";
		lastresult = calresults;
        results="";
	};

	Model.prototype.hundredSign = function(event){
//	由于百分号不能对算式进行运算，必须进行一次 = 号运算
		var lab = event.source.label;
		//       单个运算符号非法输入的问题
	    if(results.length == 1 && results.match(re3)){
	    	$(this.getElementByXid("input1")).val("输入错误");
	    	results="";
	    	return;
	    }
//      以*/开头或者以/*-+结尾的输入格式错误	    
		if (results.match(re1)||results.match(re2)) {
         $(this.getElementByXid("input1")).val("输入错误");
         results="";
         return;
      }
      if(lastkey =="%" || lastkey == "="){
    	  calresults = lastresult;  	  
      }
      else{
      //      eval()函数用于运算
    	  calresults=eval(results);
    	  var test2 = calresults;
    	   
      }		
//		百分比功能
			if(results != ""){
				results = String(calresults/100);	
			}
			else{
				results = String(calresults/100);	
			}
		$(this.getElementByXid("input1")).val(results);
		lastkey="%";
		lastresult = results;
        results="";
	};
	return Model;
});
