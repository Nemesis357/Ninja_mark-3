$(document).ready(function() {
	var token = $("meta[name='_csrf']").attr("content");
	    var header = $("meta[name='_csrf_header']").attr("content");
	$(document).ajaxSend(function(e, xhr, options) {
	    xhr.setRequestHeader(header, token);
	  });
	
	$(document).on('click', '#submit' ,function(e){
//		self.className = 'loading';
		$(this).addClass("loading");
	    //this.removeEventListener('click',clickHandler,false);
	    e.preventDefault();
	    var self = this;
	    var form = $('#submitForm');
//	    var fdata = $("#submitForm").serialize();
	    var url = '/project-ninja/submit';
	    var data = $("#submitForm").serializeArray();
	    var readyData = JSON.stringify({"name" : data[0].value, "company" : data[1].value, "email" : data[2].value, "message" : data[3].value});
	    
	    
//	    $(function () {
//	    	 
//	    	  $(document).ajaxSend(function(e, xhr, options) {
//	    	    xhr.setRequestHeader(header, token);
//	    	  });
//	    	});
//	    
//	    JSON.stringify({"vocabularyName" : "a",
//	        "vocabularyDescription" : "b"}),
//	    data[i].action[0].href;
//	    console.log(data[0].value);
//	    console.log(data[1].value);
//	    console.log(data[2].value);
//	    console.log(data[3].value);
	    
	    console.log("Request data: " + readyData);
	    
	    $.ajax({
	    	headers: { 
	            'Accept': 'application/json',
	            'Content-Type': 'application/json' 
	        },
	        type: 'POST',
	        url: '/project-ninja/submit',
	        data: readyData,
	        async: true,
	        cache: false,
	        processData: true,
	        dataType: "json",
	        contentType: 'application/json',
	        success: function (response) {
//	        	console.log(data);
//	        	console.log("Data name: " + data.name);
//	        	console.log("Success... " + data);
	        	console.log("Success... ");
	        	console.log(response);
//	        	self.className = 'ready';
	        	$("#submit").addClass("ready");
	        },
	        error: function(data) {
//	        	console.log("Returned Data: " + data);
//	        	console.log(data);
	        	console.log("Failed: ");
//	        	console.log("Stringify: " + JSON.stringify(data))
	        },
	        done: function(data) {
				console.log("DONE");
			}
	    });
	    
//	    $.ajax({
//	        headers: { 
//	            'Accept': 'application/json',
//	            'Content-Type': 'application/json' 
//	        },
//	        'type': 'POST',
//	        'url': url,
//	        'data': JSON.stringify(data),
//	        'dataType': 'json',
//	        'success': function (data) {
//	        	console.log("Data name: " + data.name)
//	        	console.log("Success... " + fdata);
////	        	self.className = 'ready';
//	        	$(this).addClass("ready");
//	        },
//	        error:function() {
//	        	console.log("Failed... " + fdata);
//	        },
//	        done : function(e) {
//				console.log("DONE");
//			}
//	        });
	    
	    
	    
	    
	    
	    
	    
	    setTimeout(function(){
	        //self.className = 'loading';
	    },125);
	
	    setTimeout(function(){
	        //self.className = 'ready';
	    },4300);
	
	});
});