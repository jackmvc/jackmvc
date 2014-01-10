(function($){
'use strict';
	
    /**
     * App.Control.Keywords New Instance Instialize
     * 
     * @return mixed
     */
	App.Construct("App.Control.Keywords", {
		//App.Keywords: indexAction 
		indexAction : function(params){
			/**Load Control*/
			Helpers.NProgress(0.2);

            var indexControl = new App.Control.Keywords.index("body", { params : params });
            
			/**Installing Structure*/	
			if (params.history.bind == "click" || params.history.bind == "external" )
				indexControl.loadPages({dataTable : true});
			else
				indexControl.dataTable();
				
			/**Load Log*/
			this.loadControl("App.Control.Keywords.index", indexControl);

			/*Return TRUE*/
			return true;
		}
	}, {});

    /**
     * indexControl Initialize
     * 
     * @return mixed
     */
	App.Control('App.Control.Keywords.index', {
		init : function(){
			this.search();	
		},
		
		/**	SAYFA YÜKLEME 
			İlk index sayfası buradan yüklenir. Dışarıdan aldığı parametrelere göre yapılandırılır.
			@data 	array	
			@return boolean
		*/
		"loadPages" : function(data){
			var params	= this.options.params;
			var self 	= this;

			App.Model.Keywords.index.getPage({
					url 	: "/admin/keywords",
					cache 	: false
				}, function(response){
					Helpers.setHistory(params.history.value)
					self.dataTable();
				});
		},
		"search" : function(){
			this.element.find(".page-sidebar .search input").val("Anahtar kelimelerde ara");
		},
		/*	DATATABLE
			Datatables plugini aracılığı ile dinamik table list oluşturur. Dışarıdan aldığı parametrelere göre yapılandırılır.
			@data	array  	table verilerini harici olarak json formatında gönderilir ve tekrardan sunucuya istek yapması engellenir.
			@return null
		*/
		dataTable : function(data){
			var self = this;
            Helpers.NProgress();
			this.table = this.element.find("table").dataTable({
                "sDom"              : "",
				"bProcessing"		: false,
				"bServerSide"		: true,
				"sAjaxSource"		: '/text.json',
				/*
				"fnServerData"		: function ( sSource, aoData, fnCallback ) {
					self.element.find(".dataTables_processing").empty();
					App.Model.Keywords.indexTable.findOne(aoData, function(items){
						
						Helpers.NProgress();
						return fnCallback(items);
					});
                },
				*/
				"fnCallback" : function(){
					//App.Helper.unblockUI('body');
                    Helpers.Plugin.uniform();
				},
				"oScroller": {
					"loadingIndicator": false
				},
				"aoColumnDefs"		: [{
						"fnRender": function ( oObj ) {
							return oObj.aData[0];
						},
						'bSortable'	: false,
						'aTargets'	: [0]
					}]
			});
			
			this.element.find(".dataTables_filter input").addClass("form-control input-medium");
			this.element.find(".dataTables_length select").addClass("form-control");
			this.element.find(".dataTables_length select").select2({showSearchInput : true});
		
		},
		/* 	MODAL FORM
			Yeni kayıt ve güncelleme işlemleri için modal üzerinde bir form açarak kayıt kontrollerini gerçekleştirir. Direk URL erişimi yoktur.
			@type	string 	"edit/new"
			@return boolean
		*/
		"create" : function(type){
			var self = this;
			var element = self.element.find(".keywords.index .modal");
			
			Helpers.NProgress(0.2);
			App.Model.Keywords.indexModal.findOne({}, function(response){
				
				element.html(response.content).modal('show').find("form input#name").focus();
				Helpers.NProgress();
				
				var form = element.find("form");
				form.validate({
					submitHandler: function (){
						App.Model.Keywords.index.create(Jack.deparam(form.serialize()), function(response){
								return response.success[0] ? "" : "";
							});
					}
				});
			});
		},
		".keywords.index .tools .reload click" : function(el, ev){
			this.table.fnDraw();
		},
		".keywords.index table thead tr input change" : function(el, ev) {
			Helpers.tableSelectAll(el, ev)
		},
		".keywords.index table tbody tr click" : function(el, ev){
			this.element.find('.buttons .btn').show();
			Helpers.tableTRSelect(el, ev)
		},
		".keywords.index table .link.edit click" : function(el, ev){
			ev.preventDefault();
			this.create("edit");
		},
		".keywords.index table .link.delete click" : function(el, ev){
			ev.preventDefault();
		},
		".keywords.buttons .add click" : function(el, ev){
			ev.preventDefault();
			this.create("add");
		},
		".keywords.buttons .approve click" : function(el, ev){
			ev.preventDefault();
		},
		".keywords.buttons .unapprove click" : function(el, ev){
			ev.preventDefault();
		},
		".keywords.buttons .allDelete click" : function(el, ev){
			ev.preventDefault();
		},
	});

	//Keywords Model Initialize
	App.Model('App.Model.Keywords.index', {
		create:  'POST /admin/keywords/add',
		update:  'PUT /admin/keywords/edit',
		destroy: 'DELETE /admin/keywords/delete/{id}' 
	}, {});
	
	App.Model('App.Model.Keywords.indexTable', {
		findOne: function(params){
			return $.ajax({
				url		: '/text.json',
				type	: 'get',
				data 	: params,
				dataType: 'json'
			})
		}
	}, {});
	
	App.Model('App.Model.Keywords.indexModal', {
		findOne: 'GET /admin/keywords/add',
	}, {});
	
})(jQuery);