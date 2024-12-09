function getUserAgent() {
  var e = navigator.userAgent;
  return /ipad/i.test(e)
    ? "MOBILE"
    : /android|Tablet/gi.test(e) && !/mobile/i.test(e)
    ? "MOBILE"
    : /mqqbrowser|tencenttraveler|baidubrowser|criOS|ucbrowser|mobile|CrMo/gi.test(
        e
      ) ||
      (/opera|opr/gi.test(e) && /mobi|mini/gi.test(e))
    ? "MOBILE"
    : "DESKTOP";
}
!(function () {
  try {
    var e = document.createElement("script");
    (e.type = "text/javascript"),
      (e.async = !0),
      lmSMTObj
        ? (e.src = "//cdn12.lemnisk.co/smt/smthandler.php?account_id=6038")
        : (e.src = "//cdn12.lemnisk.co/smt/smthandler.php?account_id=6038_v0");
    var t = document.createElement("script");
    (t.type = "text/javascript"),
      (t.async = !0),
      (t.src = "//cdn25.lemnisk.co/ssp/MEA_ADCB_DMP/sw/sw_registration.js");
    var n = document.createElement("script");
    (n.type = "text/javascript"),
      (n.async = !0),
      (n.src =
        "//cdn25.lemnisk.co/ssp/banners/images/common/images/bfsi/ads/ads.js");
    var i = document.createElement("link");
    (i.rel = "preconnect"),
      (i.crossOrigin = !0),
      (i.href = "//us-ax.lemnisk.co/bp");
    var o = document.createElement("link");
    (o.rel = "dns-prefetch"), (o.href = "//us-ax.lemnisk.co/bp");
    var r = document.getElementsByTagName("script")[0];
    r.parentNode.insertBefore(e, r),
      r.parentNode.insertBefore(t, r),
      r.parentNode.insertBefore(n, r),
      r.parentNode.insertBefore(i, r),
      r.parentNode.insertBefore(o, r),
      (e.onload = function () {
        try {
          pixel.parse();
        } catch (e) {}
      }),
      (e.onreadystatechange = function () {
        if ("complete" == e.readyState || "loaded" == e.readyState)
          try {
            pixel.parse();
          } catch (e) {}
      });
  } catch (t) {}
})(),
  (function (e) {
    var t = {
      bpconf: [
        {
          cid: "6038",
          suffixImpressionId: "BNP",
          defaultWidth: 1306,
          defaultHeight: 609,
          iframeUrl: "",
          locatorDivId: "bp_6038_DmpSlotId104",
          isDefault: !1,
          customXhttp: null,
          abl: "//cdn25.vzeesp.com/ssp/MEA_ADCB_DMP/bp/fallback_B_104.html",
          dl: "//cdn25.lemnisk.co/ssp/MEA_ADCB_DMP/bp/fallback_104.html",
          iid: null,
          divId: "bp_ifrm",
          iframeId: "bp_iframe",
          domain: "//us-ax.lemnisk.co/bp",
          slotId: "104",
          defaultRenderTimeout: 3e3,
          resizeTimer: null,
          resizeTimeout: 50,
        },
        {
          cid: "6038",
          suffixImpressionId: "BNP",
          defaultWidth: 1306,
          defaultHeight: 746,
          iframeUrl: "",
          locatorDivId: "bp_6038_DmpSlotId105",
          isDefault: !1,
          customXhttp: null,
          abl: "//cdn25.vzeesp.com/ssp/MEA_ADCB_DMP/bp/fallback_B_105.html",
          dl: "//cdn25.lemnisk.co/ssp/MEA_ADCB_DMP/bp/fallback_105.html",
          iid: null,
          divId: "bp_ifrm",
          iframeId: "bp_iframe",
          domain: "//us-ax.lemnisk.co/bp",
          slotId: "105",
          defaultRenderTimeout: 3e3,
          resizeTimer: null,
          resizeTimeout: 50,
        },
      ],
      globalConfig: {
        suffixImpressionId: "BNP",
        activeBp: [],
        missingDivs: [],
        intervalId: null,
      },
      getiid: function (e) {
        var n,
          i,
          o,
          r = function (e, t) {
            for (var n = parseInt(new Date().getTime(), 16); e.length < t; )
              e += Math.floor(Math.random() * n).toString(16);
            return (e = e.slice(e.length - t));
          };
        return (
          (n = parseInt(new Date().getTime() / 1e3, 10).toString(16)),
          (i = parseInt(new Date().getTime() / 1e3, 16)),
          (o = Math.floor(Math.random() * i).toString(16)),
          (n = r(n, 8)),
          (o = r(o, 15)),
          t.bpconf[e].cid + n + o + t.globalConfig.suffixImpressionId
        );
      },
      attachWindowEventListeners: function () {
        for (
          var n = [
              { event: "resize", handler: t.handleOnResizeEvent },
              { event: "orientationchange", handler: t.handleOnResizeEvent },
            ],
            i = 0;
          i < n.length;
          i++
        )
          e.addEventListener(n[i].event, n[i].handler, !1);
      },
      handleOnResizeEvent: function () {
        t.globalConfig.activeBp.forEach(function (e, n) {
          var i,
            o = t.bpconf[e],
            r = document.getElementById(o.iframeId);
          r &&
          r.contentWindow &&
          r.contentWindow.displayItems &&
          r.contentWindow.displayItems.getIframeDimensions
            ? ((i = r.contentWindow.displayItems.getIframeDimensions(
                document.body.clientWidth
              )),
              r.setAttribute("width", i.width),
              r.setAttribute("height", i.height))
            : (o.resizeTimer = setTimeout(function () {
                t.handleOnResizeEvent();
              }, o.resizeTimeout));
        });
      },
      firstPartyCookie: function (e) {
        var t;
        if (!e) return "";
        for (var n in (t = document.cookie.split(";")))
          if (t.hasOwnProperty(n)) {
            var i = t[n].match(/\s*(.*)=(.*)/);
            if (i && i[1] === e && i[2]) return i[2];
          }
        return "";
      },
      constructIframeUrl: function (n) {
        var i = t.bpconf[n];
        (i.isDefault = !1),
          (i.iframeUrl =
            i.domain +
            "?sid=" +
            i.slotId +
            "&force_adv_id=VIZVRM" +
            i.cid +
            "&rid=" +
            i.iid +
            "&sfpc=" +
            t.firstPartyCookie("_vz") +
            "&loc=" +
            encodeURIComponent(e.location) +
            "&rfr=" +
            encodeURIComponent(document.referrer) +
            t.isFirstTime() +
            t.getUTMparams());
      },
      isFirstTime: function () {
        return t.firstPartyCookie("_vz") ? "" : "&ftu=1";
      },
      getUTMparams: function () {
        for (
          var e,
            t = new RegExp("(?:\\?|&)(utm_[^=]+)=(.*?)(?=&|$)", "gi"),
            n = {};
          null != (e = t.exec(document.URL));

        )
          n[e[1]] = e[2];
        return Object.keys(n).length > 0
          ? "&data=" + encodeURIComponent(JSON.stringify(n))
          : "";
      },
      renderIframeContainer: function (e) {
        var n,
          i,
          o = t.bpconf[e];
        return (
          (n = document.createElement("div")).setAttribute("id", o.divId),
          n.setAttribute("overflow", "hidden"),
          n.setAttribute("lineHeight", 0),
          n.setAttribute("margin", 0),
          n.setAttribute("padding", 0),
          null == (i = document.getElementById(o.locatorDivId))
            ? null
            : (i.appendChild(n), n)
        );
      },
      renderIframe: function (e, n) {
        var i,
          o,
          r = t.bpconf[n];
        (i = document.getElementById(r.iframeId)) ||
          ((i = document.createElement("iframe")).setAttribute(
            "id",
            r.iframeId
          ),
          i.setAttribute("width", r.defaultWidth),
          i.setAttribute("height", r.defaultHeight),
          i.setAttribute("scrolling", "no"),
          i.setAttribute("marginwidth", "0"),
          i.setAttribute("marginheight", "0"),
          i.setAttribute("frameborder", "0"),
          i.setAttribute("style", "display:block;"),
          null != (o = document.getElementById(r.divId)) && o.appendChild(i)),
          i.contentWindow.document.write(e.responseText),
          i.contentWindow.document.close(),
          (r.resizeTimer = setTimeout(function () {
            t.handleOnResizeEvent();
          }, r.resizeTimeout));
      },
      renderBanner: function (e) {
        var n = t.bpconf[e];
        (n.iid = t.getiid(e)),
          (n.divId += n.iid),
          (n.iframeId += n.iid),
          t.constructIframeUrl(e),
          t.renderIframeContainer(e);
        var i = n.iframeUrl;
        n.customXhttp = t.ajaxRequest(i, !1, e);
      },
      customBanner: function (e) {
        t.renderIframe(t.bpconf[e].customXhttp, e);
      },
      defaultBanner: function (e) {
        var n = t.bpconf[e];
        if (!document.getElementById(n.iframeId) && !n.isDefault) {
          n.isDefault = !0;
          t.isAdBlockEnabled();
          var i = location.protocol + (t.isAdBlockEnabled() ? n.abl : n.dl);
          n.customXhttp = t.ajaxRequest(i, !0, e);
        }
      },
      isAdBlockEnabled: function () {
        return !document.getElementById("tSrngBEkWlDy");
      },
      checkIfBpPresent: function () {
        t.bpconf.forEach(function (e, n) {
          document.getElementById(e.locatorDivId)
            ? (t.globalConfig.activeBp.push(n), t.renderBanner(n))
            : t.globalConfig.missingDivs.push(n);
        }),
          e.addEventListener("load", t.handleMissingDivs),
          (t.globalConfig.intervalId = setInterval(t.handleMissingDivs, 500)),
          t.attachWindowEventListeners(),
          setTimeout(function () {
            clearInterval(t.globalConfig.intervalId);
          }, 2500);
      },
      handleMissingDivs: function () {
        var e = [];
        if (
          (t.globalConfig.missingDivs.forEach(function (n, i) {
            document.getElementById(t.bpconf[n].locatorDivId) &&
              (e.push(i), t.globalConfig.activeBp.push(n), t.renderBanner(n));
          }),
          e.length > 0)
        )
          for (var n = e.length - 1; n >= 0; n--)
            t.globalConfig.missingDivs.splice(e[n], 1);
      },
      onloadCheckBp: function () {
        t.handleMissingDivs();
      },
      ajaxRequest: function (n, i, o) {
        var r;
        if (e.XDomainRequest)
          (r = new XDomainRequest())
            ? ((r.onerror = function () {
                t.defaultBanner(o);
              }),
              (r.ontimeout = function () {
                t.defaultBanner(o);
              }),
              (r.onload = function () {
                t.customBanner(o);
              }),
              (r.timeout = t.bpconf[o].defaultRenderTimeout),
              r.open("get", n),
              r.send())
            : i || t.defaultBanner(o);
        else {
          r = new XMLHttpRequest();
          try {
            i || (r.withCredentials = !0);
          } catch (e) {}
          r.onreadystatechange = function () {
            4 == r.readyState &&
              (200 == r.status && this.responseText
                ? (clearTimeout(a), t.customBanner(o))
                : i || t.defaultBanner(o));
          };
          var a = setTimeout(function () {
            i || t.defaultBanner(o);
          }, t.bpconf[o].defaultRenderTimeout);
          r.open("GET", n, !0), r.send();
        }
        return r;
      },
    };
    t.checkIfBpPresent();
  })(window),
  Function.prototype.bind ||
    (Function.prototype.bind = function (e) {
      if ("function" != typeof this)
        throw new TypeError(
          "Function.prototype.bind - what is trying to be bound is not callable"
        );
      var t = Array.prototype.slice.call(arguments, 1),
        n = this,
        i = function () {},
        o = function () {
          return n.apply(
            this instanceof i && e ? this : e,
            t.concat(Array.prototype.slice.call(arguments))
          );
        };
      return (i.prototype = this.prototype), (o.prototype = new i()), o;
    });
