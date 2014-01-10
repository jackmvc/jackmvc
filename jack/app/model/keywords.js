(function($){
'use strict';
	
	App.Model('App.Model.Keywords', {
		create:  'POST /admin/keywords/add',
		update:  'PUT /admin/keywords/add',
		destroy: 'DELETE /admin/keywords/delete/{id}' 
	}, true);
	
	App.Model('App.Model.Keywords.table', {
		findOne: function(params){
			return $.ajax({
				url			: '/text.json',
				type		: 'get',
				data 		: params,
				dataType	: 'json'
			})
		}
	}, true);
	
	App.Model('App.Model.Keywords.modal', {
		findOne: 'GET /admin/keywords/add',
	}, true);
	
	
})(jQuery);