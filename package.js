Package.describe({
  summary: "Makes the angular ui-router application crawlable to web spiders"
});

function packageExists(pkgname) {
    var fs = Npm.require('fs');
    var path = Npm.require('path');
    var pkgpath = path.join('packages', pkgname);
    return fs.existsSync(pkgpath);
}

Package.on_use(function (api) {
    api.use('webapp', 'server');
    api.use(['templating'], 'client');
    api.use(['underscore'], ['client', 'server']);

    if (packageExists('angular-ui-router')) {
        api.use('angular-ui-router', 'client');
    }

    api.export('Spiderable', ['client', 'server']);

    api.add_files('spiderable.html', 'client');
    api.add_files('client.js', 'client');

    api.add_files('spiderable.js', 'server');
});
