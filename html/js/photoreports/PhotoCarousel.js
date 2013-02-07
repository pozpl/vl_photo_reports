define(["dojo/_base/declare", "dojo/_base/array", "dojo/_base/lang", "dojo/i18n", "dojo/dom-class",
	"dojo/dom-attr","dojox/mobile/ScrollableView", "dojox/mobile/StoreCarousel", "dojo/store/Memory", "dijit/registry"],
	function(declare, arrayUtil, lang, i18n, domClass, domAttr, ScrollableView, StoreCarousel,
	          Memory, registry) {
		// Return the declared class!
		return declare("photoreports.PhotoCarousel", [ScrollableView], {
			//Store to get
			photoReportStore : {},

			photoCarousel: registry.byId("photo_carousel"),
			// When the widgets have started....
			startup: function() {
				// Retain functionality of startup in dojox/mobile/ScrollableView
				this.inherited(arguments);

//				this.photoCarousel = registry.byId("photo_carousel");
//				photoCarousel.setPhotoReportStore(photosArray);
				photoCarousel.startup();

//				var photoCarousel = new StoreCarousel({
//					store: sampleStore,
//					height: "150px",
//					navButton: true,
//					numVisible: 2,
//					title: "Category"
//				}, "carousel1");
//				carousel.startup();
			},


			setPhotoReportStore: function(photosArray) {console.log('set');
				var preparedImagesArray = new Array();
				arrayUtil.forEach(photosArray, function(image, imageIndex){
					preparedImagesArray[imageIndex] = {
						'src' : 'http://img.vl.ru/i/catalog/' + image.imageFilePathMiddle,
						'value' : '',
						'headerText' : ''
					};

				}, this);
				this.photoReportStore = new Memory({data: {
					'items': preparedImagesArray
				}});
				this.photoCarousel.setStore(this.photoReportStore);
			}

		});
	});
