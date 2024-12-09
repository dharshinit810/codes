let bannerContainer = null;
let detailContainer = null;
let slideInterval = null;
let isBannerHovered = false;

var displayItems = {
  currentSlide: 0,
  totalSlides: 0,


  enableBanner: () => {
    if (window?.data?.products) {
      displayItems.displayBanner(window.data.products);
    }
  },

  displayBanner: (products) => {
    bannerContainer = document.getElementById("banner-container");
    if (!bannerContainer) {
      bannerContainer = displayItems.generateElements(
        "div",
        "bannerContainer",
        document.body,
        "banner-container"
      );
    }

    if (products?.length > 0) {
      displayItems.totalSlides = products.length;
      products.forEach((product, index) => {
        displayItems.displayBannerItems(product, index);
      });
    }

    var dotsContainer = displayItems.generateElements(
      "div",
      "dots-container",
      bannerContainer,
      ""
    );
    for (let i = 0; i < products.length; i++) {
      let dot = displayItems.generateElements(
        "li",
        "dot",
        dotsContainer,
        `dot-${i}`
      );
      if (i === 0) dot.classList.add("active");
    }

    document.querySelectorAll(".dot").forEach((dot, index) => {
      dot.addEventListener("click", () => displayItems.showSlide(index));
    });
  },

  displayBannerItems: (product, index) => {
    var productContainer = displayItems.generateElements(
      "a",
      "productContainer slides",
      bannerContainer,
      "product-" + index
    );
    console.log(productContainer);

    if (product?.images && typeof product.images === "object") {
      var image = displayItems.generateElements(
        "img",
        "imageContainer",
        productContainer,
        "image-" + index
      );
      displayItems.updateImage(image, product.images);

      window.addEventListener("resize", function () {
        displayItems.updateImage(image, product.images);
      });
    }

    if (
      (product?.title && product.title.trim() !== "") ||
      (product?.message && product.message.trim() !== "")
    ) {
      detailContainer = displayItems.generateElements(
        "div",
        "detailContainer slides",
        productContainer,
        "detail-container"
      );
      console.log(detailContainer)

      if (product?.title && product.title.trim() !== "") {
        var titleContainer = displayItems.generateElements(
          "div",
          "titleContainer",
          detailContainer,
          ""
        );
        titleContainer.innerHTML = product.title;
      }

      if (product?.message && product.message.trim() !== "") {
        var messageContainer = displayItems.generateElements(
          "div",
          "messageContainer",
          detailContainer,
          ""
        );
        messageContainer.innerHTML = product.message;
      }
    }

    if (product?.ctaButtons) {
      const buttonContainer = product.ctaButtons.length > 1 
          ? displayItems.generateElements("div", "buttonContainer", detailContainer, "button-container") 
          : null;
  
      product.ctaButtons.forEach((ctaButton, index) => {
          if (ctaButton?.ctaType === "i" && ctaButton.lp && typeof ctaButton.lp === "string") {
                  productContainer.href = ctaButton.lp;
                  productContainer.target = "_blank";
                  productContainer.productCk = product?.productCk; 
                  productContainer.onClick = () =>{
                    fireImagePixels(this)
                  }
          }
          if (ctaButton?.ctaType === "b") {
              const b = displayItems.generateElements(
                  "a", 
                  "banner-button", 
                  buttonContainer || detailContainer,  
                  `ctaButton-${index}`
              );
              b.style.background = ctaButton?.backgroundColor;
              b.style.border = `1px solid ${ctaButton?.border}`;
              b.innerHTML = ctaButton?.ctaText;
              if (typeof ctaButton?.lp === "string") {
                  b.href = ctaButton.lp;
                  b.target = '_blank';
              }
              b.productCk = product?.productCk;
              b.onClick = () =>{
                fireImagePixels(this)
              }
          }
          productContainer.style.transform = `translateX(${index * 100}%)`;
      });
  }
  
  },

  navigateSlide: (direction) => {
    displayItems.currentSlide += direction;

    if (displayItems.currentSlide < 0) {
      displayItems.currentSlide = displayItems.totalSlides - 1; 
    } else if (displayItems.currentSlide >= displayItems.totalSlides) {
      displayItems.currentSlide = 0; 
    }

    displayItems.updateSlides();
    displayItems.updateBannerHeight();
  },

  showSlide: (index) => {
    displayItems.currentSlide = index;
    displayItems.updateSlides();
    displayItems.updateBannerHeight();
  },


  updateSlides: () => {
    document
      .querySelectorAll(".productContainer")
      .forEach((container, index) => {
        container.style.transform = `translateX(${
          (index - displayItems.currentSlide) * 100
        }%)`;
      });

    document.querySelectorAll(".dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === displayItems.currentSlide);
    });
  },

  updateImage: (image, images) => {
    var w = document.documentElement.clientWidth;

    image.srcset =
      images["360x200"] + " 767w, " + images["1600x280"] + " 1600w";

    image.sizes = w <= 767 ? "(max-width: 767px) 360px" : "1600px";

    image.src = w <= 767 ? images["360x200"] : images["1600x280"];

    var h = w > 767 ? w / 5.71 : w / 1.8;
    console.log(h);
    image.setAttribute("width", `${w}px`);
    image.setAttribute("height", `${h}px`);
  },

  updateBannerHeight: () => {
    const activeSlide = document.querySelector(
      `#product-${displayItems.currentSlide}`
    );
    if (activeSlide && bannerContainer) {
      bannerContainer.style.height = `${activeSlide.offsetHeight}px`;
    }
  },

  generateElements: (tag, className, parent, id) => {
    var element = document.createElement(tag);
    if (className) element.className = className;
    if (id) element.id = id;
    if (parent) parent.appendChild(element);
    return element;
  },

  fireImagePixels: function (t) {
    new Image(1, 1).src =
     t.productCk +
      "&lp=" +
      encodeURIComponent(t.href);
  },
};

document.addEventListener("DOMContentLoaded", () => {
  displayItems.enableBanner();
  displayItems.updateBannerHeight();

  window.addEventListener("resize", () => {
    displayItems.updateBannerHeight();
  });

  slideInterval = setInterval(() => {
    if (!isBannerHovered) {
      displayItems.navigateSlide(1);
    }
  }, 5000);

  bannerContainer.addEventListener("mouseover", () => {
    isBannerHovered = true;
  });

  bannerContainer.addEventListener("mouseout", () => {
    isBannerHovered = false;
  });
});
