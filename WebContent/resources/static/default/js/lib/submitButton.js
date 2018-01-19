$(document).ready(function() {
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	var canSubmit = false;
	$(document).ajaxSend(function(e, xhr, options) {
	  xhr.setRequestHeader(header, token);
	});
	
	// Contact form on focus logic
	$(document).on('focusin', '#formWindow input, #formWindow textarea', function(event) {
		$(this).siblings("label").addClass("label-move");
	})
	
	$(document).on('focusout', '#formWindow input, #formWindow textarea', function() {
		
		if( $(this).val() == "" ) {
			$(this).siblings("label").removeClass("label-move");
		}
		
		validateForm(event)
	})
	
	// Contact form on key up logic
	$(document).on('keyup', '#formWindow input, #formWindow textarea', function(event) {
		validateForm(event)
	})
	
	// Validation logic
	function validateForm(event){
		
	    var nameReg = /[A-Za-z]/;
	    var numberReg =  /^[0-9]+$/;
	    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

	    var names = $('#name').val();
	    var email = $('#email').val();
	    var message = $('#message').val();
	    
	    if( event.target.id == "name") {
	    	if ( $('#name').val() === "" || !nameReg.test($('#name').val()) ) {
	    		$(event.target).closest(".formField").addClass("errorVal");
		    	$("#submit").addClass("submitDisable");
		    } else {
		    	$(event.target).closest(".formField").removeClass("errorVal");
		    }
	    }
	    
	    if ( event.target.id == "email") {
	    	if ( $('#email').val() === "" || !emailReg.test($('#email').val()) ) {
	    		$(event.target).closest(".formField").addClass("errorVal");
		    	$("#submit").addClass("submitDisable");
		    } else {
		    	$(event.target).closest(".formField").removeClass("errorVal");
		    }
	    }
	    
	    if ( event.target.id == "message") {
	    	if ( $('#message').val() === "" ) {
	    		$(event.target).closest(".formField").addClass("errorVal");
		    	$("#submit").addClass("submitDisable");
		    } else {
		    	$(event.target).closest(".formField").removeClass("errorVal");
		    }
	    }
	    
	    if( !$(".formField").hasClass("errorVal") && $('#name').val() != "" && $('#email').val() != "" && $('#message').val() != "" ) {
			console.log("No errors!")
			
			canSubmit = true;
			$("#submit").removeClass("submitDisable");
		} else {
			canSubmit = false;
			$("#submit").addClass("submitDisable");
		}
	    
	}   
	
	// Rendering results returnd from database
	function renderData(id, name, company, email, message){
		$(".ninjaContainer").append("<div class='ninja'>" +
				"<div class='ninjaId' data-ref="+id+">Id: " + id + "</div>" +
						"<div class='ninjaName' data-ref="+name+">Name: " + name + "</div>" +
								"<div class='ninjaCompany' data-ref="+company+">Company: " + company + "</div>" +
										"<div class='ninjaEmail' data-ref="+email+">Email: " + email + "</div>" +
												"<div class='ninjaMessage' data-ref="+message+">Message: " + message + "</div>" +
														"<span class='ninjaDelete' data-ref="+id+"><i class='fa fa-trash-o' aria-hidden='true'></i></span>" +
														"</div>");
	}
	
	// Submit button logic
	$(document).on('click', '#submit' ,function(e){
		e.preventDefault();
		
		if ( $(this).hasClass("submitDisable") && !canSubmit ) {
			console.log("Submit clicked... inside control, hasClass!");
			return false;
		}
		
		if( !$(".formField").hasClass("errorVal") && $('#name').val() != "" && $('#email').val() != "" && $('#message').val() != "" ) {
			console.log("All systems are a GO!");
		} else {
			console.log("no GO!");
			$("#submit").addClass("submitDisable");
			return false;
		}
		
		$(this).addClass("stand-by");
		$(this).text("Sending");
		
	    
	    var self = this;
	    var form = $('#submitForm');
	    var url = '/project-ninja-mk-1/submit';
	    var data = $("#submitForm").serializeArray();
	    var readyData = JSON.stringify({"name" : data[0].value, "company" : data[1].value, "email" : data[2].value, "message" : data[3].value});
	    
	    $.ajax({
	    	headers: { 
	            'Accept': 'application/json',
	            'Content-Type': 'application/json' 
	        },
	        type: 'POST',
	        url: url,
	        data: readyData,
	        async: true,
	        cache: false,
	        processData: true,
	        dataType: "json",
	        contentType: 'application/json',
	        success: function (response) {
	        	$("#submit").addClass("sent").removeClass("stand-by");
	        	$("#submit").text("Sent").append("<i class='fa fa-check' aria-hidden='true'></i>");
	        	$("#formWindow input, #formWindow textarea").val("");
	        	$("#submitForm label").removeClass("label-move");
	        	console.log(response);
	        	setTimeout( function(){ 
	        		$("#submit").removeClass("error sent stand-by");
	        		$("#submit").text("Submit");
	        		$("#submit i").remove();
	        		$("#submit").addClass("submitDisable");
	        	  }  , 3000 );
	        },
	        error: function(data) {
	        	$("#submit").removeClass("error sent stand-by");
        		$("#submit").text("Try again");
        		$("#submit i").remove();
        		$("#submit").addClass("submitDisable");
	        	console.log("Failed");
	        	console.log(data)
	        	
	        	setTimeout( function(){ 
	        		$("#submit").removeClass("error sent stand-by");
	        		$("#submit").text("Error");
	        		$("#submit i").remove();
	        	  }  , 3000 );
	        },
	    });
	    
	});
	
	// List button logic
	$(document).on('click', '#listMessages' ,function(e){
		e.preventDefault();
		$(this).addClass("stand-by");
		$(this).text("Sending");
		var self = this;
	    
	    var url = '/project-ninja-mk-1/listMessages';

	    console.log("1");
	    
	    $.ajax({
//	    	beforeSend: function (xhr) {xhr.setRequestHeader('Content-Type', 'application/json');},
//	    	headers: { 
//	            'Accept': 'application/json',
//	            'Content-Type': 'application/json' 
//	        },
//	    	headers: {'X-Requested-With': 'XMLHttpRequest'},
	        type: 'POST',
	        url: url,
//	        dataType: 'jsonp',
	        async: true,
	        cache: false,
	        processData: true,
	        contentType: 'application/json',
	        success: function (data) {
	        	$("#listMessages").addClass("sent").removeClass("stand-by");
	        	
	        	$("#listMessages").text("Listed: ").append("<span class='listedLength'>" + data.length + "</span><i class='fa fa-check' aria-hidden='true'></i>");
//	        	$("#listMessages").append("<span class='listedLength'>" + data.length + "</span>");
	        	
	        	
	        	$("#site-content").append("<div class='ninjaList'> <div class='ninjaContainer'>");
	        	
	        	for (i = 0; i < data.length; i++ ) {
	        		renderData(data[i].id, data[i].name, data[i].company, data[i].email, data[i].message);
	        	}
	        	
	        	$("#site-content").append("</div> </div>");
	        	console.log(data);
	        },
	        error: function(data) {
	        	$("#listMessages").addClass("error").removeClass("stand-by");
	        	$("#listMessages").text("Error").append("<i class='fa fa-exclamation-triangle' aria-hidden='true'></i>");
	        	console.log("Failed");
	        	console.log(data);
	        	setTimeout( function(){ 
	        		$("#listMessages").removeClass("error sent stand-by");
	        		$("#listMessages").text("Try again");
	        		$("#listMessages i").remove();
	        	  }  , 3000 );
	        },
	    });
	    
	});
	
	// Delete button logic
	$(document).on('click', '.ninjaDelete' ,function(e){
		
	    var url = '/ninjaDelete';
	    var readyData = JSON.stringify({"id" : $(this).data('ref')});
	    $(this).parent().addClass("deletedNinja");
	    
	    $.ajax({
	    	headers: { 
	            'Accept': 'application/json',
	            'Content-Type': 'application/json' 
	        },
	        type: 'POST',
	        url: url,
	        data: readyData,
	        async: true,
	        cache: false,
	        processData: true,
	        dataType: "json",
	        success: function (response) {
//	        	$(".deletedNinja").slideUp(1000);
	        	
	        	$(".deletedNinja").remove();
	        	$(".listedLength").text($(".ninja").length);
	        },
	        error: function(data) {
	        	console.log("Failed");
	        },
	    });
	    
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
});