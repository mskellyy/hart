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

// Horizontal scroll effect

// 1. register plugin (if you used CDN, GSAP is already on window)
gsap.registerPlugin(ScrollTrigger);

// 2. grab your panels
const panels = gsap.utils.toArray(".panel");

// 3. create a horizontal tween driven by scroll
gsap.to(panels, {
  xPercent: -100 * (panels.length - 1), // push panels left, one full viewport per panel
  ease: "none",
  scrollTrigger: {
    trigger: ".horizontal-wrapper", // the container
    start: "top top", // when its top hits the top of viewport
    end: () => "+=" + panels.length * window.innerWidth,
    scrub: 1, // smooth scrubbing (seconds of inertia)
    pin: true, // pin the wrapper in place
    anticipatePin: 1, // helps avoid jump when pinning
  },
});
