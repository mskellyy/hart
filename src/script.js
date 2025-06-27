// fade in up, right, left

const elementsToAnimate = document.querySelectorAll(
  ".a-right, .a-left, .a-up, .a-down"
);

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
}
