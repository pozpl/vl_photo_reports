var profile = {

	"action":"release",

	"releaseDir":"photoreports-release/dojo",

	"selectorEngine":"acme",
	"stripConsole":"normal",
	"copyTests":false,
	"cssOptimize":true,
	"mini":true,
//	"webkitMobile":true,

	localeList:"en-us",

	layers:{
		"dojo/dojo":{
			customBase:true,
			include:[
                "dojo/dojo",
                'dojo/domReady',
                "dojo/require",
				"dojo/_base/declare",
				"dojo/_base/lang",
				"dojo/_base/array",
				"dojo/_base/window",
				"dojo/_base/event",
				"dojo/_base/connect",
				"dojo/_base/html",
				"dojo/fx",
				"dojo/io/script",
				"dojo/Deferred",
				"dojo/DeferredList",
				"dojo/i18n",
				"dojo/date",
				"dijit/_WidgetBase",
				"dijit/_base/manager",
				"dojox/mobile",
				"dojox/mobile/parser",
				"dojox/mobile/ScrollableView",
				"dojox/mobile/View",
				"dojo/DeferredList",
				"dojo/request",
				"dijit/registry",
				"dojo/query",
				"dojox/dtl",
				"dojox/dtl/Context",
				"dojox/mobile/Pane",
				"dojo/dom-construct",
				"dojo/on",
				"dojox/mobile/ListItem",
				"dojo/dom-class",
				"dojo/dom-attr",
				"dojox/mobile/SwapView",
				"dojox/mobile/GridLayout",
                "dojox/mobile/TabBar",
                "dojox/mobile/compat",
                "dojox/mobile/_compat",
                "dojox/mobile/TabBarButton",
                "dojox/mobile/Badge",
                "dojox/mobile/bookmarkable"
			]
		},
		"app/photoreports-app":{
			include:[
				"photoreports/PhotoReportsList",
				"photoreports/PhotoReportPhotosList",
				"photoreports/PhotoSlideShow",
                "photoreports/DeviceSpecificFunctions",
                "photoreports/InitScreen"
			]
		}
	},

	staticHasFeatures:{
		"dom-addeventlistener":true,
		"dom-qsa":true,
		"json-stringify":true,
		"json-parse":true,
		"bug-for-in-skips-shadowed":false,
		"dom-matches-selector":true,
		"native-xhr":true,
		"array-extensible":true,
		"ie":undefined,
		"quirks":false
//		"webkit":true
	},

	packages:[
		{ name:"dojo", location:"dojo" },
		{ name:"dijit", location:"dijit" },
		{ name:"dojox", location:"dojox" },
		{ name:"photoreports", location:"photoreports" }
	]
};