// Gallery lightbox: selection, preview, next/previous, keyboard support
document.addEventListener("DOMContentLoaded", () => {
  const links = Array.from(document.querySelectorAll(".gallery-link"));
  const modalEl = document.getElementById("lightbox");
  const modal = new bootstrap.Modal(modalEl);
  const img = document.getElementById("lbImg");
  const caption = document.getElementById("lbCaption");
  const counter = document.getElementById("lbCounter");
  let current = 0;

  function show(i) {
    current = (i + links.length) % links.length;   // wraps around at both ends
    const link = links[current];
    img.src = link.getAttribute("href");
    img.alt = link.querySelector("img").alt;
    caption.textContent = link.dataset.caption;
    counter.textContent = (current + 1) + " / " + links.length;
  }

  links.forEach((link, i) => link.addEventListener("click", e => {
    e.preventDefault();
    show(i);
    modal.show();
  }));

  document.getElementById("lbPrev").addEventListener("click", () => show(current - 1));
  document.getElementById("lbNext").addEventListener("click", () => show(current + 1));

  document.addEventListener("keydown", e => {
    if (!modalEl.classList.contains("show")) return;
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });
});
