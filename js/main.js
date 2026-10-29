document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".site-nav");
  const topBtn = document.getElementById("backToTop");

  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle("scrolled", y > 60);
    topBtn.hidden = y < 400;
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
});
