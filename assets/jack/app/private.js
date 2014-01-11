(function($){
'use strict';
    window.App     = {};
    
	/*App Construct Initialize*/
	Jack.Construct("App.Private", { 
        layout : ".ajax-content",
		init : function(){	      
		  
        	//Creating app namespace object
            App.History    = new Jack.History(".ajaxify", {defaults : {state : "/admin", tracker : "UA-56538-1"}});
            App.Asset      = new Jack.Asset({defaults : {location : "http://www.mekanzii.com/"}});
            App.Router     = new Jack.Router();
        
            /*Helpers Global Instance*/
            Jack.use('App.Helpers.Helper');
        	window.Helpers = new App.Helpers.Shortcut();
            Helpers.Handle = new App.Helpers.Handle(); 
            Helpers.Plugin = new App.Helpers.Plugin();
          
			this.initRouter();
			this.initView();
			this.initLayout();
            
            //Helpers Run
            Helpers.Plugin.uniform();
            Helpers.Plugin.validate();
            Helpers.Plugin.select2();
            Helpers.Plugin.nprogress();
            Helpers.Plugin.scrollers();
            Helpers.Plugin.blockui();
            Helpers.Plugin.datatables();
			Helpers.Handle.initialize();
		},
		initRouter : function(){
            //History Ready
            App.History.ready();
            
            App.History.bind('change', function(e){
                //$("header #buttons, #tmp_messages").empty();
			});
			App.History.bind('internalChange', function(e){});

			App.Router.addRoute('/login', 'App.Control.Login.index');
			App.Router.addRoute('/keywords', 'App.Control.Keywords.index');
			App.Router.addRoute('/keywords(?<id> .*)', 'App.Control.Keywords.tab');
			App.Router.addRoute('/maintenance', 'App.Control.Maintenance.index');
			App.Router.addRoute('/social', 'App.Control.Social.index');
			App.Router.addRoute('/settings', 'App.Control.Settings.index');        
		},
		initView : function(){
			Jack.View.setBasePath(Jack.getBasePath() + 'App/View');
		},
		initLayout : function(){
			Jack.Util.Ajax.overloadDocumentWrite();
			Jack.Util.Ajax.setDocumentWriteContainer(this.layout);
			Jack.Registry.set('App.Layout', this.layout);
		}
	},{});  

	/*M-V-C*/  
	Jack.Construct("App.Construct", {
	    _loaded	: [],
		loadControl : function(name, instance){
			var self = this;

            for (var i = 0; i < self._loaded.length; i++) {
                self._loaded[i].destroy();
                self._loaded.length = 0;
            };

            this._loaded = instance;
		}
	},{});
	
	Jack.Control("App.Control", {
        init : function(){},
		destroy: function() {
			Jack.Control.prototype.destroy.call( this );
		},
		serialize: function() {
			var	 data       = {},
			     retval     = {},
			     serialized = Jack.Model.prototype.serialize.call(this);
            
			//check if we're using the "include" fields or not
			if (typeof this.constructor.include !== 'undefined') {
                Jack.each(this.constructor.include, function(attr) {
                    data[attr] = serialized[attr];
			     });
			} else {
			  data = serialized;
			};
            
			//wrap the return value in the model name for Rails purposes, e.g. {"event": {data}}
			retval[this.constructor._shortName] = data;
			return retval;
		}
	}, {});
	
	Jack.Model('App.Model', {
		getPage : function(params, success, error){
			Jack.ajax({
				url : params.url,
                cache : params.cache,
				beforeSend : function(){
					//App.Helper.blockUI('body', true);
				},
				success : function(response){
					Jack.Util.Ajax.documentTitle(response.header.title);
					Helpers.hButtons(response.hButtons);
					Helpers.html(".ajax-content", response.content);
					success(response);
				},
				error : function(x){
					error(x);
				},
				complete : function(){
					//Helpers.NProgress()
				}
			});
		},
		models : function(data){
			return Jack.Model.models.call(this, data);
		}
	},{});

})(jQuery);