// uuidv4
!(function (t, e) {
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = e())
      : "function" == typeof define && define.amd
      ? define(e)
      : ((t = t || self).uuidv4 = e());
  })(this, function () {
    "use strict";
    var t =
        ("undefined" != typeof crypto &&
          crypto.getRandomValues &&
          crypto.getRandomValues.bind(crypto)) ||
        ("undefined" != typeof msCrypto &&
          "function" == typeof msCrypto.getRandomValues &&
          msCrypto.getRandomValues.bind(msCrypto)),
      e = new Uint8Array(16);
  
    function n() {
      if (!t)
        throw new Error(
          "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
        );
      return t(e);
    }
    for (var o = [], r = 0; r < 256; ++r)
      o.push((r + 256).toString(16).substr(1));
    return function (t, e, r) {
      "string" == typeof t &&
        ((e = "binary" === t ? new Uint8Array(16) : null), (t = null));
      var u = (t = t || {}).random || (t.rng || n)();
      if (((u[6] = (15 & u[6]) | 64), (u[8] = (63 & u[8]) | 128), e)) {
        for (var i = r || 0, d = 0; d < 16; ++d) e[i + d] = u[d];
        return e;
      }
      return (function (t, e) {
        var n = e || 0,
          r = o;
        return (
          r[t[n + 0]] +
          r[t[n + 1]] +
          r[t[n + 2]] +
          r[t[n + 3]] +
          "-" +
          r[t[n + 4]] +
          r[t[n + 5]] +
          "-" +
          r[t[n + 6]] +
          r[t[n + 7]] +
          "-" +
          r[t[n + 8]] +
          r[t[n + 9]] +
          "-" +
          r[t[n + 10]] +
          r[t[n + 11]] +
          r[t[n + 12]] +
          r[t[n + 13]] +
          r[t[n + 14]] +
          r[t[n + 15]]
        ).toLowerCase();
      })(u);
    };
  });
  (function (window) {
    // Store the command queue in the cq variable
    window.lmSMTObj = window.lmSMTObj || [];
  
    lmSMTObj.jsonData = {};
    lmSMTObj.cookieDomain = "aia.com.my";
    lmSMTObj.domainList = ["aia.com.my"];
    lmSMTObj.clickTrackers = null;
    lmSMTObj.initialize = null;
    lmSMTObj.finalize = null;
    lmSMTObj.pixelFireStatus = false;
    lmSMTObj.onsiteEndpoint = "us-ax.lemnisk.co/";
    lmSMTObj.smartTagversion = "0.01v";
    lmSMTObj.libraryName = "javascript";
    lmSMTObj.callbackFunction = null;
    lmSMTObj.writeKey =
      lmSMTObj.writeKey || null; /*has to be initialised on init func*/
      lmSMTObj.vizNotifObject = false;
    lmSMTObj.resetFields = function () {
      lmSMTObj.jsonData = {};
      lmSMTObj.pixelFireStatus = false;
      lmSMTObj.callbackFunction = null;
    };
    lmSMTObj.parse = function (arg) {
      try {
        if (arg) {
          lmSMTObj.resetFields();
          lmSMTObj.argType = arg;
        }
        if (!lmSMTObj.pixelFireStatus) {
          try {
            lmSMTObj.fireAnalyze();
          } catch (error) {
            lmSMTObj.jsonData["err"] = error;
            lmSMTObj.fireAnalyze();
          }
        }
      } catch (error) {
        lmSMTObj.jsonData["err"] = error;
        lmSMTObj.fireAnalyze();
      }
    };
    lmSMTObj.getUTMparams = function () {
      var d = new RegExp("(?:\\?|&)(utm_[^=]+)=(.*?)(?=&|$)", "gi");
      var f = {},
        e;
      while ((e = d.exec(document.URL)) != null) {
        f[e[1]] = e[2];
      }
      if (Object.keys(f).length > 0) {
        return f;
      } else {
        return;
      }
    };
  
    lmSMTObj.getEventParams = function (eventPropsParams) {
      if (typeof eventPropsParams == "object" || eventPropsParams == null) {
        if(eventPropsParams == null) {eventPropsParams = {}}
        
        /**For Page Method */
        lmSMTObj.jsonData.properties = {};
        /** for properties other than page related */
        for (var key in eventPropsParams) {
          if (eventPropsParams.hasOwnProperty(key)) {
            lmSMTObj.jsonData.properties[key] = eventPropsParams[key];
          }
        }
        console.log(this.jsonData.properties)

        lmSMTObj.jsonData.properties.path = eventPropsParams.path ? eventPropsParams.path : location.pathname;
        if (eventPropsParams.referrer || document.referrer) { 
          lmSMTObj.jsonData.properties.referrer = eventPropsParams.referrer ? eventPropsParams.referrer: document.referrer;
        }
        if (eventPropsParams.search || location.search) {
          lmSMTObj.jsonData.properties.search = eventPropsParams.search ? eventPropsParams.search : location.search;
        }
        lmSMTObj.jsonData.properties.title = eventPropsParams.title ? eventPropsParams.title : document.title;
        lmSMTObj.jsonData.properties.url = eventPropsParams.url ? eventPropsParams.url : document.URL;
      } else {
        /**For Track and Identify Method */
        lmSMTObj.jsonData.context.page = {};
        lmSMTObj.jsonData.context.page.path = location.pathname;
        if (document.referrer) {
          lmSMTObj.jsonData.context.page.referrer = document.referrer;
        }
        if (location.search) {
          lmSMTObj.jsonData.context.page.search = location.search;
        }
        lmSMTObj.jsonData.context.page.title = document.title;
        lmSMTObj.jsonData.context.page.url = document.URL;
      }
      console.log(this.jsonData.properties)
      console.log(this.jsonData.context)
    };
    lmSMTObj.getAMCVCookie = function (){
      try {
        var regex = /AMCV_([^;]+)/;
        var AMCVCookie = document.cookie.match(regex);
        AMCVCookie = AMCVCookie ? AMCVCookie[1] : null;
        if(AMCVCookie && AMCVCookie !== null){
          var AMCVCookieValue = AMCVCookie.split('=')[1];
          AMCVCookieValue = decodeURIComponent(AMCVCookieValue);
          regex = /MCMID\|([^|]+)/;
          var AMCVkey = AMCVCookieValue.match(regex);
          var mcmid = AMCVkey ? AMCVkey[1] : null;
          if(mcmid && mcmid !== null){
            return mcmid;
          }
        } 
      } catch (error) {
        return "";
      } 
    }
    lmSMTObj.getCommonParams = function (ids) {
      if (lmSMTObj.getCookie("userId")) {
        var userId = lmSMTObj.getCookie("userId");
      }
      if (lmSMTObj.getCookie("_ga")) {
        var _ga = lmSMTObj.getCookie("_ga");
      }
      if (lmSMTObj.getCookie("_fbc")) {
        var _fbc = lmSMTObj.getCookie("_fbc");
      }
      if (lmSMTObj.getCookie("_fbp")) {
        var _fbp = lmSMTObj.getCookie("_fbp");
      }
      if(lmSMTObj.getAMCVCookie()){
        var mcmid = lmSMTObj.getAMCVCookie();
      }
      lmSMTObj.initialize();
      lmSMTObj.jsonData["id"] = lmSMTObj.getCookie("_vz");
      // if (lmSMTObj.jsonData.type != "identify")
      lmSMTObj.jsonData["userId"] = userId;
  
      lmSMTObj.jsonData["originalTimestamp"] = new Date().getTime(); //timestamp or originaltimestamp??
      lmSMTObj.jsonData["messageId"] = uuidv4();
      lmSMTObj.jsonData["writeKey"] = lmSMTObj.writeKey;
  
      lmSMTObj.jsonData["otherIds"] = {
        _ga: _ga,
        _fbc: _fbc,
        _fbp: _fbp,
        mcmid: mcmid,
      };
  
      if (typeof ids === "object") {
        for (var key in ids) {
          if (ids.hasOwnProperty(key)) {
            lmSMTObj.jsonData.otherIds[key] = ids[key];
          }
        }
      }
  
      lmSMTObj.jsonData["context"] = {
        library: {
          name: lmSMTObj.libraryName,
          version: lmSMTObj.version,
        },
        userAgent: {
          deviceType: lmSMTObj.getDevice(),
          osType: lmSMTObj.getOS(),
          osVersion: lmSMTObj.getOsVersion(),
          browser: lmSMTObj.checkBrowser(),
          ua: navigator.userAgent,
        },
        utm: lmSMTObj.getUTMparams(),
      };
    };
  
    lmSMTObj.init = function (writeKey) {
      lmSMTObj.writeKey = writeKey;
      lmSMTObj.initialize();
    };

    lmSMTObj.getCustomerProperties = function(properties){
        if (typeof properties === "object") {
            const regex = /^(?:\+91|91)?([7896]\d{9})$/;
            let match;
            for (var key in properties) {
              if (properties.hasOwnProperty(key)) {
                match = properties[key].match(regex)
                if(match){
                    lmSMTObj.jsonData.customerProperties[key] = '+91' + match[1];
                }
                else{
                    lmSMTObj.jsonData.customerProperties[key] = properties[key];
                }
              }
            }
          }
    }

    lmSMTObj.identify = function (userId, properties, otherIds, callBack) {
    try {
      lmSMTObj.resetFields();
      lmSMTObj.jsonData.customerProperties = {};
      lmSMTObj.jsonData.type = "identify";
  
      if (typeof otherIds === "function")
        (callBack = otherIds), (otherIds = null);
      if (typeof properties === "function")
        (callBack = properties), (otherIds = properties = null);
      if (typeof userId === "function")
        (callBack = userId), (otherIds = properties = userId = null);
      if (typeof userId === "object")
        (otherIds = properties), (properties = userId), (userId = null);
  
      if (userId) {
        lmSMTObj.jsonData.userId = userId;
        lmSMTObj.setCookie("userId", userId, 365, lmSMTObj.cookieDomain);
      }
      lmSMTObj.getCommonParams(otherIds);
      lmSMTObj.getEventParams("identify");
      lmSMTObj.getCustomerProperties(properties);
  
      if (callBack && typeof callBack != "function") {
        throw new TypeError("argument passed to callback is not valid type");
      }
      lmSMTObj.parse();
      if (callBack) setTimeout(callBack, 500);
    } catch (error) {
      console.log(error);
    }
    };
    lmSMTObj.track = function (eventName, properties, otherIds, callBack) {
    try {
      lmSMTObj.resetFields();
      lmSMTObj.jsonData.properties = {};
      lmSMTObj.jsonData.type = "track";
  
      if (eventName && typeof eventName === "string") {
        lmSMTObj.jsonData.event = eventName;
      } else {
        throw new TypeError("First argument has to be string");
      }
      if (typeof otherIds === "function")
        (callBack = otherIds), (otherIds = null);
      if (typeof properties === "function")
        (callBack = properties), (otherIds = null), (properties = null);
  
      // if(otherIds)
      lmSMTObj.getCommonParams(otherIds);
      lmSMTObj.getEventParams("track");
  
      for (var key in properties) {
        if (properties.hasOwnProperty(key)) {
          lmSMTObj.jsonData.properties[key] = properties[key];
        }
      }
      lmSMTObj.parse();
      if (callBack) setTimeout(callBack, 500);
    } catch (error) {
      console.log(error);
    }
    };
    lmSMTObj.page = function (pageName, properties, otherIds, callBack) {
    try{
      lmSMTObj.resetFields();
      console.log("Before assigning")
      console.log(pageName)
      console.log(properties)
      console.log(otherIds)
      console.log(callBack)
  
      if (typeof otherIds === "function")
        (callBack = otherIds), (otherIds = null);
      if (typeof properties === "function")
        (callBack = properties), (otherIds = properties = null);
      if (typeof pageName === "function")
        (callBack = pageName), (otherIds = properties = pageName = null);
      if (typeof pageName === "object")
        (otherIds = properties), (properties = pageName), (pageName = null);

      console.log("After assigning")
      console.log(pageName)
      console.log(properties)
      console.log(otherIds)
      console.log(callBack)
  
      lmSMTObj.jsonData.type = "page";
      if (pageName) {
        lmSMTObj.jsonData.name = pageName;
      }
  
      lmSMTObj.getCommonParams(otherIds);
      lmSMTObj.getEventParams(properties);
      lmSMTObj.parse();
      if (callBack) setTimeout(callBack, 500);
    } catch (error) {
      console.log(error);
    } 
    };
  
    lmSMTObj.getDevice = function () {
      var userAgent = navigator.userAgent;
      if (/ipad/i.test(userAgent)) {
        return "IPAD_TAB_MOBILE";
      } else if (
        /android|Tablet/gi.test(userAgent) &&
        !/mobile/i.test(userAgent)
      ) {
        return "TAB_MOBILE";
      } else if (
        /mqqbrowser|tencenttraveler|baidubrowser|criOS|ucbrowser|mobile|CrMo/gi.test(
          userAgent
        ) ||
        (/opera|opr/gi.test(userAgent) && /mobi|mini/gi.test(userAgent))
      ) {
        return "MOBILE";
      }
      return "DESKTOP";
    };
    lmSMTObj.getOS = function () {
      var userAgent = window.navigator.userAgent,
        platform = window.navigator.platform,
        macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
        windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
        iosPlatforms = ["iPhone", "iPad", "iPod"],
        os = null;
  
      if (macosPlatforms.indexOf(platform) !== -1) {
        os = "Mac OS";
      } else if (iosPlatforms.indexOf(platform) !== -1) {
        os = "iOS";
      } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = "Windows";
      } else if (/Android/.test(userAgent)) {
        os = "Android";
      } else if (!os && /Linux/.test(platform)) {
        os = "Linux";
      }
      return os;
    };
    lmSMTObj.getOsVersion = function () {
      var osVersion = null, pattern, match;
        
      if (window.navigator.userAgent.indexOf("Windows NT 10.0") !== -1)
        osVersion = "Windows 10";
      else if (window.navigator.userAgent.indexOf("Windows NT 6.2") !== -1)
        osVersion = "Windows 8";
      else if (window.navigator.userAgent.indexOf("Windows NT 6.1") !== -1)
        osVersion = "Windows 7";
      else if (window.navigator.userAgent.indexOf("Windows NT 6.0") !== -1)
        osVersion = "Windows Vista";
      else if (window.navigator.userAgent.indexOf("Windows NT 5.1") !== -1)
        osVersion = "Windows XP";
      else if (window.navigator.userAgent.indexOf("Windows NT 5.0") !== -1)
        osVersion = "Windows 2000";
      else if (window.navigator.userAgent.indexOf("Mac") !== -1) {
        pattern = /(iPhone OS|CPU OS|Mac OS X)\s+([\d_\.]+)/;
        match = pattern.exec(window.navigator.userAgent);
        if (match && match[2]) osVersion = match[1] + " " + match[2].replace(/_/g, '.');
      } else if (window.navigator.userAgent.indexOf("X11") !== -1)
        osVersion = "UNIX";
      else if (window.navigator.userAgent.indexOf("Linux") !== -1)
        osVersion = "Linux";
      else if (window.navigator.userAgent.indexOf("Android") !== -1) {
        pattern = /Android\s+([\d\.]+)/;
        match = pattern.exec(window.navigator.userAgent);
        if (match && match[1]) osVersion = "Android " + match[1];
      }
    
      return osVersion;
    };
    lmSMTObj.checkBrowser = function () {
      var userAgentString = navigator.userAgent;
      var safariAgent, chromeAgent, operaAgent;
  
      if (userAgentString.indexOf("Firefox") > -1) {
        browser = "Firefox";
      } else if (
        userAgentString.indexOf("MSIE") > -1 ||
        userAgentString.indexOf("rv:") > -1
      ) {
        browser = "Internet Explorer";
      } else if (userAgentString.indexOf("Edg") > -1) {
        browser = "Egde";
      } else if (userAgentString.indexOf("OP") > -1) {
        browser = "Opera";
        operaAgent = true;
      } else if (userAgentString.indexOf("Chrome") > -1) {
        chromeAgent = true;
        browser = "Chrome";
      } else if (userAgentString.indexOf("Safari") > -1) {
        browser = "Safari";
        safariAgent = true;
      }
      // Discard Safari since it also matches Chrome
      if (chromeAgent && safariAgent) {
        safariAgent = false;
        browser = "chrome";
      }
  
      // Discard Chrome since it also matches Opera
      if (chromeAgent && operaAgent) {
        chromeAgent = false;
        browser = "Opera";
      }
  
      return browser;
    };
  
    /*
     *  returns cookie value of the given cookie id
     */
    lmSMTObj.getCookie = function (cookieId) {
      var cookies = document.cookie;
      if (!cookieId) {
        return "";
      }
      var cookieArray = cookies.split(";");
      for (var key in cookieArray) {
        if (cookieArray.hasOwnProperty(key)) {
          var matchArray = cookieArray[key].match(/\s*(.*)=(.*)/);
          if (matchArray) {
            if (matchArray[1] === cookieId && matchArray[2]) {
              return matchArray[2];
            }
          }
        }
      }
      return "";
    };
  
    lmSMTObj.selectDomain = function () {
      console.log("cookie domain"+ lmSMTObj.cookieDomain)
      console.log("domain"+document.domain)
      if (
        lmSMTObj.cookieDomain &&
        ~document.domain.indexOf(lmSMTObj.cookieDomain) &&
        document.domain.indexOf(lmSMTObj.cookieDomain) +
          lmSMTObj.cookieDomain.length ===
          document.domain.length
      ) {
        return 1;
      } else {
        var listOfDomains = lmSMTObj.domainList;
        for (var i = 1; i < listOfDomains.length; i++) {
          if (
            document.domain.indexOf(listOfDomains[i]) +
              listOfDomains[i].length ===
            document.domain.length
          ) {
            lmSMTObj.cookieDomain = listOfDomains[i];
            return 0;
          }
        }
      }
      lmSMTObj.cookieDomain = document.domain;
      return -1;
    };
  
    lmSMTObj.fireAnalyze = function () {
      var baseUrl = "https://us-pl.lemnisk.co/analyze/analyze.php";
      var domain = lmSMTObj.cookieDomain;
      var fpcUrl =
        "https://us-pl.lemnisk.co/analyze/cookieCallback.php?cb=" + domain;
  
      if (!lmSMTObj.pixelFireStatus) {
        var analyzeUrl = baseUrl;
  
        if (window.XDomainRequest) {
          xhttp = new XDomainRequest();
  
          xhttp.onload = function () {
            lmSMTObj.callBackViz(fpcUrl);
          };
          xhttp.open("POST", analyzeUrl, true);
          xhttp.withCredentials = true;
          xhttp.send(JSON.stringify(lmSMTObj.jsonData));
        } else if (window.XMLHttpRequest) {
          var xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
              if (xhr.status === 200) {
                lmSMTObj.callBackViz(fpcUrl);
              }
            }
          };
          xhr.open("POST", analyzeUrl, true);
          xhr.withCredentials = true;
          xhr.send(JSON.stringify(lmSMTObj.jsonData));
        }
      }
    };
    // this is required as its used for OSN in getcontent url
    lmSMTObj.detectCampaign = function () {
      var curCamp = "VIZVRM6349";
      var url = document.URL;
      if (true) {
        curCamp = "VIZVRM6349";
      }
      return curCamp;
    };
    lmSMTObj.initialize = function () {
      if (lmSMTObj.selectDomain) lmSMTObj.selectDomain();
      lmSMTObj.clickTrackers = "";
      lmSMTObj.vizidCookie("_vz", lmSMTObj.cookieDomain);
    };
    lmSMTObj.OnsiteNotificationTag = function () {
      if (!lmSMTObj.vizNotifObject) {
        try {
            var viz = document.createElement("script");
            viz.type = "text/javascript";
            viz.async = true;
            viz.src = "https://cdn25.lemnisk.co/ssp/smtag/GetJsFileEventCapture.js";
            document.body.appendChild(viz);
            viz.onload = function() {
                try {
                    VizuryNotificationObject.createDivElement();
                    lmSMTObj.vizNotifObject = true;
                } catch (i) {}
            };
            viz.onreadystatechange = function() {
                if (viz.readyState == "complete" || viz.readyState == "loaded") {
                    try {
                        VizuryNotificationObject.createDivElement();
                        lmSMTObj.vizNotifObject = true;
                    } catch (i) {}
                }
            };
        } catch (i) {}
    } else {
        if (VizuryNotificationObject && typeof VizuryNotificationObject.createDivElementSinglePage === "function") {
            VizuryNotificationObject.createDivElementSinglePage();
        }
    }
    };
    lmSMTObj.callBackViz = function (url) {
      url = lmSMTObj.isSafari() ? url + "&sf=y" : url;
      var pTag = document.getElementsByTagName("script")[0];
      var scb = document.createElement("script");
      scb.type = "text/javascript";
      scb.src = url;
      scb.async = true;
      pTag.parentNode.insertBefore(scb, pTag);
      scb.onload = function () {
        try {
          lmSMTObj.OnsiteNotificationTag();
        } catch (i) {}
      };
      scb.onreadystatechange = function () {
        if (scb.readyState == "complete" || scb.readyState == "loaded") {
          try {
            lmSMTObj.OnsiteNotificationTag();
          } catch (i) {}
        }
      };
    };
    lmSMTObj.vizidCookie = function (ckName, valid_domain) {
      var vizIdCookieData = lmSMTObj.getCookie(ckName);
      if (!vizIdCookieData) {
        lmSMTObj.ftu = 1;
        vizIdCookieData = lmSMTObj.generateVizCookie();
        lmSMTObj.setCookie(ckName, vizIdCookieData, 365, valid_domain);
      }
      return vizIdCookieData;
    };
    lmSMTObj.generateVizCookie = function () {
      var prefix = lmSMTObj.isSafari() ? "vizSF_" : "viz_";
      var seed = 0x71314a;
      var time = parseInt(new Date().getTime() / 1000, 10).toString(16);
      var random = Math.floor(Math.random() * seed).toString(16);
      while (random.length < 5) {
        random = random + Math.floor(Math.random() * seed).toString(16);
      }
      random = random.slice(random.length - 5);
      var cookie = prefix + time + random;
      return cookie;
    };
    lmSMTObj.isSafari = function () {
      return (
        Object.prototype.toString
          .call(window.HTMLElement)
          .indexOf("Constructor") > 0 ||
        (function (p) {
          return p.toString() === "[object SafariRemoteNotification]";
        })(!window["safari"] || safari.pushNotification)
      );
    };
    lmSMTObj.setCookie = function (c_name, value, exdays, valid_domain) {
      var domain_string = valid_domain ? "; domain=" + valid_domain : "";
      if (exdays > 0) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value =
          encodeURIComponent(value) +
          (exdays == null ? "" : "; expires=" + exdate.toUTCString()) +
          "; path=/" +
          domain_string;
        document.cookie = c_name + "=" + c_value;
      } else {
        document.cookie = c_name + "=" + encodeURIComponent(value);
      }
    };
  
    executeCmd();
  
    function executeCmd() {
      while (lmSMTObj.length > 0) {
        console.log(lmSMTObj)
        var cmd = Array.prototype.slice.call(lmSMTObj.shift());
        console.log(cmd)
        window.lmSMTObj[cmd[0]].apply(this, cmd.slice(1));
      }
    }
    if (
      typeof lmSMTObj !== "undefined" &&
      lmSMTObj &&
      typeof lmSMTObj.parse !== "undefined"
    ) {
      lmSMTObj.pixelFireStatus = false;
    }
  })(window);
  