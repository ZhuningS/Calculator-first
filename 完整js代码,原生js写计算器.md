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
    //��*��/��ͷ
    var re1=/^[\*|\/].+/;
    //��*��/��-��+��β
    var re2=/.+[\*|\/|\+|\-]$/;
    // /*-+�е�ĳһ��
    var re3=/(\+|-|\*|\/)/;
    
    //���� = �� %��֮��ķ���
	Model.prototype.buttonClick = function(event){
	   var lab = event.source.label;
	   //����
	   if (lab =="C") {
           results="";
           $(this.getElementByXid("input1")).val("0");
           return;
       }
//      ���������һ�������������ţ�����һ����ʾ�Ͳ�����������š�
       if(lastkey.match(re3)&&lab.match(re3)){
           return;
       }
//       ���˵Ⱥ������õ��Ľ����������
       if(lastkey=="="&&lab.match(re3)){
          results=calresults;
       }
       if(lastkey=="="&&lab.match("=")){
          results = results;
       }
       //�෴������
       if (lab=="+/-"&&results!="") {
            if (flg==-1) {
//            .match()������ǰ��������string���ͱ����ıȽ�
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
// ���� =  ��  %�ķ���
	Model.prototype.result = function(event){
		var lab = event.source.label;
       //���� = �ŵ����
		if(lastkey=="="&&lab.match("=")){
         return;
       }
//       ����������ŷǷ����������
	    if(results.length == 1 && results.match(re3)){
	    	$(this.getElementByXid("input1")).val("�������");
	    	results="";
	    	return;
	    }
//      ��*/��ͷ������/*-+��β�������ʽ����	    
		if (results.match(re1)||results.match(re2)) {
         $(this.getElementByXid("input1")).val("�������");
         results="";
         return;
      }
//      eval()������������
		calresults=eval(results);
		$(this.getElementByXid("input1")).val(calresults);
		lastkey="=";
		lastresult = calresults;
        results="";
	};

	Model.prototype.hundredSign = function(event){
//	���ڰٷֺŲ��ܶ���ʽ�������㣬�������һ�� = ������
		var lab = event.source.label;
		//       ����������ŷǷ����������
	    if(results.length == 1 && results.match(re3)){
	    	$(this.getElementByXid("input1")).val("�������");
	    	results="";
	    	return;
	    }
//      ��*/��ͷ������/*-+��β�������ʽ����	    
		if (results.match(re1)||results.match(re2)) {
         $(this.getElementByXid("input1")).val("�������");
         results="";
         return;
      }
      if(lastkey =="%" || lastkey == "="){
    	  calresults = lastresult;  	  
      }
      else{
      //      eval()������������
    	  calresults=eval(results);
    	  var test2 = calresults;
    	   
      }		
//		�ٷֱȹ���
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
