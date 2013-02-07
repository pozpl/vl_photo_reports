define(["dojo/_base/declare", "dojo/_base/array", "dojo/_base/lang", "dojo/i18n", "dojo/dom-class",
	"dojo/dom-attr", "dojox/mobile/StoreCarousel", "dojox/mobile/ListItem", "dojo/DeferredList",
	"dojo/request", "dijit/registry", "dojo/query", "dojox/dtl", "dojox/dtl/Context"],
	function(declare, arrayUtil, lang, i18n, domClass, domAttr, ScrollableView, ListItem, DeferredList,
	         ioScript, registry, query, dtl, dtlContext) {
		// Return the declared class!
		return declare("photoreports.PhotoCarousel", [StoreCarousel], {
			//Store to get
			photoReportStore : '',

			// When the widgets have started....
			startup: function() {
				// Retain functionality of startup in dojox/mobile/ScrollableView
				this.inherited(arguments);
			},


			setPhotoReportStore: function(photosArray) {
				var preparedImagesArray = new Array();
				arrayUtil.forEach(photosArray, function(image, imageIndex){
					preparedImagesArray[imageIndex] = {
						'src' : image.imageFilePathMiddle,
						'value' : '',
						'headerText' : imageIndex
					}

				}, this)
			}

		});
	});
