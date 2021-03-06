if (typeof jwplayer == "undefined") {
    jwplayer = function (a) {
        if (jwplayer.api) {
            return jwplayer.api.selectPlayer(a)
        }
    };
    jwplayer.version = "6.5.3529";
    jwplayer.vid = document.createElement("video");
    jwplayer.audio = document.createElement("audio");
    jwplayer.source = document.createElement("source");
    (function (d) {
        var j = document,
            g = window,
            b = navigator,
            h = "undefined",
            f = "string",
            c = "object";
        var k = d.utils = function () {};
        k.exists = function (m) {
            switch (typeof (m)) {
            case f:
                return (m.length > 0);
                break;
            case c:
                return (m !== null);
            case h:
                return false
            }
            return true
        };
        k.styleDimension = function (m) {
            return m + (m.toString().indexOf("%") > 0 ? "" : "px")
        };
        k.getAbsolutePath = function (t, r) {
            if (!k.exists(r)) {
                r = j.location.href
            }
            if (!k.exists(t)) {
                return undefined
            }
            if (a(t)) {
                return t
            }
            var u = r.substring(0, r.indexOf("://") + 3);
            var q = r.substring(u.length, r.indexOf("/", u.length + 1));
            var n;
            if (t.indexOf("/") === 0) {
                n = t.split("/")
            } else {
                var o = r.split("?")[0];
                o = o.substring(u.length + q.length + 1, o.lastIndexOf("/"));
                n = o.split("/").concat(t.split("/"))
            }
            var m = [];
            for (var p = 0; p < n.length; p++) {
                if (!n[p] || !k.exists(n[p]) || n[p] == ".") {
                    continue
                } else {
                    if (n[p] == "..") {
                        m.pop()
                    } else {
                        m.push(n[p])
                    }
                }
            }
            return u + q + "/" + m.join("/")
        };

        function a(n) {
            if (!k.exists(n)) {
                return
            }
            var o = n.indexOf("://");
            var m = n.indexOf("?");
            return (o > 0 && (m < 0 || (m > o)))
        }
        k.extend = function () {
            var m = k.extend["arguments"];
            if (m.length > 1) {
                for (var n = 1; n < m.length; n++) {
                    k.foreach(m[n], function (p, o) {
                        try {
                            if (k.exists(o)) {
                                m[0][p] = o
                            }
                        } catch (q) {}
                    })
                }
                return m[0]
            }
            return null
        };
        k.log = function (n, m) {
            if (typeof console != h && typeof console.log != h) {
                if (m) {
                    console.log(n, m)
                } else {
                    console.log(n)
                }
            }
        };
        var e = k.userAgentMatch = function (n) {
            var m = b.userAgent.toLowerCase();
            return (m.match(n) !== null)
        };

        function l(m) {
            return function () {
                return e(m)
            }
        }
        k.isIE = l(/msie/i);
        k.isFF = l(/firefox/i);
        k.isChrome = l(/chrome/i);
        k.isIOS = l(/iP(hone|ad|od)/i);
        k.isIPod = l(/iP(hone|od)/i);
        k.isIPad = l(/iPad/i);
        k.isSafari602 = l(/Macintosh.*Mac OS X 10_8.*6\.0\.\d* Safari/i);
        k.isAndroid = function (m) {
            if (m) {
                return e(new RegExp("android.*" + m, "i"))
            } else {
                return e(/android/i)
            }
        };
        k.isMobile = function () {
            return k.isIOS() || k.isAndroid()
        };
        k.saveCookie = function (m, n) {
            j.cookie = "jwplayer." + m + "=" + n + "; path=/"
        };
        k.getCookies = function () {
            var p = {};
            var o = j.cookie.split("; ");
            for (var n = 0; n < o.length; n++) {
                var m = o[n].split("=");
                if (m[0].indexOf("jwplayer.") == 0) {
                    p[m[0].substring(9, m[0].length)] = m[1]
                }
            }
            return p
        };
        k.typeOf = function (n) {
            var m = typeof n;
            if (m === "object") {
                if (!n) {
                    return "null"
                }
                return (n instanceof Array) ? "array" : m
            } else {
                return m
            }
        };
        k.translateEventResponse = function (o, m) {
            var p = k.extend({}, m);
            if (o == d.events.JWPLAYER_FULLSCREEN && !p.fullscreen) {
                p.fullscreen = p.message == "true" ? true : false;
                delete p.message
            } else {
                if (typeof p.data == c) {
                    p = k.extend(p, p.data);
                    delete p.data
                } else {
                    if (typeof p.metadata == c) {
                        k.deepReplaceKeyName(p.metadata, ["__dot__", "__spc__", "__dsh__", "__default__"], [".", " ", "-", "default"])
                    }
                }
            }
            var n = ["position", "duration", "offset"];
            k.foreach(n, function (q, r) {
                if (p[r]) {
                    p[r] = Math.round(p[r] * 1000) / 1000
                }
            });
            return p
        };
        k.flashVersion = function () {
            if (k.isAndroid()) {
                return 0
            }
            var m = b.plugins,
                n;
            try {
                if (m !== h) {
                    n = m["Shockwave Flash"];
                    if (n) {
                        return parseInt(n.description.replace(/\D+(\d+)\..*/, "$1"))
                    }
                }
            } catch (p) {}
            if (typeof g.ActiveXObject != h) {
                try {
                    n = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                    if (n) {
                        return parseInt(n.GetVariable("$version").split(" ")[1].split(",")[0])
                    }
                } catch (o) {}
            }
            return 0
        };
        k.getScriptPath = function (o) {
            var m = j.getElementsByTagName("script");
            for (var n = 0; n < m.length; n++) {
                var p = m[n].src;
                if (p && p.indexOf(o) >= 0) {
                    return p.substr(0, p.indexOf(o))
                }
            }
            return ""
        };
        k.deepReplaceKeyName = function (p, n, m) {
            switch (d.utils.typeOf(p)) {
            case "array":
                for (var o = 0; o < p.length; o++) {
                    p[o] = d.utils.deepReplaceKeyName(p[o], n, m)
                }
                break;
            case c:
                k.foreach(p, function (t, w) {
                    var v, u;
                    if (n instanceof Array && m instanceof Array) {
                        if (n.length != m.length) {
                            return
                        } else {
                            v = n;
                            u = m
                        }
                    } else {
                        v = [n];
                        u = [m]
                    }
                    var q = t;
                    for (var r = 0; r < v.length; r++) {
                        q = q.replace(new RegExp(n[r], "g"), m[r])
                    }
                    p[q] = d.utils.deepReplaceKeyName(w, n, m);
                    if (t != q) {
                        delete p[t]
                    }
                });
                break
            }
            return p
        };
        var i = k.pluginPathType = {
            ABSOLUTE: 0,
            RELATIVE: 1,
            CDN: 2
        };
        k.getPluginPathType = function (n) {
            if (typeof n != f) {
                return
            }
            n = n.split("?")[0];
            var o = n.indexOf("://");
            if (o > 0) {
                return i.ABSOLUTE
            }
            var m = n.indexOf("/");
            var p = k.extension(n);
            if (o < 0 && m < 0 && (!p || !isNaN(p))) {
                return i.CDN
            }
            return i.RELATIVE
        };
        k.getPluginName = function (m) {
            return m.replace(/^(.*\/)?([^-]*)-?.*\.(swf|js)$/, "$2")
        };
        k.getPluginVersion = function (m) {
            return m.replace(/[^-]*-?([^\.]*).*$/, "$1")
        };
        k.isYouTube = function (m) {
            return (m.indexOf("youtube.com") > -1 || m.indexOf("youtu.be") > -1)
        };
        k.isRtmp = function (m, n) {
            return (m.indexOf("rtmp") == 0 || n == "rtmp")
        };
        k.foreach = function (n, m) {
            var o, p;
            for (o in n) {
                if (n.hasOwnProperty(o)) {
                    p = n[o];
                    m(o, p)
                }
            }
        };
        k.isHTTPS = function () {
            return (g.location.href.indexOf("https") == 0)
        };
        k.repo = function () {
            var m = "http://p.jwpcdn.com/" + d.version.split(/\W/).splice(0, 2).join("/") + "/";
            try {
                if (k.isHTTPS()) {
                    m = m.replace("http://", "https://ssl.")
                }
            } catch (n) {}
            return m
        }
    })(jwplayer);
    (function (o) {
        var e = "video/",
            i = "audio/",
            g = "image",
            j = "mp4",
            c = "webm",
            n = "ogg",
            b = "aac",
            k = "mp3",
            l = "vorbis",
            d = o.foreach,
            m = {
                mp4: e + j,
                vorbis: i + n,
                ogg: e + n,
                webm: e + c,
                aac: i + j,
                mp3: i + "mpeg",
                hls: "application/vnd.apple.mpegurl"
            }, h = {
                mp4: m[j],
                f4v: m[j],
                m4v: m[j],
                mov: m[j],
                m4a: m[b],
                f4a: m[b],
                aac: m[b],
                mp3: m[k],
                ogv: m[n],
                ogg: m[l],
                oga: m[l],
                webm: m[c],
                m3u8: m.hls,
                hls: m.hls
            }, e = "video",
            f = {
                flv: e,
                f4v: e,
                mov: e,
                m4a: e,
                m4v: e,
                mp4: e,
                aac: e,
                f4a: e,
                mp3: "sound",
                smil: "rtmp",
                m3u8: "hls",
                hls: "hls"
            };
        var a = o.extensionmap = {};
        d(h, function (p, q) {
            a[p] = {
                html5: q
            }
        });
        d(f, function (p, q) {
            if (!a[p]) {
                a[p] = {}
            }
            a[p].flash = q
        });
        a.types = m;
        a.mimeType = function (q) {
            var p;
            d(m, function (r, t) {
                if (!p && t == q) {
                    p = r
                }
            });
            return p
        };
        a.extType = function (p) {
            return a.mimeType(h[p])
        }
    })(jwplayer.utils);
    (function (b) {
        var a = b.loaderstatus = {
            NEW: 0,
            LOADING: 1,
            ERROR: 2,
            COMPLETE: 3
        }, c = document;
        b.scriptloader = function (e) {
            var f = a.NEW,
                h = jwplayer.events,
                d = new h.eventdispatcher();
            b.extend(this, d);
            this.load = function () {
                var k = b.scriptloader.loaders[e];
                if (k && (k.getStatus() == a.NEW || k.getStatus() == a.LOADING)) {
                    k.addEventListener(h.ERROR, g);
                    k.addEventListener(h.COMPLETE, i);
                    return
                }
                b.scriptloader.loaders[e] = this;
                if (f == a.NEW) {
                    f = a.LOADING;
                    var j = c.createElement("script");
                    if (j.addEventListener) {
                        j.onload = i;
                        j.onerror = g
                    } else {
                        if (j.readyState) {
                            j.onreadystatechange = function () {
                                if (j.readyState == "loaded" || j.readyState == "complete") {
                                    i()
                                }
                            }
                        }
                    }
                    c.getElementsByTagName("head")[0].appendChild(j);
                    j.src = e
                }
            };

            function g(j) {
                f = a.ERROR;
                d.sendEvent(h.ERROR)
            }

            function i(j) {
                f = a.COMPLETE;
                d.sendEvent(h.COMPLETE)
            }
            this.getStatus = function () {
                return f
            }
        };
        b.scriptloader.loaders = {}
    })(jwplayer.utils);
    (function (a) {
        a.trim = function (b) {
            return b.replace(/^\s*/, "").replace(/\s*$/, "")
        };
        a.pad = function (d, c, b) {
            if (!b) {
                b = "0"
            }
            while (d.length < c) {
                d = b + d
            }
            return d
        };
        a.xmlAttribute = function (b, c) {
            for (var d = 0; d < b.attributes.length; d++) {
                if (b.attributes[d].name && b.attributes[d].name.toLowerCase() == c.toLowerCase()) {
                    return b.attributes[d].value.toString()
                }
            }
            return ""
        };
        a.extension = function (b) {
            if (!b || b.substr(0, 4) == "rtmp") {
                return ""
            }
            b = b.substring(b.lastIndexOf("/") + 1, b.length).split("?")[0].split("#")[0];
            if (b.lastIndexOf(".") > -1) {
                return b.substr(b.lastIndexOf(".") + 1, b.length).toLowerCase()
            }
        };
        a.stringToColor = function (b) {
            b = b.replace(/(#|0x)?([0-9A-F]{3,6})$/gi, "$2");
            if (b.length == 3) {
                b = b.charAt(0) + b.charAt(0) + b.charAt(1) + b.charAt(1) + b.charAt(2) + b.charAt(2)
            }
            return parseInt(b, 16)
        }
    })(jwplayer.utils);
    (function (a) {
        a.events = {
            COMPLETE: "COMPLETE",
            ERROR: "ERROR",
            API_READY: "jwplayerAPIReady",
            JWPLAYER_READY: "jwplayerReady",
            JWPLAYER_FULLSCREEN: "jwplayerFullscreen",
            JWPLAYER_RESIZE: "jwplayerResize",
            JWPLAYER_ERROR: "jwplayerError",
            JWPLAYER_SETUP_ERROR: "jwplayerSetupError",
            JWPLAYER_MEDIA_BEFOREPLAY: "jwplayerMediaBeforePlay",
            JWPLAYER_MEDIA_BEFORECOMPLETE: "jwplayerMediaBeforeComplete",
            JWPLAYER_COMPONENT_SHOW: "jwplayerComponentShow",
            JWPLAYER_COMPONENT_HIDE: "jwplayerComponentHide",
            JWPLAYER_MEDIA_BUFFER: "jwplayerMediaBuffer",
            JWPLAYER_MEDIA_BUFFER_FULL: "jwplayerMediaBufferFull",
            JWPLAYER_MEDIA_ERROR: "jwplayerMediaError",
            JWPLAYER_MEDIA_LOADED: "jwplayerMediaLoaded",
            JWPLAYER_MEDIA_COMPLETE: "jwplayerMediaComplete",
            JWPLAYER_MEDIA_SEEK: "jwplayerMediaSeek",
            JWPLAYER_MEDIA_TIME: "jwplayerMediaTime",
            JWPLAYER_MEDIA_VOLUME: "jwplayerMediaVolume",
            JWPLAYER_MEDIA_META: "jwplayerMediaMeta",
            JWPLAYER_MEDIA_MUTE: "jwplayerMediaMute",
            JWPLAYER_MEDIA_LEVELS: "jwplayerMediaLevels",
            JWPLAYER_MEDIA_LEVEL_CHANGED: "jwplayerMediaLevelChanged",
            JWPLAYER_CAPTIONS_CHANGED: "jwplayerCaptionsChanged",
            JWPLAYER_CAPTIONS_LIST: "jwplayerCaptionsList",
            JWPLAYER_PLAYER_STATE: "jwplayerPlayerState",
            state: {
                BUFFERING: "BUFFERING",
                IDLE: "IDLE",
                PAUSED: "PAUSED",
                PLAYING: "PLAYING"
            },
            JWPLAYER_PLAYLIST_LOADED: "jwplayerPlaylistLoaded",
            JWPLAYER_PLAYLIST_ITEM: "jwplayerPlaylistItem",
            JWPLAYER_PLAYLIST_COMPLETE: "jwplayerPlaylistComplete",
            JWPLAYER_DISPLAY_CLICK: "jwplayerViewClick",
            JWPLAYER_CONTROLS: "jwplayerViewControls",
            JWPLAYER_INSTREAM_CLICK: "jwplayerInstreamClicked",
            JWPLAYER_INSTREAM_DESTROYED: "jwplayerInstreamDestroyed",
            JWPLAYER_AD_TIME: "jwplayerAdTime",
            JWPLAYER_AD_ERROR: "jwplayerAdError",
            JWPLAYER_AD_CLICK: "jwplayerAdClicked",
            JWPLAYER_AD_COMPLETE: "jwplayerAdComplete",
            JWPLAYER_AD_IMPRESSION: "jwplayerAdImpression",
            JWPLAYER_AD_COMPANIONS: "jwplayerAdCompanions"
        }
    })(jwplayer);
    (function (a) {
        var b = jwplayer.utils;
        a.eventdispatcher = function (h, c) {
            var e = h,
                g = c,
                f, d;
            this.resetEventListeners = function () {
                f = {};
                d = []
            };
            this.resetEventListeners();
            this.addEventListener = function (i, l, k) {
                try {
                    if (!b.exists(f[i])) {
                        f[i] = []
                    }
                    if (b.typeOf(l) == "string") {
                        l = (new Function("return " + l))()
                    }
                    f[i].push({
                        listener: l,
                        count: k
                    })
                } catch (j) {
                    b.log("error", j)
                }
                return false
            };
            this.removeEventListener = function (j, l) {
                if (!f[j]) {
                    return
                }
                try {
                    for (var i = 0; i < f[j].length; i++) {
                        if (f[j][i].listener.toString() == l.toString()) {
                            f[j].splice(i, 1);
                            break
                        }
                    }
                } catch (k) {
                    b.log("error", k)
                }
                return false
            };
            this.addGlobalListener = function (k, j) {
                try {
                    if (b.typeOf(k) == "string") {
                        k = (new Function("return " + k))()
                    }
                    d.push({
                        listener: k,
                        count: j
                    })
                } catch (i) {
                    b.log("error", i)
                }
                return false
            };
            this.removeGlobalListener = function (k) {
                if (!k) {
                    return
                }
                try {
                    for (var i = 0; i < d.length; i++) {
                        if (d[i].listener.toString() == k.toString()) {
                            d.splice(i, 1);
                            break
                        }
                    }
                } catch (j) {
                    b.log("error", j)
                }
                return false
            };
            this.sendEvent = function (k, m) {
                if (!b.exists(m)) {
                    m = {}
                }
                b.extend(m, {
                    id: e,
                    version: jwplayer.version,
                    type: k
                });
                if (g) {
                    b.log(k, m)
                }
                if (b.typeOf(f[k]) != "undefined") {
                    for (var j = 0; j < f[k].length; j++) {
                        try {
                            f[k][j].listener(m)
                        } catch (l) {
                            b.log("There was an error while handling a listener: " + l.toString(), f[k][j].listener)
                        }
                        if (f[k][j]) {
                            if (f[k][j].count === 1) {
                                delete f[k][j]
                            } else {
                                if (f[k][j].count > 0) {
                                    f[k][j].count = f[k][j].count - 1
                                }
                            }
                        }
                    }
                }
                var i;
                for (i = 0; i < d.length; i++) {
                    try {
                        d[i].listener(m)
                    } catch (l) {
                        b.log("There was an error while handling a listener: " + l.toString(), d[i].listener)
                    }
                    if (d[i]) {
                        if (d[i].count === 1) {
                            delete d[i]
                        } else {
                            if (d[i].count > 0) {
                                d[i].count = d[i].count - 1
                            }
                        }
                    }
                }
            }
        }
    })(jwplayer.events);
    (function (a) {
        var c = {}, b = {};
        a.plugins = function () {};
        a.plugins.loadPlugins = function (e, d) {
            b[e] = new a.plugins.pluginloader(new a.plugins.model(c), d);
            return b[e]
        };
        a.plugins.registerPlugin = function (h, g, f, e) {
            var d = a.utils.getPluginName(h);
            if (!c[d]) {
                c[d] = new a.plugins.plugin(h)
            }
            c[d].registerPlugin(h, g, f, e)
        }
    })(jwplayer);
    (function (a) {
        a.plugins.model = function (b) {
            this.addPlugin = function (c) {
                var d = a.utils.getPluginName(c);
                if (!b[d]) {
                    b[d] = new a.plugins.plugin(c)
                }
                return b[d]
            };
            this.getPlugins = function () {
                return b
            }
        }
    })(jwplayer);
    (function (b) {
        var a = jwplayer.utils,
            c = jwplayer.events,
            d = "undefined";
        b.pluginmodes = {
            FLASH: 0,
            JAVASCRIPT: 1,
            HYBRID: 2
        };
        b.plugin = function (e) {
            var l = a.loaderstatus.NEW,
                m, k, f, n;
            var g = new c.eventdispatcher();
            a.extend(this, g);

            function h() {
                switch (a.getPluginPathType(e)) {
                case a.pluginPathType.ABSOLUTE:
                    return e;
                case a.pluginPathType.RELATIVE:
                    return a.getAbsolutePath(e, window.location.href)
                }
            }

            function j(o) {
                n = setTimeout(function () {
                    l = a.loaderstatus.COMPLETE;
                    g.sendEvent(c.COMPLETE)
                }, 1000)
            }

            function i(o) {
                l = a.loaderstatus.ERROR;
                g.sendEvent(c.ERROR)
            }
            this.load = function () {
                if (l == a.loaderstatus.NEW) {
                    if (e.lastIndexOf(".swf") > 0) {
                        m = e;
                        l = a.loaderstatus.COMPLETE;
                        g.sendEvent(c.COMPLETE);
                        return
                    } else {
                        if (a.getPluginPathType(e) == a.pluginPathType.CDN) {
                            l = a.loaderstatus.COMPLETE;
                            g.sendEvent(c.COMPLETE);
                            return
                        }
                    }
                    l = a.loaderstatus.LOADING;
                    var o = new a.scriptloader(h());
                    o.addEventListener(c.COMPLETE, j);
                    o.addEventListener(c.ERROR, i);
                    o.load()
                }
            };
            this.registerPlugin = function (r, q, p, o) {
                if (n) {
                    clearTimeout(n);
                    n = undefined
                }
                f = q;
                if (p && o) {
                    m = o;
                    k = p
                } else {
                    if (typeof p == "string") {
                        m = p
                    } else {
                        if (typeof p == "function") {
                            k = p
                        } else {
                            if (!p && !o) {
                                m = r
                            }
                        }
                    }
                }
                l = a.loaderstatus.COMPLETE;
                g.sendEvent(c.COMPLETE)
            };
            this.getStatus = function () {
                return l
            };
            this.getPluginName = function () {
                return a.getPluginName(e)
            };
            this.getFlashPath = function () {
                if (m) {
                    switch (a.getPluginPathType(m)) {
                    case a.pluginPathType.ABSOLUTE:
                        return m;
                    case a.pluginPathType.RELATIVE:
                        if (e.lastIndexOf(".swf") > 0) {
                            return a.getAbsolutePath(m, window.location.href)
                        }
                        return a.getAbsolutePath(m, h())
                    }
                }
                return null
            };
            this.getJS = function () {
                return k
            };
            this.getTarget = function () {
                return f
            };
            this.getPluginmode = function () {
                if (typeof m != d && typeof k != d) {
                    return b.pluginmodes.HYBRID
                } else {
                    if (typeof m != d) {
                        return b.pluginmodes.FLASH
                    } else {
                        if (typeof k != d) {
                            return b.pluginmodes.JAVASCRIPT
                        }
                    }
                }
            };
            this.getNewInstance = function (p, o, q) {
                return new k(p, o, q)
            };
            this.getURL = function () {
                return e
            }
        }
    })(jwplayer.plugins);
    (function (b) {
        var a = b.utils,
            c = b.events,
            d = a.foreach;
        b.plugins.pluginloader = function (j, i) {
            var p = a.loaderstatus.NEW,
                h = false,
                e = false,
                l = false,
                m, n = i,
                f = new c.eventdispatcher();
            a.extend(this, f);

            function g() {
                if (l) {
                    f.sendEvent(c.ERROR, {
                        message: m
                    })
                } else {
                    if (!e) {
                        e = true;
                        p = a.loaderstatus.COMPLETE;
                        f.sendEvent(c.COMPLETE)
                    }
                }
            }

            function o() {
                if (!n) {
                    g()
                }
                if (!e && !l) {
                    var r = 0,
                        q = j.getPlugins();
                    a.foreach(n, function (u, y) {
                        var v = a.getPluginName(u),
                            z = q[v],
                            x = z.getJS(),
                            w = z.getTarget(),
                            t = z.getStatus();
                        if (t == a.loaderstatus.LOADING || t == a.loaderstatus.NEW) {
                            r++
                        } else {
                            if (x && (!w || parseFloat(w) > parseFloat(b.version))) {
                                l = true;
                                m = "Incompatible player version";
                                g()
                            }
                        }
                    });
                    if (r == 0) {
                        g()
                    }
                }
            }
            this.setupPlugins = function (u, r, w) {
                var t = {
                    length: 0,
                    plugins: {}
                }, v = {
                        length: 0,
                        plugins: {}
                    }, q = j.getPlugins();
                d(r.plugins, function (A, C) {
                    var B = a.getPluginName(A),
                        D = q[B],
                        E = D.getFlashPath(),
                        F = D.getJS(),
                        x = D.getURL();
                    if (E) {
                        t.plugins[E] = a.extend({}, C);
                        t.plugins[E].pluginmode = D.getPluginmode();
                        t.length++
                    }
                    try {
                        if (F && r.plugins && r.plugins[x]) {
                            var y = document.createElement("div");
                            y.id = u.id + "_" + B;
                            y.style.position = "absolute";
                            y.style.top = 0;
                            y.style.zIndex = v.length + 10;
                            v.plugins[B] = D.getNewInstance(u, a.extend({}, r.plugins[x]), y);
                            v.length++;
                            u.onReady(w(v.plugins[B], y, true));
                            u.onResize(w(v.plugins[B], y))
                        }
                    } catch (z) {
                        a.log("ERROR: Failed to load " + B + ".")
                    }
                });
                u.plugins = v.plugins;
                return t
            };
            this.load = function () {
                if (a.exists(i) && a.typeOf(i) != "object") {
                    o();
                    return
                }
                p = a.loaderstatus.LOADING;
                h = true;
                d(i, function (r, t) {
                    if (a.exists(r)) {
                        var u = j.addPlugin(r);
                        u.addEventListener(c.COMPLETE, o);
                        u.addEventListener(c.ERROR, k)
                    }
                });
                var q = j.getPlugins();
                d(q, function (r, t) {
                    t.load()
                });
                h = false;
                o()
            };
            var k = this.pluginFailed = function (q) {
                if (!l) {
                    l = true;
                    m = "File not found";
                    g()
                }
            };
            this.getStatus = function () {
                return p
            }
        }
    })(jwplayer);
    (function (a) {
        a.playlist = function (c) {
            var d = [];
            if (a.utils.typeOf(c) == "array") {
                for (var b = 0; b < c.length; b++) {
                    d.push(new a.playlist.item(c[b]))
                }
            } else {
                d.push(new a.playlist.item(c))
            }
            return d
        }
    })(jwplayer);
    (function (b) {
        var a = b.item = function (f) {
            var c = jwplayer.utils,
                e = c.extend({}, a.defaults, f);
            e.tracks = c.exists(f.tracks) ? f.tracks : [];
            if (e.sources.length == 0) {
                e.sources = [new b.source(e)]
            }
            for (var g = 0; g < e.sources.length; g++) {
                var h = e.sources[g]["default"];
                if (h) {
                    e.sources[g]["default"] = (h.toString() == "true")
                } else {
                    e.sources[g]["default"] = false
                }
                e.sources[g] = new b.source(e.sources[g])
            }
            if (e.captions && !c.exists(f.tracks)) {
                for (var d = 0; d < e.captions.length; d++) {
                    e.tracks.push(e.captions[d])
                }
                delete e.captions
            }
            for (var g = 0; g < e.tracks.length; g++) {
                e.tracks[g] = new b.track(e.tracks[g])
            }
            return e
        };
        a.defaults = {
            description: "",
            image: "",
            mediaid: "",
            title: "",
            sources: [],
            tracks: []
        }
    })(jwplayer.playlist);
    (function (d) {
        var b = undefined,
            a = jwplayer.utils,
            c = {
                file: b,
                label: b,
                type: b,
                "default": b
            };
        d.source = function (f) {
            var e = a.extend({}, c);
            a.foreach(c, function (h, g) {
                if (a.exists(f[h])) {
                    e[h] = f[h];
                    delete f[h]
                }
            });
            if (e.type && e.type.indexOf("/") > 0) {
                e.type = a.extensionmap.mimeType(e.type)
            }
            if (e.type == "m3u8") {
                e.type = "hls"
            }
            if (e.type == "smil") {
                e.type = "rtmp"
            }
            return e
        }
    })(jwplayer.playlist);
    (function (d) {
        var b = undefined,
            a = jwplayer.utils,
            c = {
                file: b,
                label: b,
                kind: "captions",
                "default": false
            };
        d.track = function (e) {
            var f = a.extend({}, c);
            if (!e) {
                e = {}
            }
            a.foreach(c, function (h, g) {
                if (a.exists(e[h])) {
                    f[h] = e[h];
                    delete e[h]
                }
            });
            return f
        }
    })(jwplayer.playlist);
    (function (b) {
        var a = b.utils,
            c = b.events,
            d = document;
        var e = b.embed = function (n) {
            var j = new e.config(n.config),
                k, q, w, h = j.width,
                x = j.height,
                g = "Error loading player: ",
                y = b.plugins.loadPlugins(n.id, j.plugins),
                o = null;
            if (j.fallbackDiv) {
                w = j.fallbackDiv;
                delete j.fallbackDiv
            }
            j.id = n.id;
            q = d.getElementById(n.id);
            if (j.aspectratio) {
                n.config.aspectratio = j.aspectratio
            } else {
                delete n.config.aspectratio
            }
            k = d.createElement("div");
            k.id = q.id;
            k.style.width = h.toString().indexOf("%") > 0 ? h : (h + "px");
            k.style.height = x.toString().indexOf("%") > 0 ? x : (x + "px");
            q.parentNode.replaceChild(k, q);

            function t(A, z) {
                a.foreach(z, function (B, C) {
                    if (typeof A[B] == "function") {
                        (A[B]).call(A, C)
                    }
                })
            }

            function r() {
                if (j.sitecatalyst) {
                    try {
                        if (s != null && s.hasOwnProperty("Media")) {} else {
                            p()
                        }
                    } catch (C) {
                        p();
                        return
                    }
                }
                if (a.typeOf(j.playlist) == "array" && j.playlist.length < 2) {
                    if (j.playlist.length == 0 || !j.playlist[0].sources || j.playlist[0].sources.length == 0) {
                        m();
                        return
                    }
                }
                if (y.getStatus() == a.loaderstatus.COMPLETE) {
                    for (var D = 0; D < j.modes.length; D++) {
                        if (j.modes[D].type && e[j.modes[D].type]) {
                            var z = a.extend({}, j),
                                A = new e[j.modes[D].type](k, j.modes[D], z, y, n);
                            if (A.supportsConfig()) {
                                A.addEventListener(c.ERROR, f);
                                A.embed();
                                t(n, z.events);
                                return n
                            }
                        }
                    }
                    if (j.fallback) {
                        var B = "No suitable players found and fallback enabled";
                        o = setTimeout(function (E) {
                            i(B, true)
                        }, 10);
                        a.log(B);
                        new e.download(k, j, m)
                    } else {
                        var B = "No suitable players found and fallback disabled";
                        i(B, false);
                        a.log(B);
                        u()
                    }
                }
            }

            function u() {
                k.parentNode.replaceChild(w, k)
            }

            function f(z) {
                v(k, g + z.message)
            }

            function l(z) {
                v(k, "Could not load plugins: " + z.message)
            }

            function m() {
                v(k, g + "No playable sources found")
            }

            function p() {
                v(k, "Adobe SiteCatalyst Error: Could not find Media Module")
            }

            function v(z, B) {
                if (!j.fallback) {
                    i(B, false);
                    return
                }
                var A = z.style;
                A.backgroundColor = "#000";
                A.color = "#FFF";
                A.width = a.styleDimension(j.width);
                A.height = a.styleDimension(j.height);
                A.display = "table";
                A.opacity = 1;
                var D = document.createElement("p"),
                    C = D.style;
                C.verticalAlign = "middle";
                C.textAlign = "center";
                C.display = "table-cell";
                C.font = "15px/20px Arial, Helvetica, sans-serif";
                D.innerHTML = B.replace(":", ":<br>");
                z.innerHTML = "";
                z.appendChild(D);
                i(B, true)
            }

            function i(z, A) {
                if (o) {
                    clearTimeout(o);
                    o = null
                }
                n.dispatchEvent(c.JWPLAYER_SETUP_ERROR, {
                    message: z,
                    fallback: A
                })
            }
            b.embed.errorScreen = v;
            y.addEventListener(c.COMPLETE, r);
            y.addEventListener(c.ERROR, l);
            y.load();
            return n
        }
    })(jwplayer);
    (function (e) {
        var i = e.utils,
            h = e.embed,
            j = e.playlist.item,
            g = undefined;
        var a = h.config = function (l) {
            var n = {
                fallback: true,
                height: 270,
                primary: "html5",
                width: 480,
                base: l.base ? l.base : i.getScriptPath("jwplayer.js"),
                aspectratio: ""
            }, m = i.extend(n, e.defaults, l),
                k = {
                    html5: {
                        type: "html5",
                        src: m.base + "jwplayer.html5.js"
                    },
                    flash: {
                        type: "flash",
                        src: m.base + "jwplayer.flash.swf"
                    }
                };
            m.modes = (m.primary == "flash") ? [k.flash, k.html5] : [k.html5, k.flash];
            if (m.listbar) {
                m.playlistsize = m.listbar.size;
                m.playlistposition = m.listbar.position
            }
            if (m.flashplayer) {
                k.flash.src = m.flashplayer
            }
            if (m.html5player) {
                k.html5.src = m.html5player
            }
            d(m);
            f(m);
            return m
        };

        function f(l) {
            var k = l.aspectratio,
                m = b(k);
            if (l.width.toString().indexOf("%") == -1) {
                delete l.aspectratio
            } else {
                if (!m) {
                    delete l.aspectratio
                } else {
                    l.aspectratio = m
                }
            }
        }

        function b(l) {
            if (typeof l != "string" || !i.exists(l)) {
                return 0
            }
            var m = l.indexOf(":");
            if (m == -1) {
                return 0
            }
            var k = parseFloat(l.substr(0, m)),
                n = parseFloat(l.substr(m + 1));
            if (k <= 0 || n <= 0) {
                return 0
            }
            return (n / k * 100) + "%"
        }
        a.addConfig = function (k, l) {
            d(l);
            return i.extend(k, l)
        };

        function d(l) {
            if (!l.playlist) {
                var n = {};
                i.foreach(j.defaults, function (o, p) {
                    c(l, n, o)
                });
                if (!n.sources) {
                    if (l.levels) {
                        n.sources = l.levels;
                        delete l.levels
                    } else {
                        var k = {};
                        c(l, k, "file");
                        c(l, k, "type");
                        n.sources = k.file ? [k] : []
                    }
                }
                l.playlist = [new j(n)]
            } else {
                for (var m = 0; m < l.playlist.length; m++) {
                    l.playlist[m] = new j(l.playlist[m])
                }
            }
        }

        function c(m, k, l) {
            if (i.exists(m[l])) {
                k[l] = m[l];
                delete m[l]
            }
        }
    })(jwplayer);
    (function (e) {
        var g = e.embed,
            j = e.utils,
            i = document,
            h = "pointer",
            c = "none",
            a = "block",
            f = "100%",
            d = "relative",
            b = "absolute";
        g.download = function (n, z, l) {
            var q = j.extend({}, z),
                v, o = q.width ? q.width : 480,
                r = q.height ? q.height : 320,
                A, t, k = z.logo ? z.logo : {
                    prefix: j.repo(),
                    file: "logo.png",
                    margin: 10
                };

            function y() {
                var F, G, E, H, D = q.playlist,
                    K, C, H, I = ["mp4", "aac", "mp3"];
                if (D && D.length) {
                    K = D[0];
                    C = K.sources;
                    for (H = 0; H < C.length; H++) {
                        var B = C[H],
                            J = B.type ? B.type : j.extensionmap.extType(j.extension(B.file));
                        if (B.file) {
                            j.foreach(I, function (L, M) {
                                if (J == I[L]) {
                                    F = B.file;
                                    G = K.image
                                } else {
                                    if (j.isYouTube(B.file)) {
                                        E = B.file
                                    }
                                }
                            });
                            if (F || E) {
                                continue
                            }
                        }
                    }
                } else {
                    return
                } if (F) {
                    A = F;
                    t = G;
                    u();
                    p()
                } else {
                    if (E) {
                        m(E)
                    } else {
                        l()
                    }
                }
            }

            function u() {
                if (n) {
                    v = w("a", "display", n);
                    w("div", "icon", v);
                    w("div", "logo", v);
                    if (A) {
                        v.setAttribute("href", j.getAbsolutePath(A))
                    }
                }
            }

            function x(B, D) {
                var E = i.querySelectorAll(B);
                for (var C = 0; C < E.length; C++) {
                    j.foreach(D, function (G, F) {
                        E[C].style[G] = F
                    })
                }
            }

            function p() {
                var B = "#" + n.id + " .jwdownload";
                n.style.width = "";
                n.style.height = "";
                x(B + "display", {
                    width: j.styleDimension(Math.max(320, o)),
                    height: j.styleDimension(Math.max(180, r)),
                    background: "black center no-repeat " + (t ? "url(" + t + ")" : ""),
                    backgroundSize: "contain",
                    position: d,
                    border: c,
                    display: a
                });
                x(B + "display div", {
                    position: b,
                    width: f,
                    height: f
                });
                x(B + "logo", {
                    top: k.margin + "px",
                    right: k.margin + "px",
                    background: "top right no-repeat url(" + k.prefix + k.file + ")"
                });
                x(B + "icon", {
                    background: "center no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAgNJREFUeNrs28lqwkAYB/CZqNVDDj2r6FN41QeIy8Fe+gj6BL275Q08u9FbT8ZdwVfotSBYEPUkxFOoks4EKiJdaDuTjMn3wWBO0V/+sySR8SNSqVRKIR8qaXHkzlqS9jCfzzWcTCYp9hF5o+59sVjsiRzcegSckFzcjT+ruN80TeSlAjCAAXzdJSGPFXRpAAMYwACGZQkSdhG4WCzehMNhqV6vG6vVSrirKVEw66YoSqDb7cqlUilE8JjHd/y1MQefVzqdDmiaJpfLZWHgXMHn8F6vJ1cqlVAkEsGuAn83J4gAd2RZymQygX6/L1erVQt+9ZPWb+CDwcCC2zXGJaewl/DhcHhK3DVj+KfKZrMWvFarcYNLomAv4aPRSFZVlTlcSPA5fDweW/BoNIqFnKV53JvncjkLns/n/cLdS+92O7RYLLgsKfv9/t8XlDn4eDyiw+HA9Jyz2eyt0+kY2+3WFC5hluej0Ha7zQQq9PPwdDq1Et1sNsx/nFBgCqWJ8oAK1aUptNVqcYWewE4nahfU0YQnk4ntUEfGMIU2m01HoLaCKbTRaDgKtaVLk9tBYaBcE/6Artdr4RZ5TB6/dC+9iIe/WgAMYADDpAUJAxjAAAYwgGFZgoS/AtNNTF7Z2bL0BYPBV3Jw5xFwwWcYxgtBP5OkE8i9G7aWGOOCruvauwADALMLMEbKf4SdAAAAAElFTkSuQmCC)"
                })
            }

            function w(B, E, D) {
                var C = i.createElement(B);
                if (E) {
                    C.className = "jwdownload" + E
                }
                if (D) {
                    D.appendChild(C)
                }
                return C
            }

            function m(B) {
                var C = w("embed", "", n);
                C.src = "http://www.youtube.com/v/" + (/v=([^&]+)|\/([\w-]+)$|^([\w-]+)$/i).exec(B).slice(1).join("");
                C.type = "application/x-shockwave-flash";
                C.width = o;
                C.height = r
            }
            y()
        }
    })(jwplayer);
    (function (c) {
        var b = c.utils,
            d = c.events,
            a = {};
        var e = c.embed.flash = function (l, m, p, k, n) {
            var h = new c.events.eventdispatcher(),
                i = b.flashVersion();
            b.extend(this, h);

            function q(t, r, u) {
                var v = document.createElement("param");
                v.setAttribute("name", r);
                v.setAttribute("value", u);
                t.appendChild(v)
            }

            function o(t, u, r) {
                return function (v) {
                    try {
                        if (r) {
                            document.getElementById(n.id + "_wrapper").appendChild(u)
                        }
                        var x = document.getElementById(n.id).getPluginConfig("display");
                        if (typeof t.resize == "function") {
                            t.resize(x.width, x.height)
                        }
                        u.style.left = x.x;
                        u.style.top = x.h
                    } catch (w) {}
                }
            }

            function j(r) {
                if (!r) {
                    return {}
                }
                var t = {};
                b.foreach(r, function (v, u) {
                    b.foreach(u, function (x, w) {
                        t[v + "." + x] = w
                    })
                });
                return t
            }

            function g(r) {
                if (!r) {
                    return {}
                }
                var u = {}, t = [];
                b.foreach(r, function (v, x) {
                    var w = b.getPluginName(v);
                    t.push(v);
                    b.foreach(x, function (z, y) {
                        u[w + "." + z] = y
                    })
                });
                u.plugins = t.join(",");
                return u
            }
            this.embed = function () {
                p.id = n.id;
                if (i < 10) {
                    h.sendEvent(d.ERROR, {
                        message: "Flash version must be 10.0 or greater"
                    });
                    return false
                }
                var F, D, v = n.config.listbar;
                var y = b.extend({}, p);
                if (l.id + "_wrapper" == l.parentNode.id) {
                    F = document.getElementById(l.id + "_wrapper")
                } else {
                    F = document.createElement("div");
                    D = document.createElement("div");
                    D.style.display = "none";
                    D.id = l.id + "_aspect";
                    F.id = l.id + "_wrapper";
                    F.style.position = "relative";
                    F.style.display = "block";
                    F.style.width = b.styleDimension(y.width);
                    F.style.height = b.styleDimension(y.height);
                    if (n.config.aspectratio) {
                        var w = parseFloat(n.config.aspectratio);
                        D.style.display = "block";
                        D.style.marginTop = n.config.aspectratio;
                        F.style.height = "auto";
                        F.style.display = "inline-block";
                        if (v) {
                            if (v.position == "bottom") {
                                D.style.paddingBottom = v.size + "px"
                            } else {
                                if (v.position == "right") {
                                    D.style.marginBottom = (-1 * v.size * (w / 100)) + "px"
                                }
                            }
                        }
                    }
                    l.parentNode.replaceChild(F, l);
                    F.appendChild(l);
                    F.appendChild(D)
                }
                var t = k.setupPlugins(n, y, o);
                if (t.length > 0) {
                    b.extend(y, g(t.plugins))
                } else {
                    delete y.plugins
                } if (typeof y["dock.position"] != "undefined") {
                    if (y["dock.position"].toString().toLowerCase() == "false") {
                        y.dock = y["dock.position"];
                        delete y["dock.position"]
                    }
                }
                var G = "#000000",
                    B, u = y.wmode ? y.wmode : (y.height && y.height <= 40 ? "transparent" : "opaque"),
                    x = ["height", "width", "modes", "events", "primary", "base", "fallback", "volume"];
                for (var A = 0; A < x.length; A++) {
                    delete y[x[A]]
                }
                var E = b.getCookies();
                b.foreach(E, function (H, I) {
                    if (typeof (y[H]) == "undefined") {
                        y[H] = I
                    }
                });
                var r = window.location.href.split("/");
                r.splice(r.length - 1, 1);
                r = r.join("/");
                y.base = r + "/";
                a[l.id] = y;
                if (b.isIE()) {
                    var C = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" " width="100%" height="100%"id="' + l.id + '" name="' + l.id + '" tabindex=0"">';
                    C += '<param name="movie" value="' + m.src + '">';
                    C += '<param name="allowfullscreen" value="true">';
                    C += '<param name="allowscriptaccess" value="always">';
                    C += '<param name="seamlesstabbing" value="true">';
                    C += '<param name="wmode" value="' + u + '">';
                    C += '<param name="bgcolor" value="' + G + '">';
                    C += "</object>";
                    l.outerHTML = C;
                    B = document.getElementById(l.id)
                } else {
                    var z = document.createElement("object");
                    z.setAttribute("type", "application/x-shockwave-flash");
                    z.setAttribute("data", m.src);
                    z.setAttribute("width", "100%");
                    z.setAttribute("height", "100%");
                    z.setAttribute("bgcolor", G);
                    z.setAttribute("id", l.id);
                    z.setAttribute("name", l.id);
                    z.setAttribute("tabindex", 0);
                    q(z, "allowfullscreen", "true");
                    q(z, "allowscriptaccess", "always");
                    q(z, "seamlesstabbing", "true");
                    q(z, "wmode", u);
                    l.parentNode.replaceChild(z, l);
                    B = z
                } if (n.config.aspectratio) {
                    B.style.position = "absolute"
                }
                n.container = B;
                n.setPlayer(B, "flash")
            };
            this.supportsConfig = function () {
                if (i) {
                    if (p) {
                        if (b.typeOf(p.playlist) == "string") {
                            return true
                        }
                        try {
                            var u = p.playlist[0],
                                r = u.sources;
                            if (typeof r == "undefined") {
                                return true
                            } else {
                                for (var t = 0; t < r.length; t++) {
                                    if (r[t].file && f(r[t].file, r[t].type)) {
                                        return true
                                    }
                                }
                            }
                        } catch (v) {
                            return false
                        }
                    } else {
                        return true
                    }
                }
                return false
            };

            function f(r, t) {
                if (b.isYouTube(r)) {
                    return true
                }
                if (b.isRtmp(r, t)) {
                    return true
                }
                if (t == "hls") {
                    return true
                }
                var u = b.extensionmap[t ? t : b.extension(r)];
                if (!u) {
                    return false
                }
                return !!(u.flash)
            }
        };
        e.getVars = function (f) {
            return a[f]
        }
    })(jwplayer);
    (function (c) {
        var a = c.utils,
            b = a.extensionmap,
            d = c.events;
        c.embed.html5 = function (g, h, o, f, k) {
            var j = this,
                e = new d.eventdispatcher();
            a.extend(j, e);

            function l(q, r, p) {
                return function (t) {
                    try {
                        var u = document.querySelector("#" + g.id + " .jwmain");
                        if (p) {
                            u.appendChild(r)
                        }
                        if (typeof q.resize == "function") {
                            q.resize(u.clientWidth, u.clientHeight);
                            setTimeout(function () {
                                q.resize(u.clientWidth, u.clientHeight)
                            }, 400)
                        }
                        r.left = u.style.left;
                        r.top = u.style.top
                    } catch (v) {}
                }
            }
            j.embed = function () {
                if (c.html5) {
                    f.setupPlugins(k, o, l);
                    g.innerHTML = "";
                    var p = c.utils.extend({}, o);
                    delete p.volume;
                    var q = new c.html5.player(p);
                    k.container = document.getElementById(k.id);
                    k.setPlayer(q, "html5")
                } else {
                    var r = new a.scriptloader(h.src);
                    r.addEventListener(d.ERROR, i);
                    r.addEventListener(d.COMPLETE, j.embed);
                    r.load()
                }
            };

            function i(p) {
                j.sendEvent(p.type, {
                    message: "HTML5 player not found"
                })
            }
            j.supportsConfig = function () {
                if ( !! c.vid.canPlayType) {
                    try {
                        if (a.typeOf(o.playlist) == "string") {
                            return true
                        } else {
                            var p = o.playlist[0].sources;
                            for (var r = 0; r < p.length; r++) {
                                var q = p[r].file,
                                    t = p[r].type;
                                if (n(q, t)) {
                                    return true
                                }
                            }
                        }
                    } catch (u) {
                        return false
                    }
                }
                return false
            };

            function n(p, q) {
                if (navigator.userAgent.match(/BlackBerry/i) !== null) {
                    return false
                }
                if (a.isAndroid() && (a.extension(p) == "m3u" || a.extension(p) == "m3u8")) {
                    return false
                }
                if (a.isRtmp(p, q)) {
                    return false
                }
                var r = b[q ? q : a.extension(p)];
                if (!r) {
                    return false
                }
                if (r.flash && !r.html5) {
                    return false
                }
                return m(r.html5)
            }

            function m(p) {
                var q = c.vid;
                if (!p) {
                    return true
                }
                try {
                    if (q.canPlayType(p)) {
                        return true
                    } else {
                        return false
                    }
                } catch (r) {
                    return false
                }
            }
        }
    })(jwplayer);
    (function (d) {
        var c = [],
            a = d.utils,
            e = d.events,
            b = e.state,
            g = document;
        var f = d.api = function (u) {
            var y = this,
                h = {}, l = {}, B = {}, o = [],
                i = undefined,
                E = false,
                p = [],
                z = undefined,
                t = {}, n = {};
            y.container = u;
            y.id = u.id;
            y.getBuffer = function () {
                return x("jwGetBuffer")
            };
            y.getContainer = function () {
                return y.container
            };
            y.addButton = function (I, G, H, L) {
                try {
                    n[L] = H;
                    var K = "jwplayer('" + y.id + "').callback('" + L + "')";
                    x("jwDockAddButton", I, G, K, L)
                } catch (J) {
                    a.log("Could not add dock button" + J.message)
                }
            };
            y.removeButton = function (G) {
                x("jwDockRemoveButton", G)
            }, y.callback = function (G) {
                if (n[G]) {
                    n[G]()
                }
            };
            y.forceState = function (G) {
                x("jwForceState", G);
                return y
            };
            y.releaseState = function () {
                return x("jwReleaseState")
            };
            y.getDuration = function () {
                return x("jwGetDuration")
            };
            y.getFullscreen = function () {
                return x("jwGetFullscreen")
            };
            y.getStretching = function () {
                return x("jwGetStretching")
            };
            y.getHeight = function () {
                return x("jwGetHeight")
            };
            y.getLockState = function () {
                return x("jwGetLockState")
            };
            y.getMeta = function () {
                return y.getItemMeta()
            };
            y.getMute = function () {
                return x("jwGetMute")
            };
            y.getPlaylist = function () {
                var G = x("jwGetPlaylist");
                if (y.renderingMode == "flash") {
                    a.deepReplaceKeyName(G, ["__dot__", "__spc__", "__dsh__", "__default__"], [".", " ", "-", "default"])
                }
                return G
            };
            y.getPlaylistItem = function (G) {
                if (!a.exists(G)) {
                    G = y.getPlaylistIndex()
                }
                return y.getPlaylist()[G]
            };
            y.getPlaylistIndex = function () {
                return x("jwGetPlaylistIndex")
            };
            y.getPosition = function () {
                return x("jwGetPosition")
            };
            y.getRenderingMode = function () {
                return y.renderingMode
            };
            y.getState = function () {
                return x("jwGetState")
            };
            y.getVolume = function () {
                return x("jwGetVolume")
            };
            y.getWidth = function () {
                return x("jwGetWidth")
            };
            y.setFullscreen = function (G) {
                if (!a.exists(G)) {
                    x("jwSetFullscreen", !x("jwGetFullscreen"))
                } else {
                    x("jwSetFullscreen", G)
                }
                return y
            };
            y.setStretching = function (G) {
                x("jwSetStretching", G);
                return y
            };
            y.setMute = function (G) {
                if (!a.exists(G)) {
                    x("jwSetMute", !x("jwGetMute"))
                } else {
                    x("jwSetMute", G)
                }
                return y
            };
            y.lock = function () {
                return y
            };
            y.unlock = function () {
                return y
            };
            y.load = function (G) {
                x("jwLoad", G);
                return y
            };
            y.playlistItem = function (G) {
                x("jwPlaylistItem", parseInt(G));
                return y
            };
            y.playlistPrev = function () {
                x("jwPlaylistPrev");
                return y
            };
            y.playlistNext = function () {
                x("jwPlaylistNext");
                return y
            };
            y.resize = function (J, G) {
                if (y.renderingMode != "flash") {
                    var I = document.getElementById(y.id);
                    I.className = I.className.replace(/\s+aspectMode/, "");
                    I.style.display = "block";
                    x("jwResize", J, G)
                } else {
                    var K = g.getElementById(y.id + "_wrapper"),
                        H = g.getElementById(y.id + "_aspect");
                    if (H) {
                        H.style.display = "none"
                    }
                    if (K) {
                        K.style.display = "block";
                        K.style.width = a.styleDimension(J);
                        K.style.height = a.styleDimension(G)
                    }
                }
                return y
            };
            y.play = function (G) {
                if (typeof G == "undefined") {
                    G = y.getState();
                    if (G == b.PLAYING || G == b.BUFFERING) {
                        x("jwPause")
                    } else {
                        x("jwPlay")
                    }
                } else {
                    x("jwPlay", G)
                }
                return y
            };
            y.pause = function (G) {
                if (typeof G == "undefined") {
                    G = y.getState();
                    if (G == b.PLAYING || G == b.BUFFERING) {
                        x("jwPause")
                    } else {
                        x("jwPlay")
                    }
                } else {
                    x("jwPause", G)
                }
                return y
            };
            y.stop = function () {
                x("jwStop");
                return y
            };
            y.seek = function (G) {
                x("jwSeek", G);
                return y
            };
            y.setVolume = function (G) {
                x("jwSetVolume", G);
                return y
            };
            y.loadInstream = function (H, G) {
                z = new f.instream(this, i, H, G);
                return z
            };
            y.getQualityLevels = function () {
                return x("jwGetQualityLevels")
            };
            y.getCurrentQuality = function () {
                return x("jwGetCurrentQuality")
            };
            y.setCurrentQuality = function (G) {
                x("jwSetCurrentQuality", G)
            };
            y.getCaptionsList = function () {
                return x("jwGetCaptionsList")
            };
            y.getCurrentCaptions = function () {
                return x("jwGetCurrentCaptions")
            };
            y.setCurrentCaptions = function (G) {
                x("jwSetCurrentCaptions", G)
            };
            y.getControls = function () {
                return x("jwGetControls")
            };
            y.getSafeRegion = function () {
                return x("jwGetSafeRegion")
            };
            y.setControls = function (G) {
                x("jwSetControls", G)
            };
            y.destroyPlayer = function () {
                x("jwPlayerDestroy")
            };
            y.playAd = function (G) {
                x("jwPlayAd", G)
            };
            var r = {
                onBufferChange: e.JWPLAYER_MEDIA_BUFFER,
                onBufferFull: e.JWPLAYER_MEDIA_BUFFER_FULL,
                onError: e.JWPLAYER_ERROR,
                onSetupError: e.JWPLAYER_SETUP_ERROR,
                onFullscreen: e.JWPLAYER_FULLSCREEN,
                onMeta: e.JWPLAYER_MEDIA_META,
                onMute: e.JWPLAYER_MEDIA_MUTE,
                onPlaylist: e.JWPLAYER_PLAYLIST_LOADED,
                onPlaylistItem: e.JWPLAYER_PLAYLIST_ITEM,
                onPlaylistComplete: e.JWPLAYER_PLAYLIST_COMPLETE,
                onReady: e.API_READY,
                onResize: e.JWPLAYER_RESIZE,
                onComplete: e.JWPLAYER_MEDIA_COMPLETE,
                onSeek: e.JWPLAYER_MEDIA_SEEK,
                onTime: e.JWPLAYER_MEDIA_TIME,
                onVolume: e.JWPLAYER_MEDIA_VOLUME,
                onBeforePlay: e.JWPLAYER_MEDIA_BEFOREPLAY,
                onBeforeComplete: e.JWPLAYER_MEDIA_BEFORECOMPLETE,
                onDisplayClick: e.JWPLAYER_DISPLAY_CLICK,
                onControls: e.JWPLAYER_CONTROLS,
                onQualityLevels: e.JWPLAYER_MEDIA_LEVELS,
                onQualityChange: e.JWPLAYER_MEDIA_LEVEL_CHANGED,
                onCaptionsList: e.JWPLAYER_CAPTIONS_LIST,
                onCaptionsChange: e.JWPLAYER_CAPTIONS_CHANGED,
                onAdError: e.JWPLAYER_AD_ERROR,
                onAdClick: e.JWPLAYER_AD_CLICK,
                onAdImpression: e.JWPLAYER_AD_IMPRESSION,
                onAdTime: e.JWPLAYER_AD_TIME,
                onAdComplete: e.JWPLAYER_AD_COMPLETE,
                onAdCompanions: e.JWPLAYER_AD_COMPANIONS
            };
            a.foreach(r, function (G) {
                y[G] = D(r[G], A)
            });
            var w = {
                onBuffer: b.BUFFERING,
                onPause: b.PAUSED,
                onPlay: b.PLAYING,
                onIdle: b.IDLE
            };
            a.foreach(w, function (G) {
                y[G] = D(w[G], q)
            });

            function D(G, H) {
                return function (I) {
                    return H(G, I)
                }
            }
            y.remove = function () {
                if (!E) {
                    throw "Cannot call remove() before player is ready"
                }
                m(this)
            };

            function m(G) {
                p = [];
                f.destroyPlayer(G.id)
            }
            y.setup = function (G) {
                if (d.embed) {
                    var H = g.getElementById(y.id);
                    if (H) {
                        G.fallbackDiv = H
                    }
                    m(y);
                    var I = d(y.id);
                    I.config = G;
                    return new d.embed(I)
                }
                return y
            };
            y.registerPlugin = function (J, I, H, G) {
                d.plugins.registerPlugin(J, I, H, G)
            };
            y.setPlayer = function (G, H) {
                i = G;
                y.renderingMode = H
            };
            y.detachMedia = function () {
                if (y.renderingMode == "html5") {
                    return x("jwDetachMedia")
                }
            };
            y.attachMedia = function (G) {
                if (y.renderingMode == "html5") {
                    return x("jwAttachMedia", G)
                }
            };

            function q(G, H) {
                if (!l[G]) {
                    l[G] = [];
                    A(e.JWPLAYER_PLAYER_STATE, F(G))
                }
                l[G].push(H);
                return y
            }

            function F(G) {
                return function (I) {
                    var H = I.newstate,
                        K = I.oldstate;
                    if (H == G) {
                        var J = l[H];
                        if (J) {
                            for (var L = 0; L < J.length; L++) {
                                if (typeof J[L] == "function") {
                                    J[L].call(this, {
                                        oldstate: K,
                                        newstate: H
                                    })
                                }
                            }
                        }
                    }
                }
            }

            function C(G, H, I) {
                if (!B[G]) {
                    B[G] = {}
                }
                if (!B[G][H]) {
                    B[G][H] = [];
                    A(H, k(G, H))
                }
                B[G][H].push(I);
                return y
            }

            function k(G, H) {
                return function (J) {
                    if (G == J.component) {
                        var I = B[G][H];
                        if (I) {
                            for (var K = 0; K < I.length; K++) {
                                if (typeof I[K] == "function") {
                                    I[K].call(this, J)
                                }
                            }
                        }
                    }
                }
            }

            function j(G, H) {
                try {
                    G.jwAddEventListener(H, 'function(dat) { jwplayer("' + y.id + '").dispatchEvent("' + H + '", dat); }')
                } catch (I) {
                    a.log("Could not add internal listener")
                }
            }

            function A(G, H) {
                if (!h[G]) {
                    h[G] = [];
                    if (i && E) {
                        j(i, G)
                    }
                }
                h[G].push(H);
                return y
            }
            y.dispatchEvent = function (I) {
                if (h[I]) {
                    var H = a.translateEventResponse(I, arguments[1]);
                    for (var G = 0; G < h[I].length; G++) {
                        if (typeof h[I][G] == "function") {
                            try {
                                if (I == e.JWPLAYER_PLAYLIST_LOADED) {
                                    a.deepReplaceKeyName(H.playlist, ["__dot__", "__spc__", "__dsh__", "__default__"], [".", " ", "-", "default"])
                                }
                                h[I][G].call(this, H)
                            } catch (J) {
                                a.log("There was an error calling back an event handler")
                            }
                        }
                    }
                }
            };
            y.dispatchInstreamEvent = function (G) {
                if (z) {
                    z.dispatchEvent(G, arguments)
                }
            };

            function x() {
                if (E) {
                    var I = arguments[0],
                        G = [];
                    for (var H = 1; H < arguments.length; H++) {
                        G.push(arguments[H])
                    }
                    if (typeof i != "undefined" && typeof i[I] == "function") {
                        switch (G.length) {
                        case 4:
                            return (i[I])(G[0], G[1], G[2], G[3]);
                        case 3:
                            return (i[I])(G[0], G[1], G[2]);
                        case 2:
                            return (i[I])(G[0], G[1]);
                        case 1:
                            return (i[I])(G[0]);
                        default:
                            return (i[I])()
                        }
                    }
                    return null
                } else {
                    p.push(arguments)
                }
            }
            y.callInternal = x;
            y.playerReady = function (G) {
                E = true;
                if (!i) {
                    y.setPlayer(g.getElementById(G.id))
                }
                y.container = g.getElementById(y.id);
                a.foreach(h, function (H) {
                    j(i, H)
                });
                A(e.JWPLAYER_PLAYLIST_ITEM, function (H) {
                    t = {}
                });
                A(e.JWPLAYER_MEDIA_META, function (H) {
                    a.extend(t, H.metadata)
                });
                y.dispatchEvent(e.API_READY);
                while (p.length > 0) {
                    x.apply(this, p.shift())
                }
            };
            y.getItemMeta = function () {
                return t
            };
            y.isBeforePlay = function () {
                return i.jwIsBeforePlay()
            };
            y.isBeforeComplete = function () {
                return i.jwIsBeforeComplete()
            };

            function v(I, K, J) {
                var G = [];
                if (!K) {
                    K = 0
                }
                if (!J) {
                    J = I.length - 1
                }
                for (var H = K; H <= J; H++) {
                    G.push(I[H])
                }
                return G
            }
            return y
        };
        f.selectPlayer = function (i) {
            var h;
            if (!a.exists(i)) {
                i = 0
            }
            if (i.nodeType) {
                h = i
            } else {
                if (typeof i == "string") {
                    h = g.getElementById(i)
                }
            } if (h) {
                var j = f.playerById(h.id);
                if (j) {
                    return j
                } else {
                    return f.addPlayer(new f(h))
                }
            } else {
                if (typeof i == "number") {
                    return c[i]
                }
            }
            return null
        };
        f.playerById = function (i) {
            for (var h = 0; h < c.length; h++) {
                if (c[h].id == i) {
                    return c[h]
                }
            }
            return null
        };
        f.addPlayer = function (h) {
            for (var i = 0; i < c.length; i++) {
                if (c[i] == h) {
                    return h
                }
            }
            c.push(h);
            return h
        };
        f.destroyPlayer = function (j) {
            var i = -1,
                k;
            for (var m = 0; m < c.length; m++) {
                if (c[m].id == j) {
                    i = m;
                    k = c[m];
                    continue
                }
            }
            if (i >= 0) {
                var n = k.id,
                    h = g.getElementById(n + (k.renderingMode == "flash" ? "_wrapper" : ""));
                if (a.clearCss) {
                    a.clearCss("#" + n)
                }
                if (h) {
                    if (k.renderingMode == "html5") {
                        k.destroyPlayer()
                    }
                    var l = g.createElement("div");
                    l.id = n;
                    h.parentNode.replaceChild(l, h)
                }
                c.splice(i, 1)
            }
            return null
        };
        d.playerReady = function (i) {
            var h = d.api.playerById(i.id);
            if (h) {
                h.playerReady(i)
            } else {
                d.api.selectPlayer(i.id).playerReady(i)
            }
        }
    })(jwplayer);
    (function (c) {
        var d = c.events,
            a = c.utils,
            b = d.state;
        c.api.instream = function (g, m, q, u) {
            var l = g,
                e = m,
                k = q,
                n = u,
                i = {}, t = {}, f = this;

            function j() {
                l.callInternal("jwLoadInstream", q, u ? u : {})
            }

            function p(v, w) {
                e.jwInstreamAddEventListener(w, 'function(dat) { jwplayer("' + l.id + '").dispatchInstreamEvent("' + w + '", dat); }')
            }

            function h(v, w) {
                if (!i[v]) {
                    i[v] = [];
                    p(e, v)
                }
                i[v].push(w);
                return this
            }

            function r(v, w) {
                if (!t[v]) {
                    t[v] = [];
                    h(d.JWPLAYER_PLAYER_STATE, o(v))
                }
                t[v].push(w);
                return this
            }

            function o(v) {
                return function (x) {
                    var w = x.newstate,
                        z = x.oldstate;
                    if (w == v) {
                        var y = t[w];
                        if (y) {
                            for (var A = 0; A < y.length; A++) {
                                if (typeof y[A] == "function") {
                                    y[A].call(this, {
                                        oldstate: z,
                                        newstate: w,
                                        type: x.type
                                    })
                                }
                            }
                        }
                    }
                }
            }
            f.dispatchEvent = function (y, x) {
                if (i[y]) {
                    var w = a.translateEventResponse(y, x[1]);
                    for (var v = 0; v < i[y].length; v++) {
                        if (typeof i[y][v] == "function") {
                            i[y][v].call(this, w)
                        }
                    }
                }
            };
            f.onError = function (v) {
                return h(d.JWPLAYER_ERROR, v)
            };
            f.onFullscreen = function (v) {
                return h(d.JWPLAYER_FULLSCREEN, v)
            };
            f.onMeta = function (v) {
                return h(d.JWPLAYER_MEDIA_META, v)
            };
            f.onMute = function (v) {
                return h(d.JWPLAYER_MEDIA_MUTE, v)
            };
            f.onComplete = function (v) {
                return h(d.JWPLAYER_MEDIA_COMPLETE, v)
            };
            f.onTime = function (v) {
                return h(d.JWPLAYER_MEDIA_TIME, v)
            };
            f.onBuffer = function (v) {
                return r(b.BUFFERING, v)
            };
            f.onPause = function (v) {
                return r(b.PAUSED, v)
            };
            f.onPlay = function (v) {
                return r(b.PLAYING, v)
            };
            f.onIdle = function (v) {
                return r(b.IDLE, v)
            };
            f.onClick = function (v) {
                return h(d.JWPLAYER_INSTREAM_CLICK, v)
            };
            f.onInstreamDestroyed = function (v) {
                return h(d.JWPLAYER_INSTREAM_DESTROYED, v)
            };
            f.play = function (v) {
                e.jwInstreamPlay(v)
            };
            f.pause = function (v) {
                e.jwInstreamPause(v)
            };
            f.destroy = function () {
                e.jwInstreamDestroy()
            };
            j()
        }
    })(jwplayer)
};