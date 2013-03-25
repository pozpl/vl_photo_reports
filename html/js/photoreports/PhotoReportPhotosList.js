define(["dojo/_base/declare", "dojo/_base/array", "dojo/_base/lang", "dojo/i18n", "dojo/dom-class",
	"dojo/dom-attr", "dojox/mobile/ScrollableView", "dojox/mobile/ListItem", "dojo/DeferredList",
	"dojo/request", "dijit/registry", "dojo/query", "dojox/dtl", "dojox/dtl/Context", "dojox/mobile/Pane",
	"dojo/dom-construct", "dojo/on"],
	function(declare, arrayUtil, lang, i18n, domClass, domAttr, ScrollableView, ListItem, DeferredList,
	         ioScript, registry, query, dtl, dtlContext, Pane, domConstruct, on) {
		// Return the declared class!
		return declare("photoreports.PhotoReportPhotosList", [ScrollableView], {
			// URL to pull tweets from; simple template included
//			serviceUrl: "http://localhost:5000/app/get/json",
			serviceUrl: "/app/get/json",

			// Create a template string for tweets:
			// Icon for loading...
			iconLoading: require.toUrl("photoreports/resources/images/loading.gif"),

			imageTemplateString: '<div class="photos_list_padding_div">'
				+ '<div align="center" class="photos_list_img" style="background-image:url({{img_address}})"></div>'
				+ '</div>',

			// Here will be placed information for photo report
			photoReportJson : '',

			// When the widgets have started....
			startup: function() {
				// Retain functionality of startup in dojox/mobile/ScrollableView
				this.inherited(arguments);

//				if(this.photoReportJson && this.photoReportJson.length){
//					this.showPhotosList(this.photoReportJson);
//				}
//				dojo.connect(this, "onBeforeTransitionIn", null,
//					function(moveTo, dir, transition, context, method){
//						query(".photos_grid").forEach(domConstruct.empty);
//				});
                var firstScreenHash = "last_photoreports";
                var windowHash = window.location.hash;
                if(windowHash.indexOf(firstScreenHash) == -1){
                    this.performTransition("#" + firstScreenHash);
                }
			},


			showPhotosList: function(photosJson, eventName, periodId){
				query(".photos_grid").forEach(domConstruct.empty);

				var photoReportHeader = registry.byNode(query("#single_photo_report_header")[0]);
//				photoReportHeader.label = eventName;
				photoReportHeader.set("label", eventName);

				var photosArray = photosJson.imagesInPeriod;
				var photosGrid = registry.byNode(query('.photos_grid')[0]);

				arrayUtil.forEach(photosArray, function(image, imageindex){
					var pane = new Pane();
					photosGrid.addChild(pane);

					var template = new dtl.Template(this.imageTemplateString);
					var context = new dtlContext({
						'img_address': 'http://img.vl.ru/i/catalog/' + image.imageFilePathMiddle
					});

					pane.containerNode.innerHTML = template.render(context);
					on(pane.containerNode, 'click', lang.hitch(this, function(){
						var photoCarousel = registry.byId("photo_carousel_view");
						photoCarousel.setPhotoReportStore(photosArray, periodId, imageindex);
						this.performTransition("#photo_carousel_view");
					}))
				}, this);
			},

			showLoadImage: function(){
//				photoReportsListRefresh

			}


		});
	});
