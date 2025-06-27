// fade in up, right, left

const elementsToAnimate = document.querySelectorAll(".a-right, .a-left, .a-up");

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        observer.unobserve(entry.target); // Stop observing after animation
      }
    });
  },
  { threshold: 0.1 }
);

elementsToAnimate.forEach((element) => observer.observe(element));

// Horizontal scroll effect<script>

if (window.innerWidth > 768) {
  // ✅ Load Lenis for smooth scroll
  const lenis = new Lenis({
    lerp: 0.1,
    smooth: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // ✅ Register GSAP plugin
  gsap.registerPlugin(ScrollTrigger);

  // ✅ Sync Lenis with ScrollTrigger
  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
      return arguments.length ? lenis.scrollTo(value) : window.scrollY;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.body.style.transform ? "transform" : "fixed",
  });

  // ✅ Horizontal scroll effect
  const sections = gsap.utils.toArray(".panel");
  gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: ".horizontal-wrapper",
      pin: true,
      scrub: 1,
      end: () =>
        "+=" + document.querySelector(".horizontal-wrapper").offsetWidth,
    },
  });

  // ✅ Update ScrollTrigger on scroll
  lenis.on("scroll", ScrollTrigger.update);
} else {
  // 🚫 Hard stop on mobile — optional layout reset handled in CSS
  console.log("Horizontal scroll disabled on mobile.");
}
