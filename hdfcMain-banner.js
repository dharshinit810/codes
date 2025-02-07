var totalProducts,
  imageKeys = ["1600x280", "360x200"],
  displayItems = {
    enableBanner: function () {
      try {
        window.data &&
          window.data.products &&
          window.data.products.length &&
          ((totalProducts = window.data.products.length),
          displayItems.displayBannerItems(window.data.products));
      } catch (t) {
        console.log("Error while creating banner", t);
      }
    },
    displayBannerItems: function (t) {
      var e, n, a, i, o, s, r, d, c, m;
      for (
        e = displayItems.generateElements(
          "div",
          "banner-container",
          document.body,
          "bannerContainer"
        ),
          a = displayItems.generateElements(
            "div",
            "product-container",
            e,
            "productContainer"
          ),
          i = 0;
        i < totalProducts;
        i++
      ) {
        if (
          ((d = displayItems.generateElements(
            "a",
            "product",
            a,
            "product-" + i
          )),
          (s = displayItems.generateElements(
            "div",
            "banner-image-container",
            d,
            ""
          )),
          (r = displayItems.generateElements(
            "img",
            "banner-image",
            s,
            "productImage-" + i
          )),
          t[i].images)
        ) {
          for (o = 0; o < imageKeys.length; o++)
            t[i].images[imageKeys[o]] &&
            "string" == typeof t[i].images[imageKeys[o]]
              ? r.setAttribute(
                  "image-" + imageKeys[o],
                  t[i].images[imageKeys[o]]
                )
              : r.setAttribute("image-" + imageKeys[o], "");
          (r.onload = function () {
            var t;
            (t = this.id.match(/(\d+)/)[0]), displayItems.displayContent(t);
          }),
            displayItems.updateImage(r);
        }
        if (
          t[i] &&
          ((n = displayItems.generateElements(
            "div",
            "content-holder ",
            d,
            "productDetailContainer-" + i
          )),
          t[i].title &&
            (displayItems.generateElements("div", "title", n, "").innerHTML =
              t[i].title),
          window.data.products[i].message &&
            ((message1Div = displayItems.generateElements(
              "div",
              "message",
              n,
              ""
            )),
            (message1Div.innerHTML = window.data.products[i].message)),
          t[i].ctaButtons &&
            (c = displayItems.generateElements(
              "div",
              "banner-button-container",
              n,
              "ctaButtonContainer"
            )),
          t[i].ctaButtons)
        )
          for (var u = 0; u < t[i].ctaButtons.length; u++)
            "b" === t[i].ctaButtons[u].ctaType &&
              ((m = displayItems.generateElements(
                "a",
                "banner-button",
                c,
                "ctaButton-" + u
              )),
              t[i].ctaButtons[u].backgroundColor &&
                (m.style.background = t[i].ctaButtons[u].backgroundColor),
              t[i].ctaButtons[u].borderColor &&
                (m.style.border =
                  "1px solid " + t[i].ctaButtons[u].borderColor),
              t[i].ctaButtons[u].ctaText &&
                (m.innerHTML = t[i].ctaButtons[u].ctaText)),
              "b" === t[i].ctaButtons[u].ctaType
                ? (t[i].ctaButtons[u].lp &&
                    ((m.href = t[i].ctaButtons[u].lp), (m.target = "_blank")),
                  t[i].productCk &&
                    ((m.productCk = t[i].productCk),
                    (m.onclick = function (t) {
                      t.stopPropagation(), displayItems.fireImagePixels(this);
                    })))
                : "i" === t[i].ctaButtons[u].ctaType &&
                  ((d.href = window.data.products[i].ctaButtons[u].lp),
                  (d.target = "_blank"),
                  window.data.products[i].productCk &&
                    ((d.productCk = window.data.products[i].productCk),
                    (d.onclick = function (t) {
                      t.stopPropagation(), displayItems.fireImagePixels(this);
                    })));
      }
    },
    displayContent: function (t) {
      var e;
      (e = document.getElementById("productDetailContainer-" + t)) &&
        (e.style.opacity = 1);
    },
    fireImagePixels: function (t) {
      new Image(1, 1).src = t.productCk + "&lp=" + encodeURIComponent(t.href);
    },
    getIframeDimensions: function () {
      var t,
        e = parent.document.documentElement.clientWidth,
        n = {
          width: e,
          height: "",
        };
      return (
        (t = e > 767 ? 5.71 : 1.8),
        (n.width = e),
        (n.height = (n.width / t).toFixed(2)),
        n
      );
    },
    updateImage: function (t) {
      var e, n;
      (n =
        (e = parent.document.documentElement.clientWidth) /
        (e > 767 ? 5.71 : 1.8)),
        (t.src =
          e <= 767
            ? t.getAttribute("image-360x200")
            : t.getAttribute("image-1600x280")),
        t.setAttribute("width", e + "px"),
        t.setAttribute("height", n + "px");
    },
    generateElements: function (t, e, n, a) {
      var i = document.createElement(t);
      return (
        "" !== a && (i.id = a),
        "" !== e && (i.className = e),
        n.appendChild(i),
        i
      );
    },
  };
!(function () {
  try {
    (window.onload = function () {
      displayItems.enableBanner();
    }),
      window.addEventListener("orientationchange", function () {
        try {
          displayItems.updateImage(document.getElementById("productImage-0"));
        } catch (t) {}
      }),
      window.addEventListener("resize", function () {
        try {
          (displayItems.isBannerHovered = !0),
            displayItems.updateImage(document.getElementById("productImage-0")),
            clearTimeout(displayItems.resizeTimeout),
            (displayItems.resizeTimeout = setTimeout(function () {
              displayItems.isBannerHovered = !1;
            }, 1e3));
        } catch (t) {}
      });
  } catch (t) {}
})();
