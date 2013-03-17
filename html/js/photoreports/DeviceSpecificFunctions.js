/**
 * Created with IntelliJ IDEA.
 * User: pozpl
 * Date: 18.03.13
 * Time: 7:33
 * To change this template use File | Settings | File Templates.
 */

define(["dojo/_base/declare", "dojo/query"],
    function(declare, query) {
        // Return the declared class!
        return declare("photoreports.DeviceSpecificFunctions", {

            startDeviceSpecificEventsHandlers: function(){
                document.addEventListener("deviceready", onDeviceReady, false);
                console.log('Start!');
            },


            onDeviceReady: function(){
                document.addEventListener("backbutton", backKeyDown, true);
                console.log('REady!');
            },

            backKeyDown: function(){
                // do something here if you wish
                console.log('go back!');
            }

        });

    });