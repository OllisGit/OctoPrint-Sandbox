/*
 * View model for OctoPrint-Sandbox
 *
 * Author: You
 * License: AGPLv3
 */
$(function() {
    function SandboxViewModel(parameters) {
        var PLUGIN_ID = "sandbox";
        var self = this;

        // assign the injected parameters, e.g.:
        // self.loginStateViewModel = parameters[0];
        // self.settingsViewModel = parameters[1];


        // receive data from server
        self.onDataUpdaterPluginMessage = function (plugin, data) {

            if (plugin != PLUGIN_ID) {
                return;
            }
            console.error("Data from server received");
            console.error(data);
        }

    }

    /* view model class, parameters for constructor, container to bind to
     * Please see http://docs.octoprint.org/en/master/plugins/viewmodels.html#registering-custom-viewmodels for more details
     * and a full list of the available options.
     */
    OCTOPRINT_VIEWMODELS.push({
        construct: SandboxViewModel,
        // ViewModels your plugin depends on, e.g. loginStateViewModel, settingsViewModel, ...
        dependencies: [ /* "loginStateViewModel", "settingsViewModel" */ ],
        // Elements to bind to, e.g. #settings_plugin_sandbox, #tab_plugin_sandbox, ...
        elements: [ /* ... */ ]
    });
});
