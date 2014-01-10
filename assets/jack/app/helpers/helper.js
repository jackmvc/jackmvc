(function($){
"use strict";	
	
	Jack.Construct("App.Helpers.Handle", {
		isRTL 					: false,
		isIE8 					: false,
		isIE9 					: false,
		isIE10					: false,
		sidebarWidth 			: 225,
		sidebarCollapsedWidth 	: 35,
		responsiveHandlers 		: [],
		layoutColorCodes 		: {'blue' : '#4b8df8', 'red' : '#e02222', 'green' : '#35aa47', 'purple' : '#852b99', 'grey' : '#555555', 'light-grey': '#fafafa', 'yellow' : '#ffb848'},
		
        //Doðru görünüm geniþliðini ayarlamak için  http://andylangton.co.uk/articles/javascript/get-viewport-size-javascript/
  		_getViewPort : function () { 
			var e = window, a = 'inner';
			if (!('innerWidth' in window)) {
				a = 'client';
				e = document.documentElement || document.body;
			};
			return {
				width: e[a + 'Width'],
				height: e[a + 'Height']
			};
		},
        //Yardýmcý fonksiyon sabit kenar çubuðu düzeni için kenar çubuðu yükseklik hesaplamak için.
		_calculateFixedSidebarViewportHeight : function () { 
			var sidebarHeight = $(window).height() - $('.header').height() + 1;
			if ($('body').hasClass("page-footer-fixed"))
				sidebarHeight = sidebarHeight - $('.footer').outerHeight();
	
			return sidebarHeight;
		}
    }, {
        init : function(){
			// initializes main settings
			if ($('body').css('direction') === 'rtl')
				this.constructor.isRTL = true;
	
			this.constructor.isIE8 	= !! navigator.userAgent.match(/MSIE 8.0/);
			this.constructor.isIE9 	= !! navigator.userAgent.match(/MSIE 9.0/);
			this.constructor.isIE10 = !! navigator.userAgent.match(/MSIE 10.0/);
	
			if (this.constructor.isIE10)
				jQuery('html').addClass('ie10'); // detect IE10 version
			
			if (this.constructor.isIE10 || this.constructor.isIE9 || this.constructor.isIE8)
				jQuery('html').addClass('ie'); // detect IE10 version
	
			/*
			  Virtual keyboards:
			  Also, note that if you're using inputs in your modal – iOS has a rendering bug which doesn't 
			  update the position of fixed elements when the virtual keyboard is triggered  
			*/
			var deviceAgent = navigator.userAgent.toLowerCase();
			if (deviceAgent.match(/(iphone|ipod|ipad)/)) {
				$(document).on('focus', 'input, textarea', function () {
					$('.header').hide();
					$('.footer').hide();
				});
				$(document).on('blur', 'input, textarea', function () {
					$('.header').show();
					$('.footer').show();
				});
			};
        },
		 //main function to initiate the theme
		initialize : function(){
			//core handlers
            this.responsiveOnResize(); // set and handle responsive    
            this.responsiveOnInit(); // handler responsive elements on page load
            	
            //layout handlers
            this.fixedSidebar(); // handles fixed sidebar menu
            this.fixedSidebarHoverable(); // handles fixed sidebar on hover effect 
            this.sidebarMenu(); // handles main menu
            this.horizontalMenu(); // handles horizontal menu
            this.sidebarToggler(); // handles sidebar hide/show            
            this.fixInputPlaceholderForIE(); // fixes/enables html5 placeholder attribute for IE9, IE8
            this.goTop(); //handles scroll to top functionality in the footer
            this.theme(); // handles style customer tool
			this.fullScreenMode(); // handles full screen
		},
		// wrapper function to scroll(focus) to an element
        scrollTo: function (el, offeset) {
            var pos = (el && el.size() > 0) ? el.offset().top : 0;
            
            jQuery('html,body').animate({
                scrollTop: pos + (offeset ? offeset : 0)
            }, 'slow');
        },	
        // function to scroll to the top
        scrollTop: function () {
            this.scrollTo();
        },
        // check for device touch support
        isTouchDevice: function () {
            try {
                document.createEvent("TouchEvent");
                return true;
            } catch (e) {
                return false;
            }
        },
        isIE8: function () {
            return this.constructor.isIE8;
        },
        isIE9: function () {
            return this.constructor.isIE9;
        },
        isRTL: function () {
            return this.constructor.isRTL;
        },
		sidebarState : function () {
			// remove sidebar toggler if window width smaller than 992(for tablet and phone mode)
			var viewport = this.constructor._getViewPort();
			if (viewport.width < 992)
				$('body').removeClass("page-sidebar-closed");
		},
		// runs callback functions set by App.addResponsiveHandler().
		runResponsiveHandlers : function () {
			var self = this;
			// reinitialize other subscribed elements
			for (var i in self.constructor.responsiveHandlers) {
				var each = self.constructor.responsiveHandlers[i];
				each.call();
			}
		},
		// reinitialize the laypot on window resize
		responsive : function () {
			this.sidebarState();
			this.sidebarAndContentHeight();
			this.fixedSidebar();
			this.runResponsiveHandlers();
		},
		// initialize the layout on page load
		responsiveOnInit : function () {
			this.sidebarState();
			this.sidebarAndContentHeight();
		},
		// handle the layout reinitialization on window resize
		responsiveOnResize : function(){
			var resize;
			var self = this;
			
			if (self.constructor.isIE8) {
				var currheight;
				$(window).resize(function () {
					if (currheight == document.documentElement.clientHeight)
						return; //quite event since only body resized not window.

					if (resize)
						clearTimeout(resize);

					resize = setTimeout(function () {
						self.responsive();
					}, 50); // wait 50ms until window resize finishes.                
					currheight = document.documentElement.clientHeight; // store last body client height
				});
			}else {
				$(window).resize(function () {
					if (resize)
						clearTimeout(resize);
						
					resize = setTimeout(function () {
						self.responsive();
					}, 50); // wait 50ms until window resize finishes.
				});
			}
		},
		// Set proper height for sidebar and content. The content and sidebar height must be synced always.
		sidebarAndContentHeight : function () {
			var content = $('.page-content');
			var sidebar = $('.page-sidebar');
			var body = $('body');
			var height;
	
			if (body.hasClass("page-footer-fixed") === true && body.hasClass("page-sidebar-fixed") === false) {
				var available_height = $(window).height() - $('.footer').outerHeight();
				if (content.height() < available_height)
					content.attr('style', 'min-height:' + available_height + 'px !important');

			} else {
				if (body.hasClass('page-sidebar-fixed'))
					height = this.constructor._calculateFixedSidebarViewportHeight();
				else
					height = sidebar.height() + 20;
				
				if (height >= content.height())
					content.attr('style', 'min-height:' + height + 'px !important');
			};
		},
		sidebarMenu : function(){
			var self = this;
			
			jQuery('.page-sidebar').on('click', 'li > a', function (e) {
				if ($(this).next().hasClass('sub-menu') == false) {
					if ($('.btn-navbar').hasClass('collapsed') == false)
						$('.btn-navbar').click();
						
					return;
				}
	
				if ($(this).next().hasClass('sub-menu.always-open'))
					return;
	
				var parent = $(this).parent().parent();
				var the = $(this);
	
				parent.children('li.open').children('a').children('.arrow').removeClass('open');
				parent.children('li.open').children('.sub-menu').slideUp(200);
				parent.children('li.open').removeClass('open');
	
				var sub = jQuery(this).next();
				var slideOffeset = -200;
				var slideSpeed = 200;
	
				if (sub.is(":visible")) {
					jQuery('.arrow', jQuery(this)).removeClass("open");
					jQuery(this).parent().removeClass("open");
					sub.slideUp(slideSpeed, function () {
						if ($('body').hasClass('page-sidebar-fixed') == false && $('body').hasClass('page-sidebar-closed') == false)
							self.scrollTo(the, slideOffeset);

						self.sidebarAndContentHeight();
					});
				} else {
					jQuery('.arrow', jQuery(this)).addClass("open");
					jQuery(this).parent().addClass("open");
					sub.slideDown(slideSpeed, function () {
						if ($('body').hasClass('page-sidebar-fixed') == false && $('body').hasClass('page-sidebar-closed') == false)
							self.scrollTo(the, slideOffeset);

						self.sidebarAndContentHeight();
					});
				}
	
				e.preventDefault();
			});
	
			// handle ajax links
			jQuery('.page-sidebar').on('click', ' li > a.ajaxify', function (e) {
				e.preventDefault();
				self.scrollTop();
	
				var url = $(this).attr("href");
				var menuContainer = jQuery('.page-sidebar ul');
				var pageContent = $('.page-content');
				var pageContentBody = $('.page-content .page-content-body');
	
				menuContainer.children('li.active').removeClass('active');
				menuContainer.children('arrow.open').removeClass('open');
	
				$(this).parents('li').each(function () {
					$(this).addClass('active');
					$(this).children('a > span.arrow').addClass('open');
				});
				$(this).parents('li').addClass('active');
	
				//self.blockUI(pageContent, false);
			});
		},	
		fixedSidebar : function(){
			var self = this;
			var menu = $('.page-sidebar-menu');
	
			if (menu.parent('.slimScrollDiv').size() === 1) { // destroy existing instance before updating the height
				menu.slimScroll({
					destroy: true
				});
				menu.removeAttr('style');
				$('.page-sidebar').removeAttr('style');
			}
	
			if ($('.page-sidebar-fixed').size() === 0) {
				self.sidebarAndContentHeight();
				return;
			}
	
			var viewport = self.constructor._getViewPort();
			if (viewport.width >= 992) {
				var sidebarHeight = self.constructor._calculateFixedSidebarViewportHeight();
	
				menu.slimScroll({
					size			: '7px',
					color			: '#a1b2bd',
					opacity			: .3,
					position		: self.constructor.isRTL ? 'left' : 'right',
					height			: sidebarHeight,
					allowPageScroll	: false,
					disableFadeOut	: false
				});
				self.sidebarAndContentHeight();
			}
		},
		/*** 
		Sidebar; fixed ve closed özelliðini taþýyorsa, üzerine geldiðinde saða doðru açýlmasýný saðlar.
		***/
		fixedSidebarHoverable : function(){
			var self = this;
			
			if ($('body').hasClass('page-sidebar-fixed') === false)
				return;
	
			$('.page-sidebar').off('mouseenter').on('mouseenter', function () {
				var body = $('body');
	
				if ((body.hasClass('page-sidebar-closed') === false || body.hasClass('page-sidebar-fixed') === false) || $(this).hasClass('page-sidebar-hovering'))
					return;
	
				body.removeClass('page-sidebar-closed').addClass('page-sidebar-hover-on');
				$(this).addClass('page-sidebar-hovering');
				$(this).animate({
					width: self.constructor.sidebarWidth
				}, 400, '', function () {
					$(this).removeClass('page-sidebar-hovering');
				});
			});
	
			$('.page-sidebar').off('mouseleave').on('mouseleave', function () {
				var body = $('body');
	
				if ((body.hasClass('page-sidebar-hover-on') === false || body.hasClass('page-sidebar-fixed') === false) || $(this).hasClass('page-sidebar-hovering'))
					return;
	
				$(this).addClass('page-sidebar-hovering');
				$(this).animate({
					width: self.constructor.sidebarCollapsedWidth
				}, 400, '', function () {
					$('body').addClass('page-sidebar-closed').removeClass('page-sidebar-hover-on');
					$(this).removeClass('page-sidebar-hovering');
				});
			});
		},
		horizontalMenu : function(){
			//handle hor menu search form toggler click
			$('.header').on('click', '.hor-menu .hor-menu-search-form-toggler', function (e) {
				if ($(this).hasClass('off')) {
					$(this).removeClass('off');
					$('.header .hor-menu .search-form').hide();
				} else {
					$(this).addClass('off');
					$('.header .hor-menu .search-form').show();
				}
				e.preventDefault();
			});
	
			//handle hor menu search button click
			$('.header').on('click', '.hor-menu .search-form .btn', function (e) {
				$('.form-search').submit();
				e.preventDefault();
			});
	
			//handle hor menu search form on enter press
			$('.header').on('keypress', '.hor-menu .search-form input', function (e) {
				if (e.which == 13) {
					$('.form-search').submit();
					return false;
				}
			});
		},
		sidebarToggler : function(){
			var self = this;
		   	var viewport = self.constructor._getViewPort();
			if ($.cookie('sidebar_closed') === '1' && viewport.width >= 992)
				$('body').addClass('page-sidebar-closed');
	
			// handle sidebar show/hide
			$('.page-sidebar').on('click', '.sidebar-toggler', function (e) {
				var body = $('body');
				var sidebar = $('.page-sidebar');
	
				if ((body.hasClass("page-sidebar-hover-on") && body.hasClass('page-sidebar-fixed')) || sidebar.hasClass('page-sidebar-hovering')) {
					body.removeClass('page-sidebar-hover-on');
					sidebar.css('width', '').hide().show();
					$.cookie('sidebar_closed', '0');
					e.stopPropagation();
					self.runResponsiveHandlers();
					return;
				}
	
				$(".sidebar-search", sidebar).removeClass("open");
	
				if (body.hasClass("page-sidebar-closed")) {
					body.removeClass("page-sidebar-closed");
					if (body.hasClass('page-sidebar-fixed')) {
						sidebar.css('width', '');
					}
					$.cookie('sidebar_closed', '0');
				} else {
					body.addClass("page-sidebar-closed");
					$.cookie('sidebar_closed', '1');
				}
				self.runResponsiveHandlers();
			});
	
			// handle the search bar close
			$('.page-sidebar').on('click', '.sidebar-search .remove', function (e) {
				e.preventDefault();
				$('.sidebar-search').removeClass("open");
			});
	
			// handle the search query submit on enter press
			$('.page-sidebar').on('keypress', '.sidebar-search input', function (e) {
				if (e.which == 13) {
					$('.sidebar-search').submit();
					return false; //<---- Add this line
				}
			});
	
			// handle the search submit
			$('.sidebar-search .submit').on('click', function (e) {
				e.preventDefault();
				if ($('body').hasClass("page-sidebar-closed")) {
					if ($('.sidebar-search').hasClass('open') == false) {
						if ($('.page-sidebar-fixed').size() === 1) {
							$('.page-sidebar .sidebar-toggler').click(); //trigger sidebar toggle button
						}
						$('.sidebar-search').addClass("open");
					} else {
						$('.sidebar-search').submit();
					}
				} else {
					$('.sidebar-search').submit();
				}
			});
		},
		fixInputPlaceholderForIE : function(){},   		
		// Handles the go to top button at the footer
		goTop : function(){
			var self = this;
			/* set variables locally for increased performance */
			jQuery('.footer').on('click', '.go-top', function (e) {
				self.scrollTo();
				e.preventDefault();
			});
		},
		theme : function(){},
		fullScreenMode : function(){},
	});
    
    /*	if (!jQuery().uniform)return;*/
    
	/***************************
	/*** UI COMPONENT HANDLERS
	/**************************/
    Jack.Construct("App.Helpers.Plugin", {},{
        // Handles Bootstrap Accordions.
        accordions : function(){
			var lastClicked;
			//add scrollable class name if you need scrollable panes
			jQuery('body').on('click', '.accordion.scrollable .accordion-toggle', function () {
				lastClicked = jQuery(this);
			}); //move to faq section
	
			jQuery('body').on('show.bs.collapse', '.accordion.scrollable', function () {
				jQuery('html,body').animate({
					scrollTop: lastClicked.offset().top - 150
				}, 'slow');
			});
        },    
		// Handles Bootstrap Dropdowns
		dropdowns : function(){
			/*
			  For touch supported devices disable the 
			  hoverable dropdowns - data-hover="dropdown"  
			*/
			if (App.Helpers.Handle.isTouchDevice()) {
				$('[data-hover="dropdown"]').each(function(){
					$(this).parent().off("hover");
					$(this).off("hover");
				});
			}
			//Hold dropdown on click  
			$('body').on('click', '.dropdown-menu.hold-on-click', function (e) {
				e.stopPropagation();
			})
		},
		// Handle Hower Dropdowns
		dropdownHover : function(){
			$('[data-hover="dropdown"]').dropdownHover();
		},
        nprogress : function(val){
              
            if (val == "public"){
                NProgress.configure({
                    showSpinner: false
                })
            }else{
                NProgress.configure({
                    showSpinner: false
                })
            }
        },
        // Handles Bootstrap Modals.
        modals : function(){
			// fix stackable modal issue: when 2 or more modals opened, closing one of modal will remove .modal-open class. 
			$('body').on('hide.bs.modal', function () {
               if ($('.modal:visible').size() > 1 && $('html').hasClass('modal-open') == false)
				  $('html').addClass('modal-open');
			   else if ($('.modal:visible').size() <= 1)
				  $('html').removeClass('modal-open');
			   
			});	
        },      
        blockui : function(){
        },
        datatables : function(){
        },
        // Handles custom checkboxes & radios using jQuery Uniform plugin
        uniform : function(){
			var test = $("input[type=checkbox]:not(.toggle), input[type=radio]:not(.toggle, .star)");
			if (test.size() > 0) {
				test.each(function () {
					if ($(this).parents(".checker").size() == 0) {
					   $(this).show();
                       $(this).uniform();
					}
				});
			}
        },
        validate : function(){       
           
            jQuery.validator.setDefaults({
                debug           : true,
                doNotHideMessage: true, //this option enables to show the error/success messages on tab switch.
                errorElement    : 'span', //default input error message container
                errorClass      : 'help-block', // default input error message class
                focusInvalid    : true, // do not focus the last invalid input
	            highlight       : function (element) { // hightlight error inputs
	                $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
	            },
	            success         : function (label) {
	                label.closest('.form-group').removeClass('has-error');
	                label.remove();
	            },
            });
        },

        select2 : function(){
           
			if (jQuery().select2) {
				$('.select2me').select2({
					placeholder: "Select",
					allowClear : true
				});
			}	
        },
        // Handles Bootstrap Tabs.
        tabs : function(){

			// fix content height on tab click
			$('body').on('shown.bs.tab', '.nav.nav-tabs', function () {
				App.Helpers.Handle.sidebarAndContentHeight();
			});
	
			//activate tab if tab id provided in the URL
			if (location.hash) {
				var tabid = location.hash.substr(1);
				$('a[href="#' + tabid + '"]').click();
			}
        },
        // Handles Bootstrap Tooltips.
        tooltips : function(){
            jQuery('.tooltips').tooltip();
        },
		// Handles scrollable contents using jQuery SlimScroll plugin.
		scrollers : function(){
            
			$('.scroller').each(function () {
				var height;
				
				if ($(this).attr("data-height")) 
					height = $(this).attr("data-height");
				else
					height = $(this).css('height');
				
				$(this).slimScroll({
					size			: '7px',
					color			: ($(this).attr("data-handle-color")  ? $(this).attr("data-handle-color") : '#a1b2bd'),
					railColor		: ($(this).attr("data-rail-color")  ? $(this).attr("data-rail-color") : '#333'),
					position		: App.Helpers.Handle.isRTL ? 'left' : 'right',
					height			: height,
					alwaysVisible	: ($(this).attr("data-always-visible") == "1" ? true : false),
					railVisible		: ($(this).attr("data-rail-visible") == "1" ? true : false),
					disableFadeOut	: true
				});
			});
		},
        popovers : function(){},
        fancybox : function(){},
        portletTools : function(){},
    });
    
    
    Jack.Construct("App.Helpers.Shortcut", {},{
        formLoading : function(tip, el){
            if (tip == "start"){
                el.find("button").attr('disabled', 'disabled').find(".text").hide();
                el.find("button .loading").show();  
            }else if (tip == "end"){
                el.find("button").removeAttr('disabled').find(".text").show();
                el.find("button .loading").hide();
            }
        },
        pageLoading : function(){
            
        },
		hButtons : function(items){
			console.log("Create header buttons")
		},
		html : function(el, data){
			return $(el).html(data);
		},
		setHistory : function(val){
			App.History.value(val);
		},
		NProgress : function(time){
			if (time){

				NProgress.set(0.3);
				NProgress.start();
				
                /*
				var centerY;
				jQuery("body").block({
						message		: '',
						centerY		: centerY != undefined ? centerY : true,
						css			: {top : '10%', border : 'none', padding : '2px', backgroundColor : 'none'},
						overlayCSS	: {backgroundColor	: '#fff', opacity : 0.00, cursor : 'wait'}
					});
                */
			}else{
				NProgress.done();
                
                /*
				jQuery("body").unblock({
                    onUnblock: function () {
                        jQuery("body").removeAttr("style");
                    }
                });
                */
			}
		},
		tableSelectAll : function(el, ev){
			var _set 		= el.attr("data-set");	
			var _checked 	= el.is(':checked');
			var _prop 		= [];
			$(_set).each(function () {
				_prop.push(this);
			});
			
			$(_prop).prop('checked', _checked);
			
			$.uniform.update();
		},
		/* Tablo alaný içinde bulunan tr alanýna týklandýðýnda tr içinde bulunan checbox iþaretlenir ve geriye istenen deðerler döner.*/
		tableTRSelect : function(el, ev, callbck){
			if (ev.target.type !== 'checkbox'){
			
				var _set 		= el.find('td:first input');
				var _checked 	= el.find('td:first input').is(':checked');

				var update = (_checked) 
								? _set.prop('checked', false) 
								: _set.prop('checked', true);
				$.uniform.update();
			}
		},
        
        
        
    });
    
})(jQuery);