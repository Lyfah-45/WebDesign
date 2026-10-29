// Destinations page: category filter and quick-view modal
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".filter-btn");
  const items = document.querySelectorAll(".dest-item");
  const noResults = document.getElementById("noResults");

  buttons.forEach(btn => btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;
    buttons.forEach(b => {
      const active = b === btn;
      b.classList.toggle("active", active);
      b.classList.toggle("btn-lesotho", active);
      b.classList.toggle("btn-outline-lesotho", !active);
    });
    let shown = 0;
    items.forEach(item => {
      const match = filter === "all" || item.dataset.category === filter;
      item.hidden = !match;
      if (match) shown++;
    });
    noResults.hidden = shown !== 0;
  }));

  const modal = document.getElementById("destModal");
  modal.addEventListener("show.bs.modal", e => {
    const d = e.relatedTarget.dataset;
    document.getElementById("destModalTitle").textContent = d.name;
    document.getElementById("destModalDistrict").textContent = d.district;
    document.getElementById("destModalInfo").textContent = d.info;
    const img = document.getElementById("destModalImg");
    img.src = d.img;
    img.alt = "Illustration of " + d.name;
  });
});
