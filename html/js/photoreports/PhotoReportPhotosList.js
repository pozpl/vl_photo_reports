define(["dojo/_base/declare", "dojo/_base/array", "dojo/_base/lang", "dojo/i18n", "dojo/dom-class",
	"dojo/dom-attr", "dojox/mobile/ScrollableView", "dojox/mobile/ListItem", "dojo/DeferredList",
	"dojo/request", "dijit/registry", "dojo/query", "dojox/dtl", "dojox/dtl/Context", "dojox/mobile/Pane"],
	function(declare, arrayUtil, lang, i18n, domClass, domAttr, ScrollableView, ListItem, DeferredList,
	         ioScript, registry, query, dtl, dtlContext, Pane) {
		// Return the declared class!
		return declare("photoreports.PhotoReportPhotosList", [ScrollableView], {
			// URL to pull tweets from; simple template included
			serviceUrl: "http://localhost:5000/app/get/json",
			// Create a template string for tweets:
			// Icon for loading...
			iconLoading: require.toUrl("photoreports/resources/images/loading.gif"),

			imageTemplateString:'<div class="photos_list_img"' +
				+'style="background-image:url({{img_address}}); " '+
				'> </div>',

			// Here will be placed information for photo report
			photoReportJson : '',

			// When the widgets have started....
			startup: function() {
				// Retain functionality of startup in dojox/mobile/ScrollableView
				this.inherited(arguments);

//				if(this.photoReportJson && this.photoReportJson.length){
//					this.showPhotosList(this.photoReportJson);
//				}
			},


			showPhotosList: function(photosJson, eventName){
				var photoReportHeader = query("#single_photo_report_header")[0];
				photoReportHeader.list = eventName;

				var photosArray = photosJson.imagesInPeriod;
				var photosGrid = registry.byNode(query('.photos_grid')[0]);

				arrayUtil.forEach(photosArray, function(image){
					var pane = new Pane();
					photosGrid.addChild(pane);

					var template = new dtl.Template(this.imageTemplateString);
					var context = new dtlContext({
						'img_address': 'http://img.vl.ru/i/catalog/' + image.imageFilePathMiddle
					});

					pane.containerNode.innerHTML = template.render(context);
					//var button1 = new Button({label:"Button 1", class:"mblBlueButton"});
					//button1.placeAt(pane1.containerNode);
					//button1.startup();

				}, this);
			},

			showLoadImage: function(){
//				photoReportsListRefresh

			}


		});
	});
