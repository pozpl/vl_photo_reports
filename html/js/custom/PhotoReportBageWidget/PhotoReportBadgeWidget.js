define(["dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin",
	"dojo/text!./PhotoReportBageWidget/templates/PhotoReportBageTempalte.html",
	"dojo/dom-style", "dojo/_base/fx", "dojo/_base/lang"],
	function (declare, WidgetBase, TemplatedMixin, template, domStyle, baseFx, lang) {
		return declare([WidgetBase, TemplatedMixin], {
			// Some default values for our author
			// These typically map to whatever you're handing into the constructor
			eventName:"No Name",
			// Using require.toUrl, we can get a path to our AuthorWidget's space
			// and we want to have a default avatar, just in case
			avatar:require.toUrl("custom/AuthorWidget/images/defaultAvatar.png"),
			bio:"",

			// Our template - important!
			templateString:template,

			// A class to be applied to the root node in our template
			baseClass:"authorWidget",

			// A reference to our background animation
			mouseAnim:null,

			// Colors for our background animation
			baseBackgroundColor:"#fff",
			mouseBackgroundColor:"#def"
		});
	});