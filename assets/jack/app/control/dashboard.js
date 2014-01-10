(function($){

	FL.use();

	App.Controller.Dashboard = function()
	{
	
		this.view 			= new FL.View();
		this.layout 		= FL.Registry.get('App.Layout');
	};
	
	App.Controller.Dashboard.prototype = FL.extend(FL.Controller, {

		indexAction : function(params)
		{

		}
		
	});
		
})(jQuery);