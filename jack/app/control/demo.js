(function($) {

	FL.use(
		'App.Model.Person',
		'App.Plugins.test'
	);

	App.Controller.Demo = function() {
		this.view = new FL.View();
		this.layout = FL.Registry.get('App.Layout');
	};
	
	App.Controller.Demo.prototype = FL.extend(FL.Controller, {

		indexAction : function() {
		
			var self = this;
			$("#textbox1").setting(
				
			);
			
			this.view.assign({
				people : FL.getInstance('App.Model.Person').storage
			});
			/*
			this.view.renderServer(BASE_URL + BASE_URI +'/blog/create', null, function(data) {
				self.layout.html(data);
				this.layoutLoaded = false;
			}, 'GET', '');
			*/
			this.view.render('demo', function(data) {
				self.layout.html(data);
				this.layoutLoaded = false;
			});
		},

		addAction : function()
		{
			var self = this;
			if (!this.layoutLoaded)
				this.indexAction();
				
			this.view.render('demo.add', function(data) { 
				self.layout.find('#actions').html(data);
			});
		},

		deleteAction : function(params) {

			App.Controller.Demo.del(params.id);
			this.indexAction();
		}

	});
	
	
	App.Controller.Demo.add = function(data) {

		var person = FL.newInstance('App.Model.Person');
		var row = $('<tr/>');
		_(data).each(function(input) {
			person[input.name] = input.value;
			row.append($('<td/>').text(input.value));
		});
		row.append($('<td/>').append($('<button/>', {type: 'text'}).text('Delete').click(function() {
			FL.go('/demo/delete/' + person.phone.replace(/\D/g,''))
		})));

		//temporary storage
		App.Model.Person.storage.push(person);

		$('#list tbody').append(row);

	};
	
	App.Controller.Demo.del = function(phone) {

		alert(phone);
		for (var index in App.Model.Person.storage)
		{
			if (App.Model.Person.storage[index].phone.replace(/\D/g, '') == phone)
			{
				delete App.Model.Person.storage[index];
				$('#list tbody tr').each(function() {
					if ($(this).find('td:eq(2)').text().replace(/\D/g, '') == phone)
					{
						$(this).remove();
					}
				});
			}
		}



	};

})(jQuery);