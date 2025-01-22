jQuery(document).ready(function ($) {
   testWebPFunction();
   initMobileMenu();
   initScrollTo();
   initSubmenu();
   initAccordion();
   initAccordionHover();
   if ($("#read-more").length > 0) {
      initReadMore();
   }
   if ($("#typewriter").length > 0) {
      initTypeWriter();
   }
   if (
      $(".other-articles-slider").length > 0 ||
      $(".team-slider").length > 0 ||
      $(".cases-slider").length > 0 ||
      $(".articles-slider").length > 0
   ) {
      initSwiper();
   }
   initTabs();

   if ($(".about-slider").length > 0) {
      initAboutSlider();
   }
   initStableWindowWwidth();
});

function testWebPFunction() {
   function testWebP(callback) {
      let webP = new Image();
      webP.onload = webP.onerror = function () {
         callback(webP.height == 2);
      };
      webP.src =
         "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
   }
   testWebP(function (support) {
      let className = support === true ? "webp" : "no-webp";
      document.documentElement.classList.add(className);
   });
}

function initMobileMenu() {
   const headerBurger = $(".header__burger");
   const openModalConsultation = $(".btn-modal-consultation");
   const headerMenu = $(".header__menu");
   const modalConsultation = $(".modal-consultation");
   const body = $("body");
   const headerOverlay = $(".overlay");
   const headerMenuLink = $(".header__link");
   const headerBtnConsultation = $(".header .btn-full");

   function closeMenu() {
      headerBurger.removeClass("active");
      headerMenu.removeClass("active");
      openModalConsultation.removeClass("active");
      modalConsultation.removeClass("active");
      body.removeClass("lock");
   }

   headerBurger.on("click", function () {
      headerBurger.toggleClass("active");
      headerMenu.toggleClass("active");
      body.toggleClass("lock");
   });

   openModalConsultation.on("click", function () {
      $(this).toggleClass("active");
      modalConsultation.toggleClass("active");
      body.toggleClass("lock");
   });

   function shouldCloseMenu() {
      return (
         body.hasClass("lock") &&
         openModalConsultation.hasClass("active") &&
         modalConsultation.hasClass("active")
      );
   }

   headerOverlay.on("click", function () {
      if (shouldCloseMenu()) {
         closeMenu();
      }
   });

   headerOverlay
      .add(headerMenuLink)
      .add(headerBtnConsultation)
      .on("click", function () {
         if (
            body.hasClass("lock") &&
            headerMenu.hasClass("active") &&
            headerBurger.hasClass("active")
         ) {
            closeMenu();
         }
      });
}

function initScrollTo() {
   $("a.scroll-to").click(function () {
      let headerHeight = 0;

      if ($(window).width() <= 1279) {
         headerHeight = 52;
      }

      $("html, body").animate(
         {
            scrollTop:
               $($(this).attr("href")).offset().top - headerHeight + "px",
         },
         {
            duration: 700,
            easing: "swing",
         }
      );
      return false;
   });
}

function initSubmenu() {
   $(".menu-item-submenu a").mouseenter(function () {
      $(".submenu").addClass("show");
      $(this).addClass("active");
   });
   $(".header").mouseleave(function () {
      $(".submenu").removeClass("show");
      $(".menu-item-submenu a").removeClass("active");
   });
}

function initAccordion() {
   let acc = document.getElementsByClassName("trigger-accordion-js");
   let i;

   for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
         let isActive = this.classList.contains("active");

         for (let j = 0; j < acc.length; j++) {
            acc[j].classList.remove("active");
            let panel = acc[j].nextElementSibling;
            panel.style.maxHeight = null;
         }

         if (!isActive) {
            this.classList.add("active");
            let panel = this.nextElementSibling;
            panel.style.maxHeight = panel.scrollHeight + "px";
         }
      });
   }
}

function initAccordionHover() {
   let acc = document.getElementsByClassName("accordion-hover__btn");
   let isHoverEnabled = window.innerWidth >= 1280 && window.innerWidth <= 1920;

   for (let i = 0; i < acc.length; i++) {
      acc[i].addEventListener(
         isHoverEnabled ? "mouseover" : "click",
         function () {
            let isActive = this.classList.contains("active");

            for (let j = 0; j < acc.length; j++) {
               if (!isActive) {
                  acc[j].classList.remove("active");
                  let panel = acc[j].nextElementSibling;
                  panel.style.maxHeight = null;
               }
            }

            if (!isActive) {
               this.classList.add("active");
               let panel = this.nextElementSibling;
               panel.style.maxHeight = panel.scrollHeight + "px";
            }
         }
      );
   }
}

