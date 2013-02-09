define(["dojo/_base/declare", "dojo/_base/array", "dojo/_base/lang", "dojo/i18n", "dojo/dom-class",
	"dojo/dom-attr","dojox/mobile/View", "dojox/mobile/SwapView", "dojo/store/Memory", "dijit/registry",
	"dojox/dtl", "dojox/dtl/Context"],
	function(declare, arrayUtil, lang, i18n, domClass, domAttr, View,
	         Memory, registry, dtl, dtlContext) {
		// Return the declared class!
		return declare("photoreports.PhotoSlideShow", [View], {
			//Store to get
			photoReportStore : {},
			//swapViews
			swapViewsArray : new Array(),

			imageTemplateString: '<img src="{{src}}"/>',

			// When the widgets have started....
			startup: function() {
				// Retain functionality of startup in dojox/mobile/View
				this.inherited(arguments);

			},


			setPhotoReportStore: function(photosArray) {console.log('set');
				var preparedImagesArray = new Array();
				arrayUtil.forEach(photosArray, function(image, imageIndex){
					preparedImagesArray[imageIndex] = {
						'src' : 'http://img.vl.ru/i/catalog/' + image.imageFilePathBig,
						'value' : '',
						'headerText' : ''
					};

				}, this);
				this.photoReportStore = preparedImagesArray;
				this.destroyCurrentSwapViews();
				this.createSwapViewsForData();
			},
			//function to destroy previous swap views
			destroyCurrentSwapViews: function(){
				arrayUtil.forEach(this.swapViewsArray, function(swapView, index){
					swapView.destroy();
				});
			},

			createSwapViewsForData: function(){console.log('create bunch of swap views');
				arrayUtil.forEach(this.photoReportStore, function(image, index){
					var swapViewId = this.id + "swap_view" + index;
					var swapViewNew=new dojox.mobile.SwapView({
						id:swapViewId
					});
					this.addChild(swapViewNew);

					var template = new dtl.Template(this.imageTemplateString);
					var context = new dtlContext({
						'src': image.src
					});

					swapViewNew.containerNode.innerHTML = template.render(context);
					this.swapViewsArray.push(swapViewNew);
				}, this);

			}

		});
	});
