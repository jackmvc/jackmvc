(function($){

	FL.use(
		'App.Plugins.test'
	);

	App.Controller.Index = function()
	{
		this.view = new FL.View();
		this.layout = FL.Registry.get('App.Layout');
		
		$("#textbox1").setting(1);
	};
	App.Controller.Index.prototype = FL.extend(FL.Controller, {

		indexAction : function(params)
		{
			var self = this;
			this.view.render('index', function(data){
				self.layout.html(data);
			});
			
		}

	});

})(jQuery);