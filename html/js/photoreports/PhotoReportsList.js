/**
 * Created with JetBrains PhpStorm.
 * User: pozpl
 * Date: 20.01.13
 * Time: 19:10
 * To change this template use File | Settings | File Templates.
 */

define(["dojo/_base/declare", "dojo/_base/array", "dojo/_base/lang", "dojo/i18n", "dojo/dom-class",
	"dojo/dom-attr", "dojox/mobile/ScrollableView", "dojox/mobile/ListItem", "dojo/DeferredList",
	"dojo/request", "dijit/registry", "dojo/query", "dojox/dtl", "dojox/dtl/Context"],
	function(declare, arrayUtil, lang, i18n, domClass, domAttr, ScrollableView, ListItem, DeferredList,
	         ioScript, registry, query, dtl, dtlContext) {
		// Return the declared class!
		return declare("photoreports.PhotoReportsList", [ScrollableView], {
			// URL to pull tweets from; simple template included
//			serviceUrl: "http://localhost:5000/app/get/json/all",
			serviceUrl: "/app/get/json/all",

			// Create a template string for tweets:
			photoReportTemplateString:'<div class="events_list_item">'+
				'<div class="thumb"><img src="{{poster}}" alt="{{event_name}}" class="photo_report_poster"  align="left"/></div>'
				+ '<div class="eventInfo">'
				+'<div class="companyName">{{company_name}}</div>'
				+'<div class="eventName">{{event_name}}</div>'
				+'</div></div>',
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
					var self = this;
					var item = new ListItem({
						"class": "photoReportsListItem",
						variableHeight:true,
						moveTo: '#'
//						onClick: function(event){self.transitToPhotoReportView(event);}
					}).placeAt(lastReportsList, "first");

					item.onClick = lang.hitch(this, this.transitToPhotoReportView,
						item, photoReport.event_id,photoReport.period_id, photoReport.name);
						//function(event){this.transitToPhotoReportView(event);});

					var template = new dtl.Template(this.photoReportTemplateString);
					var context = new dtlContext({
						'poster': photoReport.logo_image,
						'event_name': photoReport.name,
						'company_name': photoReport.company_name
					});

					item.containerNode.innerHTML = template.render(context);
//					item.containerNode.on('click', function(event){
//						alert('11');
////						this.testFunction(event);
//					});
				}, this);
			},

			transitToPhotoReportView : function(listItem, eventId, periodId, eventName, event){
			var photoReportView = registry.byId("single_photo_report_photos_grid"); // destination view

//			var prog = ProgressIndicator.getInstance();
//			win.body().appendChild(prog.domNode);
//			prog.start();
			listItem.transitionTo("single_photo_report_photos_grid");
			var url = photoReportView.serviceUrl + '/' + eventId + '/' +  periodId;
			dojo.xhrGet({
				url: url,
				handleAs: "json",
				load: function(response, ioArgs){
					photoReportView.showPhotosList(response, eventName);
					//var container = view3.containerNode;
					//container.innerHTML = response;
					//parser.parse(container);
					//prog.stop();
				}
			});
		},


		showLoadImage: function(){
//				photoReportsListRefresh

		}


		});
	});
