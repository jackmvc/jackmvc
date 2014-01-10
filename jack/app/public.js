(function($){
'use strict';

	//Creating app namespace object
	window.App      = {};
    App.Asset       = new Jack.Asset({defaults : {"location"  : "http://www.mekanzii.com/"}});

    //Load Helpers
    Jack.use('App.Helpers.Helper');
    window.Helpers  = new App.Helpers.Shortcut;
    Helpers.Handle  = new App.Helpers.Handle; 
    Helpers.Plugin  = new App.Helpers.Plugin;
    
	/* App Public Kurucu Methodlar */
	Jack.Construct("App.Public", { 
		initialize : function(){
            Helpers.Plugin.uniform();
            Helpers.Plugin.validate();
            
			new this.Login.index("body");
		}
	},{});
	
	/* App Login index Kontrolleri */
	Jack.Control("App.Public.Login.index", {
		init : function(){
			this.login();
		},
		"login" : function(){
			var self    = this;
			var form    = this.element.find("form.singin");
            var error   = form.find('.errors');
			form.find("input.email").focus()

			form.validate({
	            submitHandler: function() {
                    
                    Helpers.formLoading("start", form);
                    
					App.Public.Login.model.index.findOne(Jack.deparam(form.serialize()), function(response){

                        if (response.status == "success"){
                            return window.location = response.redirect;
                        }else{
                            form.find("input.password").val("").focus();
                            error.find(".text-danger").html(response.message);
                            error.show();
                        };
                        
                        Helpers.formLoading("end", form);
					});
				}
			});	
		},
        "form keypress" : function(el){
            el.find(".errors").hide("slow"); 
        },
		"forget" : function(){
			this.element.find('form.forget').validate({
	            submitHandler: function() {return false;}
			});		
		},
		"register" : function(el){
			this.element.find('form.register').validate({
	            submitHandler: function() {return false;}
			});	
		},
		".forget-password a click" : function(el, ev){
			ev.preventDefault();
			this.element.find('form.singin').hide();
	    	this.element.find('form.forget').show().find("input.email").focus();
			this.forget();
		},
		".create-account a click" : function(el, ev){
			ev.preventDefault();
			this.element.find('form.singin').hide();
	    	this.element.find('form.register').show().find("input.username").focus();
			this.register();
		},
		"form.forget button.back click" : function(el, ev){
			ev.preventDefault();
			this.element.find('form.singin').show().find("input.email").focus();
	    	this.element.find('form.forget').hide();
		},
		"form.register button.back click" : function(el, ev){
			ev.preventDefault();
	    	this.element.find('form.login').show().find("input.email").focus();
	    	this.element.find('form.register').hide();	
		}
	});
	
    /* App Login index Modeli */
	Jack.Model("App.Public.Login.model.index", {
		findOne : "POST /admin/login" 
	},{});
	
})(jQuery);