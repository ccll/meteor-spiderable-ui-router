meteor-spiderable-ui-router
========================

This is a modified version of builtin package 'spiderable', which add angular-ui-router support.

### Install
```
mrt add spiderable-ui-router
```

Then you are good to go, the package will automatically hook into ngMeteor and angular-ui-router.
If you like to use angular bridges other than ngMeteor, you need to setup the hook manually, which is easy.
Just add following code to global scope of your client code:
```
Spiderable.makeSpiderable('your angular module name');
```
or
```
Spiderable.makeSpiderable(<your angular module object>);
```


### Test

```
curl http://localhost:3000/<your route>?_escaped_fragment_=
```

If spiderable is working correctly, this should return a rendered HTML.


### NOTE

This is a replacement for builtin 'spiderable' package, so make sure you have `meteor remove spiderable`.


### How this is done?

The builtin 'spiderable' package waits until all Meteor state is ready, then feed them through phantomjs to get a rendered HTML.

But this is not enough with angular ui-router, which may still doing it's own things when Meteor is done already, so we need to wait until the page is fully rendered by ui-router, which is signaled by a '$viewContentLoaded' event.
