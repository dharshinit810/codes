var displayItems = {
    imageKeys: ["1600x400"],
    animationDelay: 5e3,
    isBannerHovered: !1,
    currentProduct: 0,
    feedLength: 0,
    enableBanner: function() {
        try {
            displayItems.displayAd()
        } catch (t) {
            "enabled" === window.lem_bp_dev && console.log("Banner Error:", t)
        }
    },
    displayAd: function() {
        window.data && window.data.products && window.data.products.length && (displayItems.feedLength = window.data.products.length,
        displayItems.displayBannerItems(window.data.products))
    },
    displayBannerItems: function(t) {
        var e, a, s, n, i, d, o, r, l;
        for (e = displayItems.generateElements("div", "banner-container", document.body, "bannerContainer"),
        displayItems.feedLength > 1 && (displayItems.createArrowButtonNavigation(e),
        displayItems.createPaginationNavigation(e)),
        s = displayItems.generateElements("div", "product-container", e, "productContainer"),
        a = 0; a < displayItems.feedLength; a++) {
            if (n = displayItems.generateElements("div", "product", s, "product-" + a),
            i = displayItems.generateElements("img", "product-image", n, "productImage-" + a),
            displayItems.generateElements("div", "lem-gradient-dark", n, "lemGradientDark"),
            window.data.products[a].images)
                for (var m = 0; m < displayItems.imageKeys.length; m++)
                    window.data.products[a].images.mainImages && window.data.products[a].images.mainImages[displayItems.imageKeys[m]] ? i.src = window.data.products[a].images.mainImages[displayItems.imageKeys[m]] : window.data.products[a].images[displayItems.imageKeys[m]] ? window.data.products[a].images[displayItems.imageKeys[m]] ? i.src = window.data.products[a].images[displayItems.imageKeys[m]] : "string" == typeof window.data.products[a].images[displayItems.imageKeys[m]] ? i.src = window.data.products[a].images[displayItems.imageKeys[m]] : i.src = "" : i.src = "";
            if (d = displayItems.generateElements("div", "product-detail-container", n, "productDetailContainer"),
            o = displayItems.generateElements("div", "product-detail-inner", d, "productDetailInner"),
            t[a].title && (displayItems.generateElements("div", "product-title-container", o, "productTitleContainer").innerHTML = t[a].title),
            t[a].message && (displayItems.generateElements("div", "product-message-container", o, "productMessageContainer").innerHTML = t[a].message),
            window.data.products[a].ctaButtons) {
                r = displayItems.generateElements("div", "cta-button-container", o, "ctaButtonContainer");
                for (m = 0; m < window.data.products[a].ctaButtons.length; m++)
                    "b" === window.data.products[a].ctaButtons[m].ctaType && window.data.products[a].ctaButtons[m].lp && window.data.products[a].ctaButtons[m].ctaText && (l = displayItems.generateElements("a", "cta-button", r, "ctaButton"),
                    window.data.products[a].ctaButtons[m].backgroundColor && (l.style.background = window.data.products[a].ctaButtons[m].backgroundColor),
                    window.data.products[a].ctaButtons[m].borderColor && (l.style.border = "1px solid " + window.data.products[a].ctaButtons[m].borderColor),
                    window.data.products[a].ctaButtons[m].ctaType && "a" === window.data.products[a].ctaButtons[m].ctaType && (l.className = "banner-button-div"),
                    l.innerHTML = window.data.products[a].ctaButtons[m].ctaText,
                    l.href = window.data.products[a].ctaButtons[m].lp,
                    l.target = "_blank",
                    window.data.products[a].productCk && (l.productCk = window.data.products[a].productCk,
                    l.onclick = function(t) {
                        t.stopPropagation(),
                        displayItems.btnclicked = !0,
                        displayItems.fireImagePixels(this)
                    }
                    ,
                    l.addEventListener("touchstart", function(t) {
                        t.stopPropagation(),
                        displayItems.btnclicked = !0,
                        displayItems.fireImagePixels(this)
                    })))
            }
        }
        window.showProduct = displayItems.findProduct,
        displayItems.initDrag(e, s)
    },
    initDrag: function(t, e) {
        displayItems.slider(t, e)
    },
    slider: function(t, e) {
        displayItems.initialX,
        displayItems.finalX,
        displayItems.initialY,
        displayItems.finalY,
        displayItems.leftPos = -document.body.clientWidth,
        displayItems.btnclicked = !1,
        displayItems.currentProduct = 0,
        displayItems.slideDistance,
        displayItems.interval = null,
        displayItems.numberOfSlides = displayItems.feedLength,
        displayItems.slidesWidth = e.offsetWidth,
        displayItems.threshold = 40,
        displayItems.scrollThreshold = 50,
        t.addEventListener("mousedown", displayItems.dragStart),
        t.addEventListener("touchstart", displayItems.dragStart),
        t.addEventListener("touchmove", displayItems.dragging),
        t.addEventListener("touchend", displayItems.dragStop)
    },
    dragStart: function(t) {
        t.preventDefault();
        var e = document.getElementById("productContainer");
        document.getElementById("bannerContainer");
        e.style.transition = "0.5s",
        displayItems.btnclicked = !0,
        "touchstart" == t.type ? (displayItems.initialX = t.touches[0].clientX,
        displayItems.initialY = t.touches[0].clientY) : (displayItems.initialX = t.clientX,
        displayItems.initialY = t.clientY,
        document.onmousemove = displayItems.dragging,
        document.onmouseup = displayItems.dragStop)
    },
    dragging: function(t) {
        if (displayItems.btnclicked) {
            "touchmove" == t.type ? (displayItems.finalX = t.touches[0].clientX,
            displayItems.finalY = t.touches[0].clientY) : (displayItems.finalX = t.clientX,
            displayItems.finalY = t.clientY);
            var e = displayItems.currentProduct * displayItems.leftPos;
            if (displayItems.slideDistance = displayItems.initialX - displayItems.finalX,
            Math.abs(displayItems.slideDistance) > displayItems.threshold)
                document.getElementById("productContainer").style.left = e - displayItems.slideDistance + "px"
        }
    },
    dragStop: function(t) {
        displayItems.finalX < displayItems.initialX && displayItems.currentProduct < displayItems.numberOfSlides - 1 && displayItems.slideDistance >= displayItems.threshold ? (displayItems.modifyPaginationClass(displayItems.currentProduct + 1),
        displayItems.updateCurrentCount(1)) : displayItems.finalX > displayItems.initialX && displayItems.currentProduct > 0 && -displayItems.slideDistance >= displayItems.threshold ? (displayItems.modifyPaginationClass(displayItems.currentProduct - 1),
        displayItems.updateCurrentCount(-1)) : displayItems.finalX > displayItems.initialX && 0 == displayItems.currentProduct ? (displayItems.modifyPaginationClass(displayItems.currentProduct),
        displayItems.updateCurrentCount(0)) : displayItems.finalX < displayItems.initialX && displayItems.currentProduct == displayItems.numberOfSlides - 1 && (displayItems.modifyPaginationClass(displayItems.currentProduct),
        displayItems.updateCurrentCount(0));
        var e = displayItems.initialY - displayItems.finalY;
        Math.abs(e) >= displayItems.scrollThreshold && window.parent.scrollBy(0, e),
        displayItems.animate();
        document.getElementById("bannerContainer");
        displayItems.initialX = void 0,
        displayItems.finalX = void 0,
        displayItems.btnclicked = !1,
        document.onmousemove = null,
        document.onmouseup = null
    },
    animate: function() {
        var t = document.getElementById("productContainer");
        displayItems.btnclicked || (displayItems.currentProduct++,
        displayItems.currentProduct > displayItems.numberOfSlides - 1 ? (displayItems.currentProduct = 0,
        t.style.transition = "none") : t.style.transition = "0.8s")
    },
    moveSlide: function() {
        document.getElementById("productContainer").style.left = displayItems.leftPos * displayItems.currentProduct + "px"
    },
    fireImagePixels: function(t) {
        new Image(1,1).src = t.productCk + "&lp=" + encodeURIComponent(t.href)
    },
    displayContent: function(t) {
        var e;
        (e = document.getElementById("product-" + t)) && (e.style.opacity = 1)
    },
    createArrowButtonNavigation: function(t, e) {
        var a, s, n;
        a = displayItems.generateElements("div", "navigation-container", t, "navigationContainer"),
        (s = displayItems.generateElements("div", "navigation-left disabled-nav-arrow", a, "prev")).onclick = function(t) {
            var e;
            e = displayItems.currentProduct - 1 < 0 ? displayItems.feedLength - 1 : displayItems.currentProduct - 1,
            displayItems.modifyPaginationClass(e),
            displayItems.updateCurrentCount(-1)
        }
        ,
        s.addEventListener("touchstart", function(t) {
            var e;
            e = displayItems.currentProduct - 1 < 0 ? displayItems.feedLength - 1 : displayItems.currentProduct - 1,
            displayItems.modifyPaginationClass(e),
            displayItems.updateCurrentCount(-1)
        }, !0),
        (n = displayItems.generateElements("div", "navigation-right", a, "next")).onclick = function(t) {
            var e;
            e = displayItems.currentProduct + 1 >= displayItems.feedLength ? 0 : displayItems.currentProduct + 1,
            displayItems.modifyPaginationClass(e),
            displayItems.updateCurrentCount(1)
        }
        ,
        n.addEventListener("touchstart", function(t) {
            var e;
            e = displayItems.currentProduct + 1 >= displayItems.feedLength ? 0 : displayItems.currentProduct + 1,
            displayItems.modifyPaginationClass(e),
            displayItems.updateCurrentCount(1)
        }, !0)
    },
    findProduct: function(t) {
        var e;
        e = displayItems.currentProduct < t ? t - displayItems.currentProduct : -(displayItems.currentProduct - t),
        displayItems.updateCurrentCount(e),
        displayItems.modifyPaginationClass(t)
    },
    handleTouchEvents: function(t) {
        var e, a, s = function(t) {
            e = t.changedTouches[0].pageX,
            displayItems.isBannerHovered = !0
        }, n = function(t) {
            var s;
            s = t.changedTouches[0].pageX - e,
            Math.abs(s) > 50 && (s < 0 ? (a = displayItems.currentProduct + 1 >= displayItems.feedLength ? 0 : displayItems.currentProduct + 1,
            displayItems.currentProduct + 1 != displayItems.feedLength && (displayItems.modifyPaginationClass(a),
            displayItems.updateCurrentCount(1))) : (a = displayItems.currentProduct - 1 < 0 ? displayItems.feedLength - 1 : displayItems.currentProduct - 1,
            0 != displayItems.currentProduct && (displayItems.modifyPaginationClass(a),
            displayItems.updateCurrentCount(-1)))),
            0,
            e = 0
        };
        t.addEventListener("touchstart", s, !1),
        t.addEventListener("touchend", n, !1),
        t.addEventListener("touchleave", n, !1)
    },
    createPaginationNavigation: function(t) {
        var e, a, s;
        s = displayItems.generateElements("div", "navigation-bar-container", t, "navigationBarContainer"),
        a = displayItems.generateElements("div", "navigation-bar", s, "navigationBar");
        for (var n = 0; n < displayItems.feedLength; n++)
            e = displayItems.generateElements("div", "pagination-bullet", a, "paginationBullet-" + n),
            0 === n && (e.className += " active-pagination"),
            e.onclick = function(t) {
                var e;
                e = parseInt(this.id.match(/\d+/)[0]),
                displayItems.findProduct(e)
            }
            ,
            e.addEventListener("touchstart", function(t) {
                var e;
                e = parseInt(this.id.match(/\d+/)[0]),
                displayItems.findProduct(e)
            }, !0)
    },
    modifyPaginationClass: function(t) {
        for (var e = 0; e < displayItems.feedLength; e++)
            document.getElementById("paginationBullet-" + e).className = e === t ? "pagination-bullet active-pagination" : "pagination-bullet"
    },
    showNextProduct: function() {
        var t, e;
        t = document.getElementById("productContainer"),
        e = document.getElementById("product-" + displayItems.currentProduct),
        t.style.left = -e.offsetLeft + "px",
        0 === displayItems.currentProduct ? document.getElementsByClassName("navigation-left")[0] && document.getElementsByClassName("navigation-left")[0].classList.add("disabled-nav-arrow") : document.getElementsByClassName("navigation-left")[0] && document.getElementsByClassName("navigation-left")[0].classList.remove("disabled-nav-arrow"),
        displayItems.currentProduct === displayItems.feedLength - 1 ? document.getElementsByClassName("navigation-right")[0] && document.getElementsByClassName("navigation-right")[0].classList.add("disabled-nav-arrow") : document.getElementsByClassName("navigation-right")[0] && document.getElementsByClassName("navigation-right")[0].classList.remove("disabled-nav-arrow")
    },
    updateCurrentCount: function(t) {
        var e;
        e = displayItems.currentProduct + t,
        displayItems.currentProduct = e >= displayItems.feedLength ? 0 : e < 0 ? displayItems.feedLength - 1 : e,
        displayItems.showNextProduct()
    },
    generateElements: function(t, e, a, s) {
        var n = document.createElement(t);
        return "" !== s && (n.id = s),
        "" !== e && (n.className = e),
        a.appendChild(n),
        n
    },
    getIframeDimensions: function(t) {
        var e = {
            width: t,
            height: "480px"
        };
        return t >= 768 && t < 1003 ? e.height = "612px" : t >= 280 && t < 768 && (e.height = "712px"),
        e
    }
};
!function() {
    try {
        var t = !1;
        document.addEventListener("DOMContentLoaded", function() {
            !t && displayItems.enableBanner(),
            t = !0
        }),
        window.addEventListener("load", function() {
            !t && displayItems.enableBanner(),
            t = !0
        }),
        "complete" != document.readyState || t ? document.addEventListener("readystatechange", function() {
            !t && displayItems.enableBanner(),
            t = !0
        }) : (!t && displayItems.enableBanner(),
        t = !0),
        window.addEventListener("orientationchange", function() {
            try {
                displayItems.leftPos = -document.body.clientWidth,
                displayItems.slidesWidth = document.body.clientWidth,
                displayItems.showNextProduct()
            } catch (t) {}
        }),
        window.addEventListener("resize", function() {
            try {
                displayItems.leftPos = -document.body.clientWidth,
                displayItems.slidesWidth = document.body.clientWidth,
                displayItems.showNextProduct()
            } catch (t) {
                "enabled" === window.lem_bp_dev && console.log("Banner Error:", t)
            }
        })
    } catch (t) {
        "enabled" === window.lem_bp_dev && console.log("Banner Error:", t)
    }
}();