function initReadMore() {
   var moreText = document.getElementById("more");
   var moreArchive = document.querySelectorAll(".archive");
   var readMoreBtn = document.getElementById("read-more");
   var readMoreText = document.getElementById("read-more-text");
   var readMoreTextArchive = document.getElementById("read-more-text-archive");
   var isExpanded = false;

   readMoreBtn.addEventListener("click", function () {
      isExpanded = !isExpanded;
      if (!moreText) {
      } else {
         moreText.style.display = isExpanded ? "flex" : "none";
         moreText.classList.toggle("active");
      }
      moreArchive.forEach(function (archive) {
         archive.style.display = isExpanded ? "block" : "none";
      });

      moreArchive.forEach(function (archive) {
         archive.classList.toggle("active");
      });

      this.classList.toggle("active");

      if (!readMoreText) {
      } else {
         readMoreText.textContent = isExpanded ? "ЗГОРНУТИ" : "ПОКАЗАТИ ЩЕ";
      }
      if (!readMoreTextArchive) {
      } else {
         readMoreTextArchive.textContent = isExpanded
            ? "Згорнути"
            : "Архівні послуги";
      }
   });
}

function initTypeWriter() {
   let tagForPrint = document.getElementById("typewriter");
   let phrase = "Бухгалтерію та фінанси ми беремо на себе!";
   let printIterator = 0;

   const newInterval = setInterval(() => {
      tagForPrint.textContent += phrase[printIterator];
      printIterator++;
      if (printIterator === phrase.length) {
         clearInterval(newInterval);
         setTimeout(() => {
            tagForPrint.textContent = "";
            printIterator = 0;
            initTypeWriter();
         }, 5000);
      }
   }, 100);
}

function initSwiper() {
   let swiperTeam = new Swiper(".team-slider", {
      navigation: {
         nextEl: ".button-next-team",
         prevEl: ".button-prev-team",
      },
      pagination: {
         el: ".pagination-team",
         clickable: true,
      },
      slidesPerView: "auto",
      spaceBetween: 16,
      loop: false,
      breakpoints: {
         1280: {
            spaceBetween: 24,
         },
      },
   });

   let swiperOtherArticles = new Swiper(".other-articles-slider", {
      pagination: {
         el: ".pagination-other-articles",
         clickable: true,
      },
      slidesPerView: "auto",
      spaceBetween: 16,
      loop: false,
      breakpoints: {
         1280: {
            spaceBetween: 24,
         },
      },
   });

   let swiperCases = new Swiper(".cases-slider", {
      navigation: {
         nextEl: ".button-next-cases",
         prevEl: ".button-prev-cases",
      },
      pagination: {
         el: ".pagination-cases",
         clickable: true,
      },
      slidesPerView: "auto",
      spaceBetween: 16,
      loop: false,
      breakpoints: {
         1280: {
            spaceBetween: 24,
         },
      },
   });

   let swiperArticles = new Swiper(".articles-slider", {
      navigation: {
         nextEl: ".button-next-articles",
         prevEl: ".button-prev-articles",
      },
      pagination: {
         el: ".pagination-articles",
         clickable: true,
      },
      slidesPerView: "auto",
      spaceBetween: 16,
      loop: false,
      breakpoints: {
         1280: {
            spaceBetween: 24,
         },
      },
   });
}

function initAboutSlider() {
   function initializeSwiper() {
      if (window.innerWidth >= 1280) {
         return new Swiper(".about-slider", {
            navigation: {
               nextEl: ".button-next-about",
               prevEl: ".button-prev-about",
            },
            pagination: {
               el: ".pagination-about",
               clickable: true,
            },
            slidesPerView: "auto",
            spaceBetween: 24,
            loop: false,
         });
      } else {
         return null;
      }
   }

   let swiperAbout = initializeSwiper();
   window.addEventListener("resize", () => {
      if (swiperAbout) {
         swiperAbout.destroy();
      }
      swiperAbout = initializeSwiper();
   });
}

function initTabs() {
   $(function () {
      $(".tabs__caption").on("click", "button:not(.active)", function () {
         $(this)
            .addClass("active")
            .siblings()
            .removeClass("active")
            .closest("div.tabs")
            .find("div.tabs__content")
            .removeClass("active")
            .eq($(this).index())
            .addClass("active");
      });
   });
}

if ($('[data-fancybox=""]').length > 0) {
   $('[data-fancybox=""]').fancybox({
      autoFocus: false,
      touch: false,
   });
}

