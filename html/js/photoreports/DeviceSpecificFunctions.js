/**
 * Created with IntelliJ IDEA.
 * User: pozpl
 * Date: 18.03.13
 * Time: 7:33
 * To change this template use File | Settings | File Templates.
 */

define(["dojo/_base/declare", "dojo/_base/lang", "dojo/query"],
    function(declare, lang,query) {
        // Return the declared class!
        return declare("photoreports.DeviceSpecificFunctions", null, {

            firstScreenHash: '',

            constructor: function(firstScreenHash){
                 this.firstScreenHash = firstScreenHash;
            },

            startDeviceSpecificEventsHandlers: function(){
                lang.hitch(this, document.addEventListener("deviceready", this.onDeviceReady, false));
                console.log('Start!');
            },


            onDeviceReady: function(){
                lang.hitch(this, document.addEventListener("backbutton", this.backKeyDown, true));
                console.log('REady!');
            },

            backKeyDown: function(){
                // do something here if you wish
                var windowHash = window.location.hash;
                if(windowHash.indexOf(this.firstScreenHash) !== -1){
                     console.log('Close Application');
                    if (navigator.app && navigator.app.exitApp) {
                        navigator.app.exitApp();
                    } else if (navigator.device && navigator.device.exitApp) {
                        navigator.device.exitApp();
                    }
                }
            }

        });

    });