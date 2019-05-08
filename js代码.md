define(**function**(require){

​    **var** $ = require("jquery");

​    **var** justep = require("$UI/system/lib/justep");

​    

​    **var** results="";

​    **var** calresults="";

​    

​    **var** Model = **function**(){

​       **this**.callParent();

​    };

 

​    /* */

 

 

 

/*获取被点击的单元格的内容*/

 

​    **function** calculater(){

 

​        **if** (event.source.label()=="=") {

 

​            **return**;

 

​        }

​        

​        **if** (event.source.label()=="c") {

 

​            results="";

 

​            display.innerText="0";

 

​            **return**;

 

​        }

 

​        

​       results+=event.source.label();

 

​       display.innerText=results;

 

​       

 

​    }

 

​    **function** resultscalcaulte(){

 

​      calresults=eval(results);

 

​      display.innerText=calresults;

​      

​      //正则表达式，判断首尾是否*或/

​      **var** re1=/^[\*|\/].+/;

 

​      **var** re2=/.+[\*|\/]$/;

 

​      **if** (results.match(re1)||results.match(re2)) {

 

​         display.innerText="输入错误";

 

​         results="";

 

​         **return**;

 

​      }

 

​      

 

​    }

 

​    /*1到9、加减乘除button公用的单击事件 */

 

​    Model.prototype.button1Click = **function**(event){

​     **var** label = event.source.label;//当前label

​     **var** input = $(**this**.getElementByXid("input1"));

​     input.val(label);

​     

​    };

 

​    Model.prototype.button13Click = **function**(event){

​       button13Click();

​    };

 

​    Model.prototype.resultscalcaulte = **function**(event){

​       resultscalcaulte();

​    };

 

​    Model.prototype.button15Click = **function**(event){

​       button15Click();

​    };

 

​    **return** Model;

});

 