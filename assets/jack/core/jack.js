/*
|--------------------------------------------------------------------------
| Underscore @1.1.4
|--------------------------------------------------------------------------
|
| (c) 2011 Jeremy Ashkenas, DocumentCloud Inc.
| Underscore is freely distributable under the MIT license.
| Portions of Underscore are inspired or borrowed from Prototype,
| http://documentcloud.github.com/underscore
|
*/

(function(){var q=this,C=q._,m={},j=Array.prototype,n=Object.prototype,i=j.slice,D=j.unshift,E=n.toString,o=n.hasOwnProperty,s=j.forEach,t=j.map,u=j.reduce,v=j.reduceRight,w=j.filter,x=j.every,y=j.some,p=j.indexOf,z=j.lastIndexOf;n=Array.isArray;var F=Object.keys,c=function(a){return new l(a)};if(typeof module!=="undefined"&&module.exports){module.exports=c;c._=c}else q._=c;c.VERSION="1.1.4";var k=c.each=c.forEach=function(a,b,d){if(a!=null)if(s&&a.forEach===s)a.forEach(b,d);else if(c.isNumber(a.length))for(var e=
0,f=a.length;e<f;e++){if(b.call(d,a[e],e,a)===m)break}else for(e in a)if(o.call(a,e))if(b.call(d,a[e],e,a)===m)break};c.map=function(a,b,d){var e=[];if(a==null)return e;if(t&&a.map===t)return a.map(b,d);k(a,function(f,g,h){e[e.length]=b.call(d,f,g,h)});return e};c.reduce=c.foldl=c.inject=function(a,b,d,e){var f=d!==void 0;if(a==null)a=[];if(u&&a.reduce===u){if(e)b=c.bind(b,e);return f?a.reduce(b,d):a.reduce(b)}k(a,function(g,h,G){if(!f&&h===0){d=g;f=true}else d=b.call(e,d,g,h,G)});if(!f)throw new TypeError("Reduce of empty array with no initial value");
return d};c.reduceRight=c.foldr=function(a,b,d,e){if(a==null)a=[];if(v&&a.reduceRight===v){if(e)b=c.bind(b,e);return d!==void 0?a.reduceRight(b,d):a.reduceRight(b)}a=(c.isArray(a)?a.slice():c.toArray(a)).reverse();return c.reduce(a,b,d,e)};c.find=c.detect=function(a,b,d){var e;A(a,function(f,g,h){if(b.call(d,f,g,h)){e=f;return true}});return e};c.filter=c.select=function(a,b,d){var e=[];if(a==null)return e;if(w&&a.filter===w)return a.filter(b,d);k(a,function(f,g,h){if(b.call(d,f,g,h))e[e.length]=
f});return e};c.reject=function(a,b,d){var e=[];if(a==null)return e;k(a,function(f,g,h){b.call(d,f,g,h)||(e[e.length]=f)});return e};c.every=c.all=function(a,b,d){b=b||c.identity;var e=true;if(a==null)return e;if(x&&a.every===x)return a.every(b,d);k(a,function(f,g,h){if(!(e=e&&b.call(d,f,g,h)))return m});return e};var A=c.some=c.any=function(a,b,d){b=b||c.identity;var e=false;if(a==null)return e;if(y&&a.some===y)return a.some(b,d);k(a,function(f,g,h){if(e=b.call(d,f,g,h))return m});return e};c.include=
c.contains=function(a,b){var d=false;if(a==null)return d;if(p&&a.indexOf===p)return a.indexOf(b)!=-1;A(a,function(e){if(d=e===b)return true});return d};c.invoke=function(a,b){var d=i.call(arguments,2);return c.map(a,function(e){return(b?e[b]:e).apply(e,d)})};c.pluck=function(a,b){return c.map(a,function(d){return d[b]})};c.max=function(a,b,d){if(!b&&c.isArray(a))return Math.max.apply(Math,a);var e={computed:-Infinity};k(a,function(f,g,h){g=b?b.call(d,f,g,h):f;g>=e.computed&&(e={value:f,computed:g})});
return e.value};c.min=function(a,b,d){if(!b&&c.isArray(a))return Math.min.apply(Math,a);var e={computed:Infinity};k(a,function(f,g,h){g=b?b.call(d,f,g,h):f;g<e.computed&&(e={value:f,computed:g})});return e.value};c.sortBy=function(a,b,d){return c.pluck(c.map(a,function(e,f,g){return{value:e,criteria:b.call(d,e,f,g)}}).sort(function(e,f){var g=e.criteria,h=f.criteria;return g<h?-1:g>h?1:0}),"value")};c.sortedIndex=function(a,b,d){d=d||c.identity;for(var e=0,f=a.length;e<f;){var g=e+f>>1;d(a[g])<d(b)?
e=g+1:f=g}return e};c.toArray=function(a){if(!a)return[];if(a.toArray)return a.toArray();if(c.isArray(a))return a;if(c.isArguments(a))return i.call(a);return c.values(a)};c.size=function(a){return c.toArray(a).length};c.first=c.head=function(a,b,d){return b&&!d?i.call(a,0,b):a[0]};c.rest=c.tail=function(a,b,d){return i.call(a,c.isUndefined(b)||d?1:b)};c.last=function(a){return a[a.length-1]};c.compact=function(a){return c.filter(a,function(b){return!!b})};c.flatten=function(a){return c.reduce(a,function(b,
d){if(c.isArray(d))return b.concat(c.flatten(d));b[b.length]=d;return b},[])};c.without=function(a){var b=i.call(arguments,1);return c.filter(a,function(d){return!c.include(b,d)})};c.uniq=c.unique=function(a,b){return c.reduce(a,function(d,e,f){if(0==f||(b===true?c.last(d)!=e:!c.include(d,e)))d[d.length]=e;return d},[])};c.intersect=function(a){var b=i.call(arguments,1);return c.filter(c.uniq(a),function(d){return c.every(b,function(e){return c.indexOf(e,d)>=0})})};c.zip=function(){for(var a=i.call(arguments),
b=c.max(c.pluck(a,"length")),d=Array(b),e=0;e<b;e++)d[e]=c.pluck(a,""+e);return d};c.indexOf=function(a,b,d){if(a==null)return-1;if(d){d=c.sortedIndex(a,b);return a[d]===b?d:-1}if(p&&a.indexOf===p)return a.indexOf(b);d=0;for(var e=a.length;d<e;d++)if(a[d]===b)return d;return-1};c.lastIndexOf=function(a,b){if(a==null)return-1;if(z&&a.lastIndexOf===z)return a.lastIndexOf(b);for(var d=a.length;d--;)if(a[d]===b)return d;return-1};c.range=function(a,b,d){var e=i.call(arguments),f=e.length<=1;a=f?0:e[0];
b=f?e[0]:e[1];d=e[2]||1;e=Math.max(Math.ceil((b-a)/d),0);f=0;for(var g=Array(e);f<e;){g[f++]=a;a+=d}return g};c.bind=function(a,b){var d=i.call(arguments,2);return function(){return a.apply(b||{},d.concat(i.call(arguments)))}};c.bindAll=function(a){var b=i.call(arguments,1);if(b.length==0)b=c.functions(a);k(b,function(d){a[d]=c.bind(a[d],a)});return a};c.memoize=function(a,b){var d={};b=b||c.identity;return function(){var e=b.apply(this,arguments);return e in d?d[e]:d[e]=a.apply(this,arguments)}};
c.delay=function(a,b){var d=i.call(arguments,2);return setTimeout(function(){return a.apply(a,d)},b)};c.defer=function(a){return c.delay.apply(c,[a,1].concat(i.call(arguments,1)))};var B=function(a,b,d){var e;return function(){var f=this,g=arguments,h=function(){e=null;a.apply(f,g)};d&&clearTimeout(e);if(d||!e)e=setTimeout(h,b)}};c.throttle=function(a,b){return B(a,b,false)};c.debounce=function(a,b){return B(a,b,true)};c.wrap=function(a,b){return function(){var d=[a].concat(i.call(arguments));return b.apply(this,
d)}};c.compose=function(){var a=i.call(arguments);return function(){for(var b=i.call(arguments),d=a.length-1;d>=0;d--)b=[a[d].apply(this,b)];return b[0]}};c.keys=F||function(a){if(c.isArray(a))return c.range(0,a.length);var b=[],d;for(d in a)if(o.call(a,d))b[b.length]=d;return b};c.values=function(a){return c.map(a,c.identity)};c.functions=c.methods=function(a){return c.filter(c.keys(a),function(b){return c.isFunction(a[b])}).sort()};c.extend=function(a){k(i.call(arguments,1),function(b){for(var d in b)a[d]=
b[d]});return a};c.clone=function(a){return c.isArray(a)?a.slice():c.extend({},a)};c.tap=function(a,b){b(a);return a};c.isEqual=function(a,b){if(a===b)return true;var d=typeof a;if(d!=typeof b)return false;if(a==b)return true;if(!a&&b||a&&!b)return false;if(a._chain)a=a._wrapped;if(b._chain)b=b._wrapped;if(a.isEqual)return a.isEqual(b);if(c.isDate(a)&&c.isDate(b))return a.getTime()===b.getTime();if(c.isNaN(a)&&c.isNaN(b))return false;if(c.isRegExp(a)&&c.isRegExp(b))return a.source===b.source&&a.global===
b.global&&a.ignoreCase===b.ignoreCase&&a.multiline===b.multiline;if(d!=="object")return false;if(a.length&&a.length!==b.length)return false;d=c.keys(a);var e=c.keys(b);if(d.length!=e.length)return false;for(var f in a)if(!(f in b)||!c.isEqual(a[f],b[f]))return false;return true};c.isEmpty=function(a){if(c.isArray(a)||c.isString(a))return a.length===0;for(var b in a)if(o.call(a,b))return false;return true};c.isElement=function(a){return!!(a&&a.nodeType==1)};c.isArray=n||function(a){return E.call(a)===
"[object Array]"};c.isArguments=function(a){return!!(a&&o.call(a,"callee"))};c.isFunction=function(a){return!!(a&&a.constructor&&a.call&&a.apply)};c.isString=function(a){return!!(a===""||a&&a.charCodeAt&&a.substr)};c.isNumber=function(a){return!!(a===0||a&&a.toExponential&&a.toFixed)};c.isNaN=function(a){return a!==a};c.isBoolean=function(a){return a===true||a===false};c.isDate=function(a){return!!(a&&a.getTimezoneOffset&&a.setUTCFullYear)};c.isRegExp=function(a){return!!(a&&a.test&&a.exec&&(a.ignoreCase||
a.ignoreCase===false))};c.isNull=function(a){return a===null};c.isUndefined=function(a){return a===void 0};c.noConflict=function(){q._=C;return this};c.identity=function(a){return a};c.times=function(a,b,d){for(var e=0;e<a;e++)b.call(d,e)};c.mixin=function(a){k(c.functions(a),function(b){H(b,c[b]=a[b])})};var I=0;c.uniqueId=function(a){var b=I++;return a?a+b:b};c.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g};c.template=function(a,b){var d=c.templateSettings;d="var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('"+
a.replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(d.interpolate,function(e,f){return"',"+f.replace(/\\'/g,"'")+",'"}).replace(d.evaluate||null,function(e,f){return"');"+f.replace(/\\'/g,"'").replace(/[\r\n\t]/g," ")+"__p.push('"}).replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/\t/g,"\\t")+"');}return __p.join('');";d=new Function("obj",d);return b?d(b):d};var l=function(a){this._wrapped=a};c.prototype=l.prototype;var r=function(a,b){return b?c(a).chain():a},H=function(a,b){l.prototype[a]=function(){var d=
i.call(arguments);D.call(d,this._wrapped);return r(b.apply(c,d),this._chain)}};c.mixin(c);k(["pop","push","reverse","shift","sort","splice","unshift"],function(a){var b=j[a];l.prototype[a]=function(){b.apply(this._wrapped,arguments);return r(this._wrapped,this._chain)}});k(["concat","join","slice"],function(a){var b=j[a];l.prototype[a]=function(){return r(b.apply(this._wrapped,arguments),this._chain)}});l.prototype.chain=function(){this._chain=true;return this};l.prototype.value=function(){return this._wrapped}})();

