(function($){

	App.Controller.addonsModules = function()
	{
		this.view 			= new FL.View();
		this.layout 		= FL.Registry.get('App.Layout');
		};
	
	App.Controller.addonsModules.prototype = FL.extend(FL.Controller, {

		indexAction : function()
		{
			$('#modules_addon_list').dataTable( {
				"iDisplayLength"	: 57,
				"sAjaxSource"		: "http://www.mekanzii.com/text.json"
			});
			
			$('#modules_core_list').dataTable( {
				"iDisplayLength"	: 10,
				"sDom"				: "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
				"bProcessing"		: false,
				"bServerSide"		: false,
				"sAjaxSource"		: "http://www.mekanzii.com/text.json"
			});
		}
		
	});
	
})(jQuery);