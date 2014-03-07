Package.describe({
  summary: "Makes the angular ui-router application crawlable to web spiders"
});

Package.on_use(function (api) {
  api.use('webapp', 'server');
  api.use(['templating'], 'client');
  api.use(['underscore'], ['client', 'server']);

  api.export('Spiderable', ['client', 'server']);

  api.add_files('spiderable.html', 'client');
  api.add_files('client.js', 'client');

  api.add_files('spiderable.js', 'server');
});
