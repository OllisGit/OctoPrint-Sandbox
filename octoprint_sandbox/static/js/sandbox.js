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


        // START single Icon-Picker (without component factory)
        self.mySelectedIcon = ko.observable("fab fa-500px");  // initial icon

        // create picker-instance
        myIconPicker = $('#myIconPicker').iconpicker();

        // update observer during change
        myIconPicker.on('iconpickerSelected', function(event){
          newIcon = event.iconpickerValue;
          self.mySelectedIcon(newIcon);
        });
        // END single Icon-Picker

        // START Multi Icon-Picker
        // Single Item-Model
        IconItem = function(data) {
            this.iconName = ko.observable()
            // Fill Item with (initial) data
            this.update(data);
        }
        // Update the Item-Function
        IconItem.prototype.update = function (data) {
            var updateData = data || {}

            this.iconName = ko.observable(updateData.iconName)
        }

        // collects all IconItems
        self.allIcons = ko.observableArray();

        // fill icon-collection with dummy values (or a loop or a complete data-array)
        self.allIcons.push(new IconItem({
            iconName: "fab fa-500px"
        }));
        self.allIcons.push(new IconItem({
            iconName: "fas fa-ad"
        }));


        self.onAfterBinding = function() {
            // all inits / loop-rendering were done

            // init jquery-iconpicker
            allIconPickers = $('.supericonpicker').iconpicker();
            // attach selection listener for all iconPickers
            allIconPickers.each(function(index, item){
                $(item).on('iconpickerSelected', function(event){
                  newIcon = event.iconpickerValue;
                  // get IconItem-Model and fill the selection
                  iconItemModel = self.allIcons()[index];
                  iconItemModel.iconName(newIcon);
                });
            });
        }
        // END Multi Icon-Picker


        // receive data from server
        self.onDataUpdaterPluginMessage = function (plugin, data) {

            if (plugin != PLUGIN_ID) {
                return;
            }
//            console.error("Data from server received");
//            console.error(data);
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
        elements: [
            document.getElementById("tab_sandbox")
        ]
    });
});
