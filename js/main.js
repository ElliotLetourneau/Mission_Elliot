// js/main.js
document.addEventListener("DOMContentLoaded", () => {
  console.log("main.js loaded"); // debug : vérifie que le script s'exécute

  const carousels = document.querySelectorAll(".carousel");
  if (!carousels.length) {
    console.log("No carousels found on page.");
    return;
  }

  carousels.forEach((carousel, ci) => {
    const media = Array.from(carousel.querySelectorAll("img, video"));
    const prev = carousel.querySelector(".prev");
    const next = carousel.querySelector(".next");
    let index = 0;

    // safety: if no media, nothing à faire
    if (media.length === 0) {
      console.warn(`Carousel #${ci} has no media items.`);
      if (prev) prev.style.display = "none";
      if (next) next.style.display = "none";
      return;
    }

    // hide arrows if only one media
    if (media.length <= 1) {
      if (prev) prev.style.display = "none";
      if (next) next.style.display = "none";
    } else {
      if (prev) prev.style.display = ""; // reset
      if (next) next.style.display = "";
    }

    // Ensure first visible item (if none marked active)
    if (!media.some(item => item.classList.contains("active"))) {
      media.forEach((m, i) => m.classList.toggle("active", i === 0));
    }

    function showIndex(i) {
      index = ((i % media.length) + media.length) % media.length; // normalize
      media.forEach((item, ii) => {
        const shouldBeActive = ii === index;
        item.classList.toggle("active", shouldBeActive);

        // pause videos that are not active
        if (item.tagName === "VIDEO") {
          if (shouldBeActive) {
            // don't autoplay; just ensure it's ready (optional: item.play() if you want autoplay)
            // item.play().catch(() => {});
          } else {
            try { item.pause(); item.currentTime = 0; } catch (e) {}
          }
        }
      });
    }

    // attach events safely
    if (prev) {
      prev.addEventListener("click", (e) => {
        e.preventDefault();
        showIndex(index - 1);
      });
    }
    if (next) {
      next.addEventListener("click", (e) => {
        e.preventDefault();
        showIndex(index + 1);
      });
    }

    // keyboard support when carousel focused (optional)
    carousel.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") showIndex(index - 1);
      if (e.key === "ArrowRight") showIndex(index + 1);
    });

    // initialization
    showIndex(index);
  });
});
