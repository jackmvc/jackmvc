(function($){

	App.Controller.Settings = function()
	{
		this.view 			= new FL.View();
		this.layout 		= FL.Registry.get('App.Layout');
	};
	
	App.Controller.Settings.prototype = FL.extend(FL.Controller, {
		
		indexAction : function()
		{
			Smart.initUniform();
            $('.select2_category').select2({
	            placeholder: "Select an option",
	            allowClear: true
	        });
		}
		
	});
	
})(jQuery);