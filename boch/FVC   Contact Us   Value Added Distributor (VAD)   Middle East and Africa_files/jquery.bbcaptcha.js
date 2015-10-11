/*
SLIDE TO CAPTCHA PLUGIN
Author: Fakhruddin Zakiuddin
Company: Blue Beetle
Created on: 13.Mar.2014

Notes: 
- Make sure the form has the class 'bbc-form'
- Define other arguments as data attributes
*/

;(function ( $, window, undefined ) {
 
    $.fn.bbcaptcha = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({

            // These are the defaults.
            bbcSlider: this,
            bbcSliderHandle: null,
            bbcSliderText: null,
            bbcForm: $(".bbc-form"),
            bbcKeyField: $(".bbc-form").find("input[name=bb_captcha_key]"),
            bbcURL: $(".bbc-form").data('bbc-url'),
            bbcSlideText: $(".bbc-form").data('bbc-slide-text'),
            bbcSubmittingText: $(".bbc-form").data('bbc-submitting-text'),
            bbcArrow: $(".bbc-form").data('bbc-arrow'),
            bbcRTL: $(".bbc-form").data('bbc-rtl')

        }, options );


        // validate the form
        var validate_form = function(frm) {
            // console.log("calling this validate form");
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

        // submit the form
        var submitForm = function(form) {
        
            if(!validate_form(form)) {

                // bbcSlider.slider( "enable" );
                settings.bbcSliderHandle.animate({
                    // opacity: op*0.01,
                    backgroundColor: "rgb( 50, 20, 0 )"
                },250);

                settings.bbcSlider.slider( "value", 0 );

                return false;
            }

            settings.bbcSliderText.text(settings.bbcSubmittingText);
            settings.bbcSlider.slider('disable');

            // set the captcha value at the start
            $.post(settings.bbcURL,function(data){
                // console.log('captcha key: '+data);
                // console.log(settings.bbcKeyField);
                settings.bbcKeyField.val(data);
                
                form.submit();
            });

        }
        

        // call the slider
        settings.bbcSlider.slider({
            animate: "250",
            max: 100,
            isRTL: settings.bbcRTL,
            create: function( event, ui ) {
                settings.bbcSlider.append('<span class="text"></span>');
                settings.bbcSliderText = settings.bbcSlider.find('.text');
                settings.bbcSliderHandle = settings.bbcSlider.find('.ui-slider-handle');
                settings.bbcSliderHandle.text(settings.bbcSlideText);
            },
            stop: function( event, ui ) {
                // console.log(ui.value);
                if(ui.value==100) {
                    submitForm(settings.bbcForm);
                }
            },
            slide: function( event, ui ) {
                
                var red = 187-ui.value;
                var green = ui.value+42;
                
                settings.bbcSliderHandle.animate({
                    // opacity: op*0.01,
                    backgroundColor: "rgb( "+red+", "+green+", 11 )"
                },250);
                
            }
        });
    };
 
}( jQuery ));