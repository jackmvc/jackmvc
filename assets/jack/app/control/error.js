(function($) {

	App.Controller.Error = function() {
		this.view = new FL.View();
		this.layout = FL.Registry.get('App.Layout');
	};
	App.Controller.Error.prototype = FL.extend(FL.Controller, {

		indexAction : function(params)
		{
			this.view.assign({
				error: {
					code: params.code
				}
			});

			var self = this;
			this.view.render('error', function(data){
				self.layout.html(data);
			});
		}

	});

})(jQuery);