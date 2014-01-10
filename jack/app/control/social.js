(function($){

	FL.Construct("App.Control.Social", {
		init : function(){
			this.layout	 	= "#Social";
			this.loaded		= [];
		},
		indexAction : function(params){
			var self = this;
			
			if ( params.history.bind == "click" || params.history.bind == "external" ){
				/*Installing Structure*/
				App.Send.run("pages", {
						defaults : {url : "/admin/social"},
						callbacks : {
							success : function(){
								//History Update
								App.History.value(params.history.value);
								self.loaded.push = ["indexAction"];
							}		
						}
					});
			}else{

			};
			
			return true;

		}
	}, true);
	
})(jQuery);