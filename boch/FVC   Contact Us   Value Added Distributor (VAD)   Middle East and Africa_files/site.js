
$(function() {
$(document).ready(function() {
	$(document).foundation();
});

	//handler for opening menu on devices
	$('.open-menu').on('click',function(e) {
		e.preventDefault();
		if($(this).hasClass('open')) {
			$('.nav').slideUp('fast');
			$(this).removeClass('open');	
		} else {
			$('.nav').slideDown('fast');
			$(this).addClass('open');	
		}
	});	
	
	//hack for apple to remove address bar
	setTimeout(function(){ 
		window.scrollTo(0, 1);
	}, 0);
	
	//tabs homepage
	$('.tab-link-container').each(function(){ 
		var $active, $content, $links = $(this).find('a');
		$active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
		$active.addClass('active');
		$content = $($active.attr('href'));
		$links.not($active).each(function () {
			$($(this).attr('href')).hide();
		});
		$links.click(function(e) {
			e.preventDefault();		
			if($(this).attr('href') != $active.attr('href')) {
				$active.removeClass('active');
				$content.hide();
				
				$active = $(this);
				$content = $($(this).attr('href'));
				
				$active.addClass('active');
				$content.show();	
			}
		});
	});

	// Fancy Dropdown
	$(".fancy-dropdown select").change(function(){
	    var text = $(this).find("option:selected").text();
	    $(this).parent().find(".active-option").text(text);
	});
	$(".fancy-dropdown select").each(function() {
        var text = $(this).find("option:selected").text();
        $(this).parent().find(".active-option").text(text);
    });

	$("#header_search_1, #header_search_2").submit(function() {
			var error = false;
			var field = $(this).find('.required');

			if(field.val() == "")
			{
				show_error(field,field.attr('data-text'));
				error = true;
			}
            if(error)
            {
            	return false;
            }
            else {
            	return true;
            }

     });


	$(".back-to-top").on('click','a',function(e) {
		e.preventDefault();
		scroll_to_top();
	});
	//$(".dropdown-menu span.img img").imgCenter({scaleToFit:false, parentSteps:1});
});