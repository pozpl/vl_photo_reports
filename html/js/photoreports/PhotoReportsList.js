/**
 * Created with JetBrains PhpStorm.
 * User: pozpl
 * Date: 20.01.13
 * Time: 19:10
 * To change this template use File | Settings | File Templates.
 */

define(["dojo/_base/declare", "dojo/_base/array", "dojo/_base/lang", "dojo/i18n", "dojo/dom-class",
	"dojo/dom-attr", "dojox/mobile/ScrollableView", "dojox/mobile/ListItem", "dojo/DeferredList",
	"dojo/request", "dijit/registry", "dojo/query", "custom/PhotoReportBadgeWidget"],
	function(declare, arrayUtil, lang, i18n, domClass, domAttr, ScrollableView, ListItem, DeferredList,
	         ioScript, registry, query, PhotoReportBageWidget) {
		// Return the declared class!
		return declare("photoreports.PhotoReportsList", [ScrollableView], {
			// URL to pull tweets from; simple template included
			serviceUrl: "http://localhost:5000/app/get/json/all",
			// Create a template string for tweets:
			tweetTemplateString: '<img src="${avatar}" alt="${name}" class="photo_report_poster" />' +
				'<div class="eventName">${event_name}</div>',
			// Icon for loading...
			iconLoading: require.toUrl("photoreports/resources/images/loading.gif"),

			// When the widgets have started....
			startup: function() {
				// Retain functionality of startup in dojox/mobile/ScrollableView
				this.inherited(arguments);

				this.refreshPhotoReportsList();

			},

			refreshPhotoReportsList: function(){
				var photoReportsDeferred = ioScript.get(this.serviceUrl, {
//					jsonp: "callback",
					preventCache: false,
					timeout: 4000,
					handleAs: 'json'
				});
				photoReportsDeferred.then(lang.hitch(this,function(data){
					this.showPhotoReports(data);
				}),function(err){
					//nothing here yet
				});
			},

			showPhotoReports: function(photoReportsArray){
				var lastReportsList = query(".lastReportsList")[0];

				arrayUtil.forEach(photoReportsArray, function(photoReport){
					var item = new ListItem({
						"class": "photoReportsListItem"
					}).placeAt(lastReportsList, "first");
//					item.containerNode.innerHTML = photoReport.event_id;
					var photoReportWidget = new PhotoReportBageWidget(photoReport).placeAt(item.containerNode);
					photoReportWidget.eventName = "some";
				}, this);
			},

			showLoadImage: function(){
//				photoReportsListRefresh

			}


		});
	});
