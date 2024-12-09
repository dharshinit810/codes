// Object to handle banner functionality
const BannerSlider = {
    bannerContainer: null,
    isBannerHovered: false,
    slideInterval: null,
    currentSlide: 0,
    totalSlides: 0,
  
    init(data) {
      const products = data?.products || [];
      if (products.length > 0) {
        this.totalSlides = products.length;
        this.setupBannerContainer();
        this.renderSlides(products);
        this.renderDots(products.length);
        //this.setAutoSlide();
        this.addEventListeners();
        this.updateBannerHeight();
      }
    },
  
    setupBannerContainer() {
      this.bannerContainer = document.getElementById("banner-container") || this.createElement("div", "banner-container", document.body,"banner-container");
    },
  
    renderSlides(products) {
      products.forEach((product, index) => this.createSlide(product, index));
    },
  
    createSlide(product, index) {
      const slide = this.createElement("a", "productContainer slides", this.bannerContainer, `product-${index}`);
      this.setupSlideImage(slide, product.images, index);
      this.setupSlideDetails(slide, product);
      slide.style.transform = `translateX(${index * 100}%)`;
    },
  
    setupSlideImage(slide, images, index) {
      if (!images) return;
      const image = this.createElement("img", "imageContainer", slide, `image-${index}`);
      this.updateImage(image, images);
  
      window.addEventListener("resize", () => this.updateImage(image, images));
    },
  
    setupSlideDetails(slide, product) {
      console.log("inside details")
      const { title, message, ctaButtons } = product;
      if (!title?.trim() && !message?.trim()) {
        return;
      }
      
      console.log("inside details2")
      const details = this.createElement("div", "detailContainer slides", slide);

      const content = this.createElement("div","contentContainer slides", details ,"content-container")
  
      if (title) this.createElement("div", "titleContainer", content).innerHTML = title;
      if (message) this.createElement("div", "messageContainer", content).innerHTML = message;
  
      this.setupCTAs(content, ctaButtons, product, slide);
    },
  
    setupCTAs(content, ctaButtons, product, slide) {
      if (!ctaButtons?.length) return;
      const buttonContainer = ctaButtons.length > 1 ? this.createElement("div", "buttonContainer", content) : null;
  
      ctaButtons.forEach((cta, index) => {
        if (cta.ctaType === "i" && cta.lp) {
          slide.href = cta.lp;
          slide.target = "_blank";
          slide.productCk = product.productCk;
          slide.onclick = () => this.fireImagePixels(slide);
        } else if (cta.ctaType === "b") {
          const button = this.createElement("a", "banner-button", buttonContainer || content , `ctaButton-${index}`);
          button.style.background = cta.backgroundColor;
          button.style.border = `1px solid ${cta.border}`;
          button.innerHTML = cta.ctaText || "Click";
          button.href = cta.lp || "#";
          button.target = "_blank";
          button.productCk = product.productCk;
          button.onclick = () => this.fireImagePixels(button);
        }
      });
    },
  
    renderDots(count) {
      const dotsContainer = this.createElement("div", "dots-container", this.bannerContainer);
      for (let i = 0; i < count; i++) {
        const dot = this.createElement("li", "dot", dotsContainer, `dot-${i}`);
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => this.showSlide(i));
      }
    },
  
    // setAutoSlide() {
    //   this.slideInterval = setInterval(() => {
    //     if (!this.isBannerHovered) this.navigateSlide(1);
    //   }, 5000);
    // },
  
    addEventListeners() {
      this.bannerContainer.addEventListener("mouseover", () => this.isBannerHovered = true);
      this.bannerContainer.addEventListener("mouseout", () => this.isBannerHovered = false);
  
      window.addEventListener("resize", () => this.updateBannerHeight());
    },
  
    navigateSlide(direction) {
      this.currentSlide = (this.currentSlide + direction + this.totalSlides) % this.totalSlides;
      this.updateSlides();
      this.updateBannerHeight();
    },
  
    showSlide(index) {
      this.currentSlide = index;
      this.updateSlides();
      this.updateBannerHeight();
    },
  
    updateSlides() {
      document.querySelectorAll(".productContainer").forEach((container, index) => {
        container.style.transform = `translateX(${(index - this.currentSlide) * 100}%)`;
      });
  
      document.querySelectorAll(".dot").forEach((dot, index) => {
        dot.classList.toggle("active", index === this.currentSlide);
      });
    },
  
    updateImage(image, images) {
      const width = document.documentElement.clientWidth;
      if(images["1280x800"]){
        image.src = images["1280x800"]
        return
      }
      const src = images["360x200"] && width <= 767
      ? images["360x200"]
      : images["1600x280"]
        ? images["1600x280"]
        : images["1280x800"] || "";
      image.src = src;
      image.sizes = width <= 767 ? "360px" : "1600px";
      if(images["360x200"] && images["1600x280"])
        image.srcset = `${images["360x200"]} 767w, ${images["1600x280"]} 1600w`;
      image.width = width;
      image.height = width <= 767 ? width / 1.8 : width / 5.71;
    },
  
    updateBannerHeight() {
      console.log("inside updateBannerHeight");
      const activeSlide = document.querySelector(`#product-${this.currentSlide}`);
      
      if (activeSlide && this.bannerContainer) {
        const activeDetailContainer = activeSlide.querySelector(".detailContainer");
        console.log(activeSlide.offsetHeight);
        
        // Update the banner container height
        this.bannerContainer.style.height = `${activeSlide.offsetHeight}px`;
        
        // Update the height of the detail container if it exists
        if (activeDetailContainer) {
          activeDetailContainer.style.height = `${activeSlide.offsetHeight}px`;
        }
      } else {
        console.log("Active slide or banner container not found.");
      }
    }
    ,
  
    fireImagePixels(element) {
      new Image(1, 1).src = `${element.productCk}&lp=${encodeURIComponent(element.href)}`;
    },
  
    createElement(tag, className, parent, id) {
      const element = document.createElement(tag);
      if (className) element.className = className;
      if (id) element.id = id;
      if (parent) parent.appendChild(element);
      return element;
    }
  };
  
  // Call the method inside DOMContentLoaded
  document.addEventListener("DOMContentLoaded", () => {
    BannerSlider.init(window.data);
  });
  