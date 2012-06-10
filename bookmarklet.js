;
(function (undefined) {

  // TODO: declare any dependencies of your script here (e.g. jquery, underscore, etc...)
  // They will be downloaded in parallel and loaded serially.
  // These should be full urls or one of the keys to the SPECIAL_DEPENDENCIES map (see below).
  var dependencies = ['jquery', 'https://raw.github.com/jgallen23/toc/master/dist/jquery.toc.min.js'];

  // TODO: put your code here
  function main() {
    // You can log using the 'log' function, which won't break for users using browsers
    // that don't have a console object.
    log('Hello', 'bookmarklet!');

    alert('You should modify your bookmarklet and share it with the world!');
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////
  /// You can safely ignore everything below here
  ///////////////////////////////////////////////////////////////////////////////////////////////

  // TODO: test this when deployed via http and https
  var labJsUrl = '//labjs.com/js/LAB.js';
  if (window.location.protocol === 'file:') {
    labJsUrl = 'http:' + labJsUrl;
  }

  // When declaring dependencies, you can save typing by using these special shortcuts to the newest versions of
  // some frameworks. For example, if your dependencies equal ['jquery'], then the newest version of jquery will
  // be used
  var SPECIAL_DEPENDENCIES = {
    jquery: 'http://code.jquery.com/jquery.min.js',
    underscore: 'http://underscorejs.org/underscore.js',
    backbone: 'http://backbonejs.org/backbone-min.js'
  };

  // http://www.nczonline.net/blog/2009/07/28/the-best-way-to-load-external-javascript/
  function loadScript(url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState) {  //IE
      script.onreadystatechange = function () {
        if (script.readyState == "loaded" ||
          script.readyState == "complete") {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {  //Others
      script.onload = function () {
        callback();
      };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  }

  function log() {}

  if ('console' in window && 'log' in console) {
    log = function () {
      var args = Array.prototype.slice.apply(arguments);
      args.unshift('Bookmarklet:');
      console.log.apply(console, args);
    }
  }

  if (dependencies.length) {
    log('Loading', dependencies.length, 'dependencies:', dependencies);
    loadScript(labJsUrl, function () {
      //  forces all scripts in the chain to execute serially in order
      $LAB = $LAB.setOptions({AlwaysPreserveOrder:true});

      for (var i = 0; i < dependencies.length; i++) {
        var src = dependencies[i];
        if (src in SPECIAL_DEPENDENCIES) {
          src = SPECIAL_DEPENDENCIES[src];
        }
        $LAB = $LAB.script(src);
      }
      $LAB = $LAB.wait(function () {
        log('Done loading dependencies.');
        main();
      });
    });
  }
  else {
    main();
  }
})();