function initStableWindowWwidth() {
   var originalWidth = jQuery(".wrapper").width();

   jQuery("[data-fancybox]").click(function () {
      jQuery(".wrapper").width(originalWidth);
      jQuery(".header").width(originalWidth);
   });

   jQuery("[data-fancybox-close]").click(function () {
      jQuery(".wrapper").width("auto");
      jQuery(".header").width("auto");
   });
}

var currentTab = 0;
var radioStates = [];

showTab(currentTab);

function showTab(n) {
   var x = document.getElementsByClassName("quiz__tab");

   if (n < 0 || n >= x.length) {
      return;
   }

   for (var i = 0; i < x.length; i++) {
      x[i].style.display = "none";
      x[i].classList.remove("active");
   }

   x[n].style.display = "flex";
   x[n].classList.add("active");

   if (!radioStates[n]) {
      radioStates[n] = {};
   }

   var radioInputs = x[n].querySelectorAll('input[type="radio"]');
   radioInputs.forEach(function (input) {
      input.checked = radioStates[n][input.name] === input.value;
   });

   var btnSubmitQuiz = document.getElementsByClassName("btn-submit-quiz");

   if (n == 0) {
      document.getElementById("prevBtn").style.display = "none";
   } else {
      document.getElementById("prevBtn").style.display = "flex";
   }
   if (n == x.length - 1) {
      document.getElementById("nextBtnText").innerHTML = "Надіслати запит";
      for (var i = 0; i < btnSubmitQuiz.length; i++) {
         btnSubmitQuiz[i].classList.add("active");
      }
   } else {
      document.getElementById("nextBtnText").innerHTML = "Наступне питання";
      for (var i = 0; i < btnSubmitQuiz.length; i++) {
         btnSubmitQuiz[i].classList.remove("active");
      }
   }
}

function nextPrev(n) {
   var x = document.getElementsByClassName("quiz__tab");

   if (x[currentTab].contains(document.querySelector("#employees2"))) {
      currentTab = currentTab + n;
      showTab(currentTab);
      return;
   }

   var isRangeTab = x[currentTab].contains(
      document.querySelector("#employees")
   );

   if (n == 1 && !isRangeTab && !validateForm()) return false;

   var radioInputs = x[currentTab].querySelectorAll('input[type="radio"]');
   radioStates[currentTab] = {};
   radioInputs.forEach(function (input) {
      if (input.checked) {
         radioStates[currentTab][input.name] = input.value;
      }
   });

   x[currentTab].style.display = "none";
   currentTab = currentTab + n;
   if (currentTab >= x.length) {
      window.location.href = "success.html";
   }
   showTab(currentTab);
}

function validateForm() {
   var x,
      y,
      i,
      valid = true;
   x = document.getElementsByClassName("quiz__tab");
   y = x[currentTab].getElementsByTagName("input");
   var radioSelected = false;
   for (i = 0; i < y.length; i++) {
      if (y[i].value == "") {
         y[i].classList.add("invalid");
         valid = false;
      } else if (y[i].type === "radio" && y[i].checked) {
         radioSelected = true;
      }
   }

   if (!radioSelected) {
      valid = false;
   }

   return valid;
}

const employees = document.querySelector("#employees");
const employees2 = document.querySelector("#employees2");

if (employees && employees2) {
   var labels = { 0: "0", 3: "1-3", 5: "3-5", 10: "5-10", 20: "10+" };
   noUiSlider.create(employees, {
      start: 0,
      connect: [true, false],
      tooltips: {
         to: function (value) {
            return value > 11 ? "10+" : parseInt(value);
         },
      },
      range: {
         min: 0,
         "25%": 3,
         "50%": 5,
         "75%": 10,
         max: 20,
      },
      pips: {
         mode: "steps",
         filter: function (value, type) {
            return type === 0 ? -1 : 1;
         },
         format: {
            to: function (value) {
               return labels[value];
            },
         },
      },
   });

   var labels2 = {
      0: "0",
      10: "1-10",
      20: "11-20",
      50: "21-50",
      60: "50+",
   };
   noUiSlider.create(employees2, {
      start: 0,
      connect: [true, false],
      tooltips: {
         to: function (value) {
            return value > 51 ? "50+" : parseInt(value);
         },
      },
      range: {
         min: 0,
         "25%": 10,
         "50%": 20,
         "75%": 50,
         max: 60,
      },
      pips: {
         mode: "steps",
         filter: function (value, type) {
            return type === 0 ? -1 : 1;
         },
         format: {
            to: function (value) {
               return labels2[value];
            },
         },
      },
   });
} else {
}
