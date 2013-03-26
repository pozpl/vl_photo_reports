/**
 * Created with IntelliJ IDEA.
 * User: pozpl
 * Date: 26.03.13
 * Time: 21:29
 * To change this template use File | Settings | File Templates.
 */
define(["dojo/_base/declare", "dojox/mobile/View", "dijit/registry"],
    function(declare, View, registry) {
        // Return the declared class!
        return declare("photoreports.InitScreen", [View], {
            // When the widgets have started....
            startup: function() {
                // Retain functionality of startup in dojox/mobile/ScrollableView
                this.inherited(arguments);

                var firstScreenHash = "last_photoreports";
                var windowHash = window.location.hash;
                if(windowHash.indexOf(firstScreenHash) == -1){
                    var lastPhotoReports = registry.byId("last_photoreports");
                    lastPhotoReports.startup();
                    this.performTransition("#" + firstScreenHash, 1, 'fade', null);
                }
            }

        });

    });