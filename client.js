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

        app.run(['$rootScope', '$state'
            function ($rootScope, $state) {
                var numberOfSubstates = Infinity;
                var timesViewContentLoadedFired = 0;
                $rootScope.$on('$stateChangeSuccess', function(event, state) {
                    numberOfSubstates = state.name.split('.').length + 1;
                    if (timesViewContentLoadedFired >= numberOfSubstates) {
                        // Set a global flag when DOM is rendered.
                        window.__ui_router_dom_ready__ = true;
                    }
                });
                $rootScope.$on('$viewContentLoaded', function(event) {
                    timesViewContentLoadedFired++;
                    if (timesViewContentLoadedFired >= numberOfSubstates) {
                        // Set a global flag when DOM is rendered.
                        window.__ui_router_dom_ready__ = true;
                    }
                });
            }
        ]);
    }
};

// Hook into angular bridges.
Meteor.startup(function() {
    if (typeof(ngMeteor) !== 'undefined') {
        Spiderable.makeSpiderable(ngMeteor);
    }
});
