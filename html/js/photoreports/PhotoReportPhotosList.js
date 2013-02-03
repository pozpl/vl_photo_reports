define(["dojo/_base/declare", "dojo/_base/array", "dojo/_base/lang", "dojo/i18n", "dojo/dom-class",
	"dojo/dom-attr", "dojox/mobile/ScrollableView", "dojox/mobile/ListItem", "dojo/DeferredList",
	"dojo/request", "dijit/registry", "dojo/query", "dojox/dtl", "dojox/dtl/Context"],
	function(declare, arrayUtil, lang, i18n, domClass, domAttr, ScrollableView, ListItem, DeferredList,
	         ioScript, registry, query, dtl, dtlContext) {
		// Return the declared class!
		return declare("photoreports.PhotoReportPhotosList", [ScrollableView], {
			// URL to pull tweets from; simple template included
			serviceUrl: "http://localhost:5000/app/get/json",
			// Create a template string for tweets:
			// Icon for loading...
			iconLoading: require.toUrl("photoreports/resources/images/loading.gif"),

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


			showPhotosList: function(photosJson, eventNote){
				var photoReportHeader = query("#single_photo_report_header")[0];
				photoReportHeader.list = eventName;

				var photosArray = photosJson.imagesInPeriod;

				arrayUtil.forEach(photosArray, function(image){
					alert(image.imageId);

				}, this);
			},

			showLoadImage: function(){
//				photoReportsListRefresh

			}


		});
	});
