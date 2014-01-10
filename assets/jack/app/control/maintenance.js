(function($){
	'use strict';
	
	App.Construct("App.Control.Maintenance", {
		indexAction : function(params){
			/**Load Control*/
            var indexControl = new App.Control.Maintenance.index("body", { params : params });
			
			if ( params.history.bind == "click" || params.history.bind == "external" )
				indexControl.loadPages();
			
            this.loadControl("App.Control.Maintenance.index", indexControl);
			return true;
		}
	}, {});
	
	App.Control('App.Control.Maintenance.index', {
		loadPages : function(){
			var params	= this.options.params;
			var self = this;
			
			Helpers.NProgress(0.2);
			App.Model.Maintenance.index.getPage({
					url : "/admin/maintenance"
				}, function(response){
					App.History.value(params.history.value);
					Helpers.NProgress();
				});
		}
	});
	
	
	//Maintenance Model Initialize
	App.Model('App.Model.Maintenance.index', {
		create:  'POST /pages.json',
		update:  'PUT /admin/keywords/add',
		destroy: 'DELETE /admin/keywords/delete/{id}' 
	}, true);	
	
})(jQuery);