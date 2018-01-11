
Gov.Class = function () {
  var len = arguments.length;
  var P = arguments[0];
  var F = arguments[len - 1];

  var C = typeof F.initialize == "function" ?
    F.initialize :
    function () { P.prototype.initialize.apply(this, arguments); };

  if (len > 1) {
    var newArgs = [C, P].concat(
      Array.prototype.slice.call(arguments).slice(1, len - 1), F);
    Gov.inherit.apply(null, newArgs);
  } else {
    C.prototype = F;
  }
  return C;
};

Gov.inherit = function (C, P) {
  var F = function () { };
  F.prototype = P.prototype;
  C.prototype = new F;
  var i, l, o;
  for (i = 2, l = arguments.length; i < l; i++) {
    o = arguments[i];
    if (typeof o === "function") {
      o = o.prototype;
    }
    Gov.Util.extend(C.prototype, o);
  }
};

Gov.Util = Gov.Util || {};

Gov.Util.extend = function (destination, source) {
  destination = destination || {};
  if (source) {
    for (var property in source) {
      var value = source[property];
      if (value !== undefined) {
        destination[property] = value;
      }
    }

    var sourceIsEvt = typeof window.Event == "function"
      && source instanceof window.Event;

    if (!sourceIsEvt
      && source.hasOwnProperty && source.hasOwnProperty("toString")) {
      destination.toString = source.toString;
    }
  }
  return destination;
};

Gov.Event = Gov.Class({
  listeners: null,
  observable: null,
  isEvent: true,
  name: null,
  initialize: function (observable, name) {
    this.listeners = [];
    this.observable = observable;
    this.name = name;
  },
  addListener: function (fn, scope, options) {
    this.listeners.push(this.createListener(fn, scope, options));
  },
  createListener: function (fn, scope, options) {
    scope = scope || this.observable;
    return listener = {
      fn: fn,
      scope: scope,
      o: options,
      ev: this
    };
  },
  findListener: function (fn, scope) {
    var listeners = this.listeners,
      i = listeners.length,
      listener,
      s;

    while (i--) {
      listener = listeners[i];
      if (listener) {
        s = listener.scope;

        if (listener.fn == fn && (s == (scope || this.observable))) {
          return i;
        }
      }
    }

    return -1;
  },
  removeListener: function (fn, scope) {
    var me = this,
      index,
      listener,
      k;
    index = me.findListener(fn, scope);
    if (index != -1) {
      listener = me.listeners[index];

      me.listeners.splice(index, 1);
      return true;
    }

    return false;
  },

  fire: function () {
    var listeners = this.listeners,
      count = listeners.length,
      i,
      args,
      listener;


    for (i = 0; i < count; i++) {
      listener = listeners[i];
      args = arguments.length ? Array.prototype.slice.call(arguments, 0) : [];
      if (listener.o) {
        args.push(listener.o);
      }
      listener.fn.apply(listener.scope, args);
      //if (listener && listener.fireFn.apply(listener.scope || me.observable, args) === false) {
      //    return false;
      //}
    }
    return true;
  }
});

