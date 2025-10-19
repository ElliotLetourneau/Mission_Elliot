document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach(carousel => {
    const images = carousel.querySelectorAll("img, video"); // <- ligne importante !
    const prev = carousel.querySelector(".prev");
    const next = carousel.querySelector(".next");
    let currentIndex = 0;

    function showMedia(index) {
      media.forEach((item, i) => {
        item.classList.toggle("active", i === index);
        if (item.tagName === "VIDEO" && i !== index) {
          item.pause(); // met en pause les vidéos non visibles
        }
      });
    }

    prev.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + media.length) % media.length;
      showMedia(currentIndex);
    });

    next.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % media.length;
      showMedia(currentIndex);
    });

    // Initialisation : n’affiche que la première image
    showMedia(currentIndex);
  });
});
