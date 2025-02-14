// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"3ugrS":[function(require,module,exports,__globalThis) {
JSON.parse("{\"manifest_version\":3,\"name\":\"LeetCode Context Injector\",\"version\":\"1.0\",\"description\":\"Injects context.tsx when visiting LeetCode\",\"permissions\":[\"tabs\",\"scripting\"],\"host_permissions\":[\"*://*.leetcode.com/*\",\"https://leetcode.com/problems/*\"],\"action\":{\"default_popup\":\"\",\"default_icon\":{\"16\":\"\",\"32\":\"\",\"48\":\"\",\"128\":\"\"}},\"icons\":{\"16\":\"\",\"32\":\"\",\"48\":\"\",\"128\":\"\"},\"content_scripts\":[{\"matches\":[\"https://leetcode.com/problems/*\"],\"js\":[\"\",\"\"]}],\"background\":{\"service_worker\":\"\"},\"content_security_policy\":{\"extension_pages\":\"script-src 'self' http://localhost:*;\"}}");

},{}],"6c4BO":[function(require,module,exports,__globalThis) {
"use strict";
/* global chrome, browser */ let env = typeof browser === 'undefined' ? chrome : browser;
let origReload = env.runtime.reload;
let avoidID = -1;
let promisify = (obj, fn)=>(...args)=>{
        if (typeof browser === 'undefined') return new Promise((resolve, reject)=>obj[fn](...args, (res)=>env.runtime.lastError ? reject(env.runtime.lastError) : resolve(res)));
        return obj[fn](...args);
    };
let queryTabs = promisify(env.tabs, 'query');
let messageTab = promisify(env.tabs, 'sendMessage');
env.runtime.reload = ()=>{
    queryTabs({}).then((tabs)=>{
        return Promise.all(tabs.map((tab)=>{
            if (tab.id === avoidID) return;
            return messageTab(tab.id, {
                __parcel_hmr_reload__: true
            }).catch(()=>{});
        }));
    }).then(()=>{
        origReload.call(env.runtime);
    });
};
env.runtime.onMessage.addListener((msg, sender)=>{
    if (msg.__parcel_hmr_reload__) {
        avoidID = sender.tab.id;
        env.runtime.reload();
    }
});

},{}]},["3ugrS","6c4BO"], null, "parcelRequire94c2")
// Background script for the extension
chrome.runtime.onInstalled.addListener(()=>{
    console.log('Extension installed');
});
// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
    if (message.type === 'ANALYZE') {
        // Handle analysis request
        console.log('Analysis requested:', message.data);
        sendResponse({
            status: 'received'
        });
    }
    return true;
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEtBQUssS0FBSyxDQUFDOzs7QUNBWDtBQUVBLDBCQUEwQixHQUMxQixJQUFJLE1BQU0sT0FBTyxZQUFZLGNBQWMsU0FBUztBQUNwRCxJQUFJLGFBQWEsSUFBSSxPQUFPLENBQUMsTUFBTTtBQUNuQyxJQUFJLFVBQVU7QUFDZCxJQUFJLFlBQVksQ0FBQyxLQUFLLEtBQU8sQ0FBQyxHQUFHO1FBQy9CLElBQUksT0FBTyxZQUFZLGFBQ3JCLE9BQU8sSUFBSSxRQUFRLENBQUMsU0FBUyxTQUFXLEdBQUcsQ0FBQyxHQUFHLElBQUksTUFBTSxDQUFBLE1BQU8sSUFBSSxPQUFPLENBQUMsU0FBUyxHQUFHLE9BQU8sSUFBSSxPQUFPLENBQUMsU0FBUyxJQUFJLFFBQVE7UUFFbEksT0FBTyxHQUFHLENBQUMsR0FBRyxJQUFJO0lBQ3BCO0FBQ0EsSUFBSSxZQUFZLFVBQVUsSUFBSSxJQUFJLEVBQUU7QUFDcEMsSUFBSSxhQUFhLFVBQVUsSUFBSSxJQUFJLEVBQUU7QUFDckMsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHO0lBQ25CLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFBO1FBQ2pCLE9BQU8sUUFBUSxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQTtZQUMxQixJQUFJLElBQUksRUFBRSxLQUFLLFNBQVM7WUFDeEIsT0FBTyxXQUFXLElBQUksRUFBRSxFQUFFO2dCQUN4Qix1QkFBdUI7WUFDekIsR0FBRyxLQUFLLENBQUMsS0FBTztRQUNsQjtJQUNGLEdBQUcsSUFBSSxDQUFDO1FBQ04sV0FBVyxJQUFJLENBQUMsSUFBSSxPQUFPO0lBQzdCO0FBQ0Y7QUFDQSxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSztJQUN0QyxJQUFJLElBQUkscUJBQXFCLEVBQUU7UUFDN0IsVUFBVSxPQUFPLEdBQUcsQ0FBQyxFQUFFO1FBQ3ZCLElBQUksT0FBTyxDQUFDLE1BQU07SUFDcEI7QUFDRjs7O0FDL0JBLHNDQUFzQztBQUN0QyxPQUFPLE9BQU8sQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDO0lBQ3JDLFFBQVEsR0FBRyxDQUFDO0FBQ2Q7QUFFQSwwQ0FBMEM7QUFDMUMsT0FBTyxPQUFPLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFNBQVMsUUFBUTtJQUNyRCxJQUFJLFFBQVEsSUFBSSxLQUFLLFdBQVc7UUFDOUIsMEJBQTBCO1FBQzFCLFFBQVEsR0FBRyxDQUFDLHVCQUF1QixRQUFRLElBQUk7UUFDL0MsYUFBYTtZQUFFLFFBQVE7UUFBVztJQUNwQztJQUNBLE9BQU87QUFDVCIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzLy5wbnBtL0BwYXJjZWwrcnVudGltZS13ZWJleHRlbnNpb25AMi4xMy4zX0BwYXJjZWwrY29yZUAyLjEzLjNfQHN3YytoZWxwZXJzQDAuNS4xNV8vbm9kZV9tb2R1bGVzL0BwYXJjZWwvcnVudGltZS13ZWJleHRlbnNpb24vbGliL3J1bnRpbWUtZDhjNmY3MTg0NmFlZWZmZC5qcyIsIm5vZGVfbW9kdWxlcy8ucG5wbS9AcGFyY2VsK3J1bnRpbWUtd2ViZXh0ZW5zaW9uQDIuMTMuM19AcGFyY2VsK2NvcmVAMi4xMy4zX0Bzd2MraGVscGVyc0AwLjUuMTVfL25vZGVfbW9kdWxlcy9AcGFyY2VsL3J1bnRpbWUtd2ViZXh0ZW5zaW9uL2xpYi9ydW50aW1lLTQ2ZmMxYjNlYmU1OTVjMGEuanMiLCJzcmMvYmFja2dyb3VuZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJKU09OLnBhcnNlKFwie1xcXCJtYW5pZmVzdF92ZXJzaW9uXFxcIjozLFxcXCJuYW1lXFxcIjpcXFwiTGVldENvZGUgQ29udGV4dCBJbmplY3RvclxcXCIsXFxcInZlcnNpb25cXFwiOlxcXCIxLjBcXFwiLFxcXCJkZXNjcmlwdGlvblxcXCI6XFxcIkluamVjdHMgY29udGV4dC50c3ggd2hlbiB2aXNpdGluZyBMZWV0Q29kZVxcXCIsXFxcInBlcm1pc3Npb25zXFxcIjpbXFxcInRhYnNcXFwiLFxcXCJzY3JpcHRpbmdcXFwiXSxcXFwiaG9zdF9wZXJtaXNzaW9uc1xcXCI6W1xcXCIqOi8vKi5sZWV0Y29kZS5jb20vKlxcXCIsXFxcImh0dHBzOi8vbGVldGNvZGUuY29tL3Byb2JsZW1zLypcXFwiXSxcXFwiYWN0aW9uXFxcIjp7XFxcImRlZmF1bHRfcG9wdXBcXFwiOlxcXCJcXFwiLFxcXCJkZWZhdWx0X2ljb25cXFwiOntcXFwiMTZcXFwiOlxcXCJcXFwiLFxcXCIzMlxcXCI6XFxcIlxcXCIsXFxcIjQ4XFxcIjpcXFwiXFxcIixcXFwiMTI4XFxcIjpcXFwiXFxcIn19LFxcXCJpY29uc1xcXCI6e1xcXCIxNlxcXCI6XFxcIlxcXCIsXFxcIjMyXFxcIjpcXFwiXFxcIixcXFwiNDhcXFwiOlxcXCJcXFwiLFxcXCIxMjhcXFwiOlxcXCJcXFwifSxcXFwiY29udGVudF9zY3JpcHRzXFxcIjpbe1xcXCJtYXRjaGVzXFxcIjpbXFxcImh0dHBzOi8vbGVldGNvZGUuY29tL3Byb2JsZW1zLypcXFwiXSxcXFwianNcXFwiOltcXFwiXFxcIixcXFwiXFxcIl19XSxcXFwiYmFja2dyb3VuZFxcXCI6e1xcXCJzZXJ2aWNlX3dvcmtlclxcXCI6XFxcIlxcXCJ9LFxcXCJjb250ZW50X3NlY3VyaXR5X3BvbGljeVxcXCI6e1xcXCJleHRlbnNpb25fcGFnZXNcXFwiOlxcXCJzY3JpcHQtc3JjICdzZWxmJyBodHRwOi8vbG9jYWxob3N0Oio7XFxcIn19XCIpIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGdsb2JhbCBjaHJvbWUsIGJyb3dzZXIgKi9cbmxldCBlbnYgPSB0eXBlb2YgYnJvd3NlciA9PT0gJ3VuZGVmaW5lZCcgPyBjaHJvbWUgOiBicm93c2VyO1xubGV0IG9yaWdSZWxvYWQgPSBlbnYucnVudGltZS5yZWxvYWQ7XG5sZXQgYXZvaWRJRCA9IC0xO1xubGV0IHByb21pc2lmeSA9IChvYmosIGZuKSA9PiAoLi4uYXJncykgPT4ge1xuICBpZiAodHlwZW9mIGJyb3dzZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IG9ialtmbl0oLi4uYXJncywgcmVzID0+IGVudi5ydW50aW1lLmxhc3RFcnJvciA/IHJlamVjdChlbnYucnVudGltZS5sYXN0RXJyb3IpIDogcmVzb2x2ZShyZXMpKSk7XG4gIH1cbiAgcmV0dXJuIG9ialtmbl0oLi4uYXJncyk7XG59O1xubGV0IHF1ZXJ5VGFicyA9IHByb21pc2lmeShlbnYudGFicywgJ3F1ZXJ5Jyk7XG5sZXQgbWVzc2FnZVRhYiA9IHByb21pc2lmeShlbnYudGFicywgJ3NlbmRNZXNzYWdlJyk7XG5lbnYucnVudGltZS5yZWxvYWQgPSAoKSA9PiB7XG4gIHF1ZXJ5VGFicyh7fSkudGhlbih0YWJzID0+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwodGFicy5tYXAodGFiID0+IHtcbiAgICAgIGlmICh0YWIuaWQgPT09IGF2b2lkSUQpIHJldHVybjtcbiAgICAgIHJldHVybiBtZXNzYWdlVGFiKHRhYi5pZCwge1xuICAgICAgICBfX3BhcmNlbF9obXJfcmVsb2FkX186IHRydWVcbiAgICAgIH0pLmNhdGNoKCgpID0+IHt9KTtcbiAgICB9KSk7XG4gIH0pLnRoZW4oKCkgPT4ge1xuICAgIG9yaWdSZWxvYWQuY2FsbChlbnYucnVudGltZSk7XG4gIH0pO1xufTtcbmVudi5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigobXNnLCBzZW5kZXIpID0+IHtcbiAgaWYgKG1zZy5fX3BhcmNlbF9obXJfcmVsb2FkX18pIHtcbiAgICBhdm9pZElEID0gc2VuZGVyLnRhYi5pZDtcbiAgICBlbnYucnVudGltZS5yZWxvYWQoKTtcbiAgfVxufSk7IiwiLy8gQmFja2dyb3VuZCBzY3JpcHQgZm9yIHRoZSBleHRlbnNpb25cclxuY2hyb21lLnJ1bnRpbWUub25JbnN0YWxsZWQuYWRkTGlzdGVuZXIoKCkgPT4ge1xyXG4gIGNvbnNvbGUubG9nKCdFeHRlbnNpb24gaW5zdGFsbGVkJyk7XHJcbn0pO1xyXG5cclxuLy8gTGlzdGVuIGZvciBtZXNzYWdlcyBmcm9tIGNvbnRlbnQgc2NyaXB0XHJcbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigobWVzc2FnZSwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpID0+IHtcclxuICBpZiAobWVzc2FnZS50eXBlID09PSAnQU5BTFlaRScpIHtcclxuICAgIC8vIEhhbmRsZSBhbmFseXNpcyByZXF1ZXN0XHJcbiAgICBjb25zb2xlLmxvZygnQW5hbHlzaXMgcmVxdWVzdGVkOicsIG1lc3NhZ2UuZGF0YSk7XHJcbiAgICBzZW5kUmVzcG9uc2UoeyBzdGF0dXM6ICdyZWNlaXZlZCcgfSk7XHJcbiAgfVxyXG4gIHJldHVybiB0cnVlO1xyXG59KTtcclxuIl0sIm5hbWVzIjpbXSwidmVyc2lvbiI6MywiZmlsZSI6ImJhY2tncm91bmQuMGEwY2VkZGIuanMubWFwIn0=
