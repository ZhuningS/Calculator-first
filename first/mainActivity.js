define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	
	var results = "";
	var calresult = "";
	
	var lastkey="";//设置多一个全局变量存储上一个点击的值
	
	var re1=/^[\*|\/].+/;

	var re2=/.+[\*|\/]$/;
	
	var re3=/(\+|-|\*|\/)/;//增加一个正则运算判断是不是运算符号
	


	
	
	var flg=1;
	var results2="";		//两个全局变量flg和results2
	
	
	var Model = function(){
		this.callParent();
	};

	/* */

	/*1到9、加减乘除C button公用的单击事件 */

    Model.prototype.button1Click = function(event){
    	
    	var d;
    	d=event.source.label;
    	if(lastkey.match(re3)&&d.match(re3)){

            return;

        }
    		
    	lastkey=d;
    	results+=d;
    	$(this.getElementByXid("input1")).val(results);
   };
	


// =号,计算最终结果
	Model.prototype.resultscalcaulte = function(event){
		resultscaculate(results);
		
		var label = event.source.label;
       //连续= 号
		if(lastkey=="="&&label.match("=")){
         return;
       }
		 //正则表达式，判断算式是否合理，判断首尾是否*或/
	      
	      if (results.match(re1)||results.match(re2)) {

	    	  $(this.getElementByXid("input1")).val("输入错误");

	         results="";

	         return;

	      }
      //单个字符提示错误
		
	    if(results.length == 1 && results.match(re3)){
	    
	    $(this.getElementByXid("input1")).val("输入错误");
	    
	    results="";
	    
	    return;
	        
	    }
		$(this.getElementByXid("input1")).val(calresults);
	    
	    
	};
	
	
	
	

	Model.prototype.button13Click = function(event){
		button13Click();
		
		//+/-相反数要求的功能
        if (event.source.label()=="+/-"&&results!="") {

            if (flg==-1) {

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
		
		
	};
	
	

	
	Model.prototype.button15Click = function(event){
		button15Click();//百分号功能
		
		var label = event.source.label;
		
		if(results.length == 1 && results.match(re3)){
		
	    	$(this.getElementByXid("input1")).val("输入错误");
	    	
	    	results="";
	    	
	    	return;
	    }

		if (results.match(re1)||results.match(re2)) {
		
         $(this.getElementByXid("input1")).val("输入错误");
         
         results="";
         
         return;
      }
      if(lastkey =="%" || lastkey == "="){
      
    	  calresults = lastresult;  	  
    	  
      }
      else{
      
    	  calresults=eval(results);
    	  
    	  var test2 = calresults;
    	   
      }		
      		//除100
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




	function resultscaculate(results){
	
		calresults=eval(results);
      
		lastkey="=";
      
		lastresult = calresults;
      
		results="";

      lastkey="=";
	}




/*获取被点击的单元格的内容，以及c键的清除功能*/

    function calculater(){

        if (event.source.label()=="=") {

            return;

        }
        
             
        if (event.source.label()=="C") {

            results="";

            $(this.getElementByXid("input1")).val("0");

            return;

        }
        
        //多运算符号输入处理
        if(lastkey.match(re3)&&label.match(re3)){//代码已经替换

            return;

        }
        
              
        if(lastkey=="="&&label.match(re3)){  //按了等号运算后得到的结果继续运算

           results=calresults;

        }

        //+/-相反数要求的功能
        if (event.source.label()=="+/-"&&results!="") {

            if (flg==-1) {

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
        
        
       results+=event.source.label();

       $(this.getElementByXid("input1")).val(results);

       

    }

    