Gov.Events = Gov.Class({
  events: null,
  initialize: function () {
    this.events = {};
  },
  addListener: function (ename, fn, scope, options) {
    var event = this.events[ename];
    if (!(event && event.isEvent)) {
      this.events[ename] = event = new Gov.Event(this, ename);
    }
    if (typeof fn === 'string') {
      fn = scope[fn] || this[fn];
    }
    event.addListener(fn, scope, options);

  },
  removeListener: function (ename, fn, scope) {
    var me = this,
      config,
      event,
      options;

    event = me.events[ename];
    if (event && event.isEvent) {
      event.removeListener(fn, scope);
    }
  },
  fireEvent: function (eventName) {
    eventName = eventName.toLowerCase();
    var me = this,
      events = me.events,
      event = events && events[eventName],
      ret = true;

    if (event) {
      event.fire.apply(event, Array.prototype.slice.call(arguments, 1));
      //ret = me.continueFireEvent(eventName, Ext.Array.slice(arguments, 1), event.bubble);
    }

    //event.fire.apply(event, args)
    return ret;
  }

});
Gov.Class.addGetSetFun = function (obj) {
  obj = typeof obj == "function" ? obj.prototype : obj;
  var proto = {};
  for (var prop in obj) {
    if (typeof obj[prop] !== 'function') {
      (function (type) {//注意此处的闭包
        var action = type.replace(/\b\w+\b/g, function (word) {
          return word.substring(0, 1).toUpperCase() + word.substring(1);
        });
        proto['get' + action] = function () {
          return obj[type];
        };
        proto['set' + action] = function (val) {
          obj[type] = val;
        };
      })(prop);
    }
  }
  return proto;
};
Gov.Class.inherit = function (destination, source) {
  destination = destination || {};
  if (source) {
    for (var property in source) {
      var value = source[property];
      if (value !== undefined) {
        destination[property] = value;
      }
    }
  }
  return destination;
};
Gov.Class.extend = function (pObj, pAttr, cAttr) {
  var opt = Gov.Class.inherit(pAttr, cAttr);
  Gov.Class.inherit(pObj, Gov.Class.addGetSetFun(opt));
};
Gov.Class.base = function (pFun, cFun) {
  return function () {
    var retVal = pFun();
    if (arguments.length == 0)
      cFun(retVal);
    else
      cFun.apply({}, arguments);
  }
};

Gov.ReEvent = function (observable, name) {
  var event = {}
  var listeners = [];
  var observable = observable;
  var isEvent = true;
  var name = name;

  event.getName = function () {
    return name;
  }
  event.on = function (fn, scope, options) {
    listeners.push(event.createListener(fn, scope, options));
  };
  event.createListener = function (fn, scope, options) {
    scope = scope || observable;
    return listener = {
      fn: fn,
      scope: scope,
      o: options,
      ev: this
    };
  };
  event.findListener = function (fn, scope) {
    //var listeners = this.listeners,
    var i = listeners.length,
      listener,
      s;

    while (i--) {
      listener = listeners[i];
      if (listener) {
        s = listener.scope;

        if (listener.fn == fn && (s == (scope || observable))) {
          return i;
        }
      }
    }

    return -1;
  },
    event.removeListener = function (fn, scope) {
      var index,
        listener,
        k;
      index = event.findListener(fn, scope);
      if (index != -1) {
        listener = event.listeners[index];

        event.listeners.splice(index, 1);
        return true;
      }

      return false;
    },

    event.fire = function () {
      var count = listeners.length,
        i,
        args,
        listener;


      for (i = 0; i < count; i++) {
        listener = listeners[i];
        args = arguments.length ? Array.prototype.slice.call(arguments, 0) : [];
        if (listener.o) {
          args.push(listener.o);
        }
        listener.fn.apply(listener.scope, args);
        //if (listener && listener.fireFn.apply(listener.scope || me.observable, args) === false) {
        //    return false;
        //}
      }
      return true;
    }
  return event;
};

Gov.ReEvents = function () {
  var cls = {};
  var events = {}
  cls.on = function (ename, fn, scope, options) {
    var event = events[ename];
    if (!(event && event.isEvent)) {
      events[ename] = event = Gov.ReEvent(this, ename);
    }
    if (typeof fn === 'string') {
      fn = scope[fn] || this[fn];
    }
    event.on(fn, scope, options);

    //events[ename] = event;
  };
  cls.removeListener = function (ename, fn, scope) {
    var config,
      event,
      options;

    event = cls.events[ename];
    if (event && event.isEvent) {
      event.removeListener(fn, scope);
    }
  },
    cls.fire = function (eventName) {
      eventName = eventName.toLowerCase();
      var event = events && events[eventName],
        ret = true;

      if (event) {
        event.fire.apply(event, Array.prototype.slice.call(arguments, 1));
        //ret = me.continueFireEvent(eventName, Ext.Array.slice(arguments, 1), event.bubble);
      }

      //event.fire.apply(event, args)
      return ret;
    }
  return cls;
};
