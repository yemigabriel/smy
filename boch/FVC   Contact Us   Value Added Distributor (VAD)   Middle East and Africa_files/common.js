// JavaScript Document

// FORMS 
function validate_form(frm) {
	$form = $(frm);
	var proceed = true;
	$form.find('.error').removeClass('error');
	$form.find('.required').not('.hidden').each(function(i){
		$field = $(this);
		
		
		if($field.attr('type')=='checkbox') {
			if(!$field.is(":checked")) { 
				show_error($field,$field.attr('data-text'));
				proceed = false;
				return false;
			}
		} else { 
			if($field.val()=='') { 
				show_error($field,$field.attr('data-text'));
				proceed = false;
				return false;
			}
		}
	});
	
	if(proceed)
	{
		$form.find('.email').not('.hidden').each(function(i){
			
			$field = $(this);
			var a = $field.val();
		
			var filter = /^((\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*?)\s*;?\s*)+/;
			if(!filter.test(a)){
				show_error($field,$field.attr('data-text'));
				proceed = false;
				return false;
			}
	
		});
	}
	
	if(proceed)
	{
		
		$form.find('.url').not('.hidden').each(function(i){
			
			$field = $(this);
			var a = $field.val();
			
		  var urlregex = new RegExp(
				"^(http:\/\/www.|https:\/\/www.|ftp:\/\/www.|www.){1}([0-9A-Za-z]+\.)");
			if(!urlregex.test(a)){
				show_error($field,$field.attr('data-text'));
				proceed = false;
				return false;
			}
			
		});		
	}
	
	return proceed;
}
function show_error(obj,msg) { 

	$.noty.clearQueue();
	$.noty.closeAll();
	$(obj).focus();
	$(obj).addClass('error');
	hide_loader();
	noty({ type: "error",text: msg, speed: 400, layout: 'bottom', timeout: 4000});
} 
function show_loader() { 
	$(".common-loader").fadeIn(100);	
}
function hide_loader() { 
	$(".common-loader").fadeOut(100);	
}
function scroll_to_top()
{
	$('html, body').animate({ scrollTop: $('header.head').offset().top }, 500);
	return false;
}
function open_pop(url,win_name,height,width) {
	window.open(url,win_name,'width='+width+',height='+height+',fullscreen=0,location=0,menubar=0,resizable=0,scrollbars=0,toolbar=0,status=1');	
}


$.fn.equalize = function(callback) {
		var maxHeight = 0;
		this.each(function(){
			if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
		});
		this.filter(':last').addClass('last-child');
		this.css('height', maxHeight); //find('div');
		if (typeof callback == "function") { callback(); }
		return this;
	}


$.fn.centerlargeimg = function(callback)
{
	this.each(function(){
		
		var img_width = $(this).width();
		var img = $(this);
		var img_container_width = $(this).parent().width();
		//img.css({"position":"absolute"});
		//img.parent().css({"position":"relative"});

		console.log(img_width + " - " +img_container_width)
		if(img_width>img_container_width)
		{
			var diff = img_width - img_container_width;
			console.log(diff);
			img.css("margin-left",-1*(diff/2));
			//img.css("left",-1*(diff/2));
			

		}
		else
		{
			//img.css("margin-left","-50%");
			//img.css("left","50%");
		}
		
	});
}





// ONLY JS CODE THAT BELONG TO WHOLE SITE
$(document).ready(function() {

	$('.open_new_window').on('click',function(evt) {
		window.open($(this).attr('href'),'_blank');
		evt.preventDefault();
		return false;
	});
	$('.noclick').click(function() {
		return false;
	});
	$('.scrolltop').click(function() {
		scroll_to_top();
	});
	

	// $('.show_more').on('click',function() {		
	// 	var rel = $(this).attr('rel');
	// 	if($('#'+rel+'_more').is(':visible'))
	// 	{
	// 		$('#'+rel+'_more').css('display','none');
	// 		$(this).text('+ More ...');	
	// 	}
	// 	else
	// 	{
	// 		$('#'+rel+'_more').css('display','block');
	// 		//$('#'+rel+'_more').show('fast');
	// 		$(this).text('- Less ...');	
	// 	}
	// 	$(this).css('color','#333');
	// 	return false;
	// });
	
	//APPLY FOCUS ON EACH INPUT FIELD
	$("input, select, textarea").on('focus', function() {
	  $(this).addClass('focus');
	});
	$("input, select, textarea").on('blur', function() {
	  $(this).removeClass('focus');
	});





	// End General Functions
});