<script src="https://code.jquery.com/jquery-1.9.1.js"></script>
  <style>
  	input{
  		width:300px;
  		font-size:15px;
  		margin:2px 0;
  		padding:2px 5px;
        font-family:Microsoft YaHei UI Light;
  	}
    option{
    	font-family:Microsoft YaHei UI Light;
        
    }
    div{
    	font-family:Microsoft YaHei UI Light;
    }
    button{
    	font-family:Microsoft YaHei UI Light;
    }
  </style>
<div align="center">
  想查的系所：<select id="department"><br/> 
  	  <option value="不分系">不分系</option>
    <option value="管理與社科學院">管理與社科學院</option>
    <option value="規設院">規設院</option>
    <option value="文學院">文學院</option>
    <option value="生科院">生科院</option>
    <option value="醫學院">醫學院</option>
    <option value="理學院">理學院</option>
    <option value="工學院">工學院</option>
    <option value="電資學院">電資學院</option>
    </select>    
  <button id="sendBtn">查詢</button><br/>
  </div>
  <div id="show"></div>
  <p id="list"></p><br/>
  <div id="pageviewer" align="center"></div>
  <p align="center">
  <button id="pageup" >上一頁</button>
  <button id="pagedown">下一頁</button>
  </p>
  
  <script>
  var appUrl = 'https://script.google.com/macros/s/AKfycbwLqvdaNaGTgeihtpNLJxs7DwXHmkPFLcTz5fpYp01uaWdxu2V0/exec',
  	sheetsUrl = 'https://docs.google.com/spreadsheets/d/1KOg3tHptHW-6N3Xwb4_Sax7FFjmTNCl-Jz7ecLPfYjA/edit?usp=sharing',
    sheetName = $('#sheetName'),
    startRow = 2,
    startColumn = 1,
    endRow = 1,
    endColumn = 7,
    where = 1,
    sheetName=$('#department'),
    sendBtn = $('#sendBtn'),
    list = $('#list'),
    pageup= $('#pageup'),
    pagedown = $('#pagedown'),
    pageviewer = $('#pageviewer'),
    show = $('#show');
  var topic = new Array("申請學年:  ","轉出科系:  ","轉入科系:  ","有無備審:  ","有無必先修科目:  ","申請時成績:  ","心得:  ");
  var parameter = {};  
  var output;
  pageup.hide();
  pagedown.hide();
  sendBtn.on('click',function(
  ) {
    parameter = {
      url: sheetsUrl,
      name: sheetName.val(),
      startRow: 2,
      startColumn: 1,
      endRow: 0,
      endColumn:7
    };
	  $.get(appUrl, parameter, function(data) {
where=1;
	  	if(!data){
	    	output='無資料';
	  	}else{
            output=data.split(',');
            var fulldata="";
            pagedown.show();
            pageviewer.html("第"+where+"筆心得，共"+output.length/7+"筆");
            for(var i=0;i<1;++i){
            	for(var j=0;j<7;++j)
            		fulldata+="<br/>"+topic[j]+output[i*7+j];
            	show.html(fulldata);
            	fulldata+="<br/>";
	  		}
            var content="";
            for(var i=0;i<output.length/7;++i){
            	content=content+"<button>"+output[i*7+1]+"<br/>"+output[i*7+5]+"</button>";
				list.html(content);
            }
        }
	  });
  });
  pageup.on('click',function() {
  			if(where>1){
            	where--;
  				show.fadeOut("slow",function(){
            		var fulldata="";
            			for(var j=0;j<7;++j)
            				fulldata+="<br/>"+topic[j]+output[(where-1)*7+j];
            			show.html(fulldata);
            			fulldata+="<br/>";});
            	show.fadeIn("slow");
                if(where==1)
                	pageup.hide();
                if(where==output.length/7-1)
                	pagedown.show();
                pageviewer.html("第"+where+"筆心得，共"+output.length/7+"筆");
            }
            
  });
   pagedown.on('click',function() {
  			if(where < output.length/7){
            	where++;
  				show.fadeOut("slow",function(){
            		var fulldata="";
            			for(var j=0;j<7;++j)
            				fulldata+="<br/>"+topic[j]+output[(where-1)*7+j];
            			show.html(fulldata);
            			fulldata+="<br/>";});
            	show.fadeIn("slow");
                if(where==2)
                	pageup.show();
                if(where==output.length/7)
                	pagedown.hide();
                pageviewer.html("第"+where+"筆心得，共"+output.length/7+"筆");
            }
            
  });
  </script>



