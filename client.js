Spiderable = {
    makeSpiderable: function(angularApp) {
        var app = null;
        if (typeof(angularApp) === 'string') { // app name
            app = angular.module(angularApp);
        } else if (typeof(angularApp) === 'object') { // app object
            app = angularApp;
        }

        if (app === null) {
            throw new Error('spiderable-ui-router: invalid angular app');
        }

        app.run(['$rootScope',
            function ($rootScope) {
                // Set a global flag when DOM is rendered.
                $rootScope.$on('$viewContentLoaded',
                    function(event){
                        window.__ui_router_dom_ready__ = true;
                    }
                );
            }
        ]);
    }
};

// Hook into ngMeteor.
Meteor.startup(function() {
    if (typeof(ngMeteor) !== 'undefined') {
        Spiderable.makeSpiderable(ngMeteor);
    }
});
