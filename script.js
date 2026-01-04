// Small utilities: smooth scrolling, table filtering, timestamps.
(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const last = document.getElementById("lastUpdated");
  if (last) last.textContent = new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

  // Smooth scroll for internal anchors
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href");
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.pushState(null, "", id);
  });

  const filter = document.getElementById("filter");
  const search = document.getElementById("search");
  const table = document.getElementById("compareTable");
  if (!filter || !search || !table) return;

  const rows = Array.from(table.querySelectorAll("tbody tr"));

  function apply() {
    const f = (filter.value || "all").toLowerCase();
    const q = (search.value || "").trim().toLowerCase();

    rows.forEach((r) => {
      const tags = (r.getAttribute("data-tags") || "").toLowerCase();
      const text = r.innerText.toLowerCase();

      const okFilter = f === "all" ? true : tags.includes(f);
      const okQuery = !q ? true : (tags.includes(q) || text.includes(q));

      r.style.display = okFilter && okQuery ? "" : "none";
    });
  }

  filter.addEventListener("change", apply);
  search.addEventListener("input", apply);
})();
