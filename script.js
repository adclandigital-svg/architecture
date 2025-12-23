gsap.registerPlugin(ScrollTrigger);

/* LENIS – smoother config */
// const lenis = new Lenis({
//   duration: 1.5, // ↑ higher = smoother
//   easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic
//   smooth: true,
//   smoothTouch: false, // avoid lag on mobile
//   wheelMultiplier: 0.9, // softer wheel input
//   touchMultiplier: 1.2,
// });

const lenis = new Lenis({
  duration: 0.65,           // higher = smoother
  easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic
  smooth: true,
  smoothTouch: false,
  wheelMultiplier: 0.9,
  touchMultiplier: 1.2,
});

// RAF loop for Lenis
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Select all images
gsap.utils.toArray(".float-img").forEach((img) => {
  gsap.fromTo(
    img,
    { y: -100 },
    {
      y: 100,
      ease: "linear", // or "none"
      scrollTrigger: {
        trigger: img,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    }
  );
});

/* RAF LOOP */
function raf(time) {
  lenis.raf(time);
  ScrollTrigger.update();
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

/* IMPORTANT: sync ScrollTrigger with Lenis */
lenis.on("scroll", ScrollTrigger.update);
ScrollTrigger.refresh();

/* NAVBAR SCROLL */
const navbar = document.querySelector(".navbar");

ScrollTrigger.create({
  start: 50,
  onEnter: () => navbar.classList.add("scrolled"),
  onLeaveBack: () => navbar.classList.remove("scrolled"),
});

/* SIDEBAR */
const toggle = document.querySelector(".menu-toggle");
const sidebar = document.querySelector(".sidebar");
const closeBtn = document.querySelector(".sidebar-close");

let open = false;

const sidebarTL = gsap.timeline({
  paused: true,
  defaults: {
    ease: "power2.out",
  },
});

sidebarTL
  .to(sidebar, {
    right: 0,
    duration: 0.45, // faster open
  })
  .from(
    ".sidebar-links a",
    {
      x: 30,
      opacity: 1,
      stagger: 0.08,
      duration: 0.35, // faster links
    },
    "-=0.25"
  );

// Toggle sidebar
toggle.addEventListener("click", () => {
  open ? sidebarTL.reverse() : sidebarTL.play();
  open = !open;
});

// Close button
closeBtn.addEventListener("click", () => {
  sidebarTL.reverse();
  open = false;
});

// Close sidebar when clicking outside
document.addEventListener("click", (e) => {
  if (open && !sidebar.contains(e.target) && !toggle.contains(e.target)) {
    sidebarTL.reverse();
    open = false;
  }
});

/* SECOND SECTION */
const secondTL = gsap.timeline({
  scrollTrigger: {
    trigger: ".second",
    start: "top 75%",
    toggleActions: "play none none reset",
  },
});

secondTL
  .to(".second h5", { opacity: 1, y: -40 })
  .fromTo(
    ".second-div1 img",
    {
      y: 40,
      scale: 0.8,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: "power3.out",
    },
    "-=0.5"
  )

  .to(
    ".second-div2-inner",
    {
      opacity: 1,
      y: 0,
      stagger: 0.15,
    },
    "-=0.4"
  );

gsap.utils.toArray(".second-div1").forEach((container) => {
  const images = container.querySelectorAll("img");
  let index = 0;

  // show first image
  images[index].classList.add("active");
  gsap.set(images[index], { opacity: 1, scale: 1 });

  setInterval(() => {
    const current = images[index];
    index = (index + 1) % images.length;
    const next = images[index];

    current.classList.remove("active");
    next.classList.add("active");

    gsap.to(current, {
      opacity: 0,
      scale: 1.05,
      // duration: 1.,
      ease: "power2.out",
    });

    gsap.fromTo(
      next,
      { opacity: 0, scale: 1.05 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
      }
    );
  }, 4000); // ⏱ change every 4s
});

/* COUNT UP */
document.querySelectorAll("[data-count]").forEach((el) => {
  ScrollTrigger.create({
    trigger: el,
    start: "top 80%",
    onEnter: () => {
      gsap.to(el, {
        innerText: el.dataset.count,
        duration: 1.5,
        ease: "power1.out",
        snap: { innerText: 1 },
      });
    },
  });
});

//third section
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const section = document.querySelector(".third");

  /* ===============================
     ENTRY ANIMATION (ON VIEWPORT)
  =============================== */
  gsap
    .timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        toggleActions: "play none none reset",
      },
    })
    .to(".third h1", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    })
    .from(
      ".third-second-img",
      {
        scale: 0.7,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.5"
    )
    .to(
      ".line",
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
      },
      "-=0.4"
    )
    .to(
      ".third-second-text > div",
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.5"
    );
});
gsap.utils.toArray(".third-second-img").forEach((container) => {
  const slides = container.querySelectorAll(".slide-img");

  let tl = gsap.timeline({
    repeat: -1,
    defaults: {
      ease: "power2.inOut",
      duration: 0.8,
    },
  });

  slides.forEach((slide, i) => {
    tl.to(slide, {
      opacity: 1,
      scale: 1,
    }).to(
      slide,
      {
        opacity: 0,
        scale: 0.96,
      },
      "+=3" // ⏱ visible time
    );
  });
});

// =================feature=============

const grid = document.querySelector(".arch-grid");
const cards = document.querySelectorAll(".arch-card");
const prev = document.querySelector(".arch-nav.prev");
const next = document.querySelector(".arch-nav.next");

let index = 0;
let visible = getVisibleCount();

/* ---------- helpers ---------- */
function getVisibleCount() {
  if (window.innerWidth <= 480) return 1; // mobile
  if (window.innerWidth <= 768) return 2; // tablet
  if (window.innerWidth <= 1024) return 3; // small laptop
  return 4; // desktop
}

function updateSlide() {
  const translateX = index * (100 / visible);
  grid.style.transform = `translateX(-${translateX}%)`;
}

/* ---------- navigation ---------- */
next.addEventListener("click", () => {
  index++;
  if (index > cards.length - visible) index = 0;
  updateSlide();
});

prev.addEventListener("click", () => {
  index--;
  if (index < 0) index = cards.length - visible;
  updateSlide();
});

/* ---------- auto slide ---------- */
let autoSlide = setInterval(slideNext, 3500);

function slideNext() {
  index++;
  if (index > cards.length - visible) index = 0;
  updateSlide();
}

/* ---------- resize handling ---------- */
window.addEventListener("resize", () => {
  const newVisible = getVisibleCount();

  if (newVisible !== visible) {
    visible = newVisible;
    index = 0; // reset to prevent overflow
    updateSlide();
  }
});

/* ---------- init ---------- */
updateSlide();

//================ client =====================

const track = document.querySelector(".client-track");
const logos = gsap.utils.toArray(".client-logo");

// Calculate half width (because logos are duplicated)
let totalWidth = 0;
logos.forEach((logo) => {
  totalWidth += logo.offsetWidth + 60; // 60 = gap
});

const loopWidth = totalWidth / 2;

gsap.set(track, { x: 0 });

gsap.to(track, {
  x: -loopWidth,
  duration: 6, // very fast
  ease: "none",
  repeat: -1,
});

// client reviews
// ===============
const swiper = new Swiper(".adclan-swiper-container", {
  slidesPerView: 3, // default for desktop
  spaceBetween: 30,
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  speed: 800,
  breakpoints: {
    1024: { slidesPerView: 3, spaceBetween: 30 },
    768: { slidesPerView: 2, spaceBetween: 20 },
    0: { slidesPerView: 1, spaceBetween: 10 } // <= 767px -> 1 slide
  }
});


