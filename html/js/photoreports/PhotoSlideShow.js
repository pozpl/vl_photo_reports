define(["dojo/_base/declare", "dojo/_base/array", "dojo/_base/lang", "dojo/i18n", "dojo/dom-class",
	"dojo/dom-attr","dojox/mobile/View", "dojox/mobile/SwapView", "dojo/store/Memory", "dijit/registry"],
	function(declare, arrayUtil, lang, i18n, domClass, domAttr, View,
	         Memory, registry) {
		// Return the declared class!
		return declare("photoreports.PhotoCarousel", [View], {
			//Store to get
			photoReportStore : {},
			//swapViews
			swapViewsArray : new Array(),

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
			},
			//function to destroy previous swap views
			destroyCurrentSwapViews: function(){
				arrayUtil.forEach(this.swapViewsArray, function(swapView, index){
					swapView.destroy();
				})
			},

			createSwapViewsForData: function(){

			}

		});
	});
