$(document).ready(function() {
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	$(document).ajaxSend(function(e, xhr, options) {
	  xhr.setRequestHeader(header, token);
	});
	
	$(document).on('click', '#submit' ,function(e){
		$(this).addClass("stand-by");
		$(this).text("Sending");
		
	    e.preventDefault();
	    var self = this;
	    var form = $('#submitForm');
	    var url = '/project-ninja/submit';
	    var data = $("#submitForm").serializeArray();
	    var readyData = JSON.stringify({"name" : data[0].value, "company" : data[1].value, "email" : data[2].value, "message" : data[3].value});
	    
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
	        	$("#submit").addClass("sent").removeClass("stand-by");
	        	$("#submit").text("Sent").append("<i class='fa fa-check' aria-hidden='true'></i>");
	        },
	        error: function(data) {
	        	console.log("Failed: ");
	        },
	        done: function(data) {
				console.log("DONE");
			}
	    });
	    
	});
});