var nbConf = null;
nbConf = {
  url:
    ("https:" == location.protocol ? "https:" : "http:") +
    "//cdn25.lemnisk.co/ssp/nb/MEA_ADCB_DMP/adcb-notbot.html",
  advId: 6038,
  trigger: "hover",
  Mtrigger: "click",
  parentId: "vzNotifyDropdown_desktop",
  toggleId: "vzNotifications_desktop",
  container: "notificationContainer_desktop",
  MparentId: "vzNotifyDropdown_mobile",
  MtoggleId: "vzNotifications_mobile",
  Mcontainer: "notificationContainer_mobile",
  domain: "adcb.com/",
};
function NB() {
  (this.parentElm = document.getElementById(nbConf.parentId)),
    (this.containerElm = document.getElementById(nbConf.container)),
    (this.toggleElm = document.getElementById(nbConf.toggleId)),
    (this.MparentElm = document.getElementById(nbConf.MparentId)),
    (this.McontainerElm = document.getElementById(nbConf.Mcontainer)),
    (this.MtoggleElm = document.getElementById(nbConf.MtoggleId)),
    (this.trigger = nbConf.trigger),
    (this.Mtrigger = nbConf.Mtrigger),
    (this.advId = nbConf.advId),
    (this.domain = nbConf.domain),
    (this.intervalId = null),
    (this.nbFound = !1);
}
(NB.prototype.ajax = function (e, t) {
  var n;
  if (window.XDomainRequest) {
    if (!(n = new XDomainRequest())) return !1;
    (n.onload = function () {
      return t(n, !0);
    }),
      n.open("get", e),
      n.send();
  } else {
    if (!(n = new XMLHttpRequest())) return !1;
    (n.onreadystatechange = function () {
      return t(n);
    }),
      n.open("GET", e),
      n.send();
  }
}),
  (NB.prototype.getCookie = function (e) {
    var t = new RegExp("(?:^" + e + "|;\\s*" + e + ")=(.*?)(?:;|$)", "g").exec(
      document.cookie
    );
    return null === t ? null : t[1];
  }),
  (NB.prototype.renderResponse = function (e, t) {
    t
      ? this.renderHTML(e)
      : e.readyState === XMLHttpRequest.DONE &&
        (200 === e.status
          ? this.renderHTML(e)
          : console.log("There was a problem with the request."));
  }),
  (NB.prototype.renderHTML = function (e) {
    var t = document.getElementById("vzAjax");
    t.innerHTML = e.responseText;
    var n = t.getElementsByTagName("script");
    n.length && this.DOMEval(n, 0);
  }),
  (NB.prototype.connect = function () {
    this.ajax(nbConf.url, this.renderResponse.bind(this));
  }),
  (NB.prototype.DOMEval = function (e, t) {
    var n = document.createElement("script");
    e[t].src ? (n.src = e[t].src) : (n.innerHTML = e[t].innerHTML),
      e[t].appendChild(n),
      e[t].src
        ? ((n.onload = this.loading_complete.bind(this, e, t, n)),
          (n.onerror = this.loading_complete.bind(this, e, t, n)))
        : this.loading_complete(e, t, n);
  }),
  (NB.prototype.checkIfNbPresent = function () {
    document.addEventListener("load", this.checkIfDivPresent.bind(this)),
      (this.intervalId = setInterval(this.checkIfDivPresent.bind(this), 100)),
      setTimeout(
        function () {
          clearInterval(this.intervalId);
        }.bind(this),
        1e4
      );
  }),
  (NB.prototype.checkIfDivPresent = function () {
    0 == this.nbFound &&
      null != document.getElementById("vzAjax") &&
      ((this.nbFound = !0), clearInterval(this.intervalId), this.connect());
  }),
  (NB.prototype.loading_complete = function (e, t, n) {
    try {
      e &&
        "number" == typeof t &&
        (e[t] && n && e[t].removeChild(n), e[t + 1] && this.DOMEval(e, t + 1));
    } catch (e) {}
  });
var $notify = new NB();
$notify.checkIfNbPresent();
