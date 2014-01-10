(function($) {

	App.Model.Person = function() {
		this.name = null;
		this.surname = null;
		this.phone = null;
	};
	App.Model.Person.storage = [];
	App.Model.Person.prototype = FL.extend(FL.Model, {

		Mapper : {

			result : [],

			getAll : function() {}
		}

	});

})(jQuery);