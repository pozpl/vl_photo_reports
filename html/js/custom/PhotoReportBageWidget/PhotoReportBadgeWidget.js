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
			poster:require.toUrl("custom/AuthorWidget/images/defaultAvatar.png"),
			eventDate:"",

			// Our template - important!
			templateString:template,

			// A class to be applied to the root node in our template
			baseClass:"photoReportBageWidget",

			// A reference to our background animation
			mouseAnim:null,

			// Colors for our background animation
			baseBackgroundColor:"#fff",
			mouseBackgroundColor:"#def",

			postCreate: function(){
				// Get a DOM node reference for the root of our widget
				var domNode = this.domNode;

				// Run any parent postCreate processes - can be done at any point
				this.inherited(arguments);

				// Set our DOM node's background color to white -
				// smoothes out the mouseenter/leave event animations
				domStyle.set(domNode, "backgroundColor", this.baseBackgroundColor);
				// Set up our mouseenter/leave events - using dojo/on
				// means that our callback will execute with `this` set to our widget
				on(domNode, "mouseenter", function (e) {
					this._changeBackground(this.mouseBackgroundColor);
				});
				on(domNode, "mouseleave", function (e) {
					this._changeBackground(this.baseBackgroundColor);
				});
			},

			_changeBackground: function(toCol) {
				// If we have an animation, stop it
				if (this.mouseAnim) { this.mouseAnim.stop(); }

				// Set up the new animation
				this.mouseAnim = baseFx.animateProperty({
					node: this.domNode,
					properties: {
						backgroundColor: toCol
					},
					onEnd: lang.hitch(this, function() {
						// Clean up our mouseAnim property
						this.mouseAnim = null;
					})
				}).play();
			},

			_setPosterAttr: function(poster) {
				// We only want to set it if it's a non-empty string
				if (poster != "") {
					// Save it on our widget instance - note that
					// we're using _set, to support anyone using
					// our widget's Watch functionality, to watch values change
					this._set("poster", poster);

					// Using our avatarNode attach point, set its src value
					this.avatarNode.src = poster;
				}
			}
		});
	});