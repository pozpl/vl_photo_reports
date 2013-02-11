define(["dojo/_base/declare", "dojo/_base/array", "dojo/_base/lang", "dojo/i18n", "dojo/dom-class",
	"dojo/dom-attr","dojox/mobile/ScrollableView", "dojox/mobile/SwapView", "dijit/registry",
	"dojox/dtl", "dojox/dtl/Context", "dojo/query"],
	function(declare, arrayUtil, lang, i18n, domClass, domAttr, ScrollableView, SwapView,
	         registry, dtl, dtlContext, query) {
		// Return the declared class!
		return declare("photoreports.PhotoSlideShow", [ScrollableView], {
			//Store to get
			photoReportStore : {},
			//swapViews
			swapViewsArray : new Array(),
			//current period id
			currentPeriodId: 0,
			//active image id to show
			activeImageId: 0,

			imageTemplateString: '<div class="slide_show_item">' +
				'<div class="img_container" style="background-image: url({{src}})">&nbsp;' +
				'<div class="padding_left_top">' +
				'</div><div>',

			// When the widgets have started....
			startup: function() {
				// Retain functionality of startup in dojox/mobile/View
				this.inherited(arguments);

				dojo.connect(this, "onAfterTransitionIn", null,
					function(moveTo, dir, transition, context, method){
						this.showSwapViewWithIndex(this.activeImageId);
				});
			},


			setPhotoReportStore: function(photosArray, periodId, activeImageIndex) {
				if(this.currentPeriodId != periodId){
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
					this.currentPeriodId = periodId;
				}
				this.activeImageId = activeImageIndex;
			},
			//function to destroy previous swap views
			destroyCurrentSwapViews: function(){
				arrayUtil.forEach(this.swapViewsArray, function(swapView, index){
					swapView.destroy();
				});
				this.swapViewsArray = new Array();
			},

			createSwapViewsForData: function(){
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

			},

			showSwapViewWithIndex: function(imageToShowIndex){
//				var swapViewWidget  = query("#" + this.id + "swap_view" + imageToShowIndex)[0];
//				if(swapViewWidget && swapViewWidget.length){console.log(this.id + "swap_view" + imageToShowIndex);
//					swapViewWidget.show();
//				}
				this.swapViewsArray[imageToShowIndex].show();
			}

		});
	});