(function($){

/*
|--------------------------------------------------------------------------
| Base JackMVC Javascript Framework @1.0.0
|--------------------------------------------------------------------------
|
| When using the "Database" authentication driver, we need to know which
| table should be used to retrieve your users. We have chosen a basic
| default value but you may easily change it to any table you like.
|
*/

try {
	Jack = {
	    VERSION : '@EDGE', //1.0.0
		Registry: {
			set : function(key, value){
				this[key] = value;
			},
			get : function(key){
				return this[key];
			}
		},
		use: function(){
			Jack.Autoloader.run.apply(this, arguments);
		},
		getInstance: function(class_name, create){
			switch (typeof class_name){
				case 'object':
					return class_name;
					break;
				case 'function':
					return new class_name;
					break;
				case 'string':
                    Jack.use(class_name);
					if (!create)                    
						return eval('(' + class_name + ')');
					else
						return eval('new '+class_name);

					break;
			}
		},
		newInstance: function(class_name){
			return this.getInstance(class_name, true);
		},
		go: function(location){
			var self = new Jack.History();
			self.value(location);  
		},
		getBasePath : function(){
			return Jack.Autoloader.getBasePath();
		},
        Util : {},

        each : function(elements, callback, context) {
            var i = 0,
                key;
            if (elements) {
                if (typeof elements.length === 'number' && elements.pop) {
                    if (elements.attr)
                        elements.attr('length');
                    
                    for (key = elements.length; i < key; i++) {
                        if (callback.call(context || elements[i], elements[i], i, elements) === false)
                            break;  
                    }
                } else if (elements.hasOwnProperty) {
                    for (key in elements) {
                        if (elements.hasOwnProperty(key)) {
                            if (callback.call(context || elements[key], elements[key], key, elements) === false)
                                break;
                        }
                    }
                }
            }
            return elements;
        },
        bindAndSetup : function() {
            // Add the event to this object
            Jack.addEvent.apply(this, arguments);
            // If not initializing, and the first binding
            // call bindsetup if the function exists.
            if (!this._init) {
                if (!this._bindings) {
                    this._bindings = 1;
                    // setup live-binding
                    this._bindsetup && this._bindsetup();

                } else {
                    this._bindings++;
                }

            }
            return this;
        },
        unbindAndTeardown : function(ev, handler) {
            // Remove the event handler
            Jack.removeEvent.apply(this, arguments);

            this._bindings--;
            // If there are no longer any bindings and
            // there is a bindteardown method, call it.
            if (!this._bindings)
                this._bindteardown && this._bindteardown();
            
            return this;
        },
    	deparam : function(params){
    	   var data        = {},
    	       digitTest   = /^\d+$/,
    	       keyBreaker  = /([^\[\]]+)|(\[\])/g,
    	       paramTest   = /([^?#]*)(#.*)?$/,
               pairs,
    	       prep = function( str ) {
    	           return decodeURIComponent( str.replace(/\+/g, " ") );
    		   };
    	
    
    		if ( params && paramTest.test( params )) {
    			
    			pairs = params.split('&'),
    			
    			Jack.each( pairs, function( pair ) {
    
    				var parts = pair.split('='),
    					key   = prep( parts.shift() ),
    					value = prep( parts.join("=") );
    
    				current = data;
    				parts = key.match(keyBreaker);
    		
    				for ( var j = 0, l = parts.length - 1; j < l; j++ ) {
    					if (!current[parts[j]] ) {
    						// If what we are pointing to looks like an `array`
    						current[parts[j]] = digitTest.test(parts[j+1]) || parts[j+1] == "[]" ? [] : {}
    					}
    					current = current[parts[j]];
    				}
    				lastPart = parts.pop()
    				if ( lastPart == "[]" ) {
    					current.push(value)
    				} else {
    					current[lastPart] = value;
    				}
    			});
    		}
    		
    		return data;
    	},
    	isDeferred : function( obj ) {
    		var isFunction = this.isFunction;
    		// Returns `true` if something looks like a deferred.
    		return obj && isFunction(obj.then) && isFunction(obj.pipe);
    	},
        fid : function(object, name){
            var fid = 0;
            return (object._fid) ? object._fid : object._fid = (name ||"" ) + (++fid);
    	},
    	cid : function(object, name) {
            var cid = 0;
            return (object._cid) ? object._cid : object._cid = (name || "") + (++cid);
    	}
	};

	$.extend(Jack, $, {
		trigger: function(obj, event, args) {
            obj.trigger ? obj.trigger(event, args) : $.event.trigger(event, args, obj, true);
		},
		addEvent: function(ev, cb) {
			$([this]).bind(ev, cb);
			return this;
		},
		removeEvent: function(ev, cb) {
			$([this]).unbind(ev, cb);
			return this;
		},
		// jquery caches fragments, we always needs a new one
		buildFragment: function(elems, context) {
			var oldFragment = $.buildFragment,
				ret;

			elems = [elems];
			// Set context per 1.8 logic
			context = context || document;
			context = !context.nodeType && context[0] || context;
			context = context.ownerDocument || context;

			ret = oldFragment.call(jQuery, elems, context);

			return ret.cacheable ? $.clone(ret.fragment) : ret.fragment || ret;
		},
		$: $,
		each: Jack.each
	});

	// Wrap binding functions.
	$.each(['bind', 'unbind', 'undelegate', 'delegate'], function(i, func) {
		Jack[func] = function() {
			var t = this[func] ? this : $([this]);
			t[func].apply(t, arguments);
			return this;
		};
	});

	// Wrap modifier functions.
	$.each(["append", "filter", "addClass", "remove", "data", "get"], function(i, name) {
		Jack[name] = function(wrapped) {
			return wrapped[name].apply(wrapped, Jack.makeArray(arguments).slice(1));
		};
	});
	
	window.Jack = Jack;
} catch (e) {
	console.log('An error occured while running application: [' + e.code + '] : ' + e.message);
};


    /*
    |--------------------------------------------------------------------------
    | Jack Autoloader Class
    |--------------------------------------------------------------------------
    |
    | Autoloads required javascript files using <script/> tag.
    | Object Literal Version
    |
    */

	Jack.Autoloader = {
		loaded		: [],
		basePath	: '',
		
		run : function(){
			var self = Jack.Autoloader;
			for (var i=0; i<arguments.length; i++){
				var class_name = arguments[i];

				if (_(self.loaded).indexOf(class_name) > -1)
					return;

					var class_route = class_name.replace(/\./g, '/');
					var class_path 	= self.getBasePath()+class_route + '.js';
					
					$(document.body).append('<script type="text/javascript" src="'+class_path+'">');
					
					self.loaded.push(class_name);
					self.loaded = _.uniq(self.loaded);
			}
		},
		getBasePath: function(){
			return (this.basePath.charAt(this.basePath.length - 1) != '/') 
					? this.basePath += '/' 
					: this.basePath
		},
		setBasePath: function(base) {
			this.basePath = base;
		}
	};

	Jack.extend(Jack, {
		strUndHash 	: /_|-/,
        strColons 	: /\=\=/,
        strWords 	: /([A-Z]+)([A-Z][a-z])/g,
        strLowUp 	: /([a-z\d])([A-Z])/g,
        strDash 	: /([a-z\d])([A-Z])/g,
        strReplacer : /\{([^\}]+)\}/g,
        strQuote 	: /"/g,
        strSingleQuote : /'/g,
		isContainer : function(current) {
			return (/^f|^o/).test(typeof current);
		},
		getNext : function(obj, prop, add) {
			var result = obj[prop];

			if (result === undefined && add === true) {
				result = obj[prop] = {}
			}
			return result
		},
		// Escapes strings for HTML.
		esc: function(content) {
			// Convert bad values into empty strings
			this.isInvalid = content === null || content === undefined || (isNaN(content) && ("" + content === 'NaN'));
			return ("" + (this.isInvalid ? '' : content))
				.replace(/&/g, '&amp;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;')
				.replace(this.strQuote, '&#34;')
				.replace(this.strSingleQuote, "&#39;");
		},
		getObject: function(name, roots, add) {
			var self = this;
			// The parts of the name we are looking up
			// `['App','Models','Recipe']`
			var parts = name ? name.split('.') : [];
			var length = parts.length;
			var current;
			var r = 0;
			var i;
			var container; 
			var rootsLength;

			// Make sure roots is an `array`.
			roots = Jack.isArray(roots) ? roots : [roots || window];

			rootsLength = roots.length

			if (!length)
				return roots[0];

			// For each root, mark it as current.
			for (r; r < rootsLength; r++) {
				current = roots[r];
				container = undefined;

				// Walk current to the 2nd to last object or until there
				// is not a container.
				for (i = 0; i < length && self.isContainer(current); i++) {
					container = current;
					current = self.getNext(container, parts[i]);
				}

				// If we found property break cycle
				if (container !== undefined && current !== undefined) 
					break
			}

			// Remove property from found container
			if (add === false && current !== undefined)
				delete container[parts[i - 1]]

			// When adding property add it to the first root
			if (add === true && current === undefined) {
				current = roots[0]

				for (i = 0; i < length && self.isContainer(current); i++) {
					current = self.getNext(current, parts[i], true);
				}
			}
			return current;
		},
		// Capitalizes a string.

		capitalize: function(s, cache) {
			// Used to make newId.
			return s.charAt(0).toUpperCase() + s.slice(1);
		},
		// Underscores a string.
		underscore: function(s) {
			return s
				.replace(this.strColons, '/')
				.replace(this.strWords, '$1_$2')
				.replace(this.strLowUp, '$1_$2')
				.replace(this.strDash, '_')
				.toLowerCase();
		},
		// Micro-templating.
		sub: function(str, data, remove) {
			var obs = [];

			str = str || '';

			obs.push(str.replace(Jack.strReplacer, function(whole, inside) {

				// Convert inside to type.
				var ob = Jack.getObject(inside, data, remove === true ? false : undefined);

				if (ob === undefined) {
					obs = null;
					return "";
				}

				// If a container, push into objs (which will return objects found).
				if (this.isContainer(ob) && obs) {
					obs.push(ob);
					return "";
				}

				return "" + ob;
			}));

			return obs === null ? obs : (obs.length <= 1 ? obs[0] : obs);
		},
		// These regex's are used throughout the rest of Jack, so let's make
		// them available.
		replacer: Jack.strReplacer,
		undHash: Jack.strUndHash
			
	});

	/** 
	 * @add Jack.Construct
	 */
	Jack.Construct = function() {
		if (arguments.length)
			return Jack.Construct.extend.apply(Jack.Construct, arguments);
	};
	/*** @static */
	Jack.Construct.initializing = 0;
	Jack.extend(Jack.Construct, {
		constructorExtends : true,
		newInstance : function() {
			var inst = this.instance(),
                arg  = arguments,
                args;

			if (inst.setup)
				args = inst.setup.apply(inst, arguments);

			if (inst.init)
				inst.init.apply(inst, args || arguments);

			return inst;
		},
		_inherit : function( newProps, oldProps, addTo ) {
			Jack.extend(addTo || newProps, newProps || {})
		},
		_overwrite : function(what, oldProps, propName, val){
			what[propName] = val;
		},
		setup : function( base, fullName ) {
			this.defaults = Jack.extend(true,{}, base.defaults, this.defaults);
		},
		instance : function() {
			Jack.Construct.initializing = 1;
			var inst = new this();
			Jack.Construct.initializing = 0;
			return inst;
		},
		extend : function( fullName, klass, proto ) {
			// Figure out what was passed and normalize it.
			if (typeof fullName != 'string') {
				proto = klass;
				klass = fullName;
				fullName = null;
			}

			if (!proto) {
				proto = klass;
				klass = null;
			}
			proto = proto || {};
			var _super_class= this,
                _super      = this.prototype,
                shortName, 
                namespace;

			// Instantiate a base class (but only create the instance,
			// don't run the init constructor).
			var prototype = this.instance();

			// Copy the properties over onto the new prototype.
			Jack.Construct._inherit(proto, _super, prototype);

			// The dummy class constructor.
			function Constructor() {
				// All construction is actually done in the init method.
				if ( ! Jack.Construct.initializing ) {
					return this.constructor !== Constructor && arguments.length && Constructor.constructorExtends
						// We are being called without `new` or we are extending.
						? arguments.callee.extend.apply(arguments.callee, arguments) 
						// We are being called with `new`.
						: Constructor.newInstance.apply(Constructor, arguments);
				}
			}

			// Copy old stuff onto class (Jack probably be merged w/ inherit)
			for ( var name in _super_class ) {
				if ( _super_class.hasOwnProperty(name) )
					Constructor[name] = _super_class[name];
			}

			// Copy new static properties on class.
			Jack.Construct._inherit(klass, _super_class, Constructor);

			// Setup namespaces.
			if ( fullName ) {

				var parts = fullName.split('.'),
					shortName = parts.pop(),
					current = Jack.getObject(parts.join('.'), window, true),
					namespace = current,
					_fullName = Jack.underscore(fullName.replace(/\./g, "_")),
					_shortName = Jack.underscore(shortName);

				//!steal-remove-start
				if(current[shortName])
				    console.log("class.js There's already something called "+fullName);
					//steal.dev.warn("class.js There's already something called "+fullName)
				//!steal-remove-end

				current[shortName] = Constructor;
			}

			// Set things that shouldn't be overwritten.
			Jack.extend(Constructor, {
				constructor	: Constructor,
				prototype	: prototype,
				namespace	: namespace,
				_shortName 	: _shortName,
				fullName	: fullName,
				_fullName	: _fullName
			});

			// Dojo and YUI extend undefined
			if(shortName !== undefined)
				Constructor.shortName = shortName;

			// Make sure our prototype looks nice.
			Constructor.prototype.constructor = Constructor;

			// Call the class `setup` and `init`
			var t = [_super_class].concat(Jack.makeArray(arguments)),
				args = Constructor.setup.apply(Constructor, t );

			if ( Constructor.init )
				Constructor.init.apply(Constructor, args || t );

			/**@prototype*/
			return Constructor;

		}
	});
	Jack.Construct.prototype.setup = function(){};
	Jack.Construct.prototype.init = function(){};

	/**
	* Jack Observe Class
	**/
    Jack.Construct("Jack.Observe", {
        // keep so it Jack be overwritten
        bind            : Jack.bindAndSetup,
        unbind          : Jack.unbindAndTeardown,
        id              : "id",
        JackMakeObserve : function(obj) {
            return obj && !Jack.isDeferred(obj) && (Jack.isArray(obj) || Jack.isPlainObject(obj) || (obj instanceof Jack.Observe));
        },
        // Removes all listeners.
        unhookup : function(items, namespace) {
            return Jack.each(items, function(item) {
                if (item && item.unbind)
                    item.unbind("change" + namespace);
            });
        },
        // Listens to changes on `child` and "bubbles" the event up.  
        // `child` - The object to listen for changes on.  
        // `prop` - The property name is at on.  
        // `parent` - The parent object of prop.
        // `ob` - (optional) The Observe object constructor
        // `list` - (optional) The observable list constructor
        hookupBubble : function(child, prop, parent, Ob, List) {
            // If it's an `array` make a list, otherwise a child.
            if (child instanceof Jack.Observe)
                // We have an `observe` already...
                // Make sure it is not listening to this already
                // It's only listening if it has bindings already.
                parent._bindings && this.unhookup([child], parent._cid);
            else if (Jack.isArray(child))
                child = new Jack.Observe.List(child);
            else
                child = new Jack.Observe(child);
            
            // only listen if something is listening to you
            if (parent._bindings) 
                // Listen to all changes and `batchTrigger` upwards.
                this.bindToChildAndBubbleToParent(child, prop, parent);

            return child;
        },
        bindToChildAndBubbleToParent : function(child, prop, parent) {
            child.bind("change" + parent._cid, function() {
                // `batchTrigger` the type on this...
                var args    = Jack.makeArray(arguments),
                    ev      = args.shift();
                    
                args[0] = (prop === "*" ? [parent.indexOf(child), args[0]] : [prop, args[0]]).join(".");

                // track objects dispatched on this observe		
                ev.triggeredNS = ev.triggeredNS || {};

                // if it has already been dispatched exit
                if (ev.triggeredNS[parent._cid])
                    return;

                ev.triggeredNS[parent._cid] = true;
                // send change event with modified attr to parent	
                Jack.trigger(parent, ev, args);
                // send modified attr event to parent
                //Jack.trigger(parent, args[0], args);
            });
        },
        // An `id` to track events for a given observe.
        observeId : 0,
        // A helper used to serialize an `Observe` or `Observe.List`.  
        // `observe` - The observable.  
        // `how` - To serialize with `attr` or `serialize`.  
        // `where` - To put properties, in an `{}` or `[]`.
        serialize : function(observe, how, where) {
            var self = this;
            // Go through each property.
            observe.each(function(val, name) {
                // If the value is an `object`, and has an `attrs` or `serialize` function.
                where[name] = self.JackMakeObserve(val) && Jack.isFunction(val[how])
                // Call `attrs` or `serialize` to get the original data back.
                    ? val[how]() 
                // Otherwise return the value.
                    : val;
            });
            return where;
        },
        attrParts : function(attr, keepKey) {
            if (keepKey)
                return [attr];

            return Jack.isArray(attr) ? attr : ("" + attr).split(".");
        },
        // Which batch of events this is for -- might not want to send multiple
        // messages on the same batch.  This is mostly for event delegation.
        batchNum        : 1,
        // how many times has start been called without a stop
        transactions    : 0,
        // an array of events within a transaction
        batchEvents     : [],
        stopCallbacks   : [],
        makeBindSetup : function(wildcard) {
            return function() {
                var parent = this;
                this._each(function(child, prop) {
                    if (child && child.bind)
                        parent.bindToChildAndBubbleToParent(child, wildcard || prop, parent);
                });
            };
        },
        // starts collecting events
        // takes a callback for after they are updated
        // how could you hook into after ejs
        startBatch: function(batchStopHandler) {
            this.transactions++;
            batchStopHandler && this.stopCallbacks.push(batchStopHandler);
        },
        stopBatch: function(force, callStart) {
            if (force)
                this.transactions = 0;
            else
                this.transactions--;

            if (this.transactions == 0) {
                var items = this.batchEvents.slice(0),
                callbacks = this.stopCallbacks.slice(0);
                this.batchEvents    = [];
                this.stopCallbacks  = [];
                this.batchNum++;
                
                callStart && this.startBatch();
                Jack.each(items, function(args) {
                    Jack.trigger.apply(Jack, args);
                });
                Jack.each(callbacks, function(back) {
                    back();
                });
            }
        },
        triggerBatch: function(item, event, args) {
            // Don't send events if initalizing.
            if (!item._init) {
                if (this.transactions == 0) {
                    return Jack.trigger(item, event, args);
                } else {
                    event = typeof event === "string" ? {type: event} : event;
                    event.batchNum = this.batchNum;
                    this.batchEvents.push([item, event, args]);
                }
            }
        },
        keys: function(observe) {
            var keys = [];
            Jack.Observe.__reading && Jack.Observe.__reading(observe, '__keys');
            for (var keyName in observe._data) {
                keys.push(keyName);
            }
            return keys;
        }
    },{
        setup: function(obj) {
            // `_data` is where we keep the properties.
            this._data = {};

            // The namespace this `object` uses to listen to events.
            Jack.cid(this, ".observe");
            // Sets all `attrs`.
            this._init = 1;
            this.attr(obj);
            this.bind('change' + this._cid, Jack.proxy(this._changes, this));
            delete this._init;
        },
        _bindsetup: function(){
            return Jack.Observe.makeBindSetup();
        },
        _bindteardown: function() {
            var cid = this._cid
            this._each(function(child) {
                Jack.Observe.unhookup([child], cid)
            })
        },
        _changes: function(ev, attr, how, newVal, oldVal) {
            Jack.Observe.triggerBatch(this, {type : attr, batchNum : ev.batchNum}, [newVal, oldVal]);
        },
        _triggerChange: function(attr, how, newVal, oldVal) {
            Jack.Observe.triggerBatch(this, "change", Jack.makeArray(arguments))
        },
        // no live binding iterator
        _each: function(callback) {
            var data = this.__get();
            for (var prop in data) {
                if (data.hasOwnProperty(prop))
                    callback(data[prop], prop)
            }
        },
        attr: function(attr, val) {
            // This is super obfuscated for space -- basically, we're checking
            // if the type of the attribute is not a `number` or a `string`.
            var type = typeof attr;
            if (type !== "string" && type !== "number") {
                return this._attrs(attr, val)
            } else if (arguments.length === 1) { // If we are getting a value.
                // Let people know we are reading.
                Jack.Observe.__reading && Jack.Observe.__reading(this, attr)
                return this._get(attr)
            } else {
                // Otherwise we are setting.
                this._set(attr, val);
                return this;
            }
        },
        each: function() {
            Jack.Observe.__reading && Jack.Observe.__reading(this, '__keys');
            return Jack.each.apply(undefined, [this.__get()].concat(Jack.makeArray(arguments)))
        },
        removeAttr: function(attr) {
            // Info if this is List or not
            var isList = this instanceof Jack.Observe.List,
                // Convert the `attr` into parts (if nested).
                parts = Jack.Observe.attrParts(attr),
                // The actual property to remove.
                prop = parts.shift(),
                // The current value.
                current = isList ? this[prop] : this._data[prop];

            // If we have more parts, call `removeAttr` on that part.
            if (parts.length) {
                return current.removeAttr(parts)
            } else {
                if (isList) {
                    this.splice(prop, 1)
                } else if (prop in this._data) {
                    // Otherwise, `delete`.
                    delete this._data[prop];
                    // Create the event.
                    if (!(prop in this.constructor.prototype)) {
                        delete this[prop]
                    }
                    // Let others know the number of keys have changed
                    Jack.Observe.triggerBatch(this, "__keys");
                    this._triggerChange(prop, "remove", undefined, current);

                }
                return current;
            }
        },
        // Reads a property from the `object`.
        _get: function(attr) {
            var value = typeof attr === 'string' && !! ~attr.indexOf('.') && this.__get(attr);
            if (value)
                return value;

            // break up the attr (`"foo.bar"`) into `["foo","bar"]`
            var parts = Jack.Observe.attrParts(attr),
                // get the value of the first attr name (`"foo"`)
                current = this.__get(parts.shift());
            // if there are other attributes to read
            return parts.length ?
            // and current has a value
            current ?
            // lookup the remaining attrs on current
            current._get(parts) :
            // or if there's no current, return undefined
            undefined :
            // if there are no more parts, return current
            current;
        },
        // Reads a property directly if an `attr` is provided, otherwise
        // returns the "real" data object itself.
        __get: function(attr) {
            return attr ? this._data[attr] : this._data;
        },
        // Sets `attr` prop as value on this object where.
        // `attr` - Is a string of properties or an array  of property values.
        // `value` - The raw value to set.
        _set: function(attr, value, keepKey) {
            // Convert `attr` to attr parts (if it isn't already).
            var parts = Jack.Observe.attrParts(attr, keepKey),
                // The immediate prop we are setting.
                prop = parts.shift(),
                // The current value.
                current = this.__get(prop);

            // If we have an `object` and remaining parts.
            if (Jack.Observe.JackMakeObserve(current) && parts.length) {
                // That `object` should set it (this might need to call attr).
                current._set(parts, value)
            } else if (!parts.length) {
                // We're in "real" set territory.
                if (this.__convert) {
                    value = this.__convert(prop, value)
                }
                this.__set(prop, value, current)
            } else {
                throw "Jack.Observe: Object does not exist"
            }
        },
        __set: function(prop, value, current) {

            // Otherwise, we are setting it on this `object`.
            // TODO: Check if value is object and transform
            // are we changing the value.
            if (value !== current) {
                // Check if we are adding this for the first time --
                // if we are, we need to create an `add` event.
                var changeType = this.__get().hasOwnProperty(prop) ? "set" : "add";

                // Set the value on data.
                this.___set(prop,

                    // If we are getting an object.
                    Jack.Observe.JackMakeObserve(value) ?

                    // Hook it up to send event.
                    Jack.Observe.hookupBubble(value, prop, this) :
                    // Value is normal.
                    value);

                if (changeType == "add") {
                    // If there is no current value, let others know that
                    // the the number of keys have changed
                    Jack.Observe.triggerBatch(this, "__keys", undefined);
                }
                // `batchTrigger` the change event.
                this._triggerChange(prop, changeType, value, current);

                //Observe.triggerBatch(this, prop, [value, current]);
                // If we Jack stop listening to our old value, do it.
                current && Jack.Observe.unhookup([current], this._cid);
            }

        },
        // Directly sets a property on this `object`.
        ___set: function(prop, val) {
            this._data[prop] = val;
            // Add property directly for easy writing.
            // Check if its on the `prototype` so we don't overwrite methods like `attrs`.
            if (!(prop in this.constructor.prototype)) {
                this[prop] = val
            }
        },
        bind: Jack.bindAndSetup,
        unbind: Jack.unbindAndTeardown,
        serialize: function() {
            return Jack.Observe.serialize(this, 'serialize', {});
        },
        _attrs: function(props, remove) {
            if (props === undefined) 
                return serialize(this, 'attr', {});

            props = Jack.extend({}, props);
            var prop,
                self = this,
                newVal;
                
            Jack.Observe.startBatch();
            this.each(function(curVal, prop) {
                newVal = props[prop];

                // If we are merging...
                if (newVal === undefined) {
                    remove && self.removeAttr(prop);
                    return;
                }

                if (self.__convert) {
                    newVal = self.__convert(prop, newVal)
                }

                // if we're dealing with models, want to call _set to let converter run
                if (newVal instanceof Jack.Observe) {
                    self.__set(prop, newVal, curVal)
                    // if its an object, let attr merge
                } else if (Jack.Observe.JackMakeObserve(curVal) && Jack.Observe.JackMakeObserve(newVal) && curVal.attr) {
                    curVal.attr(newVal, remove)
                    // otherwise just set
                } else if (curVal != newVal) {
                    self.__set(prop, newVal, curVal)
                }

                delete props[prop];
            })
            // Add remaining props.
            for (var prop in props) {
                newVal = props[prop];
                this._set(prop, newVal, true)
            }
            Jack.Observe.stopBatch()
            return this;
        },
        compute: function(prop) {
            return Jack.compute(this, prop);
        }
    });
          
    // Helpers for `observable` lists.
    var splice = [].splice;

    Jack.Observe("Jack.Observe.List", {
        setup: function(instances, options) {
            this.length = 0;
            this._init = 1;
            Jack.cid(this, ".observe");
            if (Jack.isDeferred(instances))
                this.replace(instances);
            else
                this.push.apply(this, Jack.makeArray(instances || []));
            
            // this change needs to be ignored
            this.bind('change' + this._cid, Jack.proxy(this._changes, this));
            Jack.extend(this, options);
            delete this._init;
        },
        _triggerChange: function(attr, how, newVal, oldVal) {

            Jack.Observe.prototype._triggerChange.apply(this, arguments)
            // `batchTrigger` direct add and remove events...
            if (!~attr.indexOf('.')) {
                if (how === 'add') {
                    Jack.Observe.triggerBatch(this, how, [newVal, +attr]);
                    Jack.Observe.triggerBatch(this, 'length', [this.length]);
                } else if (how === 'remove') {
                    Jack.Observe.triggerBatch(this, how, [oldVal, +attr]);
                    Jack.Observe.triggerBatch(this, 'length', [this.length]);
                } else {
                    Jack.Observe.triggerBatch(this, how, [newVal, +attr])
                };
            };

        },
        __get: function(attr) {
            return attr ? this[attr] : this;
        },
        ___set: function(attr, val) {
            this[attr] = val;
            if (+attr >= this.length)
                this.length = (+attr + 1);
        },
        _each: function(callback) {
            var data = this.__get();
            for (var i = 0; i < data.length; i++) {
                callback(data[i], i)
            }
        },
        _bindsetup: function(){
            return Jack.Observe.makeBindSetup("*")
        },
        // Returns the serialized form of this list.
        serialize: function() {
            return Jack.Observe.serialize(this, 'serialize', []);
        },
        splice: function(index, howMany) {
            var args = Jack.makeArray(arguments),
                i;

            for (i = 2; i < args.length; i++) {
                var val = args[i];
                if (Jack.Observe.JackMakeObserve(val))
                    args[i] = Jack.Observe.hookupBubble(val, "*", this, this.constructor.Observe, this.constructor);
            };
            if (howMany === undefined)
                howMany = args[1] = this.length - index;

            var removed = splice.apply(this, args);
            Jack.Observe.startBatch();
            if (howMany > 0) {
                this._triggerChange("" + index, "remove", undefined, removed);
                Jack.Observe.unhookup(removed, this._cid);
            };
            if (args.length > 2)
                this._triggerChange("" + index, "add", args.slice(2), removed);

            Jack.Observe.stopBatch();
            return removed;
        },
        _attrs: function(items, remove) {
            if (items === undefined)
                return Jack.Observe.serialize(this, 'attr', []);
                
            // Create a copy.
            items = Jack.makeArray(items);

            Jack.Observe.startBatch();
            this._updateAttrs(items, remove);
            Jack.Observe.stopBatch()
        },
        _updateAttrs: function(items, remove) {
            var len = Math.min(items.length, this.length);

            for (var prop = 0; prop < len; prop++) {
                var curVal = this[prop],
                    newVal = items[prop];

                if (Jack.Observe.JackMakeObserve(curVal) && Jack.Observe.JackMakeObserve(newVal))
                    curVal.attr(newVal, remove);
                else if (curVal != newVal)
                    this._set(prop, newVal);
                    
            };
            if (items.length > this.length)
                // Add in the remaining props.
                this.push.apply(this, items.slice(this.length));
            else if (items.length < this.length && remove)
                this.splice(items.length);
        }
    });
    

    // Converts to an `array` of arguments.
    var getArgs = function(args) {
        
    };
    // Create `push`, `pop`, `shift`, and `unshift`
        // `name` - The method name.
        // `where` - Where items in the `array` should be added.
    Jack.each({push: "length", unshift: 0 }, function(where, name) {
        var orig = [][name]
        Jack.Observe.List.prototype[name] = function() {
            // Get the items being added.
            var args = [],
                // Where we are going to add items.
                len = where ? this.length : 0,
                i = arguments.length,
                res,
                val,
                constructor = this.constructor;
            // Go through and convert anything to an `observe` that needs to be converted.
            while (i--){
                val     = arguments[i];
                args[i] = Jack.Observe.JackMakeObserve(val) ? Jack.Observe.hookupBubble(val, "*", this, this.constructor.Observe, this.constructor) : val;
            };
            // Call the original method.
            res = orig.apply(this, args);
            if (!this.comparator || args.length)
                this._triggerChange("" + len, "add", args, undefined);

            return res;
        }
    });

    // Creates a `remove` type method
    Jack.each({ pop: "length", shift: 0}, function(where, name) {
        Jack.Observe.List.prototype[name] = function() {
            var args = arguments[0] && Jack.isArray(arguments[0]) ?  args[0] : Jack.makeArray(arguments),
                len = where && this.length ? this.length - 1 : 0,
                res = [][name].apply(this, args);

            // Create a change where the args are
            // `len` - Where these items were removed.
            // `remove` - Items removed.
            // `undefined` - The new values (there are none).
            // `res` - The old, removed values (should these be unbound).
            this._triggerChange("" + len, "remove", undefined, [res])

            if (res && res.unbind)
                res.unbind("change" + this._cid)
            
            return res;
        }
    });

    Jack.extend(Jack.Observe.List.prototype, {
        indexOf: function(item) {
            this.attr('length')
            return Jack.inArray(item, this)
        },
        join: [].join,
        reverse: [].reverse,
        slice: function() {
            var temp = Array.prototype.slice.apply(this, arguments);
            return new this.constructor(temp);
        },
        concat: function() {
            var args = [];
            Jack.each(Jack.makeArray(arguments), function(arg, i) {
                args[i] = arg instanceof Jack.Observe.List ? arg.serialize() : arg;
            });
            return new this.constructor(Array.prototype.concat.apply(this.serialize(), args));
        },
        forEach: function(cb, thisarg) {
            Jack.each(this, cb, thisarg || this);
        },
        replace: function(newList) {
            if (Jack.isDeferred(newList))
                newList.then(Jack.proxy(this.replace, this));
            else
                this.splice.apply(this, [0, this.length].concat(Jack.makeArray(newList || [])));

            return this;
        }
    });

    Jack.Observe.setup = function() {
        Jack.Construct.setup.apply(this, arguments);
        // I would prefer not to do it this way. It should
        // be using the attributes plugin to do this type of conversion.
        this.List = Jack.Observe.List({
                Observe: this
        }, {});
    };

	/**
	* Jack Model Class
	**/
    Jack.Observe("Jack.Model", {
        fullName    : "Jack.Model",
        modelNum    : 0,
        ignoreHookup: /change.observe\d+/,
        _reqs       : 0,
        pipe : function(def, model, func) {
            var d = new Jack.Deferred();
            def.then(function() {
                var args = Jack.makeArray(arguments);
                try {
                    args[0] = model[func](args[0]);
                    d.resolveWith(d, args);
                } catch (e) {
                    d.rejectWith(d, [e].concat(args));
                }
            }, function() {
                d.rejectWith(this, arguments);
            });

            if (typeof def.abort === 'function') {
                d.abort = function() {
                    return def.abort();
                }
            }

            return d;
        },

        getId : function(inst) {
            // Instead of using attr, use __get for performance.
            // Need to set reading
            Jack.Observe.__reading && Jack.Observe.__reading(inst, inst.constructor.id);
            return inst.__get(inst.constructor.id);
        },
        // Ajax `options` generator function
        ajax : function(ajaxOb, data, type, dataType, success, error) {
            var params = {};
            // If we get a string, handle it.
            if (typeof ajaxOb == "string") {
                // If there's a space, it's probably the type.
                var parts = ajaxOb.split(/\s+/);
                params.url = parts.pop();
                if (parts.length)
                    params.type = parts.pop();
                    
            } else {
                Jack.extend(params, ajaxOb);
            }

            // If we are a non-array object, copy to a new attrs.
            params.data = typeof data == "object" && !Jack.isArray(data) ? Jack.extend(params.data || {}, data) : data;

            // Get the url with any templated values filled out.
            params.url = Jack.sub(params.url, params.data, true);

            return Jack.ajax(Jack.extend({
                    type    : type || "post",
                    dataType: dataType || "json",
                    success : success,
                    error   : error
                }, params));
        },
        makeRequest : function(self, type, success, error, method) {
            var args;
            // if we pass an array as `self` it it means we are coming from
            // the queued request, and we're passing already serialized data
            // self's signature will be: [self, serializedData]
            if (Jack.isArray(self)) {
                args = self[1];
                self = self[0];
            } else {
                args = self.serialize();
            }
            args = [args];
            var deferred,
                // The model.
                model = self.constructor,
                jqXHR;

            // `destroy` does not need data.
            if (type == 'destroy')
                args.shift();
                
            // `update` and `destroy` need the `id`.
            if (type !== 'create')
                args.unshift(this.getId(self));

            jqXHR = model[type].apply(model, args);

            deferred = jqXHR.pipe(function(data) {
                self[method || type + "d"](data, jqXHR);
                return self;
            });

            // Hook up `abort`
            if (jqXHR.abort) {
                deferred.abort = function() {
                    jqXHR.abort();
                };
            }

            deferred.then(success, error);
            return deferred;
        },

        // This object describes how to make an ajax request for each ajax method.  
        // The available properties are:
        //		`url` - The default url to use as indicated as a property on the model.
        //		`type` - The default http request type
        //		`data` - A method that takes the `arguments` and returns `data` used for ajax.
        ajaxMethods : {
            create  : {
                url : "_shortName",
                type: "post"
            },
            update: {
                data: function(id, attrs) {
                    attrs = attrs || {};
                    var identity = this.id;
                    if (attrs[identity] && attrs[identity] !== id) {
                        attrs["new" + Jack.capitalize(id)] = attrs[identity];
                        delete attrs[identity];
                    }
                    attrs[identity] = id;
                    return attrs;
                },
                type: "put"
            },
            destroy : {
                type: "delete",
                data: function(id) {
                    var args = {};
                    args.id = args[this.id] = id;
                    return args;
                }
            },

            findAll: {url: "_shortName"},
            findOne: {}
        },
        // Makes an ajax request `function` from a string.
        //		`ajaxMethod` - The `ajaxMethod` object defined above.
        //		`str` - The string the user provided. Ex: `findAll: "/recipes.json"`.
        ajaxMaker : function(ajaxMethod, str) {
            // Return a `function` that serves as the ajax method.
            return function(data) {
                // If the ajax method has it's own way of getting `data`, use that.
                data = ajaxMethod.data 
                    ? ajaxMethod.data.apply(this, arguments) 
                    // Otherwise use the data passed in.
                    : data;
                // Return the ajax method with `data` and the `type` provided.
                return this.ajax(str || this[ajaxMethod.url || "_url"], data, ajaxMethod.type || "get")
            }
        },
        setup: function(base) {
            // create store here if someone wants to use model without inheriting from it
            this.store = {};
            Jack.Observe.setup.apply(this, arguments);
            // Set default list as model list
            if (!Jack.Model)
                return;

            this.List = Jack.Model.List({
                    Observe: this
                }, {});
            var self = this,
                constructor = this.constructor,
                clean = Jack.proxy(this._clean, self);


            // go through ajax methods and set them up
            Jack.each(self.ajaxMethods, function(method, name) {
                // if an ajax method is not a function, it's either
                // a string url like findAll: "/recipes" or an
                // ajax options object like {url: "/recipes"}
                if (!Jack.isFunction(self[name]))
                    // use ajaxMaker to convert that into a function
                    // that returns a deferred with the data
                    self[name] = self.ajaxMaker(method, self[name]);

                // check if there's a make function like makeFindAll
                // these take deferred function and Jack do special
                // behavior with it (like look up data in a store)
                if (self["make" + Jack.capitalize(name)]) {
                    // pass the deferred method to the make method to get back
                    // the "findAll" method.
                    var newMethod = self["make" + Jack.capitalize(name)](self[name]);
                    Jack.Construct._overwrite(self, base, name, function() {
                        // increment the numer of requests
                        constructor._reqs++;
                        var def = newMethod.apply(this, arguments);
                        var then = def.then(clean, clean);
                        then.abort = def.abort;

                        // attach abort to our then and return it
                        return then;
                    })
                }
            });

            if (self.fullName == "Jack.Model" || !self.fullName)
                self.fullName = "Model" + (++self.modelNum);
                
            // Add ajax converters.
            Jack.Model._reqs = 0;
            this._url = this._shortName + "/{" + this.id + "}"
        },
        _ajax: function(){
            return this.ajaxMaker;
        },
        _makeRequest: function(){
            return this.makeRequest;
        },
        _clean: function() {
            Jack.Model._reqs--;
            if (!Jack.Model._reqs) {
                for (var id in this.store) {
                    if (!this.store[id]._bindings)
                        delete this.store[id];
                }
            }
            return arguments[0];
        },
        models: function(instancesRawData, oldList) {
            // until "end of turn", increment reqs counter so instances will be added to the store
            Jack.Model._reqs++;
            if (!instancesRawData)
                return;

            if (instancesRawData instanceof this.List)
                return instancesRawData;

            // Get the list type.
            var self = this,
                tmp = [],
                res = oldList instanceof Jack.Observe.List ? oldList : new(self.List || Jack.Model.List),
                // Did we get an `array`?
                arr = Jack.isArray(instancesRawData),

                // Did we get a model list?
                JML = (instancesRawData instanceof Jack.Model.List),

                // Get the raw `array` of objects.
                raw = arr ?

                // If an `array`, return the `array`.
                instancesRawData :

                // Otherwise if a model list.
                (JML ?
                    // Get the raw objects from the list.
                    instancesRawData.serialize() :

                    // Get the object's data.
                    instancesRawData.data),
                i = 0;

            if (typeof raw === 'undefined')
                throw new Error('Could not get any raw data while converting using .models');

            if (res.length)
                res.splice(0);

            Jack.each(raw, function(rawPart) {
                tmp.push(self.model(rawPart));
            });

            // We only want one change event so push everything at once
            res.push.apply(res, tmp);

            if (!arr) { // Push other stuff onto `array`.
                Jack.each(instancesRawData, function(val, prop) {
                    if (prop !== 'data')
                        res.attr(prop, val);
                })
            }
            // at "end of turn", clean up the store
            setTimeout(Jack.proxy(this._clean, this), 1);
            return res;
        },

        model: function(attributes) {
            if (!attributes)
                return;
                
            if (typeof attributes.serialize === 'function')
                attributes = attributes.serialize();
            
            var id = attributes[this.id],
                model = (id || id === 0) && this.store[id] ?
                    this.store[id].attr(attributes, this.removeAttr || false) : new this(attributes);
            if (Jack.Model._reqs)
                this.store[attributes[this.id]] = model;
                
            return model;
        }
    },{
        isNew: function() {
            var id = this.constructor.getId(this);
            return !(id || id === 0); // If `null` or `undefined`
        },
        save: function(success, error) {
            return this.constructor.makeRequest(this, this.isNew() ? 'create' : 'update', success, error);
        },
        destroy: function(success, error) {
            if (this.isNew()) {
                var self = this;
                var def = Jack.Deferred();
                def.then(success, error);
                return def.done(function(data) {
                    self.destroyed(data)
                }).resolve(self);
            }
            return this.constructor.makeRequest(this, 'destroy', success, error, 'destroyed');
        },
        _bindsetup: function() {
            this.constructor.store[this.__get(this.constructor.id)] = this;
            return Jack.Observe.prototype._bindsetup.apply(this, arguments);
        },
        _bindteardown: function() {
            delete this.constructor.store[this.constructor.getId(this)];
            return Jack.Observe.prototype._bindteardown.apply(this, arguments)
        },
        ___set: function(prop, val) { // Change `id`.
            Jack.Observe.prototype.___set.call(this, prop, val)
            // If we add an `id`, move it to the store.
            if (prop === this.constructor.id && this._bindings) {
                this.constructor.store[self.getId(this)] = this;
            }
        }
    });

    // Model lists are just like `Observe.List` except that when their items are 
    // destroyed, it automatically gets removed from the list.
   Jack.Observe.List("Jack.Model.List", {
        setup: function(params) {
            if (Jack.isPlainObject(params) && !Jack.isArray(params)) {
                Jack.Observe.List.prototype.setup.apply(this);
                this.replace(this.constructor.Observe.findAll(params))
            } else {
                Jack.Observe.List.prototype.setup.apply(this, arguments);
            }
        },
        _changes: function(ev, attr) {
            Jack.Observe.List.prototype._changes.apply(this, arguments);
            if (/\w+\.destroyed/.test(attr)) {
                var index = this.indexOf(ev.target);
                if (index != -1) {
                    this.splice(index, 1);
                }
            }
        }
    });
    
    Jack.each({makeFindAll: "models", makeFindOne: "model", makeCreate: "model", makeUpdate: "model"}, function(method, name) {
        Jack.Model[name] = function(oldMethod) {
            return function() {
                var args    = Jack.makeArray(arguments),
                    oldArgs = Jack.isFunction(args[1]) ? args.splice(0, 1) : args.splice(0, 2),
                    def     = Jack.Model.pipe(oldMethod.apply(this, oldArgs), this, method);
                    
                def.then(args[0], args[1]);
                // return the original promise
                return def;
            };
        };
    });

    Jack.each(["created", "updated", "destroyed"], function(funcName) {
        Jack.Model.prototype[funcName] = function(attrs) {
            // Update attributes if attributes have been passed
            var stub = attrs && typeof attrs == 'object' && this.attr(attrs.attr ? attrs.attr() : attrs);
            // triggers change event that bubble's like
            // handler( 'change','1.destroyed' ). This is used
            // to remove items on destroyed from Model Lists.
            // but there should be a better way.
            Jack.trigger(this, "change", funcName)
            // Call event on the instance's Class
            Jack.trigger(this.constructor, funcName, this);
        };
    });

	/**
	* Jack Control Class
	**/
	Jack.Construct("Jack.Control", {
		slice         : [].slice,
		paramReplacer : /\{([^\}]+)\}/g,
		special       : Jack.getObject("$.event.special", [Jack]) || {},
    	bind : function( el, ev, callback ) {
    		Jack.bind.call( el, ev, callback );
    		return function() {
    			Jack.unbind.call(el, ev, callback);
    		};
    	},
    	delegate : function( el, selector, ev, callback ) {
    		Jack.delegate.call(el, selector, ev, callback);
    		return function() {
    			Jack.undelegate.call(el, selector, ev, callback);
    		};
    	},
    	binder : function( el, ev, callback, selector ) {
    		return selector 
    				? this.delegate( el, Jack.trim( selector ), ev, callback ) 
    				: this.bind( el, ev, callback );
    	},
    	basicProcessor : function( el, event, selector, methodName, control ) {
    		return Jack.Control.binder( el, event, Jack.Control._shifter(control, methodName), selector);
    	},
		setup: function(){
			Jack.Construct.setup.apply( this, arguments );
			if ( Jack.Control ) {
				var control = this,
					funcName;
				control.actions = {};
				for ( funcName in control.prototype ) {
					if ( control._isAction(funcName) )
						control.actions[funcName] = control._action(funcName);
				}
			}
		},
		_shifter : function( context, name ) {
			var method = typeof name == "string" ? context[name] : name;

			if ( ! Jack.isFunction( method ))
				method = context[ method ];
			
			var self_slice = this.slice;
			
			return function() {
				context.called = name;
				return method.apply(context, [this.nodeName ? Jack.$(this) : this].concat( self_slice.call(arguments, 0)));
			};
		},
		_isAction: function( methodName ) {
			var val  = this.prototype[methodName],
				type = typeof val;
			// if not the constructor

			return (methodName !== 'constructor') &&
				// and is a function or links to a function
				( type == "function" || (type == "string" &&  Jack.isFunction(this.prototype[val] ) ) ) &&
				// and is in special, a processor, or has a funny character
				!! ( this.special[methodName] || this.processors[methodName] || /[^\w]/.test(methodName) );
		},
		_action: function( methodName, options ) {
			
			this.paramReplacer.lastIndex = 0;
			if ( options || ! this.paramReplacer.test( methodName )) {
				// If we have options, run sub to replace templates `{}` with a
				// value from the options or the window
				var convertedName = options ? Jack.sub(methodName, [options, window]) : methodName;
				if(!convertedName)
					return null;
				
				// If a `{}` template resolves to an object, `convertedName` will be
				// an array
				var arr = Jack.isArray(convertedName),
					// Get the name
					name = arr ? convertedName[1] : convertedName,
					// Grab the event off the end
					parts = name.split(/\s+/g),
					event = parts.pop();

				return {
					processor	: this.processors[event] || this.basicProcessor,
					parts		: [name, parts.join(" "), event],
					delegate 	: arr ? convertedName[0] : undefined
				};
			}
		},
		processors    : {},
		defaults      : {}
	},{
		setup: function( element, options ) {
			var self        = this.constructor,
				pluginname  = self.pluginName || self._fullName,
				arr;
				
			// Want the raw element here.
			this.element =Jack.$(element)

			if ( pluginname && pluginname !== 'Jack_control')
				// Set element and `className` on element.
				this.element.addClass(pluginname);

			arr = Jack.data(this.element,"controls") || Jack.data(this.element, "controls", arr = []);
			arr.push(this);

			this.options = Jack.extend({}, self.defaults, options);

			this.on();
			return [this.element, this.options];
		},
		on: function( el, selector, eventName, func ) {
			if ( ! el ) {
				// Adds bindings.
				this.off();

				// Go through the cached list of actions and use the processor 
				// to bind
				var self		= this.constructor;
				var bindings 	= this._bindings;
				var actions 	= self.actions;
				var element 	= this.element;
				var destroyCB 	= self._shifter(this, "destroy");
				var funcName, ready;

				for ( funcName in actions ) {
					// Only push if we have the action and no option is `undefined`
					if ( actions.hasOwnProperty( funcName ) && (ready = actions[funcName] || self._action(funcName, this.options)))
						bindings.push(ready.processor(ready.delegate || element, ready.parts[2], ready.parts[1], funcName, this));
				}

				// Setup to be destroyed...  
				// don't bind because we don't want to remove it.
				Jack.bind.call(element,"destroyed", destroyCB);
				bindings.push(function( el ) {
					Jack.unbind.call(el,"destroyed", destroyCB);
				});
				return bindings.length;
			}

			if ( typeof el == 'string' ) {
				func        = eventName;
				eventName   = selector;
				selector    = el;
				el          = this.element;
			}

			if(func === undefined) {
				func        = eventName;
				eventName   = selector;
				selector    = null;
			}

			if ( typeof func == 'string' )
				func = this.constructor._shifter(this,func);

			this._bindings.push( self.binder( el, eventName, func, selector ));

			return this._bindings.length;
		},
		off : function(){
			var el = this.element[0]
			Jack.each(this._bindings || [], function( value ) {
				value(el);
			});
			// Adds bindings.
			this._bindings = [];
		},	
		destroy: function() {
			//Control already destroyed
			if(this.element === null) {
				//!steal-remove-start
				console.log('Control.js - Control already destroyed')
				//steal.dev.warn("Control.js - Control already destroyed");
				//!steal-remove-end
				return;
			}
			var self = this.constructor,
				pluginName = self.pluginName || self._fullName,
				controls;

			// Unbind bindings.
			this.off();

			if(pluginName && pluginName !== 'Jack_control')
				// Remove the `className`.
				this.element.removeClass(pluginName);

			// Remove from `data`.
			controls = Jack.data(this.element, "controls");
			controls.splice(Jack.inArray(this, controls), 1);

			Jack.trigger( this, "destroyed"); // In case we want to know if the `control` is removed.

			this.element = null;
		}
	});
    
	// Set common events to be processed as a `basicProcessor`
	$.each(["change", "click", "contextmenu", "dblclick", "keydown", "keyup", "keypress", "mousedown", "mousemove", "mouseout", "mouseover", 
        "mouseup", "reset", "resize", "scroll", "select", "submit", "focusin", "focusout", "mouseenter", "mouseleave",
		// #104 - Add touch events as default processors
		// TOOD feature detect?
		"touchstart", "touchmove", "touchJackcel", "touchend", "touchleave"
	], function( v ) {
		Jack.Control.processors[v] = Jack.Control.basicProcessor;
	});
    
	/**
	* Jack Asset Class
	**/
    Jack.Construct("Jack.Asset", {
        setup : function(){
            Jack.Construct.setup.apply( this, arguments );
        },
        loaded : [],
        defaults : {
            location  : window.location.href.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/)[2],
            lowerCase : true
        },
        routes : {
			'Jack' 	 : {'path' : 'assets/jack/'},
			'Plugins': {'path' : 'assets/plugins/'},
			'Main' 	 : {'path' : 'assets/main/'},
			'Admin'  : {'path' : 'assets/admin/'}
        }
    },{
        setup : function(options){
            if (options.defaults !== undefined)
                Jack.extend(this.constructor.defaults, options.defaults, true);
                
            if (options.routes !== undefined)
                Jack.extend(this.constructor.routes, options.routes, true);        
        },
        getRoute : function(name){
            //Routes ismine göre yolu döndürüyoruz
			if (name !== undefined)
				return this.constructor.routes[name];
			else
				return this.constructor.routes;
        },
        require: function(str, callback, failcallback){
            str = Jack.isArray(str) ? str : [str];

            for (var i = 0; i < str.length; i++){
                this._write( this._progress(str[i]));
            };
        },
        _progress : function(str){
			var strs = str.split("::");
            
            if (strs.length == 1){
                return this.constructor.defaults.location + strs[0];
            }else{
                var routes = this.getRoute(strs[0])
                return ( routes !== undefined ) ? this.constructor.defaults.location + routes.path + strs[1] : this.constructor.defaults.location + strs[1]                
            }
        },
        _write : function(url, callback){
            
            if (this.constructor.defaults.lowerCase)
                url = url.toLowerCase();
            
            if (_(this.constructor.loaded).indexOf(url) > -1){
			    return false;
            }else if (url.match(/\.js$/)){
               $.getScript( url )
                
                
                //$(document.body).append('<script src="'+ url +'">');

            }else if (url.match(/\.css$/)){
                var d         = $.Deferred();
                var link      = document.createElement('link');
                    link.href = url;
                    link.type = 'text/css';
                    link.rel  = 'stylesheet';
                    
                document.getElementsByTagName('head')[0].appendChild(link);
                var img = document.createElement('img');
                    img.onerror = function(){
                        d.resolve();
                        if(callback) callback(link);
                    };
                    img.src = url;
                return d.promise();
            };
        }
    });  
    

	/**
	* Jack Util.Ajax Class
	* Object Literal Version
	*/		
	Jack.Util.Ajax = {
		documentTitle : function(title){
			document.title = title;
		},
		documentWrite : function(){
			for (var index in arguments) {
				$(document.writeContainer).append(arguments[index]);
			}
		},
		setDocumentWriteContainer : function(element){
			document.writeContainer = element;
		},
		overloadDocumentWrite : function(){
			if (!document.writeContainer)
				document.writeContainer = [$(document.body)]; //sorry :(

			document.write = Jack.Util.Ajax.documentWrite;
			document.write.into = function(element){
				Jack.Util.Ajax.setDocumentWriteContainer($(element));
			}
		}
	};	

	/**
	* Jack View Class
	*/		
	Jack.View = function(){
		this.vars = {};
	};
	//static
	Jack.View.templateCache 	= {};
	Jack.View.basePath 		= Jack.getBasePath() + 'App/View/'; //default base path.
	Jack.View.setBasePath = function(directory) {
		Jack.View.basePath = directory.replace(/\/+$/g, '');
	};
	Jack.View.prototype = {
		assign: function(hash){
			this.vars = $.extend(this.vars, hash);
		},
		render: function(view, onsuccess){
			var self = this;
			var tmplMarkup = $(view).html();
			var compiledTmpl = _.template(tmplMarkup, self.vars);
			onsuccess(compiledTmpl);
		},
		renderServer: function(server_route, data, onsuccess, method, type){
			if ( Jack.Registry.get('externalStatus') ){
				$.ajax( {
					url 		: '/admin'+ server_route,
					contentType	: "application/json; charset=UTF-8",
					dataType	: type,
					type 		: method,
					global 		: true,
					async		: false,
					success 	: onsuccess
				});
			};
			/**
			var self = this;
			if ( Jack.Autoloader.external ){
				
				if (!_(['post','get']).indexOf(method) > -1)
					method = 'post';
	
				$[method](server_route, data, function(data) {
					onsuccess(_.template(data, self.vars));
				}, type);
			}
			*/
		},
		renderServerJSON: function(server_route, data, onsuccess, method){
			this.renderServer(server_route, data, onsuccess, method, 'json');
		},
		renderString: function(string){
			return _.template(string, this.vars);
		}
	};
    
	/**
	* Jack Browser Class
	**/
    Jack.Construct("Jack.Browser", {
        version : parseFloat($.browser.version),
        msie    : !$.support.opacity,
        webkit  : $.browser.webkit || $.browser.safari,
        agent   : navigator.userAgent,
        window  : function(){
            try {
                return top.document !== undefined && top.document.title !== undefined && top.jQuery !== undefined && 
                    top.jQuery.address !== undefined && top.jQuery.address.frames() !== false ? top : window;
            } catch (e) { 
                return window;
            };
		},
        _uaMatch : function(ua) {
            ua = ua.toLowerCase();
            var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
                /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
                /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
                /(msie) ([\w.]+)/.exec( ua ) ||
                ua.indexOf('compatible') < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
                [];
            return {
                browser: match[ 1 ] || '',
                version: match[ 2 ] || '0'
            };
        },
        _detectBrowser : function() {
            var browser = {},
                matched = this._uaMatch(navigator.userAgent);
            if (matched.browser) {
                browser[matched.browser] = true;
                browser.version = matched.version;
            };
            if (browser.chrome)
                browser.webkit = true;
            else if (browser.webkit)
                browser.safari = true;
                
            return browser;
        }
    }, true);

	/**
	* Jack History Class
	**/
     Jack.Construct("Jack.History", {
        setup : function(){
            Jack.Construct.setup.apply( this, arguments );
        },
        special     : Jack.getObject("$.event.special", [Jack]) || {},
        defaults    : {autoUpdate:true, history:true, strict:true, frames:true, wrap:false},
        browser     : Jack.Browser(),
        window      : Jack.Browser.window(),
		element		: "a.ajaxify",
		_juststart  : true,
		_loaded 	: false,
        _silent	    : false,
        _updating   : false,
		_listeners  : {},
        _trigger : function(name, options){
			var self = Jack.History.prototype;
			var ev = Jack.extend(Jack.Event(name), (function() {
						var parameters 		= {};
						var parameterNames 	= self.parameterNames();
						for (var i = 0, l = parameterNames.length; i < l; i++) {
							parameters[parameterNames[i]] = self.parameter(parameterNames[i]);
						}
						return {
							state			: self.state(),
							value			: self.value(),
							path			: self.path(),
							pathNames		: self.pathNames(),
							parameterNames	: parameterNames,
							parameters		: parameters,
							queryString		: self.queryString(),
							clickHref		: options
			             };
					}).call(this.special));

            $(this.special).trigger(ev);  
		    return ev;                                
		},
        _array : function(obj){
			return Array.prototype.slice.call(obj)
		},
        _bind : function(value, data, fn){
			return $().bind.apply($(Jack.History.special), Array.prototype.slice.call(arguments) );
		},
        _unbind : function(value, data, fn){
			return $().unbind.apply(Jack.History.special, Array.prototype.slice.call(arguments));
		},
        _supportsState : function(){
			return (this.window.history.pushState && this.defaults.state !== undefined);
		},
        _hrefState : function(){
			var self = this;
			return ('/' + self.window.location.pathname.replace(new RegExp(self.defaults.state), '') + 
					this.window.location.search + (self._hrefHash() ? '#' + self._hrefHash() : '')).replace(/\/{2,9}/g, '/');
		},
        _hrefHash : function(){
			var index = this.window.location.href.indexOf('#');
			return (index != -1) ? this.window.location.href.substr(index + 1) : '';
		},
        _href : function(){
			return this._supportsState() ? this._hrefState() : this._hrefHash();
		},

        _strict : function(val){
			val = val.toString();
			return (this.defaults.strict && val.substr(0, 1) != '/' ? '/' : '') + val;
		},
        _cssint : function(el, value) {
            return parseInt(el.css(value), 10);
        },
        _listen : function(){
			var self = Jack.History;
			if (!self._silent) {
				var hash = self._href(),
                    diff = decodeURI(self._value) != decodeURI(hash);
                    
				if (diff) {
					if (self.browser.msie && self.browser.version < 7) {
						self.window.location.reload();
					} else {
						if (self.browser.msie && !'on hashchange' in self.window && self.defaults.history)
							setTimeout(self._html, 50);
						
						self._value = hash;
						self._update(false);
					};
				};
			};
		},
        _update : function(internal){
			var self = this;
            setTimeout(self._track, 10);
            return self._trigger('change').isDefaultPrevented() || 
                        self._trigger(internal ? 'internalChange' : 'externalChange').isDefaultPrevented();     
		},
        _track : function(){
			var self = Jack.History;
			if (self.defaults.tracker !== 'null' && self.defaults.tracker !== null) {
				var fn = Jack.isFunction(self.defaults.tracker) ? self.defaults.tracker : self.window[self.defaults.tracker],
					   value = (self.window.location.pathname + self.window.location.search + 
							(self.special && !self._supportsState() ? self.prototype.value() : ''))
							.replace(/\/\//, '/').replace(/^\/$/, '');
				if (Jack.isFunction(fn))
					fn(value);
				else if ($.isFunction(self.window.urchinTracker))
					self.window.urchinTracker(value);
				else if (self.window.pageTracker !== undefined && $.isFunction(self.window.pageTracker._trackPageview))
					self.window.pageTracker._trackPageview(value);
				else if (self.window._gaq !== undefined && $.isFunction(self.window._gaq.push))
					self.window._gaq.push(['_trackPageview', decodeURI(value)]);
				
			};
		},
        _html : function(){
            var self = Jack.History;
			var src = 'javascript:false;document.open();document.writeln(\'<html><head><title>' + 
				self._title.replace(/\'/g, '\\\'') + '</title><script>var jQueryAddress = "' + encodeURIComponent(self._href()).replace(/\'/g, '\\\'') + 
				(self.window.document.domain != self.window.location.hostname ? '";document.domain="' + self.window.document.domain : '') + 
				'";</' + 'script></head></html>\');document.close();';
			
			if (self.browser.version < 7)
				self._frame.src = src;
			else
				self._frame.contentWindow.location.replace(src);
		},
	    _options : function(){
            this._value      = this._href();
            this._title      = this.window.title;
		},
        _load : function(self){
			var self = Jack.History;
			
			if (!self._loaded) {
				self._loaded = true;
                self._options();
				
				if (self.defaults.wrap) {
					var wrap = $('body > *')
						.wrapAll('<div style="padding:' + 
							(self._cssint(body, 'marginTop') + self._cssint(body, 'paddingTop')) + 'px ' + 
							(self._cssint(body, 'marginRight') + self._cssint(body, 'paddingRight')) + 'px ' + 
							(self._cssint(body, 'marginBottom') + self._cssint(body, 'paddingBottom')) + 'px ' + 
							(self._cssint(body, 'marginLeft') + self._cssint(body, 'paddingLeft')) + 'px;" />')
						.parent()
						.wrap('<div id="jQueryAddress" style="height:100%;overflow:auto;position:relative;' + 
							(self.browser.webkit && !window.statusbar.visible ? 'resize:both;' : '') + '" />');
					$('html, body')
						.css({
							height	: '100%',
							margin	: 0,
							padding	: 0,
							overflow: 'hidden'
						});
					if (self.browser.webkit) {
						$('<style type="text/css" />')
							.appendTo('head')
							.text('#jQueryAddress::-webkit-resizer { background-color: #fff; }');
					}
				}
				if (self.browser.msie && !'on hashchange' in self.window) {
					var frameset 	= self.window.document.getElementsByTagName('frameset')[0];
					self._frame 	= self.window.document.createElement((frameset ? '' : 'i') + 'frame');
					self._frame.src = 'javascript:false';
					
					if (frameset) {
						frameset.insertAdjacentElement('beforeEnd', self._frame);
						frameset[frameset.cols ? 'cols' : 'rows'] += ',0';
						self._frame.noResize 		= true;
						self._frame.frameBorder 	= self._frame.frameSpacing = 0;
					} else {
						self._frame.style.display 	= 'none';
						self._frame.style.width 	= self._frame.style.height = 0;
						self._frame.tabIndex 		= -1;
						self.window.document.body.insertAdjacentElement('afterBegin', self._frame);
					};
					
					setTimeout(function() {
						$(self._frame).bind('load', function() {
							var win = self._frame.contentWindow;

							self._value = win['jQueryAddress'] !== undefined ? win['jQueryAddress'] : '';
							
                            if (self._value != self._href()) {
								self._update(false);
								self.window.location.hash = self._value;
							}
						});
						if (self._frame.contentWindow['jQueryAddress'] === undefined) {
							self._html();
						}
					}, 50);
				};
				
				setTimeout(function() {
						self._trigger('init');
						self._update(false);
					}, 1);
				
				if (!self._supportsState()) {
					if ((self.browser.msie && self.browser.version > 7) || (!self.browser.msie && 'on hashchange' in self.window)) {
						if (self.window.addEventListener) {
							self.window.addEventListener('hashchange', self._listen, false);
						} else if (self.window.attachEvent) {
							self.window.attachEvent('on hashchange', self._listen);
						};
					} else {
						setInterval(self._listen, 50);
					};
				};
				if ('state' in window.history) {
					$(window).trigger('popstate');
				};
			}
		},
        _popstate : function() {
            var self = Jack.History;
            if (decodeURI(self._value) != decodeURI(self._href())) {
                self._value = self._href();
                self._update(false);
            };
        },
        _unload : function() {
            var self = Jack.History;
            if (self.window.removeEventListener)
                self.window.removeEventListener('hashchange', self._listen, false);
            else if (self.window.detachEvent)
                self.window.detachEvent('on hashchange', self._listen);
        }
    },{
        setup : function(element, options){ 
            if (options !== undefined && options.defaults !== undefined)
                Jack.extend(this.constructor.defaults, options.defaults, true);
        },
        ready : function(){
			var self        = this;
            self.window     = this.constructor.window;
            self.browser    = this.constructor.browser;

			$(document).on('click', ".ajaxify", function(e) { 
				e.preventDefault();
				
				if (e.shiftKey || e.ctrlKey || e.metaKey || e.which == 2)
					return true;
					
				var target = e.currentTarget;
				self.constructor._trigger("onClick", $(target).attr('href').replace(new RegExp('^(.*' + self.state() + '|\\.)'), ''));
			});

			if (self.browser.msie) {
				self.browser.version = parseFloat(self.browser.agent.substr(self.browser.agent.indexOf('MSIE') + 4));
				if (self.window.document.documentMode && self.window.document.documentMode != self.browser.version)
					self.browser.version = self.window.document.documentMode != 8 ? 7 : 8;
				
				
				var pc = self.window.document.onpropertychange;
				self.window.document.onpropertychange = function() {
						if (pc)  
                            pc.call(self.window.document);
						if (self.window.document.title != self.constructor._title && self.window.document.title.indexOf('#' + self.constructor._href()) != -1)  self.window.document.title = self.constructor._title;
					}
			};
			
			if (self.window.history.navigationMode)
				self.window.history.navigationMode = 'compatible';
			
			if (document.readyState == 'complete') {
				var interval = setInterval(function() {
						if (self.constructor.special) {
							self.constructor._load();
							clearInterval(interval);
						}
					}, 50);
			} else {
				self.constructor._options();
				$(self.constructor._load);
			};
			
			$(window).bind('popstate', self.constructor._popstate).bind('unload', self.constructor._unload);
        },
        bind: function(type, data, fn) {
            return this.constructor._bind.apply(this, this.constructor._array(arguments));
        },
        unbind: function(type, fn) {
            return this.constructor._unbind.apply(this, this.constructor._array(arguments));
        },
        change: function(data, fn) {
            return this.constructor._bind.apply(this, ['change'].concat(this.constructor._array(arguments)));
        },
        internalChange: function(data, fn) {
            return this.constructor._bind.apply(this, ['internalChange'].concat(this.constructor._array(arguments)));
        },
        externalChange: function(data, fn) {
            return this.constructor._bind.apply(this, ['externalChange'].concat(this.constructor._array(arguments)));
        },
		baseURL : function(){
			var url = this.constructor.window.location.href;
            
			if (url.indexOf('#') != -1) 
                url = url.substr(0, url.indexOf('#'));
                
			if (/\/$/.test(url)) 		
                url = url.substr(0, url.length - 1);
                    
			return url;
		},
		autoUpdate : function(val){
			return (val !== undefined) ? this.constructor.defaults.autoUpdate = val : this.constructor.defaults.autoUpdate;
		},
		history : function(val){
			return (val !== undefined) ? this.constructor.defaults.history = val : this.constructor.defaults.history;
		},
		strict : function(val){
			return (val !== undefined) ? this.constructor.defaults.strict = val : this.constructor.defaults.strict;
		},
		tracker : function(val){
			return (val !== undefined) ? this.constructor.defaults.tracker = val : this.constructor.defaults.tracker;
		},
		wrap : function(val){
			return (val !== undefined) ? this.constructor.defaults.tracker = val : this.constructor.defaults.tracker;
		},
		update : function(){
			this.defaults.updating = true;
			this.value(this.constructor._value);
			this.defaults.updating = false;
			return this;
		},
		state : function(val){
			var self = this.constructor;

			if (val !== undefined) {
				
				self.defaults.state = val;
				var hrefState 		= self._hrefState();
				
				if (self.defaults.state !== undefined) {
					if (self.window.history.pushState) {
						if (hrefState.substr(0, 3) == '/#/')
							self.window.location.replace(self.defaults.state.replace(/^\/$/, '') + hrefState.substr(2));
                            
					} else if (hrefState != '/' && hrefState.replace(/^\/#/, '') != self._hrefHash()) {
						setTimeout(function() {
							self.window.location.replace(self.defaults.state.replace(/^\/$/, '') + '/#' + hrefState);
						}, 1);
					};
				};
			};

			return self.defaults.state;
		},
		title : function(val){
            var self = this.constructor;   
			if (val !== undefined) {
				setTimeout(function() {
					self._title = self.window.document.title = val;
					if (self._juststart && self._frame && self._frame.contentWindow && self._frame.contentWindow.document) {
						self._frame.contentWindow.document.title = val;
						self._juststart = false;
					}
				}, 50);
				return this;
			}
			return self.window.document.title;
		},
		value : function(val){
			var self = this.constructor;
			if (val !== undefined) {
				val = self._strict(val);
				if (val == '/')
					val = '';
				
				if (self._value == val && !self.defaults.updating)
					return;
				
				self._value = val;			
				if (self.defaults.autoUpdate || self.defaults.updating) {
					if (self._update(true))
                        return this;
					
					if (self._supportsState()) {
						self.window.history[self.defaults.history ? 'pushState' : 'replaceState'](
                                {}, '', self.defaults.state.replace(/\/$/, '') + (self._value === '' ? '/' : self._value)
                            );
					} else {
						self._silent = true;
						if (self.browser.webkit) {
							(self.defaults.history)
								? self.window.location.hash = '#' + self._value
                                : self.window.location.replace('#' + self._value);

						} else if (self._value != self._href()) {
							(self.defaults.history)
								? self.window.location.hash = '#' + self._value
                                : self.window.location.replace('#' + self._value, true);
						}
						if ((self.browser.msie && !'on hashchange' in self.window) && self.defaults.history)
							setTimeout(self._html, 50);
						
						(self.browser.webkit)
							 ? setTimeout(function(){ self._silent = false; }, 1)
                             : self._silent = false;
					}
				}
				return this;
			}
			return self._strict(self._value);
		},
		path : function(val){
			if (val !== undefined) {
				var qs 	    = this.queryString(),
                    hash 	= this.hash();
				
				this.value(val + (qs ? '?' + qs : '') + (hash ? '#' + hash : ''));
				return this;
			}
			return this.constructor._strict(this.constructor._value).split('#')[0].split('?')[0];
		},
		pathNames : function(){
			var path    = this.path(),
                names   = path.replace(/\/{2,9}/g, '/').split('/');
                
			if (path.substr(0, 1) == '/' || path.length === 0)
				names.splice(0, 1);
			
			if (path.substr(path.length - 1, 1) == '/')
				names.splice(names.length - 1, 1);
			
			return names;	
		},
		queryString	: function(val){
			if (val !== undefined) {
				var hash = this.hash();
				this.value(this.path() + (val ? '?' + val : '') + (hash ? '#' + hash : ''));
				return this;
			}
			var arr = this.constructor._value.split('?');
			return arr.slice(1, arr.length).join('?').split('#')[0];
		},
		parameter : function(name, val, append){
			var i, params;
            
			if (val !== undefined) {
				var names 	= this.parameterNames(),
				    params 	= [];
				    val 	= val === undefined || val === NULL ? '' : val.toString();
				
				for (i = 0; i < names.length; i++) {
					var n = names[i],
						v = this.parameter(n);
                        
					if (typeof v == 'string')
						v = [v];
					if (n == name)
						v = (val === NULL || val === '') ? [] : (append ? v.concat([val]) : [val]);		
					for (var j = 0; j < v.length; j++) {
						params.push(n + '=' + v[j]);
					}
				}
				if (Jack.inArray(name, names) == -1 && val !== NULL && val !== '')
					params.push(name + '=' + val);
				
				this.queryString(params.join('&'));
				return this;
			};
            
			val = this.queryString();
			if (val) {
				var r = [];
				params = val.split('&');
				for (i = 0; i < params.length; i++) {
					var p = params[i].split('=');
					if (p[0] == name)
						r.push(p.slice(1).join('='));
				}
				if (r.length !== 0) 
					return r.length != 1 ? r : r[0];
			};	
		},
		parameterNames : function(){
    		var qs 	  = this.queryString(),
                names = [];
    		if (qs && qs.indexOf('=') != -1) {
    			var params = qs.split('&');
    			for (var i = 0; i < params.length; i++) {
    				var name = params[i].split('=')[0];
    				if (Jack.inArray(name, names) == -1)
    					names.push(name);
    			}
    		}
    		return names;
    	},
		hash : function(val){
			if (val !== undefined) {
				this.value(this.constructor._value.split('#')[0] + (val ? '#' + val : ''));
				return this;
			}
			var arr = this.constructor._value.split('#');
			return arr.slice(1, arr.length).join('#');   
		}
    });     
    
    
	/**
	* Jack History set Router Class
	**/
    Jack.History("Jack.Router", {
		routes 	  : {},
    },{
        addRoute : function(route, realpath){
			realpath 		= _(realpath.split('.')).compact();
			var controller 	= realpath.splice(0,realpath.length-1).join('.');
			var callback 	= realpath.pop();

			this.constructor.routes[route] = {'controller': controller, 'method': callback};
        },
        init : function(){
            this.ready();
        },
        ready : function(){
			var self = this,
                parameters,
                bind;
            self.init = false;		
            
            this.bind("onClick", function(e){
                parameters = {loaded : true, history : { bind : "click", value : e.clickHref }}; 
                self._dispatch(e.clickHref, parameters);
            });

			this.bind("externalChange", function(e){
				if (!self.init){
					bind  = "load";
					self.init = true;
				}else{
					bind = "external";
				};
                
                parameters = {loaded : true, history : { bind : bind, value : e.value }};
                self._dispatch(e.value, parameters);
			});
        },
        _run : function(callback, parameters){
			var self = this;
            
			if (typeof callback != 'object')
				return false;

			var controller = Jack.getInstance(callback['controller']);

			if (typeof controller[callback['method'] + 'Action'] != 'function')
				return false;
			
			controller[callback['method'] + 'Action'](parameters||{});
            
			//if (data == undefined)
				//self.history.value(parameters.history.value);

			return true;

        },
        _dispatch : function (hash, parameters) {
            var self = this;

			for (var route in self.constructor.routes) {
				var regex = XRegExp('^' + route + '$', 'x');
            
				if (regex.test(hash)) {
					var exec   = regex.exec(hash);
					exec       = parameters;
					            
					self._run(self.constructor.routes[route], exec);
					return;
                    
				};
			};

			//if hash is null or empty then it is default, if not, it is a 404 page.
			if (_([null, '']).indexOf(Jack.trim(hash)) > -1){
				if (_(self.constructor.routes).chain().keys().indexOf(self.constructor.DEFAULT).value() > -1)
					self.run(self.constructor.routes[self.constructor.DEFAULT]);

			}else{
				if (_(this.constructor.routes).chain().keys().indexOf(this.constructor.ERROR).value() > -1)
					self.run(self.constructor.routes[self.constructor.ERROR], {code: 404});
			}
        }
    });

	
})(jQuery